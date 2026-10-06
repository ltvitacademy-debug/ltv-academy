# Cash Management Accounting

Reconciliation confirms the books match the bank. This lesson covers the last step: how reconciled Cash Management transactions actually become journal entries in the General Ledger, and why reconciliation has to come first.

## What you'll learn

- Why reconciliation is a prerequisite for accounting, not a parallel step
- What the Create Accounting process does
- How Subledger Accounting handles multi-currency gain/loss
- How this ties back to the Cash to General Ledger Reconciliation report from Lesson 14

## Why reconciliation comes first

Here's the rule that ties this whole course together: transactions posted directly in Cash Management — like the bank account transfers from Lesson 16, and the external transactions from Lesson 15 — "can only be accounted into General Ledger once reconciled with the bank statement." This isn't an arbitrary sequencing rule; it reflects a real control principle: Oracle won't let you book a journal entry for cash movement until there's bank-confirmed evidence that the movement actually happened. A transaction that's entered but never clears the bank should never quietly become a permanent GL entry.

## The Create Accounting process

Once a transaction is reconciled, **Create Accounting** is the process that actually generates its journal entry, by submitting the transaction to **Oracle Fusion Subledger Accounting**. Subledger Accounting applies the accounting rules (which accounts to debit and credit, based on the transaction type and setup) and produces the entry, which then transfers to the General Ledger. This can run in draft mode (to preview the entry without posting) or final mode, and can run online (for a single transaction, interactively) or as a scheduled batch process (for everything accumulated since the last run) — the same general pattern used elsewhere in Subledger Accounting across the Financials suite.

## Multi-currency gain and loss

When a transaction involves a currency difference — most commonly a bank account transfer between accounts in different currencies (Lesson 16) — any resulting gain or loss from the exchange rate used is calculated by Subledger Accounting during Create Accounting, not by Cash Management when the transaction was first entered. Cash Management's job was just to record the transaction amounts; figuring out the accounting consequence of the exchange rate is Subledger Accounting's job.

## Tying back to the GL reconciliation report

Lesson 14 covered the Cash to General Ledger Reconciliation report, and now its logic should click fully into place: it compares what's reconciled in Cash Management against what's actually posted in the GL cash account, and the two can legitimately differ for a little while whenever something is reconciled but hasn't yet been through Create Accounting. That's not a data error — it's exactly the gap this lesson's rule produces, and it closes the moment Create Accounting runs.

## A worked example

Harborview Metals Inc.'s $50,000.00 weekly sweep from Lesson 16 reconciles against Friday's statement on both the From and To accounts. That evening's scheduled Create Accounting run picks up both reconciled external transactions and generates the journal entries — a credit to the lockbox account's cash balance, a debit to the concentration account's cash balance — which then post to the General Ledger, closing out that day's gap on the Cash to GL Reconciliation report.

## Key terms

| Term | Meaning |
|---|---|
| Create Accounting | The process that generates journal entries for reconciled CM transactions via Subledger Accounting |
| Reconciled-before-accounted rule | CM transactions must be reconciled before they can be accounted into GL |

## Recap

A Cash Management transaction must be reconciled before it can be accounted, and Create Accounting then hands it to Subledger Accounting to generate the journal entry — including calculating any FX gain or loss — which posts to the GL. Next up, lesson 20: a troubleshooting-style practice lesson pulling every chapter of this course together.
