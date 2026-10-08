# Capstone: Build It

Lesson 39 framed the problem and generated a reproducible two-year, 504-day synthetic price history from a geometric Brownian motion with drift $\mu=8\%$/year and volatility $\sigma=22\%$/year — numbers the estimation procedure below is not allowed to see directly. This lesson derives the maximum likelihood estimators for $\mu$ and $\sigma$ from log-returns, runs them on that dataset, checks what comes back against the hidden truth, and then simulates the calibrated model's one-year-forward price distribution by Monte Carlo.

## What you'll learn

- How to derive the MLE for GBM's drift and volatility from the log-return distribution
- How to implement that estimator and interpret what it recovers
- Why the volatility estimate is reliable but the drift estimate is noisy, even with two full years of daily data
- How to simulate the calibrated model's forward price distribution via Monte Carlo and report it with a confidence interval

## Deriving the MLE for GBM's parameters

Under GBM, log-returns over a time step $\Delta t$ are i.i.d. normal (Lesson 31, Lesson 33):

$$r_t = \ln\!\left(\frac{S_t}{S_{t-1}}\right) \sim N\!\Big(\big(\mu - \tfrac{1}{2}\sigma^2\big)\Delta t,\ \ \sigma^2 \Delta t\Big)$$

Lesson 18 already derived the MLE for a normal sample's mean and variance: the sample mean and the (divide-by-$n$) sample variance. Here the "mean" of the normal distribution is $\big(\mu-\tfrac12\sigma^2\big)\Delta t$ and the "variance" is $\sigma^2 \Delta t$, so plugging Lesson 18's normal MLEs directly into those two relationships and solving for $\sigma$ and $\mu$ gives:

$$\hat\sigma = \sqrt{\frac{\widehat{\mathrm{Var}}(r)}{\Delta t}}, \qquad \hat\mu = \frac{\bar r}{\Delta t} + \frac{1}{2}\hat\sigma^2$$

where $\bar r$ and $\widehat{\mathrm{Var}}(r)$ are the sample mean and (biased, divide-by-$n$) sample variance of the observed log-returns. Note the $+\tfrac12\hat\sigma^2$ correction on $\hat\mu$: the raw annualized mean log-return estimates $\mu - \tfrac12\sigma^2$, not $\mu$ itself, so you must add the volatility-drag term back to recover $\mu$.

## Implementing and running the estimator

```python
import numpy as np

# --- Reproduce Lesson 39's dataset exactly ---
rng = np.random.default_rng(42)
true_mu, true_sigma = 0.08, 0.22                  # hidden from the estimator below
S0, T, n_days = 100.0, 2.0, 504
dt = T / n_days

Z = rng.normal(size=n_days)
log_returns_sim = (true_mu - 0.5 * true_sigma**2) * dt + true_sigma * np.sqrt(dt) * Z
S = np.concatenate([[S0], S0 * np.exp(np.cumsum(log_returns_sim))])

# --- The estimator only sees price levels S, nothing else ---
r = np.diff(np.log(S))                             # observed log-returns
sigma_hat = r.std(ddof=0) / np.sqrt(dt)             # MLE volatility
mu_hat = r.mean() / dt + 0.5 * sigma_hat**2         # MLE drift (with the 0.5*sigma^2 correction)

print(f"recovered sigma_hat: {sigma_hat:.4f}   true sigma: {true_sigma:.2f}")
print(f"recovered mu_hat:    {mu_hat:.4f}   true mu:    {true_mu:.2f}")
# recovered sigma_hat: 0.2114   true sigma: 0.22
# recovered mu_hat:    0.0329   true mu:    0.08
```

The volatility estimate, $\hat\sigma \approx 0.211$, lands close to the true $0.22$. The drift estimate, $\hat\mu \approx 0.033$, is far from the true $0.08$ — not a bug, but the expected and important result: volatility is estimated from the *spread* of 504 daily observations (plenty of information), while drift is estimated from their *average*, and a two-year window is simply too short a time to pin down an average growth rate against the noise of day-to-day volatility. This exact gap — reliable $\hat\sigma$, unreliable $\hat\mu$ — is one of the most consequential facts in quantitative finance, and Lesson 41 returns to it directly when discussing the model's limitations.

## Simulating the calibrated model's forward price distribution

With $\hat\mu$ and $\hat\sigma$ in hand, Lesson 34's Monte Carlo machinery projects the price forward one year from today's level $S_T$ (the last price in the dataset), and the Central Limit Theorem (Lesson 15) is what guarantees the sample mean of many simulated paths is itself a trustworthy estimate of the true expected forward price:

```python
n_sims, horizon_days = 50_000, 252                  # one year forward, daily steps
dt_fwd = 1.0 / horizon_days

Z_fwd = rng.normal(size=(n_sims, horizon_days))
log_path_returns = (mu_hat - 0.5 * sigma_hat**2) * dt_fwd + sigma_hat * np.sqrt(dt_fwd) * Z_fwd
S_T = S[-1] * np.exp(log_path_returns.sum(axis=1))  # terminal price after 1 simulated year

print(f"last observed price: {S[-1]:.2f}")
print(f"MC forward 1yr -> mean: {S_T.mean():.2f}   median: {np.median(S_T):.2f}   std: {S_T.std():.2f}")

theory_mean = S[-1] * np.exp(mu_hat * 1.0)
print(f"theory E[S_T] = S_last * exp(mu_hat * 1yr): {theory_mean:.2f}")
# last observed price: 102.14
# MC forward 1yr -> mean: 105.59   median: 103.30   std: 22.58
# theory E[S_T] = S_last * exp(mu_hat * 1yr): 105.56
```

The simulated mean terminal price ($105.59$) matches the closed-form theoretical expectation $S_{\text{last}}\cdot e^{\hat\mu \cdot 1\text{yr}} = 105.56$ almost exactly — direct numerical confirmation that the Monte Carlo engine is implementing the GBM solution correctly (exactly the same validation style Lesson 34 used against Black-Scholes). Note also that the **mean** ($105.59$) exceeds the **median** ($103.30$): GBM's terminal price is lognormally distributed (Lesson 17), which is right-skewed, so the average outcome is pulled above the typical outcome by the same rare-large-gain asymmetry that log-returns, not raw returns, are built to handle cleanly.

## Key terms

| Term | Meaning |
|---|---|
| MLE for GBM | $\hat\sigma=\sqrt{\widehat{\mathrm{Var}}(r)/\Delta t}$, $\hat\mu=\bar r/\Delta t + \tfrac12\hat\sigma^2$ |
| Volatility drag | The $-\tfrac12\sigma^2$ term separating a log-return's mean from the drift $\mu$ |
| Drift estimation risk | Volatility is reliably estimated from short samples; drift generally is not |
| Terminal price distribution | Lognormal under GBM, right-skewed, so mean exceeds median |

## Recap

The GBM MLE reduces to Lesson 18's normal-distribution MLE applied to log-returns, recovering volatility reliably ($\hat\sigma=0.211$ vs. true $0.22$) but drift unreliably ($\hat\mu=0.033$ vs. true $0.08$) from two years of daily data — and the calibrated model's Monte Carlo-simulated forward price distribution matches its own closed-form expectation almost exactly, validating the simulation engine itself. Next up, Lesson 41: Capstone — Wrap-Up & Portfolio Presentation, which confronts the drift-estimation gap head-on as a real model limitation and covers how to present this project for a portfolio or interview.
