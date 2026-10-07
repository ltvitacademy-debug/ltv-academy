# Retraining Pipelines

This lesson closes Chapter 4 by assembling everything the chapter covered — pipeline frameworks, reproducibility, scheduling, failure handling — into one automated loop: a retraining pipeline that decides, on its own, whether a new model deserves to replace the one currently serving traffic.

## What you'll learn

- The three kinds of triggers that start a retraining run: schedule, performance, and drift
- How to detect drift well enough to act on it, without overreacting to noise
- The end-to-end loop: pull data, retrain, evaluate against a holdout and against the champion, gate, promote
- Why promotion should never be fully automatic without a quality gate
- How this loop ties Chapters 3 and 4 together into one system

## Three kinds of triggers

A retraining pipeline has to start for a reason, and there are three legitimate ones:

- **Schedule-based** — the simplest: retrain every week, every day, whatever cadence matches how fast the underlying data actually changes. Easy to reason about, but wasteful if nothing has actually shifted, and too slow if something has.
- **Performance-based** — a monitored production metric (accuracy against delayed ground truth, a business KPI like approval rate) degrades past a threshold. This reacts to an actual problem, but by definition only after it's already hurting something.
- **Drift-based** — a statistical shift in input feature distributions or prediction distributions, detected before it necessarily shows up in a lagging performance metric.

Most mature systems combine all three: a schedule as a baseline, with performance and drift monitoring able to trigger an earlier, unscheduled run when something's clearly wrong.

## Detecting drift without overreacting

A simple, common drift check compares a reference window (e.g. the training data) against a current window (e.g. this week's production inputs) using something like the Population Stability Index (PSI) per feature:

```python
import numpy as np

def psi(reference, current, bins=10):
    ref_hist, edges = np.histogram(reference, bins=bins)
    cur_hist, _ = np.histogram(current, bins=edges)
    ref_pct = ref_hist / ref_hist.sum() + 1e-6
    cur_pct = cur_hist / cur_hist.sum() + 1e-6
    return np.sum((cur_pct - ref_pct) * np.log(cur_pct / ref_pct))

if psi(reference_feature, current_feature) > 0.2:
    trigger_retraining_pipeline()
```

A PSI above roughly 0.2 is a commonly used rule-of-thumb threshold for "significant shift, worth investigating" — the exact number matters less than having a fixed, documented threshold instead of a judgment call made fresh every time, which is what keeps this from becoming noisy.

## The end-to-end loop

Putting Chapter 4's pieces together, a retraining pipeline — as an Airflow DAG, using the retry and alerting patterns from Lesson 19 — looks like this:

```python
from airflow.decorators import dag, task
from datetime import datetime

@dag(schedule="@weekly", start_date=datetime(2026, 1, 1), catchup=False)
def fraud_retraining_pipeline():

    @task(retries=2, on_failure_callback=notify_slack)
    def pull_latest_data(): ...

    @task(retries=1)
    def retrain(data):
        # fixed seeds, pinned deps, logged to MLflow — Lesson 17
        ...

    @task
    def evaluate_against_champion(candidate_run_id):
        # mlflow.search_runs comparison against current @champion — Lesson 14
        ...

    @task
    def promote_if_better(candidate_version, passed_gate: bool):
        if passed_gate:
            client.set_registered_model_alias(
                "fraud-detector", "champion", candidate_version
            )
        else:
            notify_slack_no_promotion()

    data = pull_latest_data()
    candidate = retrain(data)
    gate_result = evaluate_against_champion(candidate)
    promote_if_better(candidate, gate_result)

fraud_retraining_pipeline()
```

Every piece in this DAG is something earlier lessons already built: reproducible training (Lesson 17), comparison against the current champion (Lesson 14), retries and alerting (Lesson 19), and a one-line promotion using an alias (Lesson 11).

## The quality gate is non-negotiable

The single most important line in that pipeline is the `if passed_gate` check. A retraining pipeline that promotes every new model unconditionally isn't automation — it's an unsupervised way to degrade production the moment a bad run happens to finish without error. The gate should require, at minimum, that the candidate beats the current champion on the same fixed evaluation set used in Lesson 14, and ideally that it has also cleared shadow or canary evaluation before full promotion. When the gate fails, the correct behavior is doing nothing and alerting a human — not promoting anyway, and not silently giving up either.

## What this loop actually replaces

Before this chapter, "retraining" meant a person noticing something looked off, pulling fresh data by hand, running a notebook, eyeballing a metric, and manually copying a file somewhere. Every step in that sentence is now a task in a DAG with a retry policy, a tracked run, a registry comparison, and an alias. Nothing about the underlying ML changed — what changed is that the process around it stopped depending on someone remembering to do it right.

## Key terms

| Term | Meaning |
|---|---|
| Schedule-based trigger | Retraining on a fixed cadence regardless of whether anything has changed |
| Performance-based trigger | Retraining because a monitored production metric degraded past a threshold |
| Drift-based trigger | Retraining because input or prediction distributions shifted, detected before performance necessarily degrades |
| Population Stability Index (PSI) | A common metric comparing a reference and current distribution to flag drift |
| Quality gate | The required condition (e.g. beats the champion on a fixed set) a candidate must clear before promotion |

## Recap

A retraining pipeline combines everything in this chapter: a trigger (schedule, performance, or drift), a reproducible retrain step, a comparison against the current champion using the tooling from Chapter 3, and a non-negotiable quality gate before the one-line alias promotion. This closes Chapter 4 — you've now covered the full lifecycle from a tracked experiment to a model that can retrain and redeploy itself safely, without a human in the loop for the routine case.
