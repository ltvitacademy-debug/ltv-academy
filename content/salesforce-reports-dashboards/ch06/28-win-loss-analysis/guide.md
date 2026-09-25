# Win/Loss Analysis

Win rate is the number that turns a pipeline into a forecast: if you win a quarter of your closed deals, four times coverage is what you need. This lesson shows how to calculate win rate natively, how to break it down to find what actually drives wins, and how to avoid the mistakes that make win rate misleading. It closes Chapter 6 by tying together the pipeline, forecast, lead and opportunity work.

## What you'll learn

- The standard fields and filters that define won, lost and closed
- How to calculate win rate with a summary formula
- How to slice win rate by source, size, owner and competitor
- How to report on loss reasons, and what to do when the field does not exist

## Won, lost and closed

Opportunities carry two system-driven flags, usually displayed as **Closed** and **Won**, that come from the Stage. A closed opportunity is either won or lost. Open ones are neither. The win rate can only be measured on closed deals, so the first filter on every win/loss report is Closed equals True, plus a Close Date range that makes sense, such as the last four quarters.

Do not hardcode stage names like "Closed Won" if your org has more than one won or lost stage. The Won and Closed flags handle that for you.

## Win rate as a formula

Here is a reliable pattern for a summary report:

- Report type: Opportunities
- Filter: Closed = True, Close Date = LAST 4 QUARTERS
- Group rows by Stage (or by Won)
- Add a summary formula: record count divided by the grand total record count

The grand total is available through the PARENTGROUPVAL function with the GRAND_SUMMARY level, which you met in the formula chapter. Formatted as a percent, the Closed Won row is the win rate by count.

To get the win rate by source or owner, group by that field first and Won second. The formula then divides within each group using the group above it. Preview the report and check one row by hand before you trust it.

## Count-based and value-based

There are two legitimate versions, and they often disagree. **Count-based** win rate asks what share of deals you win. **Value-based** win rate asks what share of the dollars you win, using the sum of Amount instead of record count. A team can win most small deals and lose most large ones, which the count hides. Show both when the audience makes resource decisions.

## What drives wins

Once the base report works, slice it:

- **By lead source or campaign**, to learn which channels produce winnable deals
- **By amount bucket**, using a bucket field on Amount to compare small, mid and large deals
- **By owner or team**, with care about small samples: five deals is an anecdote, not a rate
- **By deal age**, using cycle length, since deals that drag on often lose
- **By competitor**, if your org uses the competitors related list on opportunities

## Loss reasons

A loss reason report is only as good as the field behind it. Most orgs add a custom picklist, often called Loss Reason, and require it when a deal moves to Closed Lost. If yours has one, group lost opportunities by reason and sum Amount. If it does not, that is a finding worth raising with your admin, because free-text notes cannot be summarized reliably. Also read "Other" carefully; if it is the largest bucket, the picklist needs work.

## Common pitfalls

- Including open opportunities in the denominator
- Measuring a period where few deals have closed, giving a rate based on a handful of records
- Counting deals that were moved to Closed Lost only to clean the pipeline, which lowers win rate for the wrong reason

## Recap

Filter to closed deals, group by the won flag, and use a summary formula against the grand total to get win rate. Report it by count and by value, slice it by source, size, owner and competitor with sample size in mind, and make sure a reliable loss reason field exists before you promise loss analysis.
