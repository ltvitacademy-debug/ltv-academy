# Script — Returns and Return Material Authorization

## Segment 1 (title)

Most of SO-48217 goes smoothly. But a few days after delivery, Harborview reports that twenty of the four hundred control panels arrived with shipping damage. Let's look at how Fusion handles a return like this, using a Return Material Authorization.

## Segment 2 (steps)

Why does a return need its own process? By the time the damage is reported, the goods have shipped and been confirmed - you can't fix this with a simple line edit. The goods physically exist at the customer's site now. An RMA is a return order, generated with reference to the original sales order, that exists specifically to manage undoing that.

## Segment 3 (steps)

The process runs in steps. Request: an RMA gets created referencing SO-48217 and the twenty damaged units. Authorization: it's approved, generating a receiving record for the inbound units. Receipt: when they physically arrive back at Savannah, a receiving agent logs it. Inspection: a quality check decides if they're sellable, repairable, or scrap.

## Segment 4 (steps)

Given visible shipping damage, these twenty units fail inspection and are slated for disposal. Once receipt is confirmed, the RMA line moves to awaiting billing - that's what unlocks the financial side of the return, a credit memo, which is where we're headed in lesson seventeen.

## Segment 5 (outro)

The RMA references SO-48217 directly, which is exactly what lets the system connect this return back to the right invoice later. Chapter three is done - shipped, confirmed, and partially returned. Up next, chapter four, lesson fourteen: turning the shipment into an actual invoice.
