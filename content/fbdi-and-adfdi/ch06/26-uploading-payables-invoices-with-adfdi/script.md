# Script — Uploading Payables Invoices with ADFdi

## Segment 1 (title)

Payables has its own ADFdi version of invoice entry, commonly reached as Create Invoice in Spreadsheet. It's worth studying specifically because it reuses a tool you've already met from an entirely different angle: Correct Import Errors runs on this exact same technology.

## Segment 2 (steps)

From the Payables Invoices work area, Create Invoice in Spreadsheet downloads a connected Excel workbook, shaped for invoice entry. A user fills in header information — supplier, invoice number, date, amount — and line details — amount, account distribution — then submits through the ADFdi ribbon, with validation happening close to that upload.

## Segment 3 (steps)

Payables Invoice Import's two interface tables existed because an invoice has two levels, header and line. That same two-level structure shows up again here, in the spreadsheet's layout, even though there's no interface table involved at all this time. The business shape of an invoice doesn't change based on which tool loads it.

## Segment 4 (steps)

Here's the connection worth making explicit: Correct Import Errors, which fixes rejected FBDI rows, and Create Invoice in Spreadsheet, which creates brand-new invoices, are both built on ADFdi. One corrects rows that already failed an import; the other creates new invoices directly, no FBDI involved. Same underlying technology, two different jobs.

## Segment 5 (outro)

A handful of invoices that arrived by email this week fit Create Invoice in Spreadsheet naturally. A nightly file of three thousand invoices from a supplier portal remains FBDI's job. The volume-and-frequency logic from lesson one still applies exactly the same way here. Up next, lesson twenty-seven: ADFdi errors and troubleshooting.
