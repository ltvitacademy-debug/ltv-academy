# Lesson 23 — Reusable UI Components

**Chapter 4 · Reusable UI · Lesson 23 of 33**

## What you'll learn

- How to design a component's public interface so it stays reusable across different callers
- The difference between a "feature" component and a "generic" component
- Composition over duplication: building bigger UI out of small, focused pieces
- Common signs that a component has taken on too many responsibilities

## Designing for more than one caller

A component is genuinely reusable when it can be dropped into a second, unrelated context without being rewritten — and that almost always comes down to deliberate interface design, not luck. Every technique from Chapters 1–3 (`@api` properties, slots, events) is a tool for drawing the line between what a component decides for itself and what it lets its caller decide. A reusable component exposes exactly the knobs a caller actually needs (through `@api` and slots) and fires events for exactly the things a caller might want to react to — nothing more, nothing less.

## Feature components vs. generic components

It's useful to think of components along a spectrum:

- A **feature component** is built for one specific business purpose — `openCaseList`, `accountHealthScore` — and it's fine for it to be tightly coupled to that purpose's data shape and business logic.
- A **generic component** is built to be used anywhere that general-shaped need shows up — `confirmModal`, `statusBadge`, `searchInput` — and it should know nothing about any specific business object or Apex class.

The trap to avoid is a generic-looking component that's secretly a feature component in disguise — a `statusBadge` that hardcodes Case status values, for example, can't be reused for Opportunity stages without a rewrite. If a component's name sounds generic, its implementation should actually be generic too.

## Composition over duplication

Rather than writing three near-identical table components for Cases, Opportunities, and Accounts, a reusable approach builds one generic `dataTablePanel` that takes `columns` and `data` as `@api` properties (or children via slots), and three thin feature components that each know how to fetch their own object's data and hand it to the shared generic component:

```html
<!-- openCaseList.html (feature component) -->
<template>
    <c-data-table-panel
        title="Open Cases"
        columns={caseColumns}
        data={cases}>
    </c-data-table-panel>
</template>
```

This way, a styling or behavior fix to the table only has to happen once, in `dataTablePanel`, and every feature component built on top of it benefits immediately.

## Signs a component has taken on too much

- It has a long list of `@api` properties that only make sense for one specific caller — a sign it's really a feature component wearing a generic component's name.
- It imports Apex methods or object-specific schema references directly, inside what's supposed to be a reusable, presentation-only component.
- Changing it for one caller's new requirement risks visibly breaking a different, unrelated caller — a strong signal its responsibilities should be split.

The fix is usually to split the component: keep the presentation-only, generic piece free of business logic, and push the business-specific logic (what to fetch, what the columns mean) into a thin feature component that uses the generic one.

## Key terms

| Term | Meaning |
|---|---|
| Reusable component | A component usable in a second, unrelated context without being rewritten |
| Feature component | A component built for one specific business purpose, tightly coupled to its data |
| Generic component | A component built for a general-shaped need, with no knowledge of a specific business object |
| Composition over duplication | Building multiple feature components on top of one shared generic component |

## Lab

You've been asked to build table displays for both open Cases and open Opportunities, which currently exist as two separate, nearly identical hand-built components. Design the split: name the one generic component you'd extract, list its `@api` properties, and name the two thin feature components that would each feed it their own object's data. Explain what happens to both feature components the next time the generic component's table styling needs a fix.

## Check yourself

Can you explain, in your own words, the difference between a feature component and a generic component? Can you describe one concrete sign that a component has taken on too many responsibilities? Can you explain why composition (one generic component, several thin feature components) scales better than duplicating a table component for each business object?
