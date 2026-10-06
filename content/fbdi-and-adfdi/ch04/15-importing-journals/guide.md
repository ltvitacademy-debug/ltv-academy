# Importing Journals

Chapter 4 applies everything from Chapters 1 through 3 to five specific Financials modules, starting with General Ledger. Journal Import is one of the most frequently run FBDI loads in a live Oracle Fusion environment — any company bringing in transactions from an external system (payroll, a point-of-sale system, a sub-ledger outside Oracle) eventually needs a way to get those entries into the General Ledger in bulk, and FBDI is that way.

## What you'll learn

- The template and interface table Journal Import uses
- The key fields a journal row needs, including the one rule General Ledger never relaxes
- The specific import process name for journals, and what it does
- Why a batch of journal rows can be individually valid but still fail as a group

## The template and interface table

Journal Import uses a template whose data tab maps to **GL_INTERFACE**, the General Ledger's staging table. Each row represents one journal line: an account combination (the segments making up a chart-of-accounts code), a debit or credit amount, a currency, an effective date, and references like journal category and journal source that classify the entry.

## The rule that's always checked: debits equal credits

You learned in Accounting Fundamentals for Oracle Professionals that every transaction must balance — assets equal liabilities plus equity, which in journal terms means total debits must equal total credits. General Ledger enforces this rule without exception. A batch of journal lines where the account combinations are all valid and every other field is perfect will still be rejected as a group if its debits and credits don't net to zero. This is the clearest example in this course of a validation rule that lives above the level of any single row — it's checked across the whole journal batch.

## Running Import Journals

Once journal rows are staged in GL_INTERFACE (via Load Interface File for Import, per Chapter 3), the **Import Journals** process is submitted to actually create journal entries. It's documented as spawning a child program, **Import Journals: Child**, that does the underlying work. Import Journals validates each line's account combination against the chart of accounts, confirms the journal batch balances, and — for everything that passes — creates real, postable journal entries grouped into batches, using the journal source and category you supplied to classify them.

## Why a row can be individually fine but still rejected

Two common journal-specific rejection causes: an account combination that doesn't exist in the chart of accounts (a segment value that was never set up, or a combination that was explicitly disabled), and a batch that doesn't balance because of a simple data-entry slip — a debit typed as 100.00 where 1,000.00 was intended, for instance. Both are exactly the kind of row-level and batch-level validation that Chapter 3 described as happening only in the product-specific import process, never earlier.

## Recap

Importing journals means staging rows into GL_INTERFACE and running Import Journals, which validates account combinations and enforces the one rule General Ledger never bends: debits must equal credits for the batch as a whole. Next up, lesson 16: importing Payables invoices, where the interface tables and validation rules look different but the underlying pipeline is identical.
