# Cleaning & Exploring Market Data

Phase 1 starts here: before any statistics or models, the raw Stooq CSVs have to become a clean, aligned panel you can trust. This lesson walks through the cleaning steps and then explores the result — summary statistics, return distributions, volatility, and correlation — to get a feel for the data before testing anything.

## What you'll learn

- The cleaning steps: calendar alignment, missing-day handling, verifying adjusted close, and correctly handling the dynamic universe
- How to compute log returns and why they're preferred over simple returns for this kind of analysis
- Exploratory findings: fat-tailed return distributions, rolling realized volatility, the sector correlation matrix, and VIX versus realized volatility
- Key terms: point-in-time data, log returns, realized volatility

## Cleaning the raw data

Starting from the loader introduced in Lesson 1, four cleaning steps turn 13 raw CSVs (11 sectors, SPY, VIX) into one usable panel:

1. **Calendar alignment** — reindex every ticker onto a shared trading-calendar index (derived from SPY's dates, which has the longest clean history) so a missing row in one ticker doesn't silently misalign dates across the panel.
2. **Missing-day handling** — a handful of early-2007 rows have gaps from data-vendor quirks; these are forward-filled for at most one session, never further, and flagged rather than silently interpolated across a real gap.
3. **Verifying adjusted close** — spot-check that adjusted close tracks raw close plus known dividend/split events; a jump in adjusted close with no corresponding raw-price jump usually means a split was applied correctly, while an unexplained jump in both signals bad data.
4. **The dynamic universe, done correctly** — XLRE and XLC are included only from their real launch dates onward (2015-10-08 and 2018-06-19), matching Lesson 1's rule. This is **point-in-time data**: at any date in the backtest, the feature-and-model code only ever sees the names that existed as of that date — never a security that hadn't launched yet.

```python
import numpy as np

def align_panel(panel, calendar_ref="SPY"):
    cal = panel[calendar_ref].index
    aligned = {t: df.reindex(cal).ffill(limit=1) for t, df in panel.items()}
    return aligned

def log_returns(df):
    return np.log(df["close"]).diff()

aligned = align_panel(panel)
rets = {t: log_returns(df) for t, df in aligned.items()}
```

**Log returns** — the log of the price ratio between two periods — are used instead of simple percentage returns because they're additive across time (today's log return plus tomorrow's equals the two-day log return), which makes the rolling-window statistics in the next section well-behaved, and they better match the near-lognormal behavior of asset prices.

## Exploring the cleaned data

With a clean panel in hand, exploratory data analysis (EDA) surfaces a few things that matter for everything downstream:

- **Fat tails** — daily log-return histograms for every sector show visibly fatter tails than a normal distribution: more days with large moves (in both directions) than a Gaussian would predict. This matters because several of the statistical tests in Lesson 5 use methods robust to non-normality rather than assuming it away.
- **Rolling volatility** — a 20-day rolling annualized realized volatility series (`rv_20d`) shows clear volatility clustering: calm stretches punctuated by spikes (2008, 2020, 2022) rather than constant volatility.
- **Correlation matrix** — pairwise correlations across the 11 sectors are almost all positive and often high (0.6–0.9), confirming that most of the cross-section's daily variance is a shared market factor — which is exactly why this strategy is dollar-neutral and cross-sectional rather than simply long sectors outright.
- **VIX vs. realized volatility** — the VIX (an options-implied, forward-looking volatility measure) tracks trailing realized volatility closely but leads it around volatility spikes, which is part of the motivation for using VIX, not just trailing realized vol, as the regime conditioner.

```python
def realized_vol(ret, window=20, trading_days=252):
    return ret.rolling(window).std() * np.sqrt(trading_days)

rv_20d = {t: realized_vol(r) for t, r in rets.items()}
```

## Key terms

| Term | Meaning |
|---|---|
| Point-in-time data | Data as it actually existed on a given date, with no names or values that weren't yet available |
| Log returns | ln(price_t / price_t-1); additive across time, well-suited to rolling statistics |
| Realized volatility | Volatility measured from actual historical returns, here annualized over a rolling 20-day window |

## Recap

The raw Stooq CSVs are now a clean, calendar-aligned, point-in-time panel with log returns computed. Exploration shows fat-tailed returns, clustered volatility, a highly correlated sector cross-section, and a VIX series that tracks and leads realized volatility. Next lesson: formal statistical tests of the reversal hypothesis against this cleaned data.
