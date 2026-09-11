# Lesson 16 — OLE DB Source & Destination

**Chapter 3 · Data Flow Fundamentals · Lesson 16 of 49**

## What you'll learn

- The four data access modes the OLE DB Source Editor offers, and when
  to use each
- The three pages of the OLE DB Source Editor, and what each one
  configures
- The OLE DB Destination's fast-load access modes, and why they exist
- The Mappings page, and what happens when a destination column isn't
  mapped

## No dialog screenshot for this one

Current Microsoft documentation for both the OLE DB Source and OLE DB
Destination editors is entirely text-based option tables — the old
screenshots of these dialog boxes have been removed from the docs
site. This lesson uses two diagram slides built from the real, current
option names instead of a fabricated screenshot.

## The OLE DB Source Editor

You'll open this dialog by double-clicking an OLE DB Source component
you've dropped on the Data Flow surface. It has three pages:

- **Connection Manager page** — pick the OLE DB connection manager and
  the **data access mode**, which controls how the source decides what
  to extract:
  - **Table or view** — pick a table or view by name.
  - **Table name or view name variable** — the table/view name comes
    from a package variable, decided at run time.
  - **SQL command** — write (or build) a SQL query, optionally
    parameterized with `?` placeholders mapped to variables.
  - **SQL command from variable** — the entire query text comes from a
    variable.
- **Columns page** — maps each external (source) column to an output
  column, and lets you rename output columns.
- **Error Output page** — for each column, choose what happens on an
  error or truncation: ignore, redirect to the error output, or fail
  the component.

**Preview** is available from the Connection Manager page and shows up
to 200 rows before you commit to the configuration — always check it
before moving on.

## The OLE DB Destination Editor

The destination editor mirrors the source in structure, but its data
access modes are built around loading data efficiently, not just
selecting it. It offers five modes: **Table or view**, **Table or view
- fast load**, **Table name or view name variable**, **Table name or
view name variable - fast load**, and **SQL command**. Note there's no
"SQL command from variable" mode on the destination side, and the
destination doesn't support parameters at all — if you need a
parameterized INSERT, that's what the OLE DB Command transformation
is for.

The two **fast load** modes matter enough to call out on their own:

- They use SQL Server's bulk-insert mechanism instead of row-by-row
  `INSERT` statements, which is dramatically faster for large loads.
- They expose options straight in the editor: **Keep identity**, **Keep
  nulls**, **Table lock**, **Check constraints**, **Rows per batch**,
  and **Maximum insert commit size** — the batch size the destination
  commits during the load.
- If you're loading double-byte character set (DBCS) data, you
  actually need a fast-load mode (or the SQL Server Native Client
  provider) to avoid data corruption.

## Mapping columns on the way in

The destination's **Mappings** page is where you connect the upstream
data flow to the actual destination table: drag input columns onto
destination columns (or let SSIS auto-map by name). You don't have to
map every destination column — but if an unmapped column doesn't allow
nulls, the load will fail at run time. This is the same "know your
destination schema before you build the mapping" discipline you
practiced with T-SQL `INSERT` statements, just done visually.

## Key terms

| Term | Meaning |
|---|---|
| Data access mode | The OLE DB Source/Destination setting controlling how a table, view, or SQL command is chosen |
| Fast load | An OLE DB Destination access mode using SQL Server's bulk-insert mechanism instead of row-by-row inserts |
| Rows per batch / Maximum insert commit size | Fast-load options controlling how many rows are committed per batch during a bulk load |
| Mappings page | The OLE DB Destination Editor page where input columns are connected to destination columns |
| Preview | A button on the source editor's Connection Manager page showing up to 200 rows before you finish configuring |

## Lab

1. Add an OLE DB source to a data flow, point it at any table you have
   access to (AdventureWorks2012 or Northwind, per this course's SQL
   labs), set the data access mode to **Table or view**, and use
   **Preview** to confirm the rows look right.
2. Add an OLE DB destination downstream, pick a staging table, and
   switch its data access mode to **Table or view - fast load**.
   Compare the options available on the Connection Manager page to
   the plain **Table or view** mode.
3. On the destination's **Mappings** page, deliberately leave one
   nullable column unmapped and one non-nullable column unmapped.
   Run the package and observe which one fails, and why.

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: what
is fast load, why does it exist, and what happens if you leave a
non-nullable destination column unmapped?
