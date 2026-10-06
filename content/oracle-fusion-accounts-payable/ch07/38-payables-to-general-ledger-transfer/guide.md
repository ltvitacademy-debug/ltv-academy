# Lesson 38 — Payables to General Ledger Transfer

**Chapter 7 · Accounting, Reconciliation and Close · Lesson 38 of 42**

## What you'll learn

- Why "accounted in Payables" is not the same as "posted in the GL"
- The two ways a transfer to GL can happen
- What a journal batch is, and why it must still be posted
- Why this separation matters for period close

## Final accounting isn't the same as a posted GL journal

Lesson 37 ended with Create Accounting generating final journal entries. That's a necessary step, but it's not the last one — those entries exist inside Payables' subledger accounting tables. They still have to be **transferred** into the General Ledger as actual journal batches, and even then, **posted** before they affect account balances. Three distinct states, not one:

1. **Accounted** (in Payables, via Create Accounting, Final mode)
2. **Transferred** (journal batches now exist in GL, unposted)
3. **Posted** (the GL journal batch has been posted, balances updated)

## Two ways the transfer happens

| Method | Behavior |
|---|---|
| **Transfer to GL option on Create Accounting** | Create Accounting itself can be run with "Transfer to General Ledger" selected, so accounting and transfer happen as one combined step |
| **Separate "Transfer Journal Entries to GL" program** | A standalone process that picks up any already-accounted-but-not-yet-transferred entries and moves them to GL as journal batches |

Either way, what lands in the GL is a **journal batch** — grouped, dated, and identified by source ("Payables") and category (e.g., "Purchase Invoices," "Payments") — not individual, unbatched lines.

## Posting is still a separate action

Arriving in GL as an unposted batch means the entries exist, but account balances haven't changed yet. Someone (often an automated process, but configurable) still has to **post** the batch in General Ledger — this separation exists so GL-level controls (like requiring review of incoming subledger journals before they hit the books) can be enforced independently of what Payables already finalized on its side.

## Illustrative example

**Solace Robotics** (fictional, reused from Lesson 27) runs Create Accounting in Final mode for last week's Payables activity, with "Transfer to General Ledger" selected. The result: one journal batch, "AP-WK14-Invoices," containing 58 lines across 30 invoices, and a second batch, "AP-WK14-Payments," containing 24 lines from last week's payment run. Both batches arrive in GL in **unposted** status. The GL accountant reviews both, confirms totals tie back to the Payables subledger, and posts them — only then do the balances in the chart of accounts actually reflect that week's AP activity.

## Why this three-step separation matters

Keeping "accounted," "transferred," and "posted" as distinct, visible states is exactly what makes **reconciliation** possible (Lesson 39 and Lesson 41): if a number in the GL doesn't match what Payables says it accounted, you can check at which of these three stages the two sides diverged, rather than treating it as one opaque black box.

## Key terms

| Term | Meaning |
|---|---|
| Transfer to GL | Moving finalized subledger accounting entries into General Ledger as journal batches |
| Journal batch | A grouped set of journal lines in GL, identified by source and category |
| Posted | The state where a GL journal batch has updated account balances |

## Check yourself

You're ready for Lesson 39 when you can answer, without looking: what are the three distinct states a Payables transaction's accounting passes through before it affects a GL account balance?
