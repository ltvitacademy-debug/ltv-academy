# Lesson 30 — Context Filters

**Chapter 5 · Filters, Sorting & Analytics · Lesson 30 of 95**

## What you'll learn

- What "adding a filter to context" actually means
- Why context filters get computed before every other filter type
- The visual cue Tableau uses so you can tell a context filter apart
  from a regular one
- A concrete case where skipping a context filter gives you the wrong
  answer, not just a slower one

## The baseline: no context filter

Here's `Sub-Category` by `Sales`, unfiltered — all ten sub-categories:

![Tableau worksheet showing Sub-Category on Rows and SUM(Sales) on Columns, with all ten sub-categories visible and no filters applied.](/courses/tableau/ch05/30-context-filters/before-context-filter.png)
*The unfiltered baseline — every sub-category, ranked by total sales.*
Source: [Tableau Help — Use Context Filters](https://help.tableau.com/current/pro/desktop/en-us/filtering_context.htm)

## Adding a filter to context

Right-click any existing categorical filter's pill and choose **Add to
Context**. Do that with a `Category: Furniture` filter, and here's what
you get:

![Tableau worksheet with Category: Furniture as a grey pill at the top of the Filters shelf (a context filter), and a Sub-Category filter below it in blue — only Chairs, Tables, Bookcases, and Furnishings remain, all within Furniture.](/courses/tableau/ch05/30-context-filters/context-filter-applied.png)
*Category: Furniture sits at the top, colored grey — the visual signal that it's a context filter, computed first.*
Source: [Tableau Help — Use Context Filters](https://help.tableau.com/current/pro/desktop/en-us/filtering_context.htm)

Two things changed: the `Category: Furniture` pill moved to the top of
the Filters shelf, and its color changed from blue to grey. Both are
Tableau's visual signal that this filter is now a **context filter** —
it gets computed once, first, and every other filter in the view is
then applied only to the rows that survive it.

## Why the order matters, not just the speed

Context filters are usually explained as a performance trick — and
they are one, since Tableau only has to filter the already-narrowed
context once instead of re-filtering the full dataset for every other
filter. But the real reason to understand them is correctness, not
speed: a Top N filter (or any filter depending on a computed
aggregate) gives a genuinely different, and often wrong, answer
depending on whether it's computed against the whole dataset or
against a context.

"Top 5 sub-categories by sales, within Furniture" is a different
question from "Top 5 sub-categories by sales, period, then show me
which of those happen to be Furniture." Without a context filter,
Tableau computes Top N against the *entire* dataset first — you'd get
whichever of the overall top 5 happen to be Furniture, which might be
zero, one, or five of them, purely by coincidence. Add `Category:
Furniture` to context first, and the Top N is correctly computed only
among Furniture's own sub-categories.

## Order of operations, previewed

This connects directly to Lesson 31: context filters run early in
Tableau's actual filter order, before dimension filters, measure
filters, and table calculation filters. Lesson 31 lays out the entire
sequence.

## Key terms

| Term | Meaning |
|---|---|
| Context filter | A filter computed first, once, that narrows the data every other filter then operates on |
| Add to Context | The action (right-click a filter pill) that promotes a regular filter into a context filter |
| Grey pill | Tableau's visual indicator that a filter on the Filters shelf is a context filter |

## Lab

1. In Sample Superstore, build a Top 5 Sub-Category filter by `SUM([Sales])` with no other filters — note the result.
2. Add a `Category: Furniture` filter, then add it to context, keeping the Top 5 Sub-Category filter in place. Compare the sub-categories that now appear.
3. Explain in your own words why the two results differ, using the "correctness, not just speed" framing from this lesson.

## Check yourself

You're ready for Lesson 31 when you can explain why adding a filter to
context can change *which rows* pass a Top N or Condition filter, not
just how fast the view renders.
