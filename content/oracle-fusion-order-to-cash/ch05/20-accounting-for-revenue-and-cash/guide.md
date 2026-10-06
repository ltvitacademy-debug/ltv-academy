# Accounting for Revenue and Cash

Every document SO-48217 has generated so far — the invoice, the credit memo, the cash receipt — has an accounting consequence. None of those consequences were created by a person manually typing a journal entry. This lesson looks at what those entries actually are, and how Subledger Accounting generates them automatically from the business events you've already followed.

## What you'll learn

- The journal entry a standard invoice creates
- The journal entry a credit memo creates
- The journal entry a cash receipt creates
- How Subledger Accounting turns a business event into a journal entry without anyone typing debits and credits

## From business event to journal entry

Receivables doesn't just store a transaction amount; each transaction type is tied to a defined accounting event (Invoice, Credit Memo, Receipt, and others). Subledger Accounting (SLA) holds rules — journal entry rule sets — that say, for a given event, which accounts get debited and credited and how the amount is derived. This is exactly the SLA concept you covered in that course on its own; here, you're seeing it fire for a real sequence of events instead of in isolation.

## The three entries SO-48217 generated

**1. The invoice** (400 units, $55,100.00): a standard Receivables invoice debits the Receivable account and credits Revenue for the invoiced amount.

- Dr Receivable $55,100.00
- Cr Revenue $55,100.00

**2. The credit memo** (20 returned units, $2,755.00): a credit memo reverses part of that same entry, in the opposite direction, reducing both the receivable and the revenue by the credited amount.

- Dr Revenue $2,755.00
- Cr Receivable $2,755.00

**3. The cash receipt** ($52,345.00): applying the receipt against the invoice replaces the receivable with cash — it doesn't touch revenue at all, because revenue was already recognized when the invoice posted.

- Dr Cash $52,345.00
- Cr Receivable $52,345.00

## Checking the receivable nets to zero

Add up the receivable side across all three entries: $55,100.00 debit, then $2,755.00 credit, then $52,345.00 credit. $55,100.00 − $2,755.00 − $52,345.00 = $0.00. The receivable account for this specific invoice is fully cleared, exactly matching what you already confirmed happened in Receivables in lessons 17 and 19 — the accounting is simply the formal record of the same facts.

## Why none of this was typed by hand

A consultant troubleshooting unexpected accounting on an O2C transaction is really troubleshooting the SLA rule that fired for a given event — the account derivation, the rule condition, or the event class itself — not hunting for a typo in a manual journal entry, because there usually isn't one. Order-to-Cash accounting is a byproduct of the transactions you've already walked through, generated consistently by rules, not entered freely.

## Recap

The invoice recognizes revenue and creates a receivable; the credit memo reverses part of both; the cash receipt replaces the remaining receivable with cash, without touching revenue again. All three entries come from Subledger Accounting rules reacting to Receivables events, not manual entry. Next up, lesson 21: how these entries actually get from Subledger Accounting into the General Ledger itself.
