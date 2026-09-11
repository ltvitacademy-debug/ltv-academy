# Script — Factless Fact Tables

## Segment 1 (title)

Every fact table so far in this chapter has had a measure column to sum. This lesson covers the exception: a fact table with no measure at all, and it's still a legitimate, useful design.

## Segment 2 (code: f_ClassAttendance)

The classic example is class attendance. The grain is one row per student, per class, per date attended — and there's no Quantity column, no Amount column, nothing to sum. The event itself is the fact. To measure it, you run COUNT(*) grouped by class and date — the row's existence is the measurement, not any number inside it.

## Segment 3 (steps: event vs. coverage)

There are actually two different reasons a table ends up factless. An event table, like attendance, means every existing row is something that happened. A coverage table is more subtle — a row means a condition existed, like a product being eligible for a promotion, whether or not it actually sold. Compare a coverage table against a transaction sales table, and the rows that appear in coverage but not in sales tell you what was eligible but never happened — a question the sales table alone could never answer, because it simply has no row for what didn't occur.

## Segment 4 (outro)

That's all four fact table types this chapter set out to cover: transaction, periodic snapshot, accumulating snapshot, and factless. Next, Chapter 3 turns to the other half of every star schema: designing the dimension tables these facts actually join to.
