# Script — VLOOKUP vs. XLOOKUP

## Segment 1 (title)

VLOOKUP and XLOOKUP both look up a value and return a related one — but they fail in different places, and knowing where each one breaks matters more than memorizing the syntax.

## Segment 2 (code: VLOOKUP)

VLOOKUP searches the first column of a table and returns a value a fixed number of columns to the right. That column number is hardcoded — insert one new column anywhere in the range and every VLOOKUP referencing it silently pulls from the wrong place. And its match type defaults to approximate unless you explicitly pass FALSE, which is the single most common cause of a VLOOKUP returning a wrong-but-plausible answer.

## Segment 3 (code: XLOOKUP)

XLOOKUP fixes both problems. The column to return is its own independent reference, so inserting a column elsewhere can't shift it. It defaults to exact match with no FALSE to remember. And because lookup and return are separate references, XLOOKUP can look left — something VLOOKUP structurally cannot do at all.

## Segment 4 (outro)

Next lesson: INDEX/MATCH — the function pair that did all of this years before XLOOKUP existed, and still matters in older Excel versions.
