# Script — Consistency Errors

## Segment 1 (title)

Last lesson covered running CHECKDB cleanly. This one covers the day it isn't clean — what the error output actually means, and the honest order of operations for fixing corruption instead of making it worse.

## Segment 2 (code: when CHECKDB isn't clean)

A dirty CHECKDB run reports a message number, severity, the object ID and page number of the damaged page, and a summary line: found N allocation errors and N consistency errors. That summary line is what you grep an overnight job's log for.

## Segment 3 (steps: allocation vs. consistency)

The two counts mean different things. Allocation errors are page-ownership bookkeeping gone wrong — claimed twice, or not claimed at all. Consistency errors mean the actual data or structure on a page contradicts what SQL Server expects — a corrupted row, a broken index link.

## Segment 4 (code: last resort only)

When corruption is real, check for a clean recent backup first — restoring has zero data loss. Repair_allow_data_loss is the last resort, reached only when there's no usable backup, because it can delete the corrupted rows or pages outright to restore consistency.

## Segment 5 (outro)

Restoring from backup fixes corruption without losing data. Repair_allow_data_loss fixes the structural error but doesn't recover what was on that page. Next up: file growth and autogrowth, and why percentage-based growth on a huge file is a real anti-pattern.
