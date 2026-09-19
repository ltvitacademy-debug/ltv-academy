# Script — Intelligent Query Processing & Automatic Tuning

## Segment 1 (title)

Lessons 44-51 taught you to read a plan, find a missing index, use Query Store, and query DMVs yourself. This lesson is about the real, genuinely automatic capabilities that act without a DBA running a query first.

## Segment 2 (code: intelligent query processing)

When the optimizer's upfront row-count estimate is wrong, IQP features correct course while the query is still executing — batch mode on rowstore, memory grant feedback that adjusts on the next execution, adaptive joins that pick a strategy after seeing the actual row count.

## Segment 3 (code: automatic tuning)

Automatic Tuning closes the loop on Lesson 49's manual regression-fixing — Azure SQL monitors Query Store, forces the last known-good plan automatically, and keeps watching afterward, reverting if the forced plan doesn't actually help.

## Segment 4 (code: what automation doesn't replace)

Neither feature designs a missing index, diagnoses a blocking chain, or tells you to start with wait stats. They're a real layer on top of the manual skills this chapter built, not a substitute for them.

## Segment 5 (outro)

Methodology, plan reading, indexes, Query Store, blocking, DMVs, and now the automation on top of all of it. Chapter 8 is complete — next up, Chapter 9: Database Performance & Maintenance.
