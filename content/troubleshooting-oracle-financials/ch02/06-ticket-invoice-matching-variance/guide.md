# Ticket: Invoice Matching Variance

**Chapter 2 · Payables Tickets · Lesson 3 of 7**

## What you'll learn

- How 2-way, 3-way, and 4-way matching change which holds are even possible
- A quantity-variance ticket where the receipt, not the invoice, is the real problem
- Why fixing the receipt is sometimes the correct fix, not the invoice

## Matching levels, briefly

A PO-matched invoice is checked against the purchase order (2-way: price and quantity ordered), optionally against the receipt (3-way: adds quantity received), and optionally against an inspection record (4-way). The matching level is configured on the purchase order line, and it determines which holds are even possible — a 2-way match will never produce a **Qty Rec** hold, because it never looks at receiving at all.

## The ticket

> **Ticket #40217 — Harbor & Vance Logistics.** AP clerk reports: "Invoice from Component Edge Inc. won't clear — it's on a Qty Rec hold and the vendor is asking about payment." Severity: Medium.

## Investigating

1. **Open the Holds tab.** One hold: **Qty Rec** — quantity billed exceeds quantity received beyond tolerance.
2. **Compare the three numbers.** PO quantity ordered: 500 units. Invoice quantity billed: 500 units. Receipt quantity: only 320 units received so far.
3. **Check receiving.** This PO is set to 3-way matching, so the invoice is checked against what's actually been received, not just what was ordered. The supplier shipped the full 500 units, but the warehouse only logged a partial receipt of 320 — the remaining 180 units arrived on a separate truck three days later and were never recorded in Receiving.

## Root cause

The invoice correctly bills for all 500 units received by the supplier, but Receivable Logistics' warehouse only recorded a partial receipt (320 of 500) in the system. The hold is doing exactly its job — the invoice is ahead of what the system shows as physically received.

## Resolving it

This is a case where the invoice is *not* the problem — the receiving record is incomplete. The correct fix is to enter the missing receipt for the remaining 180 units (dated to when they actually arrived), not to override the hold or alter the invoice. Once the receipt reflects all 500 units received, the Qty Rec variance disappears on its own and Validation can be resubmitted.

Compare this to Lesson 5's Price hold, where the PO was the wrong record. Here, the receipt is the wrong record. The lesson is the same in both cases: find out which of the three documents (PO, receipt, invoice) is actually inaccurate, and fix *that one* — don't reflexively assume the invoice is always what's broken, and don't manually release a hold just because it's blocking payment.

## Documenting it

> **Ticket #40217 — Harbor & Vance Logistics.** AP clerk reported invoice from Component Edge Inc. blocked by a Qty Rec hold.
> **Root cause:** Warehouse recorded only a partial receipt (320 of 500 units); the remaining 180 units had physically arrived but were never entered in Receiving.
> **Fix:** Entered the missing receipt for 180 units, dated to actual arrival; resubmitted invoice Validation.
> **Verified:** Qty Rec hold cleared automatically once the receipt reflected all 500 units; invoice now eligible for payment.
> **Note:** Recommend the warehouse confirm a process for logging split/partial deliveries on the same PO line promptly.

## Key terms

| Term | Meaning |
|---|---|
| 2-way match | PO vs. invoice: price and quantity ordered |
| 3-way match | Adds the receipt: quantity actually received |
| 4-way match | Adds an inspection record on top of the receipt |
| Qty Rec hold | Quantity billed exceeds quantity received beyond tolerance |

## Check yourself

In a Qty Rec hold, which of the three documents — PO, receipt, or invoice — is most often the one that's actually wrong, and why does it matter which one you correct?
