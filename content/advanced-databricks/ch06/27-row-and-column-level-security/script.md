# Script — Row- & Column-Level Security in Unity Catalog

## Segment 1 (title)

Databricks & Delta Lake Lesson 43 already covered column masks and row filters, in full, with one worked example each. This course assumes you have that picture. This lesson is everything that happens once one table becomes forty.

## Segment 2 (code: is_account_group_member)

Lesson 43's example used is_member, which checks a workspace-local group. Unity Catalog's identity model is account-level — the same catalog can attach to multiple workspaces, and a workspace-local check doesn't reliably mean the same thing in each one. is_account_group_member checks an account-level group instead, consistently, no matter which workspace the query runs from.

## Segment 3 (code: scaling past one table)

Writing one function and running one ALTER TABLE is completely reasonable for one table. It doesn't scale to dozens of PII-bearing columns across many tables, updated by hand — that's exactly how masks quietly drift, with one table updated when policy changes and another forgotten.

## Segment 4 (code: ABAC by tag)

The systematic fix ties protection to a tag the column carries, not to a specific column's name. One masking policy, tied to a tag, applies to every column carrying it, in every table, present or future — including one added next quarter that nobody remembers to update by hand.

## Segment 5 (outro)

Lesson 43 protects a column. A tag-based policy protects every column that is what the tag says it is. Next up: Delta Sharing, and what changes when the recipient isn't even in your metastore.
