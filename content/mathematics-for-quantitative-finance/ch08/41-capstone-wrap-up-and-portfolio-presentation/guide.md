# Capstone: Wrap-Up & Portfolio Presentation

Lesson 40 calibrated a geometric Brownian motion to two years of data and simulated its forward price distribution. A model is only half-finished once it runs — the other half is knowing exactly what it assumes, where those assumptions break against real markets, and how to talk about both honestly. This final lesson closes the capstone (and the course) by auditing GBM's assumptions against what's actually true of real returns, and by giving you a concrete structure for presenting this project to an interviewer or in a portfolio.

## What you'll learn

- GBM's three load-bearing assumptions, and which ones real markets violate
- How to quantify a fat-tail violation directly, using the moments from Lesson 13
- Why the drift-estimation noise from Lesson 40 is a feature of the *method*, not a flaw in this specific run
- A concrete four-part structure for presenting a quantitative project: problem, method, results, limitations
- How this capstone — and the course behind it — fits into the next steps of a quant career

## GBM's three assumptions, audited

Geometric Brownian motion rests on three assumptions, each introduced earlier in this course and each worth stating plainly now that you've calibrated and run the model yourself:

1. **Log-returns are i.i.d. normal** (Lesson 17's lognormal price distribution, built from Lesson 31's Gaussian Brownian increments). Real daily equity returns have **fatter tails** than a normal distribution predicts — large moves (crashes, earnings surprises) happen more often than GBM says they should.
2. **Volatility is constant** ($\sigma$ is a single fixed number for the whole horizon). Real volatility **clusters**: calm periods and turbulent periods persist, rather than every day drawing from the same fixed-variance distribution — the motivating fact behind an entire family of models (GARCH and its relatives) that sit just beyond this course's scope.
3. **The drift $\mu$ is a single constant, estimable from historical averages.** Lesson 40 already showed this is the weakest link *numerically*, even setting aside whether it's true in principle: with two years of daily data, the volatility estimate landed close to truth while the drift estimate did not, simply because an average is a much noisier statistic than a standard deviation over the same sample size.

## Quantifying assumption #1: fat tails, directly

Lesson 13 introduced skewness and (excess) kurtosis as the third and fourth standardized moments — kurtosis in particular measures tail weight relative to the normal distribution, where excess kurtosis of exactly $0$ is the normal benchmark. Compare GBM-style normal log-returns to a deliberately fat-tailed alternative (a Student's t-distribution with few degrees of freedom, scaled to match volatility) — the kind of distribution that fits real daily equity returns far better than a normal:

```python
import numpy as np
from scipy.stats import skew, kurtosis

rng = np.random.default_rng(42)
true_sigma, dt = 0.22, 2.0 / 504

gbm_returns = rng.normal(0, true_sigma * np.sqrt(dt), size=5000)
fat_tailed_returns = rng.standard_t(df=4, size=5000) * true_sigma * np.sqrt(dt)

print(f"GBM-normal returns:   skew={skew(gbm_returns):+.3f}   excess kurtosis={kurtosis(gbm_returns):+.3f}")
print(f"fat-tailed returns:   skew={skew(fat_tailed_returns):+.3f}   excess kurtosis={kurtosis(fat_tailed_returns):+.3f}")
# GBM-normal returns:   skew=-0.015   excess kurtosis=+0.028
# fat-tailed returns:   skew=-0.357   excess kurtosis=+8.467
```

The GBM-consistent normal sample has excess kurtosis close to $0$, as it should by construction. The fat-tailed sample's excess kurtosis of about $8.5$ is a direct, numerical demonstration of exactly what "fat tails" means: a distribution that produces large moves far more often than a normal distribution would, holding the same volatility fixed. This is precisely the gap between the model built in Lesson 40 and what real daily return data looks like — GBM's math is clean and tractable, but it willingly sacrifices tail realism for that tractability, which is a reasonable trade for a first model and a dangerous one to forget you made.

## Presenting this project: a four-part structure

Whether in a portfolio write-up or an interview answer, structure the capstone the same way every well-communicated quantitative project should be structured:

1. **Problem.** State what you modeled and why GBM was the chosen model — one price process, two parameters, closed-form solution, the standard starting point for anything more elaborate.
2. **Method.** Name the exact tools: MLE on log-returns (derived from the normal MLE applied to GBM's log-return distribution) for calibration, Monte Carlo simulation (validated against the closed-form expected terminal price) for the forward projection.
3. **Results.** Report the calibrated numbers honestly, including the ones that didn't land close to truth: $\hat\sigma \approx 0.211$ against a true $0.22$; $\hat\mu \approx 0.033$ against a true $0.08$. A results section that only reports flattering numbers is far less convincing than one that reports the real gap and immediately explains it.
4. **Limitations and extensions.** Name the three assumptions audited above, and name the natural next step for each: fat tails → a Student's t or jump-diffusion return model; volatility clustering → GARCH; noisy drift estimation → either a longer data history, a Bayesian prior on $\mu$ (Lesson 19), or simply being explicit that forward price *projections* from a calibrated GBM are far more trustworthy for volatility-driven questions (option-style sensitivity, risk ranges) than for direction-driven ones (will the price go up).

An interviewer who hears you volunteer limitation #3 above — before being asked — is hearing exactly the kind of self-aware quantitative judgment that separates "ran the code" from "understands the model," which is the actual skill a quant interview is testing for.

## Where this course leaves you

This capstone deliberately stayed inside the material this course taught: calculus (Chapter 1) explained why log-returns are the natural unit of change; linear algebra (Chapter 2) underlies the covariance and PCA machinery used whenever a model expands from one asset to many; probability and statistics (Chapters 3–4) supplied the lognormal distribution and the MLE used to calibrate it; optimization (Chapter 5) is exactly what a numerical MLE solver runs when a closed form isn't available; stochastic processes (Chapter 6) supplied GBM itself and the Monte Carlo engine; and Chapter 7 sharpened the fast probabilistic reasoning that the same calibration-and-limitations judgment you just practiced draws on under interview time pressure. The honest audit in this lesson — knowing exactly what a model assumes and where it breaks — is the actual deliverable of a quant education, more so than any single formula along the way.

## Key terms

| Term | Meaning |
|---|---|
| Fat tails | A return distribution producing extreme moves more often than a normal distribution predicts |
| Volatility clustering | Real volatility persists in calm or turbulent regimes rather than staying constant |
| Excess kurtosis | The fourth standardized moment minus 3; near 0 for normal, large and positive for fat-tailed data |
| GARCH | A volatility model (beyond this course's scope) built to capture volatility clustering |
| Four-part presentation structure | Problem, method, results (including unflattering ones), limitations and extensions |

## Recap

GBM's three assumptions — normal i.i.d. log-returns, constant volatility, and a stable estimable drift — are each real simplifications, and this lesson quantified the first one directly: a fat-tailed return sample shows excess kurtosis near $8.5$ against GBM's implied $0$, a concrete measure of exactly what the model leaves out. Presenting this project well means reporting the calibration honestly (including the noisy drift estimate from Lesson 40) and naming these limitations and their natural extensions before anyone has to ask. That closes Mathematics for Quantitative Finance: forty-one lessons from the derivative's definition through a complete, self-calibrated asset-price model — the foundation the next step in the Quantitative Developer / Researcher path builds on directly.
