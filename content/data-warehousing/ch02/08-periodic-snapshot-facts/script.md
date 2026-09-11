# Script — Periodic Snapshot Facts

## Segment 1 (title)

A transaction fact table only has a row when something happens. But what about "what was every product's stock level at the end of each day"? Nothing has to happen for that question to need an answer — which is exactly the gap a periodic snapshot fact table fills.

## Segment 2 (code: f_InventorySnapshot)

Here's the grain, stated precisely: one row per product, per warehouse, per snapshot date. This table gets loaded on a schedule — every product-warehouse combination gets a row every day, whether its quantity on hand changed or not. That's the load pattern that separates a periodic snapshot from a transaction table.

## Segment 3 (steps: semi-additive, not additive)

Here's the rule that trips people up. Summing quantity on hand across products, on one snapshot date, gives you a real number. But summing it across snapshot dates is wrong — you're just counting the same stock twice because it happened to still be there both days. That's what makes this measure semi-additive: valid across some dimensions, invalid across time. If you need a trend, take the average or the last value — never a straight sum across dates.

## Segment 4 (outro)

Periodic snapshots handle "state at a point in time." The next lesson covers a fact table type built for something different: a single process moving through defined stages, one row updated the whole way through.
