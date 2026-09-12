# Script — INDEX/MATCH

## Segment 1 (title)

INDEX/MATCH did everything VLOOKUP does, years before XLOOKUP existed — and it still shows up constantly in real, inherited workbooks.

## Segment 2 (code: INDEX and MATCH separately)

MATCH finds where a value lives in a range and returns its position — not the value itself. INDEX returns the value stored at a given position. Neither is useful alone for a lookup, but together they do the whole job: MATCH finds where, INDEX fetches what's actually there.

## Segment 3 (code: combined, and why it still matters)

INDEX of ReturnColumn, MATCH of id in IDColumn, zero — that zero means exact match, same idea as VLOOKUP's FALSE. Because the lookup and return columns are totally independent ranges, this can look left just as easily as XLOOKUP. And it works in every Excel version back to the nineties, which XLOOKUP simply doesn't.

## Segment 4 (outro)

Next lesson: Combining Lookups — nesting a second MATCH inside INDEX for a true two-way lookup, by row and column at once.
