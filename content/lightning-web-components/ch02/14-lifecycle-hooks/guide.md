# Lesson 14 — Lifecycle Hooks

**Chapter 2 · Connecting Components · Lesson 14 of 33**

## What you'll learn

- The full set of LWC lifecycle hooks and the order they fire in
- What each hook is actually safe and appropriate to do
- Why `renderedCallback()` needs a guard to avoid infinite loops
- Why lifecycle hooks should never be declared `async`

## The five hooks, in order

A component's life runs through up to five callback methods, each one a regular method you define on the class (not decorated) that the framework calls automatically at the right moment:

1. **`constructor()`** — runs when the component instance is created, before it's attached to the DOM. Covered in depth in Lesson 4: call `super()` first, don't touch `this.template` or attributes yet.
2. **`connectedCallback()`** — runs when the component is inserted into the DOM. This is the standard place to subscribe to a Lightning Message Channel (Lesson 12), kick off non-wire data fetching, or set up anything that needs the component to actually exist on the page.
3. **`render()`** (rarely overridden directly) followed by the template actually rendering.
4. **`renderedCallback()`** — runs after every render of the component, including the very first one. Useful for DOM manipulation that must happen after the template exists, like focusing a field.
5. **`disconnectedCallback()`** — runs when the component is removed from the DOM. This is where you clean up: unsubscribe from a message channel, clear a timer or interval, cancel a pending operation.

There is also **`errorCallback(error, stack)`**, which is invoked when an unhandled error occurs in the component or one of its children, useful for error reporting or rendering fallback UI instead of letting the error propagate uncaught.

## connectedCallback can fire more than once

If a component is removed from the DOM and later reinserted, `connectedCallback()` fires again — it is not a strict "only once, at creation" hook, even though that's the common case. Code that assumes it runs exactly once per component instance can produce subtle bugs if that same instance is ever detached and reattached, for example by a parent toggling `lwc:if` around it.

## renderedCallback needs a guard

Because `renderedCallback()` runs after *every* render, setting a reactive property inside it can trigger another render, which calls `renderedCallback()` again, which could set the property again — an infinite loop. The standard fix is a boolean guard that ensures the one-time logic only runs once:

```js
hasRendered = false;

renderedCallback() {
    if (this.hasRendered) {
        return;
    }
    this.hasRendered = true;
    const input = this.template.querySelector('lightning-input');
    if (input) {
        input.focus();
    }
}
```

Without the guard, even an innocuous-looking assignment inside `renderedCallback()` can quietly degrade performance or lock up the component.

## Never mark a lifecycle hook async

The LWC engine does not await a Promise returned from a lifecycle hook — it calls the hook and moves on, regardless of whether an `async` function inside it has finished. If a hook needs to do asynchronous work, call a separate `async` helper method from inside the synchronous hook instead of marking the hook itself `async`:

```js
connectedCallback() {
    this.loadInitialData(); // fire-and-forget from the hook's perspective
}

async loadInitialData() {
    try {
        this.records = await someAsyncCall();
    } catch (error) {
        this.error = error;
    }
}
```

## Order across parent and child

Connection and rendering generally flow from parent to child: a parent's `connectedCallback()` fires, then its children's, and similarly for `renderedCallback()` top to bottom through the tree — though the exact interleaving has changed across LWC versions and should not be relied on for correctness. Treat each component's lifecycle as its own responsibility rather than writing logic that depends on precisely when a sibling or child's hook fires relative to your own.

## Key terms

| Term | Meaning |
|---|---|
| `connectedCallback()` | Fires when the component is inserted into the DOM; can fire more than once per instance |
| `renderedCallback()` | Fires after every render; needs a guard to avoid triggering itself in a loop |
| `disconnectedCallback()` | Fires when the component is removed from the DOM; the place for cleanup |
| `errorCallback(error, stack)` | Fires when an unhandled error occurs in the component or a child |
| Render guard | A boolean field preventing one-time `renderedCallback()` logic from re-running every render |

## Lab

Write a component that subscribes to a Lightning Message Channel in `connectedCallback()` and unsubscribes in `disconnectedCallback()` (reuse the pattern from Lesson 12). Add a `renderedCallback()` that focuses the first `lightning-input` on the component's first render only, using a boolean guard. Explain, specifically, what would go wrong if the guard were removed.

## Check yourself

Can you list all five lifecycle hooks in the order they fire? Can you explain why `connectedCallback()` isn't guaranteed to run only once per component instance? Can you explain, precisely, why marking a lifecycle hook `async` doesn't do what it looks like it should do?
