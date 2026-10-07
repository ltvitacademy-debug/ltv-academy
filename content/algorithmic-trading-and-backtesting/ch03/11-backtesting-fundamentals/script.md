# Script — Backtesting Fundamentals

## Segment 1 (title)

You've got a signal, a sizing rule, and a portfolio. Before any of that touches real money, it has to survive a backtest — a simulation of how the strategy would have performed on historical data. Let's define exactly what that means, and what it doesn't.

## Segment 2 (steps)

Every backtest has the same five moving parts. Data: historical prices and maybe volume or fundamentals. A signal that turns that data into a view. A position, which is the signal sized into an actual target holding. Execution, the simulated act of getting into that position — at what price, with what delay, at what cost. And finally P&L, accumulated bar by bar into an equity curve. Most beginner backtests get the first three right and badly oversimplify the last two.

## Segment 3 (code)

Here's the single most important habit in this entire course. If your signal is "buy when price is above its 20-day average," you only know today's close after the market closes — you can't also trade at that same close. The fix is one line: shift the signal forward by one bar before multiplying it by returns. Skip that shift, and you've quietly given your strategy perfect foresight, which is impossible in live trading. This is look-ahead bias, and lesson 18 goes much deeper on it.

## Segment 4 (steps)

So what does a backtest actually tell you? It can show you what a mechanical rule would have earned under stated assumptions. It cannot tell you whether that edge will survive in live markets, and it cannot tell you, by itself, whether the edge is real or just an artifact of fitting rules to the same data you tested them on. Treat a good backtest result as a hypothesis worth investigating further, never as a verdict.

## Segment 5 (outro)

A backtest is a measurement with an error bar, not a forecast — and chapter four is entirely about shrinking that error bar. Next, lesson 12: the two fundamentally different ways to actually build the simulation engine, vectorized and event-driven.
