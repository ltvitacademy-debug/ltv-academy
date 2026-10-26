# Lesson 7 — Adding Slicers and Formatting for the Stakeholder

**Chapter 1 · Beginner Capstone: Regional Sales Snapshot · Lesson 7 of 10**

## What you'll learn

- Adding a region slicer so the report answers more than one question
- Number formatting that reads clearly to a non-technical reader
- Writing titles that state the answer, not just the visual's field names

## Why a slicer, even for a single-stakeholder report

The Lesson 1 requirement was scoped to the Southeast manager's own view, but the underlying
query returns every territory, not just one — Lesson 1 chose to keep all territories in the
data for context. A **slicer** on `Territory` lets the Southeast manager narrow the whole
page down to just their region with one click, while leaving the option open to compare
against the rest of the company without rebuilding anything. Add it to the report canvas:

1. **Visualizations pane → Slicer**, drop it onto an open area of the page (above or beside
   the KPI cards, per the Lesson 5 sketch).
2. Drag `Territory` from `RegionalSalesSnapshot` into the slicer's field well.
3. Set the slicer to allow single selection if the stakeholder only ever looks at one region
   at a time, or multi-select if they sometimes want two or three territories compared.

Because `Total Sales`, `Order Count`, and `Average Order Value` are all measures (Lesson 6),
every visual on the page — cards, bar chart, table — automatically recalculates the moment
the slicer selection changes. No extra wiring is needed; this is exactly the payoff from
choosing measures over raw columns.

## Number formatting that matches the audience

A number like `1847293.5` is technically correct and unreadable to someone glancing at a
report before a call. Format each measure for its actual use:

- **`Total Sales`**: currency format, no decimal places — `$1,847,294`. A stakeholder
  comparing regions doesn't need cents; they need the shape of the number at a glance.
- **`Order Count`**: whole number with a thousands separator — `1,284`. No currency symbol;
  it isn't a dollar amount.
- **`Average Order Value`**: currency format, two decimal places — `$1,439.23`. Unlike the
  totals, a per-order average is small enough that cents can matter for comparison.

Set these from each measure's own properties (select the measure in the **Fields** pane,
then use the **Measure tools → Formatting** ribbon), not per-visual — formatting the measure
once means every card, chart, and table that uses it inherits the same format automatically.

## Titles that state the answer

A default visual title just repeats the field names — "Sum of TotalSalesAmount by
Territory." That tells a reader *what* is on the chart, not *what it means*. Replace default
titles with titles that read like the answer to a question:

- KPI card: "Total Sales — This Quarter" instead of "Total Sales."
- Bar chart: "Sales by Region" instead of "Sum of TotalSalesAmount by Territory."
- Table: "Detail by Region and Product Line" instead of the default blank title.

This matters more for a single-glance report than for a deeply explored one — the title is
often the only text a time-pressed stakeholder reads before looking at the numbers
themselves.

## Key terms

| Term | Meaning |
|---|---|
| Slicer | A visual that lets the report viewer filter the whole page by a column's values |
| Measure formatting | Setting a number format once on the measure, inherited by every visual using it |
| Visual title | The reader's first and sometimes only text cue for what a visual shows |

## Lab

Add a `Territory` slicer to your report, set `Total Sales`, `Order Count`, and `Average
Order Value` to the formats described above, and rewrite every visual's title to state what
it answers rather than what field it shows.

## Check yourself

You're ready for Lesson 8 when you can explain why formatting a measure once (rather than
per-visual) is the better approach, and why a report title should state an answer rather than
repeat a field name.
