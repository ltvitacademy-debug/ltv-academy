# Script — Capstone: Staging & Intermediate Models

## Segment 1 (title)

Milestone 1 of the capstone: your raw sources actually declared to dbt, a staging model per source, and at least one intermediate model combining them. Nothing here is new technique — it's Chapter 2 and Chapter 3's patterns, applied to sources you chose.

## Segment 2 (steps: declare your sources)

Before any model can ref anything, dbt needs to know the raw tables exist. One sources.yml, one entry per raw table, with a freshness check on at least one — that's the piece students skip and shouldn't.

## Segment 3 (steps: a staging model per source)

Each staging model is a thin, one-to-one wrapper over one raw table: typed columns, renamed, nothing joined in yet. The JSON source gets the same treatment, except the flattening now happens inside the staging model — dbt owns that step, not a one-off script.

## Segment 4 (steps: build an intermediate model)

The first model that combines two or more staging models before anything reaches marts — here, order lines get their product's category and price attached. It's not a fact table yet, it has no surrogate keys, and nothing outside the project queries it directly.

## Segment 5 (outro)

Next lesson: the second milestone — the marts layer, real tests, and generated documentation.
