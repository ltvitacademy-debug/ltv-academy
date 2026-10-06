# Receiving Goods and Services

A truck from Meridian Bearing Supply Co. arrives at LTV Manufacturing Corporation's dock. This is where Priya Nandan, the receiving clerk, takes over the transaction, and where "paper" purchasing turns into a physical, real-world event.

## What you'll learn

- What receiving actually records, and why it matters even before an invoice shows up
- The difference between receiving goods and receiving services
- The fields Priya enters when she creates the receipt
- Express receipt versus receiving against a specific purchase order

## What receiving actually is

**Receiving** is the step where Oracle Fusion records that goods arrived, or a service was performed, against an open purchase order schedule. It is a distinct event from the invoice: a receipt confirms physical reality (did the shipment show up, and how much of it), while an invoice confirms a financial claim (what the supplier says it is owed). Keeping these separate, with the receipt as its own document, is what makes **three-way matching** possible later in Chapter 5 — the invoice can be checked against both what was ordered and what was actually received, not just what was ordered.

## Goods versus services

Receiving a physical item, like Dana's pump bearings, is usually straightforward: a quantity shows up, and Priya records that quantity against the purchase order schedule. Receiving a **service** purchase order works differently, since there is often no physical quantity to count — instead, the requester, a manager, or someone designated to confirm the work typically certifies that the service (or a percentage of it) was performed, which then allows invoicing to proceed. LTV's bearing purchase order is a goods receipt, so this course focuses on that path, but recognize that a service receipt exists as its own, structurally different flow.

## What Priya enters

When Priya opens the Receiving work area, she can search for LTV's open purchase order by number, supplier, or item, and sees the bearing line waiting to be received. To create the receipt, she confirms: the **purchase order and schedule** being received against, the **quantity received** (which should be 50, matching the shipment and the packing slip Meridian sent with the truck), the **receiving location** (the dock, matching the deliver-to location that traces back to Dana's original requisition), and the **transaction date**. Saving this creates a **receipt number**, a new document in its own right, referencing the purchase order it was received against.

## Express receipt versus full receiving

For simple cases where a purchase order line will be received in a single, complete shipment with no inspection required, Oracle Fusion offers **express receipt**, which receives the full ordered quantity in one action with minimal data entry. For anything needing more scrutiny — partial shipments, discrepancies, or an inspection requirement — the full receiving flow lets Priya record exactly what arrived, which may not always match what was ordered. LTV's bearing purchase order, as you will see in the next lesson, is routed for inspection, so Priya uses the full receiving flow rather than express receipt.

## Recap

Receiving is a distinct, physical-world confirmation event, separate from invoicing, that records what actually arrived against an open purchase order schedule. Priya's receipt for the 50 bearings captures the purchase order, quantity, receiving location, and date, creating its own receipt number. Next up, lesson 16: how receipt routing and inspection actually work for this shipment.
