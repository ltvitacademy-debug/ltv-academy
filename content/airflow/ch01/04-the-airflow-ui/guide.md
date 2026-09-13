# Lesson 4 — The Airflow UI, Tour

**Chapter 1 · Airflow Fundamentals · Lesson 4 of 30**

## What you'll learn

- What the DAGs list page shows you before you even open a pipeline
- What the Grid view adds that the list page can't show
- Where the Graph, Calendar, and Code tabs each fit into your workflow
- How to navigate from "something looks wrong" to "here's exactly what
  happened" using nothing but clicks

## The DAGs list: your starting point

Every session in Airflow starts here — a table of every DAG Airflow
knows about, with enough at-a-glance status to triage your whole day:

![Airflow's DAGs list page: filter chips for All, Failed, Queued, Running, Success, and Required Actions above a search box, and a table of DAGs — tutorial_taskflow_api, example_simplest_dag, toy_chain_linear_vs_chain_complex, assets_producer, assets_consumer, complex_pipeline — each row showing its schedule, latest run status, next run time, and a small run-history sparkline bar chart.](/courses/airflow/ch01/04-the-airflow-ui/dag-list.png)
*Filter chips at the top let you jump straight to "what's Failed right now" across every DAG, not just one.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

Notice the `toy_chain_linear_vs_chain_complex` row shows a red "Failed"
badge on its latest run — that's the same DAG you saw in the Graph
view last lesson, and it's exactly the kind of thing this page is
built to surface immediately, with no clicking required yet.

## The Grid view: history, per task

Click into a DAG and the Grid tab shows you something the list page
can't: every task, and every run, at once:

![Airflow's Grid view for one DAG: a bar chart of run durations across the top, one column per DAG run, above a row per task with a colored/checked status cell at the intersection of each task and each run.](/courses/airflow/ch01/04-the-airflow-ui/dag-overview-grid.png)
*Each column is one run, each row is one task, and each cell is that task's status on that specific run — read across a row to see if one task fails repeatedly, or down a column to see how one whole run went.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

This is the view you'll live in day to day: it answers "is this task
flaky, or did it just fail once" in a single glance, something a
one-run-at-a-time view can't.

## The Graph view: structure, one run at a time

Covered in Lesson 2 — the Graph tab draws the DAG's actual nodes and
edges. Where the Grid view stacks every run into rows and columns, the
Graph view shows you the shape of one run (or the DAG's static
structure) so you can see which tasks were waiting on which.

## The Calendar and Code tabs

The Calendar tab plots DAG run outcomes across a full month, so you
can spot patterns like "this always fails on the 1st" that a run-by-
run view would bury. The Code tab shows the exact Python source that
produced the DAG you're looking at, version by version — the same tab
you'll see with a real DAG's source code in Lesson 6.

## Key terms

| Term | Meaning |
|---|---|
| DAGs list | The home page listing every DAG with schedule, latest/next run, and filter chips |
| Grid view | Per-DAG tab showing every task (rows) across every run (columns) as a status grid |
| Graph view | Per-DAG tab rendering the DAG's nodes and edges as a picture |
| Calendar tab | Per-DAG tab plotting run outcomes across a month |
| Code tab | Per-DAG tab showing the exact Python source behind that DAG |

## Lab

1. Open your local Airflow UI's DAGs list and use the filter chips to
   show only DAGs with a Failed latest run.
2. Click into any DAG and open its Grid tab — find one task row where
   every cell is the same color, and one where the color changes
   across runs.
3. Switch to that same DAG's Code tab and confirm the task IDs you saw
   in the Grid match names you can find in the source.

## Check yourself

You're ready for Lesson 5 when you can say which tab you'd open first
to answer: "is task X consistently failing, or did it fail once?"
