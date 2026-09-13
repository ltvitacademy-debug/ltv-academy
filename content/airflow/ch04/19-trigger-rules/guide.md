# Lesson 19 — Trigger Rules

**Chapter 4 · Sensors, Branching & Trigger Rules · Lesson 19 of 30**

## What you'll learn

- What `trigger_rule` actually controls, and its default value
- Fixing Lesson 18's "join gets skipped" problem with one parameter
- The other real trigger rules worth knowing: `one_success`,
  `all_done`, `all_failed`
- When to reach for a non-default trigger rule

## The default: all_success

Every task has a `trigger_rule`, whether you set it explicitly or
not. The default is `all_success` — a task only runs once **every**
one of its upstream tasks has succeeded. That's the exact rule that
made Lesson 18's `join` task get skipped: one of its two upstream
paths was skipped (not succeeded), so `all_success` correctly refused
to run it.

## The fix: NONE_FAILED_MIN_ONE_SUCCESS

For a task that should run after a branch, regardless of which branch
was taken, `none_failed_min_one_success` is almost always the right
rule — it only cares that nothing *failed*, and at least one upstream
task actually succeeded:

```python
from airflow.sdk import DAG, task, TriggerRule
from airflow.providers.standard.operators.empty import EmptyOperator

join = EmptyOperator(
    task_id="join",
    dag=dag,
    trigger_rule=TriggerRule.NONE_FAILED_MIN_ONE_SUCCESS,
)
```

The result is the exact fix to last lesson's problem:

![The same branch_trigger_example DAG as Lesson 18, but "join" now has trigger_rule=TriggerRule.NONE_FAILED_MIN_ONE_SUCCESS — and this time it shows Success, not Skipped.](/courses/airflow/ch04/19-trigger-rules/branch_with_trigger.png)
*Same DAG, same branch outcome — one line added to `join`'s definition, and it correctly runs instead of being skipped.*
Source: [Apache Airflow Documentation — DAGs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html)

## Other trigger rules worth knowing

| Trigger rule | Runs when |
|---|---|
| `all_success` (default) | Every upstream task succeeded |
| `all_failed` | Every upstream task failed (or was upstream-failed) |
| `one_success` | At least one upstream task succeeded, regardless of the others |
| `all_done` | Every upstream task finished, regardless of outcome — useful for cleanup steps |
| `none_failed_min_one_success` | Nothing failed, and at least one upstream succeeded — the branch-join fix |

`all_done` deserves a special mention: it's the natural choice for a
"clean up temp files" or "send a summary notification" task that
should run no matter what happened upstream, success or failure.

## When to reach for a non-default trigger rule

Only when the default `all_success` genuinely doesn't match what the
task should do — a convergence point after branching, a cleanup step
that must run regardless of outcome, or an alerting task that should
fire specifically *because* something failed (`one_failed`). Changing
the default without a real reason just hides genuine failures instead
of correctly propagating them.

## Key terms

| Term | Meaning |
|---|---|
| `trigger_rule` | The condition controlling when a task runs, based on its upstream tasks' outcomes |
| `all_success` | The default — every upstream task must have succeeded |
| `none_failed_min_one_success` | Nothing failed, and at least one upstream succeeded — the standard branch-join fix |
| `all_done` | Every upstream task finished, regardless of outcome — right for cleanup/notification tasks |

## Lab

1. Take Lesson 18's branching DAG and add
   `trigger_rule=TriggerRule.NONE_FAILED_MIN_ONE_SUCCESS` to the
   `join` task.
2. Re-run it and confirm `join` now shows Success instead of Skipped.
3. Add one more task with `trigger_rule=TriggerRule.ALL_DONE` that
   should run regardless of which branch was taken — confirm it does.

## Check yourself

You're ready for Lesson 20 when you can explain, in one sentence, why
`all_success` was the wrong trigger rule for a task converging after a
branch, and name the rule that actually fixes it.
