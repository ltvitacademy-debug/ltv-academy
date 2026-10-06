# Returns and Return Material Authorization

Most of SO-48217 goes smoothly: 400 units shipped, confirmed, on their way to Charlotte. But a few days after delivery, Harborview's warehouse reports that 20 of the 400 Model CP-220 Control Panels arrived with visible shipping damage and can't be used. This lesson covers how Oracle Fusion handles a return in this situation, using a **Return Material Authorization (RMA)**.

## What you'll learn

- What an RMA is and when it's used instead of an ordinary order change
- The typical RMA process: request, authorization, receipt, inspection
- How an RMA connects back to the original sales order
- What happens, specifically, to the 20 damaged units from SO-48217

## Why a return needs its own process

By the time Harborview reports the damage, the goods have already shipped and been confirmed — you learned in lesson 9 that quantity reductions after shipping can't be handled with a simple line edit. The goods now physically exist at the customer's site, and undoing that requires its own document and its own physical process: receiving something back into the warehouse, inspecting it, and deciding what happens to it. An RMA is a return order, generated with reference to the original sales order, that exists specifically to manage this.

## The RMA process, step by step

1. **Request** — Harborview reports the damage; an order administrator (or a customer service rep) creates an RMA referencing SO-48217 and specifying the 20 damaged units.
2. **Authorization** — the RMA is approved to proceed, which typically generates a corresponding record in receiving and a shipment back from the customer, so the warehouse knows units are inbound and why.
3. **Receipt** — when the 20 units physically arrive back at the Savannah warehouse, a receiving agent records receipt against the RMA.
4. **Inspection** — a quality check determines whether the returned units can be put back into sellable inventory, need repair, or have to be scrapped. Given visible shipping damage, these 20 units fail inspection and are slated for disposal rather than resale.
5. **Billing resolution** — once receipt is confirmed, the RMA line's status moves to "awaiting billing," which is what allows the financial side of the return — a credit memo — to be created, the subject of lesson 17.

## Connecting back to the order

The RMA for these 20 units references SO-48217 directly, not a brand-new, unrelated transaction. That reference is what lets Oracle Fusion connect the return all the way back to the specific invoice those units were billed on (once that invoice exists, in Chapter 4), which is exactly what makes an automatic, correctly calculated credit possible instead of a manual one.

## Recap

A Return Material Authorization is a return order, referencing the original sales order, used specifically because goods that have already shipped can't be corrected with an ordinary line edit. It moves through request, authorization, physical receipt, inspection, and finally billing resolution. The 20 damaged units from SO-48217 fail inspection and are slated for disposal, setting up the credit memo in lesson 17. This closes Chapter 3 — SO-48217 has been picked, packed, shipped, confirmed, and partially returned. Next up, Chapter 4 begins with lesson 14: turning the shipment into an actual invoice.
