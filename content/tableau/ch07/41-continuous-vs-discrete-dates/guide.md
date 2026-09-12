# Lesson 41 — Continuous vs. Discrete Dates & Time-Series Analysis

**Chapter 7 · Time Series & Table Calculations · Lesson 41 of 95**

## What you'll learn

- What "continuous" and "discrete" actually mean for a field in
  Tableau, and why the blue-vs-green pill color is the tell
- How converting a date between continuous and discrete changes
  whether it produces headers or an axis
- Why continuous dates are what actually make a proper time-series
  trend line possible
- How this builds directly on Lesson 40's Date Parts vs. Date Values

## Blue and green: discrete vs. continuous

Every field in Tableau's Data pane and on every shelf is colored one
of two ways:

![A blue Tableau pill labeled Product Name, the color used for a discrete field.](/courses/tableau/ch07/41-continuous-vs-discrete-dates/discrete-pill.png)
*Discrete — blue. Produces a distinct, separately-labeled header for each value.*
Source: [Tableau Help — Dimensions and Measures, Blue and Green](https://help.tableau.com/current/pro/desktop/en-us/datafields_typesandroles.htm)

![A green Tableau pill labeled YEAR(Order Date), the color used for a continuous field.](/courses/tableau/ch07/41-continuous-vs-discrete-dates/continuous-pill.png)
*Continuous — green. Produces a measurable axis instead of separate headers — this example is a date field.*
Source: [Tableau Help — Dimensions and Measures, Blue and Green](https://help.tableau.com/current/pro/desktop/en-us/datafields_typesandroles.htm)

**Discrete** fields produce individual, separately-labeled headers —
one box per distinct value, with gaps and no implied order beyond
whatever you sort by. **Continuous** fields produce a measurable axis
— an unbroken line of values with even spacing, where position on the
axis actually means something numerically.

## Dates default to discrete — and that surprises people

Here's the twist: when you first drag a date field into a view, it
comes in **discrete** (blue) by default, regardless of which date
level you picked in Lesson 40. That's the difference between date
*level* (Year, Quarter, Month, Week, Day, Exact Date) and date *type*
(continuous vs. discrete) — they're two separate settings on the same
field, and you can combine them in almost any way: a discrete Month, a
continuous Month, a discrete Year, a continuous Year, and so on. Every
combination is a valid choice; which one is right depends entirely on
what question you're answering.

## How this plays out in a real chart

Put a discrete date part like Month on Columns, and you get 12 (or
however many) separate header columns — clean for comparing month to
month, but each column stands alone with no sense of continuous flow.
Convert that same field to continuous, right-click it and choose
**Continuous**, and Tableau instead draws a single axis: the columns
disappear, and in their place is one unbroken timeline that a line
chart can actually trace a slope across. This is the single most
important switch for building a real time-series chart — a line chart
built on a discrete date field will draw a broken, disconnected set of
segments; the same chart built on a continuous date field draws one
smooth trend line.

## Key terms

| Term | Meaning |
|---|---|
| Discrete (blue) | A field that produces distinct, separately-labeled headers |
| Continuous (green) | A field that produces a measurable axis |
| Date level | Which part of the date you're looking at (Year, Month, ...) — independent of discrete/continuous |
| Time-series analysis | Studying how a measure changes across a continuous timeline, rather than comparing isolated buckets |

## Lab

1. In Sample Superstore, drag **Order Date** to Columns and change its level to **Month** (as a Date Value, from Lesson 40) — it comes in discrete/blue by default, producing separate header columns.
2. Right-click the same pill and choose **Continuous**. Watch the headers collapse into a single axis.
3. Drop **Sales** on Rows and switch the mark type to **Line** for both versions. Compare: the discrete version draws broken segments between headers; the continuous version draws one connected trend line.
4. Try the same comparison with Year instead of Month.

## Check yourself

You're ready for Lesson 42 when you can explain, without looking, why
a line chart of sales over time looks broken and disconnected when
built on a discrete date field, but smooth and continuous when built
on the same field converted to continuous.
