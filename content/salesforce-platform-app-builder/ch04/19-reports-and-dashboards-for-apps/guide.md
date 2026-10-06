# Reports and Dashboards for Apps

**Chapter 4 · Delivering Applications · Lesson 19 of 24**

An application nobody can see data from isn't finished — it's half-built. Chapter 3 gave the app its logic; this lesson gives it visibility: reports and dashboards wired specifically for the custom objects you designed, embedded directly into the app experience instead of living off in a separate tab.

## What you'll learn

- The four report formats and which one fits a given question
- How a dashboard component differs from the report behind it
- Dynamic dashboards and why "viewed as" matters for a shared app
- Embedding reports and dashboards directly on a Lightning app page

## Report formats, matched to the question

- **Tabular** — a flat list, fastest to build, no subtotals; good for an export-style view, bad for anything that needs a total
- **Summary** — grouped rows with subtotals at each grouping level; the default choice for "how many/how much, broken down by X"
- **Matrix** — grouped by rows *and* columns at once, producing a cross-tab; the right shape for "X by Y," like Opportunities by Owner and by Stage
- **Joined** — multiple report blocks from related or even unrelated objects on one page, each with its own columns; used sparingly, for dashboards that need two different data shapes side by side

For a custom app's objects, this means: a summary report grouped by a status picklist for a pipeline view, or a matrix report crossing owner by stage for a team-capacity view.

## Dashboards are a layer on top of reports

A dashboard component doesn't query data itself — it visualizes a **source report's** results. Change the underlying report's filters or groupings, and every dashboard component built on it updates. This is why dashboard design starts with report design: get the report's grouping and filters right first, then choose a chart type (bar, line, donut, gauge, metric, table) that represents it honestly.

## Dynamic dashboards and "Run As"

A dashboard can run as a specified user (everyone who views it sees that person's data access) or **dynamically as the logged-in user** — each viewer sees only what their own sharing and field-level security allow. For a custom app shared across roles with different visibility (reps see their own records, managers see their team's), a dynamic dashboard is what keeps one dashboard honest for everyone instead of requiring a separate copy per role.

## Putting them on the app page

Reports and dashboards don't have to live on a separate tab a user has to go find. From **Lightning App Builder** (Lesson 8), a Dashboard or Report Chart component can be dragged directly onto a record page or a custom app home page — a manager opens the app and the pipeline matrix is already there, filtered and current, with no extra click. This is a meaningful part of what "feels like a real application" instead of "a database with a UI" actually means.

## SQL mapping

```sql
-- Summary report
SELECT Status__c, COUNT(*), SUM(Amount__c)
FROM Request__c GROUP BY Status__c

-- Matrix report
SELECT OwnerId, Status__c, COUNT(*)
FROM Request__c GROUP BY OwnerId, Status__c
```

A dashboard's "Run As" setting has no direct SQL equivalent — it's closer to re-running the same query under a different user's row-level security context, which is exactly the point.

## Recap

Match the report format to the question (tabular for a list, summary for grouped totals, matrix for a cross-tab), remember a dashboard only visualizes its source report, use dynamic dashboards when viewers have different data access, and embed the finished chart directly on the app's own pages. Next: the security model that makes those different viewers' different access correct in the first place.

## Check yourself

A manager wants one dashboard showing open Request counts broken down by both Owner and Priority, where each rep who views it only sees their own records. Name the report format and the dashboard "Run As" setting you'd choose, and explain why.
