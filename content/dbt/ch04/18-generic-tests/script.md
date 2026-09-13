# Script — Generic Tests: not_null, unique, relationships

## Segment 1 (title)

dbt ships with four generic tests: not_null, unique, accepted_values, and relationships. Generic because each one is a reusable, parameterized assertion you attach to any column, not a one-off query you write yourself.

## Segment 2 (code: real YAML syntax)

Tests live in schema.yml under a data_tests key per column. unique and not_null need no extra input. accepted_values takes a list of valid values, relationships takes the target model and field it should resolve against — both inside an arguments block.

## Segment 3 (steps: what's happening under the hood)

Every generic test compiles to a select statement that returns the rows violating the assertion. Zero rows back means the test passes. Any rows back are the actual failures — not_null on order_id becomes select star where order_id is null.

## Segment 4 (screenshot: Test Status lens)

For one run, dbt test streams pass or fail lines. Across a whole real project, dbt Catalog's Test Status lens shows every model node with a colored badge for its latest status — pass, error, fail, warn, skipped — visible at a glance, right where it happened in the pipeline.

## Segment 5 (outro)

Next lesson: Singular Tests — for the one-off assertions none of these four generic tests were built to express.
