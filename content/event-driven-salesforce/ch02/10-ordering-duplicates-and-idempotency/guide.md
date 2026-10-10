# Lesson 10 — Ordering, Duplicates and Idempotency

**Chapter 2 · Designing Event-Driven Solutions · Lesson 10 of 16**

## What you'll learn

- Why Lesson 6's at-least-once guarantee makes duplicate handling mandatory, not optional
- What idempotency means, concretely, in a subscriber's code
- A real idempotency pattern using the event's own identifying field plus a tracking record
- Why ordering problems and duplicate problems are related but distinct issues
- How to design a subscriber that's safe to run twice on the same event

## Duplicates aren't an edge case — they're the contract

Lesson 6 established that Salesforce guarantees **at-least-once** delivery, not exactly-once. That's not a rare failure mode to defensively code around "just in case" — it's the actual, documented contract every subscriber is built against. A subscriber that assumes single delivery isn't handling an unlikely edge case poorly; it's violating the platform's stated guarantee, and it will eventually process the same event twice in production.

## Idempotency, concretely

**Idempotent** means: running the same operation twice (or ten times) produces the same end result as running it once. `UPDATE Order SET Status = 'Shipped'` is idempotent — running it five times leaves the status exactly where running it once would. `INSERT a new Shipment_Log record` is **not** idempotent on its own — running it five times creates five log records instead of one. A subscriber reacting to an event with a non-idempotent operation (like a bare insert) is the single most common cause of real production bugs in event-driven Salesforce systems: a duplicate delivery silently creates a duplicate record, sends a duplicate notification, or double-charges a payment.

## A real idempotency pattern

The standard fix: give every event an identifying value the subscriber can check **before** doing its (non-idempotent) work, and keep a record of which identifiers have already been processed.

```apex
trigger OrderShippedTrigger on Order_Shipped__e (after insert) {
    Set<String> incomingIds = new Set<String>();
    for (Order_Shipped__e evt : Trigger.new) {
        incomingIds.add(evt.EventUuid);
    }

    Set<String> alreadyProcessed = new Set<String>();
    for (Processed_Event__c pe : [
        SELECT Event_Uuid__c FROM Processed_Event__c
        WHERE Event_Uuid__c IN :incomingIds
    ]) {
        alreadyProcessed.add(pe.Event_Uuid__c);
    }

    List<Shipment_Log__c> newLogs = new List<Shipment_Log__c>();
    List<Processed_Event__c> tracking = new List<Processed_Event__c>();

    for (Order_Shipped__e evt : Trigger.new) {
        if (alreadyProcessed.contains(evt.EventUuid)) {
            continue; // Already handled this exact event — skip it.
        }
        newLogs.add(new Shipment_Log__c(Order_Number__c = evt.Order_Number__c));
        tracking.add(new Processed_Event__c(Event_Uuid__c = evt.EventUuid));
    }

    insert newLogs;
    insert tracking;
}
```

`EventUuid` is the field every platform event automatically carries (Lesson 2), and it uniquely identifies that specific event message — unlike the Replay ID, which is a stream position, not a durable unique key (a distinction worth re-checking against Lesson 6 if it's fuzzy). A custom object like `Processed_Event__c` (or, at smaller scale, a platform cache) holding one row per `EventUuid` already handled is what turns "insert a log" into something effectively idempotent at the subscriber level, even though the insert operation itself isn't.

## Ordering problems are a different issue than duplicates

It's tempting to lump "the event arrived twice" and "the events arrived out of order" together, but they call for different fixes. Idempotency (above) solves the duplicate problem. Ordering is about whether Event A's effects are visible before Event B's, when B logically depends on A having happened first. Lesson 6 noted that ordering is preserved **within** a channel but not guaranteed **across** channels. Even within a single channel, a subscriber that processes events in small retryable batches (Lesson 6's `EventBus.TriggerContext` retry pattern) can, in unusual failure-and-retry scenarios, end up applying effects out of their original publish order. If your business logic genuinely depends on sequence — not just "eventually consistent," but "A must be visible before B is processed" — the fix is an explicit sequence number or timestamp field in your event schema (Lesson 9) that the subscriber checks, rather than trusting arrival order alone.

## Designing for "safe to run twice"

The practical design habit worth building: for every subscriber you write, ask "what happens if this exact event is delivered and processed twice?" before you ship it. If the honest answer is "a duplicate record, a duplicate email, or a double charge," the subscriber isn't finished — it needs the tracking-record pattern above (or an equivalent upsert-by-external-id approach, where the subscriber's own write is naturally idempotent because it upserts on the event's identifying field instead of always inserting).

## Key terms

| Term | Meaning |
|---|---|
| Idempotent operation | An operation that produces the same result whether it runs once or multiple times |
| `EventUuid` | The automatically-included field uniquely identifying a specific platform event message |
| Processed-event tracking | Recording which event identifiers have already been handled, to skip duplicates before non-idempotent work runs |
| Ordering guarantee | Preserved within a single channel; not guaranteed across different channels or event types |

## Lab

Take the `OrderShippedTrigger` idempotency pattern above and adapt it for a hypothetical `Payment_Captured__e` event whose non-idempotent action is "charge a credit card via an external payment gateway callout" rather than inserting a log record. Write the Apex (or detailed pseudocode, if you don't have a payment gateway to call) showing where the processed-event check happens relative to the callout, and explain in one or two sentences why checking *before* the callout (rather than after) matters specifically for a non-idempotent, real-money action.

## Check yourself

Why is `UPDATE Status = 'Shipped'` naturally idempotent while `INSERT a Shipment_Log record` is not? What's the difference between solving a duplicate-delivery problem and solving an ordering problem, and why does fixing one not automatically fix the other?
