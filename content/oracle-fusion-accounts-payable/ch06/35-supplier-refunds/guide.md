# Lesson 35 — Supplier Refunds

**Chapter 6 · Payments · Lesson 35 of 42**

## What you'll learn

- Why a supplier refund is money flowing in, not a standard outbound payment
- What situations create a credit balance worth refunding
- How recording a refund is different from issuing a payment
- What a refund does to the supplier's open balance

## Payments flow out. Refunds flow in.

Everything else in this chapter — quick payments, PPRs, payment files — has been about money moving *from* the organization *to* a supplier. A **supplier refund** is the reverse: money the supplier sends *back*, usually because the supplier owes the organization more than any future invoice will naturally absorb.

## What creates a refundable credit balance

| Situation | Example |
|---|---|
| **Unused prepayment** | A deposit paid (Lesson 26) for work that was ultimately cancelled |
| **Large credit memo** | A credit memo (Lesson 27) larger than any invoice currently open against that supplier |
| **Overpayment** | A duplicate or incorrect payment sent to the supplier by mistake |

In any of these cases, the supplier is sitting on a credit balance with the organization — money the organization is, in effect, owed back — and there's no upcoming invoice large enough to net it out naturally.

## Recording a refund, not issuing a payment

A refund isn't processed the way an outbound payment is. Instead, Payables has a **Record Refund** action that captures the money actually received back from the supplier — typically a check or wire the supplier sends — and applies it against the specific credit memo or prepayment balance that created the credit in the first place. Recording the refund reduces the supplier's open credit balance to zero (or to whatever remains), the same way a payment reduces an invoice's open balance, just moving in the opposite direction.

## Illustrative example

**BrightPath Consulting Group** (fictional, reused from Lesson 26) had its $20,000 engagement cancelled after only the $6,000 prepayment had been paid. With no invoice left to apply that prepayment against, BrightPath sends a $6,000 check back to the organization.

| Step | Action |
|---|---|
| 1 | Prepayment of $6,000 exists, unapplied, with no invoice to offset it |
| 2 | Engagement is formally cancelled |
| 3 | BrightPath sends a $6,000 refund check |
| 4 | **Record Refund** entered in Payables against the prepayment |
| 5 | Supplier's open credit balance returns to $0 |

## Why this matters for reconciliation

Without recording the refund, the prepayment would sit on the books indefinitely as an unapplied credit — making the supplier's account look like money is still owed when, in fact, it has already been returned. Recording it keeps the supplier's balance accurate and closes the loop the original prepayment opened.

## Key terms

| Term | Meaning |
|---|---|
| Supplier refund | Money a supplier sends back to the organization, usually against a credit balance |
| Record Refund | The Payables action that applies a received refund against a credit memo or prepayment |

## Check yourself

You're ready for Lesson 36 when you can answer, without looking: what three situations typically create a credit balance that ends up refunded?
