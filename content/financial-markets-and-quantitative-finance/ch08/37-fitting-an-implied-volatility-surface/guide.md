# Fitting an Implied Volatility Surface

Lesson 16 introduced implied volatility and the volatility surface conceptually: Black-Scholes assumes one constant volatility, but real market prices imply a different volatility at every strike and expiry, and plotting all of them together produces a surface, not a flat value. This lesson builds the actual machinery: a real Newton-Raphson solver that recovers implied volatility from a market price, and uses it to construct a real volatility smile from a set of quotes.

## What you'll learn

- How to invert the Black-Scholes formula numerically, since there's no closed-form solution for volatility given a price
- Newton-Raphson using vega, and why it converges fast for this specific problem
- How to construct a volatility smile from a set of strike/price quotes
- Why the smile has the shape it does, and what that shape tells you the market believes

## Why implied volatility needs a numerical solver

Black-Scholes gives you a price when you know volatility: `price = BS(S, K, r, sigma, T)`. Implied volatility asks the reverse question — given a real market price, what `sigma` would Black-Scholes need to reproduce it? There's no algebraic way to rearrange the Black-Scholes formula to solve for `sigma` directly (it appears inside a cumulative normal distribution, which isn't invertible in closed form) — this is exactly why Lesson 16 names root-finding as the only real option.

## Newton-Raphson using vega

**Newton-Raphson** finds the root of `BS(sigma) - market_price = 0` by repeatedly updating a guess using the function's own slope at that guess — and the slope of the Black-Scholes price with respect to volatility is exactly **vega**, a Greek you already have a formula for from Lesson 15:

```python
import numpy as np
from scipy.stats import norm

def bs_call_price(S, K, r, sigma, T):
    d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    return S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)

def bs_vega(S, K, r, sigma, T):
    d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    return S * norm.pdf(d1) * np.sqrt(T)

def implied_vol(market_price, S, K, r, T, guess=0.30, tol=1e-8, max_iter=50):
    sigma = guess
    for _ in range(max_iter):
        price = bs_call_price(S, K, r, sigma, T)
        diff = price - market_price
        if abs(diff) < tol:
            return sigma
        sigma = sigma - diff / bs_vega(S, K, r, sigma, T)   # Newton-Raphson update
    return sigma   # best estimate if max_iter reached without full convergence
```

Each step moves the volatility guess by `(price error) / vega` — if vega is large (the price is very sensitive to volatility here), a small sigma adjustment closes the price gap; if vega is small, a bigger adjustment is needed. This converges fast — typically under 10 iterations to high precision — specifically because vega is a smooth, well-behaved, almost-always-positive function for realistic option parameters, which is exactly the condition Newton-Raphson needs to converge reliably rather than oscillate or diverge.

## Recovering volatility from a real quote

```python
S, r, T = 100, 0.03, 0.5

# A real market call price at strike 100
market_price = 5.8158
iv = implied_vol(market_price, S, 100, r, T)
print(f"Implied volatility: {iv:.4f}")
```

```
Implied volatility: 0.1800
```

## Building a smile from a set of quotes

A single implied volatility is one point. A **volatility smile** plots implied volatility against strike, for a fixed expiry, across every quoted strike at once:

```python
strikes = [80, 90, 95, 100, 105, 110, 120]
market_prices = [21.4941, 12.7079, 8.9484, 5.8158, 3.6651, 2.1943, 0.6895]

smile = [implied_vol(p, S, K, r, T) for K, p in zip(strikes, market_prices)]

for K, iv in zip(strikes, smile):
    print(f"Strike {K}: implied vol {iv:.4f}")
```

```
Strike 80: implied vol 0.2100
Strike 90: implied vol 0.1950
Strike 95: implied vol 0.1875
Strike 100: implied vol 0.1800
Strike 105: implied vol 0.1815
Strike 110: implied vol 0.1830
Strike 120: implied vol 0.1860
```

## Reading the shape: why this isn't flat

If Black-Scholes's constant-volatility assumption actually held, every strike would recover the *same* implied volatility, and the "smile" would be a flat line. It isn't. Here, volatility is highest at the lowest strike (0.21 at strike 80) and lowest near-the-money (0.18 at strike 100), then rises again at higher strikes — this specific shape, skewed higher on the downside, is called a **volatility skew** (common in equity index options), and it reflects something real: the market is pricing in a meaningfully higher probability of a sharp downside move than a symmetric, constant-volatility model would predict — consistent with Lesson 14's own point that Black-Scholes's constant-volatility assumption is the model's weakest link, and consistent with real crash-protection demand (investors paying up for downside insurance) genuinely bidding up the price — and therefore the implied volatility — of low-strike puts and their equivalent calls.

## From smile to surface

A full **volatility surface** adds the second dimension: repeat this exact same fitting process across every available expiry, not just one, and the result is implied volatility as a function of both strike *and* time to expiry. The strike dimension (what you just built) captures the skew; the expiry dimension typically captures **term structure** — short-dated volatility often moves around more (reacting to near-term news and events) than long-dated volatility, which tends to be more stable. A trading desk maintaining a live volatility surface is doing exactly this fitting process continuously, strike by strike and expiry by expiry, as new quotes arrive throughout the day.

## Key terms

| Term | Meaning |
|---|---|
| Newton-Raphson | A root-finding method that uses a function's slope (here, vega) to iteratively converge on a solution |
| Volatility smile | Implied volatility plotted against strike for one fixed expiry |
| Volatility skew | A smile shape where implied volatility is higher for lower strikes — common in equity index options |
| Volatility surface | Implied volatility as a function of both strike and time to expiry |

## Check yourself

Why does the Newton-Raphson update use vega specifically, and why does the method converge quickly precisely because vega is smooth and almost always positive for realistic option parameters?
