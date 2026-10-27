# Lesson 4 — Snowflake SQL: What's Different From T-SQL

**Chapter 1 · Beginner Capstone: The First Support Ticket Report · Lesson 4 of 10**

## What you'll learn

- Three real, concrete Snowflake SQL differences a T-SQL-trained developer needs before
  writing this project's summary query
- `QUALIFY`, a Snowflake clause with no T-SQL equivalent, and why it matters for a "top ticket
  per day" style question
- Why these aren't trivia — each one changes how the actual ticket-summary query in Lesson 5
  gets written

## Why pause for syntax before writing the real query

The Snowflake course's own "Snowflake SQL — What's Different From T-SQL" chapter covers this in
depth. This lesson pulls out the three differences that actually show up when you write the
query Lesson 5 needs: counting tickets by day and by priority, straight from `RAW_TICKETS`.

## 1. `LIMIT` instead of `TOP`, and no square-bracket identifiers

T-SQL:

```sql
SELECT TOP 10 [Ticket Id], [Created At] FROM [dbo].[Tickets];
```

Snowflake:

```sql
SELECT TICKET_ID, CREATED_AT FROM RAW_TICKETS LIMIT 10;
```

Snowflake has no `TOP` keyword — `LIMIT` goes at the end of the statement, not the start. And
where T-SQL quotes identifiers with square brackets, Snowflake uses double quotes, and only
when you need mixed case or spaces. Unquoted identifiers in Snowflake are folded to uppercase,
which is why this project's columns are named `TICKET_ID`, `CREATED_AT`, not `TicketId`.

## 2. Date/time functions: same names, different defaults

T-SQL developers reach for `GETDATE()`. Snowflake's equivalent is `CURRENT_TIMESTAMP()`, and
Snowflake also gives you `CURRENT_DATE()` for just the date part — useful for Lesson 5, where
the query needs "this month to date":

```sql
SELECT * FROM RAW_TICKETS
WHERE DATE_TRUNC('MONTH', CREATED_AT) = DATE_TRUNC('MONTH', CURRENT_DATE());
```

`DATE_TRUNC('MONTH', ...)` rounds a timestamp down to the first of its month — the Snowflake
equivalent of T-SQL's more verbose `DATEFROMPARTS(YEAR(x), MONTH(x), 1)` pattern.

## 3. `QUALIFY` — filtering on a window function with no subquery

This one has no T-SQL equivalent at all. In T-SQL, filtering by a window function (like "the
highest-priority ticket per day") needs a CTE or subquery, because `WHERE` can't see window
function results:

```sql
-- T-SQL: needs a CTE just to filter on ROW_NUMBER()
WITH Ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY CreatedDate ORDER BY PriorityRank) AS rn
  FROM Tickets
)
SELECT * FROM Ranked WHERE rn = 1;
```

Snowflake's `QUALIFY` clause filters on a window function directly, no CTE required:

```sql
SELECT *
FROM RAW_TICKETS
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY DATE_TRUNC('DAY', CREATED_AT)
  ORDER BY CASE PRIORITY WHEN 'Urgent' THEN 1 WHEN 'High' THEN 2
                          WHEN 'Medium' THEN 3 ELSE 4 END
) = 1;
```

This project's main summary query doesn't need `QUALIFY` — it's a plain `GROUP BY` — but it's
worth knowing the clause exists, because it's the first thing an experienced Snowflake developer
reaches for whenever a T-SQL habit says "I'd need a CTE for this."

## Key terms

| Term | Meaning |
|---|---|
| `LIMIT` | Snowflake's row-limiting clause, placed at the end of a query, replacing T-SQL's `TOP` |
| `DATE_TRUNC` | Rounds a date or timestamp down to the start of a given unit (day, month, year) |
| `QUALIFY` | Filters rows based on a window function's result without needing a CTE or subquery |

## Lab

Rewrite a `TOP 5 ... ORDER BY` T-SQL query you've written before, in Snowflake syntax using
`LIMIT`. Then write one query using `QUALIFY` to find the single most recent ticket per priority
level in `RAW_TICKETS`.

## Check yourself

Why can't `WHERE` filter on a window function's result in T-SQL, and what does `QUALIFY` let you
skip writing as a result?
