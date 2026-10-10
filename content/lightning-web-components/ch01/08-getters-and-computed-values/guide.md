# Lesson 8 — Getters and Computed Values

**Chapter 1 · Component Basics · Lesson 8 of 33**

## What you'll learn

- How a JavaScript getter works inside an LWC component class
- Why getters are the right tool for any value that's derived from other reactive data
- How getters automatically recompute, and what that does and doesn't guarantee
- The difference between storing a computed value in a field versus exposing it as a getter

## A getter is a property that runs code

A getter is standard JavaScript syntax — a method prefixed with `get` that the class exposes as if it were a plain property, with no parentheses needed to read it:

```js
export default class OrderSummary extends LightningElement {
    subtotal = 0;
    taxRate = 0.08;

    get total() {
        return this.subtotal * (1 + this.taxRate);
    }
}
```

In the template, `total` is referenced exactly like any other property: `<p>{total}</p>` — not `{total()}`. The template has no idea whether `total` is a plain field or a getter, and it doesn't need to.

## Why getters, not fields, for derived values

Suppose `total` were a plain field instead. You would have to remember to recompute and reassign it every single place `subtotal` or `taxRate` changes — in `handleSubtotalChange`, in `handleTaxRateChange`, and in any other method that touches either value. Miss one spot, and `total` silently goes stale. A getter removes that entire category of bug: because `total` is computed fresh every time it's read, there is no "stale" state to accidentally leave behind. This is the single biggest reason getters are the standard LWC pattern for any value that's a function of other reactive data — formatted strings, filtered or sorted lists, booleans like `isEmpty` or `hasError`, and totals or counts.

## Getters recompute automatically, but only when read

The framework re-evaluates a getter whenever the template re-renders and the getter is referenced — it is not a continuously running calculation, and it does not fire on a timer. In practice this distinction rarely matters, because the framework already re-renders whenever a reactive field the getter depends on changes:

```js
get fullName() {
    return `${this.firstName} ${this.lastName}`;
}
```

Change `this.firstName` anywhere, and because `fullName` is referenced in the template, the framework knows to re-render the text bound to `fullName` — you never call `fullName()` yourself to "refresh" it.

## Getters can call other getters, and can filter/sort lists

Getters are ordinary methods, so they can do anything a method can do, including deriving from another getter:

```js
get openCases() {
    return this.cases.filter((c) => c.Status !== 'Closed');
}

get openCaseCount() {
    return this.openCases.length;
}
```

This keeps each piece of logic in exactly one place: if the definition of "open" ever changes, there's a single `openCases` getter to update, and everything built on top of it (`openCaseCount`, and any template referencing `openCases` directly) stays correct automatically.

## When a plain field is still the right choice

Getters aren't a replacement for every field — a getter recomputes its logic every time it's read, so a genuinely expensive calculation (say, a large sort or a heavy aggregation over a big array) run inside a getter that's read many times during a render can add up. For values set directly by user input, server responses, or wire adapters, a plain reactive field is still correct; getters are specifically for values *derived* from that underlying state, not for the state itself.

## Key terms

| Term | Meaning |
|---|---|
| Getter | A `get propertyName()` method exposed and read like a plain property, no parentheses |
| Derived value | A value computed from other reactive fields rather than set directly |
| Stale state | A cached computed value that no longer matches the data it was derived from |
| Computation cost | The runtime cost of recalculating a getter's logic every time it's read |

## Lab

Write a component class with fields `price` and `quantity`, and a getter `lineTotal` that multiplies them. Add a second getter `isOverBudget` that returns `true` when `lineTotal` exceeds a fixed `budgetLimit` field. Then explain, in writing, what would go wrong — and where you'd have to add code to prevent it — if `lineTotal` were a plain field instead of a getter, updated manually inside a `handleQuantityChange` method.

## Check yourself

Can you explain why a getter never goes "stale" the way a manually-updated field can? Can you write a getter that derives from another getter in the same class? Can you describe one situation where a plain field is still the better choice over a getter?
