# Script — Vectorized vs. Event-Driven Backtests

## Segment 1 (title)

There are two fundamentally different ways to build a backtest engine. One treats the whole price history as arrays and crunches the result in a handful of operations. The other replays history bar by bar, like a real trading system would. Neither is strictly better — let's see how each one works.

## Segment 2 (code)

A vectorized backtest uses pandas and NumPy to operate on entire columns at once — no loop anywhere. Rolling averages, comparisons, shifting the signal forward a bar, multiplying by returns, it's all whole-array math. That's why it's so fast: it runs in optimized compiled code instead of a Python loop. The catch is that you have to manage look-ahead bias yourself, with that shift, every single time.

## Segment 3 (steps)

An event-driven backtest instead loops through bars one at a time, in strict chronological order. At each step the strategy only sees data up to that point — it physically cannot peek ahead, because future bars haven't been handed to it yet. That structurally rules out look-ahead bias, and it makes things like stop-losses or order queues, which depend on what already happened, trivial to express as ordinary object state.

## Segment 4 (steps)

So which do you use? Vectorized is fast — great for sweeping hundreds of parameter combinations or signal ideas quickly. Event-driven is much slower, because a Python loop over every bar beats array math badly on speed. In practice, quant researchers use both: vectorize first to explore ideas fast, then validate the survivors with an event-driven engine where realistic order handling actually matters.

## Segment 5 (outro)

Keep both mental models in mind — fast-but-manual, versus slow-but-structurally-safe. Next, lesson 13: building a simple backtester of your own, putting this into actual working code.
