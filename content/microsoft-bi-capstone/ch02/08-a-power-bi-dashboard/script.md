# Script — A Power BI Dashboard

## Segment 1 (title)

Lesson 7 built an SSRS report against the warehouse. This lesson builds the second consumer: a Power BI dashboard, reading the exact same FactWorkOrder table.

## Segment 2 (screenshot: storage mode)

The connection decision comes first: Import, not DirectQuery. The warehouse is a nightly-refreshed batch target fed by the SSIS package, not a live operational system, so there's no reason to pay DirectQuery's per-click query cost — and Import unlocks the full DAX surface this dashboard's measures need.

## Segment 3 (screenshot: column chart)

Production volume by product is the simplest visual: drag Product Name onto the axis, Order Qty onto values, and Power BI produces a real column chart — summing Order Qty per product.

## Segment 4 (screenshot: trend line)

Scrap rate trend needs a measure first: DIVIDE of summed Scrapped Qty over summed Order Qty. DIVIDE instead of the raw division operator returns blank instead of an error on a date with zero work orders. Put that measure on a line chart against the date table, and Power BI's own Analytics pane can add a trend line on top.

## Segment 5 (steps: on-time vs late)

On-time versus late completion compares two dates on the same fact row: End Date Key against Due Date Key. A calculated column buckets every row as On Time or Late, and a clustered column chart counts them.

## Segment 6 (outro)

Every one of these three visuals reads the exact same FactWorkOrder table Lesson 7's SSRS report reads. Next lesson confirms that connection directly.
