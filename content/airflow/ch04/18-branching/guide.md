# Lesson 18 — Branching

**Chapter 4 · Sensors, Branching & Trigger Rules · Lesson 18 of 30**

## What you'll learn

- What branching actually does — sending a DAG down one of several
  paths, not running everything every time
- `@task.branch` and how its return value picks the path
- What "skipped" means for the tasks not chosen
- Why the task *after* a branch needs special handling — previewed
  here, covered fully next lesson

## Branching: not every path runs every time

Every task you've built so far runs every time its dependencies are
met. **Branching** breaks that assumption on purpose — a branch task
decides, at run time, which of several downstream paths should
actually execute, and the rest are deliberately skipped.

```python
from airflow.sdk import task

@task.branch(task_id="branching")
def do_branching():
    if some_condition:
        return "branch_a"
    return "branch_false"
```

`@task.branch` works exactly like `@task`, except its return value
is a task ID (or a list of task IDs) telling Airflow which downstream
task(s) to actually run.

## What a real branch looks like

A branch task's decision is completely visible in the UI — the chosen
path shows real states, the unchosen path shows **skipped**:

![A DAG's Graph view alongside its real Python source: a branching task chose "branch_a," which ran successfully along with "follow_branch_a," while "branch_false" is marked skipped — and the downstream "join" task is also skipped.](/courses/airflow/ch04/18-branching/branch_without_trigger.png)
*"Skipped" isn't a failure — it's Airflow correctly recording that this path was never meant to run on this particular DAG Run.*
Source: [Apache Airflow Documentation — DAGs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html)

Notice the `join` task at the end is *also* skipped, even though its
`branch_a` path succeeded — that's not a mistake, and it's the exact
problem the next lesson (Trigger Rules) solves.

## Why "join" gets skipped too — a preview

By default, a task only runs once **all** of its upstream tasks
succeed. `join` has two upstream paths — `follow_branch_a` and
`branch_false` — and since `branch_false` was skipped (not
succeeded), `join`'s default trigger rule treats that as "not all
upstream tasks succeeded," so `join` is skipped as well, even though
the branch that mattered actually ran fine.

This is genuinely surprising the first time you see it, and it's
exactly why Trigger Rules exist — Lesson 19 shows the fix.

## Key terms

| Term | Meaning |
|---|---|
| Branching | A task deciding, at run time, which downstream path(s) actually execute |
| `@task.branch` | The TaskFlow decorator whose return value names the task ID(s) to run |
| Skipped | A state meaning a task was deliberately not run because branching chose a different path — not a failure |

## Lab

1. Write a small DAG with `@task.branch` choosing between two simple
   downstream tasks based on a hardcoded condition.
2. Run it twice with the condition flipped each time, and confirm the
   Graph view shows the opposite path skipped each run.
3. Add a final task after both branches converge, and observe whether
   it runs or gets skipped — don't fix it yet, just notice it.

## Check yourself

You're ready for Lesson 19 when you can explain, in one sentence, why
a task downstream of a branch might get skipped even when the branch
"succeeded."
