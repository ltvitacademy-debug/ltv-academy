# Script — Expectation, Variance & Moments

## Segment 1 (title)

Lesson twelve gave you random variables and their CDFs. Now we compress an entire distribution into a handful of numbers: expectation, variance, and the higher moments that describe its shape. These numbers are the vocabulary quants use to talk about risk and return.

## Segment 2 (code)

Expectation is the probability-weighted average of every possible outcome — sum x times its probability for a discrete variable, or the same integral against a density for a continuous one. Expectation is linear: the expected return of a portfolio is just the weighted sum of expected asset returns, no matter how those assets are related to each other.

## Segment 3 (code)

Variance measures spread: the expected squared distance from the mean. It's always computable as E of X squared, minus E of X, squared — expand the square and the cross term collapses to exactly that. Its square root, standard deviation, is what finance calls volatility, and it shares units with the original variable.

## Segment 4 (steps)

Mean and variance only capture the first two moments. Skewness measures asymmetry — equity returns are usually negatively skewed, with a longer left tail reflecting crash risk. Kurtosis measures how heavy the tails are; a normal distribution has kurtosis exactly three, and anything above that has fatter tails than a normal predicts.

## Segment 5 (code)

Simulate returns from a normal distribution and from a Student's t with four degrees of freedom, matched to the same mean and variance. The t-distributed returns come back with near-zero skew but noticeably positive excess kurtosis — same center, same spread, but far more extreme moves than the normal ever predicts. That gap is exactly why models assuming normality underprice tail risk.

## Segment 6 (outro)

Mean, variance, skew, and kurtosis are your first language for describing any distribution. Up next, lesson fourteen: joint distributions and conditioning, where we see how two random variables move together.
