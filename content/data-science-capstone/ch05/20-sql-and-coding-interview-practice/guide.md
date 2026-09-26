# SQL & Coding Interview Practice

SQL is the most commonly tested technical skill in entry-level data science interviews, usually alongside some Python or pandas. The good news is that the questions repeat a small set of patterns: top-N per group, deduplication, retention by cohort, and comparing a row to the previous row. This lesson practices each with a small database you can build yourself. Every query below was run in SQLite through Python, and the outputs are exactly what it printed. Other databases differ in date functions, so check your dialect.

## What you'll learn

- The four SQL patterns that come up again and again
- Complete solutions you can run and modify
- The same problems in pandas
- How to talk through a problem while you solve it

## The practice database

Two tables, `customers` (customer_id, email, signup_date, region) and `orders` (order_id, customer_id, order_date, amount), with 8 customers and 15 orders, plus a `raw_customers` table (email, name, updated_at) that contains duplicate rows. Create them in an in-memory SQLite database:

```python
import sqlite3
con = sqlite3.connect(":memory:")
con.executescript("""
CREATE TABLE customers(customer_id INT, email TEXT,
                       signup_date TEXT, region TEXT);
CREATE TABLE orders(order_id INT, customer_id INT,
                    order_date TEXT, amount REAL);
-- INSERT the 8 customers and 15 orders here
""")
```

Insert your own small rows so you know the right answer in advance. Practicing with data small enough to check by hand is the best habit you can build.

## Problem 1: top 2 customers by spend in each region

```sql
WITH spend AS (
  SELECT c.region, c.customer_id, SUM(o.amount) AS total
  FROM customers c
  JOIN orders o ON o.customer_id = c.customer_id
  GROUP BY c.region, c.customer_id),
ranked AS (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY region ORDER BY total DESC) AS rn
  FROM spend)
SELECT region, customer_id, total
FROM ranked WHERE rn <= 2 ORDER BY region, rn;
```

Result: East 3 (100.0), East 4 (95.0), West 1 (155.0), West 5 (135.0). Ask about ties: `ROW_NUMBER` breaks them arbitrarily, `RANK` keeps ties and skips numbers, `DENSE_RANK` keeps ties without skipping. Say which you chose and why.

## Problem 2: deduplicate, keeping the latest record per email

```sql
SELECT email, name, updated_at FROM (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY email ORDER BY updated_at DESC) AS rn
  FROM raw_customers)
WHERE rn = 1 ORDER BY email;
```

Result: ana@x.com with the newer name "Ana R." (2024-02-01), ben@x.com (an exact duplicate collapsed to one row), and cy@x.com. Mention that you would first count duplicates before deleting anything.

## Problem 3: cohort retention

Of customers who signed up each month, what share ordered in the following month?

```sql
WITH cohort AS (
  SELECT customer_id, strftime('%Y-%m', signup_date) AS cohort_month
  FROM customers),
active AS (
  SELECT DISTINCT customer_id,
         strftime('%Y-%m', order_date) AS m
  FROM orders)
SELECT c.cohort_month, COUNT(*) AS customers,
       COUNT(a.customer_id) AS ordered_next_month,
       ROUND(1.0 * COUNT(a.customer_id) / COUNT(*), 2) AS retention
FROM cohort c
LEFT JOIN active a
  ON a.customer_id = c.customer_id
 AND a.m = strftime('%Y-%m', c.cohort_month || '-01', '+1 month')
GROUP BY c.cohort_month ORDER BY c.cohort_month;
```

Result: 2024-01 has 3 customers, 2 ordered next month (0.67); 2024-02 has 3 customers, 2 (0.67); 2024-03 has 2 customers, 0 (0.00). The March zero is a trap: our data ends in March, so April has not happened yet. Say out loud that the last cohort's window is incomplete. The `LEFT JOIN` matters, because an inner join would silently drop customers who did not return.

## Problem 4: days since the previous order

Use `LAG` with `julianday` to compute the gap. For customer 1 the gaps are NULL, 29, 33 days; for customer 3, NULL and 26.

## The same problems in pandas

```python
tot = orders.merge(customers, on="customer_id") \
            .groupby(["region", "customer_id"],
                     as_index=False)["amount"].sum() \
            .rename(columns={"amount": "total"})
top2 = tot.sort_values(["region", "total"],
                       ascending=[True, False]) \
          .groupby("region").head(2)

dedup = raw.sort_values("updated_at") \
           .drop_duplicates("email", keep="last")

orders = orders.sort_values(["customer_id", "order_date"])
orders["gap"] = orders.groupby("customer_id")["order_date"] \
                      .diff().dt.days
```

These produced the same top-2 rows, the same three deduplicated emails, and the same gaps (29, 33 and 26 days) as the SQL. Convert date strings with `pd.to_datetime` first.

## How to talk through it

1. Restate the question and ask about ties, NULLs and duplicates.
2. State the grain: what does one row of the result represent?
3. Build in steps, running each small piece on tiny data.
4. Check your answer against a hand calculation.
5. Name what you would validate in real data.

## Recap

Learn the four patterns, practice on tiny data you can verify by hand, and narrate your reasoning. Next, we look at case studies and take-home assignments.
