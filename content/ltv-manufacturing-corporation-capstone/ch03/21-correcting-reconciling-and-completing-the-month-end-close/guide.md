# Correcting, Reconciling and Completing the Month-End Close

**Chapter 3 · The January 31 Challenge · Lesson 21 of 25**

Six root causes are confirmed. This lesson fixes every one of them, reconciles every account they touched, and closes LTV's first-ever month-end period. This is the lesson the whole capstone has been building toward.

## What you'll learn

- The specific correction applied to each of the six confirmed problems
- How to verify each correction before moving to the next
- The final, tied-out numbers for AP, AR, Assets, Cash, SLA, and intercompany
- What "period close" actually requires, mechanically, once every item is resolved

## Fix 1 — AP: reversing the stale accrual

A manual reversing journal, **JE-REV-0131**, is entered: debit Accrued Liabilities (2150) $18,400.00, credit Inventory clearing $18,400.00, dated January 31. This finally does what JE-GRNI-1231's missing auto-reverse flag should have done automatically. **Verification:** account 2150's balance for the Meridian bearings PO now shows zero — AP aging and the GL agree.

## Fix 2 — AR: reapplying the receipt correctly

Mateo Rios unapplies RCPT-50231 from INV-HV-29890 and reapplies the full $55,100.00 to INV-HV-30144. **Verification:** INV-HV-30144 now shows paid in full; INV-HV-29890 correctly shows its original $6,100.00 open balance, unaffected. Harborview's AR aging detail finally matches reality.

## Fix 3 — Assets: reclassifying the lathe

Derek Shaw processes an asset **reclassification** transaction on FA-10452: category changes from Office Equipment to Manufacturing Equipment — Machinery, cost center changes from 410 to 420, both effective January 2 (the original placed-in-service date). January's depreciation is adjusted from $2,416.67 down to the correct $1,208.33, and the $1,208.34 difference is corrected in the current period. **Verification:** FA-10452's asset record now shows the correct 10-year life, correct cost center, and corrected depreciation history.

## Fix 4 — Cash Management: the bank's reversal

Regions Bank confirms in writing that the second $9,200.00 debit was a duplicate transmission and reverses it, crediting the account back $9,200.00 on February 2. Grace Olsen records the bank's reversal in Cash Management and completes the reconciliation. **Verification:** the bank statement and the GL cash balance now agree exactly — this is the one fix that required no GL correction at all, only the bank's own action and documentation.

## Fix 5 — Subledger Accounting: adding the missing rule

Sarah Lindqvist adds the missing mapping line to the Account Rule for the Freight Charge transaction type, pointing it to account 7850. She reruns Create Accounting for the 14 previously Incomplete transactions. **Verification:** all 14 now show accounting status "Complete," and the $4,250.00 transfers to the General Ledger.

## Fix 6 — General Ledger: posting the intercompany journal

Victor Okafor reviews INTERCO-JAN-0131 one final time, confirms the $27,750.00 allocation, and submits it for posting. **Verification:** the US entity's Corporate Overhead expense correctly reduces by its allocated share, the Canadian entity books the matching intercompany payable and expense, and the two entities' intercompany balances net to zero in consolidation.

## Completing the close

With all six items resolved and verified, Victor Okafor reruns the trial balance for both ledgers, confirms every subledger (Payables, Receivables, Fixed Assets, Cash Management) reconciles to its GL control account, and closes period **Jan-26** in both the US and Canada primary ledgers. LTV's first month-end close is, finally, actually complete.

## Key terms

| Term | Meaning |
|---|---|
| Reclassification | A Fixed Assets transaction that changes an asset's category, cost center, or other attributes without changing its cost |
| Period close | The formal status change that prevents further posting to a period once all reconciliations are complete |

## Recap

All six problems are now corrected and verified: the AP accrual reversed, the AR receipt reapplied, the asset reclassified and depreciation corrected, the bank's duplicate reversed, the SLA rule added and Create Accounting rerun, and the intercompany journal posted. Period Jan-26 is closed. Next up, lesson 22: deliverables — the reports, issue log, and documentation Elena Marsh actually asked for.
