# Lesson 15 — Calling Apex

**Chapter 3 · Working with Salesforce Data · Lesson 15 of 33**

## What you'll learn

- How an Apex method gets exposed to LWC, on the Apex side
- The import path used to bring an Apex method into a component
- The two ways to invoke an imported Apex method: wired or imperative
- Why `cacheable=true` matters, and when a method can't have it

## Exposing an Apex method

An Apex method needs two things before any LWC component can call it: it must be `public` (or `global`) and `static`, and it must be annotated `@AuraEnabled`:

```apex
public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, Name, Email FROM Contact LIMIT 50];
    }
}
```

`with sharing` keeps the method respecting the running user's record-level sharing rules, which matters for any query touching real org data — Apex defaults to running without sharing enforcement unless the class says otherwise.

## Importing an Apex method into a component

The import path always follows the same shape: `@salesforce/apex/ClassName.methodName`, with exact casing matching the Apex class and method:

```js
import getContactList from '@salesforce/apex/ContactController.getContactList';
```

This is a default import — the method itself is what the module exports — which is why there are no curly braces around `getContactList`.

## Two ways to call it: wired or imperative

**Wired**, using the `@wire` decorator (covered in full in Lesson 17), is the right choice for read-only data the component needs as soon as it loads:

```js
import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ContactList extends LightningElement {
    @wire(getContactList) contacts;
}
```

**Imperative**, calling the imported function directly like any JavaScript function that returns a Promise, is the right choice when the call needs to happen in response to something specific — a button click, a search as the user types, or any write operation (Lesson 18 goes deeper on this):

```js
async handleRefreshClick() {
    try {
        this.contacts = await getContactList();
    } catch (error) {
        this.error = error;
    }
}
```

## cacheable=true and when you can't use it

`@AuraEnabled(cacheable=true)` tells the platform this method is safe to cache on the client and is read-only — no DML, nothing with side effects. This is also a hard requirement for using `@wire`: an Apex method used with `@wire` must be `cacheable=true`, because the wire service relies on being able to cache and reuse its results. A method that performs DML (inserting, updating, or deleting records) or has any other side effect cannot be `cacheable=true`, and therefore cannot be used with `@wire` at all — it must be called imperatively instead.

## Reading the data and handling errors

A wired Apex result exposes `data` and `error` properties on the destination property (covered with full destructuring detail in Lesson 2); an imperative call either resolves with the return value or rejects with an error object whose message typically lives at `error.body.message`:

```js
async handleSave() {
    try {
        await saveRecord({ record: this.record });
    } catch (error) {
        this.errorMessage = error.body?.message ?? 'Unknown error';
    }
}
```

Lesson 21 covers surfacing that error to the user with a toast; for now, the key habit is always wrapping an imperative Apex call in `try`/`catch` (or a `.catch()`), since an unhandled rejection fails silently from the user's point of view.

## Key terms

| Term | Meaning |
|---|---|
| `@AuraEnabled` | The Apex annotation that exposes a method to LWC (and Aura) |
| `cacheable=true` | Marks an `@AuraEnabled` method as read-only and client-cacheable; required for `@wire` |
| `@salesforce/apex/ClassName.methodName` | The fixed import path pattern for bringing an Apex method into a component |
| Wired call | Using `@wire` to automatically invoke a cacheable Apex method |
| Imperative call | Invoking an imported Apex method directly as a Promise-returning function |

## Lab

Write an Apex method `getOpenCasesForAccount(Id accountId)` annotated `@AuraEnabled(cacheable=true)`, returning a `List<Case>`. Import it into a component two different ways: once with `@wire`, and once as an imperative call triggered by a button. Explain, in writing, which of the two you'd actually choose for a "Refresh" button a user can click repeatedly, and why.

## Check yourself

Can you name the two requirements an Apex method must meet before LWC can call it at all? Can you write the exact import path syntax for an Apex method named `getAccounts` on a class named `AccountController`? Can you explain why a method performing DML can never be used with `@wire`?
