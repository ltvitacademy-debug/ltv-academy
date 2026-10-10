# Lesson 4 — Change Data Capture

**Chapter 1 · Events in Salesforce · Lesson 4 of 16**

## What you'll learn

- What Change Data Capture (CDC) is, and how it differs from a platform event you define yourself
- How to enable CDC on an object in Setup, and what channel name it publishes to
- The `ChangeEventHeader` fields every CDC event carries: `changeType`, `entityName`, `recordIds`, `changeOrigin`, `changedFields`
- How to subscribe to a CDC channel from an LWC with `empApi`
- When to reach for CDC instead of a custom platform event

## CDC publishes changes you didn't have to define

Every platform event in Lesson 2 and 3 was something **you** defined — you picked the fields, you wrote the `EventBus.publish()` call. **Change Data Capture** flips that: once you enable CDC on a standard or custom object, Salesforce automatically publishes a change event every time a record of that object is created, updated, deleted, or undeleted — with no Apex or Flow of yours doing the publishing. CDC is how you turn ordinary record changes already happening in your org (from the UI, Data Loader, an API, anything) into an event stream, without touching the logic that makes those changes in the first place.

## Enabling CDC

In Setup, search **Change Data Capture**, and you'll see a list of entities (standard and custom objects) you can select. Selecting `Account` and saving enables an automatic channel named `/data/AccountChangeEvent`; selecting a custom object `Invoice__c` enables `/data/Invoice__ChangeEvent` (the `__c` suffix is replaced with `__ChangeEvent`). From that point on, any create, update, delete, or undelete on that object publishes a change event automatically — you don't write a trigger to make this happen, though you'll often write one (or an LWC listener) to react to it.

## The ChangeEventHeader

Every CDC event carries a special header field, `ChangeEventHeader`, with the metadata a subscriber needs to make sense of the change:

| Field | Meaning |
|---|---|
| `changeType` | The operation that produced the event: `CREATE`, `UPDATE`, `DELETE`, `UNDELETE` (plus `GAP_*` variants and `GAP_OVERFLOW` used for gap-event recovery) |
| `entityName` | The API name of the object that changed, e.g. `Account` or `Invoice__c` |
| `recordIds` | The IDs of the affected record(s) — Salesforce can batch several records' changes into one event message |
| `changeOrigin` | Identifies the client that made the change (useful for a subscriber to avoid reacting to changes it caused itself) |
| `changedFields` | In Apex, the list of fields actually modified by an update (always empty for `CREATE`); available for Apex using API version 47.0 and later |

A subscriber reading `changeType` and `changedFields` together can answer the question that matters most in practice: "did the specific field I care about actually change, and was this a create, an update, or a delete?" — rather than reacting to every change on the object regardless of what moved.

## Reacting to a CDC event in Apex

You subscribe to a CDC event the same way you'd subscribe to any platform event — with a trigger, except the trigger is on the generated change-event object:

```apex
trigger AccountChangeEventTrigger on AccountChangeEvent (after insert) {
    for (AccountChangeEvent evt : Trigger.new) {
        EventBus.ChangeEventHeader header = evt.ChangeEventHeader;

        if (header.changeType == 'UPDATE' &&
            header.changedFields.contains('BillingCountry')) {
            System.debug('BillingCountry changed on: ' + header.recordIds);
            // Hand off to an async job rather than doing more work inline here.
        }
    }
}
```

## Reacting to a CDC event in an LWC

Subscribing from a Lightning Web Component uses the exact same `lightning/empApi` module from Lesson 3 — only the channel name changes:

```javascript
import { subscribe, unsubscribe } from 'lightning/empApi';

const channelName = '/data/AccountChangeEvent';

subscribe(channelName, -1, (message) => {
    const header = message.data.payload.ChangeEventHeader;
    console.log('Change type:', header.changeType, 'on', header.recordIds);
});
```

## CDC vs. a custom platform event: when to reach for which

Reach for **CDC** when the thing you want to react to is an ordinary create/update/delete on a standard or custom object, and you want that notification regardless of which path caused the change (UI, API, Data Loader, a Flow). Reach for a **custom platform event** (Lessons 2–3) when the thing you want to announce isn't a record change at all — a calculated business moment like "inventory fell below reorder threshold," a one-off integration signal, or a payload shape that doesn't map cleanly onto a single object's fields. The two are not mutually exclusive in a real design: a CDC event on `Invoice__c` might be the trigger that causes your own Apex to then publish a custom `Invoice_Overdue__e` event carrying a derived fact CDC alone couldn't express.

## Key terms

| Term | Meaning |
|---|---|
| Change Data Capture (CDC) | Salesforce feature that automatically publishes a change event on create/update/delete/undelete for an enabled object |
| `ChangeEventHeader` | The metadata field every CDC event carries: changeType, entityName, recordIds, changeOrigin, changedFields |
| `changeType` | CREATE, UPDATE, DELETE, UNDELETE (plus GAP_* variants) — identifies what kind of change produced the event |
| `changedFields` | The list of fields actually modified by an update, available in Apex from API version 47.0 |
| Change event channel | The auto-generated channel name for a CDC-enabled object, e.g. `/data/AccountChangeEvent` |

## Lab

In a Developer Edition or scratch org, enable Change Data Capture on `Account` in Setup. Write the `AccountChangeEventTrigger` from this lesson (reacting specifically to a change in `BillingCountry`), then go edit an Account's Billing Country by hand in the UI and confirm your trigger's debug log fires with the correct `changeType` and `recordIds`. Then edit a *different* field on the same Account and confirm the `changedFields.contains('BillingCountry')` check correctly does **not** fire.

## Check yourself

What's the practical difference between enabling CDC on an object and defining your own custom platform event — specifically, who writes the code that does the publishing in each case? Why would a subscriber check `changedFields` rather than just reacting to every `UPDATE` change event on an object?
