# Lesson 94 — Project 3: Enterprise Performance Dashboard

**Chapter 17 · Portfolio Projects · Lesson 94 of 95**

## What you'll learn

- How to combine parameters, LOD expressions, table calculations, and
  dashboard actions into a single cohesive deliverable
- How to build a working what-if scenario a viewer can actually adjust
- How to design navigation between connected views instead of one
  overloaded screen
- What separates a real enterprise-grade dashboard from a portfolio
  toy

## The scenario

This is the hardest and most complete project in this course — the
one meant to sit at the top of your portfolio. A VP of Sales at the
same fictional retail chain wants one comprehensive deliverable that
combines regional performance, product performance, and a live
what-if profitability scenario, suitable to walk a real interviewer
through end to end.

## Dataset and fields

Sample Superstore, pushed further than Projects 1 and 2 — this time
including `Discount` and `Quantity` alongside `Sales`, `Profit`,
`Order Date`, `Region`, `Category`, and `Sub-Category`.

## Required deliverables

1. **A multi-sheet dashboard (or connected dashboards with navigation
   buttons)** combining at least five worksheets: a regional map, a
   category/sub-category performance view (treemap or bar chart), a
   monthly trend with a trend line, a KPI header, and a
   discount-vs-profit analysis view.
2. **A what-if parameter** — a "Discount Cap" or "Profit Target"
   parameter that feeds a calculated field (e.g., Simulated Profit at
   a capped discount rate), so a viewer can drag the parameter and
   watch the numbers actually recompute.
3. **At least one correctly-scoped LOD expression** — for example, a
   "% of Regional Total" measure, or an extension of Project 2's
   Customer Lifetime Value concept applied at a different grain.
4. **At least one correctly-configured table calculation** — for
   example, a running total of sales, or a rank of sub-categories by
   profit *within region* — with **Compute Using** deliberately set,
   not left on Tableau's default addressing.
5. **A mix of dashboard actions** — filter and highlight actions
   between views, plus at least one navigation action (a button
   linking to another dashboard, or a "Reset" control) so the whole
   thing reads as one connected experience rather than isolated
   screens.
6. **A working mobile or tablet layout**, built with Tableau's Device
   Designer, alongside the desktop layout.
7. **Dynamic titles** — at least one sheet or dashboard title that
   updates its text based on the current parameter or filter selection
   (Chapter 14 covered this specifically).

## What a strong version of this looks like

| Criterion | What it looks like when done well |
|---|---|
| What-if parameter | The resulting calculation is verifiably correct — spot-check the math by hand at two parameter values |
| LOD expression | Correctly scoped to the right level of detail, doing something Project 1 and 2 didn't already do |
| Table calculation | Compute Using is deliberately configured, not left on Tableau's default partition/addressing |
| Dashboard actions | Chain together in a way a user could explain the click-path of, without being told |
| Device layout | A genuinely usable mobile/tablet version exists, not just a shrunk desktop layout |
| Dynamic titles | Text visibly changes as parameters or filters change, not static labels |
| Overall | Could be demoed, live, in under three minutes, by someone who didn't build it, without them getting lost |

This project is deliberately harder than Projects 1 and 2 — it's meant
to be the piece that proves you can combine every major Tableau
capability from this course into one working, explainable whole, which
is exactly what a real BI Analyst or Developer role expects you to be
able to do on day one.

## Key terms

| Term | Meaning |
|---|---|
| What-if parameter | A parameter used to drive a live scenario calculation a viewer can adjust interactively |
| Compute Using | The addressing/partitioning setting that determines how a table calculation is scoped |
| Device Designer | Tableau's tool for building a layout variant of a dashboard specific to phone or tablet screens |
| Navigation action | A dashboard action (usually a button) that takes the viewer to another dashboard or sheet |

## Lab

1. Build all five required worksheets first, independently, and
   verify each one is correct on its own.
2. Build the what-if parameter and its calculated field, and spot-check
   the resulting numbers by hand at two different parameter settings.
3. Assemble the dashboard(s), wire up filter, highlight, and
   navigation actions, and add at least one dynamic title.
4. Build a Device Designer layout for tablet or mobile.
5. Practice presenting the whole thing out loud, start to finish, in
   under three minutes.

## Check yourself

You're ready for Lesson 95 when you can demo this dashboard, live, in
under three minutes, to someone who has never seen it — including the
what-if parameter, at least one filter or highlight action, and the
navigation between views — without getting lost or needing notes.
