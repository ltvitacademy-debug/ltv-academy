# Lesson 9 — Events

**Chapter 2 · Connecting Components · Lesson 9 of 33**

## What you'll learn

- Why components need a dedicated event mechanism instead of calling each other's methods directly
- How to create and dispatch a `CustomEvent`
- The naming convention every custom event must follow
- How to pass data with an event using its `detail` property

## Components shouldn't call each other directly

A child component should never reach up and directly manipulate its parent, and siblings shouldn't call into each other's internals either — that kind of direct coupling is exactly what makes a component library fragile, because a change to one component silently breaks another one far away in the tree. LWC's answer is the same one the rest of the web platform uses: components communicate by firing **events**, and other components (usually a parent) listen for them. The component firing the event doesn't know or care who's listening, which is what keeps components independently reusable.

## Creating and dispatching a CustomEvent

Any component can create a native browser `CustomEvent` and dispatch it on itself:

```js
handleSave() {
    const saveEvent = new CustomEvent('save', {
        detail: { recordId: this.recordId, status: 'Saved' }
    });
    this.dispatchEvent(saveEvent);
}
```

`dispatchEvent` is inherited from `LightningElement` (ultimately from the native `HTMLElement`), so no import is needed to call it — you only need `CustomEvent` itself, which is a standard global the browser provides.

## Naming convention: lowercase, no spaces, no special characters

Custom event names must be lowercase, with no spaces and no reserved characters like periods or hyphens used in the name itself (hyphens are fine as part of a longer convention some teams use, but the DOM's own case-insensitivity rules mean uppercase letters are not reliably distinguishable). `save`, `recordselect`, `statuschange` are typical real examples. This isn't a style nitpick — because HTML attributes are case-insensitive, an event named `recordSelect` and one named `recordselect` would be indistinguishable to a listener in the template, so Salesforce's own convention is to always use lowercase, single-word (or concatenated) event names.

## Passing data: the detail property

The `detail` property on a `CustomEvent` is the standard, documented place to attach a payload to the event — anything the event needs to communicate beyond "this happened" goes there:

```js
const changeEvent = new CustomEvent('statuschange', {
    detail: { oldStatus: 'Open', newStatus: 'Closed' }
});
this.dispatchEvent(changeEvent);
```

A listener reads the payload off `event.detail`:

```js
handleStatusChange(event) {
    console.log(event.detail.oldStatus, event.detail.newStatus);
}
```

## Bubbling and composed: off by default

By default, a `CustomEvent` dispatched from inside a component does **not** bubble up through the DOM and does not cross shadow DOM boundaries — it only reaches a listener attached directly on the element that dispatched it. Two additional options control this:

```js
new CustomEvent('save', {
    detail: { recordId: this.recordId },
    bubbles: true,    // propagate up through ancestor elements
    composed: true    // allow crossing shadow DOM boundaries
});
```

For the common case — a child notifying its direct parent — you don't need either option, because the parent's listener is attached directly to the child's tag in the parent's own template (Lesson 11 covers this pattern in full). `bubbles`/`composed` matter more for the rarer case of an event needing to be caught further up a deeply nested tree.

## Key terms

| Term | Meaning |
|---|---|
| `CustomEvent` | The native browser API used to create a custom, named event with an optional payload |
| `dispatchEvent` | The inherited method used to fire an event from a component |
| `detail` | The standard property on a `CustomEvent` used to attach a data payload |
| `bubbles` / `composed` | Options controlling whether an event propagates past its immediate listener |

## Lab

Write a method `handleDelete()` on a hypothetical `caseRow` component that creates and dispatches a `CustomEvent` named `rowdelete`, with a `detail` payload containing the row's `caseId`. Then write the signature of a listener method `handleRowDelete(event)` that would read `caseId` back out of `event.detail`. Explain why the event is named `rowdelete` and not `rowDelete` or `row-delete`.

## Check yourself

Can you explain why components communicate through events instead of calling each other's methods directly? Can you write the exact syntax for creating and dispatching a `CustomEvent` with a payload? Can you state the naming rule for custom events and why it exists?
