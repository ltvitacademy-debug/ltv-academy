# Script — Combining Lookups

## Segment 1 (title)

A regular lookup finds one value with one search key. Some problems need two at once — a value at the intersection of a row condition and a column condition — and that needs nested formulas.

## Segment 2 (code: nested INDEX/MATCH)

INDEX can take both a row number and a column number. So one MATCH finds which row a region lives in, a second independent MATCH finds which column a month lives in, and INDEX returns whatever sits at that exact intersection. Two coordinates, one cell.

## Segment 3 (code: nested XLOOKUP)

The same result with XLOOKUP nested inside XLOOKUP: the inner one returns the entire matching row as an array, and the outer one searches within just that row for the column value. It works, but it reads less symmetrically — which is part of why INDEX/MATCH stays the more common choice for two-way lookups specifically.

## Segment 4 (outro)

Next lesson: Error Handling With IFERROR — wrapping a lookup so a missing match doesn't break the whole workbook, and why IFERROR isn't always the right choice.
