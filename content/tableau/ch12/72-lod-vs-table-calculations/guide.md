# Lesson 72 — LOD vs. Table Calculations

**Chapter 12 · Level of Detail Expressions · Lesson 72 of 95**

## What you'll learn

- What actually differs between an LOD expression and a table calculation
  — not just syntax, but *when* and *where* each one computes
- A decision table for choosing between them
- Two things table calculations can do that LOD expressions structurally
  cannot
- Two things LOD expressions can do that table calculations structurally
  cannot

## Same output, different machinery

Both LOD expressions (this chapter) and table calculations (Chapter 7) can
produce numbers like "percent of total" or "value relative to a group" —
which is exactly why people mix them up. But they compute in completely
different places:

| | LOD expression | Table calculation |
|---|---|---|
| **When it computes** | At query time, alongside the rest of the query sent to the data source | After the query returns, on the aggregated result set already sitting in the view |
| **What it can see** | Row-level detail in the underlying data source | Only the aggregated values already visible in the view |
| **How it's configured** | FIXED / INCLUDE / EXCLUDE keyword + dimension(s) | "Compute using" — which field(s) define the addressing and partitioning |
| **Depends on view layout / sort order?** | No | Yes — moving a field or changing sort order can change the result |
| **Works across a live database join or relationship?** | Yes, computed as part of the query | Only in the view, after aggregation |

## What table calculations can do that LOD can't

Table calculations understand **position within the visible table** — this
lesson, this row, relative to the row before or after it, or relative to
the whole partition. That's exactly what powers:

- **Running totals** — this row's value plus every row above it
- **Rank** — this row's position among the currently visible rows
- **Percent of total** — this row divided by the sum of all visible rows
- **Moving average** — an average across a sliding window of rows

None of these have a stable meaning outside "the table as currently sorted
and laid out." An LOD expression has no concept of "the row above this
one" — it only knows dimensions and aggregations, never position or
order. If a calculation's definition depends on order or position, it has
to be a table calculation.

## What LOD expressions can do that table calculations can't

LOD expressions compute against the underlying data source **before**
aggregation — which means they can reach a level of detail that isn't
even present in the view at all. `{ FIXED [Customer Name] : SUM([Sales]) }`
works even if `Customer Name` never appears anywhere on the current view.
A table calculation has no such reach — it can only work with dimensions
and measures that are already part of the view's result set. If a
calculation needs to reference a dimension that isn't (and shouldn't be)
on the view, it has to be an LOD expression.

## A simple decision table

| You need... | Use |
|---|---|
| A number independent of the current view (customer lifetime value) | FIXED LOD |
| A number computed at a slightly finer/coarser grain than the view, but still respecting the current filters | INCLUDE / EXCLUDE LOD |
| A running total, rank, or moving average as currently sorted | Table calculation |
| Percent of total *of the rows visible in this exact table* | Table calculation |
| Percent of a fixed parent group, regardless of what filters/sorts happen | EXCLUDE LOD |

## Key terms

| Term | Meaning |
|---|---|
| Query time | When LOD expressions compute — as part of the request sent to the data source, before results return |
| Result-set time | When table calculations compute — after the query already returned an aggregated table |
| Addressing / partitioning | How a table calculation's "compute using" setting is configured — has no LOD equivalent |
| Position-dependent | A calculation whose meaning depends on row order or table layout — always a table calculation, never an LOD expression |

## Lab

1. On Sample Superstore, build a bar chart of `SUM(Sales)` by `Category`.
   Add a **table calculation**: Percent of Total, computed using
   `Category`. Note the result changes if you add a `Region` filter.
2. Add an **LOD expression** instead:
   `SUM([Sales]) / { FIXED : SUM([Sales]) }` (percent of the *entire*
   unfiltered table, assuming no context filters). Compare it to the
   table calculation's result after applying the same `Region` filter.
3. Write one sentence explaining why the two percentages diverge once a
   filter is applied.

## Check yourself

You're ready for Lesson 73 when you can name one thing only a table
calculation can do, and one thing only an LOD expression can do, without
looking back at this lesson.
