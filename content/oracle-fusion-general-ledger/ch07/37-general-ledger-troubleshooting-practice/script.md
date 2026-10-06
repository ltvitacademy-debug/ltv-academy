# Script — General Ledger Troubleshooting Practice

## Segment 1 (title)

This final lesson is a practice run, not new material. Every tool used here was covered somewhere in this course. The goal is reaching for the right one quickly, which is most of what a GL consultant actually does.

## Segment 2 (steps)

Scenario one: Travel and Entertainment looks too high at LTV Manufacturing Corporation. Start with an inquiry to rule out a PTD versus YTD misread. If it's real, pivot it in Account Inspector by cost center. Pull the Account Analysis Report for the isolated cost center. If a line traces to a subledger, drill all the way to the source transaction.

## Segment 3 (steps)

Scenario two: March won't close. Check Manage Journals by status across every source. Diagnose error journals, chase stuck approvals, and only once everything's cleared does closing the period in Manage Accounting Period represent a true close.

## Segment 4 (code)

Scenario three: US and UK intercompany balances don't net to zero. Run the Intercompany Reconciliation Report. Check whether it's timing or FX. Confirm revaluation already ran. And if this ledger feeds a consolidation, confirm the pair is flagged for elimination.

## Segment 5 (steps)

All three scenarios follow the same shape: start from what looks wrong, use the least invasive tool first, and only drill deeper once you've narrowed down where the problem actually lives. Triage before you dig.

## Segment 6 (outro)

That completes General Ledger, the second course in the Financials Configuration stage. Next up: Accounts Payable, which picks up the same drill path from the other direction, starting at the supplier invoice and following it all the way to the journal you now know how to read.
