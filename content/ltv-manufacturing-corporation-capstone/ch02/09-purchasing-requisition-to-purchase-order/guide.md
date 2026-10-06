# Purchasing: Requisition to Purchase Order

**Chapter 2 · Running the Business · Lesson 9 of 25**

Chapter 1 built the foundation. This lesson runs the first real transaction through it: a requisition for replacement bearings at the Savannah plant, converted into a purchase order with Meridian Bearing Supply Co. Remember the amount — it comes back in Chapter 3.

## What you'll learn

- How a requisition becomes a purchase order in Oracle Fusion Self Service Procurement and Purchasing
- The specific transaction this capstone follows: Dana Whitfield's bearing requisition
- Which account combination the purchase order charges, and why
- Why this transaction is dated in December, one month before the close you'll fix in Chapter 3

## The need

Dana Whitfield, maintenance supervisor at the Savannah plant, is down to her last few spare bearings for a production-line motor in Fabrication. She creates a requisition for a replacement stock of **Industrial Pump Bearing, Model PB-4400** — a stocked MRO item — quantity 50 units.

## The requisition

- **Requester:** Dana Whitfield
- **Item:** Industrial Pump Bearing, Model PB-4400
- **Quantity:** 50 units
- **Unit price (catalog):** $368.00
- **Total:** $18,400.00
- **Deliver-to:** Savannah plant, Fabrication department
- **Charge account:** `1000-420-1410-0000-000` — US entity (1000), Fabrication cost center (420), Inventory — Raw Materials (1410), since PB-4400 is a stocked item held in inventory, not expensed on receipt
- **Supplier suggestion:** Meridian Bearing Supply Co., LTV's preferred supplier for this item category — Self Service Procurement surfaces it automatically because of lesson 6's preferred-supplier flag

The requisition routes through approval (a single-level approval, since it's under LTV's requisition approval threshold) and is approved the same week.

## The purchase order

Marcus Ibarra, LTV's senior buyer, converts the approved requisition into a formal purchase order:

- **PO number:** PO-55210
- **Supplier:** Meridian Bearing Supply Co.
- **Line:** Industrial Pump Bearing PB-4400, 50 units @ $368.00 = $18,400.00
- **Terms:** Net 30, matched at the three-way level (PO, receipt, invoice)
- **Charge account:** the same `1000-420-1410-0000-000` from the requisition — the purchase order inherits its distribution directly from the approved requisition line

PO-55210 is dated **December 22** — late enough in December that the bearings won't arrive and be fully processed by Payables before the year turns over, which is exactly what sets up lesson 10's receiving and invoicing timeline.

## Why the date matters

A requisition-to-PO transaction this routine wouldn't normally deserve a callout for its date. It matters here because PO-55210 crosses a period boundary — ordered in December, received in December, but not invoiced by Meridian until January. That timing gap is the exact shape of a GRNI (Goods Received, Not Invoiced) accrual, which lesson 17 and Chapter 3 both come back to.

## Key terms

| Term | Meaning |
|---|---|
| Three-way matching | Comparing the purchase order, the receipt, and the supplier invoice before an invoice can be paid |
| Stocked item | An item received into inventory (an asset account) rather than expensed immediately |

## Recap

PO-55210 — Meridian Bearing Supply Co., 50 units of Industrial Pump Bearing PB-4400, $18,400.00, charged to Fabrication's inventory account — is this capstone's first real transaction, dated December 22 and set up to cross into January. Next up, lesson 10: receiving and AP invoicing, where the bearings arrive and Meridian's invoice enters the picture.
