# Script — Joint Distributions & Conditioning

## Segment 1 (title)

Real portfolios hold more than one asset, and their returns move together, not independently. To reason about that, you need the joint distribution of several random variables at once, plus a way to update on what you've observed. That's conditioning, and it's the subject of this lesson.

## Segment 2 (steps)

Three distributions sit on top of each other. The joint distribution describes two variables at once. The marginal distribution describes just one, with the other summed or integrated away. And the conditional distribution asks: once I know Y, how is X distributed now? It's just the joint divided by the marginal of Y.

## Segment 3 (code)

Covariance is the number that makes portfolio math work. It measures linear co-movement between two returns, and it shows up directly in the variance of a weighted combination: the variance of a two-asset portfolio is each asset's variance, weighted, plus twice the weighted covariance between them. That covariance term is the entire reason diversification can reduce risk.

## Segment 4 (code)

Conditioning on a market regime splits a variable's behavior apart. Group a return series by whether a second variable sits above or below its median, and you get a conditional mean and a conditional variance for each regime. Those pieces recombine exactly into the overall mean and variance through two laws.

## Segment 5 (steps)

The law of total expectation says the overall mean is just the average of the conditional means. The law of total variance says the overall variance splits into two parts: the average variance within each regime, plus the variance of the regime means themselves. Both pieces add to total risk, which is why regime-switching strategies can look calm within each regime and still carry real unconditional risk.

## Segment 6 (outro)

Covariance and conditioning are the tools that make multi-asset and multi-regime thinking precise. Up next, lesson fifteen: the law of large numbers and the central limit theorem, what happens to averages as sample size grows.
