# Lesson 1 — What Is Airflow & Why Orchestration?

**Chapter 1 · Airflow Fundamentals · Lesson 1 of 30**

## What you'll learn

- What "orchestration" actually means, and the problem it solves that
  a single script can't
- What Apache Airflow is, specifically
- What a real Airflow deployment looks like — the web UI, and what it
  shows you
- What this course assumes you already know

## The problem orchestration solves

A single Python script can load a file, transform it, and write it
somewhere — that's fine until there's more than one step, the steps
depend on each other in a specific order, one of them needs to run on
a schedule, and something needs to happen when a step fails at 3 AM
with nobody watching. That's the exact moment "just run a script"
stops being enough.

**Orchestration** is the discipline of defining a set of tasks, the
order they must run in, when they should run, and what happens when
one of them fails — as a first-class, inspectable thing, not buried
inside a script's own control flow.

## What Apache Airflow actually is

**Airflow** is an open-source orchestration platform: you define
pipelines as Python code (a **DAG** — Directed Acyclic Graph — covered
in full next lesson), and Airflow takes care of scheduling every task,
tracking every run, retrying failures, and giving you a real UI to see
exactly what happened and when.

This course sits right after dbt and Snowflake in the Analytics
Engineer path for a reason: dbt models the data, Snowflake stores it,
and Airflow is what actually triggers the whole pipeline — extracting
data, running dbt, checking it landed correctly — on a schedule,
reliably, with a real record of every run.

## A real Airflow deployment

Everything happens inside Airflow's own web UI — not a generic
dashboard, but a purpose-built view of exactly what a pipeline did:

![The Airflow web UI: left navigation (Home, Dags, Assets, Browse, Admin, Docs), a DAG's Overview tab showing a run-history grid with green/red/orange status cells per task, Failed Tasks and Failed Runs counters, and a Last 10 DAG Runs duration chart.](/courses/airflow/ch01/01-why-orchestration/airflow-ui-overview.png)
*Every cell in that grid is one task, one run — green means it succeeded, red means it failed, orange means it's running. Nothing here is inferred; it's the actual execution history.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

This is the single biggest practical difference from a cron job or a
script running on a schedule with no visibility: when something fails,
you don't SSH into a server and grep a log file — you look at this
screen and know immediately, which task, which run, and (with one more
click) why.

## What this course assumes

This course assumes real Python (functions, imports, basic scripting
— not software-engineering depth) and real SQL/warehouse knowledge
from earlier in this catalog (T-SQL Development, Snowflake, dbt). It
does not teach Python from scratch, and it does not re-teach dbt or
Snowflake — it teaches how Airflow **orchestrates** work you already
know how to do in those tools.

## Key terms

| Term | Meaning |
|---|---|
| Orchestration | Defining tasks, their order, their schedule, and failure handling as a first-class, inspectable system |
| Airflow | An open-source orchestration platform where pipelines are defined as Python code |
| DAG | Directed Acyclic Graph — Airflow's term for one pipeline definition (full lesson next) |
| DAG run | One actual execution of a DAG, with its own status and history |

## Lab

1. If you haven't already, install Airflow locally (covered in detail
   in Lesson 3) or use a hosted trial if one's available to you.
2. Open the Airflow UI and find the DAGs list, then click into any
   example DAG's Overview tab.
3. Identify, just by looking at the grid, which tasks (if any) failed
   in the most recent run — don't run anything yet, just read the UI.

## Check yourself

You're ready for Lesson 2 when you can explain, in one sentence, what
problem orchestration solves that a single script running on a cron
schedule doesn't.
