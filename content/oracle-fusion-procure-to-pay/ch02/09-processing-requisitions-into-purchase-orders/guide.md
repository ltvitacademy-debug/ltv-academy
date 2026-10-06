# Processing Requisitions into Purchase Orders

Dana's requisition is fully approved, with its distribution set. It is still just a request. This lesson is the handoff: how an approved requisition becomes Marcus Ibarra's problem, and how it turns into an actual purchase order.

## What you'll learn

- Where approved requisitions land for a buyer
- Sourcing: how a supplier gets selected for a requisition line
- How multiple requisition lines can be consolidated onto one purchase order
- The difference between automated and manual processing

## Where an approved requisition goes

Once Dana's requisition clears approval, it does not automatically become a purchase order. It lands in a buyer's **Process Requisitions** work area (part of Purchase Orders), where Marcus, as the assigned procurement agent for LTV's procurement BU, sees it in a worklist of requisition lines awaiting action. Depending on setup, requisition lines can be assigned to a specific buyer automatically — often by item category — or left in a pool a team of buyers can pick up from.

## Sourcing: how a supplier gets selected

For many requisition lines, the supplier is already effectively chosen: Dana's bearing came from a catalog tied to Meridian Bearing Supply Co. as the negotiated source, so Marcus's job is mostly to confirm the sourcing is still correct, not to go find a supplier from scratch. For requisition lines without a pre-established source — a non-catalog request, for instance — Marcus would need to perform sourcing: checking existing supplier agreements, negotiated pricing, or soliciting a quote, before a purchase order could be created. Because Dana's line already has a clear, negotiated source, this course's transaction skips that extra sourcing step.

## Consolidating requisition lines

One of the real advantages of separating requisitions from purchase orders is **consolidation**: a buyer can pull multiple approved requisition lines — from different requesters, even different departments — that share the same supplier, and combine them onto a single purchase order. This reduces the number of documents a supplier has to process and can improve negotiating leverage. In this course, Dana's line is the only one being processed onto the purchase order, to keep the transaction simple, but recognize that in a real implementation, Marcus's PO might easily have carried several other requesters' lines as well.

## Automated versus manual processing

Oracle Fusion supports both automated sourcing, where rules can automatically generate a purchase order (or add a line to an existing blanket release) for requisition lines that meet defined criteria, and manual processing, where a buyer reviews and builds the purchase order by hand. For Dana's bearing purchase, Marcus reviews the requisition line in Process Requisitions and manually processes it into a new standard purchase order, which you will build in detail in the next lesson. The result of this lesson's action is that a draft purchase order now exists, referencing Dana's requisition line, with Marcus as the buyer — but it is not yet approved or sent to Meridian.

## Recap

An approved requisition does not become a purchase order automatically; a buyer processes it from a worklist, confirming or performing sourcing as needed, and can consolidate multiple lines from different requesters onto one purchase order. Dana's bearing line, already sourced to Meridian through its catalog entry, is processed by Marcus into a draft standard purchase order. Next up, Chapter 3: building that purchase order in full, starting with the different purchase order types available.
