# Common Distributions in Finance

You now have the machinery — expectation, moments, joint behavior, limit theorems, and generating functions — to describe any distribution rigorously. This closing lesson of Chapter 3 puts names and exact formulas to the handful of distributions that show up constantly in quantitative finance, and is honest about where each one fits and where it fails.

## What you'll learn

- The normal and lognormal distributions, and why asset *prices* are modeled lognormal while *log-returns* are modeled normal
- The Student's t-distribution, and why it fits financial return tails better than the normal
- The Poisson and exponential distributions, for counting and timing rare events like defaults or jumps
- The Pareto distribution, for modeling genuinely heavy-tailed risk
- How to fit several of these to data via maximum likelihood and compare the fits

## Normal: the default, with a caveat

X ~ N(μ, σ²) has density

f(x) = (1 / (σ√(2π))) · exp(−(x − μ)² / (2σ²))

Mean μ, variance σ², skewness 0, kurtosis 3. The CLT (Lesson 15) is the formal justification for why normal approximations are everywhere: averages and well-diversified sums of many small, roughly independent effects tend toward normal. The caveat: individual daily returns are usually **not** normal — they show negative skew and excess kurtosis (Lesson 13) — so the normal is best treated as a baseline, not a final answer.

## Lognormal: why prices, not returns

If Y = ln(S) ~ N(μ, σ²), then S is **lognormal**, with density

f(s) = (1 / (sσ√(2π))) · exp(−(ln s − μ)² / (2σ²)), for s > 0

E[S] = exp(μ + σ²/2), Var(S) = (exp(σ²) − 1)·exp(2μ + σ²). The lognormal is the standard model for asset **prices** (never negative) precisely because it's built from a normal model of **log-returns**: if log-returns ln(Sₜ/Sₜ₋₁) are i.i.d. normal, the price process itself is lognormal at every horizon. This is the distributional backbone of the Black-Scholes model.

## Student's t: fatter tails, same shape family

The Student's t-distribution with ν degrees of freedom has density proportional to (1 + x²/ν)^{−(ν+1)/2}. For ν > 2, Var(X) = ν/(ν − 2); for ν ≤ 2, the variance is infinite. As ν → ∞, the t-distribution converges to the standard normal, but for small ν it has visibly heavier tails — exactly the excess kurtosis real return data shows. Fitting a t-distribution (instead of a normal) to historical returns is one of the simplest, most effective upgrades to a risk model's tail behavior.

## Poisson and exponential: counting and timing rare events

The **Poisson distribution** counts how many events (defaults, large jumps, trades) occur in a fixed interval, given a constant average rate λ:

P(N = k) = e^{−λ} λᵏ / k!, k = 0, 1, 2, …

with E[N] = Var(N) = λ — mean and variance are forced equal, a useful diagnostic (if your event-count data has variance far above its mean, Poisson is the wrong model). The **exponential distribution** is its continuous-time counterpart, modeling the *waiting time* between events at rate λ:

f(x) = λe^{−λx}, x ≥ 0, with E[X] = 1/λ, Var(X) = 1/λ²

The exponential has the unique **memoryless property**: P(X > s + t | X > s) = P(X > t) — the time already waited tells you nothing about the time remaining. This is a strong (often unrealistic) assumption for time-between-defaults models, but it's the natural starting point before adding more structure.

## Pareto: genuinely heavy tails

The Pareto distribution, with scale xₘ and tail index α, has density

f(x) = α xₘ^α / x^{α+1}, x ≥ xₘ

Its mean is finite only if α > 1, and its variance is finite only if α > 2 — for α ≤ 2, Pareto-distributed losses have **infinite variance**, which is exactly the regime where the classical CLT (Lesson 15) breaks down. Pareto and Pareto-like power laws are used to model extreme losses, catastrophic drawdowns, and other events where "a few huge outcomes dominate everything else."

## A worked example in code

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(41)
# Simulate returns with genuine fat tails (student-t), then fit three models
true_returns = 0.0003 + 0.011 * stats.t.rvs(df=4, size=5000, random_state=rng)

fits = {
    "normal": stats.norm.fit(true_returns),
    "student-t": stats.t.fit(true_returns),
    "lognormal shift": stats.lognorm.fit(true_returns - true_returns.min() - 1e-6),
}
for name, params in fits.items():
    dist = {"normal": stats.norm, "student-t": stats.t, "lognormal shift": stats.lognorm}[name]
    loglik = np.sum(dist.logpdf(true_returns if name != "lognormal shift"
                                 else true_returns - true_returns.min() - 1e-6, *params))
    print(f"{name:16s} params={np.round(params, 4)}  log-likelihood={loglik:.1f}")
```

Because the data was generated with heavy tails, the Student's t fit comes back with the highest log-likelihood — a direct, data-driven demonstration of why the fatter-tailed distribution is the better model here, something the next chapter's estimation theory makes fully rigorous.

## Key terms

| Distribution | Used for | Key parameter(s) |
|---|---|---|
| Normal | Log-returns, CLT-justified averages | μ, σ² |
| Lognormal | Asset prices (always positive) | μ, σ² of the log |
| Student's t | Return tails, fat-tail risk | Degrees of freedom ν |
| Poisson | Count of rare events in a fixed interval | Rate λ (mean = variance) |
| Exponential | Waiting time between events; memoryless | Rate λ |
| Pareto | Extreme losses, power-law tails | Tail index α |

## Recap

Each distribution in this lesson is a tool matched to a specific job: normal for CLT-driven averages, lognormal for prices, Student's t for fat-tailed returns, Poisson and exponential for counting and timing rare events, and Pareto for genuinely extreme risk. Chapter 4, Advanced Statistics, opens with Lesson 18: Estimation via Maximum Likelihood and the Method of Moments — the formal machinery for fitting exactly these distributions to real data.
