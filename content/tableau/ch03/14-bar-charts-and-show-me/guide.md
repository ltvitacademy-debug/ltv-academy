# Lesson 14 — Bar Charts & Using Show Me

**Chapter 3 · Visualization Fundamentals · Lesson 14 of 95**

## What you'll learn

- How Tableau builds a bar chart from a dimension and a measure, and how
  the mark type controls what you see
- How to stack a bar chart by color, and read multi-series totals off
  the stack
- What the **Show Me** panel actually does, and how to read its
  requirements hints instead of guessing
- When a bar chart is the right call, and when it isn't

## Building a bar chart

A bar chart in Tableau starts the same way almost every chart in this
course does: drag a dimension to one shelf and a measure to the other.
Drop a date dimension on Columns and a measure like Sales on Rows, and
Tableau's default guess is a **line** — because you used a date field.
Switch the mark type on the Marks card to **Bar**, and the same data
renders as bars instead of a line. Nothing about the underlying view
changed; only the mark type did.

Add a second dimension — like Ship Mode — to **Color** on the Marks
card, and Tableau splits each bar into a stacked column, one colored
segment per Ship Mode value:

![A stacked bar chart displays sales in the West region by year, split into colored segments by Ship Mode, with currency totals labeled above each bar.](/courses/tableau/ch03/14-bar-charts-and-show-me/stacked-bar-chart.png)
*A finished stacked bar chart — Sales by year for the West region, colored by Ship Mode, with a reference line adding the total above each bar.*
Source: [Tableau Help — Build a Bar Chart](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_bar.htm)

Notice what the stacking buys you: you can still read the total height
of each bar (the overall trend) while also seeing how each Ship Mode
contributes to it. That dual read — whole and parts, at once — is
exactly why bar charts are usually the first chart type to reach for
when you're comparing category totals.

## Using Show Me

You don't have to build every chart by hand. **Show Me** is the panel
in the top-right of the toolbar that looks at whatever fields are
already in the view (or selected in the Data pane) and suggests chart
types that fit:

![The Show Me panel showing a grid of chart-type icons, with the stacked bar icon highlighted in an orange box, and text below reading "For stacked bars use: Measure, Dimension, optional Dimension".](/courses/tableau/ch03/14-bar-charts-and-show-me/show-me-panel.png)
*Show Me's chart grid. Hovering over any icon shows the minimum field requirements for that chart type — here, stacked bars need one measure and one dimension, with a second dimension optional.*
Source: [Tableau Help — Use Show Me to Start a View](https://help.tableau.com/current/pro/desktop/en-us/buildauto_showme.htm)

Two things worth internalizing about Show Me:

- **It reads requirements, it doesn't read intent.** Show Me only
  lights up chart types your current field selection can actually
  support — it can't tell you which chart best answers your business
  question. That judgment call is still yours (Lesson 21 covers it
  directly).
- **"Choose for me" is a shortcut, not a crutch.** The button at the
  bottom of the panel picks a chart type automatically from your
  selected fields. It's a fast way to get a reasonable starting point,
  especially when you're new to a dataset — but every chart it builds
  is one you should be able to build by hand too.

## Key terms

| Term | Meaning |
|---|---|
| Mark type | The shape Tableau draws for each data point — Bar, Line, Circle, Square, and more, set on the Marks card |
| Stacked bar | A bar chart with a dimension on Color, so each bar splits into colored segments that sum to the bar's total |
| Show Me | The toolbar panel that suggests valid chart types based on the fields currently in the view or selected in the Data pane |

## Lab

1. Open the Sample Superstore dataset from Lesson 3. Drag **Category**
   to Columns and **Sales** to Rows — confirm you get a bar chart by
   default (a dimension + a measure is Tableau's classic bar-chart
   combination).
2. Drag **Region** to Color on the Marks card. Read the resulting
   stacked bars out loud: which category has the most total sales, and
   which region contributes the most within it?
3. Select just **Sales** and **Category** in the Data pane (without
   touching the shelves) and open Show Me. Hover over a few icons and
   read the field requirements Tableau lists for each.

## Check yourself

You're ready for Lesson 15 when you can build a stacked bar chart from
scratch without Show Me, and explain in one sentence what Show Me
actually evaluates before it suggests a chart type.
