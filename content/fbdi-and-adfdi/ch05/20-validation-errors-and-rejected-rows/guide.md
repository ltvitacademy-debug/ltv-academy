# Validation Errors and Rejected Rows

Every lesson in Chapter 4 ended with a specific, realistic rejection scenario. Chapter 5 steps back and organizes what those scenarios have in common — a clear mental model for where validation happens, what gets caught when, and why "rejected" is not one single kind of failure.

## What you'll learn

- The two distinct validation layers every FBDI load passes through
- Which kinds of problems each layer catches, and which it can't
- Why a rejected row is good news compared to the alternative
- Where to actually look for a rejection's specific cause

## Two layers of validation, not one

By now you've seen this pattern across journals, invoices, receivables, assets, and bank statements: validation happens in two separate layers, at two separate times.

- **Load-time validation**, which happens when Load Interface File for Import reads your file. This layer only checks that the file is structurally valid — a proper CSV, with the expected number of columns, no corruption. It has no concept of a supplier existing, an account balancing, or an amount matching. It's a format check, nothing more.
- **Import-time validation**, which happens when the product-specific import process (Import Journals, Import Payables Invoices, AutoInvoice, and so on) reads staged rows. This layer applies the real business rules: does this supplier exist, do these lines sum to the header, does this account combination exist in the chart of accounts, do debits equal credits.

## Why this distinction matters

A file can sail through load-time validation with zero issues and still generate dozens of import-time rejections — which is exactly the pattern you saw repeatedly in Chapter 4. Knowing which layer you're dealing with tells you where to look: a load-time failure usually means something is wrong with the file itself (a bad CSV, a corrupted ZIP), while an import-time rejection means something is wrong with the business content of a specific row, which you can usually trace, fix, and resubmit without touching the file structure at all.

## A rejected row is not the same as a silent failure

It's worth pausing on this: a rejected row, with a recorded reason, is a far better outcome than a row that simply vanishes with no explanation. Every rejection mechanism covered in this course — AP_INTERFACE_REJECTIONS, an AutoInvoice exception, a Mass Additions review queue — exists specifically so that a failed row leaves a trail. The system is doing its job correctly when it rejects bad data loudly; the trouble only starts if that rejection detail goes unread.

## Where to actually look

Putting Chapter 3's tools together: start with the process's execution report (lesson 13) for a first read of what failed and roughly why; if that's not specific enough, query the relevant interface table and its rejections structure directly (lesson 14) to see the raw staged row alongside its exact recorded message. Nearly every rejection you'll encounter traces back to one of the specific causes named across Chapter 4's five lessons: a missing or wrong lookup code, a mismatched total, a non-existent reference, or a broken grouping/balancing rule.

## Recap

FBDI validation happens in two layers — load-time, checking file structure, and import-time, checking business rules — and nearly every rejection you'll meet belongs to the second layer. A rejected row with a recorded reason is the system working correctly, not a mystery; the report and the interface table are where you go to read that reason. Next up, lesson 21: correcting and re-running the imports that rejected rows.
