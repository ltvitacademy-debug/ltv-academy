# Lesson 12 — Event Limits and Monitoring

**Chapter 2 · Designing Event-Driven Solutions · Lesson 12 of 16**

## What you'll learn

- The two categories of platform event allocations: publishing and delivery
- Why these allocations scale by edition and by add-on entitlement, not a single fixed number
- What happens when an org exceeds its delivery allocation
- How to monitor platform event activity in Setup and through Apex
- Why "it published successfully" and "every subscriber received it" are different things to monitor

## Two different allocations, not one

Platform events are governed by **allocations** — org-wide limits, separate from ordinary Apex governor limits, that apply specifically to the event bus. There are two categories worth distinguishing:

- **Event publishing allocations** cap how many event messages can be published in a given period.
- **Event delivery allocations** cap how many event messages can be *delivered* to subscribing clients (Pub/Sub API, CometD, the `empApi` Lightning component, and event relays) in a 24-hour period, shared across every client subscribed in that org.

Salesforce's official Platform Event Allocations documentation is the authoritative source for the exact current numbers, because they scale by **edition** (Developer, Enterprise/Professional, Performance/Unlimited each have different defaults) and by **add-on entitlements** an org can purchase to raise them further. Rather than memorize a specific figure that may change by release or edition, know the shape of the limit — it's a 24-hour rolling delivery cap shared across all subscribed clients, and a separate publishing cap — and check the current Platform Event Allocations page for your org's specific edition and entitlements before sizing a design against it.

## What happens when you hit the delivery allocation

If an org exceeds its delivery allocation, CometD-based connections receive an explicit error response rather than failing silently, and events generated after the limit is reached are still stored on the event bus — a subscriber can retrieve them later, as long as they're retrieved within the platform event retention window from Lesson 6, once the allocation resets. This matters for design: a sudden burst of activity hitting the delivery allocation doesn't lose data outright, but it does mean subscribers may see delayed delivery until the next period's allocation is available, which is a real latency consideration for a time-sensitive subscriber.

## Monitoring in Setup

Setup provides visibility into platform event activity without writing a line of code:

- The **Platform Events** Setup page lists your org's defined events and lets you inspect field definitions and publish behavior.
- **Event Manager** / the event monitoring tooling available through Setup and the Tooling API lets an admin review recent publish activity for troubleshooting.
- Debug logs, filtered to the `Workflow` and `Apex Code` categories around a platform event trigger's execution, remain the most direct way to see what a specific trigger invocation actually did with a batch of delivered events, including any `EventBus.TriggerContext.retries` activity from Lesson 6.

## Monitoring from Apex: publish callbacks

Beyond checking the immediate `Database.SaveResult` from `EventBus.publish()`, Apex supports **publish callbacks** — code that runs when the platform finishes attempting to publish a high-volume event, giving you the final outcome rather than just the initial "queued" confirmation:

```apex
public class OrderShippedCallback implements EventBus.EventPublishFailureCallback, EventBus.EventPublishSuccessCallback {
    public void onFailure(EventBus.FailureResult result) {
        System.debug('Publish failed for: ' + result.getEventUuids() + ' — ' + result.getErrorMessage());
    }
    public void onSuccess(EventBus.SuccessResult result) {
        System.debug('Publish confirmed for: ' + result.getEventUuids());
    }
}

Order_Shipped__e orderShippedEvent = new Order_Shipped__e(Order_Number__c = 'ORD-1001');
Database.SaveResult sr = EventBus.publish(orderShippedEvent, new OrderShippedCallback());
```

This closes a real gap: a successful `Database.SaveResult` only confirms the event was queued (Lesson 3), not that the platform finished publishing it successfully. A publish callback is how you find out the actual final result for a high-volume event you need to be confident about, rather than assuming queued always means delivered.

## Publishing success and subscriber receipt are two different facts

A design should monitor both ends independently: whether publishing itself ultimately succeeded (publish callbacks, or checking `isSuccess()` immediately plus accepting that's only a queuing confirmation), and whether your *specific* subscribers actually received and processed the event (your own tracking, such as the `Processed_Event__c` pattern from Lesson 10, doubles as a monitoring signal — a subscriber with no new tracking rows despite known publish activity is a sign something downstream is stuck). Treating "the publish call returned success" as proof the whole pipeline worked is the same mistake as treating "no exception was thrown" as proof an HTTP callout succeeded, from the integration course — in both cases, a status needs to be checked explicitly rather than assumed.

## Key terms

| Term | Meaning |
|---|---|
| Event publishing allocation | The org-wide cap on how many event messages can be published in a period |
| Event delivery allocation | The 24-hour rolling cap, shared across all subscribed clients, on how many event messages can be delivered |
| Publish callback | Apex code (`EventBus.EventPublishSuccessCallback` / `FailureCallback`) that reports the final outcome of publishing a high-volume event |
| `EventBus.publish(event, callback)` | The overload of `EventBus.publish()` that attaches a publish callback to a specific publish call |

## Lab

Using the `Order_Shipped__e` event from earlier lessons, implement the `OrderShippedCallback` pattern above: publish from an anonymous Apex script using the `EventBus.publish(event, callback)` overload, and confirm in debug logs that `onSuccess` fires with the expected `EventUuid`. Then write two or three sentences describing a monitoring plan for a real subscriber-facing design: what would you check to be confident both that publishing succeeded AND that your specific downstream subscriber actually processed the event — not just that the publish call returned successfully.

## Check yourself

Why is a successful `Database.SaveResult` from `EventBus.publish()` not the same as confirmation that publishing fully succeeded? What happens to events generated after an org exceeds its delivery allocation — are they lost, or delayed?
