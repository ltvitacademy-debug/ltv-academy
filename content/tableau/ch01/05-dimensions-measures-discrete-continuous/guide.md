# Lesson 5 — Dimensions, Measures, Discrete & Continuous Fields

**Chapter 1 · Getting Started · Lesson 5 of 95**

## What you'll learn

- The difference between a Dimension and a Measure, and how Tableau
  decides which is which by default
- The separate, easy-to-confuse distinction between discrete and
  continuous fields
- Why discrete fields create headers and continuous fields create axes
- How to convert a field between these types when Tableau's default
  guess doesn't match what you actually need

## Dimensions vs. Measures

Every field in your data pane lands in one of two sections:

- A **Dimension** typically holds qualitative, categorical data —
  names, dates, geography, IDs. Dimensions describe or categorize your
  data and affect its level of detail.
- A **Measure** typically holds quantitative, numeric data — sales,
  profit, quantity. When you drag a Measure into a view, Tableau
  automatically aggregates it (usually SUM).

Tableau makes a reasonable default guess based on data type (text and
dates usually become Dimensions; numbers usually become Measures), but
this is only a default — you can drag a field from one section to the
other whenever the data itself doesn't fit the guess (a Postal Code
field, for example, is numeric but is really a Dimension, not something
you'd ever want to SUM).

## Discrete vs. continuous — a completely separate axis

This is the part that trips people up: discrete/continuous is **not**
the same split as Dimension/Measure. It's about how a field behaves
*in the view*:

- A **continuous** field forms an unbroken range and creates an **axis**
  when placed on Columns or Rows. Continuous fields and their pills are
  colored **green**.
- A **discrete** field has distinct, separate values and creates
  **headers** (labels) when placed on a shelf. Discrete fields and
  their pills are colored **blue**.

Most Measures default to continuous, and most Dimensions default to
discrete — but not always. A date can be discrete (headers like "Q1,
Q2, Q3, Q4") or continuous (a true timeline axis), and either behavior
is available on the same date field depending on what you need.

![Real screenshot showing a continuous (green) Quantity field on the Columns shelf, producing a numeric axis from 0 to 14 and a line chart of SUM(Sales) against it.](/courses/tableau/ch01/05-dimensions-measures-discrete-continuous/continuous-axis.png)
*Continuous Quantity on Columns creates a true numeric axis — an unbroken scale.*
Source: [Tableau Help — Dimensions and Measures, Blue and Green](https://help.tableau.com/current/pro/desktop/en-us/datafields_typesandroles.htm)

![Real screenshot showing a discrete (blue) Category field on Rows, producing distinct row headers labeled Furniture, Office Supplies, and Technology instead of an axis.](/courses/tableau/ch01/05-dimensions-measures-discrete-continuous/discrete-headers.png)
*Discrete Category on Rows creates separate headers — one per distinct value, no axis.*
Source: [Tableau Help — Dimensions and Measures, Blue and Green](https://help.tableau.com/current/pro/desktop/en-us/datafields_typesandroles.htm)

## Why this distinction matters constantly

Nearly every chart-building decision in this course comes back to
discrete vs. continuous: bar charts need a discrete field for their
category headers; line and area charts need a continuous field for
their axis; whether a date shows as "2021, 2022, 2023" (discrete
headers) or a smooth timeline (continuous axis) is entirely up to which
mode you pick. When a chart looks wrong, checking whether a field is
blue or green is often the fastest way to diagnose why.

## Converting between types

Right-click any field (in the Data pane, or on a shelf) and you'll find:

- **Convert to Dimension** / **Convert to Measure** — changes which
  section the field lives in
- **Convert to Discrete** / **Convert to Continuous** — changes how it
  behaves in the view (headers vs. axis)

These are independent switches — you could, in principle, have a
discrete Measure or a continuous Dimension, though in practice most
fields stay close to their sensible default.

## Key terms

| Term | Meaning |
|---|---|
| Dimension | A field that describes/categorizes data — usually text, dates, geography |
| Measure | A field that's numeric and aggregatable — usually SUM'd, AVG'd, etc. |
| Discrete (blue) | Creates distinct headers when placed on a shelf |
| Continuous (green) | Creates an unbroken axis when placed on a shelf |

## Lab

1. In Sample Superstore, drag Category to Rows and look at the pill color and what it creates (headers).
2. Drag Sales to Columns and look at its pill color and what it creates (an axis).
3. Right-click the Order Date field and try both Discrete and Continuous — rebuild the same simple view each way and compare what changes.

## Check yourself

You're ready for Lesson 6 when you can explain, without looking, why a
blue pill creates headers and a green pill creates an axis, and give
one example of a field that could reasonably be either.
