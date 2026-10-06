# Purging Interface Data

Interface tables accumulate rows every time an FBDI load runs — successful rows that were supposed to leave but didn't always get cleaned up automatically, and rejected rows that are sitting there waiting to be corrected. Left unmanaged, that accumulation becomes its own problem. This lesson covers purging: the deliberate, controlled cleanup of interface table data.

## What you'll learn

- Why interface tables need periodic purging at all
- The specific purge options and what each one actually removes
- The real risk of purging too aggressively
- How purging fits into the correct-and-resubmit workflow from lesson 21

## Why purging is necessary

An interface table that's never cleaned up can grow large enough to slow down future imports, and more importantly, can make it genuinely hard to tell which rows belong to last week's load versus this morning's. Oracle Fusion addresses this with dedicated purge functionality — commonly referred to, for Payables specifically, as the **Payables Open Interface Purge** — built to remove interface table rows deliberately, on your terms, rather than leaving an ever-growing table of old data behind.

## The purge options, and what each removes

Purge functionality typically offers more than one option, because "clean up" doesn't always mean the same thing:

- **Purge only successfully processed records.** This removes rows that already became real application records, since there's no further reason to keep their staged copy around. This is usually the routine, low-risk purge to run regularly.
- **Purge all matching records**, including ones rejected during import and ones never attempted at all. This is a more aggressive option — it typically needs scoping parameters (like a source and group identifier) to avoid accidentally sweeping up data from a different, unrelated load.

## The real risk: purging too early

The risk with purging isn't technical complexity — it's timing. Purging a batch of rejected rows before you've reviewed and corrected them destroys the evidence you need to fix the problem. If lesson 21's correct-and-resubmit workflow depends on reading a rejected row's exact values and error message from the interface table, purging that row first leaves nothing to read. The safe sequence is always: review and resolve rejections first, purge only once you're confident nothing in that batch still needs attention.

## How purging fits the broader workflow

Purging isn't something you do mid-troubleshooting — it's cleanup you do once a batch is fully resolved, successful rows and all. A sensible routine looks like: run the import, review the report, correct and resubmit any rejections using the techniques from lesson 21, confirm the corrected rows now succeed, and only then purge the interface table for that batch, typically choosing the narrower "successfully processed only" option unless you have a specific, deliberate reason to also clear out old rejected rows you've already decided not to pursue.

## Recap

Interface tables need periodic purging so they don't accumulate stale data indefinitely, and Oracle Fusion provides scoped purge options for successfully processed rows versus everything matching a batch. The only real danger is purging rejected rows before you've read and acted on their error detail — always resolve first, purge last. Next up, lesson 23: a complete troubleshooting scenario that puts Chapter 5's whole toolkit to work.
