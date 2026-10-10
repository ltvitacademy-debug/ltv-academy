# Lesson 13 — Slots and Composition

**Chapter 2 · Connecting Components · Lesson 13 of 33**

## What you'll learn

- What a `<slot>` is and how it differs from passing data through `@api`
- Default slots versus named slots
- How slotted content is actually rendered, and whose styles apply to it
- Why slots are the right tool for layout-shaped components

## Slots pass markup, not just data

Everything in Lessons 10–11 passes *data* — strings, numbers, objects — between a parent and child. A `<slot>` is different: it lets a parent pass actual **markup** into a child, and the child decides where that markup appears inside its own template. This is the standard pattern for any component whose job is mostly about layout rather than data — a card, a modal, a panel — where the *content* belongs to whoever's using the component, but the *frame* around it belongs to the component itself.

## The default slot

A component declares a slot in its template with the `<slot>` tag:

```html
<!-- infoCard.html (child) -->
<template>
    <div class="slds-card">
        <div class="slds-card__body slds-card__body_inner">
            <slot></slot>
        </div>
    </div>
</template>
```

A parent places content inside the child's tag, and that content renders wherever `<slot>` appears in the child's template:

```html
<!-- parent's template -->
<c-info-card>
    <p>This paragraph renders inside infoCard's slot.</p>
</c-info-card>
```

If the parent passes no content, a `<slot>` can declare fallback content directly inside its own tags, which only renders when the parent doesn't fill the slot:

```html
<slot>
    <p>No content provided.</p>
</slot>
```

## Named slots

A component can expose more than one slot by giving each a `name`, letting a parent target specific regions of the child's layout independently:

```html
<!-- infoCard.html (child) -->
<template>
    <div class="slds-card">
        <div class="slds-card__header slds-grid">
            <slot name="header"></slot>
        </div>
        <div class="slds-card__body slds-card__body_inner">
            <slot></slot>
        </div>
        <div class="slds-card__footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
```

```html
<!-- parent's template -->
<c-info-card>
    <h2 slot="header">Account Summary</h2>
    <p>Main content goes in the default slot.</p>
    <lightning-button slot="footer" label="View All"></lightning-button>
</c-info-card>
```

Any content without a `slot` attribute goes into the unnamed default slot; content with `slot="header"` goes specifically into the slot named `header`.

## Styling and ownership of slotted content

Slotted content is written by the parent, so it's styled by the parent's own CSS, not the child's — the child's stylesheet (Lesson 24) cannot reach in and restyle an element the parent placed into its slot, because that element still belongs to the parent's own shadow tree, even though it visually renders inside the child. This is a direct consequence of shadow DOM encapsulation, and it's useful to know early, because "my child component's CSS isn't affecting the content I slotted into it" is a common point of confusion that is actually expected behavior, not a bug.

## When to reach for a slot versus @api

Use `@api` properties when a child needs specific *values* to do its job — a record ID, a status string, a boolean flag. Use slots when a child provides *structure* or *layout* and the actual content varies by caller — a generic card, panel, or modal shell that different parents fill with completely different markup each time. Many real components use both at once: a card component might take `@api title` for a simple text heading while still exposing a slot for a more complex, free-form body.

## Key terms

| Term | Meaning |
|---|---|
| `<slot>` | A placeholder in a child's template where a parent's markup is rendered |
| Default slot | An unnamed `<slot>` that receives any content without a `slot` attribute |
| Named slot | A `<slot name="...">` that receives only content tagged with the matching `slot` attribute |
| Fallback content | Content placed inside a `<slot>` tag that renders only when the parent provides nothing |

## Lab

Build a `modalShell` component with a named `header` slot, a default slot for the body, and a named `footer` slot. Write a parent template that fills all three. Then explain, specifically, why a CSS rule inside `modalShell.css` targeting `p { color: red; }` would not change the color of a `<p>` the parent slotted into the body, and what that tells you about who owns slotted content.

## Check yourself

Can you explain the difference between passing data through `@api` and passing markup through a `<slot>`? Can you write the markup for both a default and a named slot? Can you say whose CSS applies to content placed into a slot, and why?
