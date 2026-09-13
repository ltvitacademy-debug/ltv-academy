# Script — Surrogate Keys in Snowflake

## Segment 1 (title, code: AUTOINCREMENT / IDENTITY)

Snowflake supports the same idea as T-SQL's IDENTITY column, with two interchangeable spellings: AUTOINCREMENT and IDENTITY. Insert without naming the key column, and Snowflake assigns the next value automatically.

## Segment 2 (steps: the gap/order caveat)

The catch: Snowflake loads data in parallel across many micro-partitions, so values from concurrent inserts aren't guaranteed to be gap-free or assigned in insertion order. Fine for uniqueness — don't build logic that depends on the ordering.

## Segment 3 (code: HASH-based surrogate key)

A different, genuinely Snowflake-idiomatic pattern shows up constantly in real ELT code: generating the surrogate key deterministically from the natural key with HASH, right inside the CTAS that builds the dimension.

## Segment 4 (steps: why HASH-based fits ELT)

HASH-based keys need no round trip to read an assigned value back, stay deterministic across reruns, and survive a CREATE OR REPLACE TABLE AS SELECT rebuild cleanly — which AUTOINCREMENT state doesn't do automatically.

## Segment 5 (outro)

Next lesson: SCD Type 1 in Snowflake — overwriting a dimension row in place with MERGE.
