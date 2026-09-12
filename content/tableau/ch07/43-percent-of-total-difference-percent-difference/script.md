# Script — Percent of Total, Difference & Percent Difference

## Segment 1 (title)

Three of the most common table calculations answer three closely related questions: what share of a whole is this, how much did this change, and what percentage did it change by.

## Segment 2 (screenshot: percent of total dialog)

Percent of Total is entirely dependent on Compute Using. With it set to Pane down, January makes up 19.11% of Q1's sales — change that scope to the whole table instead, and every percentage recalculates against that new, wider total. Percent of Total is only meaningful once you know what it's a percent of.

## Segment 3 (screenshot: percent difference dialog)

Percent Difference From, with Compute Using set to Table down and Relative to Previous, shows how much each month's sales grew or shrank compared to the month before it. Difference gives you that gap in raw dollars; Percent Difference gives you the same gap as a percentage.

## Segment 4 (code: the underlying formulas)

Underneath the dialog, Percent of Total is SUM of Sales divided by TOTAL of SUM of Sales. Percent Difference is the current value minus LOOKUP of the previous value, divided by the absolute value of that previous value. That negative-one inside LOOKUP is exactly what "Relative to Previous" means.

## Segment 5 (outro)

Next lesson covers the other core pair: running totals and moving averages.
