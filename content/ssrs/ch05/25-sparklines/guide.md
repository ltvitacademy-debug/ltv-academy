# Lesson 25 — Sparklines

**Chapter 5 · Charts & Visual Elements · Lesson 25 of 40**

## What you'll learn

- What a sparkline is, and how it differs from a full chart and from a
  data bar
- Why sparklines only make sense nested inside a table or matrix cell
- What "aligning" sparkline data means, and why it matters for
  comparing rows
- How to convert a sparkline into a full chart when you need axes and a
  legend after all

## A sparkline is a chart with everything but the data stripped away

A **sparkline** is a small, simple chart — no legend, no axis lines, no
labels, no tick marks — designed to convey a lot of information in very
little space, usually right inside a table cell next to the number it
illustrates.

![A table of six sales reps, each row showing a name, a number, and a small wavy line sparkline tracking their trend.](/courses/ssrs/ch05/25-sparklines/sparkline-example.gif)
*Six sparklines, stacked — the trend line is the point, not the axis.*

That's the real value of a sparkline: it's rarely useful on its own.
Line them up, one per row, and you can compare six people's trends at a
glance — Blythe and Tsoflias are climbing, Valdez has a dip mid-period —
without a single axis label getting in the way.

## Data bars: a close cousin, not the same thing

A **data bar** uses the same nesting idea but represents the data as a
bar rather than a line — closer to a single-cell bar chart than a
trend line.

![A table of six names, each with a colored horizontal bar of varying length and color segments in the same row.](/courses/ssrs/ch05/25-sparklines/data-bars-example.gif)
*Data bars — usually one bar per row, but that bar can still stack multiple values.*

Data bars typically represent a single data point per row, but — as the
stacked coloring above shows — one bar can still illustrate more than
one value (say, three priority levels of task count, stacked in one
bar). Sparklines, by contrast, almost always plot multiple points over
time. Both are technically variants of a full chart, just with the
supporting elements removed.

## Sparklines only nest — they can't stand in a detail row

You cannot add a sparkline to a detail row of a table. Because a
sparkline displays *aggregated* data, it has to go in a cell associated
with a group — a group total row, not a per-record row. This trips up
newcomers who try to drop a sparkline next to raw, ungrouped rows and
wonder why it won't take.

## Alignment: why rows have to share a scale

When several sparklines sit in the same column, comparing them only
works if they line up — the same calendar month has to land at the
same horizontal position in every row, and a value of 50 has to reach
the same height in every row. Reporting Services calls these
**horizontal** and **vertical** alignment, and both usually need to be
set explicitly; left alone, a row with no large values would have its
small bars stretch to fill the cell, making it look falsely dramatic
next to a row that actually has a tall spike.

## Converting to a full chart

Because a sparkline is just a chart with the extra elements hidden, you
can right-click one and choose **Convert to Full Chart** to get the
axis lines, labels, tick marks, and legend back instantly. There's no
one-click path in the other direction — turning a full chart back into
a sparkline means deleting those elements yourself.

## Key terms

| Term | Meaning |
|---|---|
| Sparkline | A small chart with no legend, axis, or labels, nested in a table/matrix cell |
| Data bar | A sparkline variant that renders as a bar rather than a line |
| Nesting | Placing one data region (a sparkline) inside another (a table or matrix) |
| Horizontal/vertical alignment | Settings that keep sparklines in the same column comparable row to row |

## Lab

1. Build a table grouped by sales person, with a group total column for
   monthly sales.
2. Add a sparkline to that group's total cell, plotting sales over
   month.
3. Run the report and confirm each row's sparkline lines up on the same
   months as the others.
4. Right-click one sparkline and select **Convert to Full Chart** to see
   the same data with axes and a legend restored.

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
can't a sparkline go in a table's detail row, and what specifically
goes wrong if sparklines in the same column aren't aligned?
