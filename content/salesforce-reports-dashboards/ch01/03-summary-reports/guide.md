# Summary Reports

A **summary report** takes the flat list from a tabular report and groups it. Instead of scanning 500 rows, you see totals and counts for each owner, stage, or month, with the underlying records still available underneath. It is the workhorse format of Salesforce reporting, and the source for most dashboard charts.

## What you'll learn

- How to turn a list into a summary by adding groups
- How groupings and summaries map to `GROUP BY` and aggregate functions
- The practical limits of the summary format
- Why summary reports matter for dashboards

## Adding a group

In Lightning's Report Builder, open the **Outline** tab. Under **Groups**, use **Add group...** and choose a field, for example Priority on a Cases report. The moment you add a group, the report becomes a summary.

The results show:

- **A row per group value** (High, Medium, Low), with the records inside each group.
- **A Record Count** for each group.
- **Subtotals** for each group and a **grand total** at the bottom.

In the Cases example, a report of closed cases grouped by Priority might show High: 6, Medium: 13, Low: 4, and a grand total of 23. You can see the distribution at a glance, which the raw list never gave you.

## The SQL equivalent

```sql
SELECT Priority, COUNT(*)
FROM   Case
WHERE  IsClosed = true
GROUP BY Priority
```

The mapping is straightforward:

| Report concept | SQL / SOQL concept |
|---|---|
| Grouping field | `GROUP BY` column |
| Record Count | `COUNT(*)` |
| Sum / Average / Min / Max of a field | `SUM`, `AVG`, `MIN`, `MAX` |
| Filters | `WHERE` |

A difference from SQL: a report keeps the detail rows and shows them beneath each group, so you can drill from a subtotal to the records behind it. A plain `GROUP BY` query returns only the aggregated rows.

## Multiple grouping levels

A summary report supports up to **three levels** of grouping. A pipeline report might group by Owner, then by Stage, then by Close Month. Each level gets its own subtotals. The order matters: the first group is the outermost. Swapping the order changes which subtotals you see, so design the order around the question you are answering.

## Summaries on fields

For numeric and currency columns, you can choose which summary to show at each group level: **Sum**, **Average**, **Minimum**, or **Maximum**. Use the column's dropdown menu and pick **Summarize this Field**. Record Count is available without choosing a field.

## Why it matters for dashboards

Charts need something to plot against. A grouping supplies that axis, and the summarized value supplies the height or size. That is why summary and matrix reports are the usual sources of dashboard charts, while a tabular report needs a row limit to be used at all.

## Limits to keep in mind

- Three grouping levels is the ceiling for summary reports. Need two directions? Use a matrix (next lesson).
- Groups are built from fields on the report type. If the field you want to group by is missing, check the report type first.
- If a field has too many distinct values (say, a free-text field), grouping is not useful. Consider bucketing (Lesson 8).

## Recap

- Add a group in the Outline tab and a tabular report becomes a summary.
- Groupings act like `GROUP BY`; summaries act like aggregates.
- Up to three grouping levels, with subtotals at each.
- Groupings are what charts and dashboards build on.

## Check yourself

You group an Opportunities report by Stage, then by Owner. A colleague would prefer to see totals per owner first. What do you change, and what happens to the subtotals?
