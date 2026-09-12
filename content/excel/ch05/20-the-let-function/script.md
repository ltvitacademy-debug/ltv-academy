# Script — The LET Function

## Segment 1 (title)

Any time you write the same sub-expression twice inside one formula, Excel calculates it twice. LET fixes that by letting you name an intermediate result once and reuse it — a real readability and performance win, not just a style preference.

## Segment 2 (screenshot: LET syntax diagram)

LET's syntax is a series of name and value pairs, up to 126 of them, followed by one final calculation that uses those names like variables. Each name only exists inside that one formula — it isn't a workbook-wide defined name.

## Segment 3 (code: before and after)

Before LET, a formula checking a sum against a threshold might calculate that same SUM three separate times. Rewritten with LET, the sum is calculated exactly once, named total, and reused everywhere else in the formula — same result, a fraction of the recalculation.

## Segment 4 (screenshot: a real filtered example)

The same idea applies to naming a filtered intermediate result — narrow a dataset down to one rep's rows once, name it, and build the rest of the formula on that name instead of repeating the filter logic itself.

## Segment 5 (outro)

That's Chapter 5 — dynamic arrays, spilling, and now LET. Next chapter: Power Query, and cleaning real messy data before it ever reaches a formula.
