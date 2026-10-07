# Script — Implied Volatility & the Volatility Surface

## Segment 1 (title)

Every Black-Scholes input is directly observable except one. Spot, strike, time, and the risk-free rate are all numbers you can read off a screen. Volatility is a forecast nobody actually knows in advance. So the market runs the formula backward.

## Segment 2 (code)

Implied volatility takes the real market price of an option, plugs in the four observable inputs, and solves for whichever volatility makes Black-Scholes reproduce that price. There's no algebraic way to isolate sigma — it sits inside the normal distribution terms in a way that can't be rearranged. So it's solved numerically, by root-finding: guess a volatility, compute the price, compare it to the market, adjust, and repeat until they match.

## Segment 3 (steps)

If constant volatility actually held, every strike would imply the same number. It doesn't. Equity index options typically show a skew — lower strikes imply higher volatility, which reflects demand for downside crash protection. Currency options have historically shown a more symmetric smile, with volatility rising at both ends. Implied volatility also varies by expiration at a fixed strike — that's the term structure. Put the strike dimension and the time dimension together and you get the volatility surface, a full map that trading desks watch the way other markets watch a yield curve.

## Segment 4 (code)

Here's a concrete example. A one-month at-the-money call implies sixteen percent volatility, while a one-month put ten percent out of the money implies twenty-two percent. That six-point gap is the skew in action — the market is pricing in more expected downside movement than a single flat volatility number would ever predict.

## Segment 5 (outro)

The smile and skew aren't a market mistake — they're direct, observable evidence that real returns don't follow Black-Scholes's lognormal, constant-volatility assumption. Up next, lesson seventeen: exotic options, where path-dependent and barrier features push pricing past anything a closed-form formula can handle.
