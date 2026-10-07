# Bayesian Inference

Lesson 18's MLE and MoM both produce a single number — a point estimate — and treat the unknown parameter as fixed but unknown. **Bayesian inference** takes a different stance: the parameter itself has a distribution representing your belief, and observing data updates that belief. This is a natural fit for finance, where you're constantly revising a view — a strategy's true win rate, a volatility regime — as new data arrives.

## What you'll learn

- Bayes' theorem, and the roles of the prior, likelihood, and posterior
- The Beta-Binomial conjugate pair, for updating a belief about a probability (like a strategy's win rate)
- The Normal-Normal conjugate pair, for updating a belief about a mean
- Credible intervals, and how they differ in meaning from frequentist confidence intervals
- A worked example updating belief about a trading strategy's win rate as trades come in

## Bayes' theorem

For a parameter θ and observed data D, Bayes' theorem states:

P(θ | D) = P(D | θ) · P(θ) / P(D)

In words: **posterior ∝ likelihood × prior**. The **prior**, P(θ), encodes what you believed about θ *before* seeing the data. The **likelihood**, P(D | θ), is the same object MLE maximizes in Lesson 18 — how probable the data is for each value of θ. The **posterior**, P(θ | D), is your updated belief after combining the two. The denominator P(D) (the "evidence") is just a normalizing constant that makes the posterior integrate to 1; for most practical calculations you can work with the unnormalized form, posterior ∝ likelihood × prior, and normalize at the end.

## Conjugate priors: Beta-Binomial

A **conjugate prior** is one where the posterior stays in the same distributional family as the prior, making the update pure algebra instead of numerical integration. The most useful conjugate pair for finance is **Beta-Binomial**, for updating a belief about an unknown *probability* — such as a strategy's true win rate p.

- Prior: p ~ Beta(α, β)
- Data: k wins out of n trades (Binomial likelihood)
- Posterior: **p | data ~ Beta(α + k, β + n − k)**

The update is just "add wins to α, add losses to β." A Beta(1, 1) prior (uniform — "I have no idea") updated with 60 wins out of 100 trades gives a Beta(61, 41) posterior, with posterior mean 61/102 ≈ 0.598 — close to the raw 60% win rate, but gently pulled toward the prior, which matters most when the sample is small.

## Conjugate priors: Normal-Normal

For updating a belief about an unknown *mean* μ with known variance σ², the conjugate pair is **Normal-Normal**:

- Prior: μ ~ N(μ₀, τ₀²)
- Data: sample mean x̄ from n observations, each with known variance σ²
- Posterior: μ | data ~ N(μ_post, τ_post²), where

μ_post = (τ₀⁻² μ₀ + nσ⁻² x̄) / (τ₀⁻² + nσ⁻²), τ_post² = 1 / (τ₀⁻² + nσ⁻²)

The posterior mean is a **precision-weighted average** of the prior mean and the sample mean (precision = 1/variance). As n grows, nσ⁻² dominates τ₀⁻², so μ_post → x̄ and τ_post² → 0 — more data overwhelms the prior, exactly as you'd want.

## Credible intervals vs. confidence intervals

A Bayesian **credible interval** is a direct probability statement: "given the data, there's a 95% probability that θ lies in this interval." A frequentist **confidence interval** means something subtly different: "if I repeated this sampling procedure many times, 95% of the intervals I construct would contain the true θ" — it says nothing about the probability of θ being in *this particular* interval, because in the frequentist view θ is fixed, not random. In practice, with a weak (uninformative) prior and enough data, the two intervals often numerically coincide, but their *meanings* remain genuinely different.

## A worked example in code

```python
import numpy as np
from scipy import stats

# Updating belief about a strategy's true win rate, trade by trade
alpha_prior, beta_prior = 1, 1          # Beta(1,1): uniform prior, "no idea yet"
wins, losses = 0, 0

trade_outcomes = [1, 1, 0, 1, 0, 1, 1, 1, 0, 1]   # 1 = win, 0 = loss
for outcome in trade_outcomes:
    wins += outcome
    losses += 1 - outcome

alpha_post = alpha_prior + wins
beta_post = beta_prior + losses
posterior = stats.beta(alpha_post, beta_post)

print(f"Posterior mean win rate: {posterior.mean():.3f}")
print(f"95% credible interval: {posterior.interval(0.95)}")
print(f"P(true win rate > 0.5): {1 - posterior.cdf(0.5):.3f}")
```

After just 10 trades (7 wins), the posterior mean sits below the raw 70% sample win rate because the prior still has real weight — exactly the "gentle pull toward the prior" the Beta-Binomial update produces, and exactly the kind of overconfidence correction a point estimate from Lesson 18 alone wouldn't give you with so little data.

## Key terms

| Term | Meaning |
|---|---|
| Prior, P(θ) | Belief about θ before seeing data |
| Likelihood, P(D\|θ) | Probability of the observed data, as a function of θ |
| Posterior, P(θ\|D) | Updated belief: posterior ∝ likelihood × prior |
| Conjugate prior | A prior family whose posterior stays in the same family |
| Beta-Binomial | Conjugate pair for updating a belief about an unknown probability |
| Normal-Normal | Conjugate pair for updating a belief about an unknown mean (known variance) |
| Credible interval | A direct probability statement about θ given the data |

## Recap

Bayesian inference treats the unknown parameter as having a distribution, updates that distribution with Bayes' theorem as data arrives, and — for conjugate pairs like Beta-Binomial and Normal-Normal — turns that update into simple algebra. Next up, Lesson 20: Hypothesis Testing Revisited, where we go back to the frequentist machinery of p-values and significance with a sharper, more careful eye.
