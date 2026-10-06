# Credit Memos

Credit memos are the mirror image of invoices: they reduce what a customer owes instead of increasing it. But not every credit memo behaves the same way once it's created, and the distinction matters for both accounting and cash application.

## What you'll learn

- The two kinds of credit memo: standard (applied) and on-account
- Common business reasons for issuing each kind
- How a credit memo's transaction type attributes (from lesson 12) determine its behavior

## Standard credit memos

A **standard credit memo** is created against a specific original invoice, reducing that invoice's balance directly. This is the natural application behavior discussed in lesson 12 — the credit memo's transaction type is configured to expect a match to an invoice. Common reasons:

- A pricing error on the original invoice (overbilled quantity or wrong unit price).
- A partial return of goods, reducing the amount owed proportionally.
- An agreed-upon allowance for a quality issue, reducing the invoice without a full return.

Once applied, the standard credit memo reduces the target invoice's open balance — a $12,500 invoice with a $500 standard credit memo applied against it shows a remaining open balance of $12,000.

## On-account credit memos

An **on-account credit memo** is not tied to any specific invoice when it's created. It simply exists as a credit balance on the customer's account, available to apply against any future invoice (or the current ones) whenever someone chooses to. Common reasons:

- A goodwill credit issued before any future invoice is even known yet.
- A credit resulting from a canceled order where the customer wants to apply the value to a future purchase instead of a refund.
- Situations where the specific invoice to credit genuinely isn't known or decided yet.

An on-account credit memo can sit unapplied on a customer's account for a long time — it still reduces the customer's total exposure for credit-limit purposes, but it doesn't close any particular invoice until someone applies it.

## Why the distinction matters

Accounting and reporting treat these differently in subtle ways: a standard credit memo immediately reduces a specific invoice's aging bucket. An on-account credit memo reduces the customer's total balance for credit purposes but keeps sitting separately until applied, meaning aging reports may still show the original invoice(s) as fully open until the credit is actually applied against them.

## A worked example

Harborline Retail Group returns $500 of defective merchandise from a $12,500 invoice. Northwind Fixtures Co. issues a standard credit memo for $500 against that specific invoice, bringing its open balance to $12,000 immediately. Separately, as a goodwill gesture for the inconvenience, Northwind also issues a $100 on-account credit memo — not tied to any invoice — which Harborline's AR contact can apply against whichever future invoice they choose.

## Recap

A standard credit memo applies against a specific invoice immediately, driven by the credit memo transaction type's natural application setting. An on-account credit memo sits unapplied on the customer's account until someone chooses an invoice to apply it against. Next up, lesson 21: AutoInvoice overview.
