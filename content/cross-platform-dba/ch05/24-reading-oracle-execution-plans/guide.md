# Reading Oracle Execution Plans

Oracle Performance Tuning Methodology established the loop: measure, identify, change,
verify. Reading an execution plan is how you do the "identify" step for a single slow
statement — it's Oracle's answer to the SQL Server execution plan you already know how to
read, but the tool that produces it and the operators it shows are Oracle's own.

## What you'll learn

- How to generate a plan with `EXPLAIN PLAN` and `DBMS_XPLAN.DISPLAY`
- Why the *actual* executed plan from `DBMS_XPLAN.DISPLAY_CURSOR` is more trustworthy than
  a predicted one
- How to read the plan tree: which operation actually ran first
- The handful of operators — `TABLE ACCESS FULL`, `INDEX RANGE SCAN`, `NESTED LOOPS` — that
  cover most of what you'll see

## Generating a plan: EXPLAIN PLAN and DBMS_XPLAN

The classic two-step approach populates the `PLAN_TABLE` and formats it:

```sql
EXPLAIN PLAN FOR
SELECT last_name, salary FROM employees WHERE department_id = 50;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

`EXPLAIN PLAN` shows what the optimizer *predicts* it will do — it doesn't actually run the
statement. That prediction can be wrong, especially with stale statistics or bind-variable
peeking gone bad. The more trustworthy view is the plan Oracle *actually used* for a
statement that already executed, pulled from the cursor cache:

```sql
SELECT * FROM TABLE(
  DBMS_XPLAN.DISPLAY_CURSOR(sql_id => '7fkfg1h6cvfth', format => 'ALLSTATS LAST')
);
```

With `gather_plan_statistics` enabled (or the `/*+ gather_plan_statistics */` hint), the
`ALLSTATS LAST` format adds actual rows returned alongside the optimizer's estimate —
exactly where estimate-versus-actual mismatches, the single most common root cause of a bad
plan, jump out at you.

## Reading the tree: what ran first

`DBMS_XPLAN` output is indented to show a tree, and the reading rule is the opposite of
scanning top-to-bottom: **the most-indented line inside a group generally executes first**,
and a parent operation consumes the output of its children. For a nested loop join, that
means the outer (driving) row source is built first, then the inner row source is probed
once per outer row. The `Id` column lets you trace parent/child relationships explicitly,
and the `Predicate Information` section beneath the plan shows exactly which predicate was
used for access (narrowing what's read) versus filter (discarding rows after they're read)
at each numbered step — that distinction often explains why a plan that "should" use an
index doesn't.

## Operators you'll see constantly

- **TABLE ACCESS FULL** — reads every block in the table (or every block in the current
  scan range). Not automatically bad — for a small table or a query that needs most of its
  rows, a full scan can beat an index. It's a problem when it appears against a large table
  for a highly selective predicate.
- **INDEX RANGE SCAN** — reads a contiguous range of index entries, typically followed by
  `TABLE ACCESS BY INDEX ROWID` to fetch the actual row. This is the equivalent of a SQL
  Server nonclustered index seek.
- **INDEX UNIQUE SCAN** — at most one row can match (a unique or primary key lookup).
- **NESTED LOOPS** — for every row from the outer input, probe the inner input. Efficient
  when the outer input is small and the inner input has a good index.
- **HASH JOIN** — builds an in-memory hash table from the smaller input, then probes it with
  the larger input. Often wins over nested loops when both inputs are large and there's no
  useful index to drive a loop.
- **SORT** — appears for `ORDER BY`, aggregation, or as a step a hash/merge join needs
  internally.

## Key terms

| Term | Meaning |
|---|---|
| EXPLAIN PLAN | Statement that predicts a plan without executing the SQL |
| DBMS_XPLAN.DISPLAY | Formats the plan currently sitting in `PLAN_TABLE` |
| DBMS_XPLAN.DISPLAY_CURSOR | Formats the actual plan Oracle used for an already-executed statement |
| TABLE ACCESS FULL | Operator that reads every block of a table or scan range |
| NESTED LOOPS | Join operator that probes the inner input once per row of the outer input |
| Predicate Information | Section showing which predicates drove access vs. filtering at each plan step |

## Check yourself

A plan shows `TABLE ACCESS FULL` against a 40-million-row table for a query with a highly
selective `WHERE` clause. Name two different, specific reasons the optimizer might have
chosen a full scan instead of an index, and how you'd confirm which one it actually was.
