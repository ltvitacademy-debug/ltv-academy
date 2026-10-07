# Pipeline Failure Handling

A pipeline that has never failed hasn't run long enough. Networks drop, APIs rate-limit, disks fill up, training jobs get preempted. This lesson treats failure as the normal case to design for — retries, alerting, idempotency, and checkpointing — rather than an edge case to apologize for after the fact.

## What you'll learn

- Airflow's per-task retry controls: `retries`, `retry_delay`, exponential backoff
- Alerting on failure with `on_failure_callback`, and timing out a stuck task
- Idempotency: why a retried task must be safe to run twice
- Checkpointing long training jobs so a crash doesn't mean starting from zero
- Telling transient failures (worth retrying) apart from deterministic ones (worth paging a human)

## Retries are the first line of defense

Most pipeline failures are transient: a network blip, a rate limit, a momentary lock contention on a database. Airflow handles this per task, not per pipeline, so a flaky extract step doesn't force the whole DAG to be "retry everything":

```python
from airflow.decorators import task
from datetime import timedelta

@task(
    retries=3,
    retry_delay=timedelta(minutes=2),
    retry_exponential_backoff=True,
    execution_timeout=timedelta(minutes=30),
)
def extract_training_data():
    # a transient failure here retries automatically
    ...
```

`retries=3` gives the task three more attempts after the first failure. `retry_exponential_backoff=True` spaces those attempts out — 2 minutes, then roughly 4, then roughly 8 — instead of hammering a struggling upstream service three times in six minutes. `execution_timeout` caps how long a single attempt is allowed to hang before Airflow kills it and counts it as a failed attempt, which matters for a task that might otherwise just freeze silently.

## Alerting: don't wait for someone to look

Retries handle the failures that fix themselves. For the ones that don't, a human needs to know immediately, not whenever they happen to check the UI:

```python
def notify_slack(context):
    task_id = context["task_instance"].task_id
    dag_id = context["dag"].dag_id
    send_slack_alert(f"{dag_id}.{task_id} failed after all retries")

@task(retries=3, on_failure_callback=notify_slack)
def train_model():
    ...
```

`on_failure_callback` fires once a task has exhausted its retries and is genuinely failed, with the full execution context available — which DAG, which task, which run. Wiring this into Slack, PagerDuty, or email is what turns "pipeline monitoring" from a habit of checking a UI into something that pages a person.

## Idempotency: safe to run twice

Retries only help if re-running a task produces the same correct result, not a corrupted one. A task that **appends** a row every time it runs will double-write on a retry; a task that **writes to a fixed, versioned path** or **upserts** will not:

```python
# Not idempotent — a retry after a partial failure double-counts rows
def bad_load(df):
    df.to_sql("predictions", con, if_exists="append")

# Idempotent — re-running with the same run date overwrites, not duplicates
def good_load(df, run_date):
    df.to_sql(f"predictions_{run_date}", con, if_exists="replace")
```

The general principle: design every task so that running it once and running it three times (because of two retries) leave the system in the identical final state. This is a design decision made when the task is written, not something retries can fix afterward.

## Checkpointing: don't lose hours of training to one crash

For a long training job, a single failure late in training is a different problem than a quick extract step failing — restarting from epoch 0 after a crash at epoch 47 is enormously wasteful. Checkpointing addresses this directly:

```python
import torch

for epoch in range(start_epoch, num_epochs):
    train_one_epoch(model, optimizer)
    torch.save(
        {"epoch": epoch, "model": model.state_dict(), "optimizer": optimizer.state_dict()},
        f"checkpoint_epoch_{epoch}.pt",
    )

# on restart:
checkpoint = torch.load(latest_checkpoint_path())
model.load_state_dict(checkpoint["model"])
optimizer.load_state_dict(checkpoint["optimizer"])
start_epoch = checkpoint["epoch"] + 1
```

A task that checkpoints every epoch turns a crash at epoch 47 into "resume from epoch 47," not "start over." Combined with Airflow's own task-level retry, the retried attempt resumes near where it left off instead of repeating all the wasted work.

## Transient vs. deterministic failures

Not every failure should be retried, and treating them identically wastes time and obscures real bugs. A **transient** failure (a timeout, a momentary lock, a rate limit) is likely to succeed on retry — more attempts genuinely help. A **deterministic** failure (a bug in the code, a schema mismatch, a missing required column) will fail exactly the same way every time — retrying it three times just delays the alert by three retry intervals for no benefit. Distinguishing them in code (catching a specific transient exception type and retrying only that, while letting a deterministic error like a `KeyError` from a missing column fail fast and alert immediately) keeps retries useful instead of becoming a three-attempt delay on every real bug.

## Key terms

| Term | Meaning |
|---|---|
| Exponential backoff | Spacing out retry attempts with increasing delays rather than retrying immediately |
| `on_failure_callback` | An Airflow hook that fires once a task has exhausted retries, used to trigger alerts |
| Idempotency | The property that running a task once or several times leaves the system in the same final state |
| Checkpointing | Periodically saving training state so a crash resumes nearby instead of from the start |
| Transient vs. deterministic failure | Whether a retry is likely to succeed (transient) or will fail identically every time (deterministic) |

## Recap

Failure is the normal case: Airflow's per-task `retries` and backoff absorb transient issues, `on_failure_callback` makes sure a human finds out about the rest immediately, idempotent task design keeps retries safe, and checkpointing keeps a long training job's crash cheap instead of catastrophic. Telling transient failures apart from deterministic ones keeps all of this useful rather than just slow. Next, in Lesson 20, all of this ties together with scheduling and quality gates into a fully automated retraining pipeline.
