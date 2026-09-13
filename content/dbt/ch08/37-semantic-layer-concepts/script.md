# Script — Semantic Layer Concepts

## Segment 1 (title)

Three people build "revenue" on top of the same clean, tested marts model. One includes cancelled orders, one excludes returns, one subtracts discounts. All three call it Revenue. None of them agree.

## Segment 2 (steps: the problem)

The logic lives scattered across BI tools instead of in one place. There's no single spot to check which definition is actually right — because there isn't one, there are three.

## Segment 3 (steps: MetricFlow)

The fix is defining the metric once, in dbt, as code. MetricFlow is the engine that compiles that one definition into the correct SQL for whatever's actually being asked — revenue by month, or by region, this quarter — from the same underlying definition.

## Segment 4 (screenshot: Semantic Layer connection panel)

This isn't a conceptual diagram — it's a real dbt Cloud connection. An environment ID, a host, a JDBC URL, a GraphQL URL. Any BI tool that calls this endpoint gets the identical metric every other tool gets.

## Segment 5 (outro)

Next lesson: Defining Metrics in dbt — the real MetricFlow YAML syntax for a semantic model and a metric.
