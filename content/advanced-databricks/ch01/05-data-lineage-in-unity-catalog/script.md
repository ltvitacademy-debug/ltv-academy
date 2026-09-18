# Script — Data Lineage in Unity Catalog

## Segment 1 (title)

Databricks & Delta Lake Lesson 44 already established that lineage is automatic, at both table and column level. This lesson shows the actual column-level view and treats lineage as something you query, not just glance at.

## Segment 2 (screenshot: table-level lineage graph)

This is the graph Lesson 44 already described — every upstream and downstream table for whichever one you select, built with zero manual setup. What it can't answer on its own is which specific column in a wide upstream table actually fed a specific downstream one.

## Segment 3 (screenshot: column-level lineage)

Lesson 44 mentioned column-level lineage existed. This is what it actually looks like — click a column, and only the columns that genuinely fed it light up, not every column in every upstream table.

## Segment 4 (code: lineage as a compliance query)

System dot access dot column lineage exposes that exact same graph as plain SQL, queryable and exportable. Every downstream table containing a column derived from a sensitive source stops being a UI click-through exercise and becomes a repeatable audit query.

## Segment 5 (outro)

The graph for orientation, the system tables for compliance. Next up: access control at scale — beyond a single grant statement.
