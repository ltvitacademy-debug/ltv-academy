# Script — FILTER, SORT & UNIQUE

## Segment 1 (title)

Three functions, and most of your dynamic-array work every day is some combination of them. FILTER pulls matching rows, SORT reorders an array, and UNIQUE returns distinct values — each one a real formula, not a menu command.

## Segment 2 (screenshot: FILTER)

FILTER takes the range to pull from, a condition built from a separate range of the same height, and an optional fallback for when nothing matches. Here, filtering by region and product returns every matching row spilled straight onto the sheet — no helper column involved.

## Segment 3 (screenshot: SORT nested with UNIQUE)

Nest them and they get genuinely useful. SORT of UNIQUE of a column reads inside-out: UNIQUE deduplicates first, then SORT reorders what's left — one formula doing what used to take a helper column and a PivotTable.

## Segment 4 (code: combining conditions and nesting further)

Multiply two condition arrays together inside FILTER for AND logic, add them for OR. And you're not limited to nesting two functions — SORT of FILTER, ranked by a numeric column descending, filters and ranks in a single formula.

## Segment 5 (outro)

Next lesson: spilled ranges themselves — the hash spill operator, and exactly what causes a #SPILL! error and how to fix it.
