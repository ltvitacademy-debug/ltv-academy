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

## Where sources and destinations live in the Toolbox

When the Data Flow tab is active, the **Favorites** category at the top
of the Toolbox puts **Source Assistant** and **Destination Assistant**
front and center — the fastest way to add either one, because they
guide you straight to a connection instead of making you hunt through
the full component list first.

![The SSIS Toolbox's Favorites category showing Source Assistant and Destination Assistant above the Common category's source and destination components, with the Source Assistant - Add New Source dialog open listing SQL Server, Excel, Flat File, and Oracle.](/courses/ssis/ch03/14-source-and-destination-components/source-assistant-add-new-source.png)
*Source Assistant — pick a source type, then pick or create the connection manager it needs.*

Click **Source Assistant**, pick a source type, and the assistant
either hands you a connection manager you already have or walks you
into creating a new one.

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

Whichever destination you pick, connecting it to an actual database
goes through the same **Connection Manager** dialog a source uses —
provider, server, authentication, and the database to write to:

![The Connection Manager dialog with Provider set to Native OLE DB\SQL Server Native Client 11.0, a Server name field, Windows Authentication selected, and a database picker.](/courses/ssis/ch03/14-source-and-destination-components/destination-connection-manager.png)
*The same Connection Manager dialog, whether you're opening it from a source or a destination's "New..." button.*

## Picking a component before you open its editor

Notice the pattern: almost every source has a same-named destination
counterpart (OLE DB, Flat File, Raw File), because most connection
managers work in both directions. The two exceptions worth remembering
are SQL Server Destination — a load-only, bulk-insert specialist with
no matching "SQL Server Source" — and Recordset Destination, which has
no source counterpart because its whole point is to keep data inside
the package rather than write it externally.

Here's what a real data flow built from these pieces actually looks
like once you've picked your components and wired them together:

![A real data flow: OLE DB Source feeding a Derived Column transformation into a Lookup, whose Match Output goes to an OLE DB Destination and whose No Match Output goes to a Multicast.](/courses/ssis/ch03/14-source-and-destination-components/data-flow-with-destinations.png)
*Source, transformations, and a destination — the same shapes from Lesson 13, now with real component names on them.*

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
