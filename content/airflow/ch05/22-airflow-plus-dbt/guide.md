# Lesson 22 — Airflow + dbt

**Chapter 5 · Practical Data Pipelines With Airflow · Lesson 22 of 30**

## What you'll learn

- The two real ways to trigger a dbt project from Airflow
- Why "just run `dbt build`" is a completely valid answer for a lot of
  teams — and where it falls short
- What `astronomer-cosmos` actually does differently: turning a dbt
  project into native Airflow tasks
- Why dbt's own DAG and Airflow's DAG are not the same thing, and how
  they relate

## Two DAGs, not one

This is the one idea to hold onto for the whole lesson: **dbt already
has its own dependency graph.** Every `ref()` call in a dbt project
(from the dbt course) builds dbt's own internal DAG of models — that's
what `dbt run` and `dbt build` already execute correctly, in the right
order, on their own.

Airflow's DAG in this chapter is not replacing that. It's the outer
layer: deciding *when* the whole dbt project runs, *what* runs before
it (the load step from Lesson 21), and *what happens if it fails*
(Lessons 24-25). The question this lesson answers is just: how does
Airflow actually kick off that already-correct dbt run?

## Option 1: BashOperator — run the dbt command directly

The simplest, most common approach: Airflow just shells out to the
`dbt` CLI, exactly like you'd run it from your own terminal.

```python
from airflow.operators.bash import BashOperator

trigger_dbt_build = BashOperator(
    task_id="trigger_dbt_build",
    bash_command=(
        "cd /opt/dbt/sales_project && "
        "dbt build --profiles-dir /opt/dbt/profiles"
    ),
)
```

To Airflow, this is one task — a single box in the Graph view. Inside
that one task, dbt runs its *entire* internal DAG: every model, in the
right order, with dbt's own tests. This is exactly what Lesson 21's
`trigger_dbt_build` task was doing. It's simple, it works, and for a
lot of real pipelines it's the right call — you get dbt's build
output in the task log, and if any model fails, the whole task (and
task instance) shows failed.

Its limitation: Airflow has no visibility *inside* that one task. If
40 models run and only one fails, Airflow's Graph view still just
shows one red box — you have to open the log and read dbt's own output
to find out which model broke.

## Option 2: astronomer-cosmos — one Airflow task per dbt model

`astronomer-cosmos` is an open-source package that parses a dbt
project's manifest and generates one real Airflow task *per dbt
model*, wired together with the same dependencies dbt's own `ref()`
graph already defines.

```python
from cosmos import DbtDag, ProjectConfig, ProfileConfig

sales_dbt_dag = DbtDag(
    project_config=ProjectConfig("/opt/dbt/sales_project"),
    profile_config=ProfileConfig(
        profile_name="sales_project",
        target_name="prod",
        profiles_yml_filepath="/opt/dbt/profiles/profiles.yml",
    ),
    dag_id="sales_dbt_models",
)
```

This one object *is* a full Airflow DAG — Cosmos reads the dbt
project's own dependency graph and reproduces it as Airflow tasks
automatically. Now if one model fails, you see exactly which model,
as its own box, in Airflow's Graph view — dbt's lineage becomes
Airflow's dependency chain, one-to-one.

## Which one to reach for

BashOperator is the right default when you just need "run the dbt
project and know if it succeeded or failed" — it's less to maintain
and dbt's own output already tells you what happened. Reach for Cosmos
when a team specifically needs per-model visibility and retries inside
Airflow itself — for example, retrying just one failed model instead
of re-running the whole project.

## Key terms

| Term | Meaning |
|---|---|
| dbt's DAG | dbt's own internal dependency graph, built from every `ref()` in a project — separate from and unaffected by Airflow's DAG |
| `BashOperator` (for dbt) | Runs the dbt CLI as one Airflow task; dbt's own DAG runs invisibly inside it |
| `astronomer-cosmos` | A package that turns a dbt project into native Airflow tasks, one per model, mirroring dbt's `ref()` graph |
| `DbtDag` | Cosmos's object that generates a full Airflow DAG directly from a dbt project |

## Lab

1. Take any dbt project you've built in the dbt course (or the
   `jaffle_shop` example project).
2. Write the one-line `BashOperator` `bash_command` that would run
   `dbt build` for that project from inside an Airflow task.
3. In one sentence, explain what Airflow's Graph view would show if
   one model in that project failed — for the BashOperator version vs.
   the Cosmos version.

## Check yourself

You're ready for Lesson 23 when you can explain, without looking back,
why dbt's dependency graph and Airflow's dependency graph are two
different things that happen to end up doing similar-looking work.
