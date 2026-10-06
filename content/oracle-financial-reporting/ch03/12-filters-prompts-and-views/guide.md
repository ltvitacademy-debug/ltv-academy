# Filters, Prompts and Views

Lesson 11 built a working analysis with a hard-coded filter: amount over $10,000, more than 30 days overdue. That works for a one-time question, but what if a collections analyst wants to rerun the same analysis next week with a different dollar threshold, without asking you to edit it? That's the difference between a **filter** and a **prompt**, and it's the subject of this lesson, along with a closer look at the view types you touched briefly in lesson 11.

## What you'll learn

- Filters: narrowing results with a fixed condition
- Prompts: letting the person running the analysis choose the condition at run time
- A closer look at Table, Pivot Table, and Graph views
- When to add more than one view to the same analysis

## Filters: fixed conditions baked into the analysis

A **filter**, as used in lesson 11, is a condition set when the analysis is built and saved: "Invoice Amount > 10,000." Every time that analysis runs, for any user, that threshold applies — it does not change unless someone edits the analysis itself. Filters are the right choice when the condition genuinely shouldn't change: "Payment Status = Unpaid" is a reasonable permanent filter for an "open invoices" analysis; nobody running it wants to suddenly see paid invoices.

## Prompts: letting the viewer choose at run time

A **prompt** asks the person running the analysis (or viewing a dashboard that contains it) to supply a value before the results render — a dropdown for Business Unit, a date range picker, a text box for minimum invoice amount. The same underlying analysis design is reused, but each user, or each time it's run, can get a different slice of data without anyone touching the analysis definition.

Prompts are the right choice when different viewers legitimately need different answers from the same analysis: a Business Unit prompt lets each regional AP lead see only their own region's invoices from one shared analysis, rather than someone building ten near-identical analyses, one per region.

## Choosing the condition type

| Need | Use |
|---|---|
| A condition that should never change (e.g., only unpaid invoices) | Filter |
| A condition the viewer should set each time (e.g., which business unit) | Prompt |
| A condition most viewers won't change, but should be able to override occasionally | Prompt with a sensible default value |

## A closer look at the view types

- **Table** — every selected column as plain rows, closest to a raw export; good for detail-level review or feeding a scheduled export, less good for spotting a trend at a glance.
- **Pivot Table** — facts (measures) can be aggregated across dimensions placed on rows, columns, or both, with subtotals. This is where OTBI starts to feel like a spreadsheet pivot: dragging "Business Unit" from rows to columns reshapes the whole view instantly.
- **Graph** — the same selected facts and dimensions rendered as a bar, line, or pie chart, useful when the audience needs a quick visual read (a trend over time, a share of total) rather than exact figures.

An analysis isn't limited to one view. A common pattern is a detail table for drill-down, plus a graph for the at-a-glance summary, both built from the same underlying column selection, switched between with tabs.

## Recap

Filters set a fixed condition baked into the analysis; prompts let the person running it choose the condition each time, which is essential for sharing one analysis across many viewers with different needs. Table, Pivot Table, and Graph views each suit a different reading of the same data, and a single analysis can hold more than one. Next up, lesson 13: combining several analyses into a dashboard.
