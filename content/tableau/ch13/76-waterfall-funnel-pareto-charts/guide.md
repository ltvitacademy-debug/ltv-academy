# Lesson 76 — Waterfall, Funnel & Pareto Charts

**Chapter 13 · Advanced Visualizations · Lesson 76 of 95**

## What you'll learn

- How to build a **Pareto chart** — Tableau's own documented technique,
  combining a sorted bar chart with a cumulative-percentage line
- How a **waterfall chart** is built from the Gantt mark type plus a
  running total, even though "Waterfall" isn't a menu option
- How a **funnel chart** is approximated in Tableau using bar padding,
  even though Tableau has no native funnel chart type either

## Pareto charts: the 80/20 view, built from real Tableau tools

A **Pareto chart** answers "which categories account for most of the
total?" — it's a bar chart of individual values, sorted largest to
smallest, with a line overlaid showing the **cumulative percentage of
total** as you move across the bars. The classic use: sub-categories
sorted by sales, with a line showing that (say) the first six
sub-categories already account for 80% of all sales.

Tableau's own documentation walks through building this directly: start
with a sorted bar chart (`Sub-Category` on Columns, `SUM(Sales)` on
Rows, sorted descending), drag a second `Sales` pill onto the same axis
to create a dual axis, then apply two **table calculations** to that
second pill — a running total, and percent of total — so it renders as a
rising cumulative-percentage line:

![A Pareto chart: descending sales bars by sub-category with a rising orange cumulative-percentage line overlaid, reaching 100% at the last bar.](/courses/tableau/ch13/76-waterfall-funnel-pareto-charts/pareto6.png)
*The finished Pareto chart — bars sorted by Sales descending, cumulative percent-of-total as the overlaid line.*
Source: [Tableau Help — Create a Pareto Chart](https://help.tableau.com/current/pro/desktop/en-us/pareto.htm)

This is exactly the dual-axis technique from Lesson 74, combined with the
table calculations from Chapter 7 — a Pareto chart isn't a separate
feature, it's those two things stacked together.

## Waterfall charts: a technique, not a menu item

Tableau has no "Waterfall" chart type in Show Me. A waterfall — showing
how a starting value moves up and down through a sequence of steps to
reach an ending value (a classic use: a profit bridge from budget to
actual, broken out by driver) — is built using the **Gantt bar** mark
type, with a **running total** of the measure determining where each
segment starts, and the measure itself (made negative for decreases)
determining each segment's length. Tableau's own documentation on
building common chart types describes this exact mechanism: a Gantt mark
whose bar length is a (possibly negative) measure, stacked using a
running-total table calculation for its starting position.

```
Gantt bar length:  SUM([Amount])                (negative = decrease)
Gantt bar start:   RUNNING_SUM(SUM([Amount])) − SUM([Amount])
```

Because this only exists as a documented *technique* rather than a
dedicated Show Me option, there's no single official screenshot of "the"
waterfall chart to show — the honest thing to show here is the mechanism
itself, not a fabricated finished screenshot.

## Funnel charts: also a technique, built with bar padding

Tableau likewise has no native "Funnel" chart type. A funnel — showing a
sequence of stages narrowing in count or value, like a sales pipeline
from Leads → Qualified → Proposal → Closed — is approximated with a bar
chart whose bars are **centered** and whose width **shrinks stage over
stage**, achieved by adding a calculated padding measure to the size or
by layering two mirrored bar charts (one measure, one negative "padding"
measure) so the visible bars appear to taper toward the center.

```
Padding = (MAX(SUM([Count])) − SUM([Count])) / 2
```

As with the waterfall chart, this is a real, working technique — but
because Tableau doesn't ship it as a distinct chart type, there's no
single official Tableau screenshot of a finished funnel to show honestly.

## Why this lesson mixes a real screenshot with technique diagrams

The Pareto chart gets a real Tableau Help screenshot because Tableau
documents it directly, end to end, as a supported build. The waterfall
and funnel charts are real, working Tableau techniques — but neither is
a documented Show Me chart type with its own official screenshot, so
this lesson shows the underlying mechanism as an original diagram instead
of claiming a screenshot that doesn't exist.

## Key terms

| Term | Meaning |
|---|---|
| Pareto chart | A sorted bar chart plus a cumulative percent-of-total line, built from a dual axis and two table calculations |
| Waterfall chart | A sequence of increases/decreases from a start to an end value, built from Gantt bars plus a running total |
| Funnel chart | A tapering sequence of stages, approximated with centered, shrinking-width bars |
| Running total | A table calculation that sums a measure cumulatively — used as the Gantt bar's starting position in a waterfall |

## Lab

1. On Sample Superstore, build the Pareto chart above: sorted
   `Sub-Category` bars by `SUM(Sales)`, plus a dual-axis line using
   running total and percent-of-total table calculations.
2. Build a small waterfall: a Gantt chart showing quarterly profit
   changes (Q1 → Q2 → Q3 → Q4), using a running-total calculation for
   each bar's starting position.
3. Write down which of the three charts in this lesson has a dedicated
   Show Me option, and which two are techniques you build by hand.

## Check yourself

You're ready for Lesson 77 when you can build a Pareto chart from
scratch and explain, without checking back, why waterfall and funnel
charts require Gantt bars and padding measures instead of a single
menu option.
