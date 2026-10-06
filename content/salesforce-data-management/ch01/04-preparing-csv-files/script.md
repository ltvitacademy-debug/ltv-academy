# Script — Preparing CSV Files

## Segment 1 (title)

Both the Import Wizard and Data Loader run on the same fuel: a CSV file. A load is only as good as the file behind it, and most import failures trace back to the file, not the tool.

## Segment 2 (code: basic shape)

The basic shape is simple: a header row, then one row per record, comma-separated. Column names in your file don't have to match Salesforce's field names exactly — you map those during the import step — but every row needs the same number of columns as the header.

## Segment 3 (steps: dates, booleans, IDs)

Salesforce expects specific formats. For dates, yyyy-dash-MM-dash-dd avoids ambiguity. For booleans, true/false, yes/no, or 1/0 all work — just stay consistent within a file. And for record IDs used in an update or upsert file, export the eighteen-character version so a spreadsheet program doesn't quietly trim it.

## Segment 4 (code: quoted comma)

Here's the single most common way a CSV silently corrupts itself: a value that contains a comma has to be wrapped in double quotes. Leave it unquoted, and that comma splits the value into two columns, shifting every column after it for that row.

## Segment 5 (steps: pre-flight checklist)

Before you load anything, run a quick pre-flight: row lengths matching the header, commas inside values properly quoted, and the file saved as UTF-8 so accented or non-English characters survive the round trip.

## Segment 6 (outro)

With a clean file in hand, it's time to actually load it. Next: Insert, Update, and Upsert — the three operations, and how they really differ.
