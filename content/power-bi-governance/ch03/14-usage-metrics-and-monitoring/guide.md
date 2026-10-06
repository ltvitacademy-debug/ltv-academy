# Lesson 14 — Usage Metrics and Monitoring

**Chapter 3 · Trust and Quality · Lesson 14 of 20**

## What you'll learn

- How to turn on a report's usage metrics and find the report once it's generated
- What the usage metrics report actually shows: views, viewers, and who specifically is looking
- Why usage data is a governance tool, not just a vanity number
- Where tenant-wide job monitoring picks up where one report's usage metrics leave off

## Turning usage metrics on

A report owner switches usage metrics on from the report's own menu, and Power BI generates it in the background.

![Screenshot of a notification banner reading "Usage metrics ready — Usage metrics for Retail Analysis Sample are ready" with a View usage metrics button.](/courses/power-bi-governance/ch03/14-usage-metrics-and-monitoring/toggle-new-usage-report-on.png)
*A report owner switches usage metrics on and gets notified the moment Power BI has generated it.*

Once it's ready, the report itself is a real Power BI report — built automatically, but viewable, filterable, and shareable like anything else in the workspace.

## What the report actually shows

The usage metrics report isn't a single number. It breaks usage down by day, by viewer, and down to the individual user.

![Screenshot of the Report Usage Metrics report, showing views-per-day and unique-viewers-per-day bar charts, total views and total viewers, a views rank, and a Views by user table listing individual names and emails.](/courses/power-bi-governance/ch03/14-usage-metrics-and-monitoring/power-bi-report-usage-metrics-update.png)
*Views per day, unique viewers, and a user-by-user breakdown — the report's own usage, not a guess.*

For governance, the **Views by user** table at the bottom is the most important piece on this screen — it's the difference between "people use this" as an assumption and a specific, named list of exactly who.

## Finding the report in a crowded workspace

The usage metrics report doesn't live in a separate corner of the product — it sits in the same "More options" menu as every other item action, right next to lineage.

![Screenshot of a workspace's item list with the "..." menu open, showing View usage metrics report alongside View workspace lineage and other item actions.](/courses/power-bi-governance/ch03/14-usage-metrics-and-monitoring/power-bi-modern-view-usage-metrics.png)
*View usage metrics report sits right alongside lineage and other workspace-level actions in the item's own menu.*

## Why this matters for governance, not just owners

Lesson 11 through 13 covered endorsement and lineage — both are about what a dataset *claims* to be: certified, connected, trustworthy. Usage metrics is the check on whether that claim holds up in practice.

- **Adopted** — steady, ongoing views confirm people actually rely on a certified item, backing up the badge
- **Abandoned** — a certified dataset with zero recent views is a red flag: either it's genuinely obsolete and certification should be revoked, or people have quietly moved to an uncertified substitute, which is worse
- **Accountable** — the views-by-user table ties usage to real people, which matters directly for Lesson 13's impact analysis: it tells you *who* to actually notify, beyond just "every contact on the workspace"

## Monitoring beyond one report

Usage metrics covers one report at a time. For a tenant-wide view of what's running — refreshes, dataflow runs, deployment pipeline jobs — admins use the monitoring hub.

![Screenshot of the Fabric monitoring hub's Job runs list, showing item name, type, last run status, success rate, and workspace for dozens of recent jobs across the tenant.](/courses/power-bi-governance/ch03/14-usage-metrics-and-monitoring/monitoring-hub.png)
*The monitoring hub tracks job runs — refreshes, pipeline deployments — across every item a tenant admin can see.*

Where usage metrics answers "is this being read," the monitoring hub answers "is this actually running correctly" — failed refreshes show up here before a user ever notices stale data in a certified report.

## Key terms

| Term | Meaning |
|---|---|
| Usage metrics report | An auto-generated Power BI report showing views, viewers, and views-by-user for one report |
| Views by user | A table naming exactly which individuals have viewed a report |
| Monitoring hub | A tenant-wide view of job runs — refreshes, dataflows, pipeline deployments |

## Lab

Pick one of this course's earlier screenshots of a Power BI report or dataset and imagine it's been certified for three months. Write two short scenarios: one where its usage metrics confirm the certification was deserved, and one where its usage metrics suggest the certification should be reviewed or revoked. Be specific about what number or pattern would trigger each conclusion.

## Check yourself

Without looking back, can you explain why the "Views by user" table matters more for governance than the simple total-views count sitting right next to it?
