# Lesson 24 — Deduplication Strategies

**Chapter 5 · Data Transformation / ELT · Lesson 24 of 60**

## What you'll learn

- The CTE + `ROW_NUMBER()` deduplication pattern you already know from T-SQL
- `QUALIFY` — a Snowflake clause with no T-SQL equivalent that filters window functions directly
- When to reach for `DISTINCT` instead, for full-row duplicates
- Why "which row wins" is a business decision, not a technical one

## The pattern you already know: ROW_NUMBER in a CTE

Raw, loaded data frequently contains duplicate records for the same
business key — the same order landed twice because a source system
retried, or a customer record was updated and both the old and new
version got loaded. The classic fix, which you've already written in
T-SQL, wraps `ROW_NUMBER()` in a CTE and filters in an outer query:

```sql
WITH ranked AS (
    SELECT
        order_id,
        customer_id,
        order_total,
        loaded_at,
        ROW_NUMBER() OVER (
            PARTITION BY order_id
            ORDER BY loaded_at DESC
        ) AS rn
    FROM raw.orders
)
SELECT order_id, customer_id, order_total, loaded_at
FROM ranked
WHERE rn = 1;
```

This works identically in Snowflake — the syntax is the same window
function, the same idea. It's just more typing than it needs to be.

## QUALIFY: filtering a window function without the wrapper

Snowflake adds `QUALIFY`, a clause that filters on a window function's
result **directly**, the same way `WHERE` filters rows and `HAVING`
filters aggregates — no CTE or subquery wrapper required:

```sql
SELECT
    order_id,
    customer_id,
    order_total,
    loaded_at
FROM raw.orders
QUALIFY ROW_NUMBER() OVER (
    PARTITION BY order_id
    ORDER BY loaded_at DESC
) = 1;
```

Same result, one statement instead of a CTE wrapped around a
subquery. `QUALIFY` doesn't exist in T-SQL — this is a genuinely
Snowflake-idiomatic pattern worth reaching for by default once you're
comfortable with it, since it's the pattern you'll see in most real
Snowflake ELT code.

## DISTINCT: for exact, full-row duplicates

`QUALIFY` and `ROW_NUMBER()` solve "pick one row per business key when
the rows *differ*" — the loaded_at timestamp, or some other column, is
different between duplicates. When rows are **exact, full-row**
duplicates with nothing to break the tie on, plain `DISTINCT` (or
`SELECT DISTINCT *`) is simpler and does the job:

```sql
CREATE OR REPLACE TABLE staging.orders_deduped AS
SELECT DISTINCT * FROM raw.orders;
```

## "Which row wins" is a business decision

`ORDER BY loaded_at DESC` in the examples above means "the most
recently loaded version wins." That's a choice, not a technical
default — depending on the source system, you might instead want the
*first*-seen version, the version with the highest `order_total`, or
some other tie-breaker entirely. Get this decision from whoever owns
the business rule, and make sure the `ORDER BY` inside the window
function actually encodes it, not just whatever column happened to be
handy.

## Key terms

| Term | Meaning |
|---|---|
| `ROW_NUMBER()` | Assigns a sequential number within each partition — already familiar from T-SQL |
| `QUALIFY` | Snowflake clause that filters directly on a window function's result — no T-SQL equivalent |
| `DISTINCT` | Removes exact, full-row duplicates with no tie-breaking logic needed |
| Tie-breaker | The `ORDER BY` inside the window function that decides which duplicate "wins" — a business decision |

## Lab

1. Load (or reuse) a raw table with at least one duplicated business
   key, differing by a timestamp column.
2. Write the CTE + `ROW_NUMBER()` version first, then rewrite it using
   `QUALIFY` and confirm both return identical results.
3. Identify one table where duplicates are exact full-row copies, and
   dedupe it with `DISTINCT` instead.

## Check yourself

You're ready for Lesson 25 when you can write a `QUALIFY`-based dedupe
from memory, and explain in one sentence why the `ORDER BY` inside it
is a business decision, not just a formality.
