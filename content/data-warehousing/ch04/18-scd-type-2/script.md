# Script — SCD Type 2

## Segment 1 (title)

Type 1 is simple, but it destroys history. SCD Type 2 exists specifically to prevent that — and it's the single most important pattern in this chapter. Instead of overwriting a row, it inserts a brand-new version and keeps the old one intact.

## Segment 2 (screenshot: the update-then-insert mechanic)

Here's a real Microsoft example: a salesperson is reassigned from sales region 4 to region 5. Two things happen. First, the old row is updated, not deleted — its end date is set, and its current flag flips to false. Second, a brand-new row is inserted with a new surrogate key, the same natural key, the new region, and current set to true. Now there are two rows for the same person — that's the entire point.

## Segment 3 (code: the SQL pattern)

In SQL, that's an UPDATE closing out the old row and an INSERT opening the new one, run together as one transaction. The new surrogate key matters because the natural key is now duplicated across two rows — only the surrogate key lets a fact table join to the exact version that was current when each fact actually happened.

## Segment 4 (steps: the real tradeoff)

The payoff is genuinely correct history. The cost is that the fact table's real grain becomes "dimension member version," not just "dimension member" — and an attribute that changes very frequently can produce an overwhelming number of versions, which is a sign to reconsider the design rather than keep versioning forever.

## Segment 5 (outro)

Type 2 preserves the full timeline. Next lesson, Type 3 takes a lighter-weight middle path — tracking only the immediately previous value, in the same row.
