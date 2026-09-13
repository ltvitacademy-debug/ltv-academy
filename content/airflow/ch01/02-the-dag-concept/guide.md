# Lesson 2 — The DAG Concept

**Chapter 1 · Airflow Fundamentals · Lesson 2 of 30**

## What you'll learn

- What the letters in "DAG" actually stand for, one at a time
- Why a pipeline can never be allowed to loop back on itself
- What a DAG looks like once Airflow renders it as a picture
- How a DAG is declared as ordinary Python — a preview of syntax you'll
  write for real in Chapter 2

## Directed: edges have a direction

Every arrow in a DAG points one way. If task `extract` has an arrow to
task `load`, that means `extract` must finish before `load` can start
— not the other way around, and not "at the same time." Airflow reads
that direction to decide what's actually allowed to run right now.

## Acyclic: no loops, ever

The "acyclic" part is the rule that makes the whole thing work: you
cannot draw a path that starts at a task and, by following arrows
forward, arrives back at that same task. A cycle would mean task A
waits on task B, which waits on task A — neither could ever start.
Airflow refuses to load a DAG file that contains one; it's not a style
preference, it's a mathematical requirement for the schedule to be
computable at all.

## Graph: nodes and edges, rendered

Put "directed" and "acyclic" together with "graph" — a structure of
**nodes** (the tasks) connected by **edges** (the dependencies) — and
you get exactly what Airflow draws in its Graph view:

![Airflow's Graph view for the example DAG "toy_chain_linear_vs_chain_complex": task boxes like start_chain, chain_t10, chain_t11, empty_1, chain_t12–t19, empty_2, and end_chain, connected by lines showing which task must finish before the next one starts.](/courses/airflow/ch01/02-the-dag-concept/dag-overview-graph.png)
*Each box is one task (a node); each connecting line is one dependency (an edge). Follow the lines left to right and you're reading the DAG's actual execution order.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

Notice there's no path that loops back toward the left — that's the
"acyclic" rule, visible. Some tasks run in parallel (side by side, no
edge between them), and some run strictly in sequence (connected by an
edge) — the graph shows you both at a glance.

## How a DAG is declared

You don't draw the graph — you write it as Python, and Airflow derives
the picture from your code:

```python
from airflow.sdk import DAG, task

with DAG(dag_id="my_first_dag", schedule="@daily") as dag:
    extract = task(...)   # defined elsewhere in this file
    load = task(...)

    extract >> load        # the edge: extract must finish before load
```

That `>>` on the last line is a dependency — an edge — expressed
directly in code. Lesson 7 covers this bitshift syntax in full; for
now, just recognize that the graph you saw above is generated
automatically from lines that look like this one.

## Key terms

| Term | Meaning |
|---|---|
| DAG | Directed Acyclic Graph — a pipeline defined as tasks with directional dependencies and no loops |
| Node | One task in the graph |
| Edge | One dependency between two tasks — which one must finish before the other starts |
| Cycle | A loop back to an already-visited task; not allowed in a DAG |
| Graph view | The tab in Airflow's UI that renders a DAG's nodes and edges as a picture |

## Lab

1. In the Airflow UI (or the example DAGs that ship with any Airflow
   install), open any DAG and click its Graph tab.
2. Find one task with no incoming edges (nothing points to it) — that's
   a valid starting point for the pipeline.
3. Find one task with no outgoing edges (nothing leaves it) — that's a
   valid ending point.
4. Confirm, just by eye, that no path of arrows ever leads back to a
   box you already passed through.

## Check yourself

You're ready for Lesson 3 when you can explain, without looking back
at this page, what each of the three letters in "DAG" restricts or
describes.
