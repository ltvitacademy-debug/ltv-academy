# Script — LOD Expressions and Filters

## Segment 1 (title)

Almost every confusing LOD result comes down to one thing: the order Tableau applies filters and LOD expressions in. Once you know that order, the confusing behavior stops being confusing.

## Segment 2 (steps: the pipeline)

Extract filters, then data source filters, then context filters — and only after all three does FIXED compute. Then dimension filters run, and only after those do INCLUDE and EXCLUDE compute. Measure filters and table calculation filters run last, on the fully built result.

## Segment 3 (code: why FIXED ignores regular filters)

This is why a regular Region filter doesn't change a FIXED customer total — the filter runs at stage five, but FIXED already computed back at stage four. INCLUDE and EXCLUDE compute after dimension filters, so they do reflect that same filter.

## Segment 4 (code: promoting to context)

Right-click the filter pill, choose Add to Context, and the pill turns gray — now it runs at stage three, before FIXED. Same FIXED expression, same customer, but now the region filter actually restricts what FIXED sees.

## Segment 5 (outro)

Next lesson steps back and compares LOD expressions directly against table calculations — two different tools that can sometimes produce the same-looking number, for very different reasons.
