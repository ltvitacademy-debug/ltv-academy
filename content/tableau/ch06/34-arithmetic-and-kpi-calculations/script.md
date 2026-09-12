# Script — Arithmetic & KPI Calculations

## Segment 1 (title)

Arithmetic and KPI Calculations. Tableau supports the same arithmetic operators you'd expect — plus, minus, multiply, divide, and modulo — and they work directly on any numeric field, following standard order of operations.

## Segment 2 (code: a basic difference)

The simplest possible calculated field is one measure combined with another. Profit equals Sales minus Cost. That single subtraction is a real, working calculated field the moment you save it — Tableau evaluates it for every row and aggregates the result whenever you drop Profit onto a view.

## Segment 3 (code: a KPI ratio)

Most real dashboards also want a ratio — a percentage that stays meaningful even when scale changes. Profit Ratio equals SUM of Profit, divided by SUM of Sales. Notice SUM wrapped around both sides — that's what makes this the ratio of total profit to total sales for whatever's on the view, not some row-by-row average.

## Segment 4 (code: order of operations)

Parentheses control evaluation order exactly like algebra. Margin A, Sales minus Cost divided by Sales, divides Cost by Sales first — division before subtraction — then subtracts that from Sales, which is almost certainly not what you meant. Margin B wraps Sales minus Cost in parentheses, forcing that subtraction to happen first, then divides by Sales to get an actual profit margin.

## Segment 5 (steps: common KPI shapes)

Most real-world KPI formulas fall into one of three shapes. Absolute — a plain difference like Profit. Ratio — one aggregated total divided by another, like Profit Ratio. Index — a value compared against a baseline or target, like Sales Index divided by a target figure. Recognizing which shape a question is asking for is most of the work.

## Segment 6 (outro)

Next lesson, string calculations — LEFT, RIGHT, CONTAINS, and building text fields from the ones you already have.
