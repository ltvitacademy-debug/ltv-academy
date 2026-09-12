# Script — LOD vs. Table Calculations

## Segment 1 (title)

Both LOD expressions and table calculations can produce numbers like percent of total — which is exactly why people mix them up. They compute in completely different places, and that difference has real consequences.

## Segment 2 (steps: when and where)

An LOD expression computes at query time, against the underlying data source, before the view's aggregated result set even exists. A table calculation computes after that — working only with the aggregated values already sitting in the view.

## Segment 3 (code: what only table calcs can do)

Table calculations understand position — this row relative to the one above it, or the whole visible table. That's what powers running totals, rank, and moving averages. An LOD expression has no concept of row order at all, so it structurally can't do this.

## Segment 4 (code: what only LOD can do)

LOD expressions can reach a dimension that isn't even on the view — because they run against the full data source before aggregation. A table calculation only ever sees what's already in the view's result set. Fixed customer lifetime value works with Customer Name nowhere on the view; no table calculation can do that.

## Segment 5 (outro)

Next lesson puts everything from this chapter to work on one real analysis: customer lifetime sales and first-purchase cohorts, using FIXED LOD expressions together.
