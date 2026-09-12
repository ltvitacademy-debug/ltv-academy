# Lesson 19 — Histograms, Bins & Distributions

**Chapter 3 · Visualization Fundamentals · Lesson 19 of 95**

## What you'll learn

- What a **bin** is — a new dimension Tableau creates by grouping a
  continuous measure's values into equal-sized ranges
- How to build a histogram from a single measure using Show Me, and
  what actually happens to your fields when you do
- How to create and edit bins manually, outside of Show Me
- How a histogram's shape (its distribution) tells a different story
  than any single summary number could

## What a bin is

Every measure in this course so far has been aggregated — summed,
averaged, counted. A **bin** does something different: it takes a
continuous measure's raw values and groups them into equal-sized
ranges, turning that measure into a new **dimension**. In the Data
pane, right-click any measure and choose **Create > Bins...**:

![The right-click context menu on a Sales field in the Data pane, with the Create submenu open showing options for Calculated Field, Group, Bins, and Parameter — Bins is highlighted.](/courses/tableau/ch03/19-histograms-bins-distributions/create-bins-menu.png)
*The Create > Bins menu — the entry point for turning any continuous measure into a binned dimension, whether or not you're building a histogram.*
Source: [Tableau Help — Create Bins from a Continuous Measure](https://help.tableau.com/current/pro/desktop/en-us/calculations_bins.htm)

In the dialog that follows, you either set a bin size yourself or let
Tableau calculate one for you. A bin size of, say, 2 for a Quantity
field groups every order into ranges like 0-2, 2-4, 4-6, and so on —
each range becomes one bar in the eventual histogram.

## Building a histogram

Drag a measure — **Quantity** — to Columns, then click **Show Me** and
select the histogram icon. The histogram type is only available in
Show Me when your view has a single measure and no dimensions. Three
things happen when you click it: Tableau replaces the raw **Quantity**
measure on Columns with a new, continuous **Quantity (bin)** dimension;
it moves **Quantity** to Rows; and it changes that Rows aggregation from
SUM to **CNT** (Count).

![A histogram showing Count of Quantity on the vertical axis against Quantity bins on the horizontal axis, with a tall bar around the 2-4 bin and shorter bars tapering off toward higher bin values.](/courses/tableau/ch03/19-histograms-bins-distributions/histogram.png)
*A finished histogram — each bar's height is a count of how many orders fall into that Quantity range, not a sum of Quantity itself.*
Source: [Tableau Help — Build a Histogram](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_histogram.htm)

That switch from SUM to CNT is the part worth sitting with: a
histogram never plots the sum of your measure. It plots **how many
rows fall into each range** of that measure. If you already created a
bin manually (as above) instead of using Show Me, you build the same
view by hand — bin dimension on Columns, and a Count of the original
measure on Rows.

## Reading a distribution

The shape a histogram draws is called its **distribution**, and that
shape carries information no single summary statistic does. A tall
bar concentrated around one bin, with shorter bars falling off on
either side, tells you most of your data clusters near a typical
value — very different from a histogram with several separate tall
bars (suggesting distinct clusters in your data) or one with a long
tail stretching in one direction (suggesting a handful of large
outliers pulling an average away from where most of your data actually
sits). Two datasets can share the exact same average and still have
wildly different — and differently actionable — distributions.

## Key terms

| Term | Meaning |
|---|---|
| Bin | A new dimension created by grouping a continuous measure's values into equal-sized ranges |
| Histogram | A chart with a bin dimension on one shelf and a Count of the original measure on the other, showing how many rows fall in each range |
| Distribution | The overall shape a histogram traces — where data clusters, whether it's skewed, whether it has multiple peaks |

## Lab

1. Open Sample Superstore. Drag Quantity to Columns and use Show Me to
   build a histogram. Note which bin has the tallest bar.
2. Right-click Quantity in the Data pane, choose Create > Bins, and
   set a bin size manually — try both a smaller and a larger size than
   Tableau's suggestion and note how the shape changes.
3. Build a histogram of Discount instead of Quantity, and describe its
   distribution in one sentence — is it clustered, spread out, or
   skewed toward one end?

## Check yourself

You're ready for Lesson 20 when you can explain why a histogram's Rows
shelf uses Count instead of Sum, and describe in your own words what a
"distribution" is showing that a single average number can't.
