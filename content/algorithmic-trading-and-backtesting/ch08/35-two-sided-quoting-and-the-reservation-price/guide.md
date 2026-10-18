# Two-Sided Quoting and the Reservation Price

Lesson 34 built a fair-value estimate. If a market maker had zero inventory and infinite risk tolerance, it would just quote symmetrically around that fair value forever. Real market makers can't — every filled order changes their inventory, and every unit of inventory carries real risk if the market moves against it before it can be unwound. This lesson covers the **reservation price**: the actual center a market maker quotes around once inventory risk is accounted for, and the standard framework for deriving it.

## What you'll learn

- Why fair value alone isn't the right quoting center once you hold inventory
- The reservation price formula from the Avellaneda-Stoikov market-making framework, and what each term means
- How to place a bid and ask symmetrically around the reservation price
- A full worked numeric example showing how inventory shifts the quotes

## Why fair value alone isn't enough

Imagine a market maker with a fair value estimate of $100.00 that currently holds **+500 shares** of inventory (it's net long, having been filled on more buy orders than sell orders recently). If it keeps quoting symmetrically around $100.00, it has no particular reason to attract more sellers than buyers — it's equally likely to get even longer as it is to get flatter. That's a problem: every additional share of long inventory is additional exposure to the price falling before the position can be unwound. A market maker holding unwanted inventory needs its quotes to actively encourage getting back to flat, not just reflect fair value.

## The reservation price

The **Avellaneda-Stoikov** framework (the standard academic and practitioner starting point for this problem) answers this by shifting the quoting center away from fair value, in the direction that encourages shedding inventory:

```
r = s - gamma * q * sigma^2 * (T - t)

where:
  r      = reservation price (the actual quoting center)
  s      = fair value (from Lesson 34 -- midpoint or microprice)
  gamma  = risk aversion (how strongly inventory risk is penalized; a tunable parameter)
  q      = current inventory (positive = long, negative = short)
  sigma  = volatility of the instrument
  T - t  = time remaining in the trading horizon being managed
```

Read it directionally, since that's what actually matters for building intuition: when `q` is **positive** (long), the whole `gamma * q * sigma^2 * (T-t)` term is positive, so `r` sits **below** fair value `s`. A reservation price below fair value means both the bid and ask (placed symmetrically around `r`) shift down — making the ask more competitive (easier to get hit on a sale) and the bid less competitive (harder to get hit on another buy). The market maker is quietly steering itself back toward flat.

When `q` is **negative** (short), the term flips sign, `r` sits **above** fair value, and both quotes shift up — making the bid more competitive, encouraging a buy back to flat.

## Placing the actual bid and ask

Once you have the reservation price, the bid and ask are placed symmetrically around it, using half of some total spread width (the next lesson covers how to size that spread properly — for now, treat it as a given parameter):

```python
fair_value = 100.00
inventory = 500          # positive = long
gamma = 0.01              # risk aversion, a tunable parameter
sigma = 0.30               # annualized volatility, simplified for this example
time_remaining = 0.5        # fraction of the trading horizon left

reservation_price = fair_value - gamma * inventory * sigma**2 * time_remaining
print(f"fair value:        {fair_value:.4f}")
print(f"reservation price: {reservation_price:.4f}")

half_spread = 0.04   # from the next lesson's spread-sizing logic; held fixed here for illustration
bid = reservation_price - half_spread
ask = reservation_price + half_spread
print(f"bid: {bid:.4f}   ask: {ask:.4f}")
```

```
fair value:        100.0000
reservation price: 99.7750
bid: 99.7350   ask: 99.8150
```

Notice both the bid *and* the ask sit below fair value, not just one of them — holding 500 shares long shifted the market maker's entire quoting center down, making it more willing to sell (closer ask) and less eager to buy (bid shifted down too, further from fair value than it would otherwise be). This is the mechanism, concretely, not just conceptually.

## Why the exact spread-width formula is left to the next lesson

The Avellaneda-Stoikov paper also derives a closed-form optimal spread width from the same parameters plus order-arrival-rate assumptions about the order book — but the precise constants in that formula are genuinely debated in practitioner writeups, and different real implementations tune it differently against live market conditions rather than trusting the closed form exactly. This lesson keeps the spread width as a given parameter specifically to isolate the reservation-price mechanism, which is the part of the framework with unambiguous, well-agreed-upon behavior; the next lesson covers spread sizing as its own topic, including why production systems treat it as something to calibrate empirically, not just compute from a formula.

## Key terms

| Term | Meaning |
|---|---|
| Reservation price | The actual quoting center once inventory risk is accounted for, shifted away from fair value |
| Risk aversion (gamma) | A tunable parameter controlling how strongly inventory risk shifts the reservation price |
| Inventory skew | The shift in quoting center caused by non-zero inventory, pushing quotes to encourage returning to flat |

## Check yourself

A market maker is short 300 shares (q = -300). Does its reservation price sit above or below fair value, and does that make its bid more or less competitive than its ask?
