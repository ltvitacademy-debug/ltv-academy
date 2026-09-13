# Lesson 43 — Query Profile & Query History

**Chapter 10 · Performance Optimization · Lesson 43 of 60**

## What you'll learn

- What Query Profile's visual execution plan actually shows you
- How to read an operator node's time percentage to find what's slow
- Where Query History lives, and how it differs from Query Profile
- The SQL equivalent of both — QUERY_HISTORY and INFORMATION_SCHEMA

## Query Profile: a visual execution plan for one query

Every query you run in Snowsight has a **Query Profile** — a graph of
the operator nodes Snowflake actually executed, wired together by
arrows showing how many rows flowed from one to the next:

![A real Snowsight Query Profile execution plan: a TableScan operator node feeding 216 rows upward into a Result node, each node labeled with its operator type, ID number, and percentage of total query time.](/courses/snowflake/ch10/43-query-profile-and-query-history/query-profile-execution-plan.png)
*Two operator nodes: TableScan pulls rows out of a table, Result returns them. The arrow between them shows exactly how many rows flowed through — 216 here.*
Source: [Snowflake Documentation — Exploring Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

This example is about as simple as a profile gets — a real query
against a wide table with several joins and aggregations produces a
much bigger graph, with a `TableScan` feeding a `Join`, feeding a
`Filter`, feeding an `Aggregate`, and so on. Every node shows the
percentage of total query time it consumed, which is the single most
useful number on the whole screen: it tells you exactly which step is
worth investigating, instead of guessing at a query with a dozen
operators in it.

## Reading a profile: find the expensive node, then ask why

A profile isn't useful until you know what to look for once you open
it. The habit that actually finds problems:

1. **Find the node with the highest time percentage.** That's where
   your tuning effort belongs — everything else is noise by
   comparison.
2. **Check bytes scanned vs. bytes returned on that node.** A
   `TableScan` reading gigabytes to return a handful of rows is a
   pruning problem (Lesson 44) or a missing filter.
3. **Look for an exploding join.** If a `Join` node's output row count
   is dramatically larger than either input, you likely have an
   unintended cross join or a join key that isn't as selective as you
   assumed.
4. **Check for spilling.** A node that spilled to local or remote disk
   (visible in its detail panel) ran out of memory on the warehouse it
   was given — a strong signal the warehouse is undersized for this
   query (Lesson 46).

## Query History: every query, not just one

Query Profile shows you one query in detail. **Query History** — the
Snowsight page, or `QUERY_HISTORY()` in SQL — shows you every query
that ran, so you can find the slow ones in the first place:

```sql
-- Last 24 hours of queries, slowest first
SELECT query_id, query_text, total_elapsed_time, warehouse_name
FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY())
ORDER BY total_elapsed_time DESC
LIMIT 20;
```

Click any `query_id` from Query History and Snowsight opens that
query's Query Profile directly — the two tools are meant to be used
together: History to find a slow query, Profile to understand why.

## Key terms

| Term | Meaning |
|---|---|
| Query Profile | The visual execution plan for one specific query, showing operator nodes and time percentages |
| Operator node | One step of execution — TableScan, Join, Filter, Aggregate, Result, and others |
| Query History | The list of every query that ran, viewable in Snowsight or via SQL |
| QUERY_HISTORY() | The INFORMATION_SCHEMA table function returning query history in SQL |
| Spilling | When a warehouse runs out of memory for an operator and writes intermediate results to disk |

## Lab

1. Run a query with at least one `JOIN` and one aggregation against a
   sample database (`SNOWFLAKE_SAMPLE_DATA.TPCH_SF1` works well).
2. Open its Query Profile from the worksheet's Query Details panel and
   find the single most expensive operator node.
3. Run `SELECT query_id, query_text, total_elapsed_time FROM
   TABLE(INFORMATION_SCHEMA.QUERY_HISTORY()) ORDER BY
   total_elapsed_time DESC LIMIT 10;` and locate your query in the
   results by its duration.
4. Click that `query_id` in the History view and confirm it opens the
   same Query Profile you already inspected.

## Check yourself

You're ready for Lesson 44 when you can explain what an operator
node's time-percentage number tells you, and you know which SQL
function returns query history without opening the Snowsight UI at
all.
