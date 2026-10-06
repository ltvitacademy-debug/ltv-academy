# Functional Interview Questions: Payables and Receivables

**Chapter 1 · Interview Preparation · Lesson 3 of 15**

Payables and Receivables questions test whether you understand the full transaction lifecycle on each side — not just how to enter an invoice, but what happens when something doesn't match, doesn't apply cleanly, or doesn't post. These are the questions most likely to come from someone who has actually run a close.

## What you'll learn

- Model answers for the most common AP and AR functional interview questions
- How to connect a feature question back to a real consequence, the way an experienced consultant does
- Where your capstone work gives you a concrete example instead of a textbook one

## Q&A: Accounts Payables

**"Explain 2-way versus 3-way matching, and when you'd use each."**
2-way matching compares the invoice to the purchase order — price and quantity agree, so it can pay. 3-way matching adds the receipt, confirming the goods or services were actually received before payment. You'd use 3-way matching for anything physical (raw materials, MRO parts) where paying before receipt is a real risk, and 2-way for services or situations where a receipt step doesn't apply.

**"What is a GRNI accrual, and what goes wrong if it's never reversed?"**
GRNI — goods received, not invoiced — books an accrual liability when goods arrive before the invoice does, so the expense and liability show up in the right period. It's designed to auto-reverse once the real invoice posts. If it doesn't reverse, the accrual sits on the books alongside the real invoice, and AP aging won't match what the GL shows is owed — exactly the symptom Elena Marsh called about in the capstone.

**"Walk me through what happens when an invoice goes on hold."**
Oracle evaluates holds (matching, tax, quantity, price, or a manually applied hold) before allowing payment. You'd investigate the specific hold reason, resolve the actual discrepancy — not just override the hold — and only release it once the underlying issue is fixed. Releasing a hold without fixing the cause just defers the same problem to the next close.

## Q&A: Accounts Receivable

**"How does AutoInvoice work, and what's the most common reason it fails?"**
AutoInvoice imports transaction data from an external or upstream source into AR, validating it against required setups (customer, transaction type, revenue accounts) before creating real invoices. It most commonly fails on missing or mismatched reference data — an invalid customer site, a transaction type that doesn't map to an active account combination.

**"Tell me about receipt application and what can go wrong."**
A receipt has to be applied to the specific invoice(s) it's paying. Misapplying it — applying the right dollar amount to the wrong invoice — makes the wrong invoice look paid and the right one look still open, which is exactly what the capstone's Harborview receipt problem looked like from the aging report: one invoice overdue that was actually paid, another overpaid that wasn't supposed to be.

**"How would you explain AR aging to a client who says the numbers don't look right?"**
Don't start by assuming the report is wrong. Pull the detail behind the summary, check specific invoices and their receipt applications, and confirm whether it's a timing issue (something posted after the report ran) or a real misapplication. Translate what you find back into plain language for the client — "this invoice shows open because a payment was applied to a different invoice by mistake" is a complete, credible answer.

## Key terms

| Term | Meaning |
|---|---|
| 2-way / 3-way matching | Invoice-to-PO, or invoice-to-PO-and-receipt, before payment |
| Hold | A system-applied block on payment until a specific discrepancy is resolved |
| AutoInvoice | The AR process that imports external transaction data into real invoices |

## Lab

Using the capstone's Harborview misapplied-receipt problem as your example, write out a 4-5 sentence answer to "tell me about a time AR aging was wrong and how you found out why" as if you were describing your own hands-on work.

## Check yourself

- Why would you choose 3-way matching over 2-way for a raw-materials purchase?
- What specifically goes wrong on AP aging when a GRNI accrual isn't reversed?
- What's the difference between releasing a hold and actually resolving it?
