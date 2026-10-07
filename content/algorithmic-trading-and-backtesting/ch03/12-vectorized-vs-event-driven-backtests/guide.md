# Vectorized vs. Event-Driven Backtests

There are two fundamentally different ways to build the engine that runs a backtest. One treats the whole price history as arrays and computes the result in a handful of operations. The other replays history bar by bar (or tick by tick), simulating a strategy that reacts to each piece of data as it arrives. Both are legitimate, widely used in real quant research, and neither is strictly "better" — they trade off speed against realism, and different lesson 13-14 of this chapter will build one of each. This lesson explains the difference so you know which one to reach for.

## What you'll learn

- How vectorized backtesting works, and why it's fast
- How event-driven backtesting works, and why it's slower but more realistic
- The specific situations where vectorization breaks down or becomes dangerous
- Why professional research desks typically use both, at different stages

## Vectorized backtesting

A vectorized backtest expresses the entire strategy as operations over whole arrays (or `pandas` Series/DataFrames) at once, using NumPy's/pandas's vectorized math instead of a Python `for` loop over each day. A simple moving-average crossover strategy, fully vectorized, looks like this:

```python
import pandas as pd

price = pd.read_csv("prices.csv", index_col=0, parse_dates=True)["close"]

fast = price.rolling(10).mean()
slow = price.rolling(50).mean()

# Signal: 1 = long, 0 = flat. Computed over the whole series at once.
signal = (fast > slow).astype(int)

# Shift by 1 bar so the signal can only be acted on the NEXT bar —
# this is the look-ahead-bias guard from Lesson 11, non-negotiable.
position = signal.shift(1)

daily_return = price.pct_change()
strategy_return = position * daily_return

equity_curve = (1 + strategy_return.fillna(0)).cumprod()
```

No loop appears anywhere. `rolling`, comparison operators, `.shift()`, and `.pct_change()` all operate on the entire column simultaneously. On a laptop, this backtests years of daily data for one instrument in well under a second, and scales to hundreds of instruments almost as cheaply by operating on a DataFrame instead of a Series.

**Why it's fast:** vectorized operations run in optimized, compiled C code under the hood (NumPy), rather than interpreting a Python loop body millions of times. This is the single biggest reason vectorized backtests dominate early-stage research, where you want to test hundreds of parameter combinations or signal ideas quickly.

**Where it breaks down:** vectorization assumes every bar's decision is independent and can be computed with simple array math. That assumption fails as soon as the strategy has *path-dependent* logic — rules that depend on the sequence of what already happened, not just the current bar's data. Examples: a stop-loss that exits if the position has drawn down more than 5% since entry; a strategy that can only hold one position at a time and must skip new signals while already in a trade; order queueing, partial fills, or margin calls that depend on account state built up over many prior bars. You *can* sometimes force these into vectorized form with clever tricks, but past a certain complexity it becomes harder to trust the vectorized code than to just simulate the path directly — which is exactly what event-driven backtesting does.

## Event-driven backtesting

An event-driven backtest processes the simulation like a real trading system would: it iterates through time (bar by bar, or event by event for tick data), and at each step feeds the current market data to the strategy, lets the strategy decide whether to act, and simulates what happens to open orders and the portfolio as a result. A skeleton looks like this:

```python
class Portfolio:
    def __init__(self, cash):
        self.cash = cash
        self.position = 0
        self.entry_price = None

    def mark_to_market(self, price):
        equity = self.cash + self.position * price
        return equity

def run_event_driven_backtest(bars, strategy, portfolio):
    equity_curve = []
    for bar in bars:                      # one bar at a time, in order
        signal = strategy.on_bar(bar, portfolio)   # strategy sees history up to now
        if signal == "BUY" and portfolio.position == 0:
            fill_price = bar.open           # trade on the NEXT bar's open, not this close
            portfolio.position = portfolio.cash // fill_price
            portfolio.cash -= portfolio.position * fill_price
            portfolio.entry_price = fill_price
        elif signal == "SELL" and portfolio.position > 0:
            portfolio.cash += portfolio.position * bar.open
            portfolio.position = 0
        equity_curve.append(portfolio.mark_to_market(bar.close))
    return equity_curve
```

Each bar is processed in strict chronological order, and the strategy object only ever sees data up to and including the current bar — it has no way to peek ahead, because the future bars simply haven't been handed to it yet. This structurally rules out look-ahead bias (the loop itself enforces it, rather than relying on you remembering to `.shift()`), and it makes path-dependent logic — stop-losses, position limits, order queues, state machines — trivial to express, because you're just updating ordinary Python objects bar by bar.

**Why it's slower:** a Python `for` loop over tens of thousands of bars, each doing object method calls, is orders of magnitude slower than the same computation expressed as array operations. For a single instrument over a few years of daily data this barely matters; for tick data, large universes, or heavy parameter sweeps, it can turn a one-second vectorized test into a backtest that runs for minutes or hours.

## Choosing between them

| | Vectorized | Event-driven |
|---|---|---|
| Speed | Very fast | Much slower |
| Look-ahead bias risk | Must be managed manually (`.shift()`) | Structurally prevented by the loop |
| Path-dependent logic (stops, order state) | Awkward or impossible | Natural |
| Best for | Fast iteration on signal ideas, parameter sweeps | Final validation, realistic execution modeling |

In practice, quant researchers often use both at different stages of the same project: vectorized for the first pass of idea generation and parameter exploration, because you can test a thousand variants in the time an event-driven loop tests one — then event-driven for the final, higher-fidelity validation of the handful of ideas that survived the first pass, where realistic order handling and path-dependent risk rules actually matter.

## Key terms

| Term | Meaning |
|---|---|
| Vectorized backtest | A backtest expressed as whole-array operations (NumPy/pandas), with no explicit loop over time |
| Event-driven backtest | A backtest that iterates through time step by step, simulating a strategy reacting to each bar/event |
| Path-dependent logic | Strategy rules whose outcome depends on the sequence of prior events, not just the current bar's data |

## Recap

Vectorized backtests are fast and great for early-stage idea exploration, but they require discipline (that `.shift(1)`) to avoid look-ahead bias and struggle with path-dependent rules. Event-driven backtests are slower but structurally safer and handle realistic order logic naturally. Next, Lesson 13 builds a simple backtester of your own from scratch, putting both mental models into actual code.
