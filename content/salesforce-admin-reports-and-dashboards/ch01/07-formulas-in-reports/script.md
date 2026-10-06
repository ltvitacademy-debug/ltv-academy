# Script — Formulas in Reports

## Segment 1 (title)

Not every number a report needs already exists as a field. Report formulas calculate new values on the fly, no new custom field required. This lesson covers the two formula types every report builder reaches for.

## Segment 2 (steps: where they live)

Both formula types start from the same place: the Columns dropdown. Add Row-Level Formula calculates one new value per record. Add Summary Formula calculates one value per group, or for the whole report. Add Bucket Column lives in that same menu too, which we'll get to next lesson.

## Segment 3 (screenshot: row-level formula editor)

Here's a row-level formula: Days to Close, output type Number, formula Close Date minus Date Value of Created Date. It runs once per opportunity row. A report can only have one row-level formula, referencing at most five fields.

## Segment 4 (screenshot: summary formula editor)

And here's a summary formula: Win Rate, output type Percent, formula Won Sum divided by Closed Sum. This one calculates per group instead of per row, and a report can have up to five of them.

## Segment 5 (screenshot: summary formula with PARENTGROUPVAL)

This formula goes further: Percent of Annual Attendance, dividing a group's number of campers by PARENTGROUPVAL of the same field one level up. That's how a summary formula becomes aware of the group sitting around it, for a running percent-of-total column.

## Segment 6 (screenshot: report with formula columns applied)

And here's the payoff: a real report with two summary formula columns already applied, Percentage to Monthly Goal and Percentage to Annual Goal, calculated straight from the Sum of Amount column next to them, with a chart built right on top.

## Segment 7 (outro)

One row-level formula per report, up to five summary formulas, and PARENTGROUPVAL or PREVGROUPVAL when a formula needs to know about the group around it. Always hit Validate before you apply. Next up: bucketing, for grouping without a formula at all.
