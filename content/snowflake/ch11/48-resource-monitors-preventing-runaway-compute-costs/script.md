# Script — Resource Monitors: Preventing Runaway Compute Costs

## Segment 1 (title)

A resource monitor is Snowflake's answer to "a few warehouses do all the spending and nobody's looked" — a credit budget that watches consumption and acts automatically, with no human checking a dashboard required.

## Segment 2 (code: CREATE RESOURCE MONITOR)

Creating one is just DDL. You set a credit quota, how often it resets, and a list of triggers — do this when we hit 75 percent, do that at 100, do something more drastic at 110. Nothing here is exotic SQL; it's a budget object with rules attached.

## Segment 3 (screenshot: resource monitor created)

Run that statement for real and Snowflake confirms it immediately — the monitor exists, and from that point forward, Snowflake enforces the thresholds itself. You don't have to remember to check anything again.

## Segment 4 (steps: the three trigger actions)

There are exactly three actions a trigger can take. Notify just sends an alert — nothing stops. Suspend blocks new queries but lets anything already running finish gracefully. Suspend immediate is the hard stop — it blocks new queries and cancels everything in flight right now. The standard pattern layers all three: warn early, soft-stop at the limit, hard-stop past it.

## Segment 5 (screenshot: statement timeout parameters)

A resource monitor caps total spend over a period, but it won't catch one runaway query — a missing WHERE clause burning credits for hours before a monthly quota ever notices. That's what a statement timeout is for: a per-query hard cap, independent of the resource monitor's budget.

## Segment 6 (outro)

Next lesson leaves cost management behind for connectivity: getting Power BI itself talking to Snowflake, starting with the actual Get Data dialog.
