# Lesson 5 — Writing the Ticket Summary Query

**Chapter 1 · Beginner Capstone: The First Support Ticket Report · Lesson 5 of 10**

## What you'll learn

- How to write the actual query that answers the VP of Support's question, using
  `DATE_TRUNC` and `GROUP BY`
- Why this query filters to the current month before grouping, not after
- How to sanity-check the result against what you already know about Driftwood's ticket volume

## The requirement, one more time

From Lesson 1: *a report showing the count of support tickets created each day this month,
broken out by priority.* Lesson 3 loaded the raw data. This lesson writes the query that turns
`RAW_TICKETS` into that answer.

## The query

```sql
SELECT
  DATE_TRUNC('DAY', CREATED_AT)::DATE AS TICKET_DATE,
  PRIORITY,
  COUNT(*) AS TICKET_COUNT
FROM DRIFTWOOD_ANALYTICS.SUPPORT.RAW_TICKETS
WHERE DATE_TRUNC('MONTH', CREATED_AT) = DATE_TRUNC('MONTH', CURRENT_DATE())
GROUP BY TICKET_DATE, PRIORITY
ORDER BY TICKET_DATE, PRIORITY;
```

Walking through it in order:

- **`WHERE DATE_TRUNC('MONTH', ...) = DATE_TRUNC('MONTH', CURRENT_DATE())`** filters to the
  current month before any grouping happens — cheaper, and it means the `GROUP BY` only ever
  works over this month's rows, not the whole table's history.
- **`DATE_TRUNC('DAY', CREATED_AT)::DATE`** collapses each ticket's exact timestamp down to its
  calendar day, and `::DATE` casts the result from a timestamp to a plain date, which is all the
  VP needs to see — not an hour and minute nobody asked for.
- **`GROUP BY TICKET_DATE, PRIORITY`** matches the grain decided back in Lesson 1: one row per
  day, per priority level.
- **`COUNT(*)`** is the actual metric — how many tickets, full stop.

## Why filter before grouping, not after

It's tempting to write `GROUP BY` first and filter with a `HAVING` clause afterward, but
`HAVING` filters *groups*, not raw rows — the wrong tool here, since the goal is to exclude rows
outside this month before they're ever grouped. Filtering in `WHERE` is both correct and cheaper:
Snowflake never has to touch last month's rows at all.

## Sanity-checking the result

```sql
SELECT PRIORITY, SUM(TICKET_COUNT) AS MONTH_TOTAL
FROM (
  SELECT DATE_TRUNC('DAY', CREATED_AT)::DATE AS TICKET_DATE, PRIORITY, COUNT(*) AS TICKET_COUNT
  FROM DRIFTWOOD_ANALYTICS.SUPPORT.RAW_TICKETS
  WHERE DATE_TRUNC('MONTH', CREATED_AT) = DATE_TRUNC('MONTH', CURRENT_DATE())
  GROUP BY TICKET_DATE, PRIORITY
)
GROUP BY PRIORITY;
```

Rolling the daily counts back up to one total per priority is a quick way to confirm the
query's math is internally consistent before anyone presents it.

## Key terms

| Term | Meaning |
|---|---|
| `GROUP BY` | Collapses rows sharing the same grouping values into one summary row per combination |
| `WHERE` vs `HAVING` | `WHERE` filters raw rows before grouping; `HAVING` filters groups after grouping |
| `::DATE` | Snowflake's cast syntax, here converting a timestamp to a plain calendar date |

## Lab

Run the summary query against `RAW_TICKETS` and the sanity-check query side by side. Do the
per-priority totals from the sanity check match what you'd expect from eyeballing the daily
rows?

## Check yourself

Why would writing this query with `HAVING` instead of `WHERE` be both slower and logically
wrong, even if it happened to return the same result on today's data?
