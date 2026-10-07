# Script — Risk Budgeting & Leverage

## Segment 1 (title)

The last lesson sized a single bet. This one zooms out to the whole portfolio: how much risk is each position actually contributing, is that intentional, and what does leverage do to all of it when something goes wrong. This closes out chapter two.

## Segment 2 (code)

Two positions can be the same dollar size and carry very different amounts of risk once you account for volatility and correlation. Risk budgeting means deliberately deciding how much of the portfolio's total risk each position should carry, then sizing dollars to match — computed from the covariance matrix as each position's weight times its marginal contribution to portfolio volatility.

## Segment 3 (steps)

Leverage means controlling more notional exposure than your actual equity — two times leverage on a million dollars of equity means two million of notional positions. It doesn't change the strategy's Sharpe ratio, since return and volatility scale together, but it directly changes the dollar size of a drawdown, and a margin call can force you out of a position at exactly the worst moment.

## Segment 4 (steps)

Gross exposure is the sum of every position's absolute size, long and short combined; net exposure is long minus short. A long-short book can run high gross exposure while staying close to net-neutral to the market — gross matters for margin and financing, net matters for market-direction risk.

## Segment 5 (outro)

Here's where it gets dangerous: leveraging up a Kelly-style estimate that was already uncertain compounds that uncertainty with real borrowed exposure, which is one of the most common ways a correct-looking strategy produces a real, account-ending loss. That closes out chapter two. Up next, lesson eleven opens chapter three: backtesting fundamentals, where you start building the engine that runs all of this against real history.
