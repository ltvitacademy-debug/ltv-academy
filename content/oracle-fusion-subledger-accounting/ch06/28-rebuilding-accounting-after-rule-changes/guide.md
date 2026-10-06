# Rebuilding Accounting After Rule Changes

Lesson 25's troubleshooting scenario ended with fixing a rule and re-accounting the one transaction that triggered the investigation. This lesson asks the harder question that scenario left open: what about every other transaction that the same flawed rule already touched, before anyone noticed?

## What you'll learn

- Why fixing a rule doesn't automatically fix past transactions
- What options exist for re-accounting transactions already affected by an old, flawed rule
- Why already-transferred and posted entries require extra care
- How to think about the scope of impact before acting

## Fixing the rule doesn't rewrite history

An important, easy-to-miss fact: updating an account rule (correctly, following lesson 11's copy-first discipline) only changes how *future* Create Accounting runs behave. It does nothing, by itself, to transactions that were already accounted under the old, flawed version of the rule. Those transactions still carry whatever the old rule produced, whether that was Draft, Final, or even already transferred and posted in the General Ledger.

## Options depend on status

If the affected transactions are still in **Draft**, the fix is the simplest case from this entire course: re-run Create Accounting in Draft mode for those events, and the corrected rule now applies, cleanly replacing the old draft result, exactly as covered in lesson 15.

If the affected transactions are already **Final** but not yet transferred to GL, the situation is more sensitive — you learned in lesson 18 that Final entries are not simply deleted or silently altered. Depending on company policy and the specifics of the Fusion release in use, this may call for the reversal-and-re-entry pattern from lesson 18, applied to every affected transaction, not just the one that was first noticed.

If the affected transactions have already been **transferred to GL and posted**, correcting them touches the General Ledger too, not just the subledger — meaning this now also needs to follow whatever period-close and adjustment procedures your company's General Ledger course taught you, on top of the subledger-level reversal.

## Why scope matters before you act

Before correcting anything, it's essential to determine the full scope: exactly which transactions were affected by the flawed rule, across which date range, and in what status. Lesson 21's Account Analysis Report and Journal Entries Report are the tools for identifying that full population — searching for every transaction matching the conditions the old rule mishandled, not stopping at the one transaction that happened to get noticed. Correcting one transaction while leaving nine other equally-affected transactions untouched leaves the books still wrong, just less visibly so.

## Recap

Fixing a flawed rule only changes future accounting; already-accounted transactions under the old rule need to be identified (using lesson 21's reports) and corrected individually, using the status-appropriate technique — a Draft re-run, a Final reversal, or, if already posted in GL, a correction that also respects GL period-close procedures. Next up, the final lesson in this course, lesson 29: design patterns for a manufacturing company, a capstone-style scenario pulling together everything you've learned.
