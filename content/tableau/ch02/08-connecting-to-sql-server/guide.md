# Lesson 8 — Connecting Tableau to SQL Server

**Chapter 2 · Connecting & Preparing Data · Lesson 8 of 95**

## What you'll learn

- How to start a Microsoft SQL Server connection from Tableau Desktop's
  Connect pane
- What information Tableau actually asks for (server, database,
  authentication) and how that maps to what you already know from
  T-SQL Development
- How to use Custom SQL to hand-write the exact query Tableau runs,
  instead of just picking a table
- When you'd reach for Custom SQL versus just selecting tables directly

## This lesson assumes your SQL knowledge

This course assumes you already know SQL from T-SQL Development
elsewhere in this catalog. Nothing here re-teaches `SELECT`, `WHERE`,
or joins — this lesson is entirely about how Tableau *uses* a SQL
Server connection, not about SQL itself.

## Starting the connection

From the start page, under **Connect > To a Server**, **Microsoft SQL
Server** is the first option listed:

![Real screenshot of the Tableau Connect pane's 'To a Server' section, listing Microsoft SQL Server, MySQL, Oracle, and Amazon Redshift, with 'Sample - Superstore' visible under Saved Data Sources.](/courses/tableau/ch02/08-connecting-to-sql-server/connect-to-server-list.png)
*Microsoft SQL Server is the first server connector Tableau lists.*
Source: [Tableau Help — Get Started Tutorial](https://help.tableau.com/current/guides/get-started-tutorial/en-us/get-started-tutorial-connect.htm)

Clicking it opens a connection dialog asking for:

- **Server** — the SQL Server instance name or address (same thing
  you'd put in SSMS's "Server name" box)
- **Database** — optional; leave blank to see all databases you have
  access to, or specify one directly
- **Authentication** — Windows Authentication (uses your logged-in
  Windows credentials) or a specific SQL Server username/password,
  exactly the same two options SSMS gives you

If the SQL Server driver isn't installed on your machine, Tableau
shows a message with a link to download it — this is a one-time setup
step, separate from Tableau itself.

## Picking tables, or writing your own query

Once connected, Tableau's Data Source page lets you drag tables onto
the canvas — the same tables you'd see in SSMS's Object Explorer under
that database. For simple cases, that's all you need.

For anything more specific — a filtered subset, a multi-table join
written your way, or logic that's easier in T-SQL than in Tableau's
drag-and-drop join UI — double-click **New Custom SQL** and write it
directly:

![Real screenshot of Tableau's Edit Custom SQL dialog containing the query: SELECT * FROM [dbo].[Orders] WHERE [Orders].[Ship Mode] = 'Standard Class', with Preview Results, Insert Parameter, OK, and Cancel buttons.](/courses/tableau/ch02/08-connecting-to-sql-server/custom-sql.png)
*A real Custom SQL query — this is standard T-SQL, brackets and all.*
Source: [Tableau Help — Connect to a Custom SQL Query](https://help.tableau.com/current/pro/desktop/en-us/customsql.htm)

Notice this is exactly the T-SQL syntax you already know — bracketed
identifiers (`[dbo].[Orders]`), a `WHERE` clause, the works. Tableau
treats the result of a Custom SQL query as if it were a single table,
which you can then use in the view like any other.

## Custom SQL vs. picking tables directly

| Approach | When to use it |
|---|---|
| Drag tables directly | Simple cases — one table, or a join Tableau's own join UI handles cleanly |
| Custom SQL | You need filtering, complex joins, or T-SQL logic that's clearer written by hand than built visually |
| Initial SQL (Data Source > Edit Connection) | Run setup SQL once per connection (e.g., a session-level `SET` statement) — different from Custom SQL, which defines the actual table |

## Key terms

| Term | Meaning |
|---|---|
| Server | The SQL Server instance Tableau connects to — same value as SSMS's Server name |
| Authentication | Windows Authentication vs. SQL Server username/password |
| Custom SQL | A hand-written query Tableau treats as a single virtual table |
| Initial SQL | Setup SQL that runs once at connection time, separate from the main query |

## Lab

1. If you have access to a SQL Server instance (from T-SQL Development or your own setup), connect Tableau Desktop to it and note the Server/Database/Authentication fields.
2. Try dragging a table directly onto the Data Source canvas, then try connecting to the same table via Custom SQL with a `WHERE` clause instead.
3. Compare the row counts between the two approaches to confirm the Custom SQL filter actually applied.

## Check yourself

You're ready for Lesson 9 when you can explain, in your own words, when
you'd reach for Custom SQL instead of just dragging a table onto the
canvas.
