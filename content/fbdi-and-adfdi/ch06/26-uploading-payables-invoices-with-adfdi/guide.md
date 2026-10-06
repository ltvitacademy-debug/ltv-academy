# Uploading Payables Invoices with ADFdi

Payables has its own ADFdi version of invoice entry, commonly reached as Create Invoice in Spreadsheet, and it's worth studying specifically because it reuses a tool you've already met once in this course from an entirely different angle: Chapter 5's Correct Import Errors runs on this exact same underlying technology.

## What you'll learn

- Where to find Create Invoice in Spreadsheet and what it's for
- How header/line structure, familiar from FBDI, reappears here
- Why this tool and Correct Import Errors are really the same mechanism, used two different ways
- When a controller should reach for this instead of FBDI

## Finding and using the tool

From the Payables Invoices work area, a "Create Invoice in Spreadsheet" option downloads a connected Excel workbook, the same kind you met with journals in the last lesson, but shaped for invoice entry. A user fills in invoice header information (supplier, invoice number, date, amount) and line details (amount, account distribution), then uses the ADFdi ribbon to submit, with validation happening close to that upload rather than through a later scheduled process.

## The same header/line structure, a different mechanism

Lesson 16 covered Payables Invoice Import's two interface tables — one for headers, one for lines — because an invoice itself has two levels. That same two-level structure shows up again here, in the spreadsheet's layout, even though there's no interface table involved at all this time. The business shape of an invoice doesn't change based on which tool loads it; only the mechanism underneath does.

## The same technology as Correct Import Errors

This is worth making explicit: Correct Import Errors, covered in lesson 21 as a way to fix rejected FBDI rows, and Create Invoice in Spreadsheet, covered here as a way to create brand-new invoices, are both built on ADFdi. One is aimed at correcting rows that already failed an FBDI import; the other is aimed at creating new invoices directly, with no FBDI involved at all. Recognizing them as the same underlying technology, used for two different jobs, is exactly the kind of connection this course is built to make — ADFdi isn't a single-purpose tool, it's a general capability Oracle Fusion applies wherever direct, validated Excel entry makes sense.

## When to reach for this instead of FBDI

A handful of invoices that arrived by email this week, with no batch file to speak of, are a natural fit for Create Invoice in Spreadsheet — faster setup, faster feedback, no template to download. A nightly file of 3,000 invoices from a supplier portal remains squarely FBDI's job, exactly as lesson 2 laid out at the start of this course. The decision factors from lesson 1 — volume, frequency, who's doing the work — apply just as directly here as they did on day one.

## Recap

Create Invoice in Spreadsheet mirrors Payables Invoice Import's header/line structure, but runs on the same ADFdi foundation as Correct Import Errors — one tool, two different jobs. The choice between this and FBDI still comes down to the same volume-and-frequency logic from lesson 1. Next up, lesson 27: ADFdi errors and troubleshooting, the ADFdi counterpart to Chapter 5.
