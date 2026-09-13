# Script — Lab: Turning a Raw JSON Feed Into Reporting Tables

## Segment 1 (title)

This lab chains everything from this chapter into one real pipeline: VARIANT, colon notation, views, and FLATTEN, taking a raw JSON feed all the way to a reporting table.

## Segment 2 (screenshot: reporting query result)

This is that pipeline's last step, worked all the way through on a real SEC filings feed — joining two views built over raw JSON, reaching into a nested metadata field, landing on a clean table of quarterly net sales by product. Notice what's not special about this final query: no VARIANT, no colon notation, no FLATTEN — all of that was resolved one layer earlier, in the views.

## Segment 3 (steps: the four-layer pipeline)

Four layers, always in this order: land it raw into a VARIANT column, untouched. Query into it with colon notation for scalar fields and LATERAL FLATTEN for array fields. Wrap that in a view so nobody downstream thinks about VARIANT again. Then join and report using the same SQL you already know.

## Segment 4 (steps: why layers, not one giant query)

Layering means you can verify each stage independently instead of debugging one giant query. The expensive part — parsing JSON structure — happens once, in the view, not on every report query. And it's the exact same staging, warehouse, reporting discipline from Chapter 6, just applied to JSON instead of CSV.

## Segment 5 (outro)

Next chapter: Streams and Tasks — Snowflake's native way to track what changed in a table, and schedule work to run on it automatically.
