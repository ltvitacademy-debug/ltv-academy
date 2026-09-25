# Deal Size & Sales Cycle Analysis

Question four from the kickoff: what is our typical deal size and sales cycle, and do bigger deals behave differently? This analysis feeds forecasting directly. If large deals take three times as long to close, a large deal that was created two weeks ago is not going to rescue this quarter. All numbers are illustrative Alder & Vale figures for the last four completed quarters.

## What you'll learn

- How to bucket deals by size and summarize each bucket
- How to measure sales cycle length on won deals
- Where the data can mislead you
- How to turn the findings into a forecasting insight

## Building the report

**Report:** Opportunities report type. Filters: Won = True, Close Date across the last four completed quarters (a custom date range). Then:

1. **Bucket the Amount column** into three size bands: under $25K, $25K to $75K, and over $75K. Bucketing is a report feature you learned earlier; it lets you group by ranges without changing the data.
2. **Group by the Amount bucket**, and show Record Count, Sum of Amount, and Average of Amount.
3. **Measure the cycle.** For closed opportunities, the standard Age field reports the days from created date to close date. Alternatively, add a row-level formula, illustrative syntax:

```
CLOSE_DATE - DATEVALUE(CREATED_DATE)
```

   Confirm both approaches agree on a few records. Then summarize the cycle column as an **Average** (and a **Median**, if your report builder offers it, since medians resist outliers).

A note on SOQL: it can filter and aggregate, but it cannot subtract one date field from another inside a query, so cycle length is a report or formula-field job. SOQL is still fine for the size side:

```sql
SELECT COUNT(Id), SUM(Amount), AVG(Amount)
FROM Opportunity
WHERE IsWon = true
AND CloseDate = LAST_N_QUARTERS:4
```

## The illustrative result

| Size band | Won deals | Revenue | Avg deal | Avg cycle | Win rate |
|---|---|---|---|---|---|
| Under $25K | 44 | $660K | $15K | 34 days | 37% |
| $25K to $75K | 66 | $2.97M | $45K | 55 days | 37% |
| Over $75K | 30 | $2.67M | $89K | 96 days | 30% |
| **All won** | **140** | **$6.30M** | **$45K** | **about 57 days** | **35%** |

The win rate column needs a second report on all closed deals (won and lost) bucketed the same way, exactly like the win-rate report from Lesson 6.

## What it says

- **Large deals carry the revenue.** Deals over $75K are 21% of wins (30 of 140) but 42% of won revenue ($2.67M of $6.30M).
- **They take much longer.** About 96 days, nearly three times the 34 days of small deals.
- **They win less often.** 30% versus 37% for the other two bands.
- **The overall average hides all three.** A 57-day average cycle describes almost no deal in particular.

## Where the data can mislead you

- **Close Date is entered by people.** Reps sometimes backdate or slide it, so cycle length can be off. Spot-check against the opportunity's created date and stage history.
- **Won-only cycles hide lost deals.** Lost deals also consume time. Compare cycles on lost deals if you have the data.
- **Small buckets are noisy.** Thirty deals is a sample, not a law. State that.
- **Averages versus medians.** A few unusual deals can drag an average. Check both when you can.

## The forecasting insight

Apply the findings to the current quarter. With about three weeks left, suppose a report of open deals over $75K marked to close this quarter shows six deals worth about $600K, and four of them (about $390K) were created less than 60 days ago. Given a typical 96-day cycle, those four are unlikely to close in time regardless of what the close date says. That is roughly **$390K of the $1.35M** quarter pipeline that carries timing risk, which reinforces Lesson 6's warning that the headline coverage ratio is optimistic. For the next quarter, the takeaway flips: large deals must be started early, so pipeline generation for big accounts is a planning-horizon problem.

## Recap

Bucket by size, average the cycle on won deals, and read the bands separately: large deals are fewer, bigger, slower, and slightly less likely to close. Be honest about backdated close dates, small samples, and averages. Use cycle length to sanity-check which open deals can realistically close this quarter.

## Check yourself

A rep insists a $120K deal created last week will close this quarter. Using this lesson's numbers, what would you ask, and what would you show the VP of Sales?
