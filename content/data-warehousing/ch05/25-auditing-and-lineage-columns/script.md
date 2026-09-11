# Script — Auditing & Lineage Columns

## Segment 1 (title)

Here's a question every table in this chapter should be able to answer: which load run put this specific row here, when, and from which source? Without dedicated columns for that, you can't.

## Segment 2 (steps: why lineage matters)

A number looking wrong in a report is an investigation with no starting point unless you can trace it. Lineage columns turn "something looks wrong" into an answerable question — which batch, which source system, and when — instead of a guessing game across months of history.

## Segment 3 (code: the three common audit columns)

Three columns show up in almost every real warehouse. LoadDate — the timestamp this row was loaded, never a business date. SourceSystem — which upstream system this row actually came from, essential the moment more than one source feeds the same table. And BatchID — a shared identifier for every row loaded in the same run, which is what lets you isolate exactly one load's rows for debugging or reprocessing.

## Segment 4 (outro)

That closes out Chapter 5. You now have a staging layer with a real purpose, well-designed tables, a load pattern, quality checks, and full traceability — everything the rest of the warehouse depends on landing correctly. Chapter 6 moves on to advanced warehouse patterns, starting with junk dimensions.
