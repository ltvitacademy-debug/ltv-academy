# Lesson 23 — Two-Way Matching

**Chapter 5 · Matching and Special Invoices · Lesson 23 of 42**

## What you'll learn

- What "matching" means in Payables and why it exists
- What two-way matching checks, and what it deliberately does not check
- How matching tolerances decide whether a mismatch becomes a hold
- When two-way matching is the right fit for a purchase order

## Why match an invoice to a PO at all

A **matched invoice** ties what a supplier billed back to what your organization actually agreed to buy. Instead of trusting the invoice on its own, Payables compares it against a document your own organization created earlier — the purchase order — before it lets the invoice through validation unchallenged. Matching is one of the main internal controls built into procure-to-pay: it stops you paying for things you never ordered, at prices you never agreed to.

**Two-way matching** is the simplest version of that check. It compares the invoice to the purchase order on exactly two things:

1. **Quantity** — does the quantity billed match the quantity ordered on the PO line?
2. **Price** — does the unit price billed match the unit price on the PO line?

Nothing else. Two-way matching never looks at whether the goods actually arrived.

## What two-way matching leaves out, on purpose

Because two-way matching doesn't check a receipt, it's the right fit for purchase orders where a formal receiving step isn't required — a common setup for **services** (consulting hours, a maintenance contract, a subscription) or low-risk, low-dollar indirect purchases where requiring someone to log a receipt in the system would be more process overhead than the risk justifies.

For anything where you want proof the goods actually showed up before you pay for them, two-way matching alone isn't enough — that's what three-way and four-way matching (lesson 24 and lesson 25) add on top.

## Illustrative example

**Cascade Industrial Parts** is a fictional supplier set up on a PO for 100 units of a bearing assembly at $12.50 each — a $1,250 PO line, no receipt required.

| | Ordered (PO) | Invoiced |
|---|---|---|
| Quantity | 100 | 100 |
| Unit price | $12.50 | $12.50 |

Quantity and price both match exactly. Payables validates the invoice without creating a matching hold.

Now suppose Cascade invoices 100 units at $12.95 instead:

| | Ordered (PO) | Invoiced |
|---|---|---|
| Quantity | 100 | 100 |
| Unit price | $12.50 | $12.95 |

Whether that becomes a problem depends entirely on tolerance.

## Matching tolerances decide what counts as "close enough"

A dollar-for-dollar, unit-for-unit match almost never happens in practice — a supplier rounds differently, or a price was updated after the PO was issued. **Matching tolerances**, set up in a tolerance set and assigned at the supplier or purchasing-category level, define how much variance is allowed before Payables stops the invoice:

| Tolerance type | What it limits |
|---|---|
| **Quantity Ordered tolerance** | How far invoiced quantity can exceed ordered quantity, as a percent |
| **Invoice Price tolerance (%)** | How far unit price can vary from the PO price, as a percent |
| **Invoice Price tolerance (amount)** | A flat dollar ceiling on the price variance per line |

In the example above, a 5% price tolerance allows up to $13.125 per unit — the $12.95 invoice passes. Without that tolerance, or with a tighter one, Payables places the invoice on a **Price hold**, and it sits unpaid until someone resolves it (holds are covered in Chapter 4).

## Key terms

| Term | Meaning |
|---|---|
| Matching | Comparing an invoice to a purchase order before it can be validated and paid |
| Two-way matching | Matches quantity and price only — no receipt required |
| Matching tolerance | The allowed variance between PO and invoice before a hold is created |
| Price hold | A hold placed when invoice price exceeds the allowed tolerance |

## Check yourself

You're ready for Lesson 24 when you can answer, without looking: what two things does two-way matching compare, and what does it never check?
