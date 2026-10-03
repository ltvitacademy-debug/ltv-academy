# Script — Source & Destination Components

## Segment 1 (title)

Now that you know the shape every data flow component takes, let's
tour what's actually sitting in the Toolbox — the real source and
destination components you have to choose from.

## Segment 2 (screenshot: source-assistant-add-new-source.png)

The Favorites category puts two shortcuts right at the top: Source
Assistant and Destination Assistant. Click Source Assistant and it
asks you one question first — what kind of source is this, SQL Server,
Excel, Flat File, Oracle — before it either hands you a connection
manager you already have or walks you into building a new one. It's
the fastest path to a correctly configured source, and it's what you'll
reach for by default.

## Segment 3 (steps: common sources)

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

## Segment 4 (screenshot: destination-connection-manager.png)

Whichever side you're on, source or destination, connecting to an
actual database goes through this same dialog — a provider, a server
name, how to authenticate, and the database itself. Learn it once here
and you've learned it for every OLE DB component in this course.

## Segment 5 (steps: common destinations)

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

## Segment 6 (screenshot: data-flow-with-destinations.png)

And here's all of it put together in a real data flow: an OLE DB
Source feeding a Derived Column, into a Lookup that splits into two
directions — a match goes to an OLE DB Destination, and a non-match
goes to a Multicast instead of just getting dropped. Same shapes from
last lesson, now with real component names on every box.

## Segment 7 (outro)

You now know what's available before you configure anything. Next,
we'll go one level deeper and look at how the data flow engine actually
moves rows between these components in memory — the buffer.
