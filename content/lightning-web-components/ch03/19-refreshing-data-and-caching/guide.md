# Lesson 19 — Refreshing Data and Caching

**Chapter 3 · Working with Salesforce Data · Lesson 19 of 33**

## What you'll learn

- Why a successful imperative write doesn't automatically refresh a wired Apex result
- `refreshApex()`: what it does and the exact pattern for using it correctly
- `notifyRecordUpdateAvailable()` for LDS-managed records, and why `getRecordNotifyChange()` is deprecated
- Which tool to reach for depending on where the change came from

## The gap: imperative writes don't refresh wired reads

Lesson 16 showed that LDS's shared cache keeps LDS-wired components in sync automatically. That guarantee is specific to data LDS itself manages. If a component wires a **custom Apex method** for its reads but writes through a **separate imperative Apex call**, nothing automatically tells the wired read to re-run — the wire service has no way to know that an unrelated imperative call changed the data it's caching. This is one of the most common sources of "I saved it, but the list on screen still shows the old data" bugs.

## refreshApex(): re-running a wired Apex configuration

`refreshApex()`, imported from `@salesforce/apex`, re-executes the exact wire configuration that produced a given result, bypassing the cache and fetching fresh data:

```js
import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import createContact from '@salesforce/apex/ContactController.createContact';

export default class ContactList extends LightningElement {
    wiredContactsResult;

    @wire(getContacts)
    wiredContacts(result) {
        this.wiredContactsResult = result; // store the WHOLE result, not just result.data
    }

    async handleCreate(payload) {
        await createContact({ payload });
        await refreshApex(this.wiredContactsResult);
    }
}
```

The key detail: you must store the *entire* object the wire function receives (`result`, containing both `data` and `error`), not just `result.data` — `refreshApex()` needs that whole object to know what to re-fetch. Storing only `.data` is a common mistake that breaks the refresh silently.

## notifyRecordUpdateAvailable(): refreshing LDS-managed records

If an imperative Apex call changes a record that LDS also manages elsewhere on the page (for example, a custom Apex method that updates an Account that another component has wired via `getRecord`), `notifyRecordUpdateAvailable()` from `lightning/uiRecordApi` tells LDS to refresh its cache for that record across every component using it:

```js
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';

async handleCustomUpdate() {
    await updateViaCustomApex({ accountId: this.recordId });
    await notifyRecordUpdateAvailable([{ recordId: this.recordId }]);
}
```

The older `getRecordNotifyChange()` is **deprecated** — current guidance is to use `notifyRecordUpdateAvailable()` instead, which considers the record data wired by all instantiated components rather than the narrower behavior of the deprecated call.

## Choosing the right tool

| Situation | Tool |
|---|---|
| A wired custom Apex read needs fresh data after an imperative Apex write | `refreshApex()` on the stored wire result |
| An LDS-managed record changed via custom Apex, and other components have it wired through `getRecord` | `notifyRecordUpdateAvailable()` |
| A record changed entirely through LDS itself (`updateRecord`) | Nothing extra needed — LDS's shared cache already handles it (Lesson 16) |

## Why this matters architecturally

A component that mixes LDS-managed data and custom Apex-managed data for the same record is exactly where these refresh gaps show up, and it's worth deliberately choosing one approach per piece of data rather than mixing them casually. Knowing which caching layer owns a given piece of data — LDS's own cache, or a wire-service cache around a custom Apex method — tells you immediately which refresh tool, if any, you actually need.

## Key terms

| Term | Meaning |
|---|---|
| `refreshApex()` | Re-runs a stored wire configuration against a cacheable Apex method, bypassing the cache |
| `notifyRecordUpdateAvailable()` | Tells LDS to refresh its cache for specific record Ids across all components |
| `getRecordNotifyChange()` | The deprecated predecessor to `notifyRecordUpdateAvailable()` |
| Stored wire result | The full `{ data, error }` object a wire function receives, required by `refreshApex()` |

## Lab

Build a component that wires a custom Apex method `getOpenCases()` and separately calls an imperative `closeCase(caseId)` Apex method. Store the full wire result and call `refreshApex()` after a successful `closeCase()`. Explain, specifically, what bug you'd see on screen if you had instead stored only `result.data` and tried to pass that into `refreshApex()`.

## Check yourself

Can you explain why an imperative Apex write doesn't automatically refresh a separately wired Apex read? Can you state the one detail that must be true about what you store from a wire function for `refreshApex()` to work? Can you say which function replaced the deprecated `getRecordNotifyChange()`, and when you'd reach for it instead of `refreshApex()`?
