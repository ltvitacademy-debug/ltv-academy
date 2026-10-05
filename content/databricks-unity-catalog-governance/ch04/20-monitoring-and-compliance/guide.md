# Lesson 20 — Monitoring and Compliance

**Chapter 4 · Discovery, Lineage and Auditing · Lesson 20 of 25**

## What you'll learn

- What Lakehouse Monitoring adds on top of lineage, classification, and audit logs
- How a monitor's dashboard is generated and opened from Catalog Explorer
- Reading a monitoring dashboard's real filters and metrics
- How compliance frameworks tie classification, auditing, and monitoring together
- Why governance is a continuous practice, not a one-time setup

## Governance doesn't stop at setup

Everything from Chapters 3 and 4 so far — row filters, column masks, governed tags, ABAC, classification, lineage, audit logs — establishes *controls*. **Monitoring** is what tells you whether those controls are still working: whether data quality is holding up over time, and whether access patterns still match what you expect. Databricks' tool for this is **Lakehouse Monitoring**, which profiles a table on a schedule and builds a dashboard from the results automatically.

## Opening a table's monitoring dashboard

Every table enabled for monitoring gets a **Quality** tab in Catalog Explorer, with a direct link to its generated dashboard.

![Catalog Explorer table page open to the Quality tab, showing 'Anomaly detection' and 'Data profiling' sections, with a 'View dashboard' button highlighted in a red box.](/courses/databricks-unity-catalog-governance/ch04/20-monitoring-and-compliance/dashboard-in-catalog.png)
*The Quality tab on any monitored table — View dashboard opens the metrics Databricks already generated on a schedule, no setup needed to view it.*

## Browsing dashboards directly

The same dashboard also shows up in the workspace's general **Dashboards** list, alongside any other dashboard — monitoring dashboards aren't a separate, hidden system.

![Dashboards list page in the workspace sidebar, showing featured sample dashboards (NYC Taxi Trip Analysis, Retail Revenue & Supply Chain) and a list of named dashboards including 'wine_01 Monitoring', sortable by name, owner, and last modified date.](/courses/databricks-unity-catalog-governance/ch04/20-monitoring-and-compliance/dashboard-list.png)
*A monitoring dashboard is an ordinary dashboard — filterable, sortable, and shareable the same way as anything else in the workspace.*

## Reading the dashboard

A generated monitoring dashboard exposes the same filtering controls as any dashboard — a date range, and slice selectors for narrowing to a specific dimension or model, depending on the table's monitoring profile type (snapshot, time series, or inference log).

![Monitoring dashboard filter row showing 'Last snapshot' timestamp range, 'Slice Key' and 'Slice Value' dropdowns both set to 'No Slice', and 'Start Time'/'End Time' date pickers — above charts for Row Count Over Time and percent NULLs over time.](/courses/databricks-unity-catalog-governance/ch04/20-monitoring-and-compliance/monitor-dashboard-selectors.png)
*Row count and percent-NULL trends, filterable by date range and slice — the same dashboard an analyst would use for any other metric.*

Refreshing the dashboard re-runs its queries over the already-computed metric tables; it does **not** trigger a new profile calculation. To update the underlying numbers, you refresh the monitor itself first (via UI, API, or a schedule), then refresh the dashboard to see the new data.

## Where compliance frameworks tie it together

Lesson 15 showed classification results filterable by **compliance framework** — PII, PCI DSS, GDPR, HIPAA, and others. That same framework label is what connects every tool in this chapter into one answerable question: "are we compliant with GDPR?" stops being one audit project and becomes a standing query — which columns are classified under GDPR (Lesson 15), who has queried them and when (Lesson 19), where that data actually flows (Lesson 17), and whether access to it is still shrinking or growing over time (this lesson, via `system.data_quality_monitoring.table_results` and the dashboards built on it).

## Key terms

| Term | Meaning |
|---|---|
| Lakehouse Monitoring | Databricks' feature for profiling tables on a schedule and generating a metrics dashboard automatically |
| Quality tab | The Catalog Explorer tab on a monitored table, linking directly to its generated dashboard |
| Compliance framework | A label (GDPR, HIPAA, PCI DSS, etc.) connecting classification, audit, lineage, and monitoring into one answerable question |

## Lab

For a table you classified in Lesson 15's lab, sketch what a monitoring dashboard for it should track beyond row count and NULL percentage — what would actually tell you access controls are degrading, not just that data quality is.

## Check yourself

Without looking back: what's the difference between refreshing a monitor and refreshing its dashboard, and name the four other lessons in this chapter that a single "are we GDPR compliant" question would draw from.
