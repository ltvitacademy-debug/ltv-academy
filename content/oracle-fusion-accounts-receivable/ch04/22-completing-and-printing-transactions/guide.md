# Completing and Printing Transactions

This lesson closes Chapter 4 by tying off two loose ends that apply to every transaction type covered so far, however it was created: what "complete" actually requires, and how a completed transaction reaches the customer as a printed or emailed document.

## What you'll learn

- What Receivables checks before allowing a transaction to complete
- How the level of control (from transaction type and source) affects that check
- How transactions get printed or emailed to customers, individually or in batch

## What completion requires

Before a transaction can move from Incomplete to Complete, Receivables checks a set of conditions, some fixed and some configurable:

- A valid customer with a bill-to site is present.
- At least one line exists with a valid amount.
- Required fields for the transaction type (for example, a valid revenue account derivable through AutoAccounting) resolve successfully — recall from lesson 4 that system options can require a resolvable revenue account before completion.
- Tax and freight, if applicable, have calculated without error.

As covered in lesson 12, the specific transaction type and transaction source combination determines how strict this check is — a manually entered Standard Invoice might require a human to review everything, while a trusted AutoInvoice-imported transaction, already validated during import (lesson 21), can be configured to complete with less additional friction, since the heavy validation already happened upstream.

## Printing and distributing transactions

Once complete, a transaction is eligible to be printed or emailed to the customer. Options generally include:

- **On-demand printing** – reprinting or emailing a single transaction, useful when a customer calls asking for a copy.
- **Batch printing** – running a scheduled process that prints or emails every transaction completed since the last run, which is how most businesses actually get invoices out the door day to day.
- **Delivery method defaults** – many implementations default to email delivery using the billing contact's address (lesson 8) when one is on file, falling back to print/mail otherwise.

Printing itself doesn't change a transaction's accounting or balance status — it's purely a distribution step, separate from completion and from accounting.

## A worked example

Northwind Fixtures Co.'s AR team completes a batch of 40 invoices entered manually that afternoon, plus accepts 397 AutoInvoice-imported invoices from the overnight run (lesson 21) that completed automatically during import because their source/type combination allows it. At 5 PM, a scheduled batch print/email process picks up all 437 newly completed transactions, emails the ones with a billing contact address on file, and queues the rest for a physical mail run the next morning.

## Recap

Completion checks that a transaction has a valid customer, at least one valid line, and resolvable accounting, with the strictness of that check set by transaction type and source. Printing and emailing happen after completion, on demand or in scheduled batches, and don't themselves affect accounting or balance. This closes Chapter 4 — Transactions. Chapter 5 would move to Receipts, covering how customer payments come in and get applied.
