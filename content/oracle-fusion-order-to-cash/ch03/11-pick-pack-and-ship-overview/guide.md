# Pick, Pack and Ship Overview

Once SO-48217's line is released to the Savannah warehouse, three physical steps stand between it and the loading dock: picking, packing, and preparing for shipment. This lesson walks through each one and the Oracle Fusion objects that track them.

## What you'll learn

- How a released order line becomes a pick task
- The role of a pick wave in grouping work for the warehouse
- What packing actually records in the system
- How SO-48217 moves through all three steps

## From released line to pick task

A released line doesn't get picked the instant it's released — it is normally grouped with other released lines into a **pick wave**, a batch of work released to the warehouse floor together, often based on shared criteria like ship date, carrier, or shipping dock. Grouping into waves lets a warehouse plan efficient picking runs instead of chasing one line at a time. SO-48217's line is included in the next outbound wave for the Savannah facility.

## Picking

Picking is the physical (and system) act of pulling the ordered quantity of an item from its storage location in the warehouse. In Oracle Fusion Inventory Management, a pick task tells a warehouse worker exactly what to pull and from where, and confirming the pick decrements the available quantity at that location and marks the task complete. For SO-48217, picking means pulling 400 units of Model CP-220 Control Panels from their storage location and staging them for packing. If fewer than 400 units are actually available to pick — a **short pick** — that discrepancy has to be resolved (resourced, backordered, or the order line adjusted) before the shipment can proceed as originally planned.

## Packing

Packing groups picked items into shippable containers — cartons, pallets, whatever the item and carrier require — and records what went into which container. This step matters more than it looks: pack information (container counts, weights, dimensions) often feeds directly into shipping documentation and freight calculation, and some businesses use it to generate the packing slip that travels with the physical shipment.

## Preparing for shipment

With picking and packing complete, the line is staged and ready; the final physical step — loading the carrier and recording that the shipment has actually left — is **ship confirmation**, covered in the next lesson. Everything up to this point has been about getting the goods physically ready to go; shipping confirmation is what tells the rest of Oracle Fusion that they're actually gone.

## Recap

A released order line is grouped into a pick wave, picked from its warehouse location, and packed into shippable containers — each step recorded in the system as it happens, and each one a point where a discrepancy (like a short pick) has to be caught and resolved rather than silently ignored. SO-48217's 400 units move through all three steps cleanly in this example. Next up, lesson 12: shipping confirmation, the step that tells Oracle Fusion the goods are actually gone and starts the clock toward invoicing.
