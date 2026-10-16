# Lesson 26 — Connecting Python to SQL Server

**Chapter 5 · Python for Data Engineers · Lesson 26 of 48**

## What you'll learn

- Installing and using `pyodbc` to connect Python to SQL Server
- The anatomy of a connection string
- Connecting to AdventureWorks2012 — the same real sample database this
  platform's T-SQL Development course uses
- Testing a connection and running a first query
- Why data engineers need direct database connectivity, not just CSV exports

## Installing pyodbc

```python
pip install pyodbc
```

`pyodbc` is the standard way to talk to SQL Server (and most other
databases) from Python over ODBC — the Open Database Connectivity
standard. It needs an ODBC driver installed on your machine; on Windows
this is usually "ODBC Driver 17 for SQL Server" or "ODBC Driver 18 for
SQL Server", installed alongside SQL Server or SQL Server Management
Studio.

## Anatomy of a connection string

```python
import pyodbc

conn = pyodbc.connect(
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=localhost;"
    "DATABASE=AdventureWorks2012;"
    "Trusted_Connection=yes;"
)
```

Four pieces, each separated by a semicolon:

- `DRIVER` — which ODBC driver to use
- `SERVER` — the SQL Server instance (`localhost` for a local install,
  or `localhost\SQLEXPRESS` for a named instance)
- `DATABASE` — the specific database on that server
- `Trusted_Connection=yes` — use Windows authentication instead of a
  SQL login and password

If your SQL Server instance uses SQL authentication instead, you'd add
`UID=` and `PWD=` — and in real pipelines, those values come from
environment variables, never hardcoded in the script (Chapter 7 covers
this properly).

## Testing the connection

```python
import pyodbc

conn = pyodbc.connect(
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=localhost;DATABASE=AdventureWorks2012;Trusted_Connection=yes;"
)

cursor = conn.cursor()
cursor.execute("SELECT @@VERSION;")
row = cursor.fetchone()
print(row[0])

conn.close()
```

`cursor.execute()` runs any SQL statement; `fetchone()` pulls back a
single row as a tuple. This is the lowest-level way to talk to the
database — Lesson 27 moves straight to pandas, which is what you'll
actually use day to day.

## A first real query

```python
cursor.execute("SELECT TOP 5 Name, ListPrice FROM Production.Product WHERE ListPrice > 0;")
for row in cursor.fetchall():
    print(row.Name, row.ListPrice)
```

`Production.Product` is a real table in AdventureWorks2012 — the same
one used throughout this site's T-SQL Development course. `fetchall()`
returns every matching row; `fetchone()` returns just the next one.
For anything beyond a quick check, you'll want pandas instead of
looping over cursor rows by hand.

## Why data engineers connect directly

A CSV export is a snapshot — accurate the moment it's created, stale
the moment someone updates the source table. A direct connection means
your script always reads current data, and lets the database do what
it's good at: filtering, sorting, and joining, inside the `WHERE`,
`ORDER BY`, and `JOIN` clauses, instead of pulling an entire table into
Python and filtering it there.

## Key terms

| Term | Meaning |
|---|---|
| `pyodbc` | Python's library for connecting to databases over ODBC |
| Connection string | The driver, server, database, and authentication details, as one string |
| `cursor` | The object you use to execute SQL and fetch results |
| `Trusted_Connection` | Windows authentication, instead of a SQL username/password |

## Lab

If you have SQL Server and AdventureWorks2012 set up (from the T-SQL
Development course), connect and count the rows in `Production.Product`:

```python
import pyodbc

conn = pyodbc.connect(
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=localhost;DATABASE=AdventureWorks2012;Trusted_Connection=yes;"
)
cursor = conn.cursor()
cursor.execute("SELECT COUNT(*) FROM Production.Product;")
print(cursor.fetchone()[0])
conn.close()
```

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: what
each of the four pieces of a connection string does, and why a data
engineer would connect directly to a database instead of always
exporting to CSV first.
