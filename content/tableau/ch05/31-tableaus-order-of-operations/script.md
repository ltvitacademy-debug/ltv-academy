# Script — Understanding Tableau's Order of Operations

## Segment 1 (title)

Tableau processes every view in a fixed, predictable sequence. Understanding it explains almost every "why isn't my filter working" question you'll ever hit.

## Segment 2 (screenshot: the diagram)

Six stages, always in this order: Extract Filters, Data Source Filters, Context Filters, Dimension Filters, Measure Filters, and Table Calc Filters last — because a table calculation needs the rest of the view's data already assembled before it can even compute.

## Segment 3 (screenshot: filters and sorts)

Here's the sequence in practice: a City filter set to New York City, with Customer Name sorted within it. The filter runs before the sort, so the sort only ever orders the rows that already survived filtering — not the whole dataset.

## Segment 4 (outro)

Next lesson: the Analytics pane — Tableau's built-in trend lines, forecasting, and reference lines.
