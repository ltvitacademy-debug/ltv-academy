# Lesson 20 — Box-and-Whisker Plots

**Chapter 3 · Visualization Fundamentals · Lesson 20 of 95**

## What you'll learn

- What a box-and-whisker plot actually shows: quartiles, a median, and
  whiskers, not just a single summary number
- How to build one with Show Me, and what fields it requires
- The difference between the two whisker configurations Tableau
  offers, and why that choice matters
- How a box plot compares to a histogram for showing distribution, and
  when each is the better choice

## What a box plot shows

A box-and-whisker plot summarizes a distribution using five numbers at
once: the minimum, the first quartile (25th percentile), the median
(50th percentile), the third quartile (75th percentile), and the
maximum. The **box** itself spans the middle 50 percent of the data —
from the first quartile to the third — with a line inside marking the
median. The **whiskers** extend out from the box toward the extremes.

## Building a box plot

Drag a measure — **Discount** — to Rows, change its aggregation to
**Average**, then drag dimensions like **Segment** and **Region** to
Columns to give yourself categories to compare. Click **Show Me** and
select the box-and-whisker icon:

![A box-and-whisker plot showing Average Discount by Segment, with three boxes (Consumer, Corporate, Home Office) each spanning roughly 0.10 to 0.20-0.25, with a line marking the median inside each box and whiskers extending to the data's extremes.](/courses/tableau/ch03/20-box-and-whisker-plots/box-plot-by-segment.png)
*A finished box-and-whisker plot — Average Discount by Segment, letting you compare not just each segment's typical discount but its spread.*
Source: [Tableau Help — Build a Box Plot](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_boxplot.htm)

Notice what this gives you that a single bar chart of average discount
per segment couldn't: three segments might have nearly identical
*average* discounts while having very different *spreads* — one
segment's discounts might cluster tightly around its median, while
another's swing widely. A bar chart of averages hides that difference
completely; a box plot puts it front and center.

## Configuring the whiskers

Tableau gives you two ways to draw the whiskers, and the choice changes
what "extreme" means in your chart:

- **All points within 1.5x the interquartile range** — the whisker
  extends only to the furthest point that's still within 1.5 times the
  width of the box, and any point beyond that is plotted as a separate
  outlier dot. This is the standard statistical convention, and the
  default in most tools.
- **All points at the maximum extent of the data** — the whisker
  stretches all the way to the true minimum and maximum values in the
  data, with no separate outlier marks.

The first option is almost always more useful for spotting genuine
outliers; the second is closer to a plain min/max summary with a box
added on top.

## Box plot vs. histogram

Both a box plot and a histogram (Lesson 19) show distribution, but they
answer different framing questions. A histogram shows the full **shape**
of a single distribution — every bin, every bump, every long tail — but
only for one group at a time comfortably. A box plot compresses that
shape down to five numbers, which loses detail but makes it much easier
to line up several groups **side by side** and compare their medians and
spreads at a glance — exactly what the Segment example above does with
three groups in one view.

## Key terms

| Term | Meaning |
|---|---|
| Quartile | One of three values (Q1, Q2/median, Q3) that split ordered data into four equal-sized groups |
| Interquartile range (IQR) | The width of the box — the distance between the first and third quartiles, containing the middle 50% of the data |
| Whisker | The line extending from the box toward the data's extremes, configured either to 1.5x IQR or to the true min/max |

## Lab

1. Open Sample Superstore. Build a box plot of Average Discount by
   Segment and Region using Show Me, matching the screenshot above.
2. Toggle the whisker configuration between "1.5x IQR" and "maximum
   extent of the data" in the reference line editor, and note which
   points get flagged as outliers under each setting.
3. Build a histogram of Discount for a single segment and compare what
   it shows you versus the box plot's single box for that same segment.

## Check yourself

You're ready for Lesson 21 when you can name the five numbers a box
plot summarizes a distribution into, and explain in one sentence why a
box plot beats a bar chart of averages when spread matters.
