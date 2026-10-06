# Deliverables: Reports, Issue Log and Implementation Documentation

**Chapter 3 · The January 31 Challenge · Lesson 22 of 25**

Fixing the problem isn't the end of a real engagement — proving it's fixed, in writing, is. This lesson assembles the seven deliverables Elena Marsh needs before the board meeting: two financial statements, two aging reports, a reconciliation report, an issue log, and implementation documentation.

## What you'll learn

- The seven deliverables this capstone has been building toward since lesson 2
- What belongs in each one, specifically, for LTV's January close
- How to write an issue log entry that an executive — not just another consultant — can read
- Why "it's fixed" and "here's proof it's fixed" are different deliverables

## The two financial statements

- **Income Statement**, period Jan-26, both entities: Product Revenue, Freight Out (now correctly posted), Corporate Overhead Allocation Expense (now correctly split between entities), Depreciation Expense (now correctly stated at $1,208.33 for FA-10452), Utilities Expense, and the rest of January's activity, fully reconciled.
- **Balance Sheet**, as of January 31: Cash — Operating (tied to the corrected bank reconciliation), Accounts Receivable — Trade (tied to corrected aging), Fixed Assets and Accumulated Depreciation (reflecting FA-10452's correct category), Accounts Payable — Trade and Accrued Liabilities (with the stale accrual cleared), and Intercompany Receivable/Payable (now equal and offsetting between entities).

## The two aging reports

- **AP Aging**, as of January 31: ties exactly to the GL's Accounts Payable — Trade and Accrued Liabilities balances, with no lingering $18,400.00 discrepancy.
- **AR Aging**, as of January 31: shows INV-HV-30144 paid in full and INV-HV-29890 correctly open at $6,100.00 — Harborview's account finally tells the true story.

## The reconciliation report

A single document covering all of January's reconciliations: the Regions Bank reconciliation (now tied exactly, with the bank's written confirmation of its duplicate-transmission reversal attached), the GRNI/accrual reconciliation (confirming no other PO carries a similar unreversed accrual), and the intercompany reconciliation (confirming the US and Canadian entities' intercompany balances net to zero).

## The issue log

Six entries, one per root cause, each written in the same symptom/cause/fix/verification format used throughout this path's Troubleshooting course:

| # | Symptom | Root cause | Fix | Verified |
|---|---|---|---|---|
| 1 | AP aging vs. GL mismatch | JE-GRNI-1231's auto-reverse flag unchecked | JE-REV-0131 reversing entry | Account 2150 ties |
| 2 | Harborview invoice looked unpaid | Receipt RCPT-50231 misapplied | Unapplied and reapplied correctly | AR aging matches reality |
| 3 | Depreciation looked heavy | FA-10452 miscategorized | Asset reclassified | Depreciation corrected to $1,208.33 |
| 4 | $9,200.00 unreconciled | Bank duplicate transmission | Bank reversed debit | Statement ties to GL |
| 5 | Receivables missing from GL | No Account Rule for 7850 | Rule added, Create Accounting rerun | 14/14 Complete |
| 6 | Intercompany didn't tie | INTERCO-JAN-0131 unposted | Journal submitted and posted | Nets to zero |

## The implementation documentation

A narrative record of Chapter 1's actual configuration decisions — the enterprise structure, the chart of accounts design, the calendar, and every master data setup choice — written so a future consultant (or Elena's next hire) can understand *why* LTV's Oracle Fusion instance is built the way it is, not just *what* is configured.

## Why both "fixed" and "proof" matter

Elena Marsh doesn't just need the numbers to be right by January 31 — she needs to be able to tell her board, with documentation behind her, exactly what went wrong and exactly how she knows it's resolved. That's the difference between a consultant who quietly patches a problem and one who leaves a client able to defend their own numbers.

## Key terms

| Term | Meaning |
|---|---|
| Issue log | A structured record of each problem, its root cause, its fix, and how the fix was verified |
| Implementation documentation | A narrative record of configuration decisions and the reasoning behind them |

## Recap

Seven deliverables are now assembled: the Income Statement, Balance Sheet, AP Aging, AR Aging, Reconciliation Report, Issue Log, and Implementation Documentation — everything Elena Marsh needs before the board meets. Next up, lesson 23: the final presentation, where you walk her through what was wrong and how it was corrected.
