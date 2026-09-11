# Script — Degenerate Dimensions

## Segment 1 (title)

Every dimension so far has gotten its own table. This lesson is about the case where you deliberately don't build one at all.

## Segment 2 (screenshot: the classic example)

Here's the textbook case, straight from Microsoft's own Fabric documentation: a sales order number. Every line of an order shares that same number, and it doesn't come with a category or a color or any other attribute worth storing. So instead of building a DimSalesOrder table around it, you leave SalesOrderNumber sitting right there on the fact table. That's a degenerate dimension.

## Segment 3 (steps: why not build one)

Why skip the table? Because a dimension earns its place by giving you attributes to filter and group by, and an order number alone gives you nothing extra. It's already at the fact table's own grain — one value per row. And if a report tool still wants something that looks like a dimension, you can wrap it in a view that just selects the distinct values, no redundant storage required.

## Segment 4 (outro)

We've been designing dimensions as if each one only ever serves a single fact table. Next lesson breaks that assumption: dimensions that get reused across many fact tables at once.
