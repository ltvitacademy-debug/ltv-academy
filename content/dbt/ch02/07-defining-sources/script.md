# Script — Defining Sources

## Segment 1 (title)

Every dbt project starts from data dbt didn't build — raw tables already loaded into the warehouse by some other process. dbt calls that a source, and it's declared in YAML, not written as a model.

## Segment 2 (screenshot: real sources DAG diagram)

This is a real dbt diagram: two green source nodes, the raw customers and orders tables, both feeding into a blue model node. Source calls are dependency edges in the DAG too, exactly like ref calls, just starting from raw data instead of another model.

## Segment 3 (steps: source() vs ref())

source and ref do the same kind of thing — both replace a hardcoded table name with a function dbt resolves — but source points at raw data with no upstream dependency of its own, while ref points at another model that does.

## Segment 4 (steps: why declare sources)

Declaring a source instead of just querying the raw table directly buys you three things: it shows up in the Lineage graph as a real starting node, you can write tests against it, and dbt can run freshness checks to catch a broken upstream load.

## Segment 5 (outro)

Next lesson: Staging Models — the very first layer of dbt models, built directly on top of these sources.
