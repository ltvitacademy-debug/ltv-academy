# Lesson 24 — Styling

**Chapter 4 · Reusable UI · Lesson 24 of 33**

## What you'll learn

- How a component's `.css` file is automatically scoped, with no extra configuration
- The `:host` selector, and what it's for
- CSS custom properties as the sanctioned way to theme across shadow DOM boundaries
- Why you can't (and shouldn't try to) style another component's internals directly

## CSS is scoped automatically

Every component's optional `.css` file (sharing the component's name, e.g. `contactCard.css` for `contactCard.js`) applies only to that component's own template — styles never leak out to affect other components, and other components' styles never leak in. This happens automatically because of shadow DOM; there's no naming convention or build step you need to opt into, unlike some other frameworks' "CSS modules" that require explicit configuration.

```css
/* contactCard.css */
.name {
    font-weight: bold;
    color: var(--slds-g-color-neutral-base-10, #080707);
}
```

```html
<!-- contactCard.html -->
<template>
    <p class="name">{contactName}</p>
</template>
```

A sibling component can define its own `.name` class with completely different rules, with zero risk of collision.

## :host — styling the component's own root

`:host` is a special selector that targets the component's own custom-element tag itself, from inside its own CSS file — useful for setting a default display mode, margin, or border on the whole component as it sits in its parent's layout:

```css
/* statusBadge.css */
:host {
    display: inline-block;
    border-radius: 2px;
}
```

Without `:host`, there's no other way to reach the custom element tag itself from inside the component's own stylesheet, since the template's root content is what normal selectors target.

## CSS custom properties: the sanctioned way to theme across boundaries

Shadow DOM deliberately blocks most styling from crossing component boundaries — but CSS custom properties (`--my-variable`) are a documented exception: they *do* inherit down through shadow DOM, which makes them the standard mechanism for letting a parent influence a child's styling without breaking encapsulation:

```css
/* parent.css */
c-status-badge {
    --badge-color: #2E844A;
}
```

```css
/* statusBadge.css */
:host {
    background-color: var(--badge-color, #706E6B);
}
```

The child defines a fallback (`#706E6B`) and exposes a named custom property; a parent that wants to override it simply sets that custom property on the child's tag — the child doesn't need to add a new `@api` property or decorator just to allow this kind of visual customization.

## Don't target classes you don't own

Base Lightning components (Lesson 22) render their own internal markup with their own internal class names, some matching SLDS conventions. It's tempting to write a selector like `.slds-input { ... }` hoping to reach inside a `lightning-input`, but Salesforce explicitly advises against targeting class names you don't own, including a base component's internals — those internal structures can change in a future release with no warning, since they were never part of the component's documented public contract. If a base component doesn't expose the styling hook you need through its own documented attributes, that's a sign to build a wrapper or use a different component, not to reach past the shadow boundary.

## Key terms

| Term | Meaning |
|---|---|
| Scoped CSS | A component's styles automatically confined to its own template, with no configuration needed |
| `:host` | The selector targeting a component's own custom-element tag from inside its own CSS |
| CSS custom property | A `--variable`-style CSS value that inherits through shadow DOM, used for cross-component theming |
| Styling classes you don't own | An anti-pattern of targeting another component's internal class names, which can break on any future release |

## Lab

Write a `priorityFlag` component whose `:host` sets `display: inline-block` and a default background color via a CSS custom property `--flag-color` with a sensible fallback. Then write a parent CSS rule that overrides `--flag-color` to red for a `high` priority. Explain, specifically, why this approach works across the shadow DOM boundary when a normal class-based override from the parent would not.

## Check yourself

Can you explain why a component's `.css` file doesn't need any special naming convention to stay scoped to just that component? Can you describe what `:host` lets you style that a normal selector inside the template cannot reach? Can you explain why targeting `.slds-input` directly from outside a `lightning-input` component is discouraged?
