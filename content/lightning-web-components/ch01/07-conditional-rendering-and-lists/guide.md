# Lesson 7 — Conditional Rendering and Lists

**Chapter 1 · Component Basics · Lesson 7 of 33**

## What you'll learn

- A deeper look at `lwc:if`/`lwc:elseif`/`lwc:else` versus the older `if:true`/`if:false`
- Combining conditional rendering with lists to build real, data-driven UI
- The difference between `for:each` and `iterator:` and when to reach for each
- Common list-rendering mistakes and how to avoid them

## Conditional rendering, revisited

Lesson 3 introduced the directives; this lesson applies them to a realistic pattern — showing a loading state, an error state, and the real content, which is close to the shape of nearly every data-driven component you'll write in Chapter 3:

```html
<template>
    <template lwc:if={isLoading}>
        <lightning-spinner alternative-text="Loading"></lightning-spinner>
    </template>
    <template lwc:elseif={hasError}>
        <p class="slds-text-color_error">{errorMessage}</p>
    </template>
    <template lwc:else>
        <c-contact-list contacts={contacts}></c-contact-list>
    </template>
</template>
```

Only one of these three branches ever renders at a time, driven by two simple booleans (`isLoading`, `hasError`) typically set from a wire adapter's `data`/`error` result. The older `if:true`/`if:false` pair can express the same two-state case but has no built-in "else if" — you'd need two separate `if:true`/`if:false` blocks checked against different conditions, which gets harder to read as more states are added.

## Lists: for:each vs. iterator:

`for:each` is the workhorse for rendering a simple list:

```html
<template for:each={contacts} for:item="contact">
    <c-contact-row key={contact.Id} contact={contact}></c-contact-row>
</template>
```

`iterator:` does the same job but also exposes `first` and `last` booleans, which is useful when the first or last row needs different styling or markup — for example, suppressing a divider line after the last row:

```html
<template iterator:it={contacts}>
    <div key={it.value.Id} class={it.first ? 'first-item' : ''}>
        <p>{it.value.Name}</p>
        <template lwc:if={it.last}></template>
    </div>
</template>
```

If you don't need `first`/`last`, `for:each` is simpler and more common; reach for `iterator:` specifically when the UI needs to know an item's position in the list.

## Combining both: empty, loading, and populated states

Real list UIs need to account for more than just "has data" — an empty array is not an error, and it's not the same as still loading:

```html
<template lwc:if={isLoading}>
    <lightning-spinner alternative-text="Loading"></lightning-spinner>
</template>
<template lwc:elseif={isEmpty}>
    <p>No contacts found.</p>
</template>
<template lwc:else>
    <template for:each={contacts} for:item="contact">
        <c-contact-row key={contact.Id} contact={contact}></c-contact-row>
    </template>
</template>
```

`isEmpty` here would typically be a getter — `get isEmpty() { return !this.isLoading && this.contacts.length === 0; }` — rather than a separately maintained field, which keeps the three states from ever contradicting each other (Lesson 8 covers getters in depth).

## Common mistakes

- **Using the array index as the `key`.** It works until the array is re-sorted, filtered, or has an item removed from the middle — then the framework reuses the wrong DOM node for the wrong record. Always key on a stable identifier like `Id`.
- **Forgetting the `key` is on the repeated element, not the `<template>` tag.** The key goes on the actual HTML or component element being repeated, not on the surrounding `<template for:each=...>` wrapper.
- **Mixing `if:true` and `lwc:if` on the same element.** A template element can use one directive family or the other, not both at once, and mixing them is a compile error.

## Key terms

| Term | Meaning |
|---|---|
| `lwc:if` / `lwc:elseif` / `lwc:else` | The modern multi-branch conditional rendering directive set |
| `for:each` | The standard directive for rendering a list of items |
| `iterator:` | A list-rendering directive that also exposes `first`/`last` for the current item |
| Stable key | A unique, unchanging identifier (like a record `Id`) used as the `key` for list items |

## Lab

Build a template (sketch it, no deploy required) for a component that shows a spinner while `isLoading` is true, "No records found" when a `records` array is empty and loading has finished, and otherwise renders each record with `for:each` using the record's `Id` as the key. Then write the `isEmpty` getter that makes the three states mutually exclusive without needing a fourth tracked field.

## Check yourself

Can you explain why `isEmpty` is better written as a getter than as a separately tracked field? Can you describe a concrete scenario where using an array index as a `key` causes a visible bug? Can you say when you'd reach for `iterator:` instead of `for:each`?
