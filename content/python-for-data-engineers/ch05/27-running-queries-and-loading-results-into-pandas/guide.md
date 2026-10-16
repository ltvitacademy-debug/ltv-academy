# Lesson 27 — Running Queries & Loading Results Into Pandas

**Chapter 5 · Python for Data Engineers · Lesson 27 of 48**

## What you'll learn

- `pd.read_sql()` — running a query and getting a DataFrame back directly
- Joining real AdventureWorks2012 tables in the query itself, not in pandas
- Reading large result sets safely with `chunksize`
- Why letting SQL Server do the join beats pulling raw tables into Python

## pd.read_sql(): a query straight into a DataFrame

```python
import pyodbc
import pandas as pd

conn = pyodbc.connect(
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=localhost;DATABASE=AdventureWorks2012;Trusted_Connection=yes;"
)

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

`pd.read_sql()` runs the SQL and hands the result straight back as a
DataFrame, with column types already inferred — no manual loop over
cursor rows, no building lists of tuples by hand.

## Joining tables in the query, not in pandas

```python
query = """
SELECT soh.SalesOrderID, soh.OrderDate, p.Name AS ProductName,
       sod.OrderQty, sod.UnitPrice, sod.LineTotal
FROM Sales.SalesOrderHeader AS soh
JOIN Sales.SalesOrderDetail AS sod ON sod.SalesOrderID = soh.SalesOrderID
JOIN Production.Product AS p ON p.ProductID = sod.ProductID
WHERE soh.OrderDate >= '2011-01-01'
ORDER BY soh.OrderDate;
"""

orders_df = pd.read_sql(query, conn)
print(orders_df.shape)
```

This joins three real AdventureWorks2012 tables — `Sales.SalesOrderHeader`,
`Sales.SalesOrderDetail`, and `Production.Product` — entirely inside SQL
Server. You could instead pull all three tables into pandas separately
and use `.merge()` three times, but that means moving far more data
than you need across the network, then asking pandas to do work the
database engine already does well. Push the join down to SQL whenever
the database can see all the tables involved.

## Reading large result sets with chunksize

```python
query = "SELECT * FROM Sales.SalesOrderDetail;"

total_rows = 0
for chunk in pd.read_sql(query, conn, chunksize=5000):
    total_rows += len(chunk)
    # process each chunk here, instead of holding the whole table in memory

print(total_rows)
```

`chunksize` turns `pd.read_sql()` into an iterator of smaller DataFrames
instead of one giant one. For a table with a few thousand rows this
doesn't matter — but `Sales.SalesOrderDetail` and tables like it can run
into the hundreds of thousands of rows in a real warehouse, and loading
all of it into memory at once isn't always realistic.

## Parameters, previewed

Notice the query above has no user-supplied values spliced into the
string. Lesson 29 covers exactly why that matters — for now, just
avoid building SQL strings with Python f-strings around anything that
came from outside your script.

## Key terms

| Term | Meaning |
|---|---|
| `pd.read_sql()` | Runs a SQL query and returns the result as a DataFrame |
| Pushing down a join | Letting the database join tables, instead of pandas |
| `chunksize` | Reads a large result set as an iterator of smaller DataFrames |

## Lab

Join `Sales.SalesOrderHeader` to `Sales.Customer` and count orders per
`CustomerID`:

```python
query = """
SELECT CustomerID, COUNT(*) AS OrderCount
FROM Sales.SalesOrderHeader
GROUP BY CustomerID
ORDER BY OrderCount DESC;
"""
df = pd.read_sql(query, conn)
print(df.head(10))
```

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why
joining tables inside the SQL query usually beats pulling them into
pandas separately, and what `chunksize` changes about how
`pd.read_sql()` returns data.
