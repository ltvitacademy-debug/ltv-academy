# Script — OLE DB Source & Destination

## Segment 1 (title)

We've covered the theory — architecture, component categories, and
buffers. Now let's actually configure the pair you'll use in almost
every package in this course: OLE DB Source and OLE DB Destination.

## Segment 2 (screenshot: source-data-access-mode.png)

Double-click an OLE DB source and you land on the Connection Manager
page. Pick your connection manager, then decide the data access mode —
and this dropdown is the real decision point. Four options, right
there.

## Segment 3 (steps: OLE DB Source Editor)

Table or view just picks something by name. Table name variable lets
that name come from a package variable, decided at run time. SQL
command lets you write or build a real query, and it can even be
parameterized. And SQL command from variable hands the entire query
text to a variable.

## Segment 4 (screenshot: source-sql-command-preview.png)

Whichever mode you pick, Preview is sitting right there on the same
page — click it, and you get up to two hundred rows back immediately.
Always check this before you commit to a configuration; it's the
fastest way to catch a wrong join or a typo in a column name before
it costs you a failed run.

## Segment 5 (screenshot: columns-page-select.png)

The Columns page is next — check the external columns you actually
want, and rename any output column if the name downstream needs to be
different from the source. Whatever you leave unchecked here never
enters the data flow at all.

## Segment 6 (steps: OLE DB Destination Editor)

The destination editor looks similar, but its options are all about
loading efficiently. The mode that matters most is fast load — it uses
SQL Server's actual bulk-insert mechanism instead of issuing an INSERT
for every single row, and it's dramatically faster for anything but
tiny tables. Once you switch to fast load, you get real options right
in the editor: table lock, whether to check constraints during the
load, and rows per batch, which controls how many rows get committed
together.

## Segment 7 (screenshot: destination-column-mappings.png)

And on the Mappings page, this is where it all connects — input
columns on the left, destination columns on the right, drag a line
between them, or just right-click and let SSIS map items by matching
names automatically. Remember: you don't have to map every destination
column, but leave a non-nullable one unmapped and your load fails at
run time.

## Segment 8 (outro)

Next, we'll do the same walkthrough for the other component you'll
reach for constantly — Flat File Source and Destination — for
whenever your data lives in a text file instead of a database.
