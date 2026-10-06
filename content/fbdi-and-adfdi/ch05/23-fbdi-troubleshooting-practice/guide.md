# FBDI Troubleshooting Practice

Chapter 5 gave you a mental model (two validation layers), a fixing technique (correct and resubmit scoped to just the failures), and a cleanup discipline (purge last, never first). This lesson walks one complete, realistic troubleshooting scenario from first symptom to final resolution, using all three together.

## What you'll learn

- How to work a troubleshooting scenario in the right order, start to finish
- How to tell load-time symptoms apart from import-time symptoms in practice
- How the techniques from Chapters 3 and 5 combine into one workflow
- A general troubleshooting checklist you can reuse for any module

## The scenario

A consultant runs a batch of 200 payables invoices through FBDI ahead of month-end. Load Interface File for Import reports success — 200 rows staged, no file errors. Import Payables Invoices then runs and reports: 187 succeeded, 13 rejected.

## Step 1: don't panic about the file — it already passed

Because Load Interface File for Import already succeeded cleanly, the consultant knows (from lesson 20) that this isn't a file-structure problem. The ZIP was fine, the CSV was fine, the column mapping was fine. Whatever is wrong with these 13 rows is a business-rule issue, which means the fix will happen at the row level, not by rebuilding the file.

## Step 2: read the execution report first

The Import Payables Invoices execution report (lesson 13) lists the 13 rejected rows. Reading through them, a pattern emerges: 9 of the 13 share the same error, something like an invalid supplier site; the other 4 share a different one, a line-total-versus-header mismatch (the exact scenario from lesson 16).

## Step 3: confirm with a direct query, where the report is thin

For the 9 "invalid supplier site" rejections, the report alone doesn't show exactly which site code was entered. The consultant queries AP_INVOICES_INTERFACE directly (lesson 14), filtered to those 9 rejected rows, and finds a site code that was typed slightly differently than the one configured in the system — a trailing-space mistake, exactly the category of error from lesson 8.

```
Rejected rows (9):  SITE_CODE = 'MAIN ' (trailing space) — not an exact match
Rejected rows (4):  header amount $12,400.00 ≠ sum of lines $12,150.00
```

*(Illustrative values for this scenario, not real transaction data.)*

## Step 4: fix narrowly, resubmit narrowly

Following lesson 21's discipline, the consultant does not touch the 187 successful rows at all. The 9 site-code rows are corrected (trailing space removed) using Correct Import Errors; the 4 mismatched-total rows are corrected in a small file containing only those 4 rows, with the missing line added back in. Both corrected sets are resubmitted separately, scoped only to themselves.

## Step 5: confirm, then purge

The new execution report shows all 13 corrected rows now succeeding, with zero new rejections. Only now, following lesson 22, does the consultant purge the batch's successfully processed interface rows — never before confirming the fix actually worked.

## Recap

A real troubleshooting pass runs in order: trust a clean load-time result, read the report before querying raw tables, query the tables when the report alone isn't specific enough, fix and resubmit only the narrow set of actual failures, and purge only after confirming success. This five-step order is reusable for every module in Chapter 4, not just Payables. Next up, Chapter 6: ADFdi and spreadsheet uploads — the other half of this course's toolkit.
