# Lesson 6 — Event Delivery and Replay

**Chapter 1 · Events in Salesforce · Lesson 6 of 16**

## What you'll learn

- What "at-least-once" delivery means, and why it's the guarantee Salesforce actually makes
- The retention window for platform events and CDC events, and what Replay IDs are for
- How to recover missed events after a disconnect using a stored Replay ID
- How `EventBus.TriggerContext` lets an Apex trigger recover from errors mid-batch
- Why none of this guarantees cross-channel ordering

## At-least-once, not exactly-once

A new subscriber's first assumption is often that each event arrives exactly one time. Salesforce's actual guarantee is **at-least-once delivery**: an event is guaranteed to be delivered, but it is not guaranteed to be delivered only once. Network retries, reconnects, and internal retry logic on the publishing side can all cause a subscriber to see the same event message more than once. Any subscriber logic you write — an Apex trigger, an LWC listener, an external integration — has to be written assuming a duplicate is possible, which is exactly the idempotency problem Chapter 2 (Lesson 10) covers in depth.

## Replay IDs and the retention window

Every delivered event carries a **Replay ID** — its position in the event stream for that channel. A subscriber that wants to recover from a disconnect, or deliberately re-process recent history, can resubscribe starting from a specific stored Replay ID instead of `-1` (new events only). Two important caveats:

- Replay IDs are **not guaranteed to be unique** across certain org maintenance activities (like an org migration) — use the event's own `id`/`EventUuid` field to identify a *specific* event, and treat the Replay ID only as a position marker for resuming a subscription, not as a durable unique key.
- Don't compute a new Replay ID yourself by adding or subtracting from a stored one to "jump" to a different point in the stream — only use a Replay ID you actually received from the platform.

Platform events and CDC events are retained for **72 hours**. A subscriber that's been offline longer than that can no longer recover the events it missed by replay — anything older has fallen out of the retention window (Salesforce doesn't promise exact-second purging, but you should never design around events surviving past 72 hours).

## Recovering from a disconnect

The practical pattern: a subscriber persists the last Replay ID it successfully processed (in a custom setting, a database row, wherever makes sense for that client), and on reconnect, resubscribes using that stored value instead of `-1`. This replays everything published since the last ID it actually handled, closing the gap a disconnect would otherwise leave — as long as the gap is within the 72-hour window.

## Recovering inside an Apex trigger: `EventBus.TriggerContext`

A platform event trigger can hit a runtime error partway through a batch of events — an exception thrown while processing event 40 of 50, for example. `EventBus.TriggerContext` is how the trigger participates in the platform's retry mechanism:

```apex
trigger OrderShippedTrigger on Order_Shipped__e (after insert) {
    EventBus.TriggerContext tc = EventBus.TriggerContext.currentContext();

    try {
        for (Order_Shipped__e evt : Trigger.new) {
            // processing that might throw
        }
    } catch (Exception e) {
        if (tc.retries < 3) {
            throw new EventBus.RetryableException('Retrying after: ' + e.getMessage());
        }
        // Give up after 3 retries and log instead of retrying forever.
        System.debug('Giving up after ' + tc.retries + ' retries: ' + e.getMessage());
    }
}
```

Throwing `EventBus.RetryableException` tells the platform to retry the **entire trigger invocation** for that batch; `tc.retries` tells you how many times that's already happened, and `tc.lastError` carries the message from the most recent retry attempt, so you can decide when to stop retrying and fall back to logging instead. `EventBus.TriggerContext` also exposes `setResumeCheckpoint(replayId)` / `getResumeCheckpoint()`, which lets a trigger mark a specific point in a batch as "safely processed" so that, on a retry, the platform resumes from that checkpoint rather than reprocessing records the trigger already successfully handled — useful when a batch partially succeeds before hitting a limit or an uncaught exception.

## Ordering is per-channel, not global

Delivery order is preserved **within a single channel**, but there's no platform-wide guarantee of ordering **across** different channels or different event types. If your design depends on Event A being processed before Event B, and they're published on different channels (or one is a platform event while the other is a CDC change event), you cannot rely on arrival order alone — you need an explicit sequencing field in the payload itself, which Chapter 2 (Lesson 10) builds on directly.

## Key terms

| Term | Meaning |
|---|---|
| At-least-once delivery | The guarantee that an event will be delivered, but possibly more than once |
| Replay ID | An event's position in its channel's stream, usable to resume a subscription after a disconnect |
| Retention window | The 72-hour period platform events and CDC events remain available for replay |
| `EventBus.RetryableException` | Thrown from a platform event trigger to request the platform retry the current batch |
| `EventBus.TriggerContext` | Exposes `retries`, `lastError`, and checkpoint methods for trigger-level retry handling |

## Lab

Using the `OrderShippedTrigger` from Lesson 3's lab, rewrite it to wrap its per-event processing in a try/catch that throws `EventBus.RetryableException` on the first failure and gives up after `tc.retries` reaches 2, logging instead. Deliberately cause a failure (for example, insert a Task with a required field missing) to confirm the retry logic runs, then check the debug logs to see `tc.retries` increase across the retry attempts.

## Check yourself

Why must every subscriber be written to tolerate a duplicate delivery of the same event? If a subscriber has been offline for 4 days, can it recover everything it missed using a stored Replay ID? Why or why not?
