# Paper Trading & Forward Testing

Chapter 5 gave you the vocabulary to describe a backtest's results, with appropriate statistical humility. This lesson opens Chapter 6 with the next step in a strategy's actual life cycle: before a single dollar goes live, you run it forward, in real time, against data it has never seen — because no amount of backtest realism (Chapter 4) fully substitutes for watching a strategy operate on the future instead of the past.

## What you'll learn

- The difference between a backtest, paper trading, and forward testing — and where each one's blind spots are
- What paper trading can catch that even a realistic backtest can't
- How to quantify the gap between what a backtest predicted and what paper trading actually produced
- How long a paper-trading period needs to be to mean anything
- Why paper trading is necessary but still not sufficient evidence a strategy is ready for real capital

## Backtest, forward test, and paper trade — not the same thing

A **backtest** runs a strategy against historical data the researcher already has in full. A **forward test** (sometimes called out-of-sample testing) runs the same strategy against data collected *after* the strategy was finalized, whether that's newly arrived historical data or data generated in real time — the key property is that the strategy's designer could not have seen it while building the strategy. **Paper trading** is a forward test run operationally, through (a simulation of) the actual live pipeline: real-time data feed, the actual order-generation code, and simulated order placement against the real market, without committing real capital.

Paper trading catches an entirely different category of problem than a backtest ever can, because it exercises code and infrastructure a backtest never touches: Does the live data feed actually arrive in the format your signal code expects? Does your order-generation logic run fast enough, and reliably enough, bar after bar, day after day, without a human babysitting it? Does the strategy behave sanely around real-world data glitches — a stale quote, a halted symbol, a corporate action — that synthetic or cleaned historical data never has?

## Quantifying the gap between backtest and paper results

Paper trading is only useful if you actually compare its output to what the backtest predicted, not just watch the P&L number and feel good or bad about it.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(29)
n_days = 60  # ~3 months — a realistic minimum paper-trading window
# Illustrative synthetic "backtested" daily returns the strategy predicted
backtest_expected = pd.Series(rng.normal(0.0008, 0.009, n_days))

# Illustrative "paper trading" daily returns: same underlying signal, run
# through the real pipeline, with a small realistic friction drag plus
# independent noise from timing, data, and fill differences the backtest
# couldn't fully anticipate
friction_drag = 0.00015
paper_returns = backtest_expected - friction_drag + rng.normal(0, 0.003, n_days)

corr = np.corrcoef(backtest_expected, paper_returns)[0, 1]
tracking_error = (paper_returns - backtest_expected).std(ddof=1)
cum_backtest = (1 + backtest_expected).prod() - 1
cum_paper = (1 + paper_returns).prod() - 1

print(f"correlation(backtest, paper)    : {corr:.3f}")
print(f"daily tracking error             : {tracking_error:.5f}")
print(f"cumulative return, backtest      : {cum_backtest:.4f}")
print(f"cumulative return, paper         : {cum_paper:.4f}")
print(f"cumulative gap (paper - backtest): {cum_paper - cum_backtest:.4f}")
```

```
correlation(backtest, paper)    : 0.957
daily tracking error             : 0.00311
cumulative return, backtest      : 0.0876
cumulative return, paper         : 0.0778
cumulative gap (paper - backtest): -0.0099
```

A correlation of 0.957 is reassuring — the paper-traded strategy is clearly tracking what the backtest expected it to do, day by day, not behaving like an unrelated process. The negative cumulative gap (paper underperformed the backtest by about one percentage point over three months) is exactly the signal you're looking for: it quantifies the real-world friction (execution delay, slightly worse fills, data quirks) that even a careful Chapter 4 backtest couldn't fully anticipate because some of it only shows up once the pipeline is actually running live. This is the same comparison, mechanically, as the Information ratio from Lesson 23 — just run against your own backtest as the "benchmark" instead of a market index.

## How long does paper trading need to run?

Long enough that the comparison in the previous section isn't dominated by noise — and Lesson 25's lesson applies here directly: a correlation and a cumulative gap computed from only a handful of days carry enormous sampling uncertainty. Common practical guidance is a minimum of one to three months for a daily-frequency strategy, and meaningfully longer for strategies with few trades per month (a strategy that trades twice a month needs a much longer paper-trading window to accumulate enough observations to say anything statistically meaningful at all). There's a real tension here: paper trading too briefly gives you false confidence; paper trading for a year before ever risking capital can mean missing the opportunity a strategy was built to capture. There's no universal right answer, only the discipline of being honest about how much statistical weight a given paper-trading window can actually bear.

## What paper trading still can't tell you

Paper trading removes execution-pipeline risk and some data risk, but it does not remove market-impact risk (Lesson 17) — a paper order never actually moves the market, so a strategy that looks fine on paper at small size can still behave very differently once real orders of real size start interacting with real liquidity. It also doesn't remove the psychological and operational pressure of watching real capital move, which is a separate, genuinely real risk factor for discretionary overrides of a systematic strategy. Treat a clean paper-trading result as a necessary green light, not a guarantee — the next lessons in this chapter (execution algorithms, broker connectivity, live monitoring) are about managing exactly the risks paper trading can't fully rehearse.

## Key terms

| Term | Meaning |
|---|---|
| Forward test | Testing a finalized strategy against data its designer could not have seen while building it |
| Paper trading | Running a strategy through the real live pipeline with simulated (not real) order execution |
| Tracking error (vs. backtest) | The standard deviation of the gap between paper-traded and backtest-predicted returns |
| Market-impact risk | The risk that real order size moves the market in ways a paper or backtested order never does |

## Recap

Paper trading exercises the real live pipeline — data feed, signal code, order generation — in a way no backtest can, and comparing its results to the backtest's predictions (via correlation and cumulative gap, not just a gut feeling) quantifies exactly how much real-world friction was missed. It still can't rehearse market impact at real size or the psychological weight of real capital. Next, Lesson 27 looks at the execution layer itself in more depth: TWAP, VWAP, and the other algorithms real trading desks use to get in and out of positions.
