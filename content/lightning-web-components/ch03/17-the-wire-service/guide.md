# Lesson 17 — The Wire Service

**Chapter 3 · Working with Salesforce Data · Lesson 17 of 33**

## What you'll learn

- What `@wire` actually does, and how it differs from a plain function call
- The two ways to use `@wire`: on a property versus on a function
- Reactive wire parameters using the `$` prefix
- What "provisioning" means, and why wired data can arrive more than once

## @wire is a subscription, not a one-time fetch

This is the single most important mental model for the wire service: `@wire` sets up an ongoing **subscription** to a data source — a wire adapter (like `getRecord`) or a cacheable Apex method — not a one-time fetch that runs once and never again. The wire service decides when to re-provision data: when the component connects, when a reactive parameter changes, or when the underlying cache is invalidated elsewhere. You never call a wired property or method yourself to "get" data; you just declare the dependency and handle whatever comes back whenever it arrives.

## Wiring to a property

The simplest form assigns the wire's result directly to a property, which then exposes `data` and `error`:

```js
import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ContactList extends LightningElement {
    @wire(getContactList) contacts;

    get hasError() {
        return this.contacts.error;
    }
}
```

In the template, you'd reference `contacts.data` and `contacts.error` directly.

## Wiring to a function

The alternative form decorates a method instead of a property. The function receives the same `{ data, error }` shape as its single parameter, destructured right in the signature, and you decide what to do with each piece — commonly, assigning them to separate fields:

```js
import { LightningElement, api, wire } from 'lwc';
import getContactsBornAfter from '@salesforce/apex/ContactController.getContactsBornAfter';

export default class WireApexFunction extends LightningElement {
    @api minBirthDate;
    contacts;
    error;

    @wire(getContactsBornAfter, { birthDate: '$minBirthDate' })
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
}
```

Wiring to a function is useful when you need to run logic the moment new data arrives — transforming it, merging it with other state — rather than just exposing the raw `data`/`error` shape to the template.

## Reactive parameters: the $ prefix

A `$` prefix on a wire configuration value marks that value as **reactive** — a property reference the wire service watches, re-provisioning data automatically whenever that property changes:

```js
@wire(getRecord, { recordId: '$recordId', fields: FIELDS })
account;
```

Here, `'$recordId'` tells the wire service to re-run `getRecord` every time `this.recordId` changes — for example, when a parent passes in a different record. Leaving off the `$` (just `recordId`) would pass the literal string `"recordId"` as the parameter value, which is a common and confusing mistake for anyone new to the syntax.

## Why provisioning can happen more than once

Because `@wire` is a live subscription, the same wired property or function can receive new data multiple times over a component's life: once when the component first connects, again if a reactive parameter changes, and again if something elsewhere invalidates the underlying cache (Lesson 19 covers this with `refreshApex`). Code that assumes a wire adapter "runs once" can miss legitimate updates — always write the handler to correctly process whatever `data`/`error` shape arrives, every time, rather than only on the first call.

## Key terms

| Term | Meaning |
|---|---|
| `@wire` | The decorator that subscribes a property or function to a wire adapter or cacheable Apex method |
| Wire adapter | A data source designed to work with `@wire`, such as `getRecord` |
| Reactive parameter (`$`) | A `$`-prefixed wire config value that re-triggers provisioning when it changes |
| Provisioning | The act of the wire service delivering (or re-delivering) data to a wired property or function |

## Lab

Write a component with an `@api accountId` property and a wired Apex call `getContactsForAccount({ accountId: '$accountId' })`, wired to a function (not a property) that stores results into separate `contacts`/`error` fields. Explain what happens, concretely, the moment a parent changes which `accountId` it passes in — and why that would NOT happen if the `$` were missing from `'$accountId'`.

## Check yourself

Can you explain, in your own words, why @wire is better described as a subscription than a one-time fetch? Can you write both the property form and the function form of wiring the same Apex method? Can you explain exactly what the `$` prefix does, and what mistake happens if you forget it?
