# Lesson 78 — Advanced Chart Challenge

**Chapter 13 · Advanced Visualizations · Lesson 78 of 95**

## What you'll learn

- Nothing new — this lesson is a checkpoint, combining every advanced
  chart type from this chapter into one dashboard from scratch
- How to decide which advanced visualization fits a given business
  question, when nobody's telling you which one to use

## The challenge

Using Sample Superstore, build **one dashboard** containing all four of
the following, choosing the layout yourself:

1. **A dual-axis combination chart** (Lesson 74) — Sales as a line,
   Profit as bars, by month.
2. **A KPI view** (Lesson 75) — a threshold calculation on Shape,
   showing which Sub-Category/Region combinations clear a sales goal you
   choose.
3. **A Pareto chart** (Lesson 76) — Sub-Categories sorted by Sales,
   descending, with a cumulative percent-of-total line.
4. **A dynamic reference line** (Lesson 77) — on any continuous axis in
   the dashboard, driven by a parameter, updated by a parameter action on
   hover or select.

No starter workbook, no step-by-step screenshots this time — every
technique needed is already in your last four lessons. The goal isn't to
learn something new; it's to prove you can reach for the right tool
without being told which one, and combine several of them into a single
working dashboard.

## Formulas you'll need (all from this chapter)

```
-- KPI threshold (Lesson 75)
IF SUM([Sales]) > 25000 THEN "Above Goal" ELSE "Below Goal" END

-- Pareto's second, dual-axis pill (Lesson 76) gets two table calcs:
--   Running Total, then Percent of Total, computed using Sub-Category

-- Dynamic reference line (Lesson 77): a Threshold parameter,
-- referenced as the reference line's Value field
```

## A self-check rubric

| Requirement | Done? |
|---|---|
| Dual-axis chart uses two different mark types (not two lines) | |
| KPI view uses Shape, driven by a real threshold calculation, not manual coloring | |
| Pareto chart's line is a genuine running total / percent-of-total table calculation, not a manually typed series | |
| Reference line's Value field points at a parameter, and a parameter action moves it | |
| All four live on one dashboard, not four separate worksheets never combined | |

## Why this lesson has no screenshot

Every real screenshot this chapter needed already appeared in Lessons
74-77, sourced directly from Tableau's own documentation. This lesson
asks you to reproduce and combine those same techniques on your own
data and layout choices — showing a screenshot of "the" finished
dashboard here would just be one specific answer among many equally
valid ones, so it's left out deliberately rather than presented as the
one correct result.

## Key terms

| Term | Meaning |
|---|---|
| Dashboard | A combination of worksheets, filters, and objects assembled into one interactive view (full treatment in Chapter 14) |
| Self-check rubric | A checklist you use to verify your own work meets a spec, without a graded answer key |

## Lab

Build the dashboard described above. Do not skip any of the four
requirements — each one exercises a different lesson from this chapter,
and Chapter 14 (Dashboards) assumes you're already comfortable placing
multiple worksheets together.

## Check yourself

You're ready for Chapter 14 when your dashboard satisfies every row of
the self-check rubric above, without help from this guide or your notes
from Lessons 74-77.
