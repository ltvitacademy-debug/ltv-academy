# Uploading Journals with ADFdi

Create Journal in Spreadsheet is one of the most commonly used ADFdi actions in Oracle Fusion General Ledger, and it's a useful first hands-on example because you already know the business rules it enforces — the same balancing rule from lesson 15, just applied through a completely different mechanical path.

## What you'll learn

- Where to find and launch Create Journal in Spreadsheet
- How its workflow compares, step by step, to Journal Import's FBDI pipeline
- Where validation happens, and when a user sees it
- Why this tool suits a controller posting ten lines, not a go-live conversion of ten thousand

## Finding and launching the tool

From General Accounting, in the Journals work area, **Create Journal in Spreadsheet** launches a connected Excel workbook, provided the ADFdi add-in from lesson 24 is already installed. The downloaded spreadsheet isn't a blank template you're filling in cold — it's pre-connected to your Fusion environment, aware of your ledger and chart of accounts, through the ADFdi ribbon.

## The workflow, compared to FBDI

A user enters journal lines directly into the spreadsheet: account combination, debit or credit amount, currency, description. There's no CSV generation step, no ZIP file, no UCM upload. Instead, the ADFdi ribbon has its own upload action that submits the entered rows directly to Oracle Fusion. This is the single biggest practical difference from lesson 15's Journal Import: the entire Chapter 1 pipeline (template → CSV → ZIP → UCM → load → import) collapses into one click inside the spreadsheet.

## Where and when validation happens

Because ADFdi talks to the live application directly, a good deal of validation happens close to the moment of upload rather than in a scheduled process report reviewed later. An invalid account combination, or a batch that doesn't balance, can be flagged back to the user within the same session, often before they've even closed the spreadsheet — a meaningfully faster feedback loop than FBDI's report-and-log review from Chapter 3, because there's no separate scheduled process to wait on.

## Why this fits a different scale of work

Ten journal lines that need posting this afternoon are a poor fit for the FBDI pipeline — downloading a template, generating a CSV, zipping it, and running two scheduled processes is a lot of ceremony for ten rows. Create Journal in Spreadsheet is built exactly for this scale: fast, interactive, immediately validated. It would be an equally poor fit in the other direction — nobody is typing ten thousand journal lines into a spreadsheet by hand, which is exactly why FBDI exists for that end of the scale, as lesson 2 established at the start of this course.

## Recap

Create Journal in Spreadsheet applies the same balancing rule as FBDI's Journal Import, but through a direct, connected spreadsheet with no staging pipeline, giving faster, more immediate validation feedback. It's built for small, interactive journal entry — not bulk conversions. Next up, lesson 26: uploading Payables invoices with ADFdi, where the same pattern applies to a different module.
