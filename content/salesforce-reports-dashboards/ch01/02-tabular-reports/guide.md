# Tabular Reports

A **tabular report** is the simplest of the four formats: a flat table of records, one row per record and one column per field. If you have ever exported a SOQL result to a spreadsheet, you already understand the shape. Tabular reports are where most people start, and they are still the right answer more often than beginners expect.

## What you'll learn

- What a tabular report shows and what it cannot do
- How it maps to SQL you already know
- When tabular is the right choice
- Its practical limits, including dashboards and row counts

## The shape of a tabular report

In a tabular report you choose columns and a sort order, and you apply filters. That is all. There are no groupings, no subtotals, and no cross-tabs. In the Report Builder you add fields from the Fields pane to the **Columns** section of the Outline, drag them into order, and click a column header's menu to sort or remove it.

Above the results, the run page shows **Total Records**, a count of everything the report matched. Get in the habit of checking it. If you expected roughly 200 open opportunities and see 12,000, a filter is wrong.

## The SQL equivalent

```sql
SELECT Name, Type, Rating
FROM   Account
WHERE  Rating = 'Hot'
ORDER BY Name
```

A tabular report is a `SELECT`, a `WHERE`, and an `ORDER BY`. There is no `GROUP BY`, so there is no aggregation. Report Builder can still show a grand total row for numeric columns, but you cannot get a total per owner, per stage, or per month from a tabular report. That needs the summary format in the next lesson.

## When tabular is the right choice

- **Record lists.** A call list of hot accounts, a queue of open cases, a list of contacts missing an email address.
- **Exports.** People who want the data in a spreadsheet usually want tabular, because it exports cleanly as one flat table.
- **Data checks.** Before grouping anything, run it as tabular and scan the rows. You will spot blank values and odd picklist entries that would otherwise hide inside a total.

## Limits you should know

1. **No grouping.** Tabular reports cannot be broken down by a field or charted on their own, since a chart needs something to group by.
2. **Dashboards need a row limit.** A tabular report generally becomes a dashboard source only when you set a row limit (for example "top 10 by Amount"). Without one, it cannot feed a chart or table component.
3. **Row display caps.** In most orgs the run page shows a limited number of rows at a time (a couple of thousand is typical). For larger lists you export or filter down. Check your org's current limits before promising a stakeholder "the full list on screen".
4. **Sorting is single-purpose.** You sort by columns, but there is no hierarchy of sorts the way grouping gives you.

## Try it yourself

In a sandbox or Developer Edition org, create a report on the **Accounts** report type. Add columns for Account Name, Type, and Rating. Filter to Rating = Hot, sort by Account Name, and run it. Note the Total Records value.

## Recap

- Tabular reports are flat lists: rows are records, columns are fields.
- They map to `SELECT ... WHERE ... ORDER BY` with no aggregation.
- They are best for lists, exports, and data checks.
- They cannot group, and they need a row limit to feed a dashboard.

## Check yourself

Your manager asks for "total open pipeline by sales rep". Explain, in one sentence, why a tabular report is the wrong format for that question.
