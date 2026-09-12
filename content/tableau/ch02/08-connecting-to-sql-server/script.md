# Script — Connecting Tableau to SQL Server

## Segment 1 (title)

This lesson connects Tableau directly to a database — Microsoft SQL Server. It builds entirely on the SQL you already know from T-SQL Development; this is about how Tableau uses that connection, not about SQL itself.

## Segment 2 (screenshot: connector list)

From the Connect pane, Microsoft SQL Server is the first server option listed. Click it, and Tableau asks for the same three things SSMS does: server name, optionally a database, and authentication — Windows Authentication or a SQL Server login.

## Segment 3 (screenshot: custom SQL)

Once connected, you can drag tables directly onto the canvas, or double-click New Custom SQL and write your own query. This is real T-SQL — bracketed dbo-schema syntax, a WHERE clause, all of it. Tableau treats the result as a single table you can use like any other.

## Segment 4 (steps: when to use which)

Drag tables directly for simple cases. Reach for Custom SQL when you need filtering or joins that are clearer written by hand. And Initial SQL is a separate feature entirely — setup SQL that runs once per connection, not the main query itself.

## Segment 5 (outro)

Next lesson tackles the choice you saw on every connection screen so far — Live connection versus Extract — and what it actually means for performance and freshness.
