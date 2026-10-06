# Receivables Period Close and Reconciliation

Everything in this course up to this point — setup, transactions, receipts, adjustments, accounting — comes together once a month into a single disciplined event: closing the Receivables period. This lesson walks through the close checklist and the formal reconciliation report that proves AR and GL agree before the books lock.

## What you'll learn

- The sequence of a Receivables period close
- What "Close Pending" status means and why it exists
- The Prepare Receivables to General Ledger Reconciliation process
- How to investigate differences the reconciliation report finds

## The close sequence

A Receivables period close generally follows this order:

1. **Finish month-end activity** — import any remaining billing data, apply outstanding receipts, approve pending adjustments and write-offs. Nothing should be left half-done.
2. **Run Create Accounting for the period** — final account every remaining eligible transaction so nothing sits unaccounted (lesson 36).
3. **Set the Receivables period status to Close Pending** — a transitional status that still allows corrections and reruns if something turns up, without yet fully locking the period the way a hard "Closed" status would.
4. **Run the reconciliation process** — described below — to confirm Receivables and GL agree.
5. **Resolve any differences**, then close the period for good.

## Why "Close Pending" exists

Closing a period outright, with no transitional step, would be risky — if a reconciliation difference turns up after a hard close, correcting it gets much harder (reopening a closed period has its own controls and complications). **Close Pending** is a middle state: transaction entry and most changes are discouraged or restricted, signaling to the team that close is underway, but the period isn't fully locked, so if reconciliation surfaces a problem, it can still be investigated and fixed before the final, hard close.

## The reconciliation process

The **Prepare Receivables to General Ledger Reconciliation** scheduled process prepares transaction and accounting data specifically so it can be compared against GL. Running it produces the **Receivables to Ledger Reconciliation Report**, which lays out, by GL account, the Receivables-side balance and the GL-side balance side by side. When they match, the period's AR activity is proven consistent with what actually landed in the General Ledger — not just assumed to be.

## Investigating a difference

When the reconciliation report shows a difference, Receivables also provides a **Differences report** to help pinpoint the cause. Typical causes echo exactly what lesson 37 already flagged:

- A transaction that never got final accounting
- A transaction accounted but never transferred/posted to GL
- A manual journal entry made directly in GL, bypassing Receivables entirely (which should essentially never happen for an AR-sourced balance)
- A transaction accounted to the wrong GL account due to an AutoAccounting setup issue

Each of these has a distinct fix: rerun Create Accounting, rerun the transfer, correct or reverse the out-of-process manual entry, or correct the setup and reprocess. The reconciliation report doesn't fix anything by itself — it tells you precisely where to look.

## Recap

Closing a Receivables period means finishing month-end activity, running final accounting, moving to Close Pending, reconciling AR against GL, and resolving any differences before the final close. Close Pending is a deliberate safety valve, and the Prepare Receivables to General Ledger Reconciliation process (with its companion Differences report) is the formal proof that AR and GL agree. Next up, lesson 39: Receivables troubleshooting practice, the final lesson of this course, where you'll work through realistic problem scenarios end to end.
