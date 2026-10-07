# Multiple Testing & False Discovery

Lesson 20 fixed a significance level of α = 0.05 for a single test. But a quant backtesting thousands of candidate strategies, or a researcher screening thousands of factors, isn't running one test — they're running thousands. This lesson is about what goes wrong when you do that without correction, and the two standard fixes: the Bonferroni correction and the Benjamini-Hochberg procedure for controlling the false discovery rate.

## What you'll learn

- Why testing many hypotheses inflates the chance of at least one false positive, even with a fixed per-test α
- The family-wise error rate (FWER) and the Bonferroni correction that controls it
- The false discovery rate (FDR) and the Benjamini-Hochberg procedure, a more powerful alternative
- Why this matters enormously for backtesting many trading strategies
- A worked simulation showing how many "significant" results are pure chance, and how correction fixes it

## The multiple testing problem

Suppose you test m independent hypotheses, each at significance level α = 0.05, and every null hypothesis is actually true. The probability that *at least one* test falsely rejects is the **family-wise error rate (FWER)**:

FWER = P(at least one false positive) = 1 − (1 − α)ᵘ

With m = 1, FWER = 0.05 as intended. With m = 100 independent tests, FWER = 1 − 0.95¹⁰⁰ ≈ 0.994 — you're almost *guaranteed* at least one "significant" result purely by chance, even though nothing real is happening in any of the 100 tests. This is exactly the trap of backtesting thousands of strategy variations and reporting only the one(s) that happened to look good.

## The Bonferroni correction

The **Bonferroni correction** controls the FWER by using a stricter per-test threshold: reject hypothesis i only if its p-value < α/m. This works by the union bound: P(any false positive) ≤ Σᵢ P(test i is a false positive) = m · (α/m) = α, regardless of whether the tests are independent. The correction is simple and always valid, but **conservative** — as m grows large, α/m becomes tiny, and the test loses power to detect real effects, producing many false *negatives* instead.

## The false discovery rate and Benjamini-Hochberg

An alternative framework, more forgiving when you expect *some* real effects among many tests, controls the **false discovery rate (FDR)** — the *expected proportion* of false positives *among the hypotheses you actually reject*, rather than the probability of any false positive at all. The **Benjamini-Hochberg (BH) procedure**:

1. Sort the m p-values in increasing order: p₍₁₎ ≤ p₍₂₎ ≤ … ≤ p₍ᵤ₎
2. Find the largest k such that p₍ₖ₎ ≤ (k/m) · α
3. Reject all hypotheses with p-value ≤ p₍ₖ₎

BH is **less conservative than Bonferroni** and has correspondingly more power to detect real effects, while still controlling the expected false-discovery proportion at α. This makes it the more practical choice whenever you're screening many candidates and expect at least some to be genuinely significant.

## Why this is critical for backtesting

If you backtest 1,000 strategy variations on the same historical data and report only the best-looking one, you have effectively run a large multiple-testing problem without correcting for it. Even if every strategy has zero true edge, by chance alone some will show an impressive-looking Sharpe ratio and a p-value under 0.05. This is one driver of the widely-cited concern about **backtest overfitting**, and it's exactly why practitioners apply corrections like Bonferroni or BH to a batch of candidate strategies' p-values before trusting any of them — related ideas like the "deflated Sharpe ratio" explicitly adjust a strategy's apparent significance downward based on how many variations were tried to find it.

## A worked example in code

```python
import numpy as np
from scipy import stats
from statsmodels.stats.multitest import multipletests

rng = np.random.default_rng(89)
m = 1000       # 1,000 candidate "strategies", ALL with zero true mean return
n = 60         # 60 months of returns each

p_values = np.empty(m)
for i in range(m):
    fake_returns = rng.normal(0, 0.03, n)   # true mean is exactly 0 for every one
    _, p_values[i] = stats.ttest_1samp(fake_returns, popmean=0.0)

naive_significant = np.sum(p_values < 0.05)
print(f"Naive alpha=0.05: {naive_significant} 'significant' strategies out of {m} (all pure noise)")

bonf_reject, bonf_p, _, _ = multipletests(p_values, alpha=0.05, method="bonferroni")
bh_reject, bh_p, _, _ = multipletests(p_values, alpha=0.05, method="fdr_bh")
print(f"Bonferroni-corrected significant: {bonf_reject.sum()}")
print(f"Benjamini-Hochberg significant:   {bh_reject.sum()}")
```

With every strategy built from pure noise, the naive approach still flags roughly 50 of the 1,000 as "significant" at the 5% level — exactly m × α, by construction. Both corrections push that number down toward zero, as they should, since there's no real effect anywhere in this data to detect.

## Key terms

| Term | Meaning |
|---|---|
| Family-wise error rate (FWER) | P(at least one false positive among m tests) |
| Bonferroni correction | Reject if p < α/m; controls FWER, conservative |
| False discovery rate (FDR) | Expected proportion of false positives among rejected hypotheses |
| Benjamini-Hochberg (BH) | Procedure controlling FDR; more powerful than Bonferroni |
| Backtest overfitting | Reporting the best of many tried strategies without correcting for how many were tried |

## Recap

Testing many hypotheses at once inflates your chance of a false positive unless you correct for it — Bonferroni controls the probability of any false positive at all, while Benjamini-Hochberg controls the expected proportion of false positives among your rejections, with more statistical power. Next up, Lesson 23: Bootstrap & Resampling Methods, a different way entirely to build confidence intervals without assuming a parametric distribution.
