# Lesson 31 — Performance Best Practices

**Chapter 5 · Testing and Delivery · Lesson 31 of 33**

## What you'll learn

- Why rendering a large list is one of the most common LWC performance problems
- Lazy loading with `lwc:if`/`if:true` as a cheap, built-in performance tool
- Why `renderedCallback()` is a common source of accidental performance bugs
- The bulk-data mindset carried over from Apex, applied to LWC and Apex together

## Large lists are the most common performance problem

Salesforce's own performance testing found list size matters far more than most developers expect — large record counts (in the thousands) rendered directly into the DOM measurably slow down the page, while lists of roughly 50 rows or fewer render quickly with a good user experience. The fix is never "render fewer fields" — it's rendering fewer **rows** at once, through pagination or server-side lazy loading (fetching only the page of records currently needed via Apex and SOQL, rather than pulling an entire large result set into the browser at once). `lightning-datatable` (Lesson 22) supports this pattern directly, loading additional rows as the user scrolls rather than rendering everything up front.

## Lazy loading with conditional rendering

Lesson 7's `lwc:if`/`if:true` directives are also a legitimate, built-in performance tool, not just a UI pattern: content inside a conditional block that's currently `false` is not instantiated into the DOM at all, which means it isn't adding to render cost, and if that block contains a child component, that child's own lifecycle hooks and any data fetching it would trigger simply don't run until the condition becomes true:

```html
<template lwc:if={showAdvancedFilters}>
    <c-advanced-filter-panel></c-advanced-filter-panel>
</template>
```

If `advancedFilterPanel` fetches its own data in `connectedCallback()`, that fetch is deferred until a user actually opens the advanced filters — rather than happening unconditionally for every user, most of whom may never touch that panel.

## renderedCallback() is a common source of accidental slowdowns

Lesson 14 already covered the correctness risk — an unguarded property assignment inside `renderedCallback()` can trigger an infinite re-render loop. Even short of an actual infinite loop, doing expensive work inside `renderedCallback()` unconditionally is a performance risk specifically because that hook runs after *every* render, not just the first one. The same guard pattern from Lesson 14 (a boolean flag ensuring one-time logic only runs once) is as much a performance safeguard as a correctness one.

## Bulk thinking applies to LWC too

Apex developers already know not to put SOQL or DML inside a loop; the same mindset applies to data access from LWC. Fetching data once per row of a rendered list (one Apex call per contact in a `for:each`, for example) multiplies a single reasonable request into dozens or hundreds of individual round trips. The fix mirrors the Apex pattern: fetch everything the list needs in one batched call before rendering, and pass the already-fetched data down into child components as `@api` properties, rather than letting each child independently fetch its own slice of data.

## Avoiding unnecessary work in getters

Lesson 8 noted that a getter recomputes every time it's read. For a getter doing meaningful work — sorting or filtering a sizeable array — and referenced from a template that re-renders frequently, that repeated computation can add up. When this becomes measurable, the fix is usually to cache the derived result in a plain field, recomputed only when its actual inputs change, rather than leaving an expensive calculation inside a getter that fires on every single render.

## Key terms

| Term | Meaning |
|---|---|
| Lazy loading | Deferring a component's existence (and any data fetching it would trigger) until it's actually needed |
| Pagination / server-side lazy loading | Fetching only a page of records at a time instead of an entire large result set |
| Render guard | A boolean flag preventing `renderedCallback()` logic from re-running unnecessarily every render |
| Bulk data access | Fetching data once per list rather than once per row, mirroring Apex's bulkification discipline |

## Lab

Take a hypothetical `caseList` component rendering 500 cases with `for:each`, where each `caseRow` child fetches its own related contact via an individual Apex call in `connectedCallback()`. Rewrite the approach at a design level: describe what single batched Apex call would replace the 500 individual calls, and how the fetched contact data would flow down into each `caseRow` without each child doing its own fetch. Separately, identify one place in this design where `lwc:if`-based lazy loading could reduce unnecessary work for most users.

## Check yourself

Can you explain why rendering a very large list is a performance problem, and what the standard fix is? Can you describe how `lwc:if`/`if:true` acts as a lazy-loading mechanism, not just a visibility toggle? Can you explain why doing expensive work unconditionally inside `renderedCallback()` is a performance risk even without causing an infinite loop?
