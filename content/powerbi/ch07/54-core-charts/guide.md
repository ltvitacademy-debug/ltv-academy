# Lesson 54 — Bar, Column, Line & Pie Charts

**Chapter 7 · Building Reports & Visualizations · Lesson 3 of 10**

## What you'll learn

- The three column chart variants, and when each applies
- How to drill through a date hierarchy directly inside a chart
- Cross-filtering and cross-highlighting, and the difference between them
- Where pie and line charts fit alongside column charts

## Column charts: three variants

A **column chart** compares numerical values across categories using
vertical bars. Power BI offers three variants:

| Variant | Use it when |
|---|---|
| Clustered column | Comparing categories side by side |
| Stacked column | Showing categories as parts of a total, stacked |
| 100% stacked column | Showing each category's percentage share of a total |

Build one with at least one field on the **X-axis** and one measure on
the **Y-axis** — add a field to **Legend** to break each column into
segments, or add multiple measures to the Y-axis for a side-by-side
comparison (though multiple measures rule out using Legend).

## Drilling into a date hierarchy

Give a column chart a true date hierarchy on its X-axis, and four drill
icons appear:

![Screenshot of a Power BI column chart with four drill icons above it: Drill up, Drill down, Next level, and Expand all levels.](/courses/power-bi/ch07/54-core-charts/column-drill.png)
*Drill up moves to a higher level (month → quarter → year). Drill down mode lets you select one column to see its next level of detail.*

**Next level** expands every data point one level down at once — all
months across all quarters — without selecting each column
individually. **Expand all down one level** does something related but
subtly different: it keeps the current grouping while adding the next
level of detail beneath it.

## Cross-filtering vs. cross-highlighting

Selecting a data point in one visual can affect others on the page two
different ways:

- **Cross-filter**: unrelated data disappears from other visuals
  entirely — only matching data remains visible.
- **Cross-highlight**: matching data is emphasized in other visuals
  while everything else dims, without hiding anything.

![Screenshot of a column chart with a selected month highlighted, and interaction icons (Filter, Highlight, None) visible on a connected pie chart.](/courses/power-bi/ch07/54-core-charts/column-cross.png)
*Turn on Format → Enable interactions, then choose Filter, Highlight, or None on each connected visual.*

Cross-filtering is useful for narrowing focus; cross-highlighting is
useful for comparing a selection against the whole without losing
context. Lesson 58 covers configuring these interactions in full.

## Conditional formatting on chart colors

Just like tables (Lesson 56 covers this in depth), a chart's column
colors can be data-driven — a **Gradient** based on a measure's value,
**Rules** you define, or a **Field value** from a measure:

![Screenshot of the Conditional formatting dialog with Gradient style selected, applying a red-to-blue color gradient based on a Total Sales Variance field.](/courses/power-bi/ch07/54-core-charts/column-formatting.png)
*Lower values shade red, higher values shade blue — performance is visible at a glance, no legend required.*

## Line and pie charts: quick reference

- **Line charts** show a trend across a continuous axis — almost always
  time. They work best when the story is the overall shape of change,
  not precise category-by-category comparison.
- **Pie and donut charts** show a small number of categories as slices
  of a whole. Donut charts add an open center, useful for a label or a
  total. Keep the category count low — past five or six slices, a pie
  chart becomes hard to read at a glance.

## Key terms

| Term | Meaning |
|---|---|
| Clustered / Stacked / 100% stacked column | The three column chart variants, for side-by-side, part-of-total, or percentage-of-total comparisons |
| Cross-filter | Selecting a data point hides unrelated data in other visuals |
| Cross-highlight | Selecting a data point emphasizes matching data in other visuals, without hiding the rest |

## Lab

1. On **AdventureWorksDW2014**, build a clustered column chart with
   `DimDate`'s date hierarchy on the X-axis and
   `SUM(FactInternetSales[SalesAmount])` on the Y-axis. Practice all
   four drill actions.
2. Add a pie chart broken out by `DimProductCategory`, enable
   interactions, and try both Filter and Highlight modes between the
   two visuals.
3. Apply gradient conditional formatting to the column chart's bars,
   based on the sales measure itself.

## Check yourself

You're ready for Lesson 55 when you can explain the practical
difference between cross-filtering and cross-highlighting, in your own
words.
