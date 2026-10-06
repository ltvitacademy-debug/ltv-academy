# Accounting for Receivables Transactions

Every transaction and receipt covered so far in this course quietly generates accounting behind the scenes. This lesson makes that accounting explicit: what debits and credits actually get created for an invoice, a receipt, a credit memo, and a write-off, and how Receivables decides which GL accounts to use for each one.

## What you'll learn

- The basic accounting entry behind an invoice
- The basic accounting entry behind a standard receipt
- How Receivables determines which GL accounts to use (AutoAccounting)
- Why Receivables is a subledger, not the General Ledger itself

## Receivables is a subledger

Receivables doesn't post directly to the General Ledger the moment a clerk saves a transaction. It's a **subledger** — a detailed, transaction-level system that captures every invoice, receipt, credit memo, and adjustment with full detail (customer, transaction number, line items), and then summarizes that activity into journal entries that eventually reach the GL. This two-layer structure, subledger plus GL, is what lets a company keep granular transaction history in Receivables while the GL stays focused on summarized balances. Subledger Accounting (SLA), introduced in the Chapter 3 revenue recognition lesson, is the engine that performs this translation.

## The accounting behind an invoice

A standard invoice, once accounted, typically creates:

- A **debit** to Accounts Receivable (increasing what the customer owes)
- A **credit** to Revenue (recognizing the sale)
- If tax applies, a **credit** to a tax liability account
- If freight is billed, a **credit** to a freight revenue or recovery account

## The accounting behind a receipt

A standard receipt, once accounted, typically creates the reverse:

- A **debit** to Cash (increasing the company's bank balance)
- A **credit** to Accounts Receivable (decreasing what the customer owes)

A miscellaneous receipt (Chapter 5) still debits Cash, but credits whatever GL account the Receivables Activity specifies — interest income, a gain account, and so on — instead of Accounts Receivable, since there's no customer balance to reduce.

## How Receivables knows which accounts to use: AutoAccounting

Receivables doesn't ask a clerk to pick GL accounts by hand on every transaction. **AutoAccounting** is the rules engine, configured during setup, that derives the correct GL account segment values automatically based on attributes like the transaction type, the Receivables Activity, the customer, or the salesperson tied to the transaction. This is the same philosophy you saw with receipt methods and Receivables Activities throughout this course: configure the rule once, and every transaction that matches gets accounted consistently without manual account entry.

## Recap

Receivables is a subledger: it captures detailed transaction activity and relies on Subledger Accounting to translate that activity into journal entries. An invoice typically debits Accounts Receivable and credits Revenue (plus tax and freight as applicable); a receipt typically debits Cash and credits Accounts Receivable (or another account, for miscellaneous receipts). AutoAccounting rules determine which specific GL accounts apply, without manual account entry on every transaction. Next up, lesson 36: creating accounting in Receivables — the actual process that runs these rules.
