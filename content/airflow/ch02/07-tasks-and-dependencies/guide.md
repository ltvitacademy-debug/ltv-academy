# Lesson 7 — Tasks & Dependencies

**Chapter 2 · Building DAGs · Lesson 7 of 30**

## What you'll learn

- The `>>` and `<<` bitshift operators for setting task order
- How to fan one task out to several, and fan several back into one
- The equivalent method calls (`set_downstream`/`set_upstream`) behind
  the operators
- What happens downstream when an upstream task fails, in a real run

## The bitshift operators

You already saw `hello >> world()` in Lesson 6. The rule is simple:
`a >> b` means "a must finish before b starts" — read the arrow as
pointing in the direction execution flows. It also works backwards:
`b << a` means the exact same thing, written the other way round.

```python
extract >> transform >> load
```

Chaining like this reads naturally left to right: `extract` before
`transform` before `load`, a straight line of three dependencies in
one statement.

## Fanning out and fanning in

Dependencies aren't limited to one-to-one. A single task can gate
several downstream tasks, and several tasks can all have to finish
before one downstream task starts:

```python
extract >> [transform_orders, transform_customers] >> load
```

Here, `extract` must finish before **both** `transform_orders` and
`transform_customers` can start (they run in parallel with each
other), and `load` waits until **both** of those finish. This is
exactly the "some tasks run in parallel, some run in sequence" pattern
you saw in the Graph view back in Lesson 2.

## The method calls underneath

`>>` and `<<` are shorthand for two methods that do the same thing and
that you'll see referenced in Airflow's own documentation and error
messages:

```python
extract.set_downstream(transform)   # same as: extract >> transform
transform.set_upstream(extract)     # same as: transform << extract
```

You'll almost always use the operators — they're shorter and read more
naturally — but recognizing `set_downstream`/`set_upstream` matters
because that's the vocabulary Airflow itself uses internally (an
"upstream" task is one that must finish first; a "downstream" task is
one that's waiting).

## What a failure does downstream, for real

Dependencies aren't just about order — they're about what happens
when something breaks. Look at a real run of a DAG with this exact
fan-out/fan-in shape:

![Airflow's Graph view for a specific run of the DAG "toy_chain_linear_vs_chain_complex": task nodes colored by status — several with a green "success" badge, one with a red "failed" badge (empty_1), and a cluster of downstream tasks each marked with an orange "upstream_failed" badge, alongside the run's detail panel (Task Instances, Asset Events, Audit Log, Code, Details tabs).](/courses/airflow/ch02/07-tasks-and-dependencies/dag-run-graph.png)
*One task (`empty_1`) actually failed — everything downstream of it, that depended on it, never even attempted to run. It's marked `upstream_failed`, not `failed`: Airflow is telling you the real cause is upstream.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

This is the dependency graph doing exactly its job: a downstream task
that depends on a failed task doesn't get skipped silently or run
anyway with bad data — it's explicitly marked `upstream_failed`, so
when you're debugging, you know to go look at the one task that
actually failed rather than chasing a dozen symptoms.

## Key terms

| Term | Meaning |
|---|---|
| `>>` | Sets a downstream dependency: `a >> b` means a must finish before b starts |
| `<<` | Sets an upstream dependency: `b << a` means the same thing, written in reverse |
| Fan-out | One task's completion gates multiple downstream tasks, which then run in parallel |
| Fan-in | Multiple tasks must all finish before one downstream task starts |
| `upstream_failed` | A task's status when it didn't run because something it depended on failed |

## Lab

1. In your own DAG (or an example DAG), find a fan-out: one task
   feeding into a list of two or more tasks.
2. Add a fan-in below it — a task that depends on all of those
   finishing.
3. Deliberately break one of the fanned-out tasks (e.g. a `bash_command`
   that exits non-zero) and trigger a run.
4. Confirm in the Graph view that the broken task shows `failed` and
   everything depending on it shows `upstream_failed`, not `failed`.

## Check yourself

You're ready for Lesson 8 when you can explain the difference between
a task's own `failed` status and an `upstream_failed` status on a task
that never actually ran.
