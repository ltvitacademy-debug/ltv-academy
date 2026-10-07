# Survivorship & Other Data Biases

The stylized facts in Lesson 3 describe genuine properties of markets. This lesson covers the opposite problem: distortions that come not from markets, but from flaws in how historical datasets were assembled. These biases are dangerous precisely because they don't look like noise — they produce clean, statistically significant results that are simply wrong, and they are one of the most common reasons an academically "great" backtest fails completely in live trading.

## What you'll learn

- Survivorship bias: why index/database histories tend to overstate past returns
- Look-ahead bias: using information that wasn't actually available at the time
- Backfill (instant history) bias, common in hedge fund and mutual fund databases
- Data-snooping bias from testing too many strategies on the same dataset
- Practical habits that defend against each

## Survivorship bias

Most financial databases only include companies, funds, or indices that still exist today — or that existed at the end of the sample period. Companies that went bankrupt, were delisted, or funds that shut down after bad performance simply vanish from the dataset, often without a trace. If you compute the "average historical return of S&P 500 constituents" using only today's constituent list, you've silently excluded every constituent that was removed for underperforming or failing — and the resulting average return overstates what an investor actually would have earned by overweighting winners.

The fix is a **survivorship-bias-free** (or "point-in-time") database, which retains entries for delisted names with their actual (often poor) final returns recorded, and reconstructs what the index or universe *actually looked like* on each historical date rather than what it looks like today.

## Look-ahead bias

Look-ahead bias occurs when a backtest uses information that would not have actually been known or available at the time a trading decision was simulated. Classic examples:

- Using a company's final (restated) financial statement for a date before the restatement happened
- Using year-end classification (e.g., "was this a top decile momentum stock this year") to decide trades *during* that same year
- Using data vendor fields that are themselves back-adjusted using future information (some fundamental data fields are revised after the fact; using the revised value for a historical date is look-ahead)

The defense is strict **point-in-time discipline**: every value used in a simulated decision at time `t` must be a value that was actually knowable at time `t`, with the realistic reporting lag included (e.g., quarterly earnings aren't known the instant the quarter ends — there's a reporting lag of weeks).

## Backfill (instant history) bias

Common in hedge fund and mutual fund databases: a fund only starts voluntarily reporting its performance to a database once it has a good track record, and then "backfills" its historical returns into the database retroactively. Funds with bad early performance often never start reporting at all, so they never enter the database. The result: the average historical return across funds in the database is inflated, because the sample that gets backfilled is disproportionately funds that did well.

## Data-snooping / multiple-testing bias

If you test enough strategies, parameter combinations, or lookback windows against the same historical dataset, some will appear profitable purely by chance — the financial-markets version of p-hacking. The more combinations tried, the more likely a "significant" result is spurious. Defenses include out-of-sample testing on data the strategy was never tuned against, holding out a final validation period nobody touches until the very end, and being appropriately skeptical of a strategy's in-sample Sharpe ratio.

## A quick checklist

```python
# Point-in-time hygiene, conceptually:
# 1. Does my universe on date t reflect what actually existed/was investable on date t
#    (including names later delisted), not today's surviving universe?
# 2. Was every input value actually known and published by date t, with realistic lag?
# 3. Did I test this one idea, or did I search over many and keep the best?
# 4. Do I have a genuine out-of-sample or holdout period I haven't looked at yet?
```

## Key terms

| Term | Meaning |
|---|---|
| Survivorship bias | Historical returns overstated by excluding delisted/failed entities from the dataset |
| Point-in-time data | Data reconstructed to reflect exactly what was knowable/investable as of each historical date |
| Look-ahead bias | Using information in a simulated decision that wasn't actually available at that time |
| Backfill (instant history) bias | Funds retroactively adding history to a database only after achieving good performance |
| Data-snooping bias | Finding spuriously "significant" results by testing too many strategies on one dataset |

## Recap

Survivorship, look-ahead, backfill, and data-snooping biases all produce clean-looking but misleading results, and every one of them has sunk real backtests that looked great on paper. The discipline is the same throughout: use point-in-time, survivorship-bias-free data, and validate on data the strategy never saw. Next, Lesson 5 turns from diagnosing bad data to actually fixing it — practical techniques for cleaning real market data before any model touches it.
