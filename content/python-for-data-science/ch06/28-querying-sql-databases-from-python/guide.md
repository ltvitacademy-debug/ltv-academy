# Querying SQL Databases From Python

You already write T-SQL. Most company data lives in relational databases, so the smoothest way to start an analysis is to query the database directly from Python and receive the result as a DataFrame. No CSV export, no stale copy. This lesson shows the pattern, how to pass parameters safely, and how to decide whether to do the work in SQL or in pandas.

## What you'll learn

- How to run a query into a DataFrame with `pd.read_sql_query`
- How to connect to SQLite (for practice) and SQL Server (with SQLAlchemy)
- How to pass values safely with `params` and avoid SQL injection
- How to write a DataFrame back to a database with `to_sql`
- When to filter and aggregate in SQL versus pandas

## The practice database

To practice without a server, use SQLite, which is built into Python (`import sqlite3`). We load two small illustrative tables into an in-memory database:

```python
import sqlite3
import pandas as pd

orders = pd.DataFrame({
    "order_id": [5001, 5002, 5003, 5004, 5005, 5006],
    "customer_id": [101, 102, 101, 103, 102, 101],
    "amount": [120.0, 75.5, 60.0, 200.0, 45.0, 310.0],
    "status": ["shipped", "shipped", "pending",
               "delivered", "shipped", "delivered"],
})
customers = pd.DataFrame({
    "customer_id": [101, 102, 103],
    "name": ["Ana Ruiz", "Ben Cole", "Cy Park"],
    "city": ["Atlanta", "Austin", "Denver"],
})

conn = sqlite3.connect(":memory:")
customers.to_sql("customers", conn, index=False)
orders.to_sql("orders", conn, index=False)

df = pd.read_sql_query("SELECT * FROM orders", conn)
```

`read_sql_query` takes a SQL string and a connection and returns a DataFrame with sensible types (`int64`, `float64`, `object`).

## Connecting to SQL Server

For SQL Server, the usual approach is a SQLAlchemy engine with the `pyodbc` driver. The pattern below follows the SQLAlchemy documentation, but it is illustrative: it needs your own server, installed ODBC driver, and credentials, so we did not run it in this course's build.

```python
from sqlalchemy import create_engine

engine = create_engine(
    "mssql+pyodbc://USER:PWD@myhost/AdventureWorks2012"
    "?driver=ODBC+Driver+17+for+SQL+Server"
)
df = pd.read_sql_query("SELECT TOP 10 * FROM Sales.SalesOrderHeader", engine)
```

Things to check in the current documentation for your setup: the exact ODBC driver name (17 and 18 are both common), the authentication method (SQL login versus Windows or Entra authentication), and which pandas and SQLAlchemy versions work together. Never type a real password into a notebook you share; read it from an environment variable.

## Any SQL you can write

The database does the heavy lifting; Python just receives the result:

```python
q = """
SELECT c.city, COUNT(*) AS n_orders, SUM(o.amount) AS revenue
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id
GROUP BY c.city
ORDER BY revenue DESC
"""
pd.read_sql_query(q, conn)
#       city  n_orders  revenue
# 0  Atlanta         3    490.0
# 1   Denver         1    200.0
# 2   Austin         2    120.5
```

Nothing here is new SQL. Only the connection line is.

## Parameters: never paste values into SQL

If a value comes from Python, pass it through `params`:

```python
pd.read_sql_query(
    "SELECT * FROM orders WHERE status = ? AND amount > ?",
    conn, params=("shipped", 50))
```

We returned two rows (orders 5001 and 5002). The placeholder style depends on the driver: SQLite uses `?` or `:name`, and `pyodbc` uses `?`.

Why not just build the string with an f-string? We tested it with a malicious value, `"shipped' OR '1'='1"`:

- f-string version: **6 rows** returned (the whole table).
- parameterized version: **0 rows**.

Pasting values into SQL lets input rewrite your query (SQL injection) and breaks on quotes. Parameters avoid both.

## Writing back

```python
summary = pd.read_sql_query(q, conn)
summary.to_sql("city_summary", conn, index=False, if_exists="replace")
```

`if_exists` can be `"fail"` (the default), `"replace"`, or `"append"`. Choose deliberately, since `"replace"` drops the existing table.

## SQL or pandas?

- **Filter and aggregate in SQL.** The database is optimized for it and sends you fewer rows.
- **Pull once, explore in pandas.** Modeling, plotting, and reshaping are easier in Python.
- **Mind the dialect.** T-SQL's `TOP 10` is `LIMIT 10` in SQLite. Write SQL in your target database's dialect.

You could do the same city summary in pandas with `orders.merge(customers, on="customer_id").groupby("city")["amount"].agg(n_orders="count", revenue="sum")`, and we confirmed it gives the same numbers. Use whichever keeps data movement small.

## Recap

- `pd.read_sql_query(sql, connection)` returns a DataFrame; use SQLAlchemy for SQL Server.
- Use `params`, never string-pasting, to pass values.
- `to_sql(..., if_exists=...)` writes results back.
- Push filtering and aggregation into SQL; pull the result into pandas.
