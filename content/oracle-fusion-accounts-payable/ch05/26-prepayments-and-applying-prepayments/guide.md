# Lesson 26 — Prepayments and Applying Prepayments

**Chapter 5 · Matching and Special Invoices · Lesson 26 of 42**

## What you'll learn

- What a prepayment invoice is and why it's a distinct invoice type
- The difference between a Temporary and a Permanent prepayment
- The sequence: pay the prepayment, then apply it to a standard invoice
- What has to be true before a prepayment can be applied

## A prepayment is its own invoice type

A **prepayment** is money paid to a supplier before the goods or services it covers have been invoiced in the normal sense — a deposit, an advance, a retainer. In Payables, it isn't entered as a note on a future invoice; it's created and processed as its own **invoice type**, distinct from a Standard invoice, with its own distribution and its own payment.

Prepayments come in two flavors:

| Type | Behavior |
|---|---|
| **Temporary** | Intended to be applied against a future standard invoice from the same supplier, reducing what that invoice still owes |
| **Permanent** | Not intended to be applied to anything later — effectively a payment in its own right (used less often) |

This lesson focuses on the temporary prepayment, since applying it is the whole point.

## The sequence: pay first, apply later

A prepayment has to go through its own full lifecycle before it can do anything useful:

1. **Create** the prepayment invoice (type = Prepayment) for the deposit amount.
2. **Validate** it, same as any invoice.
3. **Pay** it — the prepayment must be fully paid before it's eligible for application.
4. Later, when the real invoice for the goods/services arrives, **apply** the prepayment against it, reducing the amount still due.

Applying can happen automatically during validation of the standard invoice (if the supplier has prepayments available and automatic application is enabled) or manually from the invoice.

## Illustrative example

**BrightPath Consulting Group**, a fictional supplier, requires a 30% deposit before starting a $20,000 engagement.

| Step | Document | Amount |
|---|---|---|
| 1 | Prepayment invoice created and paid | $6,000 |
| 2 | Standard invoice received for full engagement | $20,000 |
| 3 | Prepayment applied against standard invoice | −$6,000 |
| 4 | **Net amount still payable** | **$14,000** |

Without applying the prepayment, the organization would risk paying BrightPath the full $20,000 — effectively paying for the deposit twice.

## What has to be true before you can apply

- The prepayment must be **fully paid** — an unpaid prepayment can't be applied.
- The prepayment and the standard invoice must be for the **same supplier** (and typically the same business unit).
- There must be an **unapplied amount** remaining on the prepayment (it hasn't already been used elsewhere).

Tax treatment on prepayments also matters: depending on configuration, tax can be calculated when the prepayment is paid, or deferred until it's applied — this is a setup decision made once, not per transaction.

## Key terms

| Term | Meaning |
|---|---|
| Prepayment | An invoice type representing an advance payment made before the related goods/services are invoiced |
| Temporary prepayment | A prepayment intended to be applied against a future standard invoice |
| Apply (a prepayment) | Reducing a standard invoice's amount due by an available, unapplied prepayment |

## Check yourself

You're ready for Lesson 27 when you can answer, without looking: what has to be true about a prepayment before it can be applied to a standard invoice?
