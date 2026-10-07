# Expectation, Variance & Moments

Lesson 12 gave you random variables and their CDFs — complete but unwieldy descriptions of uncertainty. This lesson compresses an entire distribution into a handful of numbers: expectation (the mean), variance (the spread), and the higher moments that describe its shape. These numbers are the working vocabulary quants use every day to talk about expected return, volatility, and tail risk.

## What you'll learn

- The definition of expectation for discrete and continuous random variables, and why it is linear
- Variance as E[X²] − E[X]², and how to derive that identity yourself
- Higher moments — skewness and kurtosis — and why financial returns are almost never normal
- How to compute all four quantities on simulated return data with NumPy and SciPy

## Expectation: the probability-weighted average

For a discrete random variable with PMF p(x), the **expectation** is

E[X] = Σₓ x · p(x)

For a continuous random variable with PDF f(x), the sum becomes an integral:

E[X] = ∫ x · f(x) dx

Either way, E[X] is the probability-weighted average of every possible outcome. Its most useful property is **linearity**: E[aX + bY] = a·E[X] + b·E[Y], for *any* constants a, b and *any* two random variables X and Y — this holds no matter how X and Y depend on each other. In finance, this is why the expected return of a portfolio is simply the weighted sum of the expected returns of its holdings, regardless of how correlated those holdings are.

## Variance and standard deviation

**Variance** measures spread around the mean:

Var(X) = E[(X − E[X])²]

Expanding the square gives the computational form you'll use constantly: Var(X) = E[(X − μ)²] = E[X² − 2μX + μ²] = E[X²] − 2μ·E[X] + μ² = E[X²] − 2μ² + μ² = **E[X²] − (E[X])²**, since E[X] = μ is itself just a constant.

The square root of variance, the **standard deviation**, carries the same units as X and is what finance calls **volatility**. Two scaling rules matter: Var(aX + b) = a²Var(X) for any constants a, b, and for *independent* X and Y, Var(X + Y) = Var(X) + Var(Y). When X and Y are not independent, a covariance cross-term appears — the subject of the next lesson.

## Higher moments: shape beyond the mean and spread

The **nth raw moment** of X is E[Xⁿ]; the **nth central moment** is E[(X − μ)ⁿ]. Mean and variance are the first and second central moments (loosely speaking). Two more matter a great deal in finance:

- **Skewness** = E[(X − μ)³] / σ³ measures asymmetry. A symmetric distribution (like the normal) has skewness 0. Equity returns are typically **negatively skewed** — a long left tail reflecting the fact that crashes are sharper than rallies.
- **Kurtosis** = E[(X − μ)⁴] / σ⁴ measures how heavy the tails are. The normal distribution has kurtosis exactly **3**; **excess kurtosis** is kurtosis minus 3. Most asset returns show excess kurtosis greater than 0 — "fat tails," meaning extreme moves happen far more often than a normal model would predict.

## A worked example in code

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(11)
normal_rets = rng.normal(0.0005, 0.01, 50_000)
t_rets = 0.0005 + 0.01 * stats.t.rvs(df=4, size=50_000, random_state=rng)

for name, r in [("normal", normal_rets), ("student-t (df=4)", t_rets)]:
    mean, var = r.mean(), r.var()
    skew = stats.skew(r)
    kurt = stats.kurtosis(r)          # SciPy already subtracts 3 (excess kurtosis)
    print(f"{name:18s} mean={mean:.5f} var={var:.6f} skew={skew:+.3f} excess_kurt={kurt:+.3f}")
```

Both series are built around the same mean and roughly the same scale, but the Student's t sample comes back with excess kurtosis well above zero while the normal sample's excess kurtosis stays near zero. Same center, same spread, very different tail risk — exactly the gap that makes models assuming normal returns underprice extreme events.

## Key terms

| Term | Meaning |
|---|---|
| Expectation, E[X] | The probability-weighted average of a random variable |
| Linearity of expectation | E[aX + bY] = aE[X] + bE[Y], regardless of dependence |
| Variance, Var(X) | E[X²] − (E[X])²; expected squared distance from the mean |
| Standard deviation / volatility | √Var(X); same units as X |
| Moment | E[Xⁿ] (raw) or E[(X−μ)ⁿ] (central) |
| Skewness | Standardized third central moment; measures asymmetry |
| Kurtosis / excess kurtosis | Standardized fourth central moment; measures tail weight (normal = 3, excess = kurtosis − 3) |

## Recap

Mean, variance, skewness, and kurtosis are your first language for describing any distribution's center, spread, and shape — and real financial returns routinely violate the normal distribution's assumptions on the last two. Next up, Lesson 14: Joint Distributions & Conditioning, where we see how two random variables move together.
