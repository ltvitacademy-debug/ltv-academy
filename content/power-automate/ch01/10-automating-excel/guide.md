# Automating Excel: Tables and Rows

Before a lot of Castlebridge Logistics data lived anywhere fancier, it lived in an Excel workbook on SharePoint or OneDrive — a dock-schedule tracker, a damaged-freight log, a list of preferred carriers. The **Excel Online (Business)** connector lets a flow read and write that workbook directly, as long as the data sits inside a real Excel **Table**, not just a loose range of cells.

## What you'll learn

- Why the connector requires a formal Excel Table, and how that's different from a plain range
- The core actions: **List rows present in a table**, **Add a row into a table**, **Update a row**, **Get a row**, and **Delete a row**
- What a **key column** is, and why **Update a row** and **Delete a row** both depend on one
- The filtering limits of **List rows present in a table** — and the real workaround when they're not enough
- A worked Castlebridge Logistics example: logging a damaged-freight report into a tracking workbook

## Why the table matters

Every action in this connector — Location, Document Library, File, then **Table** — asks you to select a Table from a dropdown, not a worksheet or a cell range. If your data isn't formatted as an actual Excel Table (select the range, then **Insert > Table** in Excel itself), none of these actions can see it. This trips people up constantly: a spreadsheet can look perfectly structured and still be invisible to the connector if it was never converted to a Table object.

## The core actions

- **List rows present in a table** — retrieves rows from a table, with optional filtering and sorting
- **Add a row into a table** — appends a new row, matched to the table's existing columns
- **Get a row** — retrieves a single row, found using a key column and key value
- **Update a row** — overwrites specific cells in a single row, found the same way, found using a key column
- **Delete a row** — removes a single row, also found using a key column

## Key columns: how a single row gets found

**Get a row**, **Update a row**, and **Delete a row** all need some way to identify *which* row they're acting on — that's the **key column**. You pick a column from the table (ideally one with values that are actually unique, like an ID) and supply a **key value** to match against. If more than one row matches, only the first match is affected — a real limitation worth knowing before you rely on a non-unique key column.

## Filtering limits on List rows present in a table

The **Filter Query** field on **List rows present in a table** accepts a basic OData filter — `eq`, `ne`, `contains`, `startswith`, `endswith` — and only one filter function per column, with only one column usable for sorting. It also returns a maximum of 256 rows unless pagination is explicitly turned on in the action's settings. For anything more complex — filtering on a numeric comparison like "greater than," for instance — the real pattern is to list all the rows first, then pipe the results through a **Filter array** action, which supports richer conditions than the connector's own Filter Query.

## Castlebridge Logistics example: the damaged-freight log

A dispatcher at Castlebridge Logistics fills out a short form whenever freight arrives damaged. The flow: **Add a row into a table** appends a new row — shipment ID, carrier, damage description, reported date — to a shared "Damaged Freight Log" table on SharePoint. Later, a weekly summary flow uses **List rows present in a table** with a Filter Query of `startswith(Status, 'Open')` to pull only the unresolved entries into a recap email.

## Key terms

- **Excel Table** — a formally defined table object in Excel (Insert > Table), required by every action in this connector; a plain cell range is invisible to it
- **List rows present in a table** — retrieves rows, with basic OData filtering and a default 256-row cap
- **Key column / key value** — the column and value used to identify a single row for Get, Update, or Delete; only the first match is affected if more than one row qualifies
- **Filter array** — the downstream action used to apply filtering logic beyond what List rows present in a table's own Filter Query supports
