# Script — Snowflake Credits & Warehouse Costs

## Segment 1 (title)

Snowflake splits your bill into two pieces that never touch each other: what you're storing, and what you're computing. This lesson is about the second one — credits, and exactly how a warehouse burns them.

## Segment 2 (steps: two separate bills)

Storage is billed per terabyte per month, at a flat rate, no matter which warehouse touches the data or how often. Compute is billed in credits, consumed by whichever warehouse actually runs a query. A warehouse that never runs anything costs zero in compute, even sitting on top of petabytes of storage.

## Segment 3 (code: credit rate table)

Every warehouse has a size, and each size up the ladder doubles the credit burn rate — Extra Small burns one credit an hour, Small burns two, Medium four, Large eight, and it keeps doubling from there. A Medium running for one hour costs exactly the same credits as a Small running for two. Sizing up doesn't invent new cost — it trades a slower query at a lower rate for a faster one at a higher rate.

## Segment 4 (steps: per-second billing)

Credits are metered per second, not per query and not rounded to the hour — with one exception: a 60-second minimum every time a warehouse resumes from suspension. That's exactly why auto-suspend matters for cost. A warehouse idle for hours between queries burns nothing once it's suspended.

## Segment 5 (screenshot: credit consumption by warehouse)

Snowflake logs every warehouse's usage to account_usage.warehouse_metering_history. Querying it on a real account almost always tells the same story: a handful of warehouses account for nearly all the credits, and several sit provisioned but essentially unused. Cost problems are rarely "everything is expensive" — they're usually "three warehouses are doing all the spending, and nobody's looked."

## Segment 6 (outro)

Next lesson: resource monitors — how to put a hard ceiling on what a warehouse is allowed to spend, so "nobody's looked" stops being a risk.
