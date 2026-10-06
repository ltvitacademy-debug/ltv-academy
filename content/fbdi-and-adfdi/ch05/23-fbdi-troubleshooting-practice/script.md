# Script — FBDI Troubleshooting Practice

## Segment 1 (title)

Chapter five gave you a mental model, a fixing technique, and a cleanup discipline. This lesson walks one complete, realistic troubleshooting scenario from first symptom to final resolution, using all three together.

## Segment 2 (steps)

A consultant runs 200 payables invoices through FBDI ahead of month-end. Load Interface File for Import reports success — 200 rows staged, no file errors. Import Payables Invoices then runs: 187 succeeded, 13 rejected. Because the load step already succeeded cleanly, this isn't a file problem — it's business-rule rejections at the row level.

## Segment 3 (steps)

Reading the execution report, a pattern emerges: 9 of the 13 share one error, an invalid supplier site; the other 4 share a header-versus-line total mismatch. The report alone doesn't show exactly which site code was wrong, so the consultant queries the interface table directly.

## Segment 4 (code)

The query turns up a site code typed with a trailing space — not an exact match to the configured value. The other four rows show a header amount of $12,400 against lines summing to only $12,150 — a missing line, the same scenario from the Payables lesson.

## Segment 5 (steps)

Following the discipline from this chapter, the consultant leaves the 187 successful rows untouched. The 9 site-code rows get corrected through Correct Import Errors; the 4 mismatched-total rows get corrected in a small file of just those four. Both sets are resubmitted narrowly, scoped only to themselves.

## Segment 6 (outro)

The new report shows all 13 now succeeding, zero new rejections. Only now does the consultant purge the batch's successful rows — never before confirming the fix worked. This five-step order — trust the clean load, read the report, query when needed, fix narrowly, purge last — works for every module in chapter four. Up next, Chapter six: ADFdi and spreadsheet uploads, the other half of this course's toolkit.
