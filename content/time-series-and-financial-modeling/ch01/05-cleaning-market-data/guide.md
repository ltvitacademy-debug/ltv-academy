# Cleaning Market Data

Chapter 1 has covered what to compute (log returns), what to compute it from (adjusted prices), what real returns look like statistically, and how datasets can be systematically biased. This lesson closes the chapter with the hands-on part: the practical checks and fixes every quant runs on a raw market data file before any model is allowed near it. Skipping this step is one of the fastest ways to get a model that fits perfectly to garbage.

## What you'll learn

- Common data-quality problems in real market data feeds: gaps, duplicates, stale prices, bad ticks
- How to detect missing trading days versus genuinely missing data
- Outlier/bad-tick detection without destroying real extreme moves (which Lesson 3 showed are expected)
- Resampling and reindexing to a trading calendar in pandas
- A reusable cleaning checklist

## Common problems in raw feeds

- **Gaps** — missing rows for dates the market was open (data feed outage, vendor error).
- **Duplicates** — the same timestamp appearing twice, sometimes with slightly different values.
- **Stale prices** — the same price repeated for several consecutive days, often meaning the instrument didn't actually trade (illiquid) rather than that the price was genuinely flat.
- **Bad ticks** — a single implausible print (e.g., a price 100x too large from a misplaced decimal, or a zero/negative price) that doesn't reflect a real trade.
- **Timezone/calendar mismatches** — mixing data recorded in exchange local time with data recorded in UTC, or treating a non-trading day as if it had a value.

## Distinguishing "no trading day" from "missing data"

Before flagging a gap as a problem, check it against the actual trading calendar — don't assume every calendar day should have a row. `pandas_market_calendars` (or a simple manually-maintained holiday list) tells you which days the relevant exchange was actually open.

```python
import pandas as pd
import pandas_market_calendars as mcal

nyse = mcal.get_calendar("NYSE")
schedule = nyse.schedule(start_date="2023-01-01", end_date="2023-12-31")
trading_days = schedule.index

missing = trading_days.difference(prices.index)   # real gaps, not holidays/weekends
```

## Detecting bad ticks without destroying real extreme moves

Lesson 3 established that real returns have fat tails — a 10% move in one day genuinely happens sometimes. The goal isn't to remove all large moves, it's to catch *implausible* ones. A common, robust approach uses a rolling median and median absolute deviation (MAD) rather than a simple fixed threshold, because MAD is far less distorted by the very outliers you're trying to detect than a rolling mean/standard deviation would be:

```python
import numpy as np

def flag_bad_ticks(returns, window=21, mad_threshold=8):
    rolling_median = returns.rolling(window, center=True).median()
    abs_dev = (returns - rolling_median).abs()
    mad = abs_dev.rolling(window, center=True).median()
    # scale factor 1.4826 makes MAD comparable to a standard deviation under Normality
    robust_z = 0.6745 * (returns - rolling_median) / mad.replace(0, np.nan)
    return robust_z.abs() > mad_threshold

flagged = flag_bad_ticks(log_returns)
```

A high `mad_threshold` (e.g., 8) is deliberate — it should only catch genuinely implausible prints, not the legitimately large moves that are a normal part of financial data. Flagged points should be manually reviewed, not silently dropped — sometimes the "outlier" is real news (an earnings surprise, M&A announcement), and removing it would itself introduce a bias.

## Handling stale prices and duplicates

```python
duplicated = prices.index.duplicated(keep="last")   # keep the latest vendor correction
prices = prices[~duplicated]

stale_run_length = (prices == prices.shift(1)).astype(int).groupby(
    (prices != prices.shift(1)).cumsum()
).cumsum()
suspicious_stale = stale_run_length > 5   # same price 5+ days running — investigate
```

## Reindexing to a consistent calendar

Once gaps, duplicates, and bad ticks are handled, align the series to the trading calendar explicitly, rather than trusting whatever rows happened to come back from the data source:

```python
prices = prices.reindex(trading_days)
prices = prices.ffill(limit=2)   # forward-fill only short genuine gaps; don't paper over large ones
```

Setting a `limit` on `ffill` is deliberate: forward-filling without a limit can silently manufacture a long run of fake "flat" days on top of a real, extended data outage.

## A cleaning checklist

```python
# 1. Align to the actual exchange trading calendar (not every calendar day)
# 2. Drop/resolve duplicate timestamps, keeping the latest correction
# 3. Flag implausible ticks with a robust (median/MAD) method, don't just threshold on raw moves
# 4. Manually review flagged points before dropping anything
# 5. Identify suspicious stale-price runs that suggest illiquidity, not real flatness
# 6. Reindex to calendar with a LIMITED forward-fill, not an unlimited one
```

## Key terms

| Term | Meaning |
|---|---|
| Bad tick | An implausible price print not reflecting a real trade |
| Stale price | A repeated price suggesting no real trading occurred, not genuine flatness |
| MAD (median absolute deviation) | A robust dispersion measure less distorted by outliers than standard deviation |
| Trading calendar | The actual set of days an exchange was open, used to distinguish real gaps from holidays |
| Forward-fill with limit | Filling short genuine gaps while refusing to paper over long outages |

## Recap

Chapter 1 built the full pipeline from raw price to trustworthy return: compute log returns correctly, adjust for splits and dividends, know what real returns should statistically look like, watch for dataset biases, and clean the raw feed itself before any of it touches a model. Chapter 2 starts the actual time series toolkit: Lesson 6 introduces stationarity and the Augmented Dickey-Fuller test, the first formal check every model in this course depends on.
