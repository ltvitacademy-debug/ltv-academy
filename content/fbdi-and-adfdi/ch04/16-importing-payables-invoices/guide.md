# Importing Payables Invoices

Payables Invoice Import is one of the highest-volume FBDI loads most Oracle Fusion environments run, because it's the natural landing spot for invoices that arrive electronically from a supplier portal, an OCR/scanning tool, or a legacy system being retired. This lesson covers how it works, using the same pipeline you've now seen three times.

## What you'll learn

- The two interface tables Payables Invoice Import uses, and why there are two
- The key header- and line-level fields an invoice record needs
- The specific import process name for invoices, and what it validates
- A realistic rejection scenario and how it traces back to Chapter 2's rules

## Two interface tables, because an invoice has two levels

An invoice isn't one flat record — it has a **header** (supplier, invoice number, invoice date, invoice amount, payment terms) and one or more **lines** (the amount and account distribution for each item or service billed). Payables Invoice Import reflects this directly: header rows stage into **AP_INVOICES_INTERFACE**, and line rows stage into **AP_INVOICE_LINES_INTERFACE**. This is exactly the "one tab, one interface table" pattern from lesson 5 — the template has a header tab and a line tab because the application has a header table and a line table.

## Key fields and why they matter

A header row needs, at minimum, a supplier identifier, an invoice number unique for that supplier, an invoice date, and an invoice amount. A line row needs an amount and, usually, account distribution information — where this cost should post in the chart of accounts — unless that distribution is being derived automatically from other setup. Supplier identifiers are a coded reference back to the supplier records you'd load with the process from lesson 9: an invoice can't import against a supplier that doesn't exist yet, which is why supplier conversions typically happen before invoice conversions in a go-live sequence.

## Running Import Payables Invoices

Once rows are staged in both interface tables, **Import Payables Invoices** is the process that validates and creates real invoices. It checks that the supplier exists and is active, that line amounts sum correctly to the header's invoice amount, that account distributions are valid combinations, and other business rules specific to Payables. Rows that fail are tracked in a dedicated rejections structure, **AP_INTERFACE_REJECTIONS**, which records exactly which interface row failed and why — the same "query it directly" technique from lesson 14 applies here directly.

## A realistic rejection scenario

Imagine an invoice header with an invoice amount of $5,000.00, but its two line amounts sum to $4,950.00 — a $50 discrepancy, maybe from a line that was accidentally left off the file. Every individual field format is fine; the file uploads and stages without complaint. The rejection only surfaces when Import Payables Invoices checks that lines sum to the header total and finds they don't. This is the Payables-specific version of the "batch-level" validation you saw with journals in the last lesson — except here it's checked at the header level, across that invoice's own lines.

## Recap

Payables Invoice Import uses two interface tables — one for headers, one for lines — because an invoice itself has two levels. Import Payables Invoices validates supplier existence, line-to-header amount totals, and account distributions, with AP_INTERFACE_REJECTIONS recording exactly why any row failed. Next up, lesson 17: importing receivables transactions with AutoInvoice, where the same header/line pattern reappears with its own specific rules.
