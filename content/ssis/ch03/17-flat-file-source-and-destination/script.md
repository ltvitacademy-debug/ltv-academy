# Script — Flat File Source & Destination

## Segment 1 (title)

Not every source is a database table. This lesson covers Flat File Source and Destination — reading and writing plain text files with SSIS.

## Segment 2 (steps: three formats)

Every flat file SSIS reads or writes is one of three formats. Delimited, where columns are split by a character like a comma or a tab. Fixed width, where every column has a fixed character width. And ragged right, where every column except the last is fixed, and the last column runs to the row delimiter instead, so it can vary in length.

## Segment 3 (screenshot: flat-file-connection-manager-general.jpg)

Here's where you actually set that format — not on the source or
destination, but on the Flat File connection manager itself. File
name, locale, code page, and right here, the Format dropdown: delimited,
fixed width, or ragged right, plus the header options next to it.
Configure it once, and every component that uses this connection
manager inherits it.

## Segment 4 (steps: connection manager)

Here's the part that surprises people coming from OLE DB: with flat
files, the source and destination components are thin wrappers, and
the real configuration lives on the Flat File connection manager
itself — the file path and format, and every column's name, type, and
length. Watch that default column length, though: it defaults to 50
characters for every string column. Run Suggest Column Types, or
resize columns yourself, before trusting those defaults in a real
package.

## Segment 5 (screenshot: flat-file-source-editor-connection.jpg)

Which is why the Flat File Source Editor itself looks this thin —
pick your connection manager, decide whether to retain null values as
true nulls instead of empty strings, which is off by default, and
Preview, same as every source you've configured so far.

## Segment 6 (screenshot: flat-file-source-columns-page.jpg)

The Columns page works exactly like OLE DB's — check the external
columns you want, rename an output column if you need to, and whatever
you leave unchecked never enters the data flow.

## Segment 7 (screenshot: flat-file-source-error-output.jpg)

And the Error Output page gives you the same per-column choice you saw
with OLE DB Source: ignore the problem, redirect the row to the error
output, or fail the whole component — decided column by column, not
all or nothing.

## Segment 8 (outro)

Next lesson, we add Data Viewers to a data flow path — so you can actually watch rows move through a buffer while a package runs, instead of just trusting that they did.
