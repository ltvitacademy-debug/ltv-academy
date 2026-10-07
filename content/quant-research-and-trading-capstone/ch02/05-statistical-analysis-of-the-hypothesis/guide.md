# Statistical Analysis of the Hypothesis

With a clean panel in hand, it's time to actually test the hypothesis from Lesson 2: does a sector's past 5-day return predict its forward 5-day return, in the reversal direction, and is the effect stronger when the VIX is elevated? This lesson runs four tests against the null hypothesis and reports the numbers honestly — including the uncomfortable parts.

## What you'll learn

- The Spearman rank correlation test and why rank correlation, not Pearson, fits this question
- Newey-West (HAC) standard errors, and why they matter for overlapping, autocorrelated return data
- The ADF test confirming the winner-minus-loser spread is mean-reverting, not trending
- The VIX-tercile split showing the effect is regime-dependent
- Key terms: HAC/Newey-West standard errors, ADF test, Spearman rank correlation, data snooping

## Spearman rank correlation and the HAC t-test

The core test: each day, rank the 11 (or 9, pre-2015) sectors by trailing 5-day return, and separately rank them by forward 5-day return. The **Spearman rank correlation** between those two rankings, pooled across the full 2007–2025 sample, comes out to **≈ -0.07** — small, negative, and consistent with reversal (a high past-return rank tends to pair with a lower forward-return rank).

A raw t-test on that correlation would overstate confidence, because 5-day returns overlap day to day (today's and tomorrow's trailing-5-day windows share four of five days), which induces autocorrelation the plain formula doesn't account for. **Newey-West (HAC) standard errors** — "heteroskedasticity and autocorrelation consistent" — correct for exactly this, inflating the standard error to reflect the real amount of independent information in the sample. With that correction, the t-stat on the -0.07 correlation is **≈ -2.4** — statistically significant at conventional levels, but nowhere near overwhelming.

```python
import numpy as np
from scipy.stats import spearmanr
import statsmodels.api as sm

rho, _ = spearmanr(past_5d_rank, fwd_5d_rank)
X = sm.add_constant(past_5d_rank)
model = sm.OLS(fwd_5d_rank, X).fit(cov_type="HAC", cov_kwds={"maxlags": 5})
t_stat = model.tvalues[1]  # ≈ -2.4 with Newey-West correction
```

## Confirming mean reversion, not momentum: the ADF test

A negative rank correlation is consistent with reversal, but it's worth confirming directly that the winner-minus-loser spread (top-tercile minus bottom-tercile sector return) behaves like a mean-reverting series rather than a trending one. An **Augmented Dickey-Fuller (ADF) test** on that spread rejects the unit-root null at the 5% level (**p ≈ 0.02**) — meaning the spread does not wander like a random walk, but pulls back toward its mean, which is exactly the statistical signature mean reversion should leave behind.

## The VIX-tercile split: a regime-dependent effect

Splitting the full sample into VIX terciles (low, middle, high) and re-running the same rank-correlation test within each regime shows the effect is not constant:

- **High-VIX tercile**: reversal IC (information coefficient, the same rank correlation) **≈ -0.11**, HAC t-stat **≈ -2.9** — significant, and noticeably stronger than the full-sample average.
- **Low-VIX tercile**: IC **≈ -0.02**, t-stat **≈ -0.6** — not statistically significant.

This matches the hypothesis from Lesson 2: the reversal effect concentrates in fearful, high-volatility markets and all but disappears when markets are calm.

## Being honest about the risks

Two caveats belong in the report, not buried in an appendix:

- **Data snooping** — this capstone ran several related tests (full-sample correlation, ADF, three VIX terciles) against the same dataset. Even with a sound hypothesis, testing multiple related cuts of the same data raises the chance that at least one looks significant by luck. The consistency across tests (same sign, plausible regime-dependence, confirmed by an independent ADF test) is reassuring, but it does not eliminate this risk.
- **Small effective sample size** — overlapping 5-day windows mean the ~19-year sample contains far fewer independent observations than its raw day-count suggests, which is precisely why the Newey-West correction matters, and why a t-stat of 2.4 should be read as modest evidence, not proof.

## Key terms

| Term | Meaning |
|---|---|
| Spearman rank correlation | Correlation between the rankings of two variables, robust to non-linear relationships |
| HAC / Newey-West standard errors | Standard errors corrected for heteroskedasticity and autocorrelation in overlapping data |
| ADF test | Augmented Dickey-Fuller test for a unit root; rejecting it supports mean reversion over a random walk |
| Data snooping | The risk of finding spurious "significant" results from testing many cuts of the same data |

## Recap

Four tests point the same direction: a small but statistically significant full-sample reversal effect (Spearman ≈ -0.07, HAC t ≈ -2.4), confirmed as genuine mean reversion by the ADF test (p ≈ 0.02), and concentrated in high-VIX regimes (IC ≈ -0.11, t ≈ -2.9) versus essentially absent in low-VIX regimes (IC ≈ -0.02, t ≈ -0.6) — with honest caveats about data snooping and effective sample size. Next lesson: a checkpoint review of what this means before building anything further.
