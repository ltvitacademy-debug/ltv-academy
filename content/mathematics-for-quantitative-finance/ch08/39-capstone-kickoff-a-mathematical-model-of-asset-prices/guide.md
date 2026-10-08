# Capstone Kickoff: A Mathematical Model of Asset Prices

This course opened with a derivative as a rate of change and has since built through linear algebra, probability, statistics, optimization, and stochastic processes. The capstone spends its three lessons doing one thing end to end: building, calibrating, and presenting a real mathematical model of an asset price, using nothing beyond what this course itself taught. This lesson frames the problem precisely before any code is written — what the model is, which earlier lessons it draws on, and what "done" looks like.

## What you'll learn

- The modeling problem this capstone solves, stated precisely
- Why geometric Brownian motion (GBM) is the natural model to calibrate, given everything Chapters 1–6 covered
- Exactly which earlier lessons supply each piece of the pipeline (log-returns, MLE, Monte Carlo)
- How to generate a reproducible "real-shaped" dataset to calibrate against, since no live market feed is assumed
- The three-lesson plan: kickoff (this lesson) → build → wrap-up and presentation

## The problem, stated precisely

**Goal.** Given a history of an asset's daily prices, estimate the parameters of a geometric Brownian motion model that describes how the price evolves, then use the calibrated model to simulate and summarize the distribution of future prices.

This is exactly the three-step pipeline a junior quant is asked to execute in a first real assignment: (1) choose a model, (2) fit it to data, (3) use the fitted model to answer a forward-looking question ("what does the distribution of the price look like in one year?"). Nothing here requires option payoffs or hedging — this capstone stops at the model and its simulated output, deliberately staying inside the material Chapters 1 through 7 actually covered.

## Why geometric Brownian motion is the right model to calibrate

Lesson 31 (Brownian Motion) and Lesson 33 (Stochastic Calculus & Itô's Lemma) built up to geometric Brownian motion as the standard continuous-time model for a price that can't go negative and whose *percentage* moves (not dollar moves) are the natural unit of randomness — consistent with Lesson 1's observation that a derivative of $\ln(S)$ is $1/S$, so proportional changes are what matters. GBM says the price $S_t$ satisfies the stochastic differential equation

$$dS_t = \mu S_t \, dt + \sigma S_t \, dW_t$$

with closed-form solution (from Itô's lemma applied to $\ln S_t$, Lesson 33):

$$S_t = S_0 \exp\left[\left(\mu - \tfrac{1}{2}\sigma^2\right)t + \sigma W_t\right]$$

Two unknown parameters drive everything: $\mu$ (the drift, or average rate of growth) and $\sigma$ (the volatility). The entire capstone is about estimating these two numbers from data and then using them.

## Where each earlier lesson plugs in

| Step | Tool | Lesson |
|---|---|---|
| Convert raw prices to the right scale | Log-returns $r_t = \ln(S_t/S_{t-1})$ | Lesson 1 (derivative of $\ln S$), Lesson 17 (lognormal distribution) |
| Recognize the distribution of log-returns under GBM | $r_t \sim N\big((\mu-\tfrac12\sigma^2)\Delta t,\ \sigma^2 \Delta t\big)$ | Lesson 31 (Brownian increments), Lesson 33 (Itô's lemma) |
| Estimate $\mu$ and $\sigma$ from a sample of log-returns | Maximum Likelihood Estimation | Lesson 18 |
| Quantify uncertainty in the forward price distribution | Simulating many Monte Carlo paths | Lesson 34 |
| Judge whether the model's assumptions are reasonable | Mean, variance, skewness, kurtosis diagnostics | Lesson 13 (moments), Lesson 23 (bootstrap, optionally) |

Nothing in this table is new — the capstone's only job is to assemble pieces you've already built, in the order a real calibration project actually uses them.

## Building a reproducible dataset to calibrate against

Since this course doesn't assume a live data feed, the capstone calibrates against a **synthetic but realistically-generated** price history: a path simulated from a GBM with parameters chosen in advance ($\mu=8\%$/year, $\sigma=22\%$/year — reasonable numbers for a single equity) and then "forgotten," so Lesson 40 can estimate them back out from the data alone and check the recovery. This is exactly the discipline statisticians call a **recovery study**: simulate from known truth, then verify your estimation procedure gets close to that truth.

```python
import numpy as np

rng = np.random.default_rng(42)

true_mu, true_sigma = 0.08, 0.22       # annualized drift and volatility (kept secret from Lesson 40's estimator)
S0, T, n_days = 100.0, 2.0, 504        # 2 years of daily data, ~252 trading days/year
dt = T / n_days

Z = rng.normal(size=n_days)
log_returns = (true_mu - 0.5 * true_sigma**2) * dt + true_sigma * np.sqrt(dt) * Z
S = np.concatenate([[S0], S0 * np.exp(np.cumsum(log_returns))])

print(f"simulated {n_days} daily prices")
print(f"start price: {S[0]:.2f}   end price: {S[-1]:.2f}")
print(f"min: {S.min():.2f}   max: {S.max():.2f}")
# simulated 504 daily prices
# start price: 100.00   end price: 102.14
# min: 80.86   max: 121.67
```

This two-year, 504-point daily price series (saved as the array `S`) is the dataset Lesson 40 calibrates against. Notice the price wandered between about 81 and 122 over two years despite an 8%/year average drift — a first hint that a single two-year window carries a lot of noise relative to the drift signal, a point Lesson 41 returns to when discussing the model's limitations.

## The plan for the next two lessons

1. **Lesson 40 (Build It)**: derive and implement the MLE formulas for $\hat\mu$ and $\hat\sigma$ from log-returns, run them on the dataset above, check the recovered parameters against the true ones, then simulate 50,000 one-year-forward Monte Carlo paths from the calibrated model and summarize the resulting price distribution.
2. **Lesson 41 (Wrap-Up & Portfolio Presentation)**: compare the model's assumptions against what's known about real markets (fat tails, volatility clustering), and lay out how to present this exact project — problem, method, results, limitations — as a portfolio piece for interviews.

## Key terms

| Term | Meaning |
|---|---|
| Geometric Brownian motion (GBM) | $dS_t = \mu S_t\,dt + \sigma S_t\,dW_t$, the standard continuous-time asset-price model |
| Drift, $\mu$ | The average rate of growth in the GBM model |
| Volatility, $\sigma$ | The standard deviation of the GBM model's randomness, per unit time |
| Log-return | $r_t = \ln(S_t/S_{t-1})$, the natural unit of change under GBM |
| Recovery study | Simulating data from known parameters to verify an estimation procedure recovers them |

## Recap

The capstone's task is precise: calibrate a geometric Brownian motion's drift and volatility from log-returns using MLE, then use the fitted model to simulate a forward price distribution via Monte Carlo — a pipeline built entirely from Lessons 1, 13, 17, 18, 31, 33, and 34. This lesson generated the reproducible synthetic price history that Lesson 40 will calibrate against, deliberately hiding the true parameters so the next lesson can test whether its estimation procedure finds its way back to them. Next up, Lesson 40: Capstone — Build It, where the estimation and simulation pipeline gets implemented and run.
