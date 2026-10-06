# Script — Correcting and Re-Running Failed Imports

## Segment 1 (title)

Finding the cause of a rejection is only half the job. This lesson covers the other half: actually fixing a rejected row and getting it successfully imported, without redoing work that already succeeded.

## Segment 2 (steps)

For some modules, notably Payables, Oracle Fusion provides the Correct Import Errors spreadsheet — a tool that itself runs on ADFdi, the Excel integration technology covered later in this course. It lets you see rejected rows, correct the problem values directly in a connected spreadsheet, and resubmit just those rows, without touching the ones that already succeeded.

## Segment 3 (steps)

Reloading an entire original file after fixing two bad rows out of a thousand is almost never right. The nine hundred ninety-eight rows that already succeeded are already real records. Sending them through again risks duplicates or confusing "already exists" errors that have nothing to do with your actual fix.

## Segment 4 (steps)

Here's the trap worth naming directly: a row that already imported is a live record. Resubmitting that same source row doesn't update it — it attempts to create a second one, which validation usually catches, but not always cleanly. Scoping your correction to only the rows that actually failed avoids this entirely.

## Segment 5 (outro)

Identify exactly which rows failed and why, correct only those specific values, resubmit just that corrected set, then review the new report to confirm they succeeded with no new surprises. Up next, lesson twenty-two: purging interface data, and why stale staged rows need deliberate cleanup.
