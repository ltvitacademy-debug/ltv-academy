# Script — Common Formula Patterns

## Segment 1 (title)

Most analyst formula work falls into a handful of repeatable patterns. Learn these and you'll recognize the shape of almost any request. Treat them as templates, and insert real field tokens from the editor.

## Segment 2 (code: rates and averages)

First, rates. Win rate is the summed Won indicator divided by row count. Average deal size is summed amount divided by row count. Both are summary formulas, and both stay correct on every subtotal and the grand total, because they divide sums.

## Segment 3 (code: share and change)

Second, share of total: this group's summed amount divided by the parent group value at the grand summary. Show it only at group levels, or the grand total reads a meaningless one hundred percent. Third, change from the prior period: group by month, then subtract the previous group's value. The first period has no predecessor, so expect a blank.

## Segment 4 (code: row-level patterns)

Row-level patterns work per record before grouping. Nested IF creates size tiers. Today minus a date gives an age in days. Amount times Probability gives a weighted value you then sum. And an IF on days since last activity flags stale records.

## Segment 5 (steps: pitfalls)

Watch for four mistakes. Never average per-row percentages, divide summed values instead. Guard against dividing by zero. Set the display level so formulas appear where they make sense. And check one group by hand against a list view before you publish.

## Segment 6 (outro)

That completes Chapter three. Chapter four turns these numbers into pictures, starting with report charts. Up next, in lesson fifteen: Report Charts.
