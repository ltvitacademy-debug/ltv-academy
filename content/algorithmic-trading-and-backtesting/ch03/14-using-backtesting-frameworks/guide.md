# Using Backtesting Frameworks

Hand-rolling a backtester, as you did in Lesson 13, is the right way to *learn* how the mechanics work. It is rarely the right way to run production research, because a hand-rolled engine has to reinvent commissions, slippage, position sizing, order types, and plotting every time — and every reinvention is another chance for a subtle bug. This lesson surveys the real open-source Python backtesting frameworks you'll actually encounter in the field, and shows illustrative code in each one's real API shape.

## What you'll learn

- Why mature teams use a framework rather than a bespoke engine for most research
- The real API shape of `backtesting.py`, a lightweight event-driven framework
- The real API shape of `vectorbt`, a vectorized, NumPy/Numba-accelerated framework
- What `zipline`-style frameworks add on top (calendars, pipelines, more institutional conventions)
- How to choose between them for a given job

## Why use a framework at all

A backtesting framework exists to handle the parts of a backtest that are easy to get subtly wrong and tedious to rebuild every time: applying commissions and slippage consistently, preventing accidental look-ahead bias in its core loop, handling order types (market, limit, stop), computing a standard set of performance statistics, and producing comparable plots. Using one doesn't remove the need to understand what's happening underneath — Lesson 13 was that understanding — but it removes an enormous amount of error-prone boilerplate from everyday research.

## backtesting.py — a lightweight event-driven framework

`backtesting.py` is a small, actively used open-source Python library built around a `Strategy` class with `init()` (setup) and `next()` (called once per bar) methods. Its real API shape:

```python
from backtesting import Backtest, Strategy
from backtesting.lib import crossover
from backtesting.test import GOOG  # sample OHLC dataset shipped with the library

class SmaCross(Strategy):
    fast_n = 10
    slow_n = 50

    def init(self):
        close = self.data.Close
        self.fast = self.I(lambda x: pd.Series(x).rolling(self.fast_n).mean(), close)
        self.slow = self.I(lambda x: pd.Series(x).rolling(self.slow_n).mean(), close)

    def next(self):
        if crossover(self.fast, self.slow):
            self.buy()
        elif crossover(self.slow, self.fast):
            self.sell()

bt = Backtest(GOOG, SmaCross, cash=100_000, commission=0.002)
stats = bt.run()
print(stats)          # Sharpe, max drawdown, win rate, etc. come built in
bt.plot()              # equity curve + trade markers
```

`next()` runs once per bar, in order, exactly like the event-driven loop from Lesson 13 — `backtesting.py` is an event-driven engine. The `commission=0.002` argument (0.2% per trade) is applied automatically and consistently to every fill, which is exactly the kind of detail that's easy to apply inconsistently in hand-rolled code. `bt.run()` can also be swept over parameter ranges with `bt.optimize(fast_n=range(5, 30), slow_n=range(20, 100))` — illustrative of the framework's real optimization API, though Lesson 19 will be very clear about the overfitting risk that kind of sweep introduces.

## vectorbt — a vectorized, accelerated framework

`vectorbt` takes the opposite architectural approach: it is vectorized, like Lesson 13's pandas version, but uses Numba (just-in-time compiled Python) under the hood so it can run thousands of parameter combinations in a vectorized fashion with near-C speed. Illustrative shape of its real API:

```python
import vectorbt as vbt

price = vbt.YFData.download("SPY").get("Close")

fast_ma = vbt.MA.run(price, 10)
slow_ma = vbt.MA.run(price, 50)

entries = fast_ma.ma_crossed_above(slow_ma)
exits = fast_ma.ma_crossed_below(slow_ma)

portfolio = vbt.Portfolio.from_signals(
    price, entries, exits,
    fees=0.001, slippage=0.001, init_cash=100_000,
)
print(portfolio.stats())
portfolio.plot().show()
```

Note `vbt.Portfolio.from_signals` takes boolean entry/exit signal arrays — the same vectorized shape as Lesson 13's `.shift(1)` signal — and `fees`/`slippage` are modeled as explicit parameters rather than something you'd hand-code into the return calculation. `vectorbt`'s real strength is parameter sweeps: it can simulate an entire grid of `(fast_n, slow_n)` combinations in one vectorized call and return a multi-dimensional result, which would take an event-driven framework far longer to compute one combination at a time.

## zipline-style frameworks — institutional conventions

`zipline` (and its successors/forks, since the original Quantopian-maintained version is no longer actively developed) represents a third category: event-driven like `backtesting.py`, but built around institutional-grade conventions that matter once you're simulating realistic multi-asset strategies — a proper trading calendar (skipping holidays, respecting exchange hours), a `Pipeline` API for cross-sectional factor computation across a whole universe at once, and a slippage/commission model system with pluggable, swappable implementations. Pseudocode illustrating the shape (not a runnable snippet, since zipline's install and data-bundle setup is itself nontrivial):

```python
# zipline-style pseudocode — illustrates the API shape, not a runnable example
def initialize(context):
    context.asset = symbol('AAPL')
    schedule_function(rebalance, date_rules.every_day(), time_rules.market_open())

def rebalance(context, data):
    hist = data.history(context.asset, 'close', 50, '1d')
    if hist[-10:].mean() > hist.mean():
        order_target_percent(context.asset, 1.0)
    else:
        order_target_percent(context.asset, 0.0)
```

The `initialize`/`schedule_function`/`order_target_percent` pattern is the real shape institutional zipline-style code takes — note that `data.history(...)` only ever returns data up to and including "now" in the simulation, enforcing the same no-look-ahead guarantee as Lesson 13's loop, but as a framework-level contract instead of something you have to remember.

## Choosing a framework

| Framework | Architecture | Best for |
|---|---|---|
| `backtesting.py` | Event-driven | Quick single-asset strategy prototyping with built-in stats/plots |
| `vectorbt` | Vectorized (Numba-accelerated) | Large parameter sweeps, many assets, speed-critical research |
| `zipline`-style | Event-driven, institutional | Multi-asset strategies needing calendars, pipelines, realistic order/slippage models |

None of these replace the judgment from Chapter 4 of this course — every one of them still requires you to configure realistic commission, slippage, and fill assumptions, and none of them can tell you whether your edge is real or overfit. They remove boilerplate, not responsibility.

## Key terms

| Term | Meaning |
|---|---|
| `backtesting.py` | Lightweight, event-driven Python backtesting library with a `Strategy`/`next()` pattern |
| `vectorbt` | Vectorized, Numba-accelerated Python backtesting library optimized for large parameter sweeps |
| `zipline` | Institutional-style event-driven framework with trading calendars and a cross-sectional `Pipeline` API |
| Parameter sweep | Running a backtest across many combinations of a strategy's parameters to see how sensitive results are |

## Recap

Frameworks exist to remove error-prone boilerplate — commissions, slippage, order handling, statistics — not to remove the responsibility of configuring realistic assumptions or validating that a result isn't overfit. Next, Lesson 15 turns to the data itself: the formats, adjustments, and gotchas that feed any of these engines, hand-rolled or framework-based.
