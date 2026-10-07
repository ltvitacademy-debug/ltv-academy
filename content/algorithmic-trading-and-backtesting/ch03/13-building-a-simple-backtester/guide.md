# Building a Simple Backtester

Lesson 12 described vectorized and event-driven backtests conceptually. This lesson builds one of each, end to end, for the same strategy — a moving-average crossover — so you can see exactly where the two approaches agree, where they diverge, and why a hand-built backtester, however simple, is worth understanding even if you'll eventually use a framework (Lesson 14 covers that).

## What you'll learn

- How to build a complete vectorized backtester in pandas, from raw prices to an equity curve
- How to build a complete event-driven backtester with explicit state (cash, position, fills)
- Why the two engines can give slightly different results even on the "same" strategy
- The minimum set of outputs any backtester should report, beyond just final return

## A complete vectorized backtester

Here is a full vectorized backtest of a moving-average crossover strategy, from raw prices to performance stats:

```python
import pandas as pd
import numpy as np

def vectorized_backtest(price: pd.Series, fast_win=10, slow_win=50):
    fast = price.rolling(fast_win).mean()
    slow = price.rolling(slow_win).mean()

    signal = (fast > slow).astype(int)
    position = signal.shift(1).fillna(0)        # trade one bar later

    daily_ret = price.pct_change().fillna(0)
    strat_ret = position * daily_ret

    equity = (1 + strat_ret).cumprod()
    total_return = equity.iloc[-1] - 1
    n_years = len(price) / 252
    cagr = equity.iloc[-1] ** (1 / n_years) - 1
    ann_vol = strat_ret.std() * np.sqrt(252)
    sharpe = (strat_ret.mean() * 252) / ann_vol if ann_vol > 0 else np.nan

    return {
        "equity_curve": equity,
        "total_return": total_return,
        "cagr": cagr,
        "ann_vol": ann_vol,
        "sharpe": sharpe,
    }
```

This is roughly 20 lines and tests years of data almost instantly. Note the two habits already drilled in: `.shift(1)` before multiplying by returns, and `.fillna(0)` so the warm-up period (before the rolling windows have enough data) doesn't inject `NaN`s into the equity curve.

## A complete event-driven backtester

The same strategy, built as an explicit bar-by-bar loop with a tracked portfolio:

```python
class Portfolio:
    def __init__(self, cash):
        self.cash = cash
        self.shares = 0

    def equity(self, price):
        return self.cash + self.shares * price

def event_driven_backtest(df, fast_win=10, slow_win=50, start_cash=100_000):
    df = df.copy()
    df["fast"] = df["close"].rolling(fast_win).mean()
    df["slow"] = df["close"].rolling(slow_win).mean()

    pf = Portfolio(start_cash)
    equity_curve = []

    for i in range(1, len(df)):
        prev = df.iloc[i - 1]
        today = df.iloc[i]

        # Decide using YESTERDAY's completed bar only.
        want_long = prev["fast"] > prev["slow"]

        if want_long and pf.shares == 0:
            pf.shares = pf.cash // today["open"]       # fill at today's OPEN
            pf.cash -= pf.shares * today["open"]
        elif not want_long and pf.shares > 0:
            pf.cash += pf.shares * today["open"]
            pf.shares = 0

        equity_curve.append(pf.equity(today["close"]))

    return pd.Series(equity_curve, index=df.index[1:])
```

The decision at step `i` is based on `prev` — the bar *before* today — and the trade fills at today's open, not at the price the decision was made on. That's the event-driven equivalent of the vectorized version's `.shift(1)`: the loop structure itself enforces that only already-known information drives today's trade.

## Why the two engines don't match exactly

Run both backtesters on the same price series and the same moving-average windows, and the results will be *close* but rarely identical, for reasons that are themselves instructive:

- **Fill price.** The vectorized version implicitly assumes the position earns the full close-to-close return starting the bar after the signal. The event-driven version explicitly fills at the next bar's *open*, which differs from the prior close by the overnight gap.
- **Position sizing.** The vectorized version assumes a continuous, infinitely divisible position (100% of capital, or some fraction). The event-driven version computes a whole number of shares (`pf.cash // today["open"]`), which leaves a small uninvested cash remainder — a real-world constraint vectorized math usually ignores.
- **Warm-up handling.** `NaN`-filling choices during the rolling-window warm-up period can differ subtly between the two implementations if you're not careful to match them.

None of these differences are bugs — they're the two engines making different, both-reasonable simplifying assumptions. The lesson is not "which one is right," but that **the assumptions embedded in your backtester's code are themselves part of the strategy's measured performance**, whether you intended them to be or not.

## The minimum report every backtester should produce

A backtest that only prints "total return: 34%" is not useful. At minimum, report:

- **Equity curve** — not just the final number, but the path, which reveals whether the return came steadily or from one lucky period
- **CAGR** (compound annual growth rate) — the return normalized to an annualized basis, so results across different time windows are comparable
- **Annualized volatility and Sharpe ratio** — return alone says nothing about the risk taken to get it (full treatment in Lesson 21)
- **Number of trades** — a strategy with 3 trades over 5 years and one with 3,000 need very different amounts of statistical trust
- **Max drawdown** — the worst peak-to-trough decline, which matters enormously for whether a real investor could have stuck with the strategy (Lesson 22)

## Key terms

| Term | Meaning |
|---|---|
| Fill price | The specific price at which a simulated trade is assumed to execute |
| Warm-up period | The initial bars of a backtest where rolling calculations don't yet have enough data |
| CAGR | Compound annual growth rate — the annualized equivalent of a total return |
| Equity curve | The running account value over the backtest, plotted bar by bar |

## Recap

Building both a vectorized and an event-driven backtester for the same strategy shows that "the strategy" is never fully specified by its signal rule alone — fill assumptions, position sizing mechanics, and warm-up handling all quietly shape the result. Next, Lesson 14 moves from hand-rolled code to real open-source backtesting frameworks that handle these mechanics for you, consistently.
