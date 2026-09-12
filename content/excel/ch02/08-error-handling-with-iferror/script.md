# Script — Error Handling With IFERROR

## Segment 1 (title)

Wrapping a lookup in an error handler seems like an obvious good habit — until you realize IFERROR can't tell an expected miss apart from an actually broken formula.

## Segment 2 (code: IFERROR)

IFERROR replaces any error at all — hash-N-A, hash-REF, hash-VALUE, hash-NAME — with one fallback value. That's exactly the problem: a deleted column producing hash-REF gets the same friendly "Not found" message as a genuinely missing lookup value, so a real bug can hide behind that message indefinitely.

## Segment 3 (code: IFNA)

IFNA catches only hash-N-A, the "no match found" error, and lets every other error type display normally. That's the more honest default for a lookup — a missing match is expected and gets a clean fallback, but a broken reference stays loud and visible until someone actually fixes it.

## Segment 4 (outro)

That's the end of Chapter 2. Chapter 3 moves into aggregation and logic functions, starting with SUMIFS, COUNTIFS, and AVERAGEIFS.
