# Script — The Black-Scholes Model

## Segment 1 (title)

The binomial tree prices options by taking the number of steps toward infinity. Black-Scholes does the same no-arbitrage work in one closed-form equation — plug in five numbers, get a price. It's the most famous formula in finance, and the reference point every other pricing method in this course gets compared against.

## Segment 2 (code)

The European call price is spot times N of d1, minus the present value of the strike times N of d2. The put is the mirror image. d1 and d2 bundle together moneyness, the risk-free rate, volatility, and time to expiration, and N is the cumulative standard normal distribution function — it converts those bundled terms into something you can read loosely as risk-adjusted probabilities of finishing in the money.

## Segment 3 (steps)

The formula rests on six assumptions. Stock prices follow geometric Brownian motion, meaning returns are lognormal. Volatility and the risk-free rate are constant over the option's life. The base formula assumes no dividends. Markets are frictionless — no transaction costs, no restrictions on short-selling. The option is European, so no early exercise. And trading is continuous, so a hedging portfolio can be rebalanced constantly at no cost. Every one of those is also a derivation tool — the model builds a perfectly hedged, riskless portfolio that has to earn exactly the risk-free rate.

## Segment 4 (code)

Here's a worked example. Stock at 100, strike 100, five percent rate, twenty percent volatility, one year to expiration. That gives d1 of 0.35 and d2 of 0.15, with N of d1 at about 0.637 and N of d2 at about 0.560. Plugging those in, the call's fair value comes out to about ten dollars and forty-five cents.

## Segment 5 (outro)

The constant-volatility assumption is the one that visibly fails in real markets — which is exactly what produces the volatility smile you'll study two lessons from now. Up next, lesson fifteen: the Greeks, which measure exactly how option value responds when every one of these inputs moves.
