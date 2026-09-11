# Script — OLE DB Source & Destination

## Segment 1 (title)

We've covered the theory — architecture, component categories, and
buffers. Now let's actually configure the pair you'll use in almost
every package in this course: OLE DB Source and OLE DB Destination.

## Segment 2 (steps: OLE DB Source Editor)

Double-click an OLE DB source and you get a three-page editor. The
Connection Manager page is where the real decision happens: how do you
tell it what to extract? Table or view just picks something by name.
Table name variable lets that name come from a package variable,
decided at run time. SQL command lets you write or build a real query,
and it can even be parameterized. And SQL command from variable hands
the entire query text to a variable. Whichever you pick, Preview is
sitting right there on that same page, showing up to two hundred rows
before you commit.

## Segment 3 (steps: OLE DB Destination Editor)

The destination editor looks similar, but its options are all about
loading efficiently. The mode that matters most is fast load — it uses
SQL Server's actual bulk-insert mechanism instead of issuing an INSERT
for every single row, and it's dramatically faster for anything but
tiny tables. Once you switch to fast load, you get real options right
in the editor: table lock, whether to check constraints during the
load, and rows per batch, which controls how many rows get committed
together. And on the Mappings page, remember — you don't have to map
every destination column, but leave a non-nullable one unmapped and
your load fails at run time.

## Segment 4 (outro)

Next, we'll do the same walkthrough for the other component you'll
reach for constantly — Flat File Source and Destination — for
whenever your data lives in a text file instead of a database.
