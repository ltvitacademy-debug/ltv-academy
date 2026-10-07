# The Black-Scholes Model

The binomial tree prices options by taking the number of steps to infinity in your head. The Black-Scholes model does the same no-arbitrage work, but in one closed-form equation — no tree, no iteration, just plug in five numbers and get a price. Published by Fischer Black, Myron Scholes, and Robert Merton in the early 1970s, it's the single most famous formula in finance, and it's the reference point every other options-pricing method in this course gets compared against.

## What you'll learn

- The Black-Scholes formulas for a European call and put
- What d1 and d2 represent and how to compute them
- The model's assumptions, stated precisely
- Why those assumptions matter — and where they break down in real markets

## The formulas

For a European call on a non-dividend-paying stock:

```
C = S * N(d1) - K * e^(-rT) * N(d2)
```

For the corresponding European put:

```
P = K * e^(-rT) * N(-d2) - S * N(-d1)
```

where:

```
d1 = [ln(S/K) + (r + sigma^2 / 2) * T] / (sigma * sqrt(T))
d2 = d1 - sigma * sqrt(T)
```

S is the spot price, K the strike, r the continuously compounded risk-free rate, σ (sigma) the volatility of the stock's returns, T the time to expiration in years, and N(·) is the cumulative standard normal distribution function. N(d1) and N(d2) can be read loosely as risk-adjusted probabilities that the option finishes in the money, though d1 specifically also carries the hedge ratio interpretation you'll formalize as **delta** in Lesson 15.

## The assumptions, precisely

Black-Scholes isn't magic — it's an exact answer to a very specific, idealized problem. The core assumptions are:

- The stock price follows **geometric Brownian motion** — returns are lognormally distributed, meaning ln(S_T/S_0) is normally distributed.
- **Volatility (σ) and the risk-free rate (r) are constant** over the life of the option.
- The stock pays **no dividends** (the base-case formula above; a known extension handles continuous dividend yields).
- Markets are **frictionless**: no transaction costs, no taxes, and short-selling is unrestricted.
- The option is **European-style** — exercise is only possible at expiration, never early.
- **Trading is continuous**, and it's possible to continuously rebalance a hedging portfolio with no cost.

Each of those assumptions is also a derivation tool: the model constructs a perfectly hedged, riskless portfolio (long the option, short delta shares of stock) that must earn exactly the risk-free rate — the same no-arbitrage logic as Lessons 12 and 13, just carried out with calculus instead of a discrete tree.

## Where the assumptions break down

The constant-volatility assumption is the one that fails most visibly in real markets. If Black-Scholes were literally true, every option on the same underlying and expiration — regardless of strike — would imply the exact same volatility when you solved the formula backward for σ. In practice it doesn't: implied volatility varies by strike, producing the **volatility smile or skew** you'll study in Lesson 16. That mismatch is direct empirical evidence that real stock returns aren't perfectly lognormal with constant volatility — they have fatter tails and show volatility that itself moves around (volatility clustering). Dividends, discrete trading, and transaction costs are real-world frictions the base formula also ignores, which is why practitioners use dividend-adjusted variants and, for anything path-dependent or early-exercisable, the tree and simulation methods from Lessons 13 and 17 instead.

## Worked example

Let S = $100, K = $100, r = 5%, σ = 20%, T = 1 year.

```python
import math
from scipy.stats import norm

S, K, r, sigma, T = 100, 100, 0.05, 0.20, 1

d1 = (math.log(S/K) + (r + sigma**2/2)*T) / (sigma*math.sqrt(T))
d2 = d1 - sigma*math.sqrt(T)
# d1 = 0.35, d2 = 0.15

C = S*norm.cdf(d1) - K*math.exp(-r*T)*norm.cdf(d2)
# C ≈ 100*0.6368 - 95.12*0.5596 ≈ 10.45
```

d1 ≈ 0.35 and d2 ≈ 0.15. N(0.35) ≈ 0.6368 and N(0.15) ≈ 0.5596. Plugging in: C ≈ 100(0.6368) − 100·e^(−0.05)(0.5596) ≈ 63.68 − 53.23 ≈ **$10.45**. That's the Black-Scholes fair value for this at-the-money, one-year call — and it should land close to whatever a fine-stepped binomial tree with the same inputs produces, since the two methods converge.

## Key terms

| Term | Meaning |
|---|---|
| Black-Scholes model | Closed-form formula pricing European options under lognormal, constant-volatility assumptions |
| d1, d2 | Intermediate terms combining moneyness, rate, volatility, and time, fed into the normal CDF |
| N(·) | The cumulative standard normal distribution function |
| Geometric Brownian motion | The assumed stock-price process: lognormal returns, constant drift and volatility |

## Recap

Black-Scholes prices a European call as S·N(d1) − K·e^(−rT)·N(d2), and the matching put as K·e^(−rT)·N(−d2) − S·N(−d1), under assumptions of lognormal prices, constant volatility and rates, no dividends, and frictionless continuous trading. The constant-volatility assumption is the one that visibly fails in real markets, which is exactly what produces the volatility smile. Next up, Lesson 15: the Greeks, which measure exactly how an option's value responds when each of these inputs moves.
