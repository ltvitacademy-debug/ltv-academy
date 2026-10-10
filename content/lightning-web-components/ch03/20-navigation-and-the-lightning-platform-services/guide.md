# Lesson 20 — Navigation and the Lightning Platform Services

**Chapter 3 · Working with Salesforce Data · Lesson 20 of 33**

## What you'll learn

- Why navigation in Lightning Experience can't just be a plain `<a href>` link
- The `NavigationMixin` pattern: applying it, generating URLs, and navigating
- The most common `PageReference` types you'll use
- The difference between `Navigate` and `GenerateUrl`, and when to use each

## Why navigation needs its own service

Lightning Experience is a single-page application — records, list views, and related apps don't live at predictable, stable URLs you can just hardcode a link to, and a plain `<a href="/some/record/Id">` would bypass the app's own routing and state management. `lightning/navigation` exists specifically to let a component navigate anywhere in the platform (a record, a list view, an object's home, another app, a web URL) in a way that stays correct regardless of org configuration, URL structure, or which app the user is currently in.

## Applying the NavigationMixin

Navigation is exposed through a mixin applied to the component's base class — not a decorator, and not a plain import you call directly:

```js
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class AccountLink extends NavigationMixin(LightningElement) {
    handleClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.accountId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
}
```

The bracket syntax `this[NavigationMixin.Navigate](...)` looks unusual at first, but it's just how the mixin exposes its methods — `NavigationMixin.Navigate` and `NavigationMixin.GenerateUrl` are both accessed this way, always on `this`.

## Common PageReference types

The object passed to `Navigate` (or `GenerateUrl`) is called a `PageReference`, and its `type` determines which `attributes` it expects:

- **`standard__recordPage`** — a specific record's view/edit/clone page, given a `recordId`, `objectApiName`, and `actionName`.
- **`standard__objectPage`** — an object's home or list view, given an `objectApiName` and `actionName` (commonly `'home'` or `'list'`).
- **`standard__webPage`** — an external URL, given a `url`.
- **`standard__namedPage`** — a named platform page (such as the Home page), given a `pageName`.

## Navigate vs. GenerateUrl

`Navigate` actually moves the user to the target page immediately:

```js
this[NavigationMixin.Navigate](pageRef);
```

`GenerateUrl` instead returns a Promise that resolves to the URL string, without navigating anywhere — useful when you need a real `href` for an anchor tag (so middle-click/"open in new tab" works naturally), or you want to display the link without immediately acting on it:

```js
connectedCallback() {
    this[NavigationMixin.GenerateUrl](this.pageRef).then((url) => {
        this.recordUrl = url;
    });
}
```

```html
<a href={recordUrl} onclick={handleClick}>View Record</a>
```

Pairing the two is common: use `GenerateUrl` to populate a real `href` for accessibility and right-click behavior, and still call `Navigate` from the click handler (with `event.preventDefault()`) so the in-app router handles the actual navigation.

## Key terms

| Term | Meaning |
|---|---|
| `NavigationMixin` | The mixin from `lightning/navigation` applied to a component's base class to enable navigation |
| `PageReference` | The object describing a navigation target, with a `type` and matching `attributes` |
| `standard__recordPage` | A PageReference type for navigating to a specific record |
| `Navigate` | Immediately navigates the user to a PageReference target |
| `GenerateUrl` | Returns a Promise resolving to the URL string for a PageReference, without navigating |

## Lab

Write a component `caseLink` that applies `NavigationMixin`, and on click navigates to a `standard__recordPage` for a Case using an `@api caseId`. Then add a `connectedCallback()` that also calls `GenerateUrl` for the same PageReference and stores the result for use as a real `href`. Explain why an anchor tag using only the generated href, with no click handler calling `Navigate`, would still technically work for most cases — and why pairing both is still the recommended pattern.

## Check yourself

Can you explain why Lightning Experience can't be navigated with a plain hardcoded `<a href>` link? Can you write the bracket syntax for calling `Navigate` after applying `NavigationMixin`? Can you describe the difference in what `Navigate` and `GenerateUrl` each actually do?
