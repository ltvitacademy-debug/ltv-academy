# Script — An SSRS Paginated Report

## Segment 1 (title)

Now that the warehouse exists, it's time to read from it. This lesson builds WorkOrderProductionSummary — a real SSRS paginated report against dw.FactWorkOrder.

## Segment 2 (screenshot: row and column groups)

The report is a matrix grouped by Product, built the same way SSRS Development's own tutorials build one: Report Builder, a shared data source pointed at the warehouse, and the Table or Matrix Wizard. Grouping by Product turns hundreds of individual work order rows into one summary line per product.

## Segment 3 (screenshot: finished matrix)

Run the wizard with Product in Row groups and Order Qty, Stocked Qty, and Scrapped Qty in Values, and Report Builder produces exactly this shape — one summary row per product, with totals.

## Segment 4 (screenshot: parameters pane)

A report hardcoded to every product forever isn't reusable. Add a ProductName parameter through the Report Data pane, defaulted to "All" using a Select Parameter Values dataset, so the report opens fully populated and narrows only when someone wants it to.

## Segment 5 (code: scrap rate expression)

The one expression that turns three raw sums into a business number is scrap rate: Sum of Scrapped Qty, divided by Sum of Order Qty, both wrapped in Sum so the math happens at the group level, not the detail row. Format it as a percentage in the text box's number formatting — not baked into the expression itself.

## Segment 6 (outro)

Next lesson builds the second consumer of this same warehouse: a Power BI dashboard, reading the exact same FactWorkOrder table this report just read.
