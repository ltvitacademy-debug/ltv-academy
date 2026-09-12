# Lesson 71 — LOD Expressions and Filters

**Chapter 12 · Level of Detail Expressions · Lesson 71 of 95**

## What you'll learn

- Tableau's full filter **order of operations** — the exact sequence
  filters and LOD expressions run in
- Why `FIXED` and `INCLUDE`/`EXCLUDE` respond differently to the same
  dimension filter
- How to deliberately change that order using context filters
- A worked example showing a FIXED calculation before and after adding a
  context filter

## Tableau's order of operations

Every view runs through the same pipeline, in this order:

| Stage | What happens |
|---|---|
| 1. Extract filters | Applied at the data source / extract level |
| 2. Data source filters | Applied to every sheet using that data source |
| 3. Context filters | Regular filters explicitly promoted to run early |
| 4. **FIXED LOD expressions computed** | FIXED sees the data *after* stages 1-3, but before anything below |
| 5. Dimension filters | Ordinary filters on dimension fields |
| 6. **INCLUDE / EXCLUDE LOD expressions computed** | These see the data *after* dimension filters have already applied |
| 7. Measure filters | Filters on aggregated measures |
| 8. Table calculation filters | Applied last, on the fully computed result set |

This single table explains almost every "why doesn't my LOD calculation
match what I expect" question:

- **FIXED is computed at stage 4** — before ordinary dimension filters
  (stage 5) get applied. That's why a plain `Region` filter doesn't change
  a `FIXED [Customer Name] : SUM([Sales])` result: by the time that filter
  runs, FIXED has already produced its number.
- **INCLUDE and EXCLUDE are computed at stage 6** — *after* dimension
  filters. That's why they *do* reflect a regular `Region` filter: the
  filtered rows are already gone by the time INCLUDE/EXCLUDE run.

## Making a filter run earlier: context filters

If you want an ordinary filter to affect a `FIXED` calculation, you
promote it to a **context filter**: right-click the filter pill on the
Filters shelf and choose **Add to Context**. The pill turns gray, and
Tableau now applies it at stage 3 — before FIXED calculates at stage 4.

```
{ FIXED [Customer Name] : SUM([Sales]) }
```

- With `Region = West` as a *regular* filter: this still returns each
  customer's total sales across **all** regions.
- With `Region = West` promoted to a **context filter**: this now returns
  each customer's total sales **within West only** — because the context
  filter ran before FIXED had a chance to compute.

## A worked example

Suppose Sample Superstore has a customer, "Aaron Bergman," who has orders
in both the East and West regions.

| Setup | `{ FIXED [Customer Name] : SUM([Sales]) }` for Aaron Bergman |
|---|---|
| No filter | Total across East + West |
| `Region = West` (regular filter) | **Still** total across East + West — unchanged |
| `Region = West` (context filter) | Total for West only |

Same expression, same customer, two different answers — entirely because
of *when* the region filter runs relative to when FIXED computes. This is
exactly why reading a workbook's filter shelf (regular vs. gray/context
pills) matters just as much as reading the calculated field itself.

## Key terms

| Term | Meaning |
|---|---|
| Order of operations | The fixed sequence Tableau applies extract, data source, context, FIXED, dimension, INCLUDE/EXCLUDE, measure, and table calc filters in |
| Context filter | A filter promoted to run before FIXED and other dimension filters, changing what data FIXED sees |
| Regular (dimension) filter | Runs after FIXED, before INCLUDE/EXCLUDE — the default for any filter you drag to the Filters shelf |

## Lab

1. On Sample Superstore, create `Customer Total Sales` as
   `{ FIXED [Customer Name] : SUM([Sales]) }` and put it on a view with
   `Customer Name` on Rows.
2. Add `Region` to the Filters shelf and set it to `West` only. Confirm
   the totals for customers who also buy elsewhere do **not** shrink.
3. Right-click the `Region` filter pill, choose **Add to Context**, and
   confirm the same totals now *do* shrink to West-only sales.

## Check yourself

You're ready for Lesson 72 when you can state, from memory, which stage
of the order of operations FIXED runs at versus INCLUDE/EXCLUDE, and
explain what a context filter changes about that.
