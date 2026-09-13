# Script — Model Materializations

## Segment 1 (title)

Every model you've written so far is just a select statement. Materialization is dbt's answer to how that statement actually becomes something in the warehouse — a table, a view, or something else entirely.

## Segment 2 (steps: the four types)

View re-runs the query every time, with no data stored. Table stores real data, fully rebuilt on every run. Incremental builds once, then only processes new or changed rows. Ephemeral isn't a database object at all — it gets inlined as a CTE wherever it's referenced.

## Segment 3 (code: setting it)

You set it project-wide in dbt_project.yml, or per-model with a config call right inside the SQL file, which overrides the project default.

## Segment 4 (steps: why staging vs marts differ)

Staging models default to view because renaming columns is nearly free to re-run. Marts models default to table because real joins and aggregation are expensive, and a BI tool shouldn't pay that cost on every single dashboard refresh.

## Segment 5 (outro)

Next lesson: Organizing Models Across a Project — how staging and marts fit into the fuller layering that Chapter 3 builds out in depth.
