# Lesson 13 — Importing Journals with FBDI Preview

**Chapter 3 · Journal Approvals and Import · Lesson 13 of 37**

## What you'll learn

- What FBDI is and why it exists alongside manual journal entry
- The five-step flow from template to posted-ready journals
- What the GL_INTERFACE template actually expects, column by column
- Where this flow hands off to Lesson 14's import errors

## Why FBDI exists

Typing journals in one at a time, as you did in Chapter 2, doesn't scale to hundreds or thousands of lines — a payroll allocation across fifty cost centers, or a batch of adjustments from a legacy system during a migration. **File-Based Data Import (FBDI)** is Oracle's standard bulk-loading mechanism across Fusion Applications, and General Ledger's journal import uses it to bring large volumes of journal data in through a structured spreadsheet template instead of the Create Journal screen.

## The five-step flow

1. **Download the template** — Oracle publishes a versioned `JournalImportTemplate.xlsm` spreadsheet with a macro-enabled `GL_INTERFACE` worksheet matching the exact structure General Ledger expects.
2. **Populate the data** — fill in one row per journal line: ledger ID, accounting date, currency, each chart-of-accounts segment, and the debit or credit amount.
3. **Generate the CSV / zip** — the template's built-in macro converts your populated rows into a CSV file and packages it into a zip, in the exact file-naming convention the loader expects.
4. **Upload to WebCenter Content (UCM)** — through **Tools → File Import and Export**, the zip is uploaded and tagged to the `fin/generalLedger/import` account, which is how Oracle routes it to the right loader.
5. **Run Import Journals** — a scheduled process reads the uploaded file, loads it into the `GL_INTERFACE` staging table, and creates journal batches from it, each one still subject to the same validation covered in Lesson 9 before it can post.

```
JournalImportTemplate.xlsm  →  populated GL_INTERFACE rows  →  CSV/zip
   →  uploaded to UCM (fin/generalLedger/import)  →  Import Journals process
   →  journal batches created, source = "Spreadsheet"  →  validate → approve → post
```

## What one row of GL_INTERFACE actually contains

Each row in the template corresponds to one journal line, and must carry at minimum:

| Column | Purpose |
|---|---|
| Ledger ID | Which ledger the line posts into |
| Accounting Date | Determines the accounting period |
| Currency Code | Entered currency |
| Segment1...N | Each chart-of-accounts segment value (company, cost center, account, intercompany for Solara Fixtures) |
| Entered Debit / Entered Credit | The amount, in one column or the other, exactly like a manual journal line |

The source for journals created this way is typically **Spreadsheet**, distinguishing them in Manage Journals from hand-typed Manual entries, even though a person ultimately prepared the file.

## Where this hands off

Rows that don't match a valid ledger, account combination, or currency don't silently disappear — they're rejected with a specific reason, which is exactly what Lesson 14 covers next: how to read and fix those import-level errors.

## Key terms

| Term | Meaning |
|---|---|
| FBDI | File-Based Data Import — Oracle's standard bulk-load mechanism |
| GL_INTERFACE | The staging structure the journal import template populates |
| UCM | WebCenter Content, the server the populated file is uploaded to before import runs |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why does a journal imported through FBDI still go through the same validation as a manual journal before it can post?
