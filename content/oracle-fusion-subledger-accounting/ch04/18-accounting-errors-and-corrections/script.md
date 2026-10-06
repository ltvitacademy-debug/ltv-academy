# Script — Accounting Errors and Corrections

## Segment 1 (title)

Review sometimes turns up a problem. This lesson covers common categories of accounting errors, and the right way to correct each one - because the right fix depends entirely on whether the flawed entry is still in Draft or already Final.

## Segment 2 (steps)

Errors generally fall into a few buckets. Incomplete rules: an account or journal line rule with no matching condition for this transaction's data, even after passing validation. Inactive or missing accounts: a derived combination that doesn't actually exist in the Chart of Accounts. Missing setup data: a mapping set with no entry for a value that just showed up on a real transaction.

## Segment 3 (steps)

If the error surfaces in Draft, the fix is straightforward: correct the underlying issue, then simply re-run Create Accounting in Draft. A new draft run cleanly replaces the old one - no cleanup needed, just re-run and verify.

## Segment 4 (steps)

Once an entry is Final, the picture changes. You cannot delete or silently alter a Final entry - that would break the permanent audit trail. Instead, you reverse it: an offsetting entry cancels the incorrect original, followed by a new, correct entry. The flawed original still exists, preserving the record of what happened, but its net effect is cancelled.

## Segment 5 (code)

This is the same principle from basic accounting: don't erase a mistake, reverse it and re-book it correctly. And distinguish two kinds of fixes - a one-off reversal for bad data on a single transaction, versus fixing the rule itself (copy-first, from lesson eleven) when the error is systemic and likely affected more than just the one transaction someone noticed.

## Segment 6 (outro)

So remember: Draft errors get fixed and re-run; Final errors get reversed, never deleted; and always check whether a problem is one transaction or a flawed rule affecting many. Up next, lesson nineteen: transferring to General Ledger, the step that happens once a Final entry is confirmed correct.
