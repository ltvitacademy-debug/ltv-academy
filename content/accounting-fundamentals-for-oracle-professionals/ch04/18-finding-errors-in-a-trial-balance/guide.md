# Finding Errors in a Trial Balance

If a trial balance doesn't balance, something is definitely wrong — and this lesson is a troubleshooting toolkit for finding it quickly, instead of re-checking every transaction from scratch.

## What you'll learn

- The most common causes of an out-of-balance trial balance
- Two quick arithmetic tricks that narrow down the likely cause
- Why "close, but not exact" differences are often the easiest to diagnose
- Why this troubleshooting mindset carries directly into real Oracle Fusion support work

## Common causes of an imbalance

1. **A one-sided entry**: a debit (or credit) was posted, but its matching credit (or debit) was never entered at all.
2. **A transposition error**: digits were swapped when keying an amount — $1,950 typed as $1,590, for instance.
3. **An amount posted to only one column**: an amount correctly calculated but accidentally entered in the debit column *and* the credit column of the same side, or omitted from one side entirely.
4. **A math error in totaling** the trial balance's own columns, rather than an error in any individual entry.

## Quick trick 1: divide the difference by 9

Transposition errors — swapping two adjacent digits — always produce a difference that is evenly divisible by 9. If your trial balance is off by $360, check: $360 ÷ 9 = 40, a whole number, so a transposition error is quite plausible. If the difference were $127, dividing by 9 gives a non-whole number, ruling transposition out and pointing you toward a different cause.

## Quick trick 2: divide the difference by 2

If an amount was correctly calculated but posted entirely to the wrong side (for example, a $500 debit was accidentally also entered as a $500 debit instead of a credit, doubling up one side instead of offsetting it), the resulting imbalance will be exactly twice that amount, and so divisible by 2 evenly with a clean, recognizable result. If your trial balance is off by $1,000, check whether a $500 amount might have been posted to the wrong side entirely.

## A systematic approach

1. Re-add both trial balance columns — rule out a simple addition mistake first, since it's the fastest to check.
2. Compare this period's trial balance to last period's — did an account that's usually there go missing, or a new, unexpected account appear?
3. Scan for one-sided entries — any journal entry where a debit (or credit) line has no apparent counterpart.
4. Apply the division tricks above to the dollar amount of the imbalance itself.
5. As a last resort, re-verify each journal entry's own internal balance, one at a time, starting with the most recent and largest.

## Worked example

A fictional firm, **Westbridge Consulting Group**, finds its trial balance off by exactly $90. $90 ÷ 9 = 10, a clean whole number — a transposition error is likely. On review, an entry recorded $4,500 as $4,590 in one account while correctly posting $4,500 on the other side — the $90 difference ($4,590 − $4,500) matches exactly.

## Why this matters for Oracle Fusion support work

Even in a modern system, imbalances can still occur from manual journal entries, data conversion errors during an implementation, or integration issues feeding transactions in from another system. A consultant who understands these classic error patterns — and the quick arithmetic tricks to narrow down a cause — will diagnose a client's "why doesn't this balance" issue dramatically faster than one just staring at a long list of accounts hoping to spot something.

## Recap

Common causes of an out-of-balance trial balance include one-sided entries, transposition errors, and posting to the wrong side. Dividing the difference by 9 flags transposition errors; dividing by 2 flags a one-sided posting error. That completes Chapter 4. Next up, Chapter 5 and lesson 19: accrual vs. cash accounting, the concept hinted at throughout this entire chapter.
