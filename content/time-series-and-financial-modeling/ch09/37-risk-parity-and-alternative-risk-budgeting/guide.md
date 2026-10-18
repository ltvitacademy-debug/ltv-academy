# Risk Parity and Alternative Risk Budgeting

Lesson 36's mean-variance optimization has a real, practical weakness: it's highly sensitive to the expected-return estimates it depends on, and expected returns are notoriously hard to estimate well. Risk parity sidesteps that specific problem by never using expected returns at all — it allocates based purely on risk, which is a genuinely different design philosophy, not just a different formula.

## What you'll learn

- The core risk-parity idea: equal risk contribution, not equal dollar allocation
- A real, computable approximation: inverse-volatility weighting
- Why this is only an approximation, and what the full version would need to add
- When risk parity is the more defensible choice than mean-variance, and when it isn't

## Equal dollar weight isn't equal risk

An equal-weight portfolio (33% in each of 3 assets) sounds balanced, but it isn't balanced in the dimension that actually matters for risk: if one asset is twice as volatile as another, it contributes far more than its dollar share to the portfolio's overall risk. **Risk parity** targets something different: allocating so each asset contributes an *equal share of total portfolio risk*, not an equal share of total dollars.

## A computable approximation: inverse-volatility weighting

The exact, fully general risk-parity solution (accounting for every pairwise correlation) requires iterative numerical optimization. A simpler, very commonly used approximation — **inverse-volatility weighting** — gets close by ignoring correlations and weighting each asset inversely to its own volatility:

```python
import numpy as np

vols = np.array([0.15, 0.20, 0.25])

inv_vols = 1 / vols
w_risk_parity = inv_vols / inv_vols.sum()
print("Inverse-vol weights:", np.round(w_risk_parity, 4))

# Check: under this scheme, w_i * vol_i should come out equal across
# assets (this is the "equal standalone risk contribution" property
# inverse-vol weighting is specifically designed to produce)
risk_contribution = w_risk_parity * vols
print("w_i * vol_i (should be equal):", np.round(risk_contribution, 4))
```

```
Inverse-vol weights: [0.4255 0.3191 0.2553]
w_i * vol_i (should be equal): [0.0638 0.0638 0.0638]
```

Each asset's `weight × volatility` product comes out identical (0.0638) — confirming the weighting scheme does what it's designed to do: give the less volatile asset (15% vol) a larger allocation (42.55%) and the more volatile asset (25% vol) a smaller one (25.53%), specifically to equalize each asset's *standalone* contribution to risk.

## Why this is only an approximation

Inverse-volatility weighting ignores correlation entirely — it treats each asset's risk contribution as if it existed in isolation. In reality, if two assets are highly correlated, they're not really diversifying each other even if both get sensible inverse-vol weights; the *true* risk-parity solution (equal contribution to actual portfolio variance, accounting for every covariance term, not just each asset's own variance) requires solving a nonlinear system — no closed form, solved numerically by minimizing the dispersion of risk contributions across assets. Inverse-volatility weighting is the right starting intuition and a genuinely useful approximation when correlations are modest, but it's worth being precise in an interview about which version you're describing: the simple closed-form approximation, or the full correlation-aware optimization.

## When risk parity beats mean-variance, and when it doesn't

Risk parity's real advantage is that it **never needs an expected-return forecast** — and expected returns are the single hardest, least stable input in Lesson 36's framework, often swamping the covariance estimate's own uncertainty. A mean-variance optimizer fed slightly wrong expected returns can produce wildly different, often extreme weights (the instability problem from Lesson 36); risk parity, depending only on volatilities (and, in the full version, correlations), tends to be far more stable period to period.

The real cost: risk parity has no mechanism for expressing a genuine view that one asset should outperform another — if you have real, validated reason to believe one asset's expected return is meaningfully higher, risk parity has no way to act on that information at all, by design. The right choice depends on how much you actually trust your return forecasts: strong, validated forecasts favor mean-variance; weak or unreliable ones favor risk parity's refusal to depend on them.

## Key terms

| Term | Meaning |
|---|---|
| Risk parity | Allocating so each asset contributes an equal share of total portfolio risk, not equal dollars |
| Inverse-volatility weighting | A simplified risk-parity approximation that ignores correlation, weighting each asset inversely to its own volatility |
| Risk contribution | How much of a portfolio's total risk a specific asset is responsible for |

## Check yourself

Why does risk parity's complete independence from expected-return forecasts count as both its biggest strength and a real limitation, depending on the situation?
