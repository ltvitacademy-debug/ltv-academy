# Script — Fulfillment and Shipping

## Segment 1 (title)

With its credit hold released, SO-48217 is finally free to move. This chapter covers what happens between the order being approved and the invoice going out: the physical side, where four hundred control panels actually leave the warehouse.

## Segment 2 (steps)

Fulfillment doesn't just sit and wait for someone to notice it. Order orchestration drives a line through a configured sequence - reserve inventory, release to warehouse, pick, pack, ship, confirm, then become eligible for invoicing. A line's status is really just a readout of where it sits in that sequence.

## Segment 3 (steps)

Order Management decides what should happen; Inventory Management and Shipping are where it actually happens. Once the hold is released, the line becomes visible to the Savannah warehouse. From here, the warehouse has to pick and pack the units, confirm the shipment once it's gone, and handle anything that doesn't match what was ordered.

## Segment 4 (steps)

Here's something that has to line up: the order references a specific ship-from warehouse, Savannah. Inventory actually has to exist there, under that item number, for the line to fulfill from there. Fusion won't silently pull from a different warehouse that happens to have stock. A shortage has to be handled directly - resourced, split, or delayed.

## Segment 5 (outro)

Up next, lesson eleven: pick, pack, and ship, the three physical steps this order goes through inside the Savannah warehouse.
