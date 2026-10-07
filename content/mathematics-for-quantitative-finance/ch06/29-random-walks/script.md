# Script — Random Walks

## Segment 1 (title)

Chapter five was about finding the best fixed point given a function. Chapter six asks something different: how do you describe a quantity that evolves randomly, step after step, through time? The simplest model of that is the random walk, and almost everything else in this chapter is a refinement of it.

## Segment 2 (steps)

A simple random walk is just a running sum of independent, identically distributed steps. Two facts define its behavior. The mean grows linearly with the number of steps, scaled by the drift of each step. But the standard deviation only grows with the square root of the number of steps, not the number of steps itself. That square root scaling is the single most important fact in this chapter.

## Segment 3 (code)

Simulating twenty thousand independent paths, each a cumulative sum of small random log returns, confirms that scaling directly. The empirical variance across all those final values tracks the number of steps times the per step variance almost exactly, and the empirical standard deviation tracks the square root of that.

## Segment 4 (steps)

This is exactly why log prices, not raw prices, are the natural random walk. If log price is a running sum of steps, then the raw price is that sum exponentiated, so log returns add up while raw prices compound multiplicatively. Sums of independent variables are far easier to analyze than products, and that additive structure is the discrete seed that grows into Brownian motion.

## Segment 5 (code)

That square root of time scaling isn't just theoretical. It's exactly why annualizing a daily volatility multiplies by the square root of two hundred fifty two trading days, never by two hundred fifty two directly. Get that exponent wrong and every risk number downstream is wrong too.

## Segment 6 (outro)

A random walk has no memory of how it arrived somewhere, only of the step ahead. Up next, lesson thirty formalizes exactly that property into Markov chains.
