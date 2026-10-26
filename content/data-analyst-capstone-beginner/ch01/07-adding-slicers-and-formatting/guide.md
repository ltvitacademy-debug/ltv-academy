# Lesson 7 — Adding Slicers and Formatting

**Chapter 1 · Beginner Capstone: Product Category Performance Snapshot · Lesson 7 of 10**

## What you'll learn

- Adding a category slicer so the report answers more than one question
- Number formatting that reads clearly to a non-technical reader
- Writing titles that state the answer, not just the visual's field names

## Why a slicer, even for a four-category report

The Lesson 1 requirement covers every product category, but during the pricing review the
Merchandising Manager may want to isolate just one category — say, focusing the conversation on
`Bikes` for a few minutes — without losing the ability to flip back to the full picture. A
**slicer** on `CategoryName` gives that one click of control. Add it to the report canvas:

1. **Visualizations pane → Slicer**, drop it onto an open area of the page (above or beside the
   KPI cards, per the Lesson 5 sketch).
2. Drag `CategoryName` from `CategoryPerformanceSnapshot` into the slicer's field well.
3. Set the slicer to allow multi-select, since the manager may reasonably want to compare two
   categories side by side during the discussion, not just isolate one at a time.

Because `Total Sales`, `Order Count`, and `Average Order Value` are all measures (Lesson 6),
every visual on the page — cards, bar chart, table — automatically recalculates the moment the
slicer selection changes. No extra wiring is needed; this is exactly the payoff from choosing
measures over raw columns.

## Number formatting that matches the audience

A number like `847293.5` is technically correct and unreadable to someone glancing at a report
mid-meeting. Format each measure for its actual use:

- **`Total Sales`**: currency format, no decimal places — `$847,294`. A stakeholder comparing
  categories doesn't need cents; they need the shape of the number at a glance.
- **`Order Count`**: whole number with a thousands separator — `1,284`. No currency symbol; it
  isn't a dollar amount.
- **`Average Order Value`**: currency format, two decimal places — `$659.73`. Unlike the
  totals, a per-order average is small enough that cents can matter for comparison.

Set these from each measure's own properties (select the measure in the **Fields** pane, then
use the **Measure tools → Formatting** ribbon), not per-visual — formatting the measure once
means every card, chart, and table that uses it inherits the same format automatically.

## Titles that state the answer

A default visual title just repeats the field names — "Sum of TotalSalesAmount by
CategoryName." That tells a reader *what* is on the chart, not *what it means*. Replace default
titles with titles that read like the answer to a question:

- KPI card: "Total Sales — This Quarter" instead of "Total Sales."
- Bar chart: "Sales by Category" instead of "Sum of TotalSalesAmount by CategoryName."
- Table: "Detail by Category" instead of the default blank title.

This matters more for a report pulled up live in a meeting than for one someone studies alone
at their desk — the title is often the only text a time-pressed reader takes in before looking
at the numbers themselves.

## Key terms

| Term | Meaning |
|---|---|
| Slicer | A visual that lets the report viewer filter the whole page by a column's values |
| Measure formatting | Setting a number format once on the measure, inherited by every visual using it |
| Visual title | The reader's first and sometimes only text cue for what a visual shows |

## Lab

Add a `CategoryName` slicer to your report, set `Total Sales`, `Order Count`, and `Average Order
Value` to the formats described above, and rewrite every visual's title to state what it answers
rather than what field it shows.

## Check yourself

You're ready for Lesson 8 when you can explain why formatting a measure once (rather than
per-visual) is the better approach, and why a report title should state an answer rather than
repeat a field name.
