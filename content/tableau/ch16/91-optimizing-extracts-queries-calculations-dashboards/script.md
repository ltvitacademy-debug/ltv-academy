# Script — Optimizing Extracts, Queries, Calculations & Dashboards

## Segment 1 (title)

Lesson 90 taught you how to find the bottleneck. This lesson is the response — what to actually do once you know where the time is going, organized by the same four categories: extracts, queries, calculations, and dashboards.

## Segment 2 (steps: extracts and queries)

For extracts: hide unused fields, filter to only the rows you need, aggregate when row-level detail isn't required, and use incremental refreshes instead of full ones. For queries and filters: turn a filter that applies across most sheets into a context filter so it's computed once — but use that deliberately, since context filters have their own recompute cost. Prefer actions over quick filters so only the sheets that need to react actually do.

## Segment 3 (steps: calculations and dashboards)

Not every calculation costs the same — simple row-level and aggregate calculations are cheap, but FIXED LOD expressions and table calculations can get expensive at high row counts. Push logic upstream to the data source when you can. On dashboards, limit the number of worksheets and filters, share a common data source across sheets where possible, and avoid automatic sizing that forces constant re-rendering.

## Segment 4 (outro)

Next up: the first of three portfolio projects — a real, hands-on executive sales dashboard built on the Sample Superstore dataset you've used throughout this course.
