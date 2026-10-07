# Hypothesis Testing Revisited

You've likely run a t-test before. This lesson revisits hypothesis testing with the care a quant role demands: precise definitions of the null and alternative, what a p-value actually means (and the two things it's constantly mistaken for), the trade-off between Type I and Type II error, and the specific test you'd use to ask "is this strategy's return actually different from zero, or is that just noise?"

## What you'll learn

- The null and alternative hypotheses, test statistics, and the exact definition of a p-value
- Type I error, Type II error, and statistical power — and the trade-off between them
- One-sided vs. two-sided tests, and how to choose
- The one-sample and two-sample t-tests, and when to use a z-test instead
- A worked test of whether a strategy's mean return is significantly different from zero

## The structure of a hypothesis test

Every hypothesis test starts with two competing claims about a parameter θ:

- **Null hypothesis**, H₀: the "nothing interesting is happening" claim — e.g., H₀: μ = 0 (a strategy's true mean return is zero)
- **Alternative hypothesis**, H₁: what you suspect instead — e.g., H₁: μ ≠ 0 (two-sided) or H₁: μ > 0 (one-sided)

You compute a **test statistic** from the data — a number whose distribution under H₀ is known — and ask how surprising the observed statistic would be if H₀ were actually true. The **p-value** is defined precisely as:

p-value = P(observing a test statistic at least as extreme as the one observed | H₀ is true)

This is the single most misunderstood number in statistics. A p-value is **not** the probability that H₀ is true, and it is **not** the probability of a Type I error. It is a statement about how surprising your data would be *under the assumption* that H₀ holds — nothing more.

## Type I error, Type II error, and power

Rejecting H₀ when it's actually true is a **Type I error** (a false positive); its probability is the **significance level**, α, which you choose in advance (commonly 0.05). Failing to reject H₀ when it's actually false is a **Type II error** (a false negative); its probability is β. **Power**, 1 − β, is the probability of correctly detecting a real effect when one exists. The decision rule is simple: reject H₀ if p-value < α. There's an unavoidable trade-off — lowering α (demanding stronger evidence) reduces Type I errors but, holding sample size fixed, increases Type II errors. Larger sample sizes are the main lever for reducing both simultaneously.

## One-sided vs. two-sided tests

A **two-sided test** (H₁: μ ≠ 0) asks whether the parameter differs from the null value in *either* direction, splitting the significance level across both tails. A **one-sided test** (H₁: μ > 0, say) only cares about deviation in one direction, putting all of α in a single tail — which makes it more powerful for detecting an effect in that specific direction, but only valid when you committed to that direction *before* looking at the data. Choosing one-sided after peeking at results is a classic form of p-hacking.

## The t-test

For testing whether a sample mean differs from a hypothesized value μ₀, with unknown population variance (the usual case), the **one-sample t-test** statistic is

t = (x̄ − μ₀) / (s / √n)

where s is the sample standard deviation and n the sample size; under H₀, t follows a Student's t-distribution with n − 1 degrees of freedom (the same distribution family from Lesson 17, here playing a different role — as a reference distribution for a statistic, not a model for the data itself). For comparing two independent samples' means, the **two-sample t-test** uses an analogous statistic built from both samples' means, variances, and sizes. A **z-test** is used instead of a t-test only when the population variance is genuinely *known* in advance (rare in practice) — with unknown variance estimated from the sample, the t-test's extra tail-thickness correctly accounts for that added uncertainty, especially in small samples.

## A worked example in code

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(67)

# A strategy's daily returns over one year; true mean is slightly positive
daily_returns = rng.normal(loc=0.0003, scale=0.012, size=252)

t_stat, p_value = stats.ttest_1samp(daily_returns, popmean=0.0)
print(f"t-statistic: {t_stat:.3f}")
print(f"two-sided p-value: {p_value:.4f}")

# One-sided: is the mean return significantly GREATER than zero?
p_one_sided = p_value / 2 if t_stat > 0 else 1 - p_value / 2
print(f"one-sided p-value (H1: mean > 0): {p_one_sided:.4f}")

alpha = 0.05
print("Reject H0 (mean = 0)?", p_value < alpha)
```

Even with a genuinely positive true mean, a single year of noisy daily returns often fails to produce a p-value below 0.05 — a concrete illustration of how low the statistical power to detect a small daily alpha really is over a short sample, and why serious backtests use far more data (or far more trades) before claiming significance.

## Key terms

| Term | Meaning |
|---|---|
| Null hypothesis, H₀ | The default "no effect" claim being tested |
| p-value | P(test statistic at least this extreme \| H₀ true) |
| Type I error (α) | Rejecting a true H₀ (false positive) |
| Type II error (β) | Failing to reject a false H₀ (false negative) |
| Power, 1 − β | Probability of correctly detecting a real effect |
| t-test | Tests a mean using the sample standard deviation; reference distribution is Student's t |

## Recap

A hypothesis test weighs the evidence in your data against a null hypothesis, with the p-value, Type I/II errors, and power defining exactly how that evidence is judged — and a single noisy year is often not enough data to detect a real but small effect. Next up, Lesson 21: Regression Theory & the Gauss-Markov Assumptions, where hypothesis testing meets the linear model.
