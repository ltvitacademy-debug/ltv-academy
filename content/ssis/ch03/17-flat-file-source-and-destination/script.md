# Script — Flat File Source & Destination

## Segment 1 (title)

Not every source is a database table. This lesson covers Flat File Source and Destination — reading and writing plain text files with SSIS.

## Segment 2 (steps: three formats)

Every flat file SSIS reads or writes is one of three formats. Delimited, where columns are split by a character like a comma or a tab. Fixed width, where every column has a fixed character width. And ragged right, where every column except the last is fixed, and the last column runs to the row delimiter instead, so it can vary in length.

## Segment 3 (steps: connection manager)

Here's the part that surprises people coming from OLE DB: with flat files, the source and destination components are thin wrappers, and the real configuration lives on the Flat File connection manager itself — the file path and format, and every column's name, type, and length. Watch that default column length, though: it defaults to 50 characters for every string column. Run Suggest Column Types, or resize columns yourself, before trusting those defaults in a real package.

## Segment 4 (outro)

Next lesson, we add Data Viewers to a data flow path — so you can actually watch rows move through a buffer while a package runs, instead of just trusting that they did.
