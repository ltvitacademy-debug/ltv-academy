# Ticket: AR Does Not Reconcile with GL

**Chapter 3 · Receivables and Cash Tickets · Lesson 1 of 5**

## What you'll learn

- What "AR doesn't reconcile with GL" actually means, and the report built specifically to investigate it
- Why a manual journal posted directly to the AR control account is a classic, specific cause
- How to confirm a suspected direct-journal cause before blaming it
- A resolution note that separates "found the gap" from "corrected the gap"

## The ticket

> **Ticket #40402 — Harbor & Vance Logistics.** Controller reports: "Our Receivables aging total doesn't match the AR control account balance in GL. They're off by $9,000 and I need this explained before we close the period." Severity: High.

## What reconciling AR to GL actually checks

Receivables transactions get accounted through Subledger Accounting and transferred to General Ledger, same pattern as Lesson 8's payment. Normally, the receivables subledger balance and the GL control account balance for Receivables agree — because every dollar that moves through AR is supposed to flow through that same pipeline into the same account. The **Receivables to Ledger Reconciliation Report** (run after the **Prepare AR to GL Reconciliation** process) exists specifically to confirm that agreement, broken out by transaction type, so a gap is visible at the category level rather than just as one unexplained total difference.

## Investigating

1. **Run Prepare AR to GL Reconciliation**, then review the **Receivables to Ledger Reconciliation Report**. The $9,000 gap is isolated to one category: an "Other" or non-AR-sourced amount in the GL balance that has no corresponding Receivables transaction behind it.
2. **Drill into the GL account's journal detail** for the period. One journal, entered manually (not through AutoInvoice, not through Create Accounting) for exactly $9,000.00, posted directly against the AR control account, described only as "Q3 adjustment."
3. **Trace who entered it and why.** It was a direct journal entered by a GL user correcting a prior-period AR balance believed to be overstated — bypassing Receivables entirely instead of adjusting it through a Receivables transaction.

## Root cause

A manual journal was posted directly to the AR control account in General Ledger to make an adjustment, rather than being entered as a transaction in Receivables. The subledger never saw that adjustment, so the subledger total and the GL control account total now disagree by exactly that amount — a classic and specific cause of AR-to-GL breaks, not a systemic processing failure.

## Resolving it

The adjustment itself may well be legitimate — AR balances can genuinely need correcting. The problem is *where* it was entered. The correct fix is to reverse the direct GL journal and enter the equivalent adjustment as a proper Receivables transaction (e.g., an adjustment or credit memo against the specific customer/transaction it relates to), so it flows through the subledger and reconciles naturally going forward.

## Documenting it

> **Ticket #40402 — Harbor & Vance Logistics.** Controller reported a $9,000 gap between the Receivables aging total and the GL AR control account.
> **Root cause:** A $9,000 manual journal was posted directly to the AR control account in GL (described as "Q3 adjustment") rather than entered as a Receivables transaction, so the subledger never reflected it.
> **Fix:** Reversed the direct GL journal; entered the equivalent adjustment as a Receivables transaction against the correct customer.
> **Verified:** Re-ran Prepare AR to GL Reconciliation — the $9,000 gap is gone; subledger and GL control account now agree.
> **Note:** Recommend GL users route all AR balance corrections through Receivables transactions rather than direct journals to the control account.

## Key terms

| Term | Meaning |
|---|---|
| AR control account | The GL account that should always equal the Receivables subledger total |
| Receivables to Ledger Reconciliation Report | Report confirming Receivables and GL agree, broken out by category |
| Direct journal | A manual journal posted straight to GL, bypassing the subledger entirely |

## Check yourself

Why is reversing the direct journal and re-entering the same adjustment through Receivables a better fix than simply leaving the GL journal in place once the amount is confirmed legitimate?
