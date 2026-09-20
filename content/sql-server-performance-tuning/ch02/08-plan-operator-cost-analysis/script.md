# Script — Plan Operator Cost Analysis

## Segment 1 (title)

Lessons 6 and 7 gave you the vocabulary and the estimate-versus-actual signal. This lesson is a field guide to the specific operators that show up disproportionately often in slow plans.

## Segment 2 (code: Key Lookup)

A Key Lookup fires once per matching row to fetch columns a nonclustered index doesn't include. Fine for a handful of rows, expensive at scale. The usual fix is a covering index that includes those columns directly.

## Segment 3 (steps: four operators worth watching)

Sort is expensive and worse if it spills to tempdb. Hash Match is fine at the right size but painful if its memory grant is wrong and it spills too. A Scan on a large table does work proportional to the table's size, not to what you actually need.

## Segment 4 (code: a predicate that disables a seek)

A predicate can quietly disable a seek even when the right index exists — wrapping the indexed column in a function like YEAR() is the classic example. Rewriting it as a range comparison restores the seek.

## Segment 5 (outro)

None of these operators are automatically wrong — they're signals worth investigating, not verdicts. Next up: parameter sniffing, one of the most common causes behind a bad estimate in the first place.
