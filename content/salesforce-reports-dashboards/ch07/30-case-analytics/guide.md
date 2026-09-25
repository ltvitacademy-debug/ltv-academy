# Case Analytics

Lesson 29 framed service analytics as volume, backlog, speed and customer impact. This lesson builds the reports behind them: a backlog report, an age and resolution time report, and an opened versus closed trend. These are the three views a support manager checks first, and together they make a solid service dashboard.

## What you'll learn

- How to build a backlog report from open cases
- How to measure case age and time to resolve
- How to compare cases opened with cases closed over time
- Which dashboard components suit each case metric

## Backlog: what is open now

The backlog is simply the set of cases that have not been closed. Start with the Cases report type and filter Closed equals False (the standard Closed flag, driven by Status). Then choose your grouping:

- Group by **Priority** to see whether the urgent work is under control
- Group by **Owner** or **Case Owner** to see who holds how much, including queues
- Group by **Status** to see where cases are waiting (new, working, waiting on customer, escalated)
- Group by **Case Origin** if channel matters for staffing

Summarize Record Count, and consider adding average Age. Sorting a tabular version by Age, oldest first, produces the classic "what is about to breach" list that managers use in their stand-up.

## Age and time to resolve

Cases have standard age fields that show how long a case has been open, or how long it took if it is closed. Depending on your org you may see Age in days, hours or minutes. For time to resolve, filter to Closed equals True and summarize the average age by group. You can also calculate it yourself with a row-level formula using Date/Time Closed minus Date/Time Opened, which gives you control over the units.

Averages hide long tails. A team that resolves nine cases in an hour and one in three weeks has a small average and an unhappy customer. Two ways to expose the tail:

- Add a maximum next to the average
- Use a bucket field on Age (under one day, one to three days, three to seven days, over seven days) and report counts per bucket

Report by **Priority** as well. A four-hour average across all priorities is meaningless if high priority cases take longer than low ones.

## Opened versus closed

The question is whether the team is keeping up: are more cases coming in than going out? A single report has trouble with this because opened and closed dates are different fields. There are two workable approaches:

- Two summary reports, one grouped by Date/Time Opened and one grouped by Date/Time Closed, each by week, placed side by side on a dashboard
- A **joined report** (Chapter 1) with two blocks, one grouped by opened date and one by closed date, so both trends appear in one place

Joined reports are limited when it comes to charts and dashboard use, so the two-report approach is often the practical choice for a dashboard. State plainly on the dashboard whether the lines are weekly counts.

## Dashboard components that fit

- **Gauge or metric**: current open cases, or average age of open cases, with a target set by the builder
- **Stacked bar**: open cases by priority and status
- **Line chart**: cases opened per week compared with cases closed per week
- **Table**: the oldest open cases with owner and account, clickable through to the record

A dashboard filter on Case Owner or Account (Chapter 4) lets one dashboard serve every team.

## Cautions

- Time zone and business hours affect age. Native age fields are calendar time; business-hours aging generally needs Entitlements or a custom calculation.
- Reopened cases can restart or extend age depending on your process. Confirm how yours behave before comparing months.
- Small teams have noisy weekly numbers. Use a rolling four-week view for trends.

## Recap

Backlog is Closed equals False, grouped by priority, owner, status or origin. Speed comes from the age fields or a Date/Time formula, and should be shown with maximum or age buckets so long tails are visible. Opened versus closed needs two date groupings, best shown as two reports side by side on a dashboard.
