# Script — Automating Excel: Tables and Rows

## Segment 1 (title)

Before a lot of Castlebridge Logistics data lived anywhere fancier, it lived in an Excel workbook — a dock schedule, a damaged-freight log, a list of preferred carriers. The Excel Online connector reads and writes that workbook directly, as long as the data sits inside a real Excel Table, not just a loose range of cells someone formatted to look like one.

## Segment 2 (steps)

Every action here asks you to pick a Table from a dropdown, never a worksheet or a plain range. List rows present in a table retrieves rows, with a basic filter and a 256-row cap by default. Add a row into a table appends a new one, matched to the existing columns. And Get, Update, and Delete a row all need a key column — a column whose values actually identify exactly one row, with only the first match affected if more than one qualifies.

## Segment 3 (code)

The built-in filter query only handles simple comparisons, like this starts-with check on a status column, and only one filter function per column at that. The moment you need something richer — a numeric greater-than, for instance — the real pattern is to list all the rows first, then pipe the output into a separate Filter array action, which supports conditions the connector's own filter simply can't.

## Segment 4 (outro)

Remember: if it's not a formal Excel Table, this connector can't see it, no matter how neatly organized the spreadsheet looks to a person. Next up, lesson eleven: automating SharePoint, lists, libraries, and document automation.
