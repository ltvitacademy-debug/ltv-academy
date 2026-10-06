# Shipping Confirmation

The 400 Model CP-220 Control Panels are picked, packed, and staged at the Savannah dock. The truck leaves. But in Oracle Fusion terms, nothing downstream happens until someone — or some integration — tells the system that the shipment actually occurred. That action is **shipping confirmation**, and it is one of the most important single events in the entire Order-to-Cash cycle.

## What you'll learn

- What ship confirmation actually does inside Oracle Fusion
- Why it is the trigger for inventory depletion and invoicing eligibility
- What "Interface Trip Stop" means at a high level
- Why a shipment that goes out but never gets confirmed is a real, recurring problem

## What ship confirmation does

Confirming a shipment tells Oracle Fusion Shipping that the staged goods have actually left the warehouse, on a specific date, against a specific delivery. This single action does several things at once:

- It finalizes the **actual shipped quantity**, which can occasionally differ from what was planned (for example, if a partial quantity shipped due to a short pick).
- It triggers **inventory depletion** — the goods are removed from on-hand inventory at the ship-from organization, since they are no longer physically there.
- It starts the **Interface Trip Stop** process, which is the mechanism that takes confirmed shipment information and makes it available to other processes — most importantly, it is what eventually makes the line eligible for the invoicing workflow that hands data to Receivables (covered in Chapter 4).

## Why this matters more than it looks

Before ship confirmation, a shipment is still just a plan: picked, packed, staged, but not yet "real" from the system's perspective. After ship confirmation, several things become true that cannot easily be undone — inventory has left the books, and the clock toward invoicing has started. This is exactly why the earlier lessons emphasized that changes after shipping require a return rather than a simple edit: ship confirmation is the point of no return for an ordinary quantity change.

It is also a common failure point in real implementations. If a shipment physically leaves the dock but is never confirmed in the system — because of a process gap, a system issue, or someone forgetting a step — the order sits indefinitely in an "awaiting shipping" status, inventory looks like it's still on hand when it physically is not, and the customer never gets billed for goods they already received. Diagnosing "why hasn't this order invoiced" very often starts by checking whether ship confirmation actually happened.

## SO-48217, confirmed

The Savannah warehouse confirms the shipment: 400 units, shipped today's date, against Harborview's delivery. Inventory depletes by 400 units of Model CP-220. Interface Trip Stop runs and the line becomes eligible for the invoicing workflow.

## Recap

Shipping confirmation is the event that turns a planned, staged shipment into a real one from the system's perspective: it locks in the actual shipped quantity, depletes inventory, and triggers Interface Trip Stop, which is what eventually makes a line eligible for invoicing. A shipment that leaves the dock but is never confirmed is a genuine, recurring source of "why hasn't this invoiced" problems. Next up, lesson 13: what happens when some of what Harborview received doesn't stay received — returns and the RMA process.
