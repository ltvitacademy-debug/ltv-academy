# Script — Exporting Data

## Segment 1 (title)

Exporting is the first thing you'll do with Data Loader, and it's the one that uses everything from the earlier chapters. You write a query and Salesforce hands you a CSV.

## Segment 2 (steps: the export wizard)

The export wizard is four steps. Click Export and log in. Choose the object and a CSV file name. Build the query with fields and conditions. Then finish, and the results land in your file.

## Segment 3 (code: it's real soql)

Here's the good news. Behind the field picker, that query is real SOQL, and you can edit it directly. The SELECT, WHERE, ORDER BY and LIMIT you learned in Chapter One all work here. Because the output is a flat CSV, stick to plain fields and parent fields with dot notation.

## Segment 4 (code: two export choices)

You get two export choices. Export returns current records only. Export All also includes records sitting in the Recycle Bin, plus archived records. Export All is the one to reach for when you need to see what was deleted.

## Segment 5 (outro)

Exporting is also your safety net. Before any change you'll make in the next lessons, export the affected records first. Next up: inserting and updating records.
