# Common Formula Patterns

Once you know where formulas live and which functions exist, most analyst work falls into a handful of repeatable patterns. This lesson collects them, tells you which formula type each belongs to, and flags the mistakes that produce plausible but wrong numbers. Treat the expressions here as templates: exact field tokens differ by object and org, so insert fields from the formula editor rather than typing names from memory.

## What you'll learn

- The summary-formula patterns: win rate, average deal size, share of total, and change from the prior period
- The row-level patterns: tiers, age in days, and weighted values
- How to choose between row-level and summary formulas
- Common pitfalls, especially ratio of sums versus average of ratios and divide-by-zero
- When a formula stops being the right tool

## Pattern 1: rate, or conversion

A rate is one summed count divided by another. Win rate is won opportunities over all opportunities. Lead conversion is converted leads over all leads. Both use a numeric 1/0 indicator or a count.

```
Win Rate = Opportunity.Won:SUM / RowCount
```

This is a summary formula. It stays correct at every grouping level and on the grand total because it divides sums.

## Pattern 2: average of a measure

```
Avg Deal Size = AMOUNT:SUM / RowCount
```

Salesforce can also summarize a column with Average directly, so use the formula when you need a denominator that the built-in average does not give you, for example dividing amount by only the won opportunities.

## Pattern 3: share of total

```
% of Total = AMOUNT:SUM / PARENTGROUPVAL(AMOUNT:SUM, GRAND_SUMMARY)
```

`PARENTGROUPVAL` fetches the total from a higher level. Format the result as Percent and set the display level so it shows on the groups, not on the grand total, where it would trivially read 100 percent.

## Pattern 4: change from the prior period

```
MoM Change = AMOUNT:SUM - PREVGROUPVAL(AMOUNT:SUM, CLOSE_DATE)
```

Group by a date at month or quarter granularity, and `PREVGROUPVAL` returns the previous group's total. The first group has no predecessor, so expect it to be blank or zero. Divide by the previous value for a percent change, and guard that division.

## Row-level patterns

These calculate per record, before grouping.

**Tiering** with nested `IF`, to label size or risk bands:

```
IF(AMOUNT > 100000, "Large", IF(AMOUNT > 25000, "Medium", "Small"))
```

**Age or cycle time**, the gap between two dates or between a date and today:

```
TODAY() - CREATED_DATE
CLOSE_DATE - CREATED_DATE
```

**Weighted value**, which you then sum in the report:

```
AMOUNT * PROBABILITY
```

**Stale flag**, combining a date gap with a test:

```
IF(TODAY() - LAST_ACTIVITY > 30, "Stale", "Active")
```

## Choosing the right type

Ask one question: does the calculation belong to each record, or to the totals? Per record, including tiers, ages, and weighting before summing, is row-level. On aggregates, including rates, shares, and period changes, is summary. If you need both, build the row-level column first and summarize it, then apply a summary formula on top.

## Pitfalls

- **Average of ratios.** Never average a per-row percentage to get a group percentage. Divide summed values instead.
- **Divide by zero.** Empty groups error out, so test the denominator with an `IF`.
- **Wrong display level.** A share-of-parent formula on the grand total is meaningless. Set where the formula appears.
- **Blank values.** Blank numbers may be skipped rather than counted as zero. Use `BLANKVALUE` when the difference matters.
- **Silent mismatches.** Confirm at least one group by hand against a list view before you publish the report.

## When to stop

Reports have caps on how many formulas they hold, and they cannot join in outside data or do multi-step transformations. If a metric needs a custom formula on the object for many reports, ask for a formula field. If it needs complex transforms, moving averages, or cross-object joins beyond report types, that is the point where later courses in this path bring in CRM Analytics and Tableau.

## Recap

Rates, averages, share of total, and period change are summary formulas built from ratios of sums, `PARENTGROUPVAL`, and `PREVGROUPVAL`. Tiers, ages, and weighted values are row-level formulas. Choose by asking whether the calculation belongs to the record or to the total, and guard divisions, display levels, and blanks.

## Check yourself

A colleague averages each rep's win-rate column to report the team win rate. What is wrong with that, and which formula would you use instead?
