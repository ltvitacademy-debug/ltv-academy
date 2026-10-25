# Lesson 16 — Date Arithmetic Across Dialects

**Chapter 3 · Querying Basics Compared · Lesson 5 of 8**

## What you'll learn

- T-SQL's `DATEADD`/`DATEDIFF` function-based approach
- Oracle's direct arithmetic on DATE values, plus `ADD_MONTHS`/`MONTHS_BETWEEN`
- MySQL's `DATE_ADD`/`DATEDIFF`
- PostgreSQL's direct interval arithmetic and `AGE()`

## SQL Server: function-based DATEADD and DATEDIFF

```sql
-- Add 7 days to OrderDate
SELECT OrderDate, DATEADD(day, 7, OrderDate) AS DueDate
FROM Sales.SalesOrderHeader;

-- Difference in days between two dates
SELECT DATEDIFF(day, OrderDate, ShipDate) AS DaysToShip
FROM Sales.SalesOrderHeader;
```

T-SQL always goes through a function — there's no `+` or `-` directly on
date values with a plain number.

## Oracle: direct arithmetic, because DATE is internally numeric

```sql
-- Oracle allows direct arithmetic: + 7 really does mean "7 days"
SELECT order_date, order_date + 7 AS due_date
FROM orders;

-- Difference between two DATE values returns a number of days directly
SELECT ship_date - order_date AS days_to_ship
FROM orders;

-- Function alternatives for months, which aren't a fixed number of days
SELECT ADD_MONTHS(order_date, 1) AS next_month,
       MONTHS_BETWEEN(ship_date, order_date) AS months_to_ship
FROM orders;
```

Oracle's `DATE` type is stored internally as a number, so ordinary `+`/`-`
arithmetic works directly — `order_date + 7` genuinely means "7 days
later." For month-based math, where "a month" isn't a fixed day count,
Oracle gives you `ADD_MONTHS()` and `MONTHS_BETWEEN()`.

## MySQL: DATE_ADD and DATEDIFF

```sql
-- Add 7 days
SELECT order_date, DATE_ADD(order_date, INTERVAL 7 DAY) AS due_date
FROM orders;

-- Difference in days
SELECT DATEDIFF(ship_date, order_date) AS days_to_ship
FROM orders;
```

MySQL's `DATEDIFF()` takes the same argument order style as T-SQL's
diff-related thinking, but note the function signature differs: MySQL's
`DATEDIFF(date1, date2)` takes only two dates (always computing in days),
while T-SQL's `DATEDIFF(datepart, date1, date2)` takes a unit as the first
argument.

## PostgreSQL: direct interval arithmetic, plus AGE()

```sql
-- Add 7 days using an INTERVAL literal
SELECT order_date, order_date + INTERVAL '7 days' AS due_date
FROM orders;

-- Difference between two dates
SELECT ship_date - order_date AS days_to_ship
FROM orders;

-- AGE() gives a human-readable interval breakdown
SELECT AGE(ship_date, order_date) AS time_to_ship
FROM orders;
```

PostgreSQL supports direct arithmetic similar to Oracle, but using an
explicit `INTERVAL` literal rather than a bare number, since PostgreSQL
distinguishes `DATE` from `INTERVAL` types more strictly than Oracle does.

## Side-by-side: add 7 days

| Dialect | Syntax |
|---|---|
| SQL Server | `DATEADD(day, 7, OrderDate)` |
| Oracle | `OrderDate + 7` |
| MySQL | `DATE_ADD(OrderDate, INTERVAL 7 DAY)` |
| PostgreSQL | `OrderDate + INTERVAL '7 days'` |

## Key terms

| Term | Meaning |
|---|---|
| `DATEADD`/`DATEDIFF` | T-SQL's function-based date arithmetic |
| Direct arithmetic | Oracle's `+`/`-` directly on DATE values, since DATE is numeric internally |
| `ADD_MONTHS`/`MONTHS_BETWEEN` | Oracle functions for month-based math, where day-count isn't fixed |
| `DATE_ADD` | MySQL's function for adding an INTERVAL to a date |
| `AGE()` | PostgreSQL function returning a human-readable interval between two dates/timestamps |

## Lab

Write a query that computes "30 days from today" on all four platforms:
T-SQL (`DATEADD`), Oracle (direct arithmetic), MySQL (`DATE_ADD`), and
PostgreSQL (`INTERVAL` arithmetic). Then compute "months between two
dates" on Oracle using `MONTHS_BETWEEN`.

## Check yourself

You're ready for the next lesson when you can explain, without looking,
why `OrderDate + 7` works directly on Oracle but needs `DATEADD(day, 7,
OrderDate)` on SQL Server.
