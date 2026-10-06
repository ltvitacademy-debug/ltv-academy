# Reversing Receipts

A receipt gets entered, applied, and everything looks settled — and then the check bounces, or the customer's bank stops payment, or the receipt was simply keyed for the wrong customer. Oracle Fusion Receivables cannot pretend money arrived that didn't. This lesson covers how a receipt gets reversed, and why the reason behind the reversal changes how it's handled.

## What you'll learn

- The difference between a standard reversal and a debit memo reversal
- Why NSF (non-sufficient funds) receipts need special handling
- What happens to an invoice that was closed by a receipt that later reverses
- Where receipt reversals show up in reporting

## Why receipts get reversed

A receipt reversal undoes a receipt that has already been recorded, because the money it represented didn't actually, or won't actually, arrive. Common reasons:

- **NSF / bounced check** — the bank returns the check because the customer's account didn't have sufficient funds
- **Stop payment** — the customer's bank blocks the payment on the customer's instruction
- **Data entry error** — the receipt was created against the wrong customer, wrong amount, or wrong bank account entirely

## Standard reversal vs. debit memo reversal

Receivables supports two reversal methods, and the choice matters for what happens next:

- **Standard reversal** simply undoes the receipt. The applied transaction(s) return to their prior open balance, as if the receipt had never been applied at all. This is the right choice for a clean data entry correction — the money was never real in the system's eyes, so just take it back out.
- **Debit memo reversal** also undoes the original receipt, but additionally creates a new debit memo for the reversed amount. This is the standard approach for an NSF check: the business still has a real claim against the customer (they owed the money, the payment attempt failed, they still owe it) and often wants to track a bank fee or penalty alongside it. The debit memo becomes a new open transaction the customer still needs to pay, distinct from whatever invoice the original receipt had closed.

## What happens to the original invoice

When a receipt that had closed an invoice gets reversed:

- With a **standard reversal**, the original invoice reopens at its original balance, exactly as if the payment never happened.
- With a **debit memo reversal**, the original invoice stays closed (the receipt's application to it isn't undone at that transaction), but a brand-new debit memo is created for the reversed amount, representing the customer's renewed obligation. Either way, the net effect on the customer's total balance owed is identical — the money the company thought it had is no longer there.

Fictional example: Meridian Office Supply's $4,250.00 check from lesson 23 bounces two weeks after being applied and closing the invoice. The AR clerk processes a debit memo reversal: the original invoice stays marked paid, but a new $4,250.00 debit memo is created and becomes Meridian's new open obligation, often with an added NSF fee line.

## Reporting visibility

Reversed receipts don't just quietly disappear from history — Receivables retains the full chain: original receipt, reversal, and (if applicable) the resulting debit memo, so an auditor or a collections agent can trace exactly what happened and when. This matters for both internal control and for a customer-facing conversation ("your June 3rd check was returned by your bank, resulting in debit memo #4521 for the same amount plus a $25 fee").

## Recap

A receipt reversal undoes a receipt whose money didn't materialize, using either a standard reversal (clean undo, invoice reopens) or a debit memo reversal (original stays closed, a new debit memo captures the renewed obligation — typical for NSF checks). Both leave a full audit trail. That wraps up Chapter 5. Next up, Chapter 6: Adjustments, Write-Offs and Collections, starting with lesson 30, adjustments.
