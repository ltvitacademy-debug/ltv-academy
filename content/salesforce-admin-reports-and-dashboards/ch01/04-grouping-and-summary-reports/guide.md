# Grouping and Summary Reports

**Chapter 1 · Reports · Lesson 4 of 22**

A tabular report is a flat list — useful, but it can't show you totals by sales stage or by month on its own. The moment you group rows by a field, Salesforce automatically turns your report into a **summary report**: grouped rows with subtotals. This lesson covers how grouping works and what you get once you add it.

## What you'll learn

- How to group a report by a field
- Why grouping automatically changes the report format to Summary
- Grouping dates by day, week, month, quarter, or year
- Reading subtotals, unique counts, and grand totals

## Grouping turns Tabular into Summary

In the Outline tab, drag a field into **Group Rows**, or right-click a column header in the preview and choose **Group Rows by This Field**. The instant you do, the report format changes from Tabular to **Summary** automatically — in Lightning Experience you don't pick the format first and group second; grouping *is* what makes a report a summary report. Add a second row-level grouping field and you get nested groups, each with its own subtotal, inside the outer group.

## Grouping dates

Date fields group differently from text or picklist fields. Right-click a date column and choose **Group Date By...**, then pick a grain: Day, Calendar Week, Calendar Month, Calendar Quarter, Calendar Year, Fiscal Quarter, and more. A report grouped by Calendar Year, then by Calendar Month within each year, is a common way to compare performance across two or more years side by side.

## Reading the summary

Once a report is grouped, each group shows a **subtotal** row for every numeric or currency column, calculated with whatever summary type you chose (Sum, Average, Max, Min). Salesforce also offers a **Unique Count** summary for non-numeric columns — useful for answering "how many *distinct* accounts appear in this group," as opposed to how many rows. At the very bottom, the **Grand Total** row rolls every group's subtotal into one total for the whole report (you can toggle it off in the report footer, as covered in Lesson 2).

## Key terms

| Term | Meaning |
|---|---|
| Group Rows | The Outline section where you drag a field to group by it |
| Summary report | A report with one or more row-level groupings and subtotals |
| Group Date By | The right-click option for grouping a date field by day/week/month/etc. |
| Subtotal | A summarized value shown at the end of each group |
| Unique Count | A summary type counting distinct values rather than rows |
| Grand Total | The single summary row for the entire report |
