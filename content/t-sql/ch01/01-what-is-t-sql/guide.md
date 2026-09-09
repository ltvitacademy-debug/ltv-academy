# Lesson 1 — What Is T-SQL? A Tour of SSMS

**Chapter 1 · T-SQL Foundations · Lesson 1 of 10**

## What you'll learn

- What T-SQL is and how it relates to standard SQL
- What SQL Server Management Studio (SSMS) is and why it's the tool of this course
- The three panels you'll live in every lesson: Object Explorer, Query Editor, Results
- How to connect, open a New Query window, and run your first statement
- The AdventureWorks2012 and AdventureWorksDW2014 databases we'll use for every lab

## What is T-SQL?

**T-SQL (Transact-SQL)** is Microsoft's extension of standard SQL (Structured
Query Language) built into SQL Server and Azure SQL. Plain SQL gives you the
core vocabulary — `SELECT`, `INSERT`, `UPDATE`, `DELETE` — that every relational
database understands. T-SQL adds procedural pieces on top: variables, `IF/ELSE`
branching, loops, stored procedures, error handling, and transaction control.
That combination is what lets you write not just single queries, but entire
programs that run inside the database engine.

This course teaches T-SQL from the ground up: querying, filtering, joining,
grouping, subqueries, programming constructs, performance tuning, and the
database-design and data-warehousing concepts every SQL Server developer needs.

## What is SQL Server Management Studio (SSMS)?

SSMS is Microsoft's free, integrated environment for writing and running T-SQL
against SQL Server. It's where developers and database administrators connect
to a server, browse its objects, write queries, and see results — all in one
window. Every lesson in this course happens inside SSMS.

![The SQL Server Management Studio interface, showing the menu bar, toolbar, Object Explorer on the left, and an open query tab on the right.](/courses/t-sql/ch01/01-what-is-t-sql/ssms.png)
*SSMS's main window — Object Explorer on the left, Query Editor on the right. You'll spend this entire course inside this layout.*

## The three panels you'll live in

| Panel | What it's for |
|---|---|
| **Object Explorer** | A tree view of every server, database, table, view, and stored procedure you have access to |
| **Query Editor** | Where you type and run T-SQL — one or more tabbed query windows |
| **Results grid** | The rows your query returned, plus a Messages tab for errors and row counts |

![SSMS's Object Explorer expanded to show the Databases node, with AdventureWorks selected and its Tables and Views folders visible.](/courses/t-sql/ch01/01-what-is-t-sql/connect-object-explorer.png)
*Object Explorer, connected to a server. Expand Databases to see every database you can query — this is where AdventureWorks2012 and AdventureWorksDW2014 will live for our labs.*

## Connecting and opening a query window

Once SSMS is connected to a server, click **New Query** on the toolbar to open
a fresh Query Editor tab targeted at whichever database is selected in the
dropdown next to it.

![The New Query button on the SSMS toolbar, with a database dropdown showing the currently selected database.](/courses/t-sql/ch01/01-what-is-t-sql/new-query.png)
*New Query opens a blank tab pointed at the database selected in this dropdown — always check it before you run anything.*

Type a statement, then click **Execute** (or press F5) to run it.

![The Execute button on the SSMS toolbar, next to the database selector.](/courses/t-sql/ch01/01-what-is-t-sql/execute.png)
*Execute (or F5) sends whatever's in the Query Editor to the server.*

```sql
SELECT * FROM dbo.Customers;
```

The results land in a grid beneath your query, with column headers pulled
straight from the table.

![A SSMS results grid showing four rows returned from a Customers table, with CustomerId, Name, Location, and Email columns.](/courses/t-sql/ch01/01-what-is-t-sql/query-results.png)
*Every query you run this course lands here — the Results grid, with a Messages tab alongside it for row counts and errors.*

## The databases we'll use

Every lab in this course runs against **real Microsoft sample databases**, not
invented tables:

- **AdventureWorks2012** — a full OLTP (transactional) database for a fictional
  bicycle manufacturer: customers, products, orders, employees. This is where
  Chapters 1–11 live.
- **AdventureWorksDW2014** — the *data warehouse* version of the same company:
  fact and dimension tables already shaped for reporting. Chapter 12 (Data
  Warehouse Concepts) uses this one.

Every lesson from here on includes a script you can copy straight into a New
Query window in SSMS and run against these databases yourself.

## Key terms

| Term | Meaning |
|---|---|
| T-SQL | Microsoft's procedural extension of standard SQL |
| SSMS | SQL Server Management Studio — the tool you write and run T-SQL in |
| Object Explorer | The tree view of servers, databases, and their objects |
| Query Editor | The tabbed window where you type and run T-SQL |
| Results grid | Where returned rows are displayed |
| AdventureWorks2012 | The OLTP sample database used for Chapters 1–11 |
| AdventureWorksDW2014 | The data-warehouse sample database used for Chapter 12 |

## Lab

1. Open SSMS and connect to your SQL Server instance.
2. In Object Explorer, expand **Databases** and confirm you can see
   **AdventureWorks2012**. If you don't have it yet, download and restore it
   from Microsoft's sample-database releases before Lesson 2.
3. Click **New Query**, select AdventureWorks2012 from the database dropdown,
   and run:

```sql
SELECT * FROM Person.Person;
```

4. Confirm you see rows in the Results grid and a row count in the Messages tab.

## Check yourself

You're ready for Lesson 2 when you can answer, without looking: what are the
three panels of SSMS, and what button (or key) runs a query?
