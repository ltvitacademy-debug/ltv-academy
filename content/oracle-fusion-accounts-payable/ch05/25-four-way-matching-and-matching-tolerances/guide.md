# Lesson 25 — Four-Way Matching and Matching Tolerances

**Chapter 5 · Matching and Special Invoices · Lesson 25 of 42**

## What you'll learn

- What the fourth check in four-way matching adds
- When four-way matching is worth the extra process overhead
- How tolerance sets are structured and assigned
- What happens — hold by hold — when different tolerances are exceeded

## The fourth check: inspection and acceptance

**Four-way matching** takes everything three-way matching already does (PO, receipt, invoice) and adds one more checkpoint: **inspection / acceptance**. Before the invoice can validate, someone must confirm not just that the goods arrived, but that they were inspected and accepted as meeting the purchase order's requirements.

1. Quantity **ordered** (PO)
2. Quantity **received**
3. Quantity **accepted** (inspection/acceptance)
4. Quantity and price **invoiced**

This extra step matters most for high-value, high-risk, or regulated purchases — custom equipment, safety-critical components, anything where "it arrived" isn't the same question as "it's good." It adds process time, so most organizations reserve four-way matching for a defined subset of purchase orders rather than applying it everywhere.

## Illustrative example

**Meridian Office Supply**, a fictional supplier, delivers a PO line for 50 ergonomic chairs at $180 each. The warehouse receives all 50. Quality inspection accepts only 47 — three arrive with a manufacturing defect and are rejected.

| | Ordered | Received | Accepted | Invoiced |
|---|---|---|---|---|
| Quantity | 50 | 50 | 47 | 50 |

Meridian invoices for the full 50. Even though all 50 were received, only 47 passed inspection — so the invoiced quantity exceeds what was *accepted*, and the invoice holds until either the 3 defective chairs are replaced and accepted, or the invoice is corrected to 47 units.

## How tolerance sets are structured

Every matching level — two-way, three-way, four-way — relies on tolerances to decide what counts as "close enough" instead of flagging every tiny variance. A **tolerance set** bundles several tolerance types together and is assigned at the supplier, supplier site, or purchasing-category level:

| Tolerance | Governs |
|---|---|
| Quantity Ordered % | How far invoiced quantity can exceed the PO quantity |
| Quantity Received % | How far invoiced quantity can exceed the received quantity |
| Invoice Price % | How far unit price can vary from the PO price |
| Invoice Price Amount | A flat dollar ceiling on price variance per line |
| Schedule / Shipment % | Variance allowed against a specific PO shipment line |

Each exceeded tolerance creates its own distinctly named hold — a Price hold is resolved differently from a Quantity Received hold, which lets whoever is clearing holds go straight to the right fix instead of guessing.

## Key terms

| Term | Meaning |
|---|---|
| Four-way matching | Matches PO, receipt, inspection/acceptance, and invoice |
| Inspection / acceptance | The quality check confirming received goods meet PO requirements |
| Tolerance set | A named group of tolerance percentages/amounts assigned to a supplier or category |

## Check yourself

You're ready for Lesson 26 when you can answer, without looking: what checkpoint does four-way matching add that three-way matching doesn't have, and why would an organization limit it to only certain POs?
