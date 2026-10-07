# Pipeline Scheduling & Triggers

A pipeline that only runs when someone remembers to click a button isn't
infrastructure — it's a manual step with extra ceremony. This lesson covers
the two real ways ML pipelines actually get kicked off: on a fixed schedule,
or in response to something happening (new data landing). Both patterns show
up constantly once you're past the "run it myself" phase of a project.

## What you'll learn

- Airflow's `schedule` parameter: cron expressions, presets, and what
  `catchup` actually does
- Why "event-driven" beats "poll and wait" for data-triggered pipelines, and
  how Airflow Datasets implement that
- The older, still-common alternative: sensors like `S3KeySensor`
- How Kubeflow Pipelines schedules a recurring run via the KFP SDK

## Schedule-driven: Airflow's `schedule` parameter

The modern Airflow DAG parameter is `schedule` (it replaced the older
`schedule_interval` name, though you'll still see that name in older code).
It accepts either a cron expression or a preset shorthand:

```python
from airflow.decorators import dag
from datetime import datetime

@dag(
    schedule="0 2 * * *",        # cron: every day at 2 AM
    # schedule="@daily",         # preset shorthand for the same thing
    start_date=datetime(2026, 1, 1),
    catchup=False,
)
def nightly_retrain():
    ...
```

Two details that trip people up constantly:

- **`start_date`** isn't "when the DAG starts running" — it's the earliest
  logical date Airflow is willing to schedule a run *for*. A DAG's first
  actual run happens after one full schedule interval has passed from that
  date, not immediately at deploy time.
- **`catchup`** controls whether Airflow backfills every interval it missed
  between `start_date` and now. For a daily retraining job, `catchup=False`
  is almost always what you want — you don't want fourteen backdated training
  runs firing the moment you deploy a DAG that's been "scheduled" to run daily
  for the last two weeks.

## Event-driven: Airflow Datasets

Scheduling on a timer is fine when "new data roughly every day" is a safe
assumption. It's the wrong tool when you actually need "retrain as soon as
this specific data lands" — a fixed schedule is forced to either run too
early (data isn't there yet) or too late (data's been sitting for hours).

Airflow **Datasets** solve this by letting one DAG declare that it *produces*
a dataset, and another DAG declare that it should run whenever that dataset
updates:

```python
from airflow.decorators import dag, task
from airflow.datasets import Dataset

training_data = Dataset("s3://ml-data/fraud/features/")

@dag(schedule="@daily")
def feature_pipeline():
    @task(outlets=[training_data])
    def write_features():
        write_latest_features_to(training_data.uri)
    write_features()

@dag(schedule=[training_data])     # triggered by the dataset, not a cron
def retrain_on_new_features():
    @task
    def train():
        run_training_job(training_data.uri)
    train()
```

`retrain_on_new_features` has no cron expression at all — its `schedule` is
the dataset itself. The moment `feature_pipeline`'s task finishes writing to
that outlet, Airflow schedules a run of the downstream DAG. This is the
modern replacement for the older pattern of a **sensor** — something like
`S3KeySensor`, which polls a location on a timer, asking "does this key exist
yet?" over and over until it does. Sensors still work and you'll see them in
older codebases, but Datasets express the same intent without the wasted
polling.

## Recurring runs in Kubeflow Pipelines

KFP has its own equivalent: a **recurring run**, scheduled via the SDK's
client rather than a DAG decorator:

```python
from kfp.client import Client

client = Client(host="https://kubeflow.example.com")

client.create_recurring_run(
    experiment_id=experiment_id,
    job_name="nightly-fraud-retrain",
    pipeline_id=pipeline_id,
    cron_expression="0 2 * * *",
    max_concurrent_run_count=1,
)
```

Functionally this plays the same role as Airflow's `schedule` parameter — a
cron-driven trigger for a pipeline — but it's configured against the KFP
backend directly rather than declared inside the pipeline's own Python
definition.

## Schedule-driven vs. event-driven retraining

This distinction is worth internalizing now, because the next lesson builds
directly on it: a **schedule-driven** retrain fires on a timer regardless of
whether anything actually changed, which is simple but can waste compute or
lag behind real data changes. An **event-driven** retrain fires exactly when
new data is ready, via Datasets or an equivalent mechanism, which is more
responsive but requires the upstream system to reliably signal "I'm done."
Most mature ML platforms end up using both: a schedule as a safety net, and
event-driven triggers for anything latency-sensitive.

## Key terms

| Term | Meaning |
|---|---|
| `schedule` | Airflow DAG parameter accepting a cron expression or preset (e.g. `@daily`); replaces the older `schedule_interval` name |
| `catchup` | Whether Airflow backfills every missed interval between `start_date` and now; usually `False` for retraining DAGs |
| Airflow Dataset | A named data reference a DAG can produce (`outlets`) or be scheduled on, enabling event-driven triggering without polling |
| `S3KeySensor` | The older Airflow pattern: polls a storage location on a timer until a key appears |
| Recurring run | KFP's cron-scheduled trigger for a pipeline, created via `Client.create_recurring_run()` |

## Recap

Pipelines get kicked off one of two ways: on a schedule (Airflow's `schedule`
parameter or KFP's recurring run, both accepting cron expressions), or on an
event (Airflow Datasets replacing the older sensor-polling pattern). Up next,
Lesson 19: Pipeline Failure Handling — what happens, and what should happen,
when one of these triggered runs doesn't finish cleanly.
