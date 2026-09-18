# Lesson 5 — Data Lineage in Unity Catalog

**Chapter 1 · Beyond the Basics: Unity Catalog Deep Dive · Lesson 5 of 34**

## What you'll learn

- A fast recap: Lesson 44 already showed table- and column-level lineage exist
- The column-level lineage UI itself — what it looks like, not just the concept
- Lineage as a queryable compliance/audit tool via system tables, not just a diagram
- Answering "where does this PII column end up?" as a real, repeatable query

## The recap

Databricks & Delta Lake Lesson 44 already established that lineage
is automatic — captured from real Spark queries against Unity
Catalog tables, no manual diagram maintained — and that it exists at
both table level and column level, tracing `gold.daily_revenue`'s
`total_revenue` back through `silver.trips.fare_amount` to
`bronze.trips.fare_amount`. That's the concept. This lesson shows the
actual column-level UI and treats lineage as infrastructure you
query, not a picture you glance at once.

## Table-level lineage, for orientation

![Unity Catalog's lineage graph, showing upstream and downstream tables connected in a directed graph, with the selected table highlighted in the middle.](/courses/advanced-databricks/ch01/05-data-lineage-in-unity-catalog/uc-lineage-overview.png)

This is the graph Lesson 44 already described conceptually — every
upstream and downstream table for whichever one you select, built
with zero manual setup. Useful for orientation. What it can't answer
on its own: *which specific column* in a wide upstream table actually
fed a specific downstream one.

## Column-level lineage — the narrower, more useful question

![Column-level lineage view in Unity Catalog, showing a specific column highlighted with lines tracing to the exact upstream columns that fed it, across multiple tables.](/courses/advanced-databricks/ch01/05-data-lineage-in-unity-catalog/uc-column-lineage.png)

Lesson 44 mentioned column-level lineage existed and walked through
one hop by description. This is what it actually looks like in the
workspace: click a column, and only the columns that genuinely fed
it light up — not every column in every upstream table, just the
exact lineage path. For a wide table with sixty columns, this is the
difference between "somewhere in `silver.trips` " and "specifically
`silver.trips.fare_amount`, through this exact transformation."

## Lineage as a compliance tool, not a glance

```sql
-- Queryable via Unity Catalog's system tables — not just the UI
SELECT source_table_full_name, source_column_name,
       target_table_full_name, target_column_name
FROM system.access.column_lineage
WHERE source_column_name = 'ssn'
  AND source_table_full_name = 'nyc_taxi.silver.customers';
```

This is the real payoff Lesson 44's UI screenshot doesn't show:
`system.access.column_lineage` (and `system.access.table_lineage`)
expose the exact same graph as plain SQL, queryable and exportable.
"Every downstream table that contains a column derived from `ssn`"
stops being a UI click-through exercise and becomes a repeatable
audit query — a real answer to a real GDPR/PII data-subject request,
or a pre-migration blast-radius check, run on a schedule instead of
by hand.

## Key terms

| Term | Meaning |
|---|---|
| Column-level lineage UI | Highlights only the exact upstream columns feeding one selected column |
| `system.access.column_lineage` | Lineage exposed as a queryable system table, not just a UI diagram |
| Lineage as audit tool | Turns "what depends on this PII column" into a repeatable, scheduled query |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does querying `system.access.column_lineage` matter for compliance in
a way that clicking through the UI diagram, once, does not?
