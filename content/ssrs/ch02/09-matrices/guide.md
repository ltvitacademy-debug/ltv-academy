# Lesson 9 — Matrices

**Chapter 2 · Building Reports · Lesson 9 of 40**

## What you'll learn

- What makes a **Matrix** different from a Table: two independent
  grouping dimensions instead of one
- How **Row groups** and **Column groups** combine to build a genuine
  cross-tab report
- Why matrices tend to expand **horizontally** as much as vertically —
  and why that matters for anything you plan to print
- How to read the finished cross-tab layout a matrix wizard produces

## A Table has one grouping dimension. A Matrix has two.

A Table groups data down the page — rows. A **Matrix** groups data
**both ways** — rows *and* columns — producing a genuine cross-tabulation,
the same shape as a pivot table. Pick Territory for rows and Subcategory
for columns, and every cell in the matrix shows the value where that
row and that column intersect.

## Building it: the same wizard, one more box

The **Table or Matrix Wizard** is identical to Lesson 8's, except this
time you actually use the **Column groups** box:

- **Row groups**: `Territory`, then `SalesDate` nested under it
- **Column groups**: `Subcategory`, then `Product` nested under it
- **Values**: `Sales` and `Quantity`, both summed by default

Finish the wizard, and the **Row Groups** and **Column Groups** panes
both populate — this is what confirms the matrix actually has two
independent grouping hierarchies, not one:

![The Row Groups pane showing Territory with SalesDate nested beneath it, and the Column Groups pane showing Subcategory with Product nested beneath it.](/courses/ssrs/ch02/09-matrices/report-builder-row-and-column-groups.png)
*Two grouping hierarchies, side by side — that's what makes it a matrix instead of a table.*

## What it actually looks like once it's real

Run the report, and every combination of row group and column group
produces its own cell:

![A finished matrix report titled "Sales by Territory, Subcategory, and Day": rows for Central, North, and South territories (each split by two sales dates with a Total row), and columns for Accessories and Digital subcategories plus Monday and Tuesday weekday breakdowns, ending in a grand Total column, with Sales and QTY figures throughout.](/courses/ssrs/ch02/09-matrices/report-builder-matrix-tutorial.png)
*Every row/column combination — Central + Accessories, North + Digital, and so on — gets its own cell, with subtotals and a grand total in both directions.*

Notice the totals appear in **both directions** — a Total row per
territory, and a Total column per date range — because subtotaling
applies independently to each grouping dimension.

## The catch: matrices grow sideways

A Table can only get taller as data grows. A **Matrix can get wider**
too — every new distinct value in a column group field adds another
column. Expand a subcategory with many products, and the report can
"quickly get wide," in Microsoft's own words — a real problem if you're
exporting to a printed page or PDF. Two practical fixes, both covered
in more depth once you're deep into export-specific tuning:

- Resize columns down to only what's needed (e.g., renaming
  "Quantity" columns to "QTY" and narrowing them to half an inch).
- Rotate a text box 270 degrees (`WritingMode` = `Rotate270`) so labels
  like territory names run vertically instead of eating horizontal
  space.

## Key terms

| Term | Meaning |
|---|---|
| Matrix | A data region grouping data by both rows and columns — a cross-tab |
| Row groups | The vertical grouping hierarchy in a matrix (same concept as in a Table) |
| Column groups | The horizontal grouping hierarchy — unique to Matrix and Chart-like regions |
| Corner cells | The (usually unused) cells in the upper-left, where row and column headers meet |
| WritingMode | The text-box property that rotates text (e.g., `Rotate270`) to save horizontal space |

## Lab

1. Using the Table or Matrix Wizard, build a matrix from any dataset
   with at least two categorical fields and one numeric field: one
   categorical field into **Row groups**, the other into **Column
   groups**, the numeric field into **Values**.
2. Run the report and confirm you get a genuine cross-tab — a cell for
   every row/column combination.
3. Add several more distinct values to the column-group field's
   underlying data (or pick a field with more distinct values) and
   observe how much wider the report gets.

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: what
makes a Matrix structurally different from a Table, and why matrices
are more likely than tables to cause problems when you're targeting a
printed page.
