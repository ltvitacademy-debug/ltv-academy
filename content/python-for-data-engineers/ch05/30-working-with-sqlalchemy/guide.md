# Lesson 30 — Working With SQLAlchemy

**Chapter 5 · Python for Data Engineers · Lesson 30 of 48**

## What you'll learn

- Why SQLAlchemy sits on top of `pyodbc` instead of replacing it
- Building a connection URL and an `Engine`
- `pd.read_sql()` and `df.to_sql()` against a SQLAlchemy engine
- When to reach for SQLAlchemy instead of raw `pyodbc`

## Why SQLAlchemy

`pyodbc` works, but every detail of the connection lives in one
driver-specific string, and pandas' `.to_sql()` method (writing a
whole DataFrame to a table in one call) needs a SQLAlchemy engine, not
a raw `pyodbc` connection. SQLAlchemy is a toolkit that wraps the
underlying driver — in this case, still `pyodbc` — behind a consistent
interface pandas and other tools expect.

## Installing it

```python
pip install sqlalchemy
```

SQLAlchemy doesn't replace `pyodbc` — it uses it underneath for the
actual SQL Server connection.

## Building an engine

```python
from sqlalchemy import create_engine

engine = create_engine(
    "mssql+pyodbc://@localhost/AdventureWorks2012"
    "?driver=ODBC+Driver+18+for+SQL+Server&trusted_connection=yes"
)
```

Compare this to the `pyodbc` connection string from Lesson 26 — the
same four pieces are here (driver, server, database, Windows
authentication), just arranged as a URL instead of semicolon-separated
key/value pairs. `create_engine()` doesn't connect immediately; it
builds a reusable object that opens connections as needed.

## Reading with an engine

```python
import pandas as pd

df = pd.read_sql("SELECT TOP 10 Name, ListPrice FROM Production.Product;", engine)
print(df.head())
```

`pd.read_sql()` accepts either a raw `pyodbc` connection (Lesson 27) or
a SQLAlchemy engine — the engine version is what you'll see in most
real pipeline code, because it's also what `.to_sql()` requires for
writing.

## Writing a whole DataFrame with to_sql()

```python
staging_df = pd.DataFrame({
    "ProductName": ["Trail Runner GTX", "Alpine 2P Tent"],
    "Quantity": [2, 1],
    "UnitPrice": [129.99, 249.50],
})

staging_df.to_sql(
    "ProductSnapshot",
    engine,
    schema="Staging",
    if_exists="append",
    index=False,
)
```

`to_sql()` does what Lesson 28's `executemany()` loop did by hand — but
in one call. `if_exists="append"` adds rows to an existing table;
`"replace"` drops and recreates the table first; `"fail"` (the default)
raises an error if the table already exists. `index=False` stops
pandas from writing its row index as its own column.

## pyodbc vs SQLAlchemy — when to use which

Raw `pyodbc` (Lessons 26–29) is simpler for one-off scripts and gives
you direct control over cursors and transactions. SQLAlchemy is worth
the extra setup once you're using `.to_sql()` regularly, working across
more than one database engine, or using an ORM — none of which this
course needs beyond the engine-and-DataFrame pattern shown here.

## Key terms

| Term | Meaning |
|---|---|
| SQLAlchemy | A toolkit that wraps database drivers like `pyodbc` behind a common interface |
| `create_engine()` | Builds a reusable connection object from a database URL |
| `df.to_sql()` | Writes a whole DataFrame to a table in one call |
| `if_exists` | Controls what `to_sql()` does if the target table already exists |

## Lab

Build an engine for AdventureWorks2012 and use `pd.read_sql()` to count
rows in `HumanResources.Employee`.

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why
`.to_sql()` needs a SQLAlchemy engine instead of a raw `pyodbc`
connection, and what each `if_exists` option does.
