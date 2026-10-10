# Lesson 32 — LWC Practice Project: Case Dashboard

**Chapter 5 · Testing and Delivery · Lesson 32 of 33**

## What you'll learn

- How to plan a multi-component feature from a plain-language requirement
- How to decide the right component boundaries before writing any code
- How this course's concepts — LDS, wire, events, navigation, toasts — combine into one working feature
- How to sequence the build so each piece is testable before the next depends on it

## The requirement

Build a **Case Dashboard**: a support manager opens it and sees every open Case for their team, can filter by priority, can click a case to see its status update live elsewhere on the same page without a full reload, and can click a row to navigate to the actual Case record. This is a realistic composite of nearly everything covered in Chapters 1–4, and working through the design here is the point of this lesson — the Lab asks you to actually build it.

## Planning the component boundaries first

Before writing any code, decide what the pieces are and what each one owns:

- **`caseDashboard`** (container/orchestrator) — wires the list of open cases via a cacheable Apex method, owns the `priorityFilter` state, and renders the filtered list.
- **`caseRow`** (generic-ish feature component, Lesson 23) — receives one case as an `@api` property, dispatches a `caseselect` event on click (Lesson 11), and applies `NavigationMixin` (Lesson 20) to navigate on a dedicated "view" action separate from the select.
- **`casePriorityFilter`** — a small, genuinely generic component wrapping a `lightning-combobox`, dispatching a `filterchange` event with the selected priority.
- **`caseStatusBadge`** — a reusable, generic status pill taking `@api status`, usable inside `caseRow` and potentially elsewhere later (exactly the kind of generic component Lesson 23 describes).

Deciding these boundaries up front — rather than discovering them mid-build — is what keeps each piece small enough to reason about and test independently.

## Data flow through the design

1. `caseDashboard` wires a cacheable Apex method `getOpenCases()` returning all open cases (Lesson 15, Lesson 17).
2. A getter `filteredCases` (Lesson 8) derives the filtered list from the wired data and the current `priorityFilter` field — never a separately tracked, manually-updated field.
3. `caseDashboard` renders one `caseRow` per filtered case with `for:each`, using `Id` as the `key` (Lesson 7), passing the case down as `@api case` and listening for `oncaseselect` (Lesson 11).
4. `casePriorityFilter` dispatches `filterchange`; `caseDashboard` listens and updates `priorityFilter`, which flows into the `filteredCases` getter automatically.
5. Selecting a case publishes its Id on a Lightning Message Channel (Lesson 12) so a separate, unrelated `caseDetailPanel` component elsewhere on the record page can react — this is the "update live elsewhere on the page" requirement, and it's exactly the scenario LMS exists for, rather than chaining events through components that aren't actually related in the tree.
6. A dedicated "view" icon inside `caseRow` uses `NavigationMixin.Navigate` to a `standard__recordPage` (Lesson 20) — kept separate from the row's `caseselect` event so clicking the row to preview and clicking the icon to navigate away don't trigger the same behavior.
7. Any failure wiring the initial data surfaces through the `error` branch of the wire result, displayed as a `ShowToastEvent` with `variant: 'error'` (Lesson 21).

## Build order

Build and test (Lesson 28) bottom-up: `caseStatusBadge` first (no dependencies), then `caseRow` (depends only on `caseStatusBadge`), then `casePriorityFilter` (no dependencies, build in parallel), and only last `caseDashboard`, wiring everything together once its children already work in isolation.

## Key terms

| Term | Meaning |
|---|---|
| Orchestrator component | The top-level component owning shared state and composing child components |
| Component boundary | The deliberate decision of what each component owns versus what it delegates |
| Bottom-up build order | Building and testing leaf components before the component that composes them |

## Lab

Build the five components described above against a Developer Edition org (real Case object, real Apex). At minimum: `caseStatusBadge` and `casePriorityFilter` should have passing Jest tests (Lesson 28) before you wire them into `caseRow` and `caseDashboard`. Confirm the full flow works: filtering changes the visible rows, selecting a row publishes over LMS, and the navigation icon correctly routes to the real Case record.

## Check yourself

Can you explain why `caseselect` (an event) and record navigation (NavigationMixin) are kept as two separate actions on `caseRow` rather than one? Can you justify, in your own words, why this design uses Lightning Message Service for the "update elsewhere on the page" requirement instead of a custom event? Can you explain why `filteredCases` is a getter rather than a field updated inside the filter-change handler?
