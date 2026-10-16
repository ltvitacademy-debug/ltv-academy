# Lesson 31 — Transactions & Error Handling in Database Code

**Chapter 5 · Python for Data Engineers · Lesson 31 of 48**

## What you'll learn

- What a transaction actually is, and why pyodbc opens one implicitly
- `conn.rollback()` — undoing a failed write before it's committed
- Wrapping database writes in `try`/`except`/`finally`
- A full, safe write pattern you'll reuse for the rest of this course

## A transaction is just "not permanent yet"

Lesson 28 showed that `pyodbc` writes aren't permanent until
`conn.commit()` runs. Everything between opening the connection and
calling `commit()` is one transaction — either all of it becomes
permanent, or none of it does. That "all or nothing" guarantee is the
entire point of a transaction: a pipeline that writes ten rows and
fails on the eleventh shouldn't leave ten orphaned rows behind.

## rollback(): undoing before committing

```python
import pyodbc

conn = pyodbc.connect(
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=localhost;DATABASE=AdventureWorks2012;Trusted_Connection=yes;"
)
cursor = conn.cursor()

try:
    cursor.execute("TRUNCATE TABLE Staging.ProductSnapshot;")
    cursor.executemany(
        "INSERT INTO Staging.ProductSnapshot (ProductName, Quantity, UnitPrice) VALUES (?, ?, ?);",
        [("Trail Runner GTX", 2, 129.99), ("Alpine 2P Tent", 1, 249.50)]
    )
    conn.commit()
except pyodbc.Error as err:
    conn.rollback()
    print(f"Load failed, rolled back: {err}")
finally:
    conn.close()
```

If `executemany()` raises partway through — a bad value, a constraint
violation, a lost connection — the `except` block calls
`conn.rollback()`, which discards every uncommitted change in that
transaction, including the earlier `TRUNCATE`. The staging table ends
up exactly as it was before the script ran, instead of half-truncated
and half-loaded.

## Catching the right exception

```python
try:
    cursor.execute("INSERT INTO Staging.ProductSnapshot (Quantity) VALUES (?);", ("not a number",))
    conn.commit()
except pyodbc.Error as err:
    conn.rollback()
    print("Database error:", err)
except Exception as err:
    conn.rollback()
    print("Unexpected error:", err)
    raise
```

`pyodbc.Error` covers database-specific problems — constraint
violations, type mismatches, connection drops. A bare `except
Exception` after it catches anything else, logs it, rolls back just as
safely, then re-raises so the failure isn't silently swallowed. This
pattern — specific exception first, general exception second, re-raise
what you don't expect — is Lesson 16's exception handling applied
directly to database code.

## Putting it together: a safe write function

```python
def load_rows(rows, conn):
    cursor = conn.cursor()
    try:
        cursor.execute("TRUNCATE TABLE Staging.ProductSnapshot;")
        cursor.executemany(
            "INSERT INTO Staging.ProductSnapshot (ProductName, Quantity, UnitPrice) VALUES (?, ?, ?);",
            rows
        )
        conn.commit()
        return len(rows)
    except pyodbc.Error:
        conn.rollback()
        raise
```

This is the shape Chapter 6's ETL pipeline builds the load step
around: do the work inside a `try`, commit only on full success, roll
back and re-raise on any database error, and let the caller decide
what to do about a failed load.

## Key terms

| Term | Meaning |
|---|---|
| Transaction | A set of writes that become permanent together, or not at all |
| `conn.rollback()` | Discards every uncommitted change in the current transaction |
| `pyodbc.Error` | The base exception class for pyodbc database errors |

## Lab

Wrap Lesson 28's `executemany()` INSERT in a `try`/`except`/`finally`
that rolls back on `pyodbc.Error` and always closes the connection.

## Check yourself

You're ready for Chapter 6 when you can explain, without looking: what
`conn.rollback()` actually undoes, and why catching `pyodbc.Error`
before a bare `Exception` matters.
