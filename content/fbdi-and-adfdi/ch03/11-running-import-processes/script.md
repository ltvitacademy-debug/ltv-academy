# Script — Running Import Processes

## Segment 1 (title)

Last lesson ended with data sitting safely in an interface table, staged but inert. This lesson covers the process that actually matters to the business: reading those staged rows, checking them against real validation rules, and creating — or refusing to create — live records.

## Segment 2 (steps)

Every Financials module has its own import process, named for what it does: Import Journals for General Ledger, Import Payables Invoices for Payables, AutoInvoice Import for Receivables. Different names, same conceptual job — read staged rows, run business-rule validation, and write every accepted row forward as a live record.

## Segment 3 (steps)

The earlier Load Interface File for Import step only confirmed the file was structurally valid CSV data. It has no idea whether a supplier number is a duplicate, or whether an account combination actually exists. All of that business logic runs here, in the product-specific import process — which is exactly why the earlier step can stay identical across every module.

## Segment 4 (steps)

This process is submitted from Scheduled Processes with its own parameters — which ledger or business unit the data belongs to, a batch identifier scoping which staged rows to pick up, sometimes a purge option. Getting these right makes sure it only processes the batch you intend.

## Segment 5 (outro)

When it finishes, it reports two numbers: rows succeeded, and rows rejected. Nine hundred eighty of a thousand succeeding isn't "98% done" — it's twenty specific, fixable problems waiting to be traced, which is exactly what Chapter five teaches. Up next, lesson twelve: monitoring imports while they run using Scheduled Processes.
