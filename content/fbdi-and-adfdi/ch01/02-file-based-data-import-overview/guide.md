# File-Based Data Import Overview

File-Based Data Import, nearly always shortened to FBDI, is Oracle's standard tool for loading large volumes of data into Fusion Cloud Applications using spreadsheet templates that map directly to the underlying import tables. If you remember nothing else from this lesson, remember this: FBDI never writes straight into the tables the application actually runs on. It always lands first in a staging area called interface tables, and only moves from there into the real application tables after a second process validates and accepts it. That two-stage design is what makes FBDI safe at high volume.

## What you'll learn

- A precise definition of FBDI and the problem it was built to solve
- The three building blocks every FBDI load uses: templates, interface tables, import processes
- Why FBDI exists as a separate tool instead of just letting users paste rows into a web page
- The situations where FBDI is the right choice, and where it isn't

## The core idea: templates, interface tables, import processes

Every FBDI load, regardless of which Oracle Fusion module it targets, is built from the same three pieces:

- **A template.** A pre-built Microsoft Excel workbook, one per business object (suppliers, journals, invoices, and so on), with column headers that match the columns of an interface table. Oracle publishes these templates for download.
- **Interface tables.** Plain staging tables that sit between the outside world and the real application tables. A row sitting in an interface table hasn't affected anything yet — it's just parked there, in a holding area, waiting to be checked.
- **Import processes.** Scheduled processes that read rows out of an interface table, validate them against the application's business rules, and, for every row that passes, create the real record in the application. Rows that fail stay behind as rejected rows you can inspect and fix.

## Why not just let people paste into the page?

Oracle Fusion's transaction pages — Manage Suppliers, Create Journal, and so on — are built for one record at a time, with real-time validation on every keystroke. That's the right design for a single invoice entered by a clerk. It falls apart completely at the scale of a data conversion: nobody is going to manually open the Create Supplier page 40,000 times. FBDI exists specifically to let that same volume of data flow through the same validation rules, just in bulk, through files instead of a form.

## When FBDI is the right tool

FBDI fits best when you have a genuinely large number of rows — commonly cited as the threshold where manual or even spreadsheet-at-the-page entry stops being practical — and especially when the load is a one-time event, like converting a company's suppliers, open invoices, or fixed assets register from a legacy system into Oracle Fusion at go-live. It's also the standard choice for large recurring batch loads, such as a monthly file of thousands of receivables transactions from a point-of-sale system, when that file can be produced on a schedule and dropped into the import pipeline without a human reviewing every row.

## When it isn't

FBDI is overkill for five journal lines a controller wants to post this afternoon — ADFdi or manual entry is faster for that. And FBDI is the wrong tool for a live, continuous, system-to-system feed that needs to run automatically every few minutes with no file to produce; that's a job for a REST API integration, which you'll study in the next course.

## Recap

FBDI loads data in bulk through three building blocks: a template, an interface table, and an import process, and it always stages data in the interface table before anything touches the real application tables. It exists because Fusion's transaction pages can't absorb thousands of rows one at a time, and it's the right choice for large one-time conversions and large scheduled batch loads — not for a handful of records or a live continuous feed. Next up, lesson 3: walking the entire FBDI process end to end, from template to completed import.
