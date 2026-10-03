# Script — Lookup Transformation

## Segment 1 (title)

The Lookup transformation is one of the most useful transformations
you'll ever drop onto a data flow — it lets you join against a reference
dataset without ever leaving the pipeline. Let's see how it works.

## Segment 2 (screenshot: lookup-editor-general.png)

This is the Lookup Transformation Editor's General page — the exact
screen where you make the cache mode decision. Full cache, Partial
cache, or No cache, plus whether you're connecting through an OLE DB
connection manager or a Cache connection manager. And right below that,
the dropdown for how to handle rows with no matching entries — set to
Fail component by default, which is almost never what you actually want.

## Segment 3 (steps: cache modes)

The Lookup transformation joins your data flow's input columns against a
reference dataset — a table, a view, a query, or a cache file — the same
way you'd write a join in T-SQL, except this join runs row by row, right
inside the pipeline. Full cache loads the entire reference dataset into
memory once, before the Lookup even runs — it's fast, but it's a
snapshot frozen at that moment. Partial cache builds the cache up as
rows get looked up during execution, and evicts the least-used rows when
it fills up. No cache skips caching entirely — every single lookup hits
the reference dataset live, which is slowest but always current. Lookups
are also case sensitive, so if your data has inconsistent casing,
normalize it first.

## Segment 4 (screenshot: lookup-editor-connection.png)

Switch to the Connection page and this is where you point the Lookup at
its reference dataset — pick an OLE DB connection manager, then choose a
table or view, or supply your own SQL query instead if you only need a
subset of columns.

## Segment 5 (screenshot: lookup-editor-columns.png)

The Columns page is where the actual join happens. Drag a column from
Available Input Columns onto its match in Available Lookup Columns to
build the join — here, a column maps straight across. Then check any
extra lookup columns you want pulled into the output, and set each one's
Output Alias in the grid below, the same way Lesson 19's lab adds a
ProductName column off a ProductID join.

## Segment 6 (screenshot: lookup-input-output-selection.png)

And here's Match versus No Match made concrete. The moment you wire the
Lookup's output into a destination, SSIS asks you directly which one
you're connecting to — Lookup Match Output, or Lookup No Match Output —
because they're genuinely separate pipelines from this point on.

## Segment 7 (steps: match/no match/error)

Once the Lookup runs, every row gets routed to one of three outputs. The
Match output carries rows that found at least one row in the reference
dataset. The No Match output carries rows that didn't — but here's the
catch: by default, SSIS treats unmatched rows as errors, so you have to
explicitly configure the Lookup to redirect them to the No Match output
instead if you want to handle them separately. That's exactly the
pattern you'll use in Chapter 7 to detect brand-new rows during an
incremental load. And the Error output catches genuine failures,
separate from a simple non-match.

## Segment 8 (outro)

The Lookup transformation is your row-by-row join. Next up is the
Conditional Split — a transformation that routes rows to different
outputs based on whatever logic you write, the data flow equivalent of a
CASE statement.
