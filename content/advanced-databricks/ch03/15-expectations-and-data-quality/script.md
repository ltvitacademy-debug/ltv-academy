# Script — Expectations & Data Quality in Lakeflow

## Segment 1 (title)

Lesson 52 already covered Expectations in Python, in full — three enforcement levels, one line each. This lesson assumes that and adds the SQL side.

## Segment 2 (code: recap + SQL constraint syntax)

A CONSTRAINT clause, declared right inside a CREATE STREAMING TABLE statement, is the SQL equivalent of Lesson 52's @dp.expect decorators — same three levels: warn, drop, or fail.

## Segment 3 (code: three enforcement levels)

EXPECT alone defaults to warn, keeping the row and just counting the violation. ON VIOLATION DROP ROW filters it out. ON VIOLATION FAIL UPDATE stops the entire pipeline run. Same outcomes as Lesson 52's Python decorators.

## Segment 4 (code: why it's a different mechanism)

A manual quality check is a separate query you have to keep in sync by hand. A CONSTRAINT rule lives inside the table's own definition — the check and the transformation can never drift apart, because they're the same statement.

## Segment 5 (outro)

Same engine, same three outcomes, SQL syntax instead of a decorator. Next up: deploying a pipeline definition as code with Databricks Asset Bundles.
