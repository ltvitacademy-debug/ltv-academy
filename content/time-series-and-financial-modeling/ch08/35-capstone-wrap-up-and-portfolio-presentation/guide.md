# Capstone: Wrap-Up & Portfolio Presentation

Lesson 34 computed everything: ARMA orders and Ljung-Box checks for five assets, GARCH(1,1) persistence ranging from 0.76 to 0.95, estimated factor betas that tracked the true simulation values closely, and a factor-model covariance matrix that matched the sample covariance on the diagonal while diverging modestly off-diagonal — most notably a 34-point gap between QRBT and COBM. This final lesson of the course interprets those results honestly, names the project's real limitations, and covers how to present it well.

## What you'll learn

- How to interpret Lesson 34's ARMA, GARCH, and factor-model results together
- The honest limitations of this project: a small universe, a short simulated history, and model-selection uncertainty
- What a factor-model covariance does and doesn't fix, relative to the plain sample covariance
- What to include and be ready to explain when presenting this as a portfolio project
- What comes next on the Quantitative Developer / Researcher path

## Reading the results together

Five assets, three models each, one combined summary table — and the numbers tell a coherent story when read together rather than one at a time. The ARMA step found essentially no real mean-level structure (COBM and PRAI came back as pure white noise; the small AR/MA orders on QRBT, HALC, and VANU are very likely model-selection noise rather than genuine signal) — which is exactly right, since this universe was built with randomness in variance, not in the mean. The GARCH step, by contrast, found real and substantial structure: every asset's persistence sat well above zero, confirming that volatility clustering, not return predictability, is where the actual dynamics in this universe live. And the factor model recovered betas close enough to the true simulation values (QRBT: 1.325 estimated vs. 1.30 true; VANU: 0.341 vs. 0.35 true) that the resulting covariance matrix's diagonal was nearly indistinguishable from the sample covariance's. Three different tools, three consistent readings of the same underlying structure — ARMA correctly found little, GARCH correctly found a lot, and the factor model correctly recovered the betas it was built to estimate.

## Honest limitations

A good project names its own weaknesses before someone else has to point them out:

- **Small universe.** Five assets is enough to illustrate a one-factor model cleanly, but far too few to draw any real conclusion about diversification, risk budgeting, or whether a one-factor structure generalizes to a realistic equity universe of hundreds of names.
- **Short simulated history.** 1,000 trading days is roughly four years — short enough that GARCH parameter estimates carry real sampling uncertainty, which is exactly what COBM's fitted persistence (0.76) landing well below its 0.96 simulation target demonstrated directly in Lesson 34.
- **Model-selection uncertainty.** The ARMA orders chosen by AIC search weren't all (0,0,0), even though the true process has no mean-level autocorrelation at all. That's not a coding error; it's a real feature of model selection on finite samples, and it's worth stating plainly rather than glossing over: an information criterion will occasionally reward a spurious lag term, and a careful practitioner reports that rather than treating every AIC-chosen order as gospel.
- **What the factor model does and doesn't fix.** A one-factor covariance estimate is *more structured* than the sample covariance — it assumes all cross-asset co-movement flows through a single common driver, which is a real simplification, not a free upgrade. It reduces the number of parameters that need estimating (five betas and five idiosyncratic variances, instead of a full 5x5 covariance matrix with its own ten off-diagonal terms), which can make the estimate more stable on short samples. But it does this by assuming away any correlation between assets that doesn't run through the common factor — which is exactly what showed up as the 34-point QRBT-COBM gap in Lesson 34. A factor model doesn't make a covariance estimate more accurate in any absolute sense; it trades some bias (the structure it imposes may not be fully correct) for less variance (fewer parameters means less estimation noise) — a standard bias-variance tradeoff, not a guaranteed improvement.

## Presenting this as a portfolio project

When presenting this project — in a portfolio, in an interview, or in a write-up — a strong version includes:

- **The simulation and modeling code** — the GARCH-driven universe generator, the ARMA/GARCH fitting loop, and the factor-covariance estimation, clean and reproducible via the fixed random seeds.
- **A results table** — the combined summary table from Lesson 34, with ARMA order, GARCH persistence, factor beta, and annualized volatility for every asset.
- **A written limitations summary** — explicitly naming the small universe, the short sample, and the model-selection noise in the ARMA orders, rather than overstating what the results show.

Be ready to explain, if asked: why ARMA found little and GARCH found a lot (because that's genuinely how the universe was built — randomness in variance, not the mean); why a factor-model covariance differs from the sample covariance (it imposes structure in exchange for fewer estimated parameters); and why a spurious ARMA(2,2) order on one asset doesn't undermine the whole project (it's a known, expected property of AIC-based model selection, not evidence the pipeline is broken). Being able to say precisely what a result does and doesn't show — and why — is the same skill this entire course has built one model at a time: from log returns, through stationarity, ARMA, GARCH, factor models, and feature engineering, to this closing project that asked all of them to work together.

## Key terms

| Term | Meaning |
|---|---|
| Model-selection noise | A spurious nonzero order chosen by AIC on a finite sample, even when the true process has none |
| Bias-variance tradeoff (factor covariance) | A factor model trades some bias (imposed structure may be imperfect) for less estimation variance (fewer parameters) |
| Portfolio limitations summary | A written, honest account of a project's scope boundaries, included alongside its results |

## Recap

Reading the ARMA, GARCH, and factor-model results together told one consistent story about where this universe's real structure lives — in volatility, not in mean returns — while the project's honest limitations (a five-asset universe, a four-year sample, and real model-selection noise) are worth naming explicitly rather than glossing over, and the factor-model covariance's divergence from the sample covariance is a bias-variance tradeoff, not a flaw. That closes the capstone, Chapter 8, and **Time Series & Financial Modeling** as a whole. This course took you from the basic mechanics of turning prices into returns, through stationarity, ARMA, GARCH and its extensions, factor models, state-space and regime-switching models, and a disciplined approach to feature engineering — and finished with a concrete project asking all of it to work together on one connected universe of assets. The Quantitative Developer / Researcher path continues next with **Machine Learning for Quantitative Finance**, step six of eight, which builds directly on the modeling foundation and feature-engineering discipline this course just finished putting in place.
