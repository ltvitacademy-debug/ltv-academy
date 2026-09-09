# Lesson 25 — Connecting Python to SQL

**Chapter 2 · Python for Data Engineers · Lesson 25 of 62**

## What you'll learn

- Connecting Python to a real SQL Server database
- `pd.read_sql()` — a query straight into a DataFrame, no manual parsing
- Why data engineers connect to databases directly, instead of always
  exporting to a file first
- A real query, against AdventureWorks2012 — the same database this
  site's T-SQL Development course uses

## Connecting to SQL Server from Python

```python
import pyodbc
import pandas as pd

conn = pyodbc.connect(
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=localhost;"
    "DATABASE=AdventureWorks2012;"
    "Trusted_Connection=yes;"
)
```

`pyodbc` is Python's standard way to talk to SQL Server over ODBC — the
connection string names the driver, the server, the database, and how
to authenticate (here, Windows authentication via `Trusted_Connection`).

## pd.read_sql() — a query straight into a DataFrame

```python
query = """
SELECT TOP 10 ProductID, Name, ListPrice
FROM Production.Product
WHERE ListPrice > 0
ORDER BY ListPrice DESC;
"""

df = pd.read_sql(query, conn)
print(df.head())
conn.close()
```

If you've taken this site's T-SQL Development course, that query should
look completely familiar — it's real T-SQL, running against the exact
same `AdventureWorks2012` database, and `pd.read_sql()` hands the
result straight back as a DataFrame, with column types already inferred.

## Why connect directly instead of exporting to a file first

Exporting a table to CSV first, then reading the CSV, works — but it's
an unnecessary extra step, and the export can go stale the moment
someone updates the source table. Connecting directly means your script
always sees current data, and lets the database engine — built for
exactly this — do the filtering and sorting in the `WHERE` and `ORDER
BY` clauses, instead of pulling everything into Python and filtering
there.

## Always close the connection

```python
conn = pyodbc.connect(...)
try:
    df = pd.read_sql(query, conn)
finally:
    conn.close()
```

This is Lesson 19's `finally` in real use — the connection closes
whether the query succeeded or failed, instead of leaking an open
connection if something goes wrong mid-query.

## Key terms

| Term | Meaning |
|---|---|
| `pyodbc` | Python's library for connecting to SQL Server over ODBC |
| Connection string | The driver, server, database, and auth details, as one string |
| `pd.read_sql()` | Runs a SQL query and returns the result as a DataFrame directly |

## Lab

If you have SQL Server and AdventureWorks2012 set up from the T-SQL
course, run:

```python
import pyodbc
import pandas as pd

conn = pyodbc.connect(
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=localhost;DATABASE=AdventureWorks2012;Trusted_Connection=yes;"
)
try:
    df = pd.read_sql(
        "SELECT COUNT(*) AS ProductCount FROM Production.Product;", conn
    )
    print(df)
finally:
    conn.close()
```

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
connect directly to a database instead of exporting to a file first, and
why does closing the connection belong in a `finally` block?
