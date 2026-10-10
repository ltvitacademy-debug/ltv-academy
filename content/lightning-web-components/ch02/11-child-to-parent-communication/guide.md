# Lesson 11 — Child to Parent Communication

**Chapter 2 · Connecting Components · Lesson 11 of 33**

## What you'll learn

- The standard pattern for a child notifying its parent: dispatch, then listen
- Exact event-listener binding syntax in the parent's template
- How to read the event payload in the parent's handler
- Why this pattern keeps the child reusable across different parents

## The pattern: child dispatches, parent listens

Lesson 9 covered creating and dispatching events; this lesson covers the other half — a parent listening for an event fired by a specific child, which is the single most common communication pattern in LWC applications. The child knows nothing about who's listening or what they'll do with the information:

```js
// caseRow.js (child)
import { LightningElement, api } from 'lwc';

export default class CaseRow extends LightningElement {
    @api caseRecord;

    handleSelect() {
        const selectEvent = new CustomEvent('caseselect', {
            detail: { caseId: this.caseRecord.Id }
        });
        this.dispatchEvent(selectEvent);
    }
}
```

```html
<!-- caseRow.html -->
<template>
    <div onclick={handleSelect}>{caseRecord.Subject}</div>
</template>
```

## Listening in the parent's template

The parent attaches a listener using the same `on` + event-name convention as any DOM event, written directly on the child's tag:

```html
<!-- caseList.html (parent) -->
<template>
    <template for:each={cases} for:item="caseRecord">
        <c-case-row
            key={caseRecord.Id}
            case-record={caseRecord}
            oncaseselect={handleCaseSelect}>
        </c-case-row>
    </template>
</template>
```

Notice the listener attribute is `oncaseselect` — the event name `caseselect` prefixed with `on`, all lowercase, matching the naming rule from Lesson 9 exactly. This is why custom event names can't contain characters the case-insensitive attribute syntax would mangle.

## Reading the payload in the parent

```js
// caseList.js (parent)
handleCaseSelect(event) {
    const selectedId = event.detail.caseId;
    this.selectedCaseId = selectedId;
}
```

The parent's handler receives the same `event` object the child dispatched, with the same `detail` payload — nothing is transformed or renamed in between. From the parent's perspective, this looks exactly like handling a native DOM event such as `onclick`, which is intentional: custom events are meant to feel like a natural extension of the platform, not a separate Salesforce-specific concept.

## Why this keeps the child reusable

Because `caseRow` only dispatches `caseselect` and has no idea what happens afterward, the exact same `caseRow` component can be dropped into a completely different parent that reacts differently — one parent might navigate to the record, another might just highlight it, another might do nothing with it at all. The child's job is to describe *what happened* (a case was selected); deciding *what to do about it* is entirely the listening parent's responsibility. This separation is what makes small, focused child components genuinely reusable across a codebase instead of being written once per screen.

## A grandchild talking to a grandparent

Events only reach a listener attached directly to the dispatching element, so if a grandchild needs to notify a grandparent two levels up, the middle component has to explicitly re-dispatch its own event after catching the grandchild's — there's no automatic multi-level bubbling for a plain, non-bubbling `CustomEvent`. For that specific cross-cutting case, Lesson 12's Lightning Message Service is often the better tool than chaining events through every intermediate layer.

## Key terms

| Term | Meaning |
|---|---|
| Dispatch-then-listen | The pattern where a child fires a custom event and a parent listens for it on the child's tag |
| `on<eventname>={handler}` | The exact binding syntax a parent uses to listen for a child's custom event |
| `event.detail` | Where the parent reads the payload the child attached when dispatching |
| Component reusability | The benefit of a child not knowing or caring who listens to its events |

## Lab

Build the full round trip for a `ratingStars` child component: it dispatches a `ratingchange` event with `detail: { value: selectedStars }` when a star is clicked, and a parent `productReview` listens for `onratingchange`, storing the value in a field `currentRating`. Write both the child's dispatch code and the parent's template listener and handler. Then explain what would have to change in `caseList.js` if `caseRow`'s event were renamed from `caseselect` to `rowselected`.

## Check yourself

Can you write, from memory, the exact HTML attribute syntax a parent uses to listen for a child's `statuschange` event? Can you explain why a plain CustomEvent dispatched by a grandchild doesn't automatically reach a grandparent? Can you describe why keeping a child unaware of its listeners improves reusability?
