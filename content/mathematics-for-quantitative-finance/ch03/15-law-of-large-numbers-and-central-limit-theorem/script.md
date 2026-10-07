# Script — Law of Large Numbers & Central Limit Theorem

## Segment 1 (title)

Every estimate you compute from market data is built from a finite sample standing in for an unknown true distribution. Two theorems justify that: the law of large numbers, which says the sample mean eventually gets the right answer, and the central limit theorem, which says how it gets there. Together they're the most-used results in quantitative finance.

## Segment 2 (steps)

The law of large numbers says the sample mean converges to the true mean as you collect more data — in probability for the weak version, with probability one for the strong version. The central limit theorem goes further: it describes the shape of the remaining error. Standardize the sample mean correctly, and that error converges to a standard normal distribution, no matter what the original data looked like.

## Segment 3 (code)

State it precisely: for independent, identically distributed draws with finite mean and finite variance, square root n times the sample mean minus the true mean, divided by the standard deviation, converges in distribution to a standard normal. The requirement is just finite variance — not normality, not symmetry, nothing about the shape of the individual draws.

## Segment 4 (code)

Try it on data that starts out nowhere near normal: an exponential distribution, heavily skewed. Average just one draw and you get the raw skewed distribution back. Average thirty, or two hundred, and the skewness of the sampling distribution collapses toward zero while its standard deviation tracks one over the square root of n almost exactly. That's the central limit theorem turning a skewed building block into an approximately normal average.

## Segment 5 (steps)

The standard error of the mean shrinks with the square root of sample size, not linearly — quadrupling your data only halves your uncertainty, which is why pinning down an expected return from historical daily data is so hard. And the classical theorem needs finite variance to begin with; distributions with genuinely infinite variance converge to a different, heavier-tailed family instead.

## Segment 6 (outro)

The law of large numbers gets you to the truth, and the central limit theorem tells you the shape of the error along the way. Up next, lesson sixteen: characteristic and moment-generating functions, the tools that make a result like the CLT provable in the first place.
