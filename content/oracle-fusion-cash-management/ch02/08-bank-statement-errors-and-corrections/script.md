# Script — Bank Statement Errors and Corrections

## Segment 1 (title)

The last two lessons covered how a statement is supposed to flow through load and import. This lesson covers what happens when it doesn't — the errors you'll actually run into, and how each one gets corrected.

## Segment 2 (steps)

Five patterns show up repeatedly. An unmapped account number, where the statement's account doesn't match any bank account record in Oracle. A duplicate statement, loaded twice. An out-of-balance statement, where the lines don't sum to the stated opening and closing balances. An unmapped transaction code, from last lesson. And a currency or format mismatch, where a field doesn't parse the way the format expects.

## Segment 3 (steps)

It's tempting to treat every error as a bad file, but most recurring errors trace back to setup gaps — an account that hasn't been created, a code that hasn't been mapped, a currency that was never set. A genuinely corrupted file from the bank is comparatively rare. That matters because the fix for a setup gap is to fix the setup once, not patch every statement that hits it.

## Segment 4 (code)

A fictional illustration: Harborview Metals Inc's treasury team re-ran a load process after a mapping fix, without first checking whether the original attempt had already created statement header records. The result was a duplicate statement that had to be manually found and removed before import could run cleanly. The lesson: confirm the state of the existing attempt before reloading, don't just rerun blindly.

## Segment 5 (outro)

Identify the error, classify it as one-time or recurring, fix the root cause, then reprocess carefully. Up next, lesson nine: the matching rules and reconciliation rules that take over once a statement loads cleanly.
