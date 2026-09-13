# Script — Task Dependencies & Automating Transformations

## Segment 1 (title)

One task doing one MERGE was Lesson 37's whole pipeline. Real transformation chains are rarely that simple — staging has to load before the warehouse layer transforms it, and that has to finish before reporting aggregates it. Each step depends on the one before it.

## Segment 2 (code: AFTER dependency)

A task declares its dependency with AFTER, naming the task that must finish first. Only the root task has a SCHEDULE — everything after it runs when its predecessor finishes, not on a clock. One root task plus a chain of dependents is called a Task Graph.

## Segment 3 (screenshot: task graph DAG)

This is a real Task Graph in Snowsight's Graph tab — a root task with several child and sibling tasks, and a grandchild task further down the chain. Every box is one task, the lines are AFTER dependencies — the same shape as an Airflow DAG, just built out of Snowflake TASK objects.

## Segment 4 (steps: resuming the whole graph)

Every task in a graph is created suspended, just like a single task. Resuming only the root isn't enough — every task in the chain needs to be resumed, from the bottom of the chain up, for the graph to actually run end to end.

## Segment 5 (outro)

Next chapter: Security and RBAC — users, roles, and the Snowflake role hierarchy that decides who's allowed to do any of this.
