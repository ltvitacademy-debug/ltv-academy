# Script — Workload Management

## Segment 1 (title)

A single Redshift cluster usually runs a mix of workloads at once — long ETL jobs, live dashboards, ad hoc analysis. Workload management is how Redshift keeps one heavy query from starving everything else.

## Segment 2 (code: manual WLM, separate queues)

With manual WLM you define your own queues — say an ETL queue with low concurrency and high memory for nightly transforms, and a dashboards queue with higher concurrency and lower memory for BI tool queries. A two-hour transformation job in one queue never blocks a dashboard query waiting in the other.

## Segment 3 (steps: keeping the cluster responsive)

Three levers matter here. Query queues route incoming queries by user group or by matching their SQL. Concurrency scaling adds transient extra cluster capacity automatically when a queue gets busier than it can handle. And short query acceleration predicts which queries will run fast and lets them jump ahead of longer-running ones already queued.

## Segment 4 (outro)

Workload management down. Next up: Redshift performance tuning — VACUUM, ANALYZE, reading a query plan, and actually fixing a slow query.
