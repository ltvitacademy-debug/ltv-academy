# Script — Subledger Accounting Troubleshooting Practice

## Segment 1 (title)

This lesson closes chapter five with a realistic troubleshooting scenario end to end, using the habits and reports from the last four lessons together, the way you'd actually use them on the job.

## Segment 2 (steps)

The scenario: a controller says invoice INV-5540, from new supplier International Freight Partners, was validated three days ago but isn't anywhere in the General Ledger. Start with Review Journal Entries, searching for the transaction. If no subledger entry exists at all, the problem is upstream of GL - Create Accounting either hasn't run, or it ran and errored.

## Segment 3 (steps)

Suppose it errored. Given a new supplier and an "International" freight mention, this smells like lesson eighteen's incomplete-rule category - a Freight account rule with a condition for Domestic, no fallback for International. That's exactly the kind of gap that produces an error instead of a journal entry.

## Segment 4 (steps)

If an entry exists but shows Draft status, the explanation is immediate: Draft entries can't transfer to GL. Not a rule problem at all - Final mode simply hasn't run yet, whether from scheduling timing or pending review.

## Segment 5 (code)

If it's Final but still missing from GL, check whether Transfer Journal Entries to GL has run since, and whether journal import created the batch. Filtering the GL journal batch list by source "Payables" for that date is the fastest confirmation.

## Segment 6 (outro)

Resolving this case: the Freight account rule only covered Domestic. Following lesson eighteen, that's a rule problem - copy and update the rule per lesson eleven's discipline, add the International condition, re-run Draft to confirm, then Final. That closes chapter five. Up next, chapter six, lesson twenty-six: multiple accounting representations.
