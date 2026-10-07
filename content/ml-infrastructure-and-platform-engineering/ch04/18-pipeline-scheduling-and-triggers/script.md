# Script — Pipeline Scheduling & Triggers

## Segment 1 (title)

A pipeline that only runs when someone remembers to click a button isn't infrastructure, it's a manual step with extra ceremony. This lesson covers the two real ways ML pipelines get kicked off: on a schedule, or in response to something happening.

## Segment 2 (code)

Airflow's modern schedule parameter takes a cron expression, or a preset like "at daily" for the same thing. Two details trip people up: start_date is the earliest date Airflow is willing to schedule a run for, not "when it starts running now." And catchup controls whether Airflow backfills every missed interval since start_date — for a retraining job you almost always want that off, or you'll get days of backdated runs firing the moment you deploy.

## Segment 3 (code)

A fixed schedule is the wrong tool when you need "retrain the moment this data lands," not "roughly once a day." Airflow Datasets solve that: one DAG declares an outlet it writes to, and a downstream DAG's schedule is that dataset itself — no cron expression at all. The moment the upstream task finishes writing, Airflow schedules the downstream run automatically.

## Segment 4 (code)

That's the modern replacement for the older sensor pattern — something like an S3 key sensor, which just polls a location over and over asking "does this file exist yet." Sensors still work and you'll see them in older code, but Datasets express the same intent without the wasted polling. Kubeflow Pipelines has its own version of a timed trigger: a recurring run, created through the SDK's client with a cron expression, configured against the backend rather than inside the pipeline definition itself.

## Segment 5 (steps)

So two modes. Schedule-driven fires on a timer regardless of whether anything changed — simple, but it can lag behind real data. Event-driven fires exactly when new data is ready, which is more responsive but needs the upstream system to reliably signal that it's done. Most mature platforms run both: a schedule as a safety net, events for anything latency sensitive.

## Segment 6 (outro)

Hold onto that split — schedule as the safety net, events for anything time-sensitive. Up next, lesson nineteen: pipeline failure handling, what happens when one of these triggered runs doesn't finish cleanly.
