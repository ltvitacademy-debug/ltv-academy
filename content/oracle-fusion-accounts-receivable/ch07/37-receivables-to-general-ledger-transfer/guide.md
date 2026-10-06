# Receivables to General Ledger Transfer

Lesson 36 ended with final, locked-in journal entries sitting in the Receivables subledger. This lesson covers the last leg of the journey: getting those entries into the General Ledger itself, where they combine with AP, fixed assets, and every other subledger to produce the company's actual financial statements.

## What you'll learn

- What the Transfer Journal Entries to GL process does
- Posting versus transferring — two separate steps
- Why a company might transfer continuously versus once at period end
- What to check if GL balances don't match what Receivables shows

## Transfer versus posting: two different steps

It's worth being precise about two actions that sound similar but aren't the same:

- **Transfer** moves the summarized subledger journal entries from Receivables into the General Ledger's own journal tables. At this point, the entries exist in GL, but aren't yet posted — they could, in principle, still be reviewed before posting.
- **Posting** is the GL-side action that takes a journal entry (regardless of its subledger origin) and makes it final within the GL itself, updating account balances.

Lesson 36 already covered that Create Accounting can trigger the transfer automatically (Transfer to General Ledger = Yes) or leave it for a separate step. Either way, once the data is in GL, someone (or an automated process) still needs to post it.

## Continuous transfer versus period-end transfer

Companies choose between two broad philosophies for timing:

- **Continuous transfer** moves and posts Receivables journal entries to GL throughout the month, as transactions are finalized, giving near-real-time visibility into AR's impact on the company's financials at any moment.
- **Period-end transfer** batches everything up and transfers it once, deliberately, at month-end — common when a company wants a clean, controlled cutoff and prefers to review everything together before it lands in GL.

Neither approach is universally "correct" — it's a trade-off between real-time visibility and a more controlled, batch-oriented close process, and it's a decision made during implementation, not something a clerk chooses transaction by transaction.

## Why reconciling matters here

Once transferred and posted, the GL's Accounts Receivable account balance should match Receivables' own records of total open transaction balances. If it doesn't, something broke in the chain — a transaction failed to account, a manual journal entry was made directly in GL without going through Receivables (which it should never need to), or a transfer run was skipped. Tracking down a mismatch starts with checking whether every Receivables transaction for the period actually has final accounting, and whether every final entry was actually transferred and posted — exactly the kind of check the next lesson's reconciliation report automates.

## Recap

Transferring moves summarized subledger entries into GL's journal tables; posting is the separate GL-side step that finalizes them into account balances. Companies choose continuous or period-end transfer timing based on their own close philosophy. When GL and Receivables balances don't match, the usual suspects are unaccounted transactions, skipped transfers, or out-of-process manual journal entries. Next up, lesson 38: Receivables period close and reconciliation, where this all comes together into a formal close checklist.
