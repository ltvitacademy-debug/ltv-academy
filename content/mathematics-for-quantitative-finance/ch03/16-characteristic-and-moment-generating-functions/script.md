# Script — Characteristic & Moment-Generating Functions

## Segment 1 (title)

So far you've described a distribution one moment at a time — mean, variance, skew, kurtosis. The moment-generating function and the characteristic function package all of those moments into a single function, and turn two hard problems into simple algebra. They're also the engine behind Fourier-based option pricing.

## Segment 2 (steps)

Both are transforms of a random variable. The moment-generating function is the expectation of e to the t X, and it only exists near t equals zero, and only for some distributions. The characteristic function swaps in an imaginary exponent, e to the i t X, and because that always has magnitude one, the characteristic function always exists, for every distribution, no exceptions.

## Segment 3 (code)

The name is literal: differentiate the moment-generating function and evaluate at zero, and you get moments for free. The first derivative at zero is the mean. The second derivative at zero is the second raw moment, which combines with the mean to give you the variance. Every higher moment follows the same pattern, straight from calculus.

## Segment 4 (code)

Here's the payoff. If two random variables are independent, the moment-generating function of their sum is just the product of their individual moment-generating functions — no convolution of densities required. The same multiplication trick works for characteristic functions, and it's the core move behind the proof of the central limit theorem itself.

## Segment 5 (steps)

This isn't just theoretical. Some of the most important pricing models, like Heston's stochastic volatility model, have a characteristic function in closed form even though their probability density doesn't. The Carr-Madan method pokes a hole straight through that: it prices options directly from the characteristic function using a fast Fourier transform.

## Segment 6 (outro)

Package every moment into one function, multiply instead of convolve, and you've got the machinery behind both the central limit theorem and modern option pricing. Up next, lesson seventeen: common distributions in finance, putting names to the shapes these tools describe.
