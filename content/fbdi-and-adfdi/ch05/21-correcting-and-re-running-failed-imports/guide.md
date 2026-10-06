# Correcting and Re-Running Failed Imports

Finding the cause of a rejection, as lesson 20 covered, is only half the job. This lesson covers the other half: actually fixing a rejected row and getting it successfully imported, without re-doing work that already succeeded, and without accidentally duplicating anything.

## What you'll learn

- The "Correct Import Errors" spreadsheet and when it's available
- Why you generally don't need to resubmit an entire file to fix a handful of rejected rows
- The specific risk of accidentally re-processing already-successful rows
- A practical, repeatable fix-and-resubmit workflow

## Correct Import Errors: fixing rejections in place

For some modules, notably Payables, Oracle Fusion provides a tool specifically for this moment: the **Correct Import Errors** spreadsheet. Interestingly, this tool itself runs on ADFdi — the same Excel-integration technology covered later in this course — rather than on another round of FBDI. It lets you see rejected interface rows, correct the problematic values directly in a connected spreadsheet, and resubmit just those corrected rows, without touching the rows that already succeeded.

## Why you don't resubmit the whole file

Reloading an entire original FBDI file after fixing two bad rows out of a thousand is almost never the right move. The 998 rows that already succeeded are already real records; sending them through the pipeline again risks creating duplicates or triggering "already exists" errors that have nothing to do with your actual fix. The better pattern, wherever the tooling supports it (Correct Import Errors for Payables, or a small corrected file scoped only to the specific rejected rows for other modules), is to isolate exactly the rows that failed and resubmit only those.

## The duplicate-risk trap

This is worth stating directly: FBDI's interface-table design means a row that already successfully imported is, by that point, a live application record — resubmitting the same source row through the pipeline a second time doesn't "update" that record, it attempts to create a second one, which the import process's own validation (checking for things like a duplicate invoice number per supplier) will usually catch and reject, but not always cleanly, and not without creating confusion in interface-table logs along the way. Scoping your correction to only the rows that actually failed avoids this entirely.

## A repeatable fix-and-resubmit workflow

1. Identify exactly which rows were rejected and why, using the report and interface-table query techniques from Chapters 3 and 5.
2. Correct only those specific values — in Correct Import Errors where available, or in a small, newly built file containing only the corrected rows otherwise.
3. Resubmit just the corrected set through the appropriate import process.
4. Review the new execution report to confirm those specific rows now succeeded, and that no new, unexpected rejections appeared.

## Recap

Correct Import Errors is an ADFdi-based tool, available for some modules like Payables, built specifically for fixing rejected rows in place. The core discipline, with or without that tool, is the same: isolate exactly the rows that failed, fix only those, and resubmit only those — never the whole file again — to avoid duplicating work that already succeeded. Next up, lesson 22: purging interface data, and why stale staged rows need to be cleaned up deliberately.
