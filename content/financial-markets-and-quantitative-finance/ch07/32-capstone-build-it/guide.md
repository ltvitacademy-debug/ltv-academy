# Capstone: Build It

Lesson 31 set up the project: ZQX Inc. at $100, three options, a 3% risk-free rate, and a goal of flattening portfolio delta. This lesson does the actual work — real Python and NumPy code that prices each option with Black-Scholes, computes its Greeks, aggregates them to the portfolio level, and sizes the hedge trade.

## What you'll learn

- A working Black-Scholes pricing and Greeks function in Python, using `scipy.stats.norm`
- How to apply it to the three options from Lesson 31 and read the resulting numbers
- How to aggregate per-option Greeks into portfolio-level delta, gamma, and vega
- How to turn portfolio delta into an actual hedge trade in shares

## The pricing and Greeks function

```python
import numpy as np
from scipy.stats import norm

def bs_price_greeks(S, K, r, sigma, T, option_type="call"):
    d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    if option_type == "call":
        price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
        delta = norm.cdf(d1)
    else:  # put
        price = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
        delta = norm.cdf(d1) - 1

    gamma = norm.pdf(d1) / (S * sigma * np.sqrt(T))
    vega = S * norm.pdf(d1) * np.sqrt(T) / 100  # per 1% change in vol

    return {"price": price, "delta": delta, "gamma": gamma, "vega": vega}
```

This is the standard Black-Scholes-Merton formula: `d1` and `d2` come from the spot, strike, rate, volatility, and time to expiry; `norm.cdf` is the standard normal cumulative distribution function. Gamma uses the same formula for calls and puts — it's always positive. Vega is scaled by `/100` here so it reads as the dollar change in price per 1 **percentage point** move in volatility, which is the more commonly quoted convention.

## Running it on the three options

```python
options = [
    {"name": "A", "S": 100, "K": 100, "r": 0.03, "sigma": 0.25,
     "T": 0.5, "type": "call", "qty": 10},
    {"name": "B", "S": 100, "K": 110, "r": 0.03, "sigma": 0.30,
     "T": 0.25, "type": "call", "qty": 5},
    {"name": "C", "S": 100, "K": 95, "r": 0.03, "sigma": 0.25,
     "T": 0.5, "type": "put", "qty": -8},  # short 8 contracts
]
```

Feeding each option's S, K, r, σ, and T into `bs_price_greeks` produces:

| Option | Price | Delta | Gamma | Vega (per 1% vol) |
|---|---|---|---|---|
| A — Call, K=100, T=0.5y | ≈ $7.77 | ≈ 0.569 | ≈ 0.0222 | ≈ $0.278 |
| B — Call, K=110, T=0.25y | ≈ $2.70 | ≈ 0.305 | ≈ 0.0234 | ≈ $0.175 |
| C — Put, K=95, T=0.5y | ≈ $4.07 | ≈ −0.322 | ≈ 0.0203 | ≈ $0.253 |

A few sanity checks worth noticing: Option A is at-the-money, so its delta sits close to 0.5 (slightly above, because of the positive risk-free rate). Option B is further out-of-the-money, so its delta is meaningfully lower. Option C is a put, so its delta is negative — and because it's out-of-the-money (spot is above the strike), its magnitude is also below 0.5. All three gammas are positive, because the gamma formula is identical for calls and puts.

## Aggregating to the portfolio level

```python
MULTIPLIER = 100  # shares per contract
port_delta = port_gamma = port_vega = 0.0

for opt in options:
    g = bs_price_greeks(opt["S"], opt["K"], opt["r"], opt["sigma"],
                         opt["T"], opt["type"])
    port_delta += opt["qty"] * MULTIPLIER * g["delta"]
    port_gamma += opt["qty"] * MULTIPLIER * g["gamma"]
    port_vega  += opt["qty"] * MULTIPLIER * g["vega"]

hedge_shares = -port_delta
```

Each option's per-share Greek gets multiplied by its position size (`qty`, positive for long, negative for short) and by the 100-share contract multiplier, then summed. Option C's short position flips its contribution's sign — since its own delta is already negative, being short it *adds* positive delta to the portfolio. Running the loop over all three options gives:

- **Portfolio delta ≈ +979** (shares-equivalent)
- **Portfolio gamma ≈ +17.7**
- **Portfolio vega ≈ +$163** per 1 percentage point move in implied volatility

## Sizing the hedge trade

`hedge_shares = -port_delta` gives the number of shares of ZQX to trade to bring the portfolio's net delta to zero. With a portfolio delta of about +979, the hedge is to **sell short approximately 979 shares of ZQX**. After that trade, the combined position (options plus the new short-stock hedge) has a net delta close to zero — a small move in ZQX's price should produce close to no change in the combined position's value, at least for a small move.

## Key terms

| Term | Meaning |
|---|---|
| `norm.cdf` | The standard normal cumulative distribution function, used for N(d1) and N(d2) |
| Contract multiplier | The 100-shares-per-contract convention used when scaling per-share Greeks |
| Portfolio delta | The sum of each position's delta, scaled by position size and multiplier |
| Hedge shares | The share quantity (`-portfolio delta`) that flattens net delta |

## Recap

The code prices all three options, computes their Greeks, aggregates them into a portfolio delta near +979, a gamma near +17.7, and a vega near +$163 per vol point — and converts that delta directly into a hedge trade: sell roughly 979 shares of ZQX. Next up, Lesson 33: reviewing whether that hedge actually worked, what's still exposed, and how to present this project well.
