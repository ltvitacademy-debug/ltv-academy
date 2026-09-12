# Script — Aggregate vs. Non-Aggregate Calculations & Common Errors

## Segment 1 (title)

Aggregate versus Non-Aggregate Calculations, and the errors that come from mixing them. Every value in a Tableau calculation is either disaggregated — the raw value for one row — or aggregated, a single summary value produced by a function like SUM. Mixing the two in one expression is the single most common calculation error you'll hit.

## Segment 2 (code: this won't save)

Here's the rule, straight from Tableau's own documentation: you cannot combine an aggregated value and a disaggregated value in the same expression. SUM of Sales, times Quantity, is invalid — SUM of Sales is aggregated, but Quantity on its own is row-level. Tableau has no consistent way to multiply one total by many individual values in a single pass, so it refuses to save the formula at all.

## Segment 3 (code: two valid fixes)

There are two ways to fix it: aggregate everything, or aggregate nothing. Revenue Estimate A multiplies Sales by Quantity row by row first, then sums the result with one outer SUM. Revenue Estimate B sums each side independently first, then multiplies the two totals together. Both are valid — but they can produce genuinely different numbers, so which one is correct depends on what you're actually trying to measure.

## Segment 4 (code: the exact error)

When you mix aggregation levels, Tableau's Calculation Editor shows an error along these lines: "Cannot mix aggregate and non-aggregate arguments with this function." That message is your signal to find the one field that isn't wrapped in an aggregate function — or shouldn't be — and fix the mismatch.

## Segment 5 (steps: this chapter's errors, recognized)

You're now equipped to recognize and fix the errors this whole chapter builds toward. An aggregation mismatch — wrap the non-aggregated side in SUM or AVG. A missing END — every IF and CASE block needs one to close it. A type mismatch — convert one side with STR, INT, FLOAT, or DATE before the operator that's complaining.

## Segment 6 (outro)

That's Chapter 6 complete — seven lessons of calculated fields, from your very first formula to the aggregation rule that governs almost every advanced one. Next, Chapter 7 moves into time series and table calculations.
