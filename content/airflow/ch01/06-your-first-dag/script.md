# Script — Your First DAG

## Segment 1 (title)

A DAG file is ordinary Python. Strip away everything optional and four things remain — an import, a with-DAG block with an ID and a schedule, at least one task, and a line wiring their order. Let's write one.

## Segment 2 (code: the worked example)

Here's a real, complete DAG. dag_id gives it a unique name, start_date is when its schedule window begins, and this cron expression means once a day at midnight. Inside the block, hello is a classic operator-based task; world uses the newer at-task decorator to turn a plain Python function into a task directly. And hello shift-shift world is the dependency — hello finishes before world runs.

## Segment 3 (screenshot: Code tab)

Save a file like this in your dags folder, trigger it, and open that run's Code tab. This is the exact file, as Airflow actually parsed it — not a summary, the literal source, imports and all, down to the dependency line at the bottom.

## Segment 4 (steps: confirming it worked)

If there's a typo, this is where you'd find out — an import error shows right here or in the DAGs list. Otherwise, check the Grid or Graph tab and you should see exactly two tasks, hello and world, in that order.

## Segment 5 (outro)

Next chapter: Building DAGs for real — starting with the bitshift syntax for wiring dependencies between more than two tasks.
