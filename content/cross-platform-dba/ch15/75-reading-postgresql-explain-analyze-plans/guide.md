# Reading PostgreSQL EXPLAIN ANALYZE Plans

`EXPLAIN` shows PostgreSQL's planned execution strategy for a query without running it.
`EXPLAIN ANALYZE` actually runs the query and reports what really happened — real timing,
real row counts — next to what the planner estimated. That gap between estimate and reality
is often the single most useful thing in the whole plan.

## What you'll learn

- The difference between EXPLAIN and EXPLAIN ANALYZE
- The common plan operators and what each one means
- Why actual rows vs. estimated rows is the number to watch first

## Running it

```sql
EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name
FROM orders o
JOIN customers c ON c.customer_id = o.customer_id
WHERE o.order_date > '2026-01-01';
```

Sample output (trimmed):

```
Nested Loop  (cost=0.43..1204.87 rows=850 width=40)
             (actual time=0.05..12.31 rows=920 loops=1)
  ->  Seq Scan on orders o  (cost=0.00..820.00 rows=850 width=12)
                            (actual time=0.02..7.10 rows=920 loops=1)
        Filter: (order_date > '2026-01-01'::date)
  ->  Index Scan using customers_pkey on customers c
        (cost=0.43..0.45 rows=1 width=36)
        (actual time=0.004..0.004 rows=1 loops=920)
Planning Time: 0.312 ms
Execution Time: 13.02 ms
```

## Reading the operators

- **Seq Scan** — a full table scan, reading every row. Fine for a small table or when most
  rows qualify; a red flag on a large table when only a few rows match.
- **Index Scan** — uses an index to jump directly to matching rows, then fetches each row
  from the table.
- **Index Only Scan** — like Index Scan, but every column the query needs is already in the
  index, so it never touches the table at all — the fastest access path when it applies.
- **Nested Loop** — for each row on one side, probes the other side once per row (`loops=920`
  above means the inner Index Scan ran 920 times, once per outer row). Efficient when the
  outer side is small.
- **Hash Join** — builds an in-memory hash table from one side, then probes it with the
  other. Efficient for larger, roughly-equal-sized inputs.
- **Merge Join** — both inputs are already sorted (or sorted for the join), then merged
  together in one pass.

## `cost` vs. `actual`, and why the gap matters

Each line shows `cost=startup..total` (the planner's *estimate*, in arbitrary planner
units, before running anything) and, only with `ANALYZE`, `actual time=startup..total
rows=N loops=N` (what really happened). When `rows` in the actual line is wildly different
from `rows` in the cost estimate, the planner's statistics are stale or the estimate logic
mispredicted the plan — and that mismatch is frequently the actual root cause behind a bad
plan choice, more useful to notice than the raw execution time itself.

## Key terms

| Term | Meaning |
|---|---|
| EXPLAIN ANALYZE | Runs the query and reports the actual execution plan, timing, and row counts |
| Seq Scan | Full table scan, reading every row |
| Index Scan / Index Only Scan | Uses an index to find rows; "Only" means the index alone satisfies the query |
| loops | How many times a plan node executed — high loops on an inner node multiplies its cost |

## Check yourself

An EXPLAIN ANALYZE shows a Seq Scan estimating 50 rows but the actual line reports 48,000
rows. What does that mismatch suggest is wrong, and what would you check next?
