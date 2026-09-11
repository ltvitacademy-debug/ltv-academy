# Script — Lookup Transformation

## Segment 1 (title)

The Lookup transformation is one of the most useful transformations
you'll ever drop onto a data flow — it lets you join against a reference
dataset without ever leaving the pipeline. Let's see how it works.

## Segment 2 (steps: cache modes)

The Lookup transformation joins your data flow's input columns against a
reference dataset — a table, a view, a query, or a cache file — the same
way you'd write a join in T-SQL, except this join runs row by row, right
inside the pipeline. Before it can do that, you have to tell it how to
cache that reference dataset, and this choice matters. Full cache loads
the entire reference dataset into memory once, before the Lookup even
runs — it's fast, but it's a snapshot frozen at that moment. Partial
cache builds the cache up as rows get looked up during execution, and
evicts the least-used rows when it fills up. No cache skips caching
entirely — every single lookup hits the reference dataset live, which is
slowest but always current. Lookups are also case sensitive, so if your
data has inconsistent casing, normalize it first.

## Segment 3 (steps: match/no match/error)

Once the Lookup runs, every row gets routed to one of three outputs. The
Match output carries rows that found at least one row in the reference
dataset. The No Match output carries rows that didn't — but here's the
catch: by default, SSIS treats unmatched rows as errors, so you have to
explicitly configure the Lookup to redirect them to the No Match output
instead if you want to handle them separately. That's exactly the
pattern you'll use in Chapter 7 to detect brand-new rows during an
incremental load. And the Error output catches genuine failures,
separate from a simple non-match.

## Segment 4 (outro)

The Lookup transformation is your row-by-row join. Next up is the
Conditional Split — a transformation that routes rows to different
outputs based on whatever logic you write, the data flow equivalent of a
CASE statement.
