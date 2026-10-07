# Building Factors From Raw Data

Lesson 21 treated SMB and HML as given — download them from Ken French's data library and plug them into a regression. This lesson opens up that black box and builds factors like these from raw stock-level data, the way a quant researcher actually would before a ready-made factor series exists for whatever market or universe they're working in. The same sort-and-spread recipe also builds momentum, one of the most robust factors found outside the original Fama-French set.

## What you'll learn

- The portfolio-sort recipe behind SMB and HML: rank, bucket, go long one bucket and short the other
- How the momentum factor is built from past 12-1 month returns
- Practical pitfalls: look-ahead bias, rebalancing frequency, and turnover
- How to build a long-short factor from a cross-section of stocks using pandas `qcut`

## The portfolio-sort recipe

Every Fama-French-style factor is built the same way:

1. At each rebalancing date, rank all stocks in the universe by some characteristic (market cap, book-to-market, past return)
2. Split the ranked stocks into buckets — Fama and French originally used terciles or a median split
3. Form a portfolio long the bucket expected to outperform and short the bucket expected to underperform
4. Hold until the next rebalancing date, then re-rank and repeat

SMB sorts on market cap and goes long small / short big. HML sorts on book-to-market and goes long high B/M (value) / short low B/M (growth). The factor's return each period is simply the long portfolio's return minus the short portfolio's return.

## Momentum: sorting on past return instead of a fundamental

The momentum factor (often called WML, "Winners Minus Losers," or UMD, "Up Minus Down") uses the exact same recipe but ranks stocks on their own **past 12-1 month return** — the cumulative return over the prior 12 months, *excluding* the most recent month. The most recent month is deliberately skipped because of well-documented short-term reversal: a stock's return in the immediately preceding month tends to partially reverse, which would contaminate a pure momentum signal if included. Stocks in the top decile or tercile of past 12-1 return go long; stocks in the bottom go short.

## Practical pitfalls

- **Look-ahead bias.** Fundamental data like book value is reported with a lag — a company's fiscal year-end book value isn't publicly known until its annual report is filed, often months later. A sort that uses fiscal-year-end book value on the fiscal-year-end date itself is silently using information nobody could have traded on at the time. Real implementations lag fundamental data by several months to respect reporting delays.
- **Rebalancing frequency.** Rebalance too often and transaction costs eat the premium; rebalance too rarely and the factor exposure drifts as stocks grow, shrink, or re-rank between rebalances. Fama-French factors rebalance annually for size/value sorts but momentum, being a faster-decaying signal, is typically rebalanced monthly.
- **Turnover.** Momentum in particular has high turnover — last month's winners are frequently not this month's winners — which makes it one of the more expensive factors to actually trade once realistic costs are included, even though it looks attractive on paper.

## Worked example: building three factors from a synthetic cross-section

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(5)
n_stocks = 300

# synthetic cross-section, one rebalancing snapshot
market_cap = rng.lognormal(mean=7.5, sigma=1.3, size=n_stocks)
book_to_market = rng.lognormal(mean=-0.3, sigma=0.5, size=n_stocks)
past_12_1_return = rng.normal(0.08, 0.20, n_stocks)

# next-month return built with real (synthetic) size, value, and momentum premia
size_z = (np.log(market_cap) - np.log(market_cap).mean()) / np.log(market_cap).std()
value_z = (np.log(book_to_market) - np.log(book_to_market).mean()) / np.log(book_to_market).std()
mom_z = (past_12_1_return - past_12_1_return.mean()) / past_12_1_return.std()

next_month_return = (
    0.01 - 0.004*size_z + 0.003*value_z + 0.0025*mom_z + rng.normal(0, 0.05, n_stocks)
)

df = pd.DataFrame({
    "market_cap": market_cap, "book_to_market": book_to_market,
    "past_12_1_return": past_12_1_return, "next_month_return": next_month_return,
})

df["size_bucket"] = pd.qcut(df["market_cap"], 3, labels=["small", "mid", "big"])
smb = (df.loc[df.size_bucket == "small", "next_month_return"].mean()
       - df.loc[df.size_bucket == "big", "next_month_return"].mean())

df["value_bucket"] = pd.qcut(df["book_to_market"], 3, labels=["low_bm_growth", "mid_bm", "high_bm_value"])
hml = (df.loc[df.value_bucket == "high_bm_value", "next_month_return"].mean()
       - df.loc[df.value_bucket == "low_bm_growth", "next_month_return"].mean())

df["mom_bucket"] = pd.qcut(df["past_12_1_return"], 3, labels=["losers", "mid", "winners"])
wml = (df.loc[df.mom_bucket == "winners", "next_month_return"].mean()
       - df.loc[df.mom_bucket == "losers", "next_month_return"].mean())

print("SMB (small - big):    %.4f" % smb)
print("HML (value - growth): %.4f" % hml)
print("WML (winners - losers): %.4f" % wml)
```

The actual run produced:

```
SMB (small - big):    0.0139
HML (value - growth): 0.0096
WML (winners - losers): 0.0056
```

Breaking down the average next-month return by bucket shows the sort working as intended. By size, returns decrease monotonically from small to big caps: 0.0225 → 0.0186 → 0.0086. By book-to-market, the low (growth) bucket lands lowest at 0.0098 and the high (value) bucket lands well above it at 0.0194 — though the mid bucket actually edges out the high bucket at 0.0204, a bit of non-monotonicity that real factor sorts show too, which is exactly why HML uses the two extreme buckets rather than assuming a clean straight line across all three. By momentum, losers average 0.0150, the middle bucket dips slightly to 0.0140, and winners come out highest at 0.0206. `pd.qcut` does the ranking-and-bucketing step in one line; the long-short spread is just a difference of group means computed with `groupby`.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio sort | Rank stocks by a characteristic, bucket them, go long one bucket / short another |
| Momentum (WML/UMD) | Factor built by sorting on past 12-1 month return |
| 12-1 month return | Cumulative return over the prior 12 months, excluding the most recent month |
| Look-ahead bias | Using fundamental data before it was actually publicly available |
| Turnover | How often portfolio holdings change; costly for fast-decaying signals like momentum |

## Recap

Factors like SMB, HML, and momentum are all built with the same sort-bucket-and-spread recipe applied to a different raw characteristic, with real-world care needed around reporting lags, rebalancing frequency, and turnover. Next, Lesson 23 asks a related but distinct question: once you have factor exposures for many assets, how do you estimate the *price* the market pays for each unit of exposure — the cross-sectional (Fama-MacBeth) regression.
