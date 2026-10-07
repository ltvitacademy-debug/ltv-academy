# Script — Hypothesis Testing Revisited

## Segment 1 (title)

You've probably run a t-test before. This lesson revisits hypothesis testing with the care a quant role demands: precise definitions, what a p-value actually means, and the specific test for asking whether a strategy's return is really different from zero, or just noise.

## Segment 2 (steps)

Every test starts with a null hypothesis, the "nothing interesting is happening" claim, and an alternative, what you actually suspect. The p-value is the probability of seeing a result at least this extreme, assuming the null is true. That's it. It is not the probability the null hypothesis is true, no matter how often it gets read that way.

## Segment 3 (steps)

There are two ways to be wrong. A type one error rejects a null hypothesis that was actually true — a false positive, with probability alpha, the significance level you choose in advance. A type two error fails to reject a null that was actually false — a false positive you missed, with probability beta. Power is one minus beta: your ability to actually detect a real effect when one exists.

## Segment 4 (code)

The one-sample t-test checks whether a sample mean differs from a hypothesized value, using the sample standard deviation in place of an unknown population value. The test statistic is the difference between the sample mean and the hypothesized value, divided by the standard error, and under the null it follows a Student's t-distribution with n minus one degrees of freedom.

## Segment 5 (code)

Simulate a full year of daily returns with a genuinely positive but small true mean, and run the test. Often the p-value doesn't drop below the usual 0.05 threshold at all — not because the effect isn't real, but because one noisy year simply doesn't carry enough statistical power to detect a small daily edge. That's exactly why serious backtests lean on much longer samples before claiming significance.

## Segment 6 (outro)

P-values, type one and type two error, and power define exactly how a hypothesis test weighs evidence. Up next, lesson twenty-one: regression theory and the Gauss-Markov assumptions, where hypothesis testing meets the linear model.
