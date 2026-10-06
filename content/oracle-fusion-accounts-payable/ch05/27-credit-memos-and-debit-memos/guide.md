# Lesson 27 — Credit Memos and Debit Memos

**Chapter 5 · Matching and Special Invoices · Lesson 27 of 42**

## What you'll learn

- The difference between a credit memo and a debit memo in Payables
- Who typically originates each document
- How both reduce a liability without a payment ever moving
- How to match a memo back to the original invoice or PO

## Two documents, same direction: less owed

Both **credit memos** and **debit memos** reduce the amount an organization owes a supplier. The distinction in Oracle Fusion Payables is about **who created the document**, not the accounting direction:

| Document | Typically created by | Common cause |
|---|---|---|
| **Credit memo** | The supplier | Supplier issues it to correct an overcharge, return, or pricing error on their own invoice |
| **Debit memo** | Your own organization | Your organization determines it was overcharged and records the reduction itself, even before the supplier agrees |

A credit memo arrives *from* the supplier, acknowledging money is owed back. A debit memo is raised internally, often while a dispute with the supplier is still being worked out — it records your organization's position on the record even if the supplier hasn't issued a matching document yet.

Both are entered in Payables as **negative-amount invoices**, which is why they reduce (rather than add to) a supplier's outstanding balance.

## Illustrative example

**Solace Robotics**, a fictional company, received a $15,000 standard invoice from a supplier for a batch of components. On inspection, 10% of the batch was defective.

| Document | Amount | Who issued it |
|---|---|---|
| Original standard invoice | $15,000 | Supplier |
| Credit memo for defective units | −$1,500 | Supplier (acknowledges the return) |
| **Net amount owed** | **$13,500** | — |

If the supplier had been slow to issue that credit, Solace Robotics' AP team could instead have recorded a **debit memo** for −$1,500 against the same invoice, documenting the dispute internally while collections with the supplier continued.

## Matching a memo to the original document

A credit or debit memo can be matched back to the original purchase order or the original invoice, the same way a standard invoice is matched. Matching the memo to the PO (or to the specific invoice it corrects) keeps the reduction tied to the right transaction, rather than floating as an unexplained negative balance against the supplier — which matters both for audit and for whoever reconciles the supplier's account later.

## Key terms

| Term | Meaning |
|---|---|
| Credit memo | A supplier-issued negative-amount invoice reducing what's owed |
| Debit memo | An organization-issued negative-amount invoice reducing what's owed, often before supplier agreement |
| Negative-amount invoice | How both memo types are represented in Payables |

## Check yourself

You're ready for Lesson 28 when you can answer, without looking: what's the key difference between who issues a credit memo and who issues a debit memo?
