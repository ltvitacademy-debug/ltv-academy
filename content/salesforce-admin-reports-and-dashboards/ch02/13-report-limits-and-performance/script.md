# Script — Report Limits and Performance

## Segment 1 (title)

Reports feel limitless right up until one doesn't finish running. Salesforce enforces real ceilings, but most slow reports hit a practical wall long before any formal limit.

## Segment 2 (screenshot: report filters panel)

Filters are the lever that matters most, and they're always right here on the report's run page — Show Me, date range, and every field filter you've added, each one narrowing what the report engine has to scan before it groups or summarizes anything.

## Segment 3 (steps: the hard limits)

A few numbers apply across every org. Reports display up to 2,000 rows in the browser at once. There are caps on fields per report type and columns per report. And there's a limited number of scheduled reports and active subscriptions an org and a user can run at the same time. Those exist to protect shared platform performance, not to be restrictive for its own sake.

## Segment 4 (steps: the real bottleneck)

The far more common problem isn't a hard limit — it's an unfiltered report over a big object like Case or Opportunity. With no date range and no status filter, the engine has to scan every candidate record before it can group or summarize anything. That's the single most common cause of a report simply timing out.

## Segment 5 (steps: habits that help)

A short list of habits fixes most of it. Always filter on something selective instead of All Time and All Records. Prefer Summary or Matrix over Tabular on large data sets, since grouped reports only render the groups. And schedule genuinely heavy reports for off-peak hours instead of running them live during business hours.

## Segment 6 (outro)

Filter first, format second — that one habit prevents more slow reports than any setting Salesforce exposes. That's report management. Next up: dashboards, where these same reports become something people actually look at every day.
