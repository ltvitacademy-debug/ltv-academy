# Data Handling in Backtests

Every backtest is only as trustworthy as the data feeding it. This chapter has focused on the engine — vectorized, event-driven, framework-based — but a flawless engine fed bad data produces a confidently wrong answer. This lesson covers the data-handling details that quietly make or break a backtest's validity: price adjustments, missing data, timestamps and timezones, and point-in-time correctness.

## What you'll learn

- Why raw ("unadjusted") price data silently breaks backtests around splits and dividends
- How adjusted close prices work, and what they still don't fix
- Handling missing data, halts, and gaps without introducing bias
- Timestamp and timezone pitfalls that create accidental look-ahead bias
- What "point-in-time" data means and why it matters for fundamentals

## Splits, dividends, and adjusted prices

A stock that does a 2-for-1 split sees its raw price halve overnight with no change in the company's value. A backtest reading raw ("unadjusted") close prices will see that halving as a 50% one-day loss, which is nonsense — it will trigger stop-losses, distort moving averages, and corrupt every return calculation that crosses the split date.

The standard fix is to use **adjusted close prices**, which retroactively rescale historical prices so that splits and (for total-return analysis) dividends don't appear as fake price jumps:

```python
import pandas as pd

raw = pd.read_csv("prices_raw.csv", index_col=0, parse_dates=True)
# raw["close"] has a split-day discontinuity; raw["adj_close"]
# has been rescaled backward through history to remove it.

returns_wrong = raw["close"].pct_change()       # spurious -50% on split day
returns_right = raw["adj_close"].pct_change()    # smooth, correct return
```

Adjusted prices fix splits and dividend effects for *return* calculations, but they introduce their own subtlety: an adjusted price series changes retroactively every time a new dividend is paid, which means two downloads of "the same" adjusted history taken on different dates can differ slightly in the past. For strategies that trade on absolute price levels (not just returns) — for example a rule like "buy if price > $50" — you generally want the *unadjusted* price for the trade-trigger logic and the adjusted series only for computing realized P&L, or you'll get false signals from adjustment-driven level changes that have nothing to do with the market.

## Missing data and gaps

Real market data has holes: a stock gets halted, an exchange closes for a holiday your calendar didn't account for, or a data vendor simply has a bad day. How you fill those holes is itself a modeling decision with real consequences:

- **Forward-filling** (`.ffill()`) a missing price assumes nothing happened and the price stayed flat — reasonable for a short halt, dangerous if it hides a multi-day gap where the price actually gapped hard on reopening.
- **Dropping** missing rows silently can misalign a multi-asset backtest's calendar, making it look like trades happened simultaneously across assets when their actual available data didn't line up that way.
- **Never interpolate a straight line** through a gap and treat it as real price action — it fabricates smooth movement (and smooth, fake returns) where none existed.

The safest default: explicitly flag gaps, understand *why* each one exists (holiday vs. halt vs. vendor error), and handle each category deliberately rather than applying one blanket `.fillna()` to the whole dataset.

## Timestamps, timezones, and bar boundaries

A subtle, common source of accidental look-ahead bias: mismatched timestamp conventions. If your price data vendor timestamps a daily bar with that day's date but the bar actually represents the prior session's close-to-close (or vice versa), your `.shift(1)` guard can be shifting by the wrong amount without you noticing anything is wrong — the backtest will still run and produce a number, it will just be quietly measuring the wrong thing.

```python
# Always verify explicitly rather than assuming:
print(df.index[:3], df.index.tz)   # what timezone, if any?
print(df.loc["2024-03-15"])        # does this bar's data match what you'd
                                     # expect "March 15th" to mean for this asset?
```

For intraday or multi-exchange strategies this gets harder: combining a US equity bar timestamped in US/Eastern with a London-listed instrument timestamped in Europe/London requires converting both to a common timezone (typically UTC) before any alignment or signal logic runs, or bars that look simultaneous may actually be hours apart.

## Point-in-time data

For fundamentals-based or alternative-data strategies, there's a sharper version of the look-ahead problem: **point-in-time correctness**. A company's reported Q1 earnings aren't known to the market the moment the quarter ends — they're known only once actually released, often 4-6 weeks later, and they are sometimes restated afterward. A backtest that joins "Q1 earnings" to "Q1-end date" rather than "the date the earnings were actually announced" is handing the strategy information before the market could have had it — a slower-moving, easier-to-miss cousin of the same look-ahead bias from Lesson 11. Point-in-time databases exist specifically to solve this by recording, for every data point, the date it was actually known, not just the date it describes.

## Key terms

| Term | Meaning |
|---|---|
| Adjusted close | A price series retroactively rescaled to remove the effect of splits and dividends |
| Forward-fill | Carrying the last known value forward to fill a data gap |
| Point-in-time data | Data recorded with the date it was actually known/released, not the date it describes |
| Bar boundary | The exact start/end time a given price bar represents |

## Recap

An engine can be perfectly correct and still produce a wrong answer if the data feeding it has unadjusted splits, naively filled gaps, mismatched timestamps, or fundamentals joined to the wrong date. Chapter 3 has now covered what a backtest is, the two engine architectures, how to build one, real frameworks, and the data feeding all of it. Chapter 4 turns to the next layer: making the simulation's trading assumptions themselves realistic, starting with Lesson 16 on transaction costs and slippage.
