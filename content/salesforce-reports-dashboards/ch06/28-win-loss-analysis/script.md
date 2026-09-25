# Script — Win/Loss Analysis

## Segment 1 (title)

Win rate turns a pipeline into a forecast. If you win one closed deal in four, you need about four times coverage. Let's calculate it natively.

## Segment 2 (steps: won, lost, closed)

Opportunities have two system flags, Closed and Won, driven by the stage. Closed deals are either won or lost. Win rate can only be measured on closed deals, so every win-loss report starts with Closed equals True. Use the flags instead of hardcoding stage names. Deals abandoned only to tidy the pipeline drag win rate down, so ask how your team closes lost deals.

## Segment 3 (code: win rate formula)

Filter to closed deals over the last four quarters, and group by Won. Add a summary formula that divides record count by the grand total, using PARENTGROUPVAL. Formatted as a percent, the won row is your win rate. Check one row by hand. A five-deal sample is an anecdote, so keep an eye on the record count beside every rate.

## Segment 4 (steps: count versus value)

Report it two ways. Count-based win rate shows the share of deals you win. Value-based shows the share of dollars. They often disagree, because teams can win most small deals and lose the large ones. Show both when the audience is deciding where to spend time, since each one leads to a different conclusion.

## Segment 5 (steps: slice and loss reasons)

Then slice it by source, amount bucket, owner and competitor, watching for small samples. For loss reasons you need a custom picklist, required on Closed Lost. If it doesn't exist, that's a finding to raise, because free text can't be summarized. Watch the Other bucket too. If it's the biggest slice, the picklist needs work.

## Segment 6 (outro)

That wraps up the sales analytics chapter. Next up: customer and service analytics.
