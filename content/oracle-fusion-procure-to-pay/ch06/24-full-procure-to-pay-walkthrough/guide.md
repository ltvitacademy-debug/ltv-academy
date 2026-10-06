# Full Procure-to-Pay Walkthrough

This lesson replays LTV Manufacturing Corporation's entire bearing transaction in one sitting, start to finish, with every document number and every accounting entry in order. Treat this as the reference you come back to any time you need the whole cycle in one place.

## What you'll learn

- The complete transaction, replayed end to end
- Every document number and how each one references the one before it
- Every accounting entry, in the order it was created
- How to use this walkthrough as a troubleshooting reference

## The complete transaction, replayed

Dana Whitfield, maintenance supervisor at LTV Manufacturing Corporation's plant, searches the catalog in Self Service Procurement and adds 50 units of Industrial Pump Bearing, Model PB-4400, to her cart. She submits the requisition; it carries her requisitioning BU, a need-by date, a deliver-to location at the plant, and a distribution defaulting to the maintenance expense account on her plant's cost center. It routes to her direct supervisor, who approves it.

Marcus Ibarra, the procurement agent for LTV's procurement BU, sees the approved requisition line in his Process Requisitions worklist. The supplier is already sourced — Meridian Bearing Supply Co., from the catalog entry — so Marcus processes the line into a new standard purchase order, confirming the supplier site, payment terms (Net 30), and a 3-way match approval level. The purchase order is submitted, approved by Marcus's procurement manager, and communicated to Meridian through the Supplier Portal, reaching status Open.

Several days later, a truck arrives at LTV's dock. Priya Nandan, the receiving clerk, creates a receipt against the purchase order for the full 50 units. Because the bearing is routed for inspection, the shipment moves to an inspection queue, where it is examined against the PO specification and accepted in full. The moment the receipt is accepted, Receipt Accounting creates a journal debiting the maintenance expense account and crediting an uninvoiced receipts accrual account for the received value.

Meridian Bearing Supply Co. sends its invoice for the 50 units at the agreed price. Chen Liu, the AP processor, enters it referencing the purchase order. It matches cleanly within tolerance against both the purchase order and Priya's receipt — 3-way matching, with no hold. Validation confirms there are no other holds, and the invoice is accounted: debiting the uninvoiced receipts accrual (clearing it) and crediting accounts payable liability. A Payment Process Request later selects the invoice, along with other eligible invoices due around the same time, and pays Meridian, debiting accounts payable and crediting cash.

With receiving and invoicing both complete, the purchase order progresses to Closed for Receiving, then Closed for Invoicing, and finally Finally Closed.

## The document chain, summarized

Requisition number (Dana) → Purchase order number (Marcus, referencing the requisition) → Receipt number (Priya, referencing the purchase order) → Invoice number (Chen, referencing both the purchase order and the receipt) → Payment (referencing the invoice). Every document after the requisition points back to the one that created the need for it.

## The accounting, summarized

Three journals, in order: (1) receipt accrual — debit maintenance expense, credit uninvoiced receipts accrual; (2) invoice accounting — debit uninvoiced receipts accrual, credit accounts payable liability; (3) payment — debit accounts payable liability, credit cash. Each one originates in a different subledger and reaches the General Ledger through Subledger Accounting.

## Recap

This walkthrough is the whole course compressed into a single pass: one requester, one buyer, one receiving clerk, one AP processor, five documents, and three journals, all chained together by reference. Keep this lesson as your map. Next up, lesson 25: exception scenarios, where this same transaction does not go so smoothly.
