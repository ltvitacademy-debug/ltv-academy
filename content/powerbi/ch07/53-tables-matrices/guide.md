# Lesson 53 — Tables & Matrices

**Chapter 7 · Building Reports & Visualizations · Lesson 2 of 10**

## What you'll learn

- The difference between a table and a matrix
- How to build a matrix with row and column hierarchies
- Expanding, collapsing, and freezing headers
- Custom totals, and when the default total isn't what you want

## Two ways to lay out exact numbers

A **table** presents rows and columns of related data — one category
per row, one measure per column, no hierarchy involved. It's ideal when
you need exact values and quantitative comparisons for a single
category at a time.

A **matrix** does more: like an Excel PivotTable, it organizes data
across *multiple* dimensions at once, with fields on both rows and
columns, automatically aggregating and supporting drill-down through
hierarchies.

## Building a matrix

Drop a **Matrix** visual onto the canvas, then assign fields:

- **Rows**: `Year`, then `Quarter`
- **Columns**: `Subcategory`, then `Product`
- **Values**: `Units Sold`

![Screenshot of a Power BI matrix visual with Year and Quarter on rows, Subcategory and Product on columns, and Units Sold as values, alongside the Visualizations pane field wells.](/courses/power-bi/ch07/53-tables-matrices/power-bi-matrix-create.png)
*Two levels on rows, two on columns — the matrix aggregates Units Sold at every intersection automatically.*

## Expanding and collapsing headers

When a matrix has more than one field on Rows or Columns, **+/−** icons
on the headers let viewers drill into more detail or collapse back to a
summary:

![Screenshot showing the expand and collapse icons in the row and column headers of a matrix visual.](/courses/power-bi/ch07/53-tables-matrices/matrix-visual-expand-and-collapse-column-headers.png)
*Select + to reveal the next level down; select − to collapse it back.*

You can also turn on **Auto expand** (under **Row headers** / **Column
headers** → **Options** in the Format pane) so every level shows at
once when the visual first loads, instead of requiring a click.

## Freezing row headers

By default, row headers stay frozen in place as you scroll a wide
matrix horizontally — so category labels never disappear off-screen:

![Screenshot of a matrix visual with frozen row headers staying visible while the matrix scrolls horizontally.](/courses/power-bi/ch07/53-tables-matrices/matrix-visual-frozen-row-headers.png)
*Row headers (Year, Quarter) stay put; only the data columns scroll.*

Turn this off under **Layout → Freeze** in the Format pane if you'd
rather headers scroll away with the rest of the visual — or let viewers
toggle it themselves via right-click → **Freeze row headers**.

## When the default total isn't right

By default, a matrix's total row evaluates a field across the entire
filter context of the page — correct most of the time. When it isn't,
**custom totals** let you change what that total row displays: sum,
average, min, max, distinct count, count, or none at all. Right-click a
numeric column and choose **Customize total calculation** to set one.

## Key terms

| Term | Meaning |
|---|---|
| Table | Rows and columns of related data, one category per row, no hierarchy |
| Matrix | A table-like visual supporting fields on both rows and columns, with drill-down |
| Custom total | An override of what a matrix's total row calculates for one column |

## Lab

1. On **AdventureWorksDW2014**, build a matrix with `DimDate[CalendarYear]`
   and `DimDate[EnglishMonthName]` on Rows, `DimProductCategory[EnglishProductCategoryName]`
   on Columns, and `SUM(FactInternetSales[SalesAmount])` as the value.
2. Practice expanding and collapsing the row headers, then turn on
   **Auto expand** and reload the visual to see the difference.
3. Right-click the SalesAmount column and set a custom total to
   **Average** instead of the default sum — confirm the total row
   changes accordingly.

## Check yourself

You're ready for Lesson 54 when you can explain, in one sentence, what
a matrix can do that a plain table can't.
