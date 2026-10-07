# Backtesting Fundamentals

You now have a signal, a way to size it, and a portfolio to put it in. Before any of that touches real money, it has to survive a backtest — a simulation of how the strategy would have performed on historical data. This lesson defines what a backtest actually is, what it can and can't tell you, and the core discipline that makes a backtest trustworthy instead of a work of fiction.

## What you'll learn

- What a backtest is, and the narrow question it actually answers
- The anatomy of a backtest: data, signal, position, execution, P&L
- Why "backtest accuracy" is really "backtest honesty" — the limits of simulation
- The single most important rule in backtesting: never let the strategy see the future
- Why a backtest is the start of the evaluation process, not the end

## What a backtest actually is

A backtest replays historical market data through a strategy's rules and records what would have happened: what positions it would have held, what trades it would have made, and what P&L would have resulted. That's it. A backtest is not a prediction of future performance — it's an answer to a narrower, mechanical question: *if this exact rule set had been run over this exact historical window, with these assumptions about costs and fills, what number would have come out?*

Every word in that sentence is a qualifier that limits what the result means. Change the window, the assumptions, or the rules even slightly, and the number changes — sometimes a little, sometimes completely. A backtest is a measurement instrument, and like any instrument it has an error bar. Chapter 4 of this course is entirely about making that error bar smaller by making the simulation's assumptions realistic. This lesson sets up the vocabulary and the one rule that overrides everything else.

## The anatomy of a backtest

Every backtest, no matter how simple or elaborate, has the same five moving parts:

1. **Data** — historical prices (and sometimes volumes, fundamentals, or alternative data) for the universe of instruments being traded.
2. **Signal** — the rule that turns data into a view, e.g. "go long when the 10-day moving average crosses above the 50-day."
3. **Position** — the signal translated into a target holding, sized according to the portfolio construction rules from Chapter 2.
4. **Execution** — the simulated act of getting from the current position to the target position: at what price, with what cost, with what delay.
5. **P&L** — the resulting profit or loss, computed bar by bar or trade by trade and accumulated into an equity curve.

A naive backtest gets the first three right and badly oversimplifies the last two — often assuming trades fill instantly, at the exact signal price, for free. That naive version is where most beginners start, and it's also where most of a backtest's apparent edge quietly comes from. Chapter 4 will show exactly how much of that edge disappears once execution is modeled honestly.

## The one rule that matters more than any other

A backtest is only honest if, at every point in simulated time, the strategy only uses information that would actually have been available at that moment. This is called avoiding **look-ahead bias**, and it is the single most common way a backtest lies to its author.

The clearest example: suppose your signal is "buy if today's closing price is above today's 20-day moving average." You can only know today's closing price *after* the market closes. You cannot also buy at today's closing price — that trade can't physically happen. The earliest you can act on a signal computed from today's close is tomorrow's open (or some other defined point in the future). A backtest that lets the signal and the trade happen on the same bar has silently given the strategy perfect foresight of the rest of that bar, which is impossible in live trading.

This sounds obvious written out, but it is extraordinarily easy to introduce by accident — in a single `pandas` line, in fact:

```python
# WRONG: uses today's close to size a position that
# also earns today's close-to-close return — look-ahead bias.
signal = (price > price.rolling(20).mean()).astype(int)
strategy_returns = signal * price.pct_change()

# RIGHT: the signal computed on today's bar can only be
# acted on starting next bar. Shift it forward by one period.
signal = (price > price.rolling(20).mean()).astype(int)
strategy_returns = signal.shift(1) * price.pct_change()
```

That `.shift(1)` is one of the most important single characters you will type in this entire course. Lesson 18 goes much deeper on look-ahead bias and its close cousin, survivorship bias — but the habit starts here: whenever you multiply a signal by a return, ask yourself "could I have known this signal's value before this return started accruing?"

## What a backtest can and can't tell you

A backtest **can** tell you:

- Whether a rule, mechanically applied with stated assumptions, would have made or lost money over a specific historical period
- How that P&L was distributed over time — smooth or lumpy, trending or choppy
- How sensitive the result is to reasonable changes in parameters, costs, or universe

A backtest **cannot** tell you:

- Whether the strategy will make money in the future — markets change regimes, and a historical fit is not a guarantee
- Whether the edge is real or a statistical artifact of fitting rules to the same data you're testing on (Lesson 19)
- How the strategy will behave at a trade size large enough to move the market against you (Lesson 17)

Treat every backtest result as a hypothesis test, not a verdict. A good result is evidence worth investigating further — with out-of-sample data, realistic costs, and stress scenarios — not a green light to trade real capital.

## Key terms

| Term | Meaning |
|---|---|
| Backtest | A simulation of a strategy's historical performance under stated data and execution assumptions |
| Look-ahead bias | Using information in a simulated decision that would not actually have been available at that point in time |
| Equity curve | The cumulative P&L of a strategy plotted over the backtest period |
| Execution assumption | A stated rule for how simulated trades fill — at what price, with what delay and cost |

## Recap

A backtest answers one narrow, mechanical question about a historical window — it is not a forecast. Every backtest has the same five parts (data, signal, position, execution, P&L), and the single rule that makes all of it trustworthy is that a decision can never use information from its own future. Next, Lesson 12 draws out the two fundamentally different ways to build the simulation engine itself: vectorized and event-driven.
