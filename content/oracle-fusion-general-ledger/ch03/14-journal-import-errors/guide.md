# Lesson 14 — Journal Import Errors

**Chapter 3 · Journal Approvals and Import · Lesson 14 of 37**

## What you'll learn

- Why import errors are caught earlier than ordinary journal validation errors
- The most common reasons a row gets rejected during import
- How to read the import error report and correct just the rejected rows
- Why you don't have to resubmit the entire file after fixing a handful of rows

## Two layers of checking

Lesson 9 covered validation that happens when you try to **complete** a journal. Import adds an earlier layer: before a row from the `GL_INTERFACE` staging table is even allowed to become a journal line, the **Import Journals** process checks that the row's references actually resolve. A row with a typo in its ledger ID or a currency code that doesn't exist fails here, before it ever gets the chance to fail ordinary journal validation.

## The most common import-level rejections

| Rejection reason | What's actually wrong |
|---|---|
| **Invalid ledger** | The Ledger ID in the row doesn't match any ledger Oracle recognizes |
| **Invalid account combination** | The concatenated segment values in the row don't form a combination that exists (or it's disabled) |
| **Invalid currency code** | The currency code is misspelled or not enabled for that ledger |
| **Invalid period / closed period** | The accounting date falls outside any open or future-enterable period |
| **Missing required value** | A required column, like a segment value or an amount, was left blank in the row |

These look similar to Lesson 9's validation errors because they're testing the same underlying rules — the difference is *when* they're caught: at import time, against raw staged data, rather than against a journal someone is actively trying to complete on screen.

## Reading the import report, fixing only what's broken

After Import Journals runs, its output identifies **exactly which rows were rejected and why** — not just "the import had errors." Rows that passed become real journal lines in a new journal batch, ready for the same validation, approval, and posting flow as anything else. Rows that failed stay in the interface table, untouched, with their rejection reason attached.

```
Import run: 480 rows submitted
  462 rows  -> accepted, journal batch created
   14 rows  -> rejected: invalid account combination (segment 3 disabled)
    4 rows  -> rejected: invalid currency code "USSD" (typo for "USD")
```

The fix is targeted: correct just the 18 rejected rows — not all 480 — and resubmit only those. You don't need to regenerate the whole file or re-upload everything that already succeeded.

## Key terms

| Term | Meaning |
|---|---|
| Import-level rejection | A row failing before it ever becomes a journal line, checked against staged interface data |
| Interface table | Where rejected rows remain, with their reason, until corrected and resubmitted |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why don't you need to resubmit an entire 480-row file after fixing 18 rejected rows?
