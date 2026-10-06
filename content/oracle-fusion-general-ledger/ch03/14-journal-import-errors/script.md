# Script — Journal Import Errors

## Segment 1 (title)

Lesson nine covered validation errors you hit while completing a journal on screen. Import adds an earlier layer of checking, against raw data before it ever becomes a journal line. Let's see what trips it.

## Segment 2 (steps)

The common rejections look familiar: an invalid ledger ID that doesn't match anything Oracle recognizes, an invalid or disabled account combination, a currency code that's misspelled or not enabled, a period that's closed or doesn't exist, or a required column left blank. Same underlying rules as lesson nine — just caught earlier, against staged data instead of an on-screen journal.

## Segment 3 (code)

Picture a real import run: four hundred eighty rows submitted. Four hundred sixty-two get accepted and become a journal batch. Fourteen get rejected for an invalid account combination — a disabled segment value. Four more get rejected for a typo in the currency code. The report tells you exactly which rows and why, not just "errors occurred."

## Segment 4 (steps)

That precision is the whole point. You don't regenerate the whole file or re-upload the four hundred sixty-two rows that already worked. You fix just the eighteen rejected rows — correct the account combination, fix the currency code typo — and resubmit only those.

## Segment 5 (outro)

Rows that passed are already sitting in a journal batch, ready for the same validation, approval, and posting flow as anything else. Next up, lesson fifteen: auto post criteria — letting General Ledger post routine, trusted batches without anyone touching a button.
