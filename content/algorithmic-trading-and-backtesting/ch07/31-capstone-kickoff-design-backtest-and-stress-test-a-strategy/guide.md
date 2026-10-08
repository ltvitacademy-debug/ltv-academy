# Capstone Kickoff: Design, Backtest, and Stress-Test a Strategy

This is the course's capstone, spread across three lessons. You're going to take one simple strategy idea and run it through the entire pipeline this course taught, start to finish, on your own: specify it like Lesson 1 demanded, build a vectorized backtest with real costs, measure it honestly with Chapter 5's tools, and stress-test it before calling it done. This lesson frames the assignment and gets the design decisions made; Lesson 32 builds it; Lesson 33 covers writing it up.

## What you'll learn

- How to scope a capstone strategy that's genuinely completable with only what this course taught
- How to specify all five components from Lesson 1 for your chosen strategy, in writing, before coding anything
- How to set up a signal and a volatility-targeted position size using Lessons 6 and 10's tools
- What "stress-testing" means concretely, and the two stress tests you'll run in Lesson 32
- The rubric this capstone will actually be judged against

## Choosing a strategy you can actually finish

Pick **one** simple, well-understood strategy family from Chapter 1 — a time-series momentum rule or a mean-reversion rule are both good choices, because both reduce to a signal this course has already shown you how to build, on a single instrument, with daily bars. Resist the urge to combine several signals, trade a large universe, or reach for anything from outside this course (no options, no machine learning, no intraday data) — the point of this capstone is depth on the full pipeline, not breadth of ideas. The worked example in this lesson and the next uses a 20-day time-series momentum rule on one synthetic instrument; use it directly, substitute your own lookback or your own mean-reversion rule, or swap in real data you have access to — the pipeline is what's being graded, not the specific rule.

## Specifying the five components, in writing, first

Before any code: write down, in a sentence or two each, your strategy's **universe**, **signal**, **position sizing**, **risk rules**, and **execution** assumption — exactly Lesson 1's five components. For the worked example used in this capstone:

- **Universe**: one synthetic instrument (substitute a real, liquid, single instrument if you have data for one).
- **Signal**: 20-day price momentum — long if the trailing 20-day return is positive, short if negative.
- **Sizing**: volatility targeting (Lesson 10) — scale the position so realized portfolio volatility tracks a 10% annualized target, capped at 3x leverage as a hard risk rule.
- **Risk rules**: the leverage cap above, plus a max-drawdown kill-switch threshold you'll enforce in Lesson 32.
- **Execution**: next-bar-open fills (Lesson 20's realistic convention) with explicit transaction costs (Lesson 16).

## Building the signal and position size

Here is the signal and sizing logic for the worked example — this is the starting point Lesson 32 turns into a full backtest:

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(31)
n_days = 1000  # roughly 4 illustrative trading years
# Illustrative synthetic daily price series for ONE instrument. Replace with
# real data if you have it; the pipeline below is what matters.
daily_ret = rng.normal(0.0004, 0.011, n_days)
price = 100 * (1 + pd.Series(daily_ret)).cumprod()

LOOKBACK = 20          # signal: 20-day momentum (Lesson 1's example rule)
VOL_TARGET = 0.10      # sizing: target 10% annualized portfolio volatility
VOL_LOOKBACK = 20      # realized-vol window used to scale the position

def momentum_signal(price_series, lookback=LOOKBACK):
    """+1 / -1 signal: long if the trailing `lookback`-day return is positive."""
    mom = price_series.pct_change(lookback)
    return np.sign(mom).fillna(0.0)

def vol_target_size(returns, vol_target=VOL_TARGET, lookback=VOL_LOOKBACK):
    """Scale a +-1 signal so realized portfolio vol tracks vol_target --
    the vol-targeting idea from Lesson 10, capped as a hard risk rule."""
    realized_vol = returns.rolling(lookback).std(ddof=1) * np.sqrt(252)
    scale = (vol_target / realized_vol).clip(upper=3.0)
    return scale

raw_returns = price.pct_change()
signal = momentum_signal(price)
size_scale = vol_target_size(raw_returns)
# Decided using data up to t, usable starting t+1 -- Lesson 18/20's
# look-ahead-bias and fill-timing discipline, applied from day one
target_position = (signal * size_scale).shift(1)

preview = pd.DataFrame({
    "price": price, "signal": signal,
    "size_scale": size_scale.round(2), "target_position": target_position.round(2),
}).iloc[18:26]
print(preview.to_string())
```

```
         price  signal  size_scale  target_position
18  104.398596     0.0         NaN              NaN
19  103.748584     0.0         NaN              NaN
20  103.301539     1.0        0.65              NaN
21  103.424373     1.0        0.65             0.65
22  103.575777     1.0        0.66             0.65
23  101.840813     1.0        0.63             0.66
24  101.580532     1.0        0.64             0.63
25  100.118491    -1.0        0.60             0.64
```

Two details worth confirming you understand before Lesson 32, because they're the two most common sources of an accidentally-broken backtest: `target_position` is shifted by one day, so the position actually held on day t was decided using only information available through day t-1 — and `size_scale` is `NaN` until the volatility lookback window has enough data, which is expected and must be handled (not silently treated as zero) once trading costs enter the picture.

## Planning the stress tests

A backtest that only reports one clean set of numbers under one set of assumptions is exactly what Chapter 4 warned against. Lesson 32 will run two specific stress tests on top of the base backtest:

1. **A cost shock** — rerun the identical backtest with transaction costs doubled or tripled from the base assumption, to see how much of the strategy's edge is actually cost-sensitive (directly testing Lesson 16's lesson that costs can turn a paper profit into a real loss).
2. **An adverse regime** — rerun the backtest with a simulated high-volatility, trending-down period spliced into the data, to see how the strategy and its risk rules behave in conditions worse than its typical history (a cheap, honest proxy for the kind of regime change Lesson 30 warned decays a real edge).

## The rubric

Your finished capstone (across this lesson and the next) should show: a written five-component specification; a vectorized backtest with realistic costs and next-bar fills; the Chapter 5 performance suite (Sharpe, Sortino, max drawdown, Calmar) with an honest acknowledgment of sampling uncertainty (Lesson 25); and both stress tests, with their results actually affecting your conclusion about the strategy — not reported and then ignored.

## Key terms

| Term | Meaning |
|---|---|
| Five-component specification | Universe, signal, sizing, risk rules, execution — Lesson 1's definition of a complete strategy |
| Volatility targeting | Scaling a position so realized portfolio volatility tracks a chosen annualized target |
| Cost shock (stress test) | Re-running a backtest with transaction costs multiplied up, to test sensitivity to cost assumptions |
| Adverse regime (stress test) | Re-running a backtest against a simulated period worse than the typical historical sample |

## Recap

The capstone strategy is scoped deliberately small — one signal, one instrument, tools this course already taught — with its five components specified in writing before any backtest code runs, and its sizing already using the shift-by-one-day discipline that prevents look-ahead bias from day one. Next, Lesson 32 turns this signal and sizing logic into a complete, cost-aware vectorized backtest and runs both planned stress tests against it.
