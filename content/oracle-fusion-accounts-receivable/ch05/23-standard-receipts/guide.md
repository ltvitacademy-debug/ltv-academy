# Standard Receipts

Welcome to Chapter 5, Receipts. Everything in the last two chapters built toward this moment: a customer owes money on a transaction, and now money actually arrives. A **standard receipt** is how Oracle Fusion Receivables records a payment that is applied against one or more specific transactions — an invoice, a debit memo, a chargeback. It's the most common receipt type you'll work with, and it's the foundation for everything else in this chapter: automatic receipts, lockbox, reversals, all of it build on the standard receipt record.

## What you'll learn

- What a standard receipt is and how it differs from a miscellaneous receipt
- The fields that define a receipt: receipt method, remittance bank account, receipt number
- The receipt lifecycle: entered, applied, remitted, cleared
- How to enter and apply a standard receipt in one pass

## What makes a receipt "standard"

Receivables has two broad receipt types. A **standard receipt** is money received from a customer that gets applied — fully or partially — against their open transactions, reducing what they owe. A **miscellaneous receipt** (next lesson) is money that has nothing to do with a customer balance, like a rebate from a vendor or interest income. Almost every receipt you process day to day is standard: a customer pays an invoice, and Receivables needs to record that the invoice is now paid and the company's cash increased.

## The fields that define a receipt

Every standard receipt carries:

- **Receipt method** — this is the single most important field. It points to a receivables activity, a remittance bank account, and the accounting rules that determine which GL accounts get debited and credited. Receipt methods are configured during setup (back in Chapter 1) with a creation method of Manual or Automatic.
- **Remittance bank account** — the bank account the money is physically going into. This drives which cash account gets debited.
- **Receipt number and date** — the customer's check number or the bank reference, and the date the payment was received (which drives the accounting date, subject to the period being open).
- **Customer and amount** — who paid, and how much, in what currency.

Fictional example: Larkspur Furnishings Inc. receives a check for $4,250.00 from customer Meridian Office Supply on a Tuesday. The accounts receivable clerk opens the Create Receipt page, selects receipt method "Check — Operating Account," enters the check number as the receipt number, and keys in $4,250.00.

## The receipt lifecycle

A standard receipt moves through a predictable sequence of statuses:

1. **Entered / Unapplied** — the receipt exists in the system with an amount and a customer, but hasn't been matched to any transaction yet.
2. **Applied** — the clerk (or AutoInvoice/AutoMatch logic) has matched all or part of the receipt amount to one or more open transactions, reducing the customer's balance.
3. **Remitted** — the receipt has been sent to the bank for deposit (relevant mainly for non-cash instruments like checks going through a lockbox or manual deposit batch).
4. **Cleared** — the bank has confirmed the funds actually settled. Until clearing, the receipt sits in a "remittance" or "confirmation" clearing account rather than the final cash account, in case the check bounces.

Not every receipt method uses every status — a receipt method configured for "no clearance" skips straight from remitted to cleared in the accounting, because the company trusts the funds are good the moment they're deposited (common for a receipt method tied to a bank account that nets settlements quickly).

## Entering and applying in one pass

In practice, you rarely enter a receipt and walk away unapplied. The Create Receipt page lets you search for the customer's open transactions and apply the receipt amount against them in the same transaction:

- Search by customer, transaction number, or purchase order number
- Select one or more open transactions
- Apply the full balance due, or a partial amount if the customer underpaid
- Receivables immediately recalculates the customer's open balance

If Meridian Office Supply's $4,250.00 check exactly matches one open invoice, the clerk applies the full amount to that invoice and it is now closed. If it's a partial payment, or covers two smaller invoices, the clerk applies across both and the remaining balances stay open.

## Recap

A standard receipt records money received from a customer and applied against their open transactions. It's defined by a receipt method, remittance bank account, receipt number, and amount, and it moves through a lifecycle of entered, applied, remitted, and cleared. Next up, lesson 24: miscellaneous receipts, for money that has nothing to do with a customer's open balance.
