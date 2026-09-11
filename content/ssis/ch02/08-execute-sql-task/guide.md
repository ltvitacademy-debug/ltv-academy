# Lesson 8 — Execute SQL Task

**Chapter 2 · Control Flow · Lesson 8 of 49**

## What you'll learn

- What the Execute SQL Task actually runs, and the situations it's built
  for
- The connection managers it can use, and how SQLSourceType controls
  where the SQL statement itself comes from
- How to map variables to parameters, and the parameter-marker syntax
  each connection type expects
- The four ResultSet types and which one to pick for a given SQL
  statement

## What the Execute SQL Task is for

The **Execute SQL Task** runs SQL statements or stored procedures
directly from a package's control flow — no Data Flow Task required.
It's one of the tasks you'll use in nearly every package you build,
for jobs like:

- Truncating a table before loading fresh data into it
- Creating, altering, or dropping tables and views
- Re-creating fact and dimension tables before a warehouse load
- Running a stored procedure, optionally capturing its result set
- Saving the rowset a query returns into a variable for later tasks to
  use

It can hold a single statement or several that run one after another —
and when you combine it with the For Loop or Foreach Loop containers
from Lesson 10, it can run the same statement repeatedly with different
parameter values each time.

## Connecting to a data source

The task doesn't talk to a database on its own — it uses whichever
connection manager you assign it, and the type of that connection
manager determines the parameter syntax you're allowed to use later.

| Connection type | Connection manager |
|---|---|
| OLE DB | OLE DB Connection Manager |
| ODBC | ODBC Connection Manager |
| ADO | ADO Connection Manager |
| ADO.NET | ADO.NET Connection Manager |
| EXCEL | Excel Connection Manager |
| SQLMOBILE | SQL Server Compact Edition Connection Manager |

## Where the SQL statement comes from — SQLSourceType

The **SQLSourceType** property has three options:

- **Direct input** — you type the statement right into the task (or
  build it with Query Builder).
- **File connection** — the statement lives in a text file, and the
  task reads it through a File Connection Manager.
- **Variable** — the statement is the value of a variable, set at
  design time or computed at run time.

## Configuring the task

Four things drive most of the configuration work, whichever way you get
there — through **SSIS Designer** or programmatically:

- **Connection** — the type of connection manager and which specific
  connection to use.
- **SQLSourceType** — direct input, file connection, or variable, as
  above.
- **Parameter Mapping** — binding variables to the **Input**, **Output**,
  and **ReturnValue** parameters your statement or stored procedure
  uses.
- **ResultSet** — what kind of result, if any, comes back: **None**,
  **Single row**, **Full result set**, or **XML**.

## Parameters and parameter markers

Every connection type has its own marker syntax, and getting this wrong
is one of the most common Execute SQL Task mistakes:

| Connection type | Parameter marker | Parameter name |
|---|---|---|
| OLE DB, EXCEL, ODBC | `?` | Ordinal number — 0, 1, 2… (ODBC starts at 1) |
| ADO | `?` | Any name except an integer — Param1, Param2… |
| ADO.NET | `@name` | `@name` — matches the marker directly |

For example, an OLE DB query that filters on a range uses two `?`
markers, mapped to parameters named `0` and `1` in that order:

```sql
SELECT * FROM Production.Product
WHERE ProductID > ? AND ProductID < ?
```

The order of your parameter mappings must match the order the markers
appear in the statement — the task binds them positionally, not by
name.

## Result sets

Whether a result set comes back at all depends on the statement: a
`SELECT` typically returns one, an `INSERT` or `UPDATE` doesn't. Pick
the matching **ResultSet** type so the task knows what to expect:

- **None** — for statements with no rows to return.
- **Single row** — for a statement that returns exactly one row, like a
  `COUNT(*)`.
- **Full result set** — for a multi-row `SELECT`, bound to an **Object**
  variable (an ADO Recordset or, for ADO.NET connections, a DataSet).
- **XML** — for a `SELECT ... FOR XML` statement, bound to a **String**
  or **Object** variable.

## Key terms

| Term | Meaning |
|---|---|
| SQLSourceType | Where the task's SQL statement comes from: Direct input, File connection, or Variable |
| Parameter Mapping | The task page that binds package variables to Input, Output, and ReturnValue parameters |
| ResultSet | The expected shape of the returned data: None, Single row, Full result set, or XML |
| BypassPrepare | Skips the SQL prepare phase — set true when using parameterized OLE DB statements |
| Query Builder | The graphical tool inside the Execute SQL Task Editor for composing a statement visually |

## Lab

1. Add an **Execute SQL Task** to the control flow you built in
   Lesson 7's lab. Point it at an OLE DB connection manager to a test
   database (AdventureWorks2012 works well, per the course's SQL labs).
2. Set **SQLSourceType** to **Direct input** and enter:
   `SELECT COUNT(*) FROM Production.Product WHERE ProductID > ?`
3. On **Parameter Mapping**, add a mapping for parameter `0`, direction
   **Input**, bound to an integer variable you create with a default
   value like `500`.
4. Set **ResultSet** to **Single row**, and on the **Result Set** page,
   map result name `0` to a new integer variable. Run the package and
   check the variable's final value in the Locals window.

## Check yourself

You're ready for Lesson 9 when you can explain, without looking, why an
OLE DB connection's parameter markers are numbered `0`, `1`, `2`… while
an ADO.NET connection's parameters are named directly with an `@` sign.
