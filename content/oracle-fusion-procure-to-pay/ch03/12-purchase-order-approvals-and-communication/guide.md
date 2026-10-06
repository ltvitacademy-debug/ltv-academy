# Purchase Order Approvals and Communication

Marcus's purchase order is drafted. Two things still have to happen before Meridian Bearing Supply Co. knows anything about it: internal approval, and then actual communication of the order to the supplier.

## What you'll learn

- How purchase order approval differs from requisition approval
- The methods Oracle Fusion uses to communicate a PO to a supplier
- What supplier acknowledgement is and why it matters
- What changes once the PO reaches the supplier

## Purchase order approval versus requisition approval

Just like requisitions, purchase orders route through the same BPM-based approval engine, using approval rules that can consider the purchase order's total amount, the buyer, the procurement BU, and the supplier. It is common, and good internal control, for a purchase order to require approval from someone other than the buyer who created it — often a procurement manager — even when the underlying requisition was already approved by the requester's chain. This is not redundant: the requisition approval confirmed that Dana's department should spend the money; the purchase order approval confirms that the specific supplier, price, and terms Marcus negotiated are acceptable. For this course's transaction, LTV's rules route the bearing purchase order to Marcus's procurement manager for a quick approval, given its modest value.

## Communicating the approved purchase order to the supplier

Once approved, the purchase order still has to be transmitted to Meridian Bearing Supply Co. Oracle Fusion supports several communication methods, configured per supplier (or per supplier site):

- **Email** — a PDF or formatted version of the purchase order is emailed to a contact at the supplier.
- **Fax** — still supported for suppliers without reliable digital access.
- **Supplier portal** — the supplier logs into Oracle Fusion's Supplier Portal directly and sees the purchase order online, which also usually enables richer two-way activity like acknowledgements and advance ship notices.
- **cXML or other electronic document exchange** — for highly automated supplier relationships, the purchase order transmits as a structured electronic document directly into the supplier's own system.

Meridian Bearing Supply Co. is set up to receive purchase orders through the Supplier Portal, so once Marcus's purchase order is approved, it becomes visible to Meridian's own staff logging into that portal, and LTV's communication method automatically records that the order was sent.

## Supplier acknowledgement

Many implementations also use **supplier acknowledgement**: the supplier confirms, inside the portal or by reply, that they received the order and accept its terms, quantity, price, and dates. An acknowledgement is not required for the purchase order to be valid, but it gives LTV documented confirmation that Meridian has actually seen and agreed to fulfill the order — useful evidence if a dispute over quantity or price comes up later.

## What changes once the order reaches the supplier

Up to this point in the course, nothing outside LTV Manufacturing Corporation's own Oracle Fusion instance has been affected. Once the purchase order is approved and communicated, that changes: Meridian now has a binding order to fulfill, and the next real-world event in this transaction is a truck arriving at LTV's dock with 50 bearings, which is where Chapter 4 picks up.

## Recap

A purchase order goes through its own approval, typically by someone other than the buyer, confirming the supplier, price, and terms rather than re-confirming the need. Once approved, it is communicated to the supplier by email, fax, supplier portal, or electronic document exchange, optionally followed by a supplier acknowledgement. Next up, lesson 13: what happens when this purchase order needs to change after the fact.
