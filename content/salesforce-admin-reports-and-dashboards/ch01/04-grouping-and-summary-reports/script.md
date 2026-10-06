# Script — Grouping and Summary Reports

## Segment 1 (title)

A tabular report is a flat list. The moment you group its rows by a field, Salesforce turns it into a summary report automatically. This lesson is about how grouping works and what you get once it's applied.

## Segment 2 (steps: how grouping works)

Drag a field into Group Rows, or right-click a column and choose Group Rows by This Field. The format switches from Tabular to Summary the instant you do it — you don't choose the format first. Add a second grouping field for nested groups, each with its own subtotal.

## Segment 3 (screenshot: Group Date By menu)

Date fields get their own menu. Right-click a date column, choose Group Date By, and pick a grain: Day, Calendar Week, Calendar Month, Calendar Quarter, Calendar Year. Grouping by year and then by month inside each year is a common way to compare performance across years.

## Segment 4 (screenshot: two-level grouped summary report)

Here's the result: rows grouped by year, then by month inside each year, each with its own subtotal, and a grand total row at the very bottom. That's a genuine summary report, built from nothing but two grouping fields.

## Segment 5 (screenshot: grouped by stage with unique count)

This report is grouped by Stage, with a subtotal under each one. Notice the Unique Count row at the bottom: fifteen total opportunity rows, but only seven unique accounts. Unique Count answers a different question than a plain row count.

## Segment 6 (outro)

Grouping is the one action that turns a flat list into a summary report, and it works the same for text fields, picklists, and dates. Next up: group by rows and columns at the same time, and you get a matrix report.
