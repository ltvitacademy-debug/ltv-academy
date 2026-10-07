# Risk, Return & Diversification

Every lesson in Chapter 3 was about pricing a single instrument. Chapter 4 steps up a level: how should you combine multiple assets into a portfolio? The starting point is the same two numbers investors have cared about forever — expected return and risk — and one surprising fact about how they combine: a portfolio's risk is almost never just the average of its pieces' risks.

## What you'll learn

- Expected return and standard deviation as the basic return/risk pair
- Covariance and correlation between two assets
- The two-asset portfolio variance formula
- Why diversification reduces some risk but not all of it

## Expected return and risk

**Expected return**, E[R], is the probability-weighted average of an asset's possible returns — your best single forecast of what it will earn. **Standard deviation**, σ, measures how spread out those possible returns are around that expectation, and it's the standard quantitative stand-in for "risk": a higher σ means outcomes are more dispersed, so the actual result is less predictable, for better or worse.

For a historical sample of returns, these are estimated the ordinary way:

```python
import numpy as np
returns = np.array([0.08, -0.02, 0.15, 0.03, -0.05])
mean_return = returns.mean()        # expected return estimate
std_dev = returns.std(ddof=1)       # risk estimate (sample std dev)
```

## Covariance and correlation

Once you hold more than one asset, how they move *together* matters as much as how each moves alone. **Covariance**, Cov(R1, R2), measures the degree to which two assets' returns move in the same direction (positive covariance) or opposite directions (negative covariance). It's hard to interpret on its own because its units depend on the scale of the returns, so it's usually normalized into **correlation**:

```
Correlation (rho) = Cov(R1, R2) / (sigma1 * sigma2)
```

ρ always falls between −1 and +1. ρ = +1 means the two assets move in perfect lockstep; ρ = −1 means they move in perfect opposition; ρ = 0 means no linear relationship at all. This single number is the key ingredient that makes diversification work — or fail.

## Two-asset portfolio variance

For a portfolio of two assets with weights w1 and w2 (w1 + w2 = 1), the portfolio's variance is **not** simply w1²σ1² + w2²σ2² — it has a cross term that captures how the two assets interact:

```
sigma_p^2 = w1^2*sigma1^2 + w2^2*sigma2^2 + 2*w1*w2*rho*sigma1*sigma2
```

That cross term, 2w1w2ρσ1σ2, is where diversification lives. If ρ < 1 (the two assets aren't perfectly correlated), this term is smaller than it would be if they moved in lockstep, and the combined portfolio's standard deviation ends up **less than** the weighted average of the two individual standard deviations. The lower the correlation, the bigger that reduction — which is exactly why portfolio managers hunt for assets that are uncorrelated or negatively correlated with what they already hold, not just assets that are individually safe.

## Worked example

Two assets: Asset 1 has σ1 = 20%, Asset 2 has σ2 = 30%, correlation ρ = 0.3, equally weighted (w1 = w2 = 0.5).

```python
w1, w2 = 0.5, 0.5
sigma1, sigma2, rho = 0.20, 0.30, 0.3

var_p = w1**2*sigma1**2 + w2**2*sigma2**2 + 2*w1*w2*rho*sigma1*sigma2
# = 0.25*0.04 + 0.25*0.09 + 2*0.5*0.5*0.3*0.2*0.3
# = 0.01 + 0.0225 + 0.009 = 0.0415
sigma_p = var_p ** 0.5   # ≈ 0.2037, or about 20.37%
```

The portfolio's standard deviation comes out to about **20.4%** — well below the simple weighted average of the two individual standard deviations (0.5×20% + 0.5×30% = 25%). That 4.6-point gap is pure diversification benefit, generated entirely by the fact that the two assets aren't perfectly correlated.

## Systematic vs. unsystematic risk

Diversification has a limit, and understanding why matters as much as understanding the benefit itself. Risk splits into two categories:

- **Unsystematic (idiosyncratic) risk** — risk specific to one company or asset (a product recall, a lawsuit, a bad earnings quarter). Because these events are largely uncorrelated across companies, holding many different assets causes much of this risk to average out. This is the risk diversification actually eliminates.
- **Systematic (market) risk** — risk that affects the entire market at once (a recession, a broad rate shock, a geopolitical crisis). Because it hits every asset in a correlated way, no amount of adding more assets makes it go away. This is the risk that remains no matter how diversified you get — and it's exactly what CAPM, in Lesson 20, prices and compensates investors for bearing.

## Key terms

| Term | Meaning |
|---|---|
| Expected return | Probability-weighted average of an asset's possible returns |
| Standard deviation (sigma) | Dispersion of returns around the expectation; the standard risk measure |
| Covariance | Degree to which two assets' returns move together |
| Correlation (rho) | Covariance normalized to a −1 to +1 scale |
| Unsystematic risk | Asset-specific risk that diversification reduces |
| Systematic risk | Market-wide risk that diversification cannot reduce |

## Recap

A two-asset portfolio's variance is w1²σ1² + w2²σ2² + 2w1w2ρσ1σ2 — the cross term means that combining imperfectly correlated assets produces a portfolio less risky than the weighted average of its parts. That benefit only removes unsystematic risk; systematic, market-wide risk remains no matter how many assets you add. Next up, Lesson 19: mean-variance optimization, the formal framework for choosing the weights that do this as well as possible.
