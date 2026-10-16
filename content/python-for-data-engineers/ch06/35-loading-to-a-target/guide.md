# Lesson 35 — Loading to a Target (File, Database, Warehouse)

**Chapter 6 · Python for Data Engineers · Lesson 35 of 48**

## What you'll learn

- Loading a cleaned DataFrame to a file, versus a database, versus a warehouse
- Using SQLite as a lightweight stand-in for a real warehouse target
- `df.to_sql()` against a local SQLite file
- Why this chapter uses SQLite instead of AdventureWorks2012 for the Load step

## Three kinds of target

A Load step's target is usually one of:

- **A file** — CSV, JSON, Parquet — simple, portable, no server required
- **A database** — a real SQL Server database like AdventureWorks2012, using the Chapter 5 patterns (`pyodbc`, SQLAlchemy)
- **A warehouse** — a database built for analytics at scale, loaded the same way as a regular database from Python's point of view

For this chapter's pipeline, loading into a full SQL Server instance
for every lesson would mean every student needs SQL Server running
just to follow along. SQLite — a real, serverless, file-based database
built into Python — is used here as a lighter stand-in for that
warehouse target. The code is nearly identical to loading into
AdventureWorks2012; only the connection changes.

## Loading to a file

```python
def load_to_csv(df, path="orders_clean.csv"):
    df.to_csv(path, index=False)
    return len(df)
```

Simplest possible target — useful for a quick export, but no query
capability once it's written, and no way to append safely without
re-reading the whole file first.

## Loading to SQLite

```python
import sqlite3
import pandas as pd

def load_to_warehouse(df, db_path="orders_warehouse.db", table="orders"):
    conn = sqlite3.connect(db_path)
    try:
        df.to_sql(table, conn, if_exists="replace", index=False)
        return len(df)
    finally:
        conn.close()
```

`sqlite3` is Python's built-in database module — no install required,
no server to run. `df.to_sql()` works exactly the way it did against
the SQLAlchemy engine in Lesson 30, because pandas' `to_sql()` is
designed to work the same way across database backends.

## Confirming the load

```python
def count_rows(db_path="orders_warehouse.db", table="orders"):
    conn = sqlite3.connect(db_path)
    try:
        cursor = conn.cursor()
        cursor.execute(f"SELECT COUNT(*) FROM {table};")
        return cursor.fetchone()[0]
    finally:
        conn.close()

print(count_rows())
```

Loading isn't done until you've confirmed the row count in the target
matches what you expected to load — a cheap check that catches a
surprising number of real pipeline bugs.

## The same pattern, pointed at AdventureWorks2012

```python
from sqlalchemy import create_engine

engine = create_engine(
    "mssql+pyodbc://@localhost/AdventureWorks2012"
    "?driver=ODBC+Driver+18+for+SQL+Server&trusted_connection=yes"
)
df.to_sql("OrdersStaging", engine, schema="Staging", if_exists="append", index=False)
```

If this pipeline were loading into a real SQL Server warehouse instead
of SQLite, this is the only change — same `to_sql()` call, same
DataFrame, a real database engine instead of a local file. The rest of
the pipeline doesn't need to know or care which one it's pointed at.

## Key terms

| Term | Meaning |
|---|---|
| Load target | Where a pipeline's cleaned data ends up — file, database, or warehouse |
| `sqlite3` | Python's built-in, serverless, file-based database module |
| `df.to_sql()` | Writes a DataFrame to a table, working the same way across database backends |

## Lab

Load `orders.csv`'s cleaned DataFrame (from Lesson 34's `transform()`)
into `orders_warehouse.db`, then call `count_rows()` to confirm it
matches `len(clean_df)`.

## Check yourself

You're ready for Lesson 36 when you can explain, without looking: why
this chapter uses SQLite as a stand-in, and what would actually change
if you pointed the same `to_sql()` call at AdventureWorks2012 instead.
