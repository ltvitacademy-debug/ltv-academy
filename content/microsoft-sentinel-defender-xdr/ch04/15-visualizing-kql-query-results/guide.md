# Lesson 15 — Visualizing KQL Query Results

**Chapter 4 · Workbooks & Visualization · Lesson 15 of 32**

## What you'll learn

- What the KQL `render` operator does, and why it's just one more pipe stage, like everything else in Chapter 2
- The difference between `render timechart`, `render piechart`, and `render barchart`, and when each fits
- Why `render` is a KQL-side instruction, separate from how a workbook's query step actually displays it
- How to shape a query's output columns so a given render type has something sensible to draw

## `render` is one more pipe stage, nothing special

Every KQL query in Chapter 2 ended with a table of rows and columns. The **`render`** operator is
simply the next pipe stage after that table, telling the query engine (or a workbook's query step)
how to draw it instead of listing it:

```
SigninLogs
| where TimeGenerated > ago(24h)
| summarize FailedCount = count() by bin(TimeGenerated, 1h)
| render timechart
```

Nothing about the rows changes — `render` doesn't filter, aggregate, or transform data the way
`where` or `summarize` do. It's a display instruction appended at the very end, after the real
work of shaping the data is already done. That's why the columns a query produces *before*
`render` matter more than the `render` line itself: the chart is only as good as the summarize
step that fed it.

## Picking the right render type for the shape of the data

Three render types cover most Sentinel visualization needs, and each expects a different column
shape:

```
| render timechart   -- a time column + one or more numeric columns, plotted over time
| render piechart    -- a category column + one numeric column, shown as proportions
| render barchart    -- a category column + one numeric column, shown as bars
```

`timechart` wants a `bin(TimeGenerated, ...)` column, exactly like the failed-login example above
— it's built for "how did this change over time," which is most of what a SOC analyst actually
asks. `piechart` wants a small number of categories (sign-ins by result type, alerts by severity)
where "share of the whole" is the useful framing — it stops being readable past six or seven
slices. `barchart` works for the same category-plus-number shape as a pie chart, but reads better
when there are more categories or when exact comparison between bars matters more than the
proportion of a whole.

## `render` vs. how a workbook's query step actually displays it

Running `| render timechart` directly in the Logs blade shows that chart immediately — useful
for exploring a query before you ever open a workbook. Inside a workbook's **query step**, though,
the chart type is usually set through the step's own visualization settings (a dropdown choosing
Table, Time chart, Pie chart, etc.) rather than relying on the trailing `render` line, because the
workbook editor gives you additional layout and formatting controls `render` alone doesn't expose.
Either path is reading the same underlying signal: shape the query's output columns correctly, and
both the raw `render` line and the workbook's chart-type picker know what to do with them.

## Key terms

| Term | Meaning |
|---|---|
| `render` | A KQL pipe operator that turns the preceding table of results into a chart |
| `render timechart` | Plots a time-binned column and a numeric column over time |
| `render piechart` | Shows a category and numeric column as proportions of a whole |
| `render barchart` | Shows a category and numeric column as comparable bars |

## Check yourself

A query ends with `summarize count() by AlertSeverity`. Which render type fits that output best —
`timechart`, `piechart`, or `barchart` — and what would have to change about the query for
`timechart` to make sense instead?
