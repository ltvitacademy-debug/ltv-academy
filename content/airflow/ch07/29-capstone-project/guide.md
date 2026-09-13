# Lesson 29 — Capstone: An Orchestrated ELT Pipeline

**Chapter 7 · Capstone · Lesson 29 of 30**

## What you'll build

Everything from this course, applied to a real, multi-task DAG of
your own — not another walkthrough of a lesson example. This capstone
has one goal: prove you can design, build, and productionize a real
orchestrated pipeline from a blank DAG file, without a lesson walking
you through each step.

## The brief

Starting from any real (or realistic practice) data source you can
extract from, deliver one DAG that includes all of the following:

1. **Real tasks with real dependencies** (Chapters 1-2)
   - At least three tasks using real operators (`PythonOperator`,
     `BashOperator`, or a provider operator) — not placeholder
     `EmptyOperator` stand-ins
   - Explicit `>>` dependencies between them that reflect a real
     order: extract, then load, then transform — not an arbitrary
     chain
   - At least one XCom passing real data (a row count, a filename, a
     status) from one task into a decision made by a later task

2. **A real Snowflake connection** (Chapter 3)
   - A Connection configured for Snowflake (or another warehouse if
     Snowflake isn't available to you), used by a hook or provider
     operator — not a hardcoded credential in the DAG file
   - At least one task that actually loads or queries data through
     that Connection

3. **A sensor or a branch** (Chapter 4)
   - Either a sensor that waits on a real condition (a file landing,
     an upstream DAG's asset) before continuing, **or** a
     `BranchPythonOperator` that takes a different path based on a
     real condition (row count, data quality check, day of week)
   - Whichever you choose, the branch or sensor's condition must be
     driven by real data or state, not a hardcoded `True`

4. **A dbt run triggered from Airflow** (Chapter 5)
   - A task that actually runs `dbt build` (or `dbt run` +
     `dbt test`) against the data your earlier tasks loaded — a real
     dbt project, even a small one, not a placeholder

5. **Real retries and alerting** (Chapter 5)
   - `retries` and `retry_delay` configured on at least the tasks that
     touch external systems (the extract and the Snowflake load)
   - A real `on_failure_callback` or equivalent alerting hook wired up
     — even if it just logs or emails, it has to actually fire on a
     real failure, not be theoretical

## What "done" looks like

A DAG file where a stranger could open it, read the task definitions
and dependency chain, and understand exactly what data moves where,
in what order, under what conditions — without you explaining
anything out loud. The Graph view should visually tell the same story
the code does.

## A realistic order of operations

1. Get the extract and load tasks working locally first, with plain
   `PythonOperator` calls you can test outside Airflow before wiring
   them into a DAG.
2. Add the Connection and confirm the Snowflake task actually loads
   real rows before adding anything conditional on top of it.
3. Add the sensor or branch once the linear path works — conditional
   logic on top of a broken pipeline just hides two problems instead
   of one.
4. Wire in the dbt task once there's real data in Snowflake for it to
   transform.
5. Add retries and alerting last, and prove the alert fires by
   deliberately failing a task once — the same "prove it, don't just
   configure it" habit this course has used since Chapter 5.

## Key terms

| Term | Meaning |
|---|---|
| Capstone | A project applying this course's full toolkit to a pipeline you design yourself, not a guided walkthrough |
| Done | The DAG itself demonstrates the practice — visible in its code and Graph view, without verbal explanation |
| Proof of failure | Deliberately failing a task once to confirm retries and alerting actually work, not just that they're configured |

## Lab

This entire lesson *is* the lab. Work through the brief above against
a real (or realistic practice) data source, checking off each of the
five numbered sections as you complete it.

## Check yourself

You're ready for the wrap-up lesson when your DAG satisfies all five
sections of the brief, and you've watched at least one deliberate
failure trigger a retry and an alert for real.
