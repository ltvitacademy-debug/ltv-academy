# Creating a Requisition

Now we actually build Dana Whitfield's requisition for 50 units of Industrial Pump Bearing, Model PB-4400. This lesson walks every field that matters, in the order Dana would fill them out, and explains what Oracle Fusion does with each one.

## What you'll learn

- The header-level fields on a requisition and what they default from
- The line-level fields and how a catalog search populates most of them
- What "need-by date" and "deliver-to location" actually control downstream
- What happens the moment Dana clicks submit

## Starting the requisition: header defaults

When Dana opens Self Service Procurement and starts a new requisition, several header fields default automatically from her own employee and user setup, rather than being typed in: her name as the **preparer** and **requester**, her **requisitioning business unit** (LTV Manufacturing's plant), and a default **deliver-to location** tied to her assignment. She can override the requester field if she is submitting on behalf of someone else, and she can add a **justification** or description at the header level, which is useful context for whoever approves it. None of this is arbitrary — it is the same business-unit and employee setup you reviewed in lesson 3 showing up as working defaults.

## Adding the line: searching the catalog

Dana searches the catalog for "pump bearing" and finds the PB-4400 entry, already loaded with its description, item category, unit of measure, and unit price, since it is a recurring, pre-negotiated MRO item. She adds it to her cart and sets the **quantity to 50**. Because the catalog entry already carries a price, the line's estimated amount (50 units × unit price) calculates automatically — Dana does not have to know or guess the price Meridian charges.

## The fields that control what happens later

A few fields on the line matter well beyond this lesson:

- **Need-by date** — the date Dana needs the bearings by. This becomes the expected delivery date carried onto the purchase order, and is one of the things a buyer checks before committing to a supplier.
- **Deliver-to location** — where the shipment should physically go, which later drives the receiving location Priya will use in Chapter 4.
- **Requested item and category** — these drive which approval rules apply (lesson 7) and which default account is used for the distribution (lesson 8).

## Submitting the requisition

When Dana reviews her cart and clicks submit, Oracle Fusion validates the requisition (checking things like budget availability if encumbrance accounting is enabled, and that all required fields are complete), assigns it a **requisition number**, and routes it into the approval workflow covered in the next lesson. At this point the requisition exists as a real document in the system with a status of "Pending Approval" — but it still has no effect on Meridian Bearing Supply Co. Nothing has been ordered. The supplier is not involved until a purchase order exists.

## Recap

Creating a requisition means a header that defaults from the requester's own setup, plus one or more lines built from a catalog search (or non-catalog entry) carrying quantity, need-by date, and deliver-to location. Submitting assigns a requisition number and sends the document into approval — it does not yet touch the supplier. Next up, lesson 7: what happens to Dana's requisition while it waits for approval.
