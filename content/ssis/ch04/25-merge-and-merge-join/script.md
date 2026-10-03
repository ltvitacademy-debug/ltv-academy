# Script — Merge & Merge Join

## Segment 1 (title)

Merge and Merge Join sound almost identical, and they get confused
constantly — but they solve two genuinely different problems. Let's pull
them apart.

## Segment 2 (steps: two jobs)

Merge takes two sorted datasets that already have the same shape — the
same columns, the same types — and stacks their rows together into one
combined output. It's so close to Union All that Microsoft's own
documentation tells you to just use Union All instead whenever your
inputs aren't sorted, your output doesn't need to be sorted, or you have
more than two inputs to combine — Merge only ever takes exactly two.
Merge Join is a completely different operation. It joins two sorted
datasets the way a SQL join does — combining columns from two different
sources into wider rows — using a FULL, LEFT, or INNER join that you
choose explicitly.

## Segment 3 (screenshot: merge-editor-sqlshack2.png)

Here's the Merge Transformation Editor itself, merging two versions of
the same dataset. Look at the Merge Input 2 column — most rows say
"ignore," and only a handful of columns, the ones that actually exist in
both inputs with matching metadata, carry a real value across. SSIS maps
what it can automatically; anything else stays ignored until you decide
otherwise.

## Segment 4 (screenshot: mj-wired-unconfigured.png)

This is the exact package from last lesson, one step further along. Both
Sort outputs are now wired into the same Merge Join — you can see the
connectors landing on it — but it's still flagged with an error, because
wiring the inputs isn't the same as configuring the join. It still needs
a join type and a join key before it'll actually run.

## Segment 5 (screenshot: mj-editor-inner.png)

And here's that configuration. Up top, Join type is set to Inner join —
your three choices are FULL, LEFT, or INNER. Below that, both sort panels
show Name checked as the Join Key on each side — that's the column the
join actually matches on, and it has to line up with the sort-key
position from each upstream Sort transformation. Everything else in each
panel — Address on the left, Salary on the right — just rides along into
the output without being part of the match.

## Segment 6 (steps: sorted input requirement)

Here's what both of them insist on, no exceptions. First, sorted input
— on the exact columns you're merging or joining on. That's the entire
reason the Sort transformation exists as its own lesson right before
this one; you either run a Sort transformation upstream, or you're
pulling from a source query that's already ordered with its IsSorted
property set correctly. Second, matching metadata — you can't merge or
join a numeric column against a character column. And third, neither
transformation gives you an error output, so any error handling you
need has to happen before the data ever reaches them.

## Segment 7 (outro)

That closes out Chapter 4's data flow transformations — Lookup,
Conditional Split, Derived Column, Data Conversion, Aggregate, Sort, and
now Merge and Merge Join. Chapter 5 starts making your packages dynamic,
with variables, parameters, and expressions.
