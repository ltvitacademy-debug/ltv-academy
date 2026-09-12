# Lesson 18 — Scatter Plots

**Chapter 3 · Visualization Fundamentals · Lesson 18 of 95**

## What you'll learn

- How Tableau builds a scatter plot from two measures, and why that's
  fundamentally different from every chart so far in this chapter
- How adding a dimension to Color or Detail turns one mark into many,
  and what that reveals
- How to add a trend line, and what it's actually telling you
  statistically
- When a scatter plot is the right chart, and what it can't tell you

## Building a scatter plot

Every chart earlier in this chapter has put a **dimension** on one
shelf and a **measure** on the other. A scatter plot breaks that
pattern: drag a measure — **Sales** — to Columns, and a second measure —
**Profit** — to Rows. With no dimension anywhere in the view, Tableau
aggregates both measures as a sum and plots exactly **one mark**: the
grand total of Sales against the grand total of Profit, at a single
point.

That one-mark view isn't very useful on its own — the whole value of a
scatter plot comes from having many marks to compare. Drag a dimension,
like **Category**, onto **Detail** on the Marks card, and Tableau
splits that single aggregated mark into one mark per Category — now
you're plotting Sales against Profit for each product category
separately, and comparing how those categories relate.

![A scatter plot with Sales on the horizontal axis and Profit on the vertical axis, showing dots colored by Category (Furniture in blue, Office Supplies in orange, Technology in red), each with its own linear trend line.](/courses/tableau/ch03/18-scatter-plots/scatter-plot-trend-lines.png)
*A finished scatter plot — Sales vs. Profit, colored by Category, each category with its own trend line added from the Analytics pane.*
Source: [Tableau Help — Build a Scatter Plot](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_scatter.htm)

Two measures plotted against each other is what makes a scatter plot
different from every bar, line, area, pie, or heat map chart in this
chapter — those all plot a measure against a **category**. A scatter
plot plots a measure against **another measure**, treating both axes as
genuinely numeric — the same way an x/y coordinate plane works in math
class. That's why the default mark type here is a shape (a circle),
not a bar or line: each mark is an independent point in two-dimensional
space, not part of a sequence or category comparison.

## Adding a trend line

Drag the **Trend Line** model from the Analytics pane onto the view,
drop it on the model type you want (Linear is the default and most
common), and Tableau draws one line per color group in the view — three
categories with three separate trend lines, as in the screenshot above.
Hover over any trend line and Tableau shows you the statistical model
behind it: the equation, the R-squared value (how well the line fits
the actual points), and a p-value for statistical significance.

A trend line answers a specific question: *given how these two measures
have related to each other in the data you have, what's the
best-fit linear relationship?* It is not a forecast by itself (Chapter
7's table calculations cover forecasting), and a strong trend line
doesn't prove one measure *causes* the other — only that they move
together in a statistically describable way.

## When to use a scatter plot

Reach for a scatter plot whenever the real question is about the
**relationship** between two measures — does higher Sales tend to come
with higher Profit, or does discounting erode it? A scatter plot is the
wrong tool when your question is about category comparison or change
over time; in those cases, you have exactly one measure of real
interest, and a bar or line chart puts it on an axis where it belongs.

## Key terms

| Term | Meaning |
|---|---|
| Scatter plot | A chart with a measure on both Columns and Rows, plotting two measures against each other as x/y coordinates |
| Detail | The Marks card shelf that splits one aggregated mark into many, one per member of a dimension, without adding color |
| Trend line | An Analytics pane model that fits a statistical line (commonly linear) through the marks in a scatter plot |

## Lab

1. Open Sample Superstore. Drag Sales to Columns and Profit to Rows,
   confirm you get a single mark, then drag Category to Detail and
   watch it split into multiple marks.
2. Drag Category to Color instead of Detail, and describe in one
   sentence what changed versus using Detail alone.
3. Add a linear trend line from the Analytics pane. Hover over one line
   and note its R-squared value.

## Check yourself

You're ready for Lesson 19 when you can explain why a scatter plot
needs two measures instead of a dimension and a measure, and say what a
trend line's R-squared value tells you.
