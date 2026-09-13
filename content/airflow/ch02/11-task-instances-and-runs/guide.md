# Lesson 11 — Task Instances & DAG Runs

**Chapter 2 · Building DAGs · Lesson 11 of 30**

## What you'll learn

- The exact difference between a DAG, a DAG Run, and a Task Instance
- Why "the task failed" is an incomplete sentence without saying
  which run
- Reading a real Task Instances table
- What "Try Number" tells you that the state alone doesn't

## Three different things, one confusing vocabulary

These three terms get used loosely in conversation, but they mean
three genuinely different things in Airflow:

- **DAG** — the definition. The Python file. It doesn't "run" by
  itself; it's the template.
- **DAG Run** — one specific execution of that DAG, tied to one
  logical date, with its own overall status.
- **Task Instance** — one specific task, within one specific DAG Run.
  The same task (`chain_t12`, say) has a different Task Instance for
  every DAG Run it's ever been part of.

Saying "the task failed" without naming which run is like saying "the
test failed" without saying which submission — the task's *definition*
didn't change; one specific instance of it, on one specific run, did.

## Reading a real Task Instances table

Clicking into one task and choosing its Task Instances view shows
every run that task has ever been part of, side by side:

![A Task Instances table for one task (chain_t12) across seven DAG Runs, showing State (Upstream Failed, Success), Start/End Date, Try Number, Pool, Operator, Duration, and Dag Version for each.](/courses/airflow/ch02/11-task-instances-and-runs/dag-run-task-instances.png)
*Same task, seven different Task Instances — two "Upstream Failed" (this task never got a chance to run because something before it failed), the rest "Success." Each row is a genuinely separate execution record.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

Notice **Try Number**: several rows show `1`, meaning that instance
succeeded (or is still being attempted) on its first try — a
`retries` setting (covered in Chapter 5) would show a higher number
here after Airflow automatically re-attempted a failed task.

## Why "Upstream Failed" isn't the same as "Failed"

Two of the rows above show **Upstream Failed**, not **Failed** —
that's an important, specific distinction: the task itself never ran
at all, because something it depends on failed first. Airflow doesn't
pretend the task was attempted and crashed; it correctly records that
the task was skipped because its prerequisite wasn't met. Chapter 4's
Trigger Rules lesson covers exactly when and why this happens, and how
to change that default behavior.

## Key terms

| Term | Meaning |
|---|---|
| DAG | The pipeline's definition — a Python file, not a running thing itself |
| DAG Run | One specific execution of a DAG, tied to one logical date |
| Task Instance | One task, within one specific DAG Run — the same task has many instances over time |
| Try Number | How many times this specific Task Instance has been attempted |
| Upstream Failed | A state meaning the task never ran because a dependency failed first, distinct from Failed |

## Lab

1. Find a DAG in your own Airflow instance (or the example DAGs
   included with a fresh install) that has run more than once.
2. Click into one specific task and open its Task Instances view.
3. Find a row with a Try Number greater than 1, if one exists, and
   note what that tells you happened on that particular run.

## Check yourself

You're ready for Lesson 12 when you can explain, without looking it
up, the actual difference between a DAG, a DAG Run, and a Task
Instance — using all three words correctly in one sentence.
