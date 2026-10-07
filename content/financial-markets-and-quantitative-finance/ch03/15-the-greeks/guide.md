# The Greeks

Black-Scholes hands you a single number — the price. But a trader holding an option needs to know how that price will move as the market moves. The Greeks are the sensitivities of an option's value to each of its inputs: the partial derivatives of the Black-Scholes formula, each one isolating the effect of changing exactly one variable while holding the others fixed. They're the language every options desk actually trades in.

## What you'll learn

- Delta, Gamma, Vega, Theta, and Rho — what each one measures
- The formulas for call and put delta and gamma under Black-Scholes
- Delta-hedging: how a dealer neutralizes directional risk
- Why Gamma means a delta hedge has to be rebalanced, not set once

## The five Greeks

**Delta (Δ)** = ∂V/∂S — how much the option's value changes per $1 move in the underlying.

```
Call delta = N(d1)        range: 0 to 1
Put delta  = N(d1) - 1    range: -1 to 0
```

A call's delta rises toward 1 as it moves deep in-the-money (it starts behaving like owning the stock outright) and falls toward 0 deep out-of-the-money (it stops reacting to the stock at all). A put's delta is always negative, since puts gain value as the stock falls.

**Gamma (Γ)** = ∂²V/∂S² = ∂Delta/∂S — how fast delta itself changes as the underlying moves. Gamma is identical for a call and put at the same strike and expiration, and it's always positive for a long option position (long calls and long puts both have positive gamma). Gamma peaks for at-the-money options near expiration and is close to zero for deep in- or out-of-the-money options.

**Vega (ν)** = ∂V/∂σ — sensitivity to volatility. Vega is positive for both long calls and long puts: more volatility means a wider range of possible outcomes, which raises the value of the right to choose only the favorable ones.

**Theta (Θ)** = ∂V/∂t — sensitivity to the passage of time. Theta is typically negative for a long option position: every day that passes without the stock moving in your favor, the option loses a sliver of time value. This is the "time decay" you first met conceptually in Lesson 11.

**Rho (ρ)** = ∂V/∂r — sensitivity to the risk-free interest rate. Generally positive for calls and negative for puts, though it's usually the smallest-magnitude Greek for short-dated options.

## Delta-hedging

A market maker who sells a call is now short delta exposure — if the stock rises, the position loses money. To neutralize that directional risk, the dealer buys **delta shares of stock** for every option sold (a short call plus Delta shares of stock has a combined position delta of approximately zero). This is called **delta-hedging**, and it's the practical reason the Greeks matter: they tell a trading desk exactly how much of the underlying to hold to stay neutral to small price moves.

The catch is right there in the name "small." Delta is only a snapshot — it's accurate for an instantaneous, small move in the stock. As the stock actually moves, delta itself changes (that's what Gamma measures), so a hedge that was neutral a moment ago drifts out of balance. A dealer with high gamma exposure has to rebalance the hedge frequently — buying or selling more stock as delta shifts — which is exactly why gamma is sometimes described as measuring "how often you'll need to retrade" a delta hedge.

## Worked example

Using the same inputs as Lesson 14 — S = 100, K = 100, r = 5%, σ = 20%, T = 1, giving d1 ≈ 0.35:

```python
from scipy.stats import norm

d1 = 0.35
call_delta = norm.cdf(d1)        # N(0.35) ≈ 0.6368
put_delta  = norm.cdf(d1) - 1    # ≈ -0.3632
```

The call's delta is about **0.64** — a $1 rise in the stock moves the call's value up by roughly $0.64. A dealer short one such call would hedge by buying about 0.64 shares of stock. The put's delta is about **−0.36**: it loses roughly $0.36 in value for every $1 the stock rises.

## Key terms

| Term | Meaning |
|---|---|
| Delta | ∂V/∂S; call delta = N(d1) ∈ [0,1], put delta = N(d1)−1 ∈ [−1,0] |
| Gamma | ∂Delta/∂S; always positive for long options, identical for calls and puts |
| Vega | ∂V/∂σ; positive for long options |
| Theta | ∂V/∂t; typically negative for long options (time decay) |
| Rho | ∂V/∂r; sensitivity to the risk-free rate |
| Delta-hedging | Holding −Delta shares per option sold to be instantaneously neutral to small price moves |

## Recap

The Greeks are the partial derivatives of option value with respect to each pricing input: Delta to the stock price, Gamma to delta itself, Vega to volatility, Theta to time, Rho to the interest rate. Delta-hedging uses Delta to neutralize directional risk, but Gamma is the reason that hedge needs constant rebalancing rather than being set once and forgotten. Next up, Lesson 16: implied volatility and the volatility surface — what happens when you run the Black-Scholes formula backward.
