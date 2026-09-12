# Lesson 70 — INCLUDE & EXCLUDE LOD

**Chapter 12 · Level of Detail Expressions · Lesson 70 of 95**

## What you'll learn

- What makes `INCLUDE` and `EXCLUDE` fundamentally different from `FIXED`:
  they're **relative to the view**, not independent of it
- How `INCLUDE` adds finer detail than the view has
- How `EXCLUDE` removes detail the view would otherwise have
- Two classic real-world patterns: average order size, and percent of
  parent category

## FIXED is absolute. INCLUDE and EXCLUDE are relative.

Lesson 69's `FIXED` computes at a grain that has nothing to do with the
view — put it anywhere, it ignores the shelves. `INCLUDE` and `EXCLUDE`
work differently: they compute *relative to whatever's currently on the
view*, then add or remove specific dimensions from that. Change the view,
and an `INCLUDE`/`EXCLUDE` result can change with it — that's expected
behavior, not a bug.

## INCLUDE: adding detail the view doesn't have

```
{ INCLUDE [Order ID] : COUNTD([Product Name]) }
```

This computes the count of distinct products **per order** — finer detail
than a view that only has, say, `Region` on Rows. Tableau then
re-aggregates that per-order number up to whatever the view's actual grain
is. Put this calculation on a view with `Region` on Rows and wrap it in
`AVG(...)` at the view level, and you get the **average number of distinct
products per order, by region** — a number you cannot get with a plain
`COUNTD([Product Name])`, because that would count distinct products
*across all orders in the region*, not per order.

This "add detail, then let Tableau re-aggregate up" pattern is the whole
point of `INCLUDE`: it lets you compute something at a finer grain than
the view, so a following aggregation (often `AVG`) can summarize *those*
finer numbers, rather than summarizing the raw rows directly.

## EXCLUDE: removing detail the view has

```
{ EXCLUDE [Sub-Category] : SUM([Sales]) }
```

Picture a view grained by `Category` and `Sub-Category` together (say,
Furniture → Chairs, Furniture → Tables). A plain `SUM([Sales])` gives you
each sub-category's own total. `EXCLUDE [Sub-Category]` removes
Sub-Category from the calculation's grain — so it returns each row's
**parent Category total** instead, repeated across every sub-category row
that belongs to that category.

That's exactly the building block for a **percent-of-parent** calculation:

```
SUM([Sales]) / { EXCLUDE [Sub-Category] : SUM([Sales]) }
```

Chairs' sales, divided by all of Furniture's sales — computed without a
second query, a second data source connection, or a table calculation's
addressing/partitioning rules (Lesson 72 covers exactly that comparison).

## Side by side

| | FIXED | INCLUDE | EXCLUDE |
|---|---|---|---|
| Relationship to view | Independent | View's grain **+** listed dimension | View's grain **−** listed dimension |
| Changes if you edit the view? | No (mostly) | Yes | Yes |
| Typical use | A number that shouldn't move (customer lifetime value) | Add detail, then re-aggregate (average order size) | Remove detail for parent-level comparisons (percent of category) |

## Key terms

| Term | Meaning |
|---|---|
| INCLUDE | LOD keyword that computes at the view's dimensions plus the one(s) listed — finer than the view |
| EXCLUDE | LOD keyword that computes at the view's dimensions minus the one(s) listed — coarser than the view |
| Percent of parent | A ratio of a detail row's value to its parent group's total — a common EXCLUDE use case |
| Re-aggregation | What Tableau does when an LOD result is finer than the view — it aggregates the LOD's own output up to the view's grain |

## Lab

1. On Sample Superstore, build a view with `Region` on Rows. Create
   `Avg Products Per Order` as
   `AVG({ INCLUDE [Order ID] : COUNTD([Product Name]) })` and add it to
   the view.
2. Build a second view grained by `Category` and `Sub-Category`. Create
   `Category Total` as `{ EXCLUDE [Sub-Category] : SUM([Sales]) }`, then
   create `Pct of Category` as `SUM([Sales]) / [Category Total]` and
   format it as a percentage.
3. In your own words, explain why editing the view (say, adding `Segment`
   to Rows) can change an INCLUDE or EXCLUDE result, but wouldn't change
   a FIXED result.

## Check yourself

You're ready for Lesson 71 when you can explain the difference between
"independent of the view" (FIXED) and "relative to the view" (INCLUDE,
EXCLUDE) in your own words, with an example of each.
