# Lesson 2 — Connecting to a Database & the USE Statement

**Chapter 1 · T-SQL Foundations · Lesson 2 of 10**

## What you'll learn

- How to connect SSMS to a SQL Server instance
- Windows Authentication vs. SQL Server Authentication
- How SSMS tracks which database your query runs against
- The `USE` statement — switching database context in code, not just the dropdown
- Confirming your current database with `DB_NAME()`

## Connecting to a server

When you open SSMS, the first thing it asks for is a server to connect to.

![The SSMS Connect dialog, with fields for Server Name, Authentication, User Name, Password, and Database Name.](/courses/t-sql/ch01/02-connecting-and-use/connect-dialog.png)
*The Connect dialog. Server Name is the instance you're targeting; Authentication decides how you prove who you are.*

Two authentication modes matter here:

| Mode | How it works |
|---|---|
| **Windows Authentication** | Uses your current Windows login — no password field needed |
| **SQL Server Authentication** | A username/password stored *inside* SQL Server itself, separate from Windows |

(We cover both authentication modes — and why a server might allow one, the
other, or both — in Chapter 8.)

Once connected, the server appears in Object Explorer, expanded to show its
databases and every other object on that instance.

![SSMS Object Explorer showing a connected server node expanded to reveal Databases, Security, Server Objects, and other folders.](/courses/t-sql/ch01/02-connecting-and-use/connect-on-prem.png)
*A live connection in Object Explorer. Everything under this node belongs to the instance you just connected to.*

## Database context: the dropdown vs. USE

Every Query Editor tab runs against exactly **one database at a time** — its
*database context*. You already saw the dropdown on the toolbar that sets
this visually:

![The database dropdown on the SSMS toolbar, expanded to show master, model, msdb, tempdb, and a user database.](/courses/t-sql/ch01/02-connecting-and-use/change-db.png)
*Clicking the dropdown and picking a database is the mouse-driven way to switch context.*

But relying on the dropdown alone is risky — it's easy to run a script against
the wrong database without noticing. T-SQL gives you a statement that sets
context **in the script itself**, so the script is unambiguous no matter what
the dropdown currently shows:

```sql
USE AdventureWorks2012;
GO
```

`USE` switches the current connection's database context to the one named.
The `GO` after it is a **batch separator** — it tells SSMS "everything above
this line is one batch, send it now." You'll see `GO` constantly throughout
this course; we cover it properly in Chapter 7.

Every script in this course opens with a `USE` statement for exactly this
reason: so you always know which database it's meant to run against, without
having to check the dropdown.

## Confirming your context

If you're ever unsure which database a query is about to run against:

```sql
SELECT DB_NAME() AS CurrentDatabase;
```

`DB_NAME()` is a built-in T-SQL function that returns the name of the
database your session is currently connected to.

## Key terms

| Term | Meaning |
|---|---|
| Windows Authentication | Login using your current Windows account |
| SQL Server Authentication | Login using a username/password stored in SQL Server |
| Database context | Which database a query currently runs against |
| `USE` | Statement that sets database context in code |
| `GO` | Batch separator recognized by SSMS (not T-SQL itself) |
| `DB_NAME()` | Built-in function returning the current database's name |

## Lab

Open a New Query window in SSMS and run each of these in order, checking the
Messages tab and the toolbar dropdown after each one:

```sql
SELECT DB_NAME() AS CurrentDatabase;

USE AdventureWorks2012;
GO

SELECT DB_NAME() AS CurrentDatabase;

USE AdventureWorksDW2014;
GO

SELECT DB_NAME() AS CurrentDatabase;
```

Watch the toolbar dropdown update itself each time `USE` runs — that's
confirmation the statement worked, independent of what `SELECT DB_NAME()`
tells you.

## Check yourself

You're ready for Lesson 3 when you can answer, without looking: what does
`USE` do, why is `GO` needed after it, and how would you check your current
database with a single `SELECT`?
