# Script — Star Schemas, Fact & Dimension Tables — Implementing Them in Snowflake

## Segment 1 (title)

One fact table in the middle, one row per business event, holding foreign keys and numeric measures. Dimension tables around it, one row per business entity, holding the descriptive attributes you filter and group by. That shape doesn't change in Snowflake — what changes is the exact SQL you write to build it.

## Segment 2 (code: dimension table DDL)

NUMBER is Snowflake's general-purpose numeric type, covering what INT, BIGINT, and DECIMAL each handled separately in T-SQL. And PRIMARY KEY and NOT NULL are declarable but not enforced by default — they're informational metadata, not constraints the engine blocks bad inserts on.

## Segment 3 (code: fact table DDL)

A fact table's foreign keys point at the surrogate keys of the dimension tables around it — the same star schema shape you already know, just written as Snowflake DDL with NUMBER types throughout.

## Segment 4 (steps: clustering key first mention)

CLUSTER BY tells Snowflake to keep the table's micro-partitions organized by a column so filtered queries can prune most of the table without scanning it. It isn't the same mechanism as a SQL Server clustered index — Chapter 10 covers choosing one properly.

## Segment 5 (outro)

Next lesson: surrogate keys in Snowflake — AUTOINCREMENT syntax, and the HASH-based pattern common in Snowflake ELT.
