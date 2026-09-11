# Script — Source & Destination Components

## Segment 1 (title)

Now that you know the shape every data flow component takes, let's
tour what's actually sitting in the Toolbox — the real source and
destination components you have to choose from.

## Segment 2 (steps: common sources)

Sources meet your data wherever it already lives. OLE DB Source is the
one you'll use most — it connects to any OLE DB-compliant database,
whether that's SQL Server or something else, using a table, a view, or
a SQL command. Flat File Source reads a single text file — delimited,
fixed-width, whatever format it's in. Excel Source handles older Excel
workbooks — 2007 and later actually go through an OLE DB source
instead. And then there's Raw File Source, which is the odd one out —
it reads SSIS's own native binary format, so there's no parsing at
all, which makes it the fastest source that exists. The catch is it
only reads data a Raw File destination already wrote.

## Segment 3 (steps: common destinations)

On the destination side, almost every source has a matching
counterpart — OLE DB Destination, Flat File Destination, Raw File
Destination — because the same connection managers work in both
directions. Two exceptions worth remembering: SQL Server Destination
is a load-only bulk-insert specialist for SQL Server tables, faster
than OLE DB Destination, but with no matching source. And Recordset
Destination writes rows into an in-memory ADO recordset stored in a
variable, so a Script Task can use the results without ever writing
them anywhere external — that one has no source counterpart either,
because keeping data inside the package is the entire point.

## Segment 4 (outro)

You now know what's available before you configure anything. Next,
we'll go one level deeper and look at how the data flow engine actually
moves rows between these components in memory — the buffer.
