# Lesson 6 — Properties and Reactivity

**Chapter 1 · Component Basics · Lesson 6 of 33**

## What you'll learn

- The difference between a public (`@api`) property and an internal one
- Why most fields are reactive automatically, without any decorator at all
- When `@track` is still genuinely needed for objects and arrays
- The practical rule for deciding whether a property should be public

## @api marks the public surface of a component

The `@api` decorator marks a field (or a method) as part of a component's public API — the parent component is allowed to set it, read it, or call it:

```js
import { LightningElement, api } from 'lwc';

export default class ContactCard extends LightningElement {
    @api recordId;
    @api variant = 'compact';
}
```

A parent sets an `@api` property through an HTML attribute, with the property name converted to kebab-case in markup:

```html
<c-contact-card record-id={selectedId} variant="detailed"></c-contact-card>
```

The convention that matters here: `@api` properties are meant to be set by a parent and read (not reassigned) by the child itself. If a child needs to change a value its parent gave it, the correct pattern is to copy that value into an internal field rather than mutate the `@api` property directly.

## Most fields are reactive without any decorator

Since the Spring '20 release, the LWC engine automatically observes simple field reassignment — any class field referenced in the template (directly, or through a getter) triggers a re-render when it's reassigned to a new value, with no decorator required:

```js
export default class Counter extends LightningElement {
    count = 0; // plain field — already reactive

    increment() {
        this.count = this.count + 1; // reassignment is observed automatically
    }
}
```

This is a common point of confusion for anyone who learned LWC from older material, which predates this behavior and shows `@track` on every field out of habit.

## When @track is still needed

`@track` still has one real job: observing changes to the *internals* of an object or array, not just a full reassignment of the whole thing. Reassigning an entire array or object is already observed automatically — but mutating a property inside an existing object, or pushing into an existing array in place, is not automatically observed unless that field is decorated with `@track`:

```js
export default class ProfileForm extends LightningElement {
    @track address = { street: '', city: '' };

    updateCity(event) {
        // mutating a property *inside* the object — needs @track to be observed
        this.address.city = event.target.value;
    }
}
```

A simpler and often-preferred alternative to `@track` is to avoid in-place mutation entirely and reassign instead, which is already reactive without any decorator:

```js
updateCity(event) {
    this.address = { ...this.address, city: event.target.value };
}
```

Many teams standardize on this reassignment pattern specifically so they never need `@track` at all — it's worth knowing both approaches, because you'll encounter plenty of existing code using `@track`.

## Deciding what should be @api

A good rule of thumb: if a value is configured by, or communicated to, a parent component or Lightning App Builder, it should be `@api`. If a value is purely internal bookkeeping for how this one component renders itself (a boolean toggling a spinner, for example), it should stay a plain internal field. Over-exposing internal state as `@api` makes a component's contract harder to understand and easier to break when you refactor its internals later.

## Key terms

| Term | Meaning |
|---|---|
| `@api` | Decorator marking a property or method as part of a component's public interface |
| Plain reactive field | A class field that re-renders its template automatically on reassignment, with no decorator |
| `@track` | Decorator needed specifically to observe mutations to the internals of an object or array |
| Reassignment vs. mutation | Replacing a whole object/array (reactive by default) vs. changing a property/element inside it (needs `@track` or a new reassignment) |

## Lab

Write a small component class with an `@api recordId` property and an internal field `isLoading = false`. Add a method that toggles `isLoading`. Then add a field `filters = { status: 'Open', priority: 'High' }` and write two versions of a method that changes `status` to `'Closed'` — one that mutates `filters.status` directly (and would need `@track` to be observed), and one that reassigns `filters` to a new object with the spread operator (already reactive with no decorator). Explain which one you'd choose for a real component and why.

## Check yourself

Can you explain, in your own words, the contract implied by marking a property `@api`? Can you describe a situation where reassigning a field is not enough and `@track` (or an equivalent reassignment pattern) is required? Can you state the rule of thumb for deciding whether a given property should be public or internal?
