# Script — Monte Carlo Simulation

## Segment 1 (title)

Every lesson in this chapter was building toward one destination: pricing a derivative as a discounted expected payoff under the risk neutral measure. This lesson puts the whole chapter to work, pricing a European call option by Monte Carlo simulation and checking it against the closed form answer.

## Segment 2 (steps)

The Monte Carlo principle is simple. Draw many independent samples, average some function of them, and that average approximates the expectation you actually wanted. The law of large numbers says that average converges to the true expectation, and the central limit theorem tells you exactly how uncertain that average still is: the standard error shrinks with the square root of the number of samples.

## Segment 3 (code)

Apply that directly to option pricing. Simulate the risk neutral geometric Brownian motion solution from the stochastic calculus lesson, take the discounted payoff of a call option on each simulated path, and average across half a million paths. That Monte Carlo price lands within a few cents of the closed form Black Scholes formula, exactly as the fundamental theorem of asset pricing guarantees it should.

## Segment 4 (steps)

The catch is that standard error only shrinks with the square root of the sample size, so quadrupling your simulated paths only cuts your error in half. Antithetic variates is a free way to fight that: for every random draw, also use its exact mirror image, and average the two resulting payoffs together before folding them into your estimate.

## Segment 5 (code)

In practice, that means drawing half as many raw random numbers, building the mirrored set by simply negating them, and pairing up each original and mirrored payoff. Comparing the resulting confidence interval to the plain Monte Carlo version usually shows a meaningfully tighter range, for no additional random sampling cost.

## Segment 6 (outro)

That's the complete pipeline: simulate under the risk neutral measure, discount, average, and quantify your uncertainty, with antithetic variates sharpening it for free. That closes chapter six. Up next, chapter seven opens with lesson thirty five, probability brainteasers, sharpening the intuition this whole course has been building.
