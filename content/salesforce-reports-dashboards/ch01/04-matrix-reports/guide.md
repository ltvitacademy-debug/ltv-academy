# Matrix Reports

A **matrix report** summarizes records in two directions at once: grouped down the side (rows) and across the top (columns). Where a summary report answers "how much per month?", a matrix answers "how much per month **and per type**?" in a single table. It is Salesforce's built-in pivot table.

## What you'll learn

- How rows, columns, and cells work in a matrix
- How a matrix maps to a SQL pivot
- The limits of the matrix format
- How to choose between summary and matrix

## Reading a matrix

Consider an Opportunities report: **Close Month** on the rows, **Type** (New Business, Existing Business, and so on) across the top, and **Sum of Amount** with **Record Count** in each cell.

- **Row groups** produce one row per value (each Close Month).
- **Column groups** produce one column per value (each Type).
- **Cells** hold the summary where a row and a column intersect, for example the total Amount of New Business deals closing in July.
- **Totals** appear as the far-right column (all types for each month) and the bottom row (all months for each type), plus a grand total.

In the Report Builder you add groups from the Outline tab: **Group Rows** and **Group Columns** are separate sections. Adding a column group is what makes a summary report a matrix.

## The SQL equivalent

A matrix is a pivot. In T-SQL you would write something like this:

```sql
SELECT CloseMonth,
       SUM(CASE WHEN Type = 'New Business'      THEN Amount END) AS NewBusiness,
       SUM(CASE WHEN Type = 'Existing Business' THEN Amount END) AS ExistingBusiness,
       SUM(Amount) AS Total
FROM   Opportunity
GROUP BY CloseMonth
```

Two things are better in a report. You do not have to list each column value by hand, so a new Type value simply appears as a new column. And every total (per row, per column, grand) is calculated for you. Also, you can drill from any cell back to its records.

## Limits to know

1. **Group counts.** In most orgs a matrix supports up to two row groups and two column groups. Check the current limits for your release.
2. **Summaries by default.** A matrix shows aggregates, not detail records, unless you turn on detail rows in the report options.
3. **Width.** If your column group has dozens of distinct values (all account industries, say), the report gets very wide and hard to read. Pick columns with a handful of values, or use bucketing (Lesson 8) to reduce them.
4. **Summary choices are limited.** As in summary reports, numeric fields offer Sum, Average, Minimum, and Maximum, and Record Count is always available.

## Summary or matrix?

- Choose **summary** when you have one main breakdown and want to see the records under each group.
- Choose **matrix** when you want to compare two dimensions side by side, such as region against product, or month against stage.
- If the second dimension makes the table too wide, go back to summary and add it as a second row grouping.

## Recap

- A matrix groups by rows and columns and summarizes in the cells.
- It is the report equivalent of a pivot table, with totals for free.
- Limits: two row groups, two column groups (typical), and summaries by default.
- Keep column groups to few distinct values.

## Check yourself

You need to compare the number of open cases by Priority (High, Medium, Low) for each Case Origin (Phone, Email, Web). Which format fits, and which field goes in the rows versus the columns?
