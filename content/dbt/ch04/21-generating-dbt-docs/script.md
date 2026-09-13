# Script — Generating and Reading dbt Docs

## Segment 1 (title)

Every description and test from the last three lessons compiles into a real documentation site with one command: dbt docs generate. It introspects the entire project — models, sources, tests, and live column metadata from the warehouse.

## Segment 2 (screenshot: model details / catalog)

The result is a searchable catalog of every resource — models, sources, tests, exposures — each with column-level descriptions surfaced right where schema.yml put them. Every description you wrote ends up here, next to type information pulled straight from the warehouse.

## Segment 3 (screenshot: lineage graph)

And a real interactive lineage graph — the same DAG concept from Lesson 1, but for the entire project now, clickable and generated straight from every ref() call in the codebase. Click any model to open its details, description, and tests.

## Segment 4 (steps: automatic generation and the gotcha)

Set this up to run automatically: turn on Generate docs on run in a dbt Cloud job's execution settings, then point the project's Artifacts setting at that job. But the docs site always reflects the last fully successful run — not necessarily today's code, if today's run hasn't gone green yet.

## Segment 5 (outro)

Next lesson: Exposures — declaring, right inside this same docs site, that a real BI dashboard depends on one of these models.
