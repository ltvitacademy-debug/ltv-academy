# Lesson 28 — Building a Report

**Chapter 7 · Reporting & Dashboards · Lesson 28 of 34**

## What you'll learn

- What Report Designer is and the three things every report needs: a table, a type, and a group-by
- The real out-of-box report types — Bar, Pie, Line, Time Series, List, Pivot Table — and when each one fits
- How grouping and aggregation (count, sum, average) turn raw records into a chart
- How the Chapter 5 condition builder filters a report down to the records that matter
- How to schedule a report to email itself on a recurring basis

## Report Designer: three decisions, in order

Every report in ServiceNow starts from the same three decisions, made in order, in Report Designer. First, the **data source** — almost always a table, like `incident` or `change_request`, though a report can also run against a database view that joins several tables. Second, the **report type** — the chart shape the data will take. Third, **what to group by** — the field whose distinct values become the slices, bars, or rows of the chart. Skip any one of these and the report has nothing to show. A report of the `incident` table with no group-by is just a number; add "group by priority" and it becomes a real breakdown.

## The real chart types, and when to reach for each

ServiceNow ships several report types out of the box, and picking the right one is less about taste and more about what question you're answering:

- **Pie chart** — best for "what's the breakdown of a whole," like open incidents by priority. Each priority value becomes a slice sized by count.
- **Bar chart** — best for comparing categories side by side, like incidents by assignment group, where you want to see which group has the most open work at a glance.
- **Line chart** and **Time Series** — best for a trend across a date field, like incidents created per day over the last 30 days. Time Series specifically buckets records into real calendar intervals (day, week, month) using a date/time field on the table.
- **List** — the simplest type: just a filtered, sorted list of records with chosen columns, no chart at all.
- **Pivot Table** — the most powerful type: cross-tabulates two fields at once, for example priority down the rows and assignment group across the columns, with a count or sum in each cell.

A Pie chart of open incidents grouped by the `priority` field on the `incident` table is the canonical first report every new admin builds, because it's visual, it's immediately useful to a manager, and it only takes a table, a type, and a group-by field to produce.

## Aggregation: count, sum, and average

A group-by field tells the report what to split the data into; an **aggregation** tells it what number to show for each split. The default and most common aggregation is **count** — how many records fall into each group (how many incidents are Priority 1, how many are Priority 2). For numeric fields, a report can instead **sum** a field — total hours logged across all incidents in a group — or compute an **average** — average time-to-resolve per assignment group. The combination of "group by assignment group, aggregate average of resolution time" is exactly the kind of report a Service Desk Manager would ask for to spot which team is falling behind.

## Filtering with the same condition builder

A report doesn't have to run against every record in a table. Report Designer uses the identical condition builder introduced in Chapter 5 for list filters — the same AND/OR rows, the same operators, the same ability to filter on related fields through dot-walking. A "Pie chart of open incidents by priority" really means a report on the `incident` table with a filter of `Active is true` (or `State is not Closed/Resolved/Cancelled`), grouped by `Priority`. Without that filter, the chart would include every incident ever created, open or closed, which isn't the question the manager actually asked.

## Scheduling a report

Once a report exists, it doesn't have to be opened manually every time someone wants it. Reports can be **scheduled** to run automatically and email themselves to a chosen list of users or groups — daily, weekly, monthly, or on a custom recurrence — with the chart rendered as an image or attachment in the email body. This is how a Service Desk Manager gets a Monday-morning snapshot of open-incident-by-priority in their inbox without logging into the platform at all.

## Key terms

| Term | Meaning |
|---|---|
| Report Designer | The ServiceNow tool for building a report: pick a data source, type, group-by, and filter |
| Group-by field | The field whose distinct values split the data into the chart's slices, bars, or rows |
| Aggregation | The calculation applied within each group — count, sum, or average |
| Pivot Table | A report type that cross-tabulates two fields at once, with an aggregation in each cell |
| Scheduled report | A report configured to run automatically and email itself on a recurring basis |

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: to build a Pie chart of open incidents by priority, what table, report type, group-by field, and filter condition do you need — and why does the filter condition matter as much as the group-by field?
