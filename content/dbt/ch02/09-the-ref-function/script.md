# Script — The ref() Function

## Segment 1 (title)

ref isn't magic — it's a Jinja function that, when dbt compiles your project, gets replaced with the model's actual, fully-qualified table name in whatever environment you're building into.

## Segment 2 (screenshot: real model-to-model DAG diagram)

This is a real diagram from dbt's own docs, titled the DAG we want for our project: two staging models, stg_customers and stg_orders, both feeding into a customers model. Two ref calls inside that file are the entire reason this graph exists — nobody drew it, dbt derived it from the code.

## Segment 3 (steps: why ref beats hardcoding)

Write the real table name instead of ref, and it works right up until someone else's dev schema is named differently, or the model gets promoted to production where that schema doesn't exist at all. ref makes the same file correct in every environment.

## Segment 4 (steps: the silent failure of hardcoding)

Hardcoding also breaks the dependency graph silently — dbt has no way to know your model depends on another one if you never actually call ref on it, so it can't guarantee the right build order.

## Segment 5 (outro)

Next lesson: Building Your First dbt Model — putting ref, source, and a staging model together into one real model, start to finish.
