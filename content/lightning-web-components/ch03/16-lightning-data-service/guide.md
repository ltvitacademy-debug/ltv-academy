# Lesson 16 — Lightning Data Service

**Chapter 3 · Working with Salesforce Data · Lesson 16 of 33**

## What you'll learn

- What Lightning Data Service (LDS) is and why it means you often don't need Apex at all
- The `lightning/uiRecordApi` module: `getRecord`, `getFieldValue`, `createRecord`, `updateRecord`, `deleteRecord`
- The declarative alternative: `lightning-record-edit-form` and `lightning-record-view-form`
- Why LDS's shared cache means two components can stay in sync without talking to each other

## LDS: record access with no Apex required

**Lightning Data Service (LDS)** is the platform's built-in layer for reading and writing individual records, respecting field-level security and sharing automatically, with no Apex class required at all. It's exposed to LWC through the `lightning/uiRecordApi` module. For a huge share of real component work — showing a record's fields, letting a user edit them, creating or deleting a record — LDS is the first thing to reach for, before writing custom Apex.

## Reading a record: getRecord and getFieldValue

```js
import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class AccountTile extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, INDUSTRY_FIELD] })
    account;

    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }
}
```

Importing field references from `@salesforce/schema` (rather than writing field API names as plain strings) is the recommended pattern, because it gives you a compile-time error if a field is renamed or deleted, instead of a silent runtime failure.

## Writing a record: createRecord, updateRecord, deleteRecord

```js
import { createRecord, updateRecord, deleteRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';

async handleCreate() {
    const fields = {};
    fields[NAME_FIELD.fieldApiName] = 'Acme Corporation';
    const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
    const account = await createRecord(recordInput);
    this.newAccountId = account.id;
}
```

`updateRecord` and `deleteRecord` follow the same shape — `updateRecord` takes a record input with the record's `Id` plus the fields to change; `deleteRecord` takes just the record's `Id`. None of these three are wired — they're called imperatively, because writing data is exactly the kind of side-effecting operation Lesson 15 explained can't go through `@wire`.

## The declarative shortcut: record forms

For the common case of a straightforward view or edit form, `lightning-record-view-form` and `lightning-record-edit-form` do most of this without any JavaScript at all:

```html
<lightning-record-edit-form object-api-name="Contact" record-id={recordId} onsuccess={handleSuccess}>
    <lightning-messages></lightning-messages>
    <lightning-input-field field-name="FirstName"></lightning-input-field>
    <lightning-input-field field-name="LastName"></lightning-input-field>
    <lightning-button type="submit" label="Save"></lightning-button>
</lightning-record-edit-form>
```

This form handles validation, field-level security, and the actual save, firing an `onsuccess` (or `onerror`) event your component can listen for. Reach for `lightning-record-edit-form` first; drop down to the JavaScript `createRecord`/`updateRecord` API specifically when you need custom logic around the save that a declarative form can't express.

## The shared cache keeps components in sync

LDS maintains one shared, client-side cache of record data across every component on the page using it — if one component updates a record through LDS, every other component wired to that same record (via `getRecord`) is automatically notified and re-renders with the fresh data, with no message channel or custom event required. This is specifically scoped to data LDS itself manages; data that came from a custom Apex method is not automatically refreshed this way, which is exactly the gap Lesson 19's `refreshApex` and `notifyRecordUpdateAvailable` exist to close.

## Key terms

| Term | Meaning |
|---|---|
| Lightning Data Service (LDS) | The platform's built-in service for reading/writing records with no Apex required |
| `lightning/uiRecordApi` | The module exposing `getRecord`, `getFieldValue`, `createRecord`, `updateRecord`, `deleteRecord` |
| `@salesforce/schema` | The import path for compile-time-safe object and field references |
| `lightning-record-edit-form` / `-view-form` | Declarative, no-JavaScript components for viewing/editing a record |
| Shared LDS cache | The single client-side cache keeping every LDS-wired component in sync automatically |

## Lab

Build a component that wires `getRecord` for a Contact's `FirstName`, `LastName`, and `Email`, displaying them with `getFieldValue`. Separately, build a `lightning-record-edit-form` for the same object that edits those same three fields. Explain, concretely, what would happen to the first (wired) component's displayed data immediately after a user saves the second (form) component — and why no custom code is needed to make that happen.

## Check yourself

Can you name the three imperative LDS functions used to create, update, and delete a record? Can you explain why none of the three can be used with `@wire`? Can you describe what the shared LDS cache actually guarantees, and what kind of data it does not cover?
