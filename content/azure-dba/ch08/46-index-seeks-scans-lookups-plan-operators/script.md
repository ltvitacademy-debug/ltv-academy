# Script — Index Seeks, Scans, Lookups & Common Plan Operators

## Segment 1 (title)

You built indexes back in T-SQL Development. This lesson is about what the optimizer actually does with them at runtime -- and that shows up in the plan as one of a small set of operators you'll see constantly.

## Segment 2 (steps: seek vs scan vs lookup)

An Index Seek navigates straight to matching rows -- targeted, usually good. An Index Scan reads the entire index top to bottom -- sometimes correct for a big report, often a sign the right index doesn't exist. A Key Lookup is a second trip back to the clustered index for columns the nonclustered index didn't cover.

## Segment 3 (code: SARGable example)

Filter on a plain column and you likely get a seek. Wrap that column in a function like YEAR, and the predicate stops being SARGable -- the optimizer can't use the index seek even if one exists, because it would have to evaluate that function for every single row first.

## Segment 4 (steps: other operators)

Nested Loops is cheap when one side is small. Hash Match builds an in-memory hash table and can spill to tempdb if it doesn't fit. Sort is explicit and often the target for a better index. Compute Scalar evaluates an expression, and often sits right before the Filter that's forcing a scan.

## Segment 5 (outro)

An Index Seek followed immediately by a Key Lookup on thousands of rows is the single most common "add this index" fix in real DBA work. Next up: finding exactly which indexes are actually missing, duplicated, or dead weight.
