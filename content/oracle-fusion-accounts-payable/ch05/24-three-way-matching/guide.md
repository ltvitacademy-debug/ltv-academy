# Lesson 24 — Three-Way Matching

**Chapter 5 · Matching and Special Invoices · Lesson 24 of 42**

## What you'll learn

- What three-way matching adds on top of two-way matching
- How the receipt becomes the third document in the comparison
- Why three-way matching is the standard for physical goods
- What happens when an invoice is billed before a receipt exists

## The receipt joins the comparison

**Two-way matching** (Lesson 23) compares only the purchase order and the invoice. **Three-way matching** adds a third document: the **receipt** — the record created in the receiving function when goods physically arrive and are logged into the system. Now the comparison runs across three documents instead of two:

1. **Quantity ordered** (the PO line)
2. **Quantity received** (the receipt)
3. **Quantity and price invoiced** (the invoice)

The core question three-way matching answers that two-way matching cannot: *did we actually receive what we're being billed for?* An invoice can only validate for quantity up to what's been received — not just what was ordered.

## Why this matters for physical goods

For tangible goods — parts, materials, equipment — paying based on the PO alone means paying for things that might never show up. Three-way matching closes that gap by requiring a receipt before the matched quantity is billable. It's the standard matching rule for most inventory and non-services purchase orders in a typical procure-to-pay setup.

## Illustrative example

**Harbor Point Logistics**, a fictional supplier, ships a PO line for 200 pallets of packaging material at $8.00 each ($1,600 total). The warehouse logs a receipt for only 180 pallets — 20 are still in transit.

| | Ordered (PO) | Received | Invoiced |
|---|---|---|---|
| Quantity | 200 | 180 | 200 |
| Unit price | $8.00 | — | $8.00 |

Harbor Point invoices for the full 200 pallets, matching the PO price exactly. But only 180 have been received. Three-way matching catches the gap that two-way matching would have missed entirely — price matches, quantity matches the PO, yet the organization hasn't actually received 20 of those pallets. Payables places the invoice on a **Quantity Received hold** until either the remaining 20 pallets are received, or the invoice is corrected to bill only 180.

## What happens with partial receipts over time

Receiving is rarely all-or-nothing. A single PO line is often received across several shipments, and Payables tracks the running received quantity against it. An invoice can validate against whatever has accumulated so far — if the remaining 20 pallets from Harbor Point arrive next week and are logged as a second receipt, the held invoice can then pass on revalidation without anyone touching the invoice itself.

## Key terms

| Term | Meaning |
|---|---|
| Receipt | The record created when goods are logged as physically received against a PO |
| Three-way matching | Matches quantity and price across PO, receipt, and invoice |
| Quantity Received hold | A hold created when invoiced quantity exceeds what's been received |

## Check yourself

You're ready for Lesson 25 when you can answer, without looking: what question does three-way matching answer that two-way matching cannot?
