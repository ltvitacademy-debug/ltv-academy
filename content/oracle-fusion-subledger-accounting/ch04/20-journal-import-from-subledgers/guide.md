# Journal Import from Subledgers

Lesson 19 covered Transfer Journal Entries to GL at the process level. This lesson looks underneath that process, at the actual mechanism that lands subledger journal data inside General Ledger's own journal tables — and shows how that same mechanism also serves other, non-SLA sources of journal data.

## What you'll learn

- What "journal import" means as a GL-side mechanism
- How a transferred subledger journal becomes a standard GL journal batch
- Why journal import exists as a shared mechanism, not something unique to SLA
- What this means for a consultant troubleshooting a transfer that seemingly didn't work

## Journal import as the landing mechanism

When Transfer Journal Entries to GL moves a Final subledger journal entry over to General Ledger, that journal data has to actually become a GL journal batch — the same object type you already know how to inspect, post, and report on from your General Ledger course. The underlying mechanism that does this conversion and insertion is **journal import**: it takes journal data arriving from an external or semi-external source and creates it as a properly structured GL journal batch, assigning it a batch name, source, category, and all the other attributes a GL journal batch needs.

## Not unique to Subledger Accounting

Here's the important, sometimes-missed point: journal import is not a mechanism built only for Subledger Accounting. It's the same general-purpose GL mechanism used to bring in journal data from any source outside of GL's own manual journal entry screens — a spreadsheet upload using a predefined template, an FBDI (File-Based Data Import) file, or a journal feed from a non-Oracle source system. Subledger Accounting is simply the most common and highest-volume user of journal import in a typical Oracle Fusion Financials implementation, because every Payables, Receivables, Fixed Assets, and other subledger transaction ultimately needs to land in GL through exactly this path.

## Source and category

Every journal that lands in GL through journal import carries a **source** (which system or process it came from — for Subledger Accounting transfers, the source typically reflects the originating subledger application) and a **category** (the type of activity, like "Purchase Invoices" or "Receipts"). These two attributes are what let a controller filter and report on GL journals by where they came from, and they trace directly back to the event class and subledger application you learned about all the way back in Chapter 1 — the classification set up at the very start of this course is still visible, all the way at the GL journal level, at the very end of the process.

## Why this matters for troubleshooting

If a transfer "seemingly didn't work" — meaning Create Accounting ran in Final, but no corresponding journal shows up in GL — the journal import step is one of the places to check, alongside confirming the transfer process itself actually ran. Checking the GL journal batch list by source and category, filtered to the ledger and date in question, is often the fastest way to confirm whether journal import successfully created the batch, versus the problem sitting further upstream at Create Accounting or the transfer step itself.

## Recap

Journal import is the shared General Ledger mechanism that turns journal data from an external source — most commonly transferred Subledger Accounting entries, but also spreadsheets and FBDI files — into standard GL journal batches, tagged with a source and category that trace back to the originating subledger application and event class. This closes out Chapter 4. Next up, Chapter 5 begins with lesson 21: subledger reports, journal entries, and account analysis, where you'll start reading the output of everything built and processed so far.
