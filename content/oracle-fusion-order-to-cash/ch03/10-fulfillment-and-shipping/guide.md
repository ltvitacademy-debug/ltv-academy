# Fulfillment and Shipping

With its credit hold released, SO-48217 is finally free to move. This chapter covers what happens between "the order is approved" and "the invoice is sent" — the physical side of Order-to-Cash, where the 400 Model CP-220 Control Panels actually leave LTV Manufacturing's Savannah warehouse and travel to Harborview in Charlotte. This lesson gives the overview; the next two lessons go line by line through picking, packing, shipping, and confirmation.

## What you'll learn

- What "fulfillment" means as a stage distinct from order capture
- The role of order orchestration in driving a line through fulfillment
- Which Oracle Fusion areas actually do the physical work
- Why fulfillment is where an order and an inventory organization have to agree

## Fulfillment is orchestrated, not manual

Once a line clears its holds, it doesn't just sit and wait for someone to notice it. Oracle Fusion's **order orchestration** engine is what drives a line through the specific sequence of fulfillment steps configured for its order type — commonly something like: reserve inventory, release to warehouse, pick, pack, ship, confirm, then become eligible for invoicing. Orchestration tracks where each line is in that sequence and hands it to the next system or person responsible, which is why a line's status (Awaiting Shipping, Shipped, and so on) is really a readout of where it sits in this orchestrated sequence.

## The physical work happens in Inventory and Shipping

Order Management decides what should happen; **Inventory Management** and **Shipping** are where it actually happens. The moment SO-48217's hold is released, its line becomes visible to the Savannah warehouse as a line awaiting fulfillment from a specific ship-from inventory organization. From here, three things have to happen in sequence, covered lesson by lesson: the warehouse has to pick and pack the physical units (lesson 11), confirm the shipment once it's actually loaded and gone (lesson 12), and — if anything about the shipment doesn't match what was ordered — that discrepancy has to be handled, sometimes through a return (lesson 13).

## Why the order and the warehouse have to agree

A sales order line references a specific ship-from organization — in SO-48217's case, Savannah. That is not a formality. Inventory has to actually be available in that specific warehouse, under that specific item number, for the line to be fulfilled from there; Oracle Fusion will not silently substitute a different warehouse that happens to have stock. If Savannah were short on Model CP-220 units, the order would need to be addressed directly — sourced from a different warehouse by changing the line, split across two shipments, or delayed — rather than fulfilling automatically from wherever inventory exists.

## Recap

Fulfillment is the stage where an approved order line is driven, by order orchestration, through reservation, picking, packing, shipping, and confirmation — work that physically happens in Inventory Management and Shipping, not in Order Management itself. The order and the ship-from warehouse have to agree on both the item and the inventory organization for any of this to proceed. Next up, lesson 11: pick, pack, and ship, the three physical steps SO-48217 goes through inside the Savannah warehouse.
