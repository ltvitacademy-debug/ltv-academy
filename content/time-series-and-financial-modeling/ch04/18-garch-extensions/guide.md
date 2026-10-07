# GARCH Extensions

Standard GARCH(1,1) has one notable blind spot: it reacts to the *size* of a shock, `eps_(t-1)^2`, but not its *sign*. In equity markets, that's a real limitation — a large negative return tends to raise future volatility by more than a positive return of the same size. This lesson covers the two most widely used fixes: GJR-GARCH and EGARCH, both capturing what's known as the leverage effect.

## What you'll learn

- The leverage effect: why negative shocks raise volatility more than positive ones
- GJR-GARCH: adding an indicator term for negative shocks
- EGARCH: modeling log-variance, with separate sign and magnitude effects
- How to fit both with the `arch` package

## The leverage effect

Named for an (imperfect but intuitive) explanation involving financial leverage — a falling stock price raises a firm's debt-to-equity ratio, making the firm riskier and its stock more volatile — the **leverage effect** describes an empirical pattern observed broadly in equity markets: negative returns are followed by larger increases in volatility than positive returns of the same magnitude. Plain GARCH(1,1) cannot represent this at all, because `eps_(t-1)^2` is identical whether the shock was positive or negative.

## GJR-GARCH: an indicator for bad news

GJR-GARCH (Glosten-Jagannathan-Runkle) adds a single extra term that only activates when the shock was negative:

sigma_t^2 = omega + alpha*eps_(t-1)^2 + gamma*I_(t-1)*eps_(t-1)^2 + beta*sigma_(t-1)^2

where `I_(t-1) = 1` if `eps_(t-1) < 0` and `0` otherwise. A positive `gamma` means negative shocks get an *extra* `gamma*eps_(t-1)^2` kick to variance beyond what a same-sized positive shock would produce — directly modeling the leverage effect with one added parameter.

```python
from arch import arch_model

# o=1 adds the GJR asymmetry term on top of standard GARCH(p, q)
am = arch_model(returns, vol="GARCH", p=1, o=1, q=1, dist="t")
res = am.fit(disp="off")
print(res.params)   # omega, alpha[1], gamma[1], beta[1]
```

## EGARCH: modeling log-variance

EGARCH (Exponential GARCH) takes a different approach: it models the *log* of the conditional variance, which has two convenient side effects — variance is automatically guaranteed positive (no non-negativity constraints needed on the parameters), and the model can include separate terms for the *sign* and *magnitude* of the shock:

log(sigma_t^2) = omega + alpha*(|z_(t-1)| - E|z_(t-1)|) + gamma*z_(t-1) + beta*log(sigma_(t-1)^2)

where `z_t = eps_t / sigma_t` is the standardized shock. The `gamma*z_(t-1)` term is what captures asymmetry here: a negative `gamma` means negative standardized shocks push log-variance up more than positive ones of the same size.

```python
am = arch_model(returns, vol="EGARCH", p=1, o=1, q=1, dist="t")
res = am.fit(disp="off")
print(res.params)
```

## Choosing between them

Both GJR-GARCH and EGARCH are standard choices for modeling equity volatility, and both usually beat plain GARCH(1,1) on real stock return data by AIC/BIC (Lesson 13's comparison tools apply here too). EGARCH's log-variance formulation is sometimes preferred for its guaranteed positivity and because its parameters have a direct multiplicative interpretation on variance; GJR-GARCH is often preferred for its simpler, more directly interpretable indicator-variable structure. Neither is universally "correct" — comparing both against the data, as with any other model-selection decision in this course, is standard practice.

## Key terms

| Term | Meaning |
|---|---|
| Leverage effect | Negative return shocks raise future volatility more than same-sized positive shocks |
| GJR-GARCH | GARCH plus an indicator term that adds extra weight to negative shocks |
| EGARCH | Models log-variance directly, with separate sign and magnitude shock terms |
| Standardized shock z_t | eps_t / sigma_t — the residual scaled by its own conditional volatility |

## Recap

Plain GARCH treats a positive and negative shock of the same size identically; GJR-GARCH and EGARCH both fix that by letting a negative shock raise volatility more, matching the leverage effect seen in real equity markets. Next, Lesson 19 looks at a fundamentally different approach — stochastic volatility models — and how they contrast with the entire GARCH family.
