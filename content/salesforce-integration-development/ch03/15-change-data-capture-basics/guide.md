# Lesson 15 — Change Data Capture Basics

**Chapter 3 · Asynchronous and Event-Based Integration · Lesson 15 of 23**

## What you'll learn

- What Change Data Capture automatically publishes, with no explicit `EventBus.publish` call
- The `ChangeEventHeader` fields every change event carries
- The channel naming pattern used to subscribe to change events
- How to process change events with an Apex trigger
- How CDC differs from a plain record-save trigger, and why that difference matters

## CDC publishes automatically — you don't call publish

Platform Events (Lesson 14) require an explicit `EventBus.publish()` call somewhere in your code. Change Data Capture (CDC) is different: once you enable CDC on an object in Setup, Salesforce automatically publishes a change event every time a tracked record is created, updated, deleted, or undeleted — no Apex code is needed to make the publishing happen at all. CDC exists specifically for "tell downstream systems whenever this data changes," without requiring every piece of code that might change the data to remember to publish an event about it.

## What every change event carries: `ChangeEventHeader`

Every CDC change event payload includes a header object, `EventBus.ChangeEventHeader`, with fields including:

- **`changeType`** — one of `CREATE`, `UPDATE`, `DELETE` (and others for undelete/merge scenarios), telling you what kind of change occurred.
- **`changedFields`** — the specific fields that actually changed in an UPDATE. This is empty for a CREATE (since every field is technically "new"), and requires Apex saved with API version 47.0 or later to be populated.
- **`entityName`** — the object's API name, useful when one trigger or subscriber needs to handle change events from multiple objects.
- **`changeOrigin`** — helps a subscribing app recognize changes it made itself, so it can avoid reprocessing its own writes and creating a feedback loop.

## Channel naming

For external subscribers using the Pub/Sub API, CDC channels follow a predictable naming pattern: `/data/<ObjectName>ChangeEvent` for a standard object (for example, `/data/AccountChangeEvent`), and `/data/<ObjectName>__ChangeEvent` for a custom object (for example, `/data/MyObject__ChangeEvent`, built from the object's own `__c`-style API name).

## Processing change events with Apex

For in-platform processing, Salesforce generates a change event object for each CDC-enabled object, and you write a standard Apex trigger directly on it:

```apex
trigger AccountChangeEventTrigger on AccountChangeEvent (after insert) {
    for (AccountChangeEvent evt : Trigger.new) {
        EventBus.ChangeEventHeader header = evt.ChangeEventHeader;
        if (header.changeType == 'UPDATE') {
            System.debug('Account changed. Fields: ' + header.changedFields);
        }
    }
}
```

This processes changes asynchronously on-platform, fully decoupled from the original save. External systems instead consume the same stream of changes through the Pub/Sub API, using the channel naming pattern above.

## CDC vs a plain record-save trigger

It's tempting to ask "isn't this just a trigger on the object itself?" — it isn't, and the difference matters for integration design specifically. A normal `after update` trigger on `Account` runs synchronously, inside the same transaction as the save, and can affect whether that save ultimately succeeds. A CDC trigger on `AccountChangeEvent` runs fully asynchronously, in its own separate transaction, with no ability to block or be blocked by the original save, and no risk of adding load to the user's own transaction. CDC is built for continuously streaming changes to downstream systems and subscribers, not for reacting inline to one specific save — which is exactly why it's the right tool when the goal is "keep an external system's copy of this data current" rather than "validate or enrich this specific save before it commits."

## Key terms

| Term | Meaning |
|---|---|
| Change Data Capture (CDC) | Automatically publishes a change event whenever a tracked object's records change |
| ChangeEventHeader | The header object on every change event, carrying changeType, changedFields, entityName, changeOrigin |
| changeType | CREATE, UPDATE, DELETE, and other values identifying the kind of change |
| /data/<Object>ChangeEvent | The Pub/Sub API channel naming pattern for subscribing to an object's change events |

## Lab

In a scratch org, enable Change Data Capture on the Account object (Setup → Change Data Capture → add Account to the Selected Entities list). Write an Apex trigger on `AccountChangeEvent` that debugs the `changeType` and `changedFields` from the event header. Update an existing Account's Phone field and confirm your trigger fires asynchronously with `changeType` equal to `UPDATE` and `changedFields` containing the Phone field's API name. Then create a brand-new Account and confirm `changeType` is `CREATE` with an empty `changedFields`.

## Check yourself

Explain, without looking back, what you have to do in Apex to make CDC start publishing change events for an object (hint: it's not an EventBus.publish call). Then explain the key difference between a CDC trigger on AccountChangeEvent and a normal after-update trigger on Account.
