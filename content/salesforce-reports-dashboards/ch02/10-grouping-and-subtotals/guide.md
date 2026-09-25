# Grouping & Subtotals

Filters decide which records appear. Grouping decides how they are organized, and it is the feature that turns a flat list into an answer. In T-SQL terms, grouping is where a report starts to look like `GROUP BY`, but with an important difference: a Salesforce summary report keeps the detail rows visible underneath each group unless you switch them off.

## What you'll learn

- How to group rows in the Outline panel and how many levels you get
- How subtotals, row counts, and grand totals are produced
- How to summarize numeric fields with Sum, Average, Min, and Max
- How to group dates by day, month, quarter, or year
- How to hide details to get a `GROUP BY` style result

## Grouping in the Outline panel

In the Report Builder, the **Outline** panel lists your columns and your groupings. A tabular report has no groupings. Add a grouping and the report becomes a **summary report**; drag a field into the row groupings and the rows collapse under headings, one heading per distinct value. Add a column grouping too and you have a matrix, which you met in Chapter 1.

Limits worth remembering, as of the current Lightning report builder: a summary report allows up to three levels of row grouping, and a matrix allows up to two row groupings and two column groupings. If you need more dimensions than that, it is a signal to move the analysis to a different tool later in this path.

## Subtotals and totals

Once rows are grouped, the report calculates a **subtotal** for each group and a **grand total** for the whole report. In the Lightning builder you control what is displayed with options in the Outline panel and the report toolbar, in most orgs labelled along the lines of Row Counts, Detail Rows, Subtotals, and Grand Total. Turn them on and off to see how the layout changes.

The screenshot in this lesson shows Leads grouped by Lead Source. Each group heading shows its record count in parentheses, and a **Subtotal** row closes each group. The Total Records number sits above the table.

## Summarizing fields

A group needs something to add up. Open a numeric column's dropdown and choose to summarize it. The common options are:

- **Sum**, for currency and quantities
- **Average**, for typical deal size or resolution time
- **Minimum** and **Maximum**, for earliest and latest or smallest and largest values

You can summarize several fields at once, so one group heading can show Sum of Amount, Average of Amount, and Record Count together. These summaries are exactly what the summary formulas in the next chapter build on.

## Grouping dates

Grouping by a raw date field gives you one group per day, which is rarely useful. Date groupings offer a **Group Date By** choice, such as Day, Week, Month, Calendar Quarter, Fiscal Quarter, and Year. Fiscal options follow your org's fiscal year setup, so they can differ from calendar periods. For trend reports, grouping by month or quarter is usually the right level.

## Show Details: the GROUP BY view

Turn **Show Details** off and the detail rows disappear, leaving only group headings and their summary values. That is the view most analysts want when they think "GROUP BY": one row per group, with counts and totals. Turn it back on to drill down into the records behind any number. This toggle is also how you keep a report fast and readable when there are thousands of records.

One honest limit: a report displays a capped number of detail rows on screen (around 2,000 in the Lightning report run page), while summaries and totals still reflect all matching records. If you need every row, use an export or a query rather than the on-screen report.

## Sorting groups

Each grouping can be sorted ascending or descending, and you can sort groups by a summarized value instead of by name, for example "biggest total first." Sorting groups by a value is the closest native equivalent to `ORDER BY SUM(Amount) DESC`.

## SQL mapping

```sql
SELECT LeadSource, COUNT(*), SUM(Amount)
FROM Opportunity
GROUP BY LeadSource
ORDER BY SUM(Amount) DESC
```

A summary report grouped by Lead Source, with Sum of Amount and Record Count, details hidden, and groups sorted by Sum descending, presents the same result.

## Recap

Grouping converts a tabular report into a summary or matrix report. Subtotals and grand totals come with it, and you choose which to show. Summarize with Sum, Average, Min, and Max, group dates at the right granularity, and toggle Show Details to switch between a `GROUP BY` view and a drill-down view. With grouping in place, Chapter 3 adds your own calculations.

## Check yourself

A manager wants one line per Lead Source showing total Amount and number of opportunities, sorted with the biggest total first. Which report format, which summarizations, and which display toggle do you use?
