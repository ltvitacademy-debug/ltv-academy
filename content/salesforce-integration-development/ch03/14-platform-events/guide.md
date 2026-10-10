# Lesson 14 — Platform Events

**Chapter 3 · Asynchronous and Event-Based Integration · Lesson 14 of 23**

## What you'll learn

- How to publish a custom platform event from Apex with `EventBus.publish`
- The two Publish Behaviors and the different governor limits each one counts against
- Why `EventBus.publish` doesn't throw on failure, and what to check instead
- The documented trigger-recursion risk and how to avoid it
- How platform events fit as both an outbound and inbound integration mechanism

## Publishing an event

A custom platform event (defined in Setup as an object ending in `__e`) is published from Apex with `EventBus.publish()`, which accepts either a single event instance or a list:

```apex
Order_Status_Event__e evt = new Order_Status_Event__e(
    Order_Id__c = orderId,
    New_Status__c = 'Shipped'
);
Database.SaveResult sr = EventBus.publish(evt);
```

Publishing a list of events at once is more efficient than looping and publishing one at a time, the same bulk-processing discipline that applies to DML.

## Publish Behavior changes which limit applies

Every custom platform event has a **Publish Behavior** setting, chosen when the event is defined:

- **Publish After Commit** — the event is only actually published if the transaction that published it successfully commits. Each `EventBus.publish()` call under this behavior counts against the regular **Apex DML statement limit** (check current usage with `Limits.getDMLStatements()`).
- **Publish Immediately** — the event publishes right away, even if the rest of the transaction later rolls back. Calls under this behavior count against a separate, dedicated limit of **150 `EventBus.publish()` calls per transaction** (check current usage with `Limits.getPublishImmediateDML()`).

Choosing the right behavior matters: if an external system or another part of Salesforce should only ever hear about something that actually, successfully happened, use Publish After Commit; if the event needs to go out regardless of whether the rest of the transaction ultimately succeeds (for example, an audit/telemetry signal), Publish Immediately is the right choice instead.

## `EventBus.publish` doesn't throw — check the result yourself

This is a documented and easy-to-miss detail: `EventBus.publish()` does **not** throw an exception for an unsuccessful publish. It returns a `Database.SaveResult` (or a list of them, for a bulk publish), and you must call `.isSuccess()` and inspect `.getErrors()` yourself:

```apex
if (!sr.isSuccess()) {
    for (Database.Error err : sr.getErrors()) {
        System.debug('Error publishing event: ' + err.getMessage());
    }
}
```

Code that calls `EventBus.publish()` and moves on without checking the result can silently lose events with no error anywhere in the debug log.

## Subscribing, and the recursion warning

A subscriber inside Salesforce consumes a platform event through a standard Apex trigger on the event object: `trigger OrderStatusEventTrigger on Order_Status_Event__e (after insert) { ... }`. External systems instead subscribe through the Pub/Sub API. Salesforce's own documentation calls out a specific recursion risk: publishing an event *from a trigger on that same event object* can create an infinite trigger loop and exhaust limits — worth checking for explicitly any time a subscriber trigger itself might publish a related event.

## Outbound and inbound at once

Platform events are unusual among this course's mechanisms in being naturally bidirectional: Salesforce can publish an event that an external system subscribes to (outbound), and an external system can publish an event that an Apex trigger subscribes to (inbound, as Lesson 9 noted). The same event definition and the same Pub/Sub API serve both directions — which direction is in play depends entirely on who published and who's listening for a given message.

## Key terms

| Term | Meaning |
|---|---|
| EventBus.publish | Apex method that publishes one or more platform event instances |
| Publish After Commit | Event only publishes if the transaction commits; counts against the DML statement limit |
| Publish Immediately | Event publishes even if the transaction later rolls back; counts against a separate 150-call limit |
| Database.SaveResult | What EventBus.publish returns; must be checked with isSuccess()/getErrors(), since no exception is thrown on failure |

## Lab

In a scratch org, define a custom platform event `Order_Status_Event__e` with fields `Order_Id__c` (Text) and `New_Status__c` (Text), setting its Publish Behavior to Publish After Commit. Write an Apex trigger on the event object that simply debugs the two field values when it fires. Then write and run an anonymous Apex script that publishes an instance of the event, checks the returned SaveResult, and confirms your trigger's debug output appears in the log. Finally, change the event's Publish Behavior to Publish Immediately and re-test, noting in writing which governor limit method (`Limits.getDMLStatements()` vs `Limits.getPublishImmediateDML()`) now applies.

## Check yourself

Explain the difference between Publish After Commit and Publish Immediately, including which governor limit each counts against. Then explain, without looking back, why checking the result of EventBus.publish() matters even though no exception is thrown.
