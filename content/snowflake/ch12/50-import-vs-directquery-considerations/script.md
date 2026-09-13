# Script — Import vs. DirectQuery Considerations

## Segment 1 (title)

Import and DirectQuery were both on the table back in the connection dialog. The difference isn't cosmetic — it's when and how often Power BI actually talks to Snowflake.

## Segment 2 (steps: two query patterns)

In Import mode, Power BI pulls a copy of the data into its own model on a schedule, and every filter or slicer after that queries Power BI's own engine, not Snowflake. In DirectQuery mode, Power BI stores nothing — every visual, filter, and slicer click sends a live query straight to Snowflake.

## Segment 3 (steps: why Snowflake specifically)

Against an always-on database, DirectQuery's downside is mostly latency. Against Snowflake, it's credits — because every query runs on a warehouse that bills per second, and a suspended warehouse resuming to serve one query bills a sixty-second minimum, every single time.

## Segment 4 (steps: the cost pattern)

A dashboard in DirectQuery mode with people clicking around all day keeps a warehouse resuming in short, frequent bursts — exactly the pattern that racks up those sixty-second minimums over and over, instead of one clean batch of usage.

## Segment 5 (steps: the practical default)

If the data can tolerate being a little stale, Import is usually right — it turns Snowflake cost into a predictable, schedulable line item. Reach for DirectQuery only when near-real-time freshness is a genuine requirement, and pair it with its own dedicated, monitored reporting warehouse.

## Segment 6 (outro)

Next lesson goes one layer deeper: building the actual Snowflake views this reporting warehouse should be querying, instead of pointing Power BI at raw fact tables.
