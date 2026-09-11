# Script — Building Facts & Dimensions

## Segment 1 (title)

This is the most conceptually important lesson in this chapter — dw.FactWorkOrder is what every downstream report and dashboard actually reads from.

## Segment 2 (code: the fact table's keys)

Two surrogate foreign keys resolve from Lesson 4's Lookups: ProductKey and a nullable ScrapReasonKey. Then three more foreign keys — StartDateKey, EndDateKey, and DueDateKey — all pointing at the same DimDate table.

## Segment 3 (screenshot: role-playing dimensions)

This is the exact same mechanism Data Modeling & Data Warehousing's Lesson 27 taught with a Flight fact table and one Airport dimension referenced twice. Here, it's one DimDate table referenced three times — one physical table, three distinct business roles.

## Segment 4 (steps: three roles, one DimDate)

StartDateKey answers when production began. DueDateKey answers when it was scheduled to finish. EndDateKey answers when it actually finished — and that one's nullable, because a work order that hasn't finished yet genuinely has no end date. That's also why this fact table is an accumulating snapshot: the row gets inserted when the work order starts, and updated as StockedQty and ScrappedQty change, until EndDateKey finally gets filled in.

## Segment 5 (steps: Location out of scope)

Production.Location is a real, related table — and it's deliberately left out. It's tracked at the WorkOrderRouting grain, one level finer than the WorkOrder grain this fact table chose. Attaching one LocationKey per work order would silently pick just one location for a work order that touched several — a factual error, not a simplification. Modeling it correctly would take a second fact table at the routing grain, which is genuinely out of scope here.

## Segment 6 (outro)

Next lesson, the SSRS paginated report reads straight from the fact and dimension tables you just built — no changes needed on this side.
