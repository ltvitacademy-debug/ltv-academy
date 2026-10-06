# Receivables Troubleshooting Practice

This course has covered Receivables from setup through period close. This final lesson pulls it together with three realistic troubleshooting scenarios, each drawing on tools from across the whole course. Work through each one the way an actual Oracle Fusion Financials Consultant would: identify the symptom, trace it to a cause, and name the specific fix.

## What you'll learn

- How to reason through a stuck or missing receipt application
- How to diagnose a reconciliation difference between AR and GL
- How to handle a customer dispute that straddles collections and adjustments
- How the tools from every chapter connect into one diagnostic approach

## Scenario 1: A customer insists they paid, but the invoice still shows open

Fictional scenario: Meridian Office Supply calls, insisting they mailed a $1,800.00 check three weeks ago, but their invoice #3104 still shows as open and they just received a dunning letter. Walk the diagnosis:

1. Search Receivables for any receipt tied to Meridian around that date, regardless of application status (lesson 23, lesson 26). If a receipt exists but shows unapplied or on-account, the money arrived — it was just never matched to invoice #3104.
2. If no receipt exists at all, check whether it came through a lockbox batch that failed validation (lesson 28) and is sitting in an exceptions queue, unidentified.
3. Once found, apply the receipt to invoice #3104 (lesson 25), and the dunning escalation stops being accurate going forward.

The lesson here: before assuming a customer is wrong, or escalating further in collections, always check for unapplied and on-account cash. It's one of the most common false alarms in receivables.

## Scenario 2: GL and Receivables don't reconcile at period close

Fictional scenario: The reconciliation report (lesson 38) shows the GL's Accounts Receivable account is $4,250.00 higher than what Receivables itself shows as total open balances. Walk the diagnosis:

1. Run the Differences report to narrow down which transaction(s) explain the gap.
2. Check whether a transaction finalized its accounting but was never transferred/posted to GL (lesson 37) — the opposite problem, GL understated versus Receivables, usually points here.
3. Since GL is overstated relative to Receivables in this scenario, check for a manual journal entry made directly in GL that bypassed Receivables entirely — exactly the kind of out-of-process entry flagged in lesson 38.
4. Confirm the fix: either reverse the improper manual entry, or if it turns out to represent something legitimate (a true-up with no AR-side transaction to match), document why it's an accepted reconciling item rather than an error.

## Scenario 3: A long-overdue balance, a dispute, and a decision

Fictional scenario: Brightline Retail Group has a $3,200.00 invoice 95 days past due. Brightline disputes $200.00 of it as a billing error, but doesn't dispute the remaining $3,000.00 — they say they simply can't pay right now. Walk the diagnosis:

1. Verify the $200.00 dispute. If it's a legitimate billing error (say, an overcharged freight line), resolve it with an adjustment (lesson 30), not a write-off — the number was wrong, so fix the number.
2. For the undisputed $3,000.00, this is a collections conversation (lesson 32), not an accounting one yet — dunning has presumably already escalated given the 95-day age (lesson 34).
3. Only after collections efforts are genuinely exhausted, with no reasonable prospect of payment, does the $3,000.00 become a candidate for a transaction write-off (lesson 31) — and even then, within whoever's approval limit covers that amount.

The lesson here: don't reach for a write-off just because a balance is old. Separate what's actually wrong (fix it) from what's merely uncollected (collect it, and only write it off once collection has truly failed).

## Recap

Across these scenarios, the same discipline repeats: identify the symptom precisely, check for unapplied/on-account cash before assuming anything is actually missing, separate "the number is wrong" (adjustment) from "the number is right but uncollectible" (write-off), and use the reconciliation and differences reports to trace — not guess at — any gap between Receivables and GL.

This completes Oracle Fusion Accounts Receivable. You've gone from the order-to-cash context and receivables setup, through customers, transaction setup, transactions, receipts, adjustments, write-offs and collections, to accounting, reconciliation, and period close. Next in the Oracle Fusion Financials Consultant path: **Oracle Fusion Cash Management**, where you'll learn how the cash side of these same transactions — bank statements, reconciliation, and cash positioning — closes the loop between Receivables, Payables, and the bank.
