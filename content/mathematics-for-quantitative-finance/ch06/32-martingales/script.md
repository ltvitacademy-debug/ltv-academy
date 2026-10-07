# Script — Martingales

## Segment 1 (title)

Brownian motion from the last lesson is fair in a specific sense: its expected future value, given everything known so far, is just its current value. That fairness is called the martingale property, and it's the mathematical heart of arbitrage free pricing.

## Segment 2 (steps)

A process is a martingale if, conditional on everything known up to some time, its expected value at any later time equals its current value. No predictable drift up or down, just the current value as the best possible forecast. Brownian motion satisfies this immediately, because its increments beyond any point you condition on are independent of the past and have mean zero.

## Segment 3 (code)

A real stock price under the real world measure is not a martingale. If it follows geometric Brownian motion with a positive expected return, its conditional expectation grows over time at that drift rate, not flat. And that's exactly how it should behave, since investors demand compensation for taking on risk.

## Segment 4 (steps)

The fundamental theorem of asset pricing resolves this: a market has no arbitrage opportunities exactly when there's an equivalent measure, the risk neutral measure, under which the discounted price process is a martingale. Under that measure, the stock's drift gets replaced by the risk free rate, and the discounted price's conditional expectation stops drifting entirely.

## Segment 5 (code)

You can check that directly by simulation. Generate geometric Brownian motion paths using the risk free rate as the drift instead of the real world expected return, discount each simulated price back to today, and average across many paths at each point in time. That average stays essentially flat at the starting price the whole way through, exactly the martingale property.

## Segment 6 (outro)

Discounted prices being martingales under the risk neutral measure is the entire foundation of pricing a derivative as a discounted expected payoff. Up next, lesson thirty three builds the calculus, Itô's lemma, needed to derive geometric Brownian motion rigorously instead of asserting its properties by analogy.
