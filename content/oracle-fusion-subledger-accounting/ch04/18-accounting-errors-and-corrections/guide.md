# Accounting Errors and Corrections

Review sometimes turns up a problem. This lesson covers the common categories of accounting errors in Subledger Accounting, and the right way to correct each one — because the right fix depends entirely on whether the flawed entry is still in Draft or already Final.

## What you'll learn

- Common categories of errors Create Accounting can surface
- Why a Draft error and a Final error require different responses
- How reversal, rather than deletion, handles a Final entry that's wrong
- The difference between fixing a rule and fixing a single transaction

## Common error categories

Create Accounting errors generally fall into a few recognizable buckets: **incomplete rules**, where an account rule or journal line rule has no matching condition for the data on a specific transaction (exactly the kind of gap validation tries to catch in lesson 14, but a rule can still pass validation and fail against an unusual real transaction later); **inactive or missing accounts**, where a derived account combination doesn't actually exist as a valid combination in the Chart of Accounts; and **missing setup data**, like a mapping set with no entry for a value that shows up on a real transaction (the exact scenario from the mapping-set lesson, if a new expense category is used before anyone updates the table).

## Draft errors: fix and re-run

If the error surfaces while an entry is still in Draft, the fix is usually straightforward: correct the underlying issue — fix the account rule's missing condition, update the mapping set, correct the Chart of Accounts combination — and simply re-run Create Accounting in Draft mode. As you learned in lesson 15, a new Draft run cleanly replaces the old one, so there's no cleanup needed; you just re-run and verify the corrected result.

## Final errors: reversal, not deletion

Once an entry has gone Final, the picture changes. You cannot simply delete or silently alter a Final subledger journal entry — doing so would break the permanent audit trail every accounting system depends on. Instead, the correction technique is **reversal**: creating an offsetting journal entry that cancels out the incorrect original, followed by a new, correct entry. The original flawed entry still exists in the system (preserving the audit trail of what actually happened and when), but its net financial effect is cancelled, and the correct accounting now exists alongside it.

This is the exact same principle you may already know from basic accounting: you don't erase a mistake, you reverse it and re-book it correctly, so there is always a complete, honest record of what happened.

## Fixing the transaction versus fixing the rule

It's worth distinguishing two different kinds of fixes. If one specific transaction was accounted incorrectly because of bad data on that transaction alone (a user picked the wrong expense category, say), the fix is a one-off reversal and correct re-entry for that transaction. But if the error traces back to the rule itself — an account rule missing a condition that will affect every future transaction of that type — the rule needs to be fixed (through the copy-first discipline from lesson 11), and then every other transaction that was affected by the same flawed rule needs to be identified and corrected too, not just the one that happened to get noticed first.

## Recap

Errors in Create Accounting generally trace back to incomplete rules, invalid accounts, or missing setup data. A Draft error is simply fixed and re-run; a Final error requires reversal, never deletion, to preserve the audit trail. Always distinguish a one-off transaction problem from a systemic rule problem, since a rule problem likely affected more than the one transaction you noticed. Next up, lesson 19: transferring to General Ledger, the step that happens once a Final entry is confirmed correct.
