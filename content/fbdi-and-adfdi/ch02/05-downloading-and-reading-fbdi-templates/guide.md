# Downloading and Reading FBDI Templates

Chapter 1 described FBDI as a pipeline. Chapter 2 opens that pipeline up and looks closely at its first physical artifact: the template itself. Every FBDI load starts with the same kind of file — a structured Excel workbook, published by Oracle, with a specific internal layout you need to recognize on sight.

## What you'll learn

- Where FBDI templates come from and how they're organized
- The standard internal structure every template shares: Instructions tab, data tabs
- How a template's columns map to an interface table's columns
- How to tell which template you need for a given business object

## Where templates come from

Oracle publishes a full set of FBDI templates as part of its "File-Based Data Import for Financials" documentation (and equivalent guides for other product families, like Supply Chain). Each template is a downloadable Excel (.xlsm) workbook, one per import — Supplier Import, Journal Import, Payables Invoice Import, AutoInvoice Import, Mass Additions Import, and dozens of others. Within Oracle Fusion itself, templates can also be reached from the relevant Scheduled Processes submission screen for an import job, which typically links back to the right template.

## The standard structure of a template

Nearly every FBDI template follows the same internal layout:

- **An Instructions tab.** This explains what the template is for, lists any prerequisites, and — critically — holds the macro button used later to generate CSV files (covered in lesson 7).
- **One or more data tabs**, each one named after, and structured to match, a specific interface table. A Payables Invoice Import template, for example, has one tab for invoice headers and a separate tab for invoice lines, because headers and lines live in two different interface tables.
- **Column headers in row 1** of each data tab that are not just labels — they are the literal column names of the interface table underneath. This is why templates must never have columns inserted, deleted, or reordered: doing so breaks the direct mapping between a spreadsheet column and a database column.
- **Sample or placeholder rows**, sometimes present just below the header, showing the expected format — these must be deleted before you add your own data, not left in as real rows.

## Why the column-to-table mapping matters

Because a template's columns map one-to-one to an interface table's columns, reading a template is really reading an interface table's shape before you've touched the database at all. A column named `SUPPLIER_NUM` on the template lands, unchanged, in a column named `SUPPLIER_NUM` on the interface table. Understanding this mapping is what lets you later diagnose a rejected row by tracing it back to the exact column and the exact rule it violated — a skill this course builds toward in Chapter 5.

## Picking the right template

Templates are published per business object, not per module in a loose sense — there isn't one single "Payables template." There's a Payables Invoice Import template, a Supplier Import template, and others, each targeting a different interface table and a different downstream import process. Picking the wrong template for the job you're trying to do is a common early mistake; the fix is always to match the template name to the specific import process you intend to run afterward, which you'll see named explicitly in Chapters 3 and 4.

## Recap

FBDI templates are structured Excel workbooks with an Instructions tab and one or more data tabs, whose column headers are literal interface-table column names you must never rearrange. Reading a template correctly means recognizing it as a map of the interface table behind it. Next up, lesson 6: the rules for filling in a template correctly, so the data you enter actually survives the trip into the interface table.
