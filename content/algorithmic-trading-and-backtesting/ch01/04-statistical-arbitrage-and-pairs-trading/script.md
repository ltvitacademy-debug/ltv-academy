# Script — Statistical Arbitrage & Pairs Trading

## Segment 1 (title)

Pairs trading is the classic entry point into statistical arbitrage: instead of betting on one price reverting to its own history, you bet on the relationship between two instruments reverting to its history. Done carefully, it's elegant. Done carelessly, it's a textbook mix-up of correlation with something actually tradable.

## Segment 2 (steps)

Two prices can look highly correlated over a sample and still wander apart forever. What you actually need is cointegration — a stable, mean-reverting long-run relationship, even if each series on its own is a random walk. The standard check is the Engle-Granger procedure: regress one series on the other, then test whether the residual, the spread, is itself stationary.

## Segment 3 (code)

The hedge ratio tells you how many units of one asset offset the other, and you estimate it the same way as beta in lesson two — an OLS regression, here between two log prices. Subtract beta times one log price from the other and you get the spread, which is the thing a pairs trade actually trades.

## Segment 4 (code)

From there it's the same z-score machinery from the last lesson: roll a mean and standard deviation of the spread, shift it forward one bar, and trade the deviation — long the spread when it's unusually low, short when it's unusually high, flat again once it's back near its mean.

## Segment 5 (outro)

Market-neutral doesn't mean risk-free — the relationship can break for good, your hedge ratio has its own estimation error, and crowded stat-arb desks unwinding similar pairs at once has caused real, sudden losses industry-wide. Up next, lesson five: turning a raw idea into a hypothesis you can actually test without fooling yourself.
