# Self Service Procurement and Requisitions

This is where LTV Manufacturing Corporation's transaction actually begins. Dana Whitfield, the maintenance supervisor, needs more pump bearings, and she is going to ask for them the same way almost every employee asks for anything in Oracle Fusion Cloud: through Self Service Procurement.

## What you'll learn

- What Self Service Procurement is and who uses it
- The ways an item can be requested: catalogs, non-catalog requests, and punchout
- What a requisition actually is, structurally
- Why "self service" doesn't mean "no rules"

## What Self Service Procurement is

Self Service Procurement (often shown as the Purchase Requisitions work area) is the Oracle Fusion Cloud module that lets any employee, not just a dedicated buyer, request goods and services for themselves or on behalf of someone else. It is deliberately built to feel like shopping: a search bar, a shopping cart, catalogs organized by category, and a checkout step. The idea is to let the organization push ordinary purchasing volume — office supplies, lab equipment, MRO parts like Dana's bearings — out to the people who actually need it, instead of routing every request through a dedicated buyer who has no idea what a bearing even looks like.

## Three ways to request an item

Self Service Procurement supports a few distinct ways to add something to a requisition:

- **Informal and local catalogs** — items a company's procurement team has pre-loaded with descriptions, categories, and often a negotiated or standard price, so a requester can search and add them directly. LTV's Industrial Pump Bearing, Model PB-4400, is set up this way, since it is a recurring MRO item with a known supplier.
- **Smart forms** — a guided form for a category of request that needs structured information beyond "item and quantity," such as a request for a new laptop with specific configuration choices.
- **Non-catalog request** — used when the item a requester needs is not in any catalog. The requester manually enters a description, category, estimated price, and supplier, which gives the buyer more to validate later but allows the process to continue for one-off or unusual needs.
- **Punchout to a supplier's website** — for suppliers that support it, the requester leaves Oracle Fusion temporarily, shops on the supplier's own catalog site, and returns with a cart that populates the requisition automatically.

## What a requisition actually is

Structurally, a requisition is a header (who is requesting, for which business unit, with what justification) containing one or more **requisition lines**, each specifying an item or service, a quantity, a need-by date, and a deliver-to location. Each line also carries a **distribution**, which is where the accounting (what cost center or project the purchase should be charged to) is determined — you will look at this closely in lesson 8. A requisition on its own is only a request. It has no effect on the supplier and creates no purchase order by itself; it has to be approved and then processed into a purchase order, which is what the rest of this chapter covers.

## "Self service" still has rules

Letting employees request their own purchases does not mean anyone can buy anything. Self Service Procurement is still governed by the catalogs and categories a requester is allowed to see, approval rules based on amount and category (covered in lesson 7), and the same segregation-of-duties and budget controls that apply everywhere else in Oracle Fusion. Dana can search for and add pump bearings because that catalog entry exists and her role allows it — she still cannot approve her own requisition, and a purchase of unusual size or an unfamiliar category will still route for extra scrutiny.

## Recap

Self Service Procurement lets ordinary employees like Dana request goods and services through catalogs, smart forms, non-catalog requests, or supplier punchout, without needing to be a buyer. A requisition is a header-and-lines document that captures what is needed and where the cost should land, but it has no power on its own until it is approved and processed into a purchase order. Next up, lesson 6: actually creating Dana's requisition for the pump bearings.
