# Script — The Airflow UI, Tour

## Segment 1 (title)

Every session in Airflow starts on one page and branches out from there. Let's actually tour it — the DAGs list, the Grid view, and where the Graph, Calendar, and Code tabs each fit.

## Segment 2 (screenshot: DAGs list)

This is the DAGs list — every DAG Airflow knows about, one row each, with filter chips for All, Failed, Queued, Running, Success right at the top. You can jump straight to "what's failed right now" across your entire environment, not just one pipeline.

## Segment 3 (screenshot: Grid view)

Click into a DAG and the Grid tab shows what the list page can't — every task as a row, every run as a column, and a status cell at each intersection. Read across a row to see if one task is flaky, or down a column to see how one whole run went.

## Segment 4 (steps: the other tabs)

The Graph tab, covered last lesson, draws the DAG's actual structure — nodes and edges, one run at a time. The Calendar tab plots outcomes across a full month, so patterns like "always fails on the 1st" don't get buried. And the Code tab shows the exact Python source behind the DAG, version by version.

## Segment 5 (outro)

Next lesson: Operators — the building block that turns a task definition into something Airflow can actually run.
