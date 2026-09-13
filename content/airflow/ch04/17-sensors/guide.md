# Lesson 17 — Sensors

**Chapter 4 · Sensors, Branching & Trigger Rules · Lesson 17 of 30**

## What you'll learn

- What a Sensor is, and how it differs from a regular task
- `poke_interval`, `timeout`, and the two execution modes: `poke` vs `reschedule`
- A real `FileSensor` example
- A real `ExternalTaskSensor` example — waiting on another DAG

## What a Sensor actually is

Every Operator you've seen so far runs once and finishes — a
`SnowflakeOperator` runs its SQL and completes. A **Sensor** is a
special kind of task that instead waits: it checks a condition
repeatedly, on an interval, and only succeeds once that condition
becomes true (or fails once a timeout is hit).

Common conditions: a file landing in a directory, another DAG's run
finishing, a row appearing in a table, an HTTP endpoint returning a
particular status.

## How a Sensor waits: poke_interval, timeout, mode

Every Sensor shares the same base parameters:

```python
from airflow.sensors.filesystem import FileSensor

wait_for_extract = FileSensor(
    task_id="wait_for_extract",
    filepath="/data/incoming/orders_extract.csv",
    poke_interval=60,     # check every 60 seconds
    timeout=60 * 60 * 6,  # give up after 6 hours
    mode="reschedule",
)
```

- **`poke_interval`** — how often to check the condition
- **`timeout`** — how long to keep checking before failing the task
- **`mode`** — how the Sensor occupies resources while waiting:
  - `"poke"` (the default): the task holds a worker slot the entire
    time it's waiting, checking on the interval. Fine for short waits.
  - `"reschedule"`: the task frees its worker slot between checks and
    reschedules itself — much better for long waits, since a
    `poke`-mode Sensor waiting six hours would otherwise tie up a
    worker for six hours doing nothing most of that time.

## A real example: waiting on another DAG

`ExternalTaskSensor` waits for a specific task (or an entire DAG) in
a *different* DAG to reach a given state — the standard way to chain
two independently-scheduled DAGs without merging them into one:

```python
from airflow.sensors.external_task import ExternalTaskSensor

wait_for_upstream_dag = ExternalTaskSensor(
    task_id="wait_for_upstream_dag",
    external_dag_id="daily_orders_refresh",
    external_task_id="refresh_orders_summary",
    allowed_states=["success"],
    mode="reschedule",
    poke_interval=120,
    timeout=60 * 60 * 4,
)
```

This task waits until `refresh_orders_summary` in the
`daily_orders_refresh` DAG (Lesson 16) succeeds for the matching run,
before letting this DAG continue — so a downstream reporting DAG
never runs against half-refreshed data.

## Sensors vs. regular tasks

A Sensor is still just a task — it shows up in the Grid and Graph
views like any other, and it participates in dependencies, retries,
and trigger rules exactly the same way. The only real difference is
that its `execute()` method loops and checks instead of doing the
work directly. Everything you already know about wiring tasks
together applies unchanged; a Sensor is just a task that has to wait
for the world to be ready before there's anything to do.

## Key terms

| Term | Meaning |
|---|---|
| Sensor | A task that waits for a condition, checking repeatedly, instead of running once and finishing |
| poke_interval | How often the Sensor re-checks its condition |
| timeout | How long the Sensor keeps checking before failing |
| mode="reschedule" | Frees the worker slot between checks — the right choice for long waits |

## Lab

1. Write a `FileSensor` that waits for a file you create by hand in
   a watched directory — run the DAG, then create the file partway
   through and confirm the Sensor succeeds once it appears.
2. Change `mode` from `"poke"` to `"reschedule"` and compare what you
   see in the Grid view while the Sensor is waiting.
3. If you have two DAGs from earlier lessons, add an
   `ExternalTaskSensor` to one that waits on a task in the other.

## Check yourself

You're ready for Lesson 18 when you can explain, in one sentence, why
`mode="reschedule"` matters for a Sensor that might wait for hours.
