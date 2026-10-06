# Receipt Routing and Inspection

Priya's receipt exists, but the bearings have not actually made it into usable inventory yet. This lesson covers receipt routing: the path a received shipment takes before it is put away, and why LTV's bearings are routed for inspection rather than delivered straight to stock.

## What you'll learn

- The three receipt routing methods Oracle Fusion supports
- Why a routing method is assigned per item (or per order) rather than globally
- What happens during inspection, including acceptance and rejection
- How routing can be overridden at the point of receipt

## The three receipt routing methods

Oracle Fusion Receiving supports three routing methods for anything received, whether against a purchase order, a return, or an interorganization shipment:

- **Direct delivery** — the shipment is received and put away into its final location in a single transaction. There is no separate put-away step and no inspection; this is the fastest path, suited to trusted items from trusted suppliers.
- **Standard receipt** — the shipment is received into a receiving location first, and put away happens as a separate, later transaction. This still allows a transfer or light review between the two steps, without a formal inspection.
- **Inspection required** — the shipment is received into a receiving location, then must be formally inspected before put-away. During inspection, the inspector can accept or reject some or all of the received quantity, and accepted and rejected material can be put away to different locations.

## Why the PB-4400 bearing is routed for inspection

LTV Manufacturing Corporation routes Industrial Pump Bearing, Model PB-4400, for inspection rather than direct delivery because a defective bearing installed in a production line motor can cause expensive downtime or equipment damage — the cost of inspecting a $-modest part is trivial compared to the cost of installing a bad one. This routing decision is configured against the item (or the purchase order line), not applied globally across every item LTV buys; a low-risk office supply item might be set to direct delivery, while a critical mechanical part like this bearing is set to inspection required.

## What happens during inspection

Once Priya's receipt is created, the quantity moves into an inspection queue. An inspector examines the shipment against the purchase order's specifications — in this case, confirming the bearings match the PB-4400 specification and show no visible defects or shipping damage. The inspector then records a disposition: **accept** (the material proceeds to put-away into inventory), **reject** (the material does not proceed and is typically set up for return to the supplier, covered in the next lesson), or a split disposition if only part of the shipment passes. For this course's main transaction, all 50 bearings pass inspection cleanly and are accepted in full.

## Overriding routing at the point of receipt

Oracle Fusion also allows a user with the appropriate profile option (Allow Routing Override) to override the configured routing at the time of receipt — for example, sending an item that would normally go to direct delivery through inspection instead, if a specific shipment looks suspicious. This is an exception path, not the normal flow, and LTV's bearing receipt in this course follows its configured inspection-required routing without any override.

## Recap

Receipt routing determines what happens to a shipment between receiving and put-away: direct delivery skips both separate put-away and inspection, standard receipt separates put-away from receiving, and inspection required adds a formal accept/reject step. LTV's bearings are routed for inspection because of the cost of a defective mechanical part, and all 50 units pass cleanly. Next up, lesson 17: what happens on the rare occasions a shipment does not pass, through returns and corrections.
