# Script — Case Analytics

## Segment 1 (title)

Lesson 29 framed service analytics. Now we build the reports: backlog, age and resolution time, and opened versus closed. Together they make the core of a service dashboard.

## Segment 2 (code: backlog)

Backlog is every case that isn't closed. Use the Cases report type, filter Closed equals False, and group by priority, owner, status or origin. Sort a tabular version by age, oldest first, and you have the list managers use in stand-up. Add average age as a second summary, and you see both how many and how old.

## Segment 3 (code: age and resolution time)

Cases have standard age fields. For time to resolve, filter to closed cases and average the age by priority. Or use a row-level formula, closed date-time minus opened date-time. Then add a maximum, or bucket age, because an average hides a long tail. Report by priority as well, because one blended average across every priority hides the cases that matter most.

## Segment 4 (steps: opened versus closed)

Opened versus closed needs two different date fields. Build two summary reports grouped by week, one by opened date and one by closed date, and put them side by side. A joined report can do it in one place, but joined reports have chart and dashboard limits. State plainly on the dashboard that the lines are weekly counts, so nobody reads them as running totals.

## Segment 5 (steps: dashboard components)

Match each metric to a component. A gauge for open cases or average age. A stacked bar for priority and status. A line for opened versus closed. And a table of the oldest cases. Remember native age is calendar time, not business hours. Add a dashboard filter on case owner or account and one dashboard can serve every team.

## Segment 6 (outro)

Service metrics are covered. Next up: campaign analysis.
