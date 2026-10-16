# Lesson 28 — Writing Data Back to a Database

**Chapter 5 · Python for Data Engineers · Lesson 28 of 48**

## What you'll learn

- Writing rows back to SQL Server from Python with `pyodbc`
- The difference between `execute()` and `executemany()`
- Why you must call `.commit()` — and what happens if you forget
- A realistic staging-table pattern for loading data engineers actually use

## Why writing back matters

Every lesson so far has pulled data out of AdventureWorks2012. Real
pipelines also push data in — logging a pipeline run, writing cleaned
results to a staging table, or loading a transformed dataset into a
target table. This lesson covers the mechanics; Chapter 6 covers the
full load step of an ETL pipeline.

## A single INSERT with execute()

```python
import pyodbc

conn = pyodbc.connect(
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=localhost;DATABASE=AdventureWorks2012;Trusted_Connection=yes;"
)
cursor = conn.cursor()

cursor.execute(
    "INSERT INTO Production.ProductCategory (Name, rowguid, ModifiedDate) "
    "VALUES (?, NEWID(), GETDATE());",
    ("Test Category",)
)
conn.commit()
conn.close()
```

The `?` is a placeholder — the actual value is passed as a separate
argument, never pasted into the string. Lesson 29 explains exactly why
that's not optional.

## Writing many rows with executemany()

```python
rows = [
    ("Trail Runner GTX", 2, 129.99),
    ("Alpine 2P Tent", 1, 249.50),
    ("Summit Daypack 22L", 1, 79.00),
]

cursor.executemany(
    "INSERT INTO Staging.ProductSnapshot (ProductName, Quantity, UnitPrice) "
    "VALUES (?, ?, ?);",
    rows
)
conn.commit()
```

`executemany()` runs the same parameterized statement once per row in
the list, which is far faster than calling `cursor.execute()` in a
Python `for` loop, since the driver can batch the round trips to the
server.

## Commit, or it never happened

```python
cursor.execute("INSERT INTO Staging.ProductSnapshot (ProductName) VALUES (?);", ("Untracked Row",))
# conn.commit()   <- forget this line, and SQL Server rolls it back when the connection closes
conn.close()
```

By default, `pyodbc` connections are **not** in autocommit mode — every
`INSERT`, `UPDATE`, or `DELETE` sits inside an open transaction until
you call `conn.commit()`. Forget it, and closing the connection
silently discards the work. This is deliberate: it's what lets you
undo a bad write with `conn.rollback()` before committing, which
Lesson 31 builds on directly.

## A realistic staging-table pattern

Data engineers rarely write straight into a production table like
`Production.Product`. More often, a pipeline writes into a staging
table first, so a bad load can be inspected or re-run without touching
the table other systems depend on:

```python
cursor.execute("TRUNCATE TABLE Staging.ProductSnapshot;")
cursor.executemany(
    "INSERT INTO Staging.ProductSnapshot (ProductName, Quantity, UnitPrice) VALUES (?, ?, ?);",
    rows
)
conn.commit()
```

Truncating the staging table before each load keeps it holding only
the current run's data — a pattern you'll reuse in Chapter 6's full
ETL pipeline.

## Key terms

| Term | Meaning |
|---|---|
| `execute()` | Runs one parameterized SQL statement |
| `executemany()` | Runs the same statement once per row in a list, in a batch |
| `conn.commit()` | Makes pending writes permanent |
| Staging table | A landing table for pipeline writes, kept separate from production tables |

## Lab

Write the first five rows of `orders.csv` (Chapter 6's dataset) into a
staging table using `executemany()`, remembering to commit.

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: the
difference between `execute()` and `executemany()`, and what happens
to uncommitted writes when a connection closes.
