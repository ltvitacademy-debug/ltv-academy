# Script — Matrix Reports

## Segment 1 (title)

A summary report groups down the side. A matrix report groups down the side and across the top, at the same time. If you've ever built a pivot table in Excel, you already know the idea.

## Segment 2 (screenshot: matrix)

Here's a real matrix report. Close Month runs down the left side, Opportunity Type runs across the top, and each cell shows the sum of Amount, with a record count underneath. The far-right column and the bottom row are totals. One look tells you which months and which types carry the money. That's the kind of comparison a summary report alone can't show at a glance.

## Segment 3 (steps: reading a matrix)

To read a matrix, start with three parts. Row groups give you one row per value, like Close Month. Column groups give you one column per value, like Type. And the cells hold the summary where a row and a column meet, with totals on the edges. Once you can name those three parts, any matrix becomes easy to read.

## Segment 4 (code: pivot in SQL)

In T-SQL, this is a pivot. You'd write SUM of CASE WHEN for each column value, grouped by month. The report builder does that for you, and it calculates every total, without you hard-coding a column per value.

## Segment 5 (steps: limits)

Matrix reports have limits. In most orgs you can have up to two row groups and two column groups. By default you see summaries rather than the underlying records. And if a column group has dozens of distinct values, the report becomes very wide, so choose column fields with a few values.

## Segment 6 (outro)

What if you need two different report types in the same view? That's a joined report. Next up.
