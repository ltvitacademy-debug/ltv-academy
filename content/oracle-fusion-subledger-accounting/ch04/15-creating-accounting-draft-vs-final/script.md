# Script — Creating Accounting: Draft vs. Final

## Segment 1 (title)

Chapters one through three were entirely setup: events, rules, AADs, methods, validation, activation. Chapter four is where all that setup actually runs against real transactions. This lesson covers the program that does the running, Create Accounting, and its most important parameter: Draft or Final mode.

## Segment 2 (steps)

Create Accounting is the process that takes eligible accounting events sitting in a subledger and applies the active accounting method's AADs to them, producing subledger journal entries. Every concept from chapters one through three exists to feed this one process. Its output is a batch of journal entries, any errors, and a summary report.

## Segment 3 (steps)

In Draft mode, the resulting journal entries can be reviewed - lines, accounts, amounts, descriptions - but they can't transfer to the General Ledger and aren't permanent. It's a safe place to sanity-check what the rules actually produced before committing. Draft runs can be repeated as many times as needed; each new run just replaces the previous draft.

## Segment 4 (steps)

In Final mode, the journal entries become permanent - the official subledger accounting record, eligible to transfer to General Ledger. You don't casually re-run Final the way you re-run Draft. Correcting a Final entry means using the correction techniques from lesson eighteen, not overwriting it.

## Segment 5 (code)

Most companies run Draft first, sometimes automatically right after a transaction saves, purely so the accounting is visible with zero risk. Final then runs on a schedule - nightly or at period-end - once transactions are settled, or on demand once review is complete.

## Segment 6 (outro)

So remember: Draft is reviewable and safely repeatable, Final is permanent and transfer-eligible, and Draft-then-Final is the standard pattern nearly every implementation uses. Up next, lesson sixteen: creating accounting in Payables and Receivables, the two subledgers you already know best.
