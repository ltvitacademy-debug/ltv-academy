# Lesson 18 — Imperative Apex Calls

**Chapter 3 · Working with Salesforce Data · Lesson 18 of 33**

## What you'll learn

- When an imperative call is the right (or only) choice over `@wire`
- The exact pattern for calling an imported Apex method imperatively
- How to pass parameters to an imperative call
- Why error handling matters more here than with a wired call

## Imperative calls: a plain function that returns a Promise

Once an Apex method is imported (Lesson 15's `import methodName from '@salesforce/apex/Class.method'`), calling it imperatively means calling it exactly like any other JavaScript function that returns a Promise — no decorator, no special syntax:

```js
import { LightningElement } from 'lwc';
import getContactsBornAfter from '@salesforce/apex/ContactController.getContactsBornAfter';

export default class ContactSearch extends LightningElement {
    contacts;
    error;

    async handleSearch(event) {
        const birthDate = event.target.value;
        try {
            this.contacts = await getContactsBornAfter({ birthDate });
            this.error = undefined;
        } catch (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
}
```

Parameters are passed as a single object whose keys exactly match the Apex method's parameter names — `{ birthDate }` here maps to an Apex method signature like `getContactsBornAfter(Date birthDate)`.

## When imperative is the right call

- **Any write operation** — DML can't be `cacheable=true`, so it can never go through `@wire` (Lesson 15).
- **User-triggered actions** — a search box, a "Load More" button, a save action — anything that should run in direct response to a specific event rather than automatically whenever the component mounts or a reactive parameter changes.
- **One-time lookups that don't need to stay fresh** — if you genuinely only need the data once and have no reason to re-fetch it when something changes, an imperative call avoids the overhead of maintaining a live subscription.

## When wired is still better

If data needs to load automatically as soon as the component appears, and should also automatically refresh if a reactive parameter (like a `recordId` passed from a parent) changes, `@wire` does that for free — reimplementing the same behavior with an imperative call means manually re-triggering the call yourself every time that dependency changes, which is more code and easier to get wrong.

## Error handling matters more here

A wired call's error lands cleanly in the `error` property of the destructured result, almost unavoidably visible to whatever code is already looking at `data`/`error`. An imperative call's rejected Promise is easy to silently swallow if you forget the `try`/`catch` (or `.catch()`) — the call still runs, but a failure disappears with no feedback to the user at all unless you explicitly handle it:

```js
async handleSave() {
    try {
        await saveOpportunity({ opp: this.opportunity });
        this.dispatchEvent(new ShowToastEvent({ title: 'Saved', variant: 'success' }));
    } catch (error) {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Save failed',
            message: error.body?.message,
            variant: 'error'
        }));
    }
}
```

(`ShowToastEvent` is covered fully in Lesson 21 — the pattern above is the standard shape you'll write constantly once imperative calls and toasts combine.) Treat every imperative Apex call as needing explicit error handling by default, not as an afterthought.

## Chaining imperative calls

Because `async`/`await` reads top-to-bottom, chaining several dependent imperative calls is straightforward and far more readable than nesting `.then()` callbacks:

```js
async handleSubmit() {
    try {
        const accountId = await createAccount({ name: this.accountName });
        await createContact({ accountId, lastName: this.contactLastName });
        this.isSuccess = true;
    } catch (error) {
        this.error = error;
    }
}
```

## Key terms

| Term | Meaning |
|---|---|
| Imperative call | Invoking an imported Apex method directly as a Promise-returning function, with no decorator |
| Parameter object | The single object passed to an imperative call, with keys matching the Apex method's parameter names |
| Silent failure | A rejected Promise with no `catch`/`try` handling, which fails with no feedback to the user |

## Lab

Write an imperative handler `handleQuickCreate()` that calls an imported `createOpportunity({ name, stageName })` Apex method, wrapped in `try`/`catch`, setting a success flag on success and an error message on failure. Then deliberately remove the `try`/`catch` in a second version and explain, specifically, what the user would experience if the Apex call failed in that version.

## Check yourself

Can you name two concrete situations where an imperative call is the correct choice over `@wire`? Can you write the parameter-passing syntax for an imperative call with two named parameters? Can you explain why forgetting `try`/`catch` on an imperative call is riskier than forgetting to check `error` on a wired result?
