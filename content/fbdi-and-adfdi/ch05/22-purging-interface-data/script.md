# Script — Purging Interface Data

## Segment 1 (title)

Interface tables accumulate rows every time an FBDI load runs — successful rows that weren't always cleaned up automatically, rejected rows still waiting to be corrected. Left unmanaged, that accumulation becomes its own problem. This lesson covers purging: deliberate, controlled cleanup.

## Segment 2 (steps)

A table that's never cleaned up can slow down future imports and make it hard to tell which rows belong to last week's load versus this morning's. Oracle Fusion addresses this with dedicated purge functionality — for Payables specifically, the Payables Open Interface Purge — built to remove rows on your terms.

## Segment 3 (steps)

Purge options usually come in more than one flavor. Purge only successfully processed records removes rows that already became real application records — low risk, routine. Purge all matching records, including rejected and never-attempted ones, is more aggressive and needs scoping parameters so you don't sweep up an unrelated load by accident.

## Segment 4 (steps)

The real risk isn't complexity, it's timing. Purging rejected rows before you've reviewed and corrected them destroys the evidence you need to fix the problem. If your correct-and-resubmit workflow depends on reading a rejected row's exact values and error message, purging first leaves nothing to read.

## Segment 5 (outro)

The safe routine: run the import, review the report, correct and resubmit any rejections, confirm they now succeed, and only then purge — usually the narrower "successfully processed only" option. Up next, lesson twenty-three: a complete troubleshooting scenario that puts this whole chapter's toolkit to work.
