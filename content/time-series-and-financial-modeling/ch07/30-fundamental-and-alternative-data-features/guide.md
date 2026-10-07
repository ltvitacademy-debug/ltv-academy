# Fundamental & Alternative Data Features

Lesson 29 showed that technical indicators are all derived from the same price series and tend to collapse into one redundant momentum signal. This lesson looks at two categories of feature that are genuinely different from price: fundamental data, which updates far less often than price does, and alternative data, which trades that timing problem for a different set of headaches.

## What you'll learn

- The common fundamental features: valuation ratios, profitability, leverage, earnings surprise
- Why fundamentals update quarterly while price updates daily, and the alignment problem that creates
- How to join a low-frequency fundamental series onto a daily price index without leaking future knowledge
- What "alternative data" means as a category, and why it's attractive
- The practical problems alternative data brings: short history, vendor survivorship, cost, sparse coverage

## Fundamental features

Fundamental features come from a company's financial statements rather than from the market:

- **Valuation ratios** — P/E (price divided by earnings per share), P/B (price divided by book value per share) — measure how expensive a stock is relative to its own fundamentals
- **Profitability** — ROE (return on equity), profit margins — measure how efficiently the company turns capital into profit
- **Leverage** — debt-to-equity, interest coverage — measure balance-sheet risk
- **Earnings surprise** — the gap between actual reported earnings and what analysts expected, often the single most market-moving fundamental data point of all

These features matter for the same reason returns matter more than prices: markets react to *changes* in fundamentals, and relative-value models often condition directly on valuation ratios like P/E.

## The frequency mismatch

Price updates every trading day. Fundamentals are reported **quarterly** (and even then, with a real-world lag — companies don't report Q2 earnings on June 30th, they report them several weeks later). That mismatch creates a genuine feature-engineering problem: if you want a daily feature series that includes "current P/E," what value does a Tuesday in the middle of a quarter actually get?

The naive answer — forward-fill the fundamental value onto every day between its official period dates — is wrong, because it assumes the market already knew next quarter's numbers before they were actually released. The only honest approach is **point-in-time correctness**: a fundamental value becomes visible to the model only on the date it was actually reported, not the date the period it describes ended.

## Worked example: as-of join vs. naive forward-fill

```python
import numpy as np
import pandas as pd

np.random.seed(7)

# Daily price index
n_days = 260
daily_dates = pd.bdate_range("2023-01-02", periods=n_days)
log_rets = np.random.normal(0.0002, 0.011, n_days)
price = 50 * np.exp(np.cumsum(log_rets))
prices = pd.DataFrame({"date": daily_dates, "close": price})

# Quarterly EPS, reported with a realistic lag after quarter-end
quarter_ends = pd.to_datetime(["2022-12-31", "2023-03-31", "2023-06-30", "2023-09-30", "2023-12-31"])
eps = [1.10, 1.18, 1.05, 1.22, 1.30]
report_lag_days = [38, 41, 35, 44, 40]

fundamentals = pd.DataFrame({
    "quarter_end": quarter_ends,
    "eps": eps,
    "report_date": quarter_ends + pd.to_timedelta(report_lag_days, unit="D"),
})

# WRONG: naive forward-fill keyed on quarter_end -- leaks the new EPS value onto every
# day starting the quarter-end date, weeks before it was actually released
naive = prices.merge(
    fundamentals[["quarter_end", "eps"]].rename(columns={"quarter_end": "date"}),
    on="date", how="outer"
).sort_values("date")
naive["eps_naive_ffill"] = naive["eps"].ffill()
naive = naive[naive["close"].notna()].reset_index(drop=True)

# CORRECT: as-of join on report_date, so EPS only becomes visible on/after the real release day
fundamentals_sorted = fundamentals.sort_values("report_date")
correct = pd.merge_asof(
    prices.sort_values("date"),
    fundamentals_sorted[["report_date", "eps"]].rename(columns={"report_date": "date"}),
    on="date", direction="backward",
)
```

For the 2023-06-30 quarter (EPS = 1.05, actually released on **2023-08-04**), comparing the two approaches day by day shows the naive version already reporting the new EPS value of 1.05 starting on June 30th itself, while the correct as-of join keeps showing the prior quarter's EPS (1.18) all the way through August 3rd:

```
      date      naive_eps_ffill   correct_eps_as_of_report_date
2023-06-30            1.05                   1.18
2023-07-14            1.05                   1.18
2023-07-31            1.05                   1.18
2023-08-03            1.05                   1.18
2023-08-04            1.05                   1.05   <- real release date
```

Counting the business days in that window, **25 trading days** show the naive version reporting a value the market did not actually have access to yet — 25 days of leaked information, all because `quarter_end` was used as the join key instead of `report_date`. `pd.merge_asof(..., direction="backward")` is the general-purpose fix: it joins each price-series row to the most recent fundamental observation whose timestamp is *at or before* that row's own timestamp, which is exactly the point-in-time guarantee this kind of feature needs. This pattern — timestamp the data by when it actually became knowable, then as-of join — will come back directly in Lesson 32, generalized to every kind of time-aware feature, not just fundamentals.

## Alternative data

**Alternative data** is the catch-all term for anything outside traditional price and fundamental data: news and social-media sentiment extracted from text, web traffic, app downloads, credit-card transaction panels, satellite imagery of parking lots or shipping ports, search-trend indices. It's attractive for two reasons: it's often **orthogonal** to price-derived signals (it doesn't suffer Lesson 29's collinearity problem, because it isn't built from price at all), and some sources update **faster** than quarterly fundamentals — web traffic or search trends can update daily or even intraday, closer to price's own cadence.

The practical problems are real, though:

- **Short history** — many alternative datasets only exist for a few years, which is barely enough data to validate a model, let alone guard against overfitting
- **Vendor survivorship** — a data vendor that goes out of business usually does so *because* its signal stopped working or was never that good, so the alternative-data vendors still around today are a survivor-biased sample
- **Cost** — institutional-grade alternative data is often expensive, sometimes on a scale that only makes sense for a large fund
- **Noisy, sparse coverage** — many alternative sources cover only a subset of companies, update unevenly, and carry a much lower signal-to-noise ratio than price itself

None of this means alternative data isn't worth using — it means it needs the same point-in-time discipline as fundamentals (a sentiment score from a news article is only knowable from the moment that article was published, never before), plus extra scrutiny of how much real history actually backs it up.

## Key terms

| Term | Meaning |
|---|---|
| Valuation ratio | A fundamental feature like P/E or P/B measuring price relative to a financial-statement quantity |
| Earnings surprise | The gap between reported earnings and analyst expectations |
| Point-in-time correctness | A data value only becomes visible to a model on the date it was actually knowable, not the period it describes |
| `pd.merge_asof` | pandas function joining each row to the most recent earlier observation in another series |
| Alternative data | Non-price, non-fundamental data (sentiment, web traffic, satellite imagery, etc.) used as model features |
| Vendor survivorship | The bias that alternative-data vendors still operating today are not a representative sample of all such vendors that ever existed |

## Recap

Fundamental features carry real information but update on a quarterly, lagged schedule that must be joined onto daily price data with point-in-time correctness — `merge_asof` on the actual report date, not the quarter-end date, is how that's done correctly. Alternative data offers a path around fundamentals' slow cadence and price's collinearity problem, at the cost of short histories, survivorship bias, and sparse coverage. Next, Lesson 31 turns to a problem that applies to features built from either source: many engineered features are themselves non-stationary and need the same kind of treatment prices got back in Lesson 1 and Lesson 6.
