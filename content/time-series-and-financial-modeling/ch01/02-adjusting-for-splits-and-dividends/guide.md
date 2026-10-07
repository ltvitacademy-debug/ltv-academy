# Adjusting for Splits & Dividends

Lesson 1 showed how to turn prices into returns. This lesson deals with a problem that corrupts that calculation silently: the raw "close" price an exchange reports is not a clean measure of an investor's economic experience, because stock splits and cash dividends create artificial jumps that have nothing to do with the company's value. If you compute returns on unadjusted prices, you will see enormous fake losses and gains on days that were, economically, unremarkable.

## What you'll learn

- How stock splits create a price discontinuity that isn't a real return
- How cash dividends create a price drop that isn't a real loss
- The difference between an adjusted close, a price return, and a total return
- How the back-adjustment (cumulative adjustment factor) method works
- Practical handling with pandas and common data-vendor fields

## The split problem

When a company executes a 2-for-1 stock split, every shareholder wakes up with twice as many shares, each worth about half as much. A stock trading at $200 the day before the split opens at roughly $100 the day after. Nothing happened to the company's value — but a naive return calculation sees `100/200 - 1 = -50%` and records a catastrophic loss that never actually happened.

## The dividend problem

Similarly, on a stock's **ex-dividend date**, its price mechanically drops by roughly the amount of the dividend — a $1.00 dividend on a $50 stock typically opens that stock about $1.00 lower, because the company's cash (and therefore its value) really did decrease by that amount as it left the company for shareholders' pockets. But the shareholder didn't lose that dollar — they received it as a cash dividend. A return calculated purely from price change misses that the shareholder is economically flat (or better), not down.

## Adjusted close: back-adjustment

Data vendors solve both problems with an **adjusted close** series. The standard method is **back-adjustment**: starting from the most recent price (unadjusted, matching today's actual quote) and working backward through history, every price before a split or ex-dividend date is multiplied by a cumulative adjustment factor so that the whole series behaves as if the split/dividend had always been priced in.

- For a split with ratio `s` (e.g., `s = 2` for 2-for-1), all prices *before* the split date are divided by `s`.
- For a dividend `d` paid when the price was `P`, all prices *before* the ex-dividend date are multiplied by `(1 - d/P)`.

Because adjustment happens backward from today, the most recent price in an adjusted series still matches what you'd see quoted live, while historical prices are scaled down to make percentage changes continuous across the event.

## Price return vs. total return

This distinction matters and is frequently blurred:

- **Price return** reflects only price appreciation — adjusted *only* for splits, not dividends.
- **Total return** reflects the full investor experience — adjusted for both splits and reinvested dividends.

A split-only-adjusted series is correct for most purposes (it removes fake jumps that aren't real returns), but it will understate a dividend-paying stock's true performance over a long horizon, because it never credits the dividend cash back to the investor. For true performance comparison (e.g., stock vs. index over 10 years), you want a **total return index**, which assumes dividends are reinvested at the ex-date price.

## Handling it in pandas

```python
import pandas as pd

df = pd.read_csv("prices.csv", parse_dates=["date"]).set_index("date")
# A typical vendor feed has: close, adj_close (total-return adjusted)

df["return_naive"] = df["close"].pct_change()       # wrong: split/dividend jumps included
df["return_correct"] = df["adj_close"].pct_change()  # correct: continuous economic return

# If you only have close + a corporate-actions table, build the factor yourself:
# cumulative_factor runs backward in time from the most recent row = 1.0
df = df.sort_index(ascending=False)
df["cum_factor"] = (df["split_ratio"].shift(-1, fill_value=1).cumprod()
                    * df["div_factor"].shift(-1, fill_value=1).cumprod())
df["adj_close_built"] = df["close"] * df["cum_factor"]
df = df.sort_index()
```

When pulling data from a vendor API, always check which field is truly adjusted and for what: some feeds provide `adjClose` adjusted for splits only, others for splits plus dividends — mixing them up across a study is a quiet, common source of bad backtests.

## Key terms

| Term | Meaning |
|---|---|
| Stock split | A share-count change (e.g., 2-for-1) that mechanically changes price with no change in company value |
| Ex-dividend date | The date a stock's price mechanically drops by roughly the dividend amount |
| Adjusted close | A back-adjusted price series that removes split/dividend discontinuities |
| Price return | Return adjusted for splits only, not dividends |
| Total return | Return adjusted for splits and reinvested dividends — the full investor experience |
| Back-adjustment | Scaling historical prices by a cumulative factor so the series is continuous relative to today's price |

## Recap

Raw closing prices contain fake jumps from splits and real-but-misleading drops from dividends; computing returns on them directly is a common beginner error that silently wrecks a backtest. Adjusted close series fix this by back-adjusting historical prices with a cumulative factor, and the choice between price-return and total-return adjustment matters for long-horizon comparisons. Next, Lesson 3 turns to what real financial returns actually look like statistically once they're computed correctly — the "stylized facts" every model in this course has to respect.
