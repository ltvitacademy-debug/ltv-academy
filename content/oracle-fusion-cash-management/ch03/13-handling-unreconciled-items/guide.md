# Handling Unreconciled Items

Even with well-tuned matching rules and a diligent manual reconciliation process, some items stay stubbornly unreconciled past the point where they should have cleared. This lesson is about diagnosing why, and the standard set of resolutions.

## What you'll learn

- The main categories of unreconciled items, and why each one happens
- How "timing differences" differ from genuine errors
- The standard resolution path for each category
- Why aging unreconciled items matters operationally

## Timing differences: not actually a problem

Some unreconciled items aren't really a problem — they're just timing. **Outstanding checks** (issued and recorded in Oracle, but not yet cashed by the recipient) and **deposits in transit** (recorded in Oracle, but not yet processed by the bank) are both completely normal and simply need to wait for the bank to catch up. The correct action here is usually: nothing, yet — review again on the next statement, and only escalate if the item is still outstanding well beyond a reasonable window (an outstanding check six months old is a different conversation than one six days old).

## Missing transactions: something hasn't been recorded yet

Sometimes a bank statement line has no system counterpart because the underlying transaction simply hasn't been entered into Oracle yet — a receipt that hasn't been keyed into Receivables, or a disbursement processed outside the normal Payables run. The resolution here is to record the missing transaction (or confirm it's being recorded on a normal cycle) rather than trying to force a match against something that doesn't exist yet.

## Bank errors: rare, but real

Occasionally, the bank itself made an error — charged the wrong amount, applied a transaction to the wrong account, or double-processed something. These require contacting the bank directly; Cash Management can document the discrepancy and may need to record a temporary adjusting entry while the bank investigates, but it cannot "fix" a bank-side error from inside Oracle.

## Duplicate or erroneous system entries

Less commonly, the system side is wrong — a transaction was entered twice in Oracle, or entered with an incorrect amount. These need correction at the source (reversing or correcting the duplicate/incorrect entry in Payables or Receivables), not a workaround in Cash Management.

## Why aging matters

Treating every unreconciled item the same regardless of age hides real problems behind normal timing noise. Most implementations age unreconciled items (how many days has this been sitting unreconciled?) and expect Treasury to specifically review anything crossing a threshold — commonly 30 days — since an item that age is unlikely to be ordinary timing and more likely to be a missing transaction, a bank error, or a genuine mistake that needs attention before it compounds (for instance, into a month-end close that doesn't tie out).

## A worked example

Harborview Metals Inc.'s month-end review turns up three unreconciled items: a $1,200 check issued eight days ago (normal — still within a reasonable clearing window), a $600 Receivables receipt that was double-entered by a new AR clerk eleven days ago (a duplicate entry — corrected by reversing the duplicate in Receivables), and a $9,400 wire that First Continental Bank applied to the wrong Harborview account forty-two days ago (a bank error, now escalated directly to the bank's treasury services team with supporting documentation).

## Key terms

| Term | Meaning |
|---|---|
| Outstanding check / deposit in transit | A normal timing difference, not yet processed by the bank |
| Bank error | A mistake made by the bank, requiring direct escalation |
| Aging | Tracking how long an item has sat unreconciled, to flag real problems |

## Recap

Not every unreconciled item is a problem — timing differences resolve themselves, while missing transactions, bank errors, and duplicate entries each need a specific, different fix. Aging unreconciled items by days outstanding is how a Cash Manager tells the difference. Next up, lesson 14: the reports that make all of this visible.
