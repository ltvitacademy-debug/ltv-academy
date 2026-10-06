# Report Limits and Performance

**Chapter 2 · Report Management · Lesson 13 of 22**

Reports feel limitless until the day one doesn't finish running. Salesforce enforces real ceilings on how big a report can get and how many can be scheduled at once, and a report that ignores good filtering habits will hit those ceilings — or simply time out — long before any formal limit is reached. This lesson covers both: the hard numbers, and the habits that keep a report fast well before you'd ever need to worry about them.

## What you'll learn

- The row and column limits that apply to every report
- Scheduled report and subscription limits
- Why unfiltered reports are the most common cause of slow or failed reports
- Practical habits that keep a report fast as data grows

## The hard limits

A handful of ceilings apply across every Salesforce org:

- A report can display up to **2,000 rows** in the browser (more exist in the underlying data, but the UI caps what it renders at once — export or use the API to get everything).
- Reports support a maximum of **100 fields** of context per report type layout and a bounded number of columns per report.
- An org can have a limited number of **scheduled reports** running at once, and a limited number of active **subscriptions** per user.
- Filters are capped per report, and report types support a bounded number of object relationships.

These numbers exist to protect the platform's shared infrastructure — a report with no limits at all could degrade performance for every other user in the org, not just the person running it.

## The real bottleneck: unfiltered reports

Long before any hard limit is hit, an unfiltered or loosely filtered report over a large object (Opportunity, Case, Task) will simply run slowly, or time out. The report engine still has to scan and evaluate every candidate record before applying groupings or summaries — a report with **no date range and no status filter** over a multi-million-row object is the single most common cause of a "report failed to run" error.

## Habits that keep reports fast

- **Always filter on something selective** — a date range, an owner, a status — rather than relying on "All Time" and "All Records."
- **Avoid unnecessary formula fields** in heavily-used reports; cross-object formulas in particular add real evaluation cost.
- **Prefer Summary or Matrix over Tabular** for large data sets — once grouped, the report only has to render the groups, not every row.
- **Schedule heavy reports for off-peak hours** rather than running them live during business hours when many other users are also querying the same objects.
- **Split a report that's trying to answer two questions into two reports** — a report doing too much is usually also the slowest one.

## Recap

- Hard limits (2,000 displayed rows, scheduling caps, filter caps) exist to protect shared platform performance.
- Most slow or failed reports hit a practical wall — no selective filter — long before any formal limit.
- Filtering on something selective is the single highest-leverage habit for report performance.
- Heavy, infrequently-needed reports belong on an off-peak schedule, not a live business-hours run.

## Check yourself

A report over the Case object with no date filter and no status filter is timing out for users. What's the most likely fix, and why would adding a chart or extra column not help at all?
