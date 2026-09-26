# Extracting Data With SQL

Phase 1 starts where most real projects start: in the database. You could load all four tables into pandas and do everything there, and for 140,000 orders you could get away with it. But a data scientist who can push filtering, joining, and aggregation into SQL builds features faster, moves less data, and produces a query a colleague can rerun. This lesson builds one query that returns a single row per active customer: the label plus a first set of behavior features.

You already know T-SQL. Everything here runs on SQLite through Python's built-in `sqlite3` module, so the dialect differs in small ways worth knowing.

## What you'll learn

- The SQLite versus T-SQL differences that matter for this project
- How to remove duplicates with a window function
- How a text column silently corrupts an aggregate, and how to fix it
- How to write a CTE-based extract with a snapshot parameter
- Sanity checks to run on every extract

## SQLite versus T-SQL, briefly

| Task | T-SQL | SQLite |
|---|---|---|
| Add days to a date | `DATEADD(day, 60, @d)` | `date(:d, '+60 days')` |
| Days between dates | `DATEDIFF(day, a, b)` | `julianday(b) - julianday(a)` |
| First N rows | `SELECT TOP 5` | `LIMIT 5` |
| Current time | `GETDATE()` | `date('now')` |
| Parameters | `@snap` | `:snap` (named) or `?` |
| Types | strict column types | dynamic typing; column "affinity" only |
| Comparison as a value | needs `CASE` | `AVG(x > 0)` works (true is 1) |

Dates in SQLite are just text or numbers; there is no date type. That is why the ISO format `YYYY-MM-DD` matters. Window functions such as `ROW_NUMBER()` are available in current versions.

## Step 1: remove duplicate customers

The audit found 40 duplicate customer rows. First confirm they are exact copies, then keep one row per customer with a window function.

```python
import sqlite3
import pandas as pd

con = sqlite3.connect("harvest_table.db")
SNAP = "2025-06-30"

print(con.execute(
    "SELECT COUNT(*) FROM (SELECT DISTINCT * FROM customers)"
).fetchone())
print(con.execute("""SELECT COUNT(*) FROM (
  SELECT ROW_NUMBER() OVER (
           PARTITION BY customer_id ORDER BY rowid) AS rn
  FROM customers) WHERE rn = 1""").fetchone())
```

Both queries print `(4000,)`. Because `SELECT DISTINCT *` also gives 4,000 rows, the duplicates are identical copies and keeping the first per `customer_id` loses nothing. (SQLite has an implicit `rowid`; in T-SQL you would order by a real column or `(SELECT NULL)`.)

## Step 2: the text-column trap

The `amount` column is stored as text, and 1,406 values look like `$119.8`. SQLite will not complain. It converts `'$119.8'` to a number by reading up to the first non-numeric character, which is zero.

```python
print(con.execute("""
SELECT ROUND(AVG(amount), 4),
       ROUND(AVG(CAST(REPLACE(amount, '$', '') AS REAL)), 4),
       SUM(CAST(amount AS REAL) = 0)
FROM orders""").fetchone())
```

This prints `(64.9212, 65.5572, 1406)`. The naive average is 64.92; the fixed average is 65.56; and exactly the 1,406 dollar-sign rows became zeros. No error, no warning, just a wrong number. Any time a column's type is not what you expect, check it before aggregating.

## Step 3: the extract query

Save this as `extract.sql`. It builds the population and label from lesson 2, then joins order and ticket features. Every feature filters on `:snap`, so nothing after the snapshot leaks in.

```sql
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (
           PARTITION BY customer_id ORDER BY rowid) AS rn
  FROM customers
),
pop AS (
  SELECT c.customer_id, c.signup_date, c.region, c.age, c.plan,
         c.acquisition_channel AS channel,
         CASE WHEN x.cancel_date > :snap
               AND x.cancel_date <= date(:snap, '+60 days')
              THEN 1 ELSE 0 END AS churn_60d
  FROM ranked c
  LEFT JOIN cancellations x ON x.customer_id = c.customer_id
  WHERE c.rn = 1
    AND (x.cancel_date IS NULL OR x.cancel_date >= :snap)
),
o AS (
  SELECT customer_id,
         CAST(julianday(:snap) - julianday(order_date) AS INTEGER) AS days_ago,
         CAST(REPLACE(amount, '$', '') AS REAL) AS amt,
         COALESCE(discount_pct, 0) AS disc,
         status
  FROM orders
  WHERE order_date <= :snap
),
ord_f AS (
  SELECT customer_id,
         MIN(days_ago)            AS recency_days,
         SUM(days_ago < 30)       AS orders_30d,
         SUM(days_ago < 90)       AS orders_90d,
         AVG(amt)                 AS avg_amount,
         AVG(disc > 0)            AS discount_share,
         AVG(status <> 'delivered') AS late_refund_share
  FROM o
  GROUP BY customer_id
),
tkt_f AS (
  SELECT customer_id,
         SUM(julianday(:snap) - julianday(created_at) < 90) AS tickets_90d,
         AVG(resolution_hours)    AS avg_resolution_hours
  FROM tickets
  WHERE created_at <= :snap
  GROUP BY customer_id
)
SELECT pop.*, ord_f.recency_days,
       COALESCE(ord_f.orders_30d, 0) AS orders_30d,
       COALESCE(ord_f.orders_90d, 0) AS orders_90d,
       ord_f.avg_amount, ord_f.discount_share, ord_f.late_refund_share,
       COALESCE(tkt_f.tickets_90d, 0) AS tickets_90d,
       tkt_f.avg_resolution_hours
FROM pop
LEFT JOIN ord_f ON ord_f.customer_id = pop.customer_id
LEFT JOIN tkt_f ON tkt_f.customer_id = pop.customer_id
```

Notice the choices. The dollar signs are stripped and the amounts cast to numbers. Missing `discount_pct` becomes 0 with `COALESCE`, one of our fixed cleaning rules. "Last 30 days" means `days_ago < 30`, so the snapshot day counts as day 0. Left joins keep customers who have no orders or tickets, and `COALESCE` turns their missing counts into zeros.

## Step 4: run it and check it

```python
sql = open("extract.sql").read()
df = pd.read_sql_query(sql, con, params={"snap": SNAP})
print(df.shape, df.churn_60d.sum())
print(df.isna().sum()[lambda s: s > 0].to_dict())
print(df.recency_days.min(), df.customer_id.is_unique)
```

The output is:

```
(3690, 15) 568
{'age': 144, 'recency_days': 27, 'avg_amount': 27, 'discount_share': 27, 'late_refund_share': 27, 'avg_resolution_hours': 1380}
0.0 True
```

Compare against lesson 2: 3,690 rows and 568 churners, exactly as expected, with one row per customer. `recency_days` has a minimum of 0, so no order from the future crept in. To see why that check earns its keep, run `SELECT MIN(CAST(julianday('2025-06-30') - julianday(order_date) AS INTEGER)) FROM orders` without the snapshot filter: it returns `-2`, the two extra days of orders after the snapshot.

The missing values are informative, not just noise. 27 active customers have never placed an order on or before the snapshot (their order features are missing or zero), and 1,380 have never opened a ticket, so `avg_resolution_hours` is empty for them. We will decide how to handle those in the feature lessons; for now, note them.

## Recap

One query now returns the population, the 60-day label, and order and ticket features, all computed as of the snapshot, in about a quarter of a second on a laptop. You removed duplicates with a window function and caught a silent text-to-zero conversion. Next you clean the remaining messy columns (signup dates, regions, ages) in Python and reconcile the results with this extract.
