# Script — Capstone: Marts, Tests & Documentation

## Segment 1 (title)

Milestone 2: your intermediate model becomes a real marts layer — a fact table and a dimension with real history — backed by tests, and documented well enough that dbt docs generate produces something a stranger could actually read.

## Segment 2 (steps: the dimension, with real history)

dim_customers isn't just a renamed staging model — it's built on top of a snapshot, so a customer's changing segment or region keeps its history instead of being silently overwritten. dbt_valid_from and dbt_valid_to are the SCD Type 2 mechanism, generated automatically.

## Segment 3 (steps: the fact table, incrementally)

fct_orders is the final thing anything downstream is allowed to query — joined to the dimension's surrogate key, materialized as incremental so a full rebuild isn't required on every run.

## Segment 4 (steps: test it, document it)

Generic tests on the surrogate key and the join, plus one singular test encoding a rule generic tests can't express. Every mart model and column gets a real description — that's what makes the generated docs site show something real instead of blank tooltips.

## Segment 5 (outro)

Next lesson: the third milestone — connecting this marts layer to Power BI, the right way.
