# Script — Formula Functions for Analysts

## Segment 1 (title)

You know where formulas live. Now for what goes inside them. Report formula syntax feels closer to Excel than T-SQL: functions with arguments in parentheses, text in double quotes, no SELECT or FROM.

## Segment 2 (screenshot: editor)

This is the left side of the formula editor. On the Fields tab you search for a field, here the word won, pick a summary type like Sum, and click Insert. Next to it is the Functions tab, which lists every function grouped by category. When you're unsure of a name, the Functions tab is the source of truth for your org, so trust it over memory.

## Segment 3 (steps: families)

There are five families to know. Logical, for decisions. Math, for rounding and arithmetic. Text, for cleanup and labels. Date, for ages and cycle times. And summary-specific functions that understand grouping. Availability differs: row-level formulas usually offer the broad text and date sets, while summary formulas offer a smaller set aimed at totals.

## Segment 4 (code: row-level functions)

For row-level work, IF is your CASE WHEN, and you can nest it for tiers. BLANKVALUE is your ISNULL. Subtracting two dates gives days. ROUND keeps percentages readable. CONTAINS and LEFT handle text tasks like flagging a keyword or extracting a domain. Always guard division, because dividing by zero produces an error.

## Segment 5 (code: summary functions)

Summary formulas add two group-aware functions. PARENTGROUPVAL fetches a value from a higher grouping level, which gives you share of total. PREVGROUPVAL fetches the previous group's value, which gives you change from the prior period, much like LAG in SQL. They only make sense in grouped reports.

## Segment 6 (outro)

You now have the vocabulary. Next lesson puts it to work with the formula patterns analysts use again and again.
