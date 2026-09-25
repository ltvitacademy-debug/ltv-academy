# Script — Opportunity Analysis

## Segment 1 (title)

Pipeline shows what's open, and win/loss shows how deals end. Opportunity analysis covers how deals behave in between: how big, how long, and where they stall.

## Segment 2 (steps: report types)

Choose the report type first. Opportunities gives one row per deal. Opportunities with Products gives one row per line item, for product mix. Opportunity History gives one row per change, for stage movement. Availability depends on which features your org uses. If a report type you expect is missing, ask whether the feature is enabled before assuming the data isn't there.

## Segment 3 (code: deal size and cycle)

For average deal size, filter to Closed Won and average the amount. Never average across open and lost deals. For cycle length, subtract created date from close date in a row-level formula, filtered to won deals, and group by source or owner. Bucketing amounts into small, mid and large deals shows how size relates to speed and win rate.

## Segment 4 (code: stage duration)

To find where deals stall, use Opportunity History, grouped by stage, and look at stage duration. A stage with a far longer average than the rest is your bottleneck. History only exists for changes made after tracking was switched on, so short histories can be misleading. Read the result as a question to investigate, not an answer, because the cause of a stall is usually in the process.

## Segment 5 (steps: double counting)

Watch for double counting. With products, the deal amount repeats on every line item row, so summing it overstates revenue. Sum the line item's own total instead. Slice by owner, source, type, or record type, but keep it to one or two dimensions. Slicing by type, new business versus renewal, is often the most revealing single grouping.

## Segment 6 (outro)

You now know how deals behave. Next up: win and loss analysis.
