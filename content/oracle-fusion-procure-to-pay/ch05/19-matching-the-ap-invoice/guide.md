# Matching the AP Invoice

Meridian Bearing Supply Co. sends its invoice for the 50 bearings. Chen Liu, the AP processor, now has to confirm that what Meridian is billing for actually matches what was ordered and what was received, before LTV pays a dollar.

## What you'll learn

- Why matching exists and what it protects against
- The difference between 2-way, 3-way, and 4-way matching
- How tolerances allow small, acceptable differences through
- What a matching hold is, and what happens to Meridian's invoice

## Why matching exists

**Matching** compares an invoice against the purchase order (and often the receipt) before the invoice is allowed to be paid. Without it, a company would simply trust whatever a supplier billed, with no independent check that the price is what was agreed, the quantity is what was actually delivered, or that the goods arrived at all. Matching is the control that stands between a supplier's claim and LTV's cash leaving the building.

## 2-way, 3-way, and 4-way matching

The number in "N-way matching" describes how many documents must agree:

- **2-way matching** checks the invoice against the purchase order only: invoice price must be at or below the PO price, and invoice quantity billed must be at or below quantity ordered. It does not check whether anything was actually received.
- **3-way matching** adds the receipt: quantity billed must also be at or below quantity received. This is the right control whenever physical delivery matters, which is exactly LTV's situation — paying for bearings that were never actually received would be a real loss.
- **4-way matching** adds a fourth check against a formal acceptance or inspection document, on top of the purchase order and receipt. This is used when a distinct inspection/acceptance step carries its own sign-off beyond the ordinary receipt.

The **match approval level** set on the purchase order back in lesson 11 is what determines which of these applies to Meridian's invoice. LTV's bearing purchase order was set to require 3-way matching, since physical delivery confirmation matters for a mechanical part but a separate formal acceptance document beyond the receipt is not required.

## Tolerances: how much difference is allowed

Matching does not demand perfect, penny-exact agreement. **Tolerances** — configured percentages or amounts for price and quantity — define how much variance is acceptable before a mismatch becomes a problem. A price tolerance might allow the invoice to be up to, say, 2% above the purchase order price without issue; a quantity tolerance might allow a small over-billing percentage to pass. Tolerances exist because minor rounding, unit conversion, or shipping variances are a normal part of commerce, not fraud or error worth stopping payment over.

## Matching holds

If Meridian's invoice falls outside the configured tolerances for price or quantity — for example, billing for 55 units when only 50 were ordered and received — Payables places a **matching hold** on the invoice. A held invoice cannot be paid until the hold is resolved: someone investigates, and either corrects the invoice, corrects the underlying purchase order or receipt, or obtains an approved exception. For this course's clean, main transaction, Meridian invoices exactly 50 units at the agreed price, which matches within tolerance against both the purchase order and Priya's receipt, with no hold created.

## Recap

Matching compares an invoice against the purchase order and, under 3-way matching, the receipt, before payment is allowed; LTV's bearing purchase order requires 3-way matching given the physical nature of the goods. Tolerances allow minor variances through without stopping payment, while anything outside tolerance creates a matching hold. Meridian's invoice for this transaction matches cleanly. Next up, lesson 20: what happens once the invoice is validated — payment and accounting.
