# Lesson 62 — Bins, Distributions & Segmentation

**Chapter 10 · Groups, Sets, Bins & Hierarchies · Lesson 62 of 95**

## What you'll learn

- How to create a **bin** from a measure, and how bin size changes what
  a distribution shows you
- How binning turns a continuous measure into a discrete field you can
  put on Rows, Columns, or Color
- How to use bins for real **segmentation** — grouping customers,
  orders, or products into ranges like Low/Medium/High
- How bins relate to the groups, sets, and hierarchies from the last
  three lessons

This lesson assumes you already built a histogram chart back in
Chapter 3, Lesson 19 — that lesson covered histograms as a *chart
type*. This lesson goes one level deeper: creating the underlying bin
field yourself and controlling it, and then using that bin field for
segmentation analysis, not just a chart.

## Creating a bin

A **bin** groups a continuous measure's values into equal-sized ranges
— $0-999, $1,000-1,999, $2,000-2,999, and so on. Right-click any
measure in the Data pane and choose **Create > Bins**:

![Context menu on the Sales measure in the Data pane, with Create expanded and Bins highlighted, alongside Calculated Field, Group, and Parameter.](/courses/tableau/ch10/62-bins-distributions-segmentation/create-bins-menu.png)
*Creating a bin from the Sales measure — the real Tableau context menu.*
Source: [Tableau Help — Create Bins from a Measure](https://help.tableau.com/current/pro/desktop/en-us/calculations_bins.htm)

Tableau opens a dialog where you set the **size of bins** — the width
of each range. A $1,000 bin size on a Sales field with values from $0
to $22,000 gives you 23 ranges. Bin size is the single biggest lever on
what a distribution shows you: too wide, and you lose all the
interesting shape (everything collapses into two or three giant bars);
too narrow, and you get dozens of near-empty bars that are just noise.
There's no universally correct size — you pick one that reveals the
shape of *this* measure, then adjust.

Once created, the new field appears as `Sales (bin)` in the Data pane,
marked as a dimension (binning converts a continuous measure into a
discrete dimension). Put it on Columns and a count of records on Rows,
and you get a histogram:

![Histogram with Sales (bin) on Columns and CNT(Sales) on Rows — a tall bar at the low end of the range, dropping off sharply as bin value increases.](/courses/tableau/ch10/62-bins-distributions-segmentation/bin-histogram.png)
*The resulting distribution — most orders cluster in the lowest sales bin, with a long tail.*
Source: [Tableau Help — Create Bins from a Measure](https://help.tableau.com/current/pro/desktop/en-us/calculations_bins.htm)

## From distribution to segmentation

A histogram tells you the *shape* of your data. **Segmentation** is
using that same bin field to *act* on the data — labeling ranges with
business meaning instead of raw numbers. `Sales (bin)` values like "0,"
"1000," "2000" mean nothing to a stakeholder; "Low," "Medium," "High"
value orders do.

You get there by combining what you already know: create the bin, then
build a **group** (Lesson 59) on top of it that combines several bins
into a labeled segment — bins $0-999 and $1,000-1,999 both become
"Low," the next few bins become "Medium," and so on. This is the same
grouping mechanism from two lessons ago, just applied to a bin field
instead of a raw dimension like Sub-Category.

This pattern — bin a continuous measure, then group the bins into
labeled segments — is exactly how a real RFM (Recency, Frequency,
Monetary) customer-segmentation model gets built in Tableau: bin each
of the three measures, group each bin field into a small number of
labeled tiers, then combine the three tier fields into one composite
segment.

## Key terms

| Term | Meaning |
|---|---|
| Bin | A field that groups a continuous measure into equal-sized ranges |
| Bin size | The width of each range — the main control over how much detail a distribution shows |
| `Sales (bin)` | Tableau's naming convention for a binned field |
| Segmentation | Labeling bins (or bin groups) with business-meaningful categories like Low/Medium/High |

## Lab

1. In Sample Superstore, right-click `Sales` and create a bin with a
   size of 1,000. Build the histogram shown above.
2. Change the bin size to 5,000, then to 100. Note how each size
   changes what the distribution shows you — which size actually
   reveals something useful about how order sizes are distributed?
3. Right-click your `Sales (bin)` field and create a **group** that
   combines the low bins into "Low," the middle bins into "Medium," and
   the highest bins into "High." Put the new grouped field on Color in
   a scatter plot of Sales vs. Profit.

## Check yourself

You're ready for Lesson 63 when you can create a bin from a measure,
explain how changing bin size changes a distribution, and turn a bin
field into a labeled Low/Medium/High segment using a group.
