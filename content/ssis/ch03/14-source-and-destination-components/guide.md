# Lesson 14 — Source & Destination Components

**Chapter 3 · Data Flow Fundamentals · Lesson 14 of 49**

## What you'll learn

- The real, documented source components available in the Data Flow
  Toolbox, and what each one connects to
- The real, documented destination components, and what each one writes
  to
- Why "Raw File" is the odd one out — SSIS's own native format instead
  of an external one
- How to pick the right component before you even open its editor

## No real screenshot for this one

Modern SSIS documentation dropped the old Toolbox screenshots — the
official pages for the Toolbox and for every individual source and
destination are text-only descriptions now. Rather than fake a
screenshot of a dialog that doesn't exist in the current docs, this
lesson uses two diagram slides built from the real, current component
names and descriptions straight from Microsoft Learn.

## Common source components

When the Data Flow tab is active, the Toolbox's **Favorites** and
**Common** categories fill with source components. The ones you'll use
constantly:

- **OLE DB Source** — extracts from any OLE DB-compliant relational
  database (SQL Server, Access, and others) using a table, a view, or a
  SQL command.
- **Flat File Source** — reads a single delimited, fixed-width, or
  ragged-right text file, using a Flat File connection manager.
- **Excel Source** — extracts from Excel workbooks (2003 and earlier
  use the Excel source; 2007 and later use an OLE DB source with an
  Excel connection manager instead).
- **XML Source** — extracts from an XML document, with the schema
  provided by an inline DTD, an XSD, or a separate schema file.
- **ADO NET Source** — extracts through a .NET provider instead of OLE
  DB, useful when a data source only ships an ADO.NET driver.
- **Raw File Source** — reads SSIS's own native raw-data format. Because
  the data is already in SSIS's internal representation, there's no
  parsing or translation — it's the fastest source there is, but only
  useful for data that a Raw File *destination* wrote in an earlier
  package run.

## Common destination components

The matching set of destinations:

- **OLE DB Destination** — loads into any OLE DB-compliant database.
  The one you'll reach for by default in this course.
- **Flat File Destination** — writes rows to a delimited or fixed-width
  text file.
- **SQL Server Destination** — loads into SQL Server tables using the
  same high-speed bulk-insert path as the Bulk Insert task, while still
  letting the data flow apply transformations first.
- **Raw File Destination** — writes SSIS's native raw format. A common
  pattern: stage an expensive transformation's results to a raw file
  once, then reload that raw file quickly for repeated testing instead
  of re-running the whole upstream pipeline every time.
- **Recordset Destination** — writes rows into an in-memory ADO
  recordset stored in a package variable, so a Script Task or another
  part of the package can use the results without landing them
  anywhere external at all.

## Picking a component before you open its editor

Notice the pattern: almost every source has a same-named destination
counterpart (OLE DB, Flat File, Raw File), because most connection
managers work in both directions. The two exceptions worth remembering
are SQL Server Destination — a load-only, bulk-insert specialist with
no matching "SQL Server Source" — and Recordset Destination, which has
no source counterpart because its whole point is to keep data inside
the package rather than write it externally.

## Key terms

| Term | Meaning |
|---|---|
| OLE DB Source/Destination | Reads/writes any OLE DB-compliant database using a table, view, or SQL command |
| Flat File Source/Destination | Reads/writes a single delimited, fixed-width, or ragged-right text file |
| Raw File Source/Destination | Reads/writes SSIS's own native binary format — no parsing, fastest possible I/O |
| SQL Server Destination | Bulk-loads into SQL Server tables with the same speed as Bulk Insert, but transformable first |
| Recordset Destination | Writes rows into an in-memory ADO recordset stored in a package variable |

## Lab

1. Open the Data Flow tab of any package and expand every category in
   the SSIS Toolbox. Find OLE DB Source, Flat File Source, Excel
   Source, and Raw File Source, and read each one's tooltip
   description at the bottom of the Toolbox.
2. Do the same for the destination side — locate OLE DB Destination,
   Flat File Destination, SQL Server Destination, and Recordset
   Destination.
3. For each of these three scenarios, name the source and destination
   component you'd pick: (a) loading a CSV export into SQL Server, (b)
   caching an expensive lookup's results for fast reuse during testing,
   (c) handing query results to a Script Task without writing them
   anywhere external.

## Check yourself

You're ready for Lesson 15 when you can name at least four source
components and four destination components from memory, and explain
what makes Raw File different from every other component in that list.
