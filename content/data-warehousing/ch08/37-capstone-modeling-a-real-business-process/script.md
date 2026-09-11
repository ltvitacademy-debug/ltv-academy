# Script — Capstone: Modeling a Real Business Process

## Segment 1 (title)

Last lesson chose the business process. This lesson finishes the other three steps of Kimball's sequence for real: declare the grain, pick the dimensions, and pick the fact table type.

## Segment 2 (steps: the grain and the dimension list)

The grain: one row per purchase order line — one product ordered on one purchase order. Everything else has to agree with that. Five dimensions fall out of it, each with its own SCD decision. Date is conformed and static. Vendor is Type 2, because credit rating and preferred-vendor status genuinely change, and you want to know what a vendor's status was on the order date, not just today. Product is Type 1 and conformed with the sales side of the business — same governed definition, reused. Employee, the buyer who placed the order, is Type 1. And ship method is Type 0 — a small reference table that essentially never changes.

## Segment 3 (steps: why accumulating snapshot)

Now the fact table type, and this is the interesting decision. A transaction fact would be right if a purchase order line got written once and never touched again. A periodic snapshot would be right if you wanted a fresh row every day or month regardless of activity. Neither fits. A purchase order line gets placed, then partially received — sometimes over more than one delivery — and its received and rejected quantities update in place as that happens. That's the exact definition of an accumulating snapshot fact table: one row, several milestone dates, measures that update as the process moves forward.

## Segment 4 (outro)

Order number, revision number, and status don't describe a vendor or a product — they identify the order itself, so they stay right on the fact table as degenerate dimensions. Next lesson turns every decision made here into real CREATE TABLE statements.
