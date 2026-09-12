# Lesson 15 — Line Charts & Area Charts

**Chapter 3 · Visualization Fundamentals · Lesson 15 of 95**

## What you'll learn

- How Tableau builds a line chart automatically when you put a date on
  one shelf and a measure on the other
- How to put two measures on separate axes — or blend them onto one —
  in a single line view
- How an area chart is really just a line chart with the space beneath
  it filled in, and why that filled area changes what it communicates
- When to reach for a line versus an area chart

## Building a line chart

Drop a date dimension on Columns and a measure on Rows, and Tableau's
default mark type is already **Line** — dates are the one field type
that nudges Tableau toward a line automatically, because a line's whole
job is showing a sequence.

Drag a second measure — say, Profit — onto Rows and drop it to the
right of Sales, and Tableau gives each measure its own axis along the
left margin, stacked one above the other:

![A line chart with separate axes on the left margin — the top axis for Sales, the bottom axis for Profit — both plotted against Ship Date on the shared horizontal axis.](/courses/tableau/ch03/15-line-and-area-charts/dual-axis-line-chart.png)
*Two measures, two independent axes, one shared timeline — useful when Sales and Profit have very different scales and you don't want one to flatten the other.*
Source: [Tableau Help — Building Line Charts](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_line.htm)

That's a **dual-axis** view — two separate scales sharing one
horizontal axis. It's different from a **blended axis**, where you drag
one measure onto the other measure's existing axis so both lines share
a single scale — useful when the two measures are close enough in
magnitude that overlaying them on one axis actually helps you compare
their shapes directly, instead of comparing two differently-scaled
lines side by side.

## Building an area chart

An area chart is a line chart with the region between the line and the
zero baseline filled in with color. Build one the same way you'd build
a line — date on Columns, measure on Rows — then change the Marks card
mark type to **Area**. Drag a dimension like Ship Mode onto Color, and
the single filled shape splits into stacked colored bands:

![A stacked area chart showing Quantity of orders by month across a year, with four colored bands for First Class, Same Day, Second Day, and Standard Class shipping.](/courses/tableau/ch03/15-line-and-area-charts/stacked-area-chart.png)
*A stacked area chart — the top edge of the stack is the running total, and each band's thickness is that segment's contribution at that point in time.*
Source: [Tableau Help — Quick Start: Area Charts](https://help.tableau.com/current/pro/desktop/en-us/qs_area_charts.htm)

The filled area is what changes the read. A line chart draws your eye
to the *shape* of change — is it rising, falling, seasonal? A stacked
area chart draws your eye to *cumulative volume* — how big is the whole,
and how is it composed at each point in time. That's also the area
chart's most common trap: stacked areas are easy to build and hard to
read precisely, because judging a band's thickness in the middle of a
stack is much harder than judging a line's height against a shared
baseline. If precise comparison between individual series matters more
than the sense of total volume, multiple lines usually beat a stacked
area.

## Key terms

| Term | Meaning |
|---|---|
| Dual-axis | Two measures, each with its own independent scale, sharing one horizontal axis |
| Blended axis | Two measures plotted on a single shared scale, by dragging one measure onto the other's existing axis |
| Stacked area chart | An area chart with a dimension on Color, splitting the filled region into stacked bands that sum to a running total |

## Lab

1. Open Sample Superstore. Drag **Order Date** to Columns and **Sales**
   to Rows — confirm Tableau defaults to a line, then add **Profit** to
   Rows to see the dual-axis view.
2. Try dragging the **Profit** field from Rows directly onto the
   **Sales** axis to blend them onto one scale. Compare how much harder
   or easier it is to read the two measures together.
3. Switch the mark type to **Area** and drag **Category** to Color.
   Note where the stacked area chart makes a trend obvious versus where
   it makes an individual category's exact value hard to pin down.

## Check yourself

You're ready for Lesson 16 when you can explain the difference between
a dual-axis and a blended-axis line chart in one sentence, and say why
a stacked area chart trades precision for a sense of total volume.
