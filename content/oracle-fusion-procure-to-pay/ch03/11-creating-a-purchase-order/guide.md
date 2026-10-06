# Creating a Purchase Order

Marcus now builds out the standard purchase order for LTV Manufacturing Corporation's 50 pump bearings. This lesson walks the header, line, schedule, and distribution structure of a purchase order, and shows where each piece of Dana's requisition landed.

## What you'll learn

- The header, line, schedule, and distribution structure of a purchase order
- Which fields carried over from the requisition automatically
- What a buyer adds or confirms that a requester never sees
- What "Open" status actually means once the PO is approved

## The structure of a purchase order

A purchase order has the same basic shape as a requisition, with one additional layer:

- **Header** — the supplier (Meridian Bearing Supply Co.), the supplier site, the buyer (Marcus Ibarra), the procurement BU, payment terms, and currency.
- **Line** — the item (PB-4400), description, and category, largely carried over from Dana's requisition line.
- **Schedule** — the quantity (50), unit price, need-by/promised date, and ship-to/deliver-to location for that line. A single line can have multiple schedules if, for example, a quantity needs to arrive in separate shipments on different dates.
- **Distribution** — the same accounting detail you saw on the requisition in lesson 8, now attached to the schedule rather than the requisition line, still pointing at the maintenance expense account on LTV's plant cost center.

## What carried over automatically

Because Marcus processed Dana's approved requisition line directly into this purchase order, most of the content is already populated: the item, quantity, need-by date, deliver-to location, and the distribution's charge account all flow through without Marcus retyping them. This is one of the practical payoffs of the requisition-to-PO design: the buyer's job is to add what a requester cannot provide, not to re-enter what the requester already specified.

## What a buyer adds that a requester never sees

Several fields exist only at the purchase order level because they involve the supplier relationship, which is the buyer's responsibility, not the requester's:

- **Supplier and supplier site** — which Meridian location receives this order and which remittance address applies for payment.
- **Payment terms** — for example, Net 30, agreed with Meridian and usually defaulted from the supplier's setup, but adjustable by the buyer.
- **Match approval level** — covered in depth in Chapter 5, but set here: whether this purchase order's eventual invoice must match against the purchase order alone, or against the purchase order and a receipt.
- **Buyer and procurement BU** — confirming who owns this document and under which business unit's authority it is issued.

## From draft to "Open"

Once Marcus reviews the purchase order and is satisfied it is accurate, he submits it for approval (the subject of the next lesson). Once approved, it reaches a status of **Open**, meaning it is available for receiving and invoicing. Only at that point does the document become something Meridian Bearing Supply Co. can act on — nothing before this point has reached the supplier at all.

## Recap

A purchase order adds a supplier-facing header and a schedule layer on top of the requisition's item and distribution detail, with most fields carried over automatically rather than retyped. A buyer adds supplier-specific details like payment terms and match approval level before submitting the document for approval. Next up, lesson 12: how this purchase order gets approved and actually communicated to Meridian.
