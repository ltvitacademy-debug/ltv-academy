# Script — Segments

## Segment 1 (title)

So far this chapter has prepared data: ingest, map, unify, measure. Segments are where it pays off. A segment is a saved group of unified profiles that meet conditions you define.

## Segment 2 (screenshot: builder)

This is the segment builder. On the left, the Attributes panel, split into direct attributes on the object the segment is built on, and related attributes from connected objects. In the middle, the canvas where you drop conditions. And at the top, the population count: how many profiles match right now.

## Segment 3 (screenshot: containers)

Each container states a condition on a related object. Here: a sales order product whose category is scarf, count at least one, AND a second condition on the product description, yellow. Containers combine with AND or OR. Where you place a condition matters, because separate containers can be satisfied by different records.

## Segment 4 (code)

You already know this shape: a WHERE clause with EXISTS subqueries against related tables. A segment returns members, not aggregated numbers. That's the difference from a calculated insight.

## Segment 5 (steps)

Pick the object the segment is on, add conditions, check the population, then publish on a schedule. Segments give analysts governed, named populations, so high-value is defined once rather than rebuilt in every report.

## Segment 6 (outro)

Next up: how Data Cloud and CRM Analytics work together.
