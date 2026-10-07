# Implied Volatility & the Volatility Surface

Every input to Black-Scholes is directly observable except one. Spot price, strike, time to expiration, and the risk-free rate are all numbers you can just read off a screen. Volatility isn't — it's a forecast of how much the stock will move, and nobody knows it in advance. So the market does something clever: it runs the formula backward.

## What you'll learn

- What implied volatility (IV) is and why it has no closed-form solution
- How IV is actually solved for (root-finding / inversion)
- The volatility smile and skew, and what they tell you
- The term structure of volatility, and why both together form a "surface"

## Running Black-Scholes backward

Black-Scholes takes five inputs (S, K, r, T, σ) and produces one output (the price). **Implied volatility** flips that: take the actual market price of an option, along with the four observable inputs, and solve for whichever σ makes the formula reproduce that price.

```
Market price = BS(S, K, r, T, sigma_implied)   -->  solve for sigma_implied
```

There's no algebraic way to isolate σ on one side of the equation — it sits inside the N(d1) and N(d2) terms in a way that can't be rearranged. So implied volatility is found numerically, by **root-finding** (an iterative method like Newton-Raphson or bisection): guess a σ, compute the resulting BS price, compare it to the market price, adjust the guess, and repeat until the two prices match closely enough.

```python
from scipy.stats import norm
from scipy.optimize import brentq
import math

def bs_call(S, K, r, T, sigma):
    d1 = (math.log(S/K) + (r + sigma**2/2)*T) / (sigma*math.sqrt(T))
    d2 = d1 - sigma*math.sqrt(T)
    return S*norm.cdf(d1) - K*math.exp(-r*T)*norm.cdf(d2)

def implied_vol(market_price, S, K, r, T):
    f = lambda sigma: bs_call(S, K, r, T, sigma) - market_price
    return brentq(f, 1e-6, 5.0)   # search sigma between ~0% and 500%
```

## The volatility smile and skew

If Black-Scholes's constant-volatility assumption actually held, every option on the same underlying and expiration would produce the same implied volatility, no matter the strike. Plot implied volatility against strike for real options, and that's not what you see.

For **equity index options**, the typical shape is a **skew**: implied volatility is higher for low strikes (out-of-the-money puts, in-the-money calls) and lower for high strikes. The usual explanation is demand for downside protection — investors buy puts to hedge against crashes, bidding up the price (and therefore the implied volatility) of low-strike options relative to what constant-volatility Black-Scholes would predict. Some markets instead show a more symmetric **smile**, with implied volatility rising at both low and high strikes relative to at-the-money — common historically in currency options, where large moves in either direction are plausible.

## The term structure of volatility

Implied volatility also varies across **expirations** for a fixed strike (typically at-the-money) — this is the **term structure** of volatility. Short-dated IV often reacts sharply to near-term events (an earnings announcement, a central bank meeting), while longer-dated IV tends to be smoother, reflecting a longer-run average view.

Put the strike dimension and the expiration dimension together — implied volatility as a function of both strike and time to expiration — and you get the **volatility surface**: a full three-dimensional map of market-implied volatility. Trading desks watch this surface the way other markets watch a yield curve; its shape itself is information, not just an input to a single option's price.

## Why the smile/skew matters

The volatility smile isn't a market inefficiency to be arbitraged away — it's standing evidence that real stock returns don't follow the lognormal, constant-volatility process Black-Scholes assumes. Returns exhibit fatter tails than a lognormal distribution (extreme moves happen more often than the model predicts) and volatility itself clusters and changes over time, rather than sitting at one constant level. Because of this, practitioners use the smile/surface as a market-implied correction: rather than pricing every option off one flat volatility number, they price each option using the implied volatility the market itself assigns to that specific strike and expiration, and more advanced models (stochastic volatility, local volatility) try to explicitly capture the dynamics that produce the smile in the first place.

## Worked example

Suppose a one-month at-the-money call on an index implies volatility of 16%, while a one-month 10%-out-of-the-money put implies volatility of 22%. That six-point gap is the skew in action: the market is pricing more expected movement into downside strikes than Black-Scholes's single-σ assumption would predict, consistent with demand for crash protection.

## Key terms

| Term | Meaning |
|---|---|
| Implied volatility (IV) | The σ that makes the Black-Scholes price equal the observed market price |
| Root-finding / inversion | The numerical method used to solve for IV, since no closed-form solution exists |
| Volatility smile/skew | IV varying by strike at a fixed expiration |
| Term structure of volatility | IV varying by expiration at a fixed strike |
| Volatility surface | IV as a function of both strike and expiration together |

## Recap

Implied volatility is Black-Scholes run in reverse, solved numerically because σ can't be isolated algebraically. Real markets show IV varying by strike (the smile/skew) and by expiration (the term structure), together forming the volatility surface — and that shape is direct, observable evidence that the constant-volatility assumption behind Black-Scholes doesn't hold in practice. Next up, Lesson 17: exotic options, where path-dependent and barrier features push pricing beyond anything a closed-form formula can handle.
