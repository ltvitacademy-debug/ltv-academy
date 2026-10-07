# Monte Carlo Simulation

Every previous lesson in this chapter built toward one destination: pricing a derivative as a discounted expected payoff under the risk-neutral measure. This lesson puts the whole chapter to work, pricing a European call option by **Monte Carlo simulation** using the exact GBM solution from Lesson 33, checking the result against the closed-form Black-Scholes price, and reducing the simulation's noise with variance reduction.

## What you'll learn

- The Monte Carlo principle: estimating an expectation by averaging independent samples
- How to price a European call as a discounted risk-neutral expected payoff
- Why the Monte Carlo standard error shrinks only as 1/√N, and what that means practically
- Antithetic variates, a simple variance-reduction technique that cuts simulation noise for free

## The Monte Carlo principle

To estimate an expectation E[g(X)] that has no easy closed form, draw N independent samples X^(1), ..., X^(N) of X and average:

Ê = (1/N) Σ g(X^(i)) ≈ E[g(X)]

By the law of large numbers, Ê → E[g(X)] as N → ∞, and by the central limit theorem, the estimator's standard error is σ_g/√N, where σ_g is the standard deviation of g(X). This is the entire method: simulate many scenarios, average the outcome, and use the CLT to quantify how trustworthy that average is.

## Pricing a European call option

Lesson 32 established that a derivative's fair price today is its discounted expected payoff under the risk-neutral measure Q:

C_0 = e^{-rT} · E^Q[max(S_T − K, 0)]

where K is the strike and T the maturity. Lesson 33 gave the exact risk-neutral GBM solution S_T = S_0 exp[(r − ½σ²)T + σ√T · Z], with Z ~ N(0,1) (since W_T = √T·Z in distribution). Monte Carlo pricing draws many Z's, computes S_T for each, averages the discounted payoff, and reports both the price estimate and its standard error.

```python
import numpy as np
from scipy.stats import norm

S0, K, r, sigma, T = 100.0, 105.0, 0.03, 0.25, 1.0
rng = np.random.default_rng(0)
N = 500_000

Z = rng.normal(size=N)
S_T = S0 * np.exp((r - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * Z)
payoff = np.maximum(S_T - K, 0.0)
discounted = np.exp(-r * T) * payoff

price_mc = discounted.mean()
se_mc = discounted.std(ddof=1) / np.sqrt(N)
print(f"Monte Carlo price: {price_mc:.4f}  +/- {1.96*se_mc:.4f} (95% CI)")

# Closed-form Black-Scholes price, for validation
d1 = (np.log(S0/K) + (r + 0.5*sigma**2)*T) / (sigma*np.sqrt(T))
d2 = d1 - sigma*np.sqrt(T)
price_bs = S0*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)
print(f"Black-Scholes price: {price_bs:.4f}")
```

With 500,000 paths, the Monte Carlo price typically lands within a few cents of the Black-Scholes price and inside its own 95% confidence interval — direct numerical confirmation that the discounted-expectation pricing rule and the Black-Scholes PDE solution agree, as the fundamental theorem of asset pricing from Lesson 32 guarantees they must.

## Why the error shrinks slowly, and how to fight back

The standard error σ_g/√N means **quadrupling N only halves the error** — doubling precision costs four times the compute, a slow and expensive way to improve accuracy. **Antithetic variates** is a free variance-reduction trick: for every draw Z, also use its mirror image −Z, and average the two resulting discounted payoffs together before including them in the sample. Since the payoff function is nonlinear, the pair (g(Z), g(−Z)) isn't identical, but pairing them tends to cancel sampling noise (especially when the payoff is close to linear locally), reducing variance without any extra random draws beyond the pairing itself.

```python
Z_half = rng.normal(size=N // 2)
Z_anti = np.concatenate([Z_half, -Z_half])          # antithetic pairs

S_T_anti = S0 * np.exp((r - 0.5*sigma**2)*T + sigma*np.sqrt(T)*Z_anti)
payoff_anti = np.maximum(S_T_anti - K, 0.0)
# Average each pair before computing the final standard error
paired = 0.5 * (payoff_anti[:N//2] + payoff_anti[N//2:])
discounted_anti = np.exp(-r*T) * paired

price_anti = discounted_anti.mean()
se_anti = discounted_anti.std(ddof=1) / np.sqrt(N // 2)
print(f"Antithetic price: {price_anti:.4f}  +/- {1.96*se_anti:.4f} (95% CI, half the raw draws)")
```

Comparing `se_anti` to `se_mc` on the same number of underlying random draws typically shows a meaningfully tighter confidence interval — the same accuracy for less random-number overhead, which matters enormously once the payoff is too complex (path-dependent, multi-asset) for any closed form to check against at all.

## Key terms

| Term | Meaning |
|---|---|
| Monte Carlo estimator | The sample average (1/N)Σg(X^(i)), approximating E[g(X)] |
| Standard error | σ_g/√N — the Monte Carlo estimator's uncertainty, shrinking only as the square root of N |
| Risk-neutral pricing | C_0 = e^{-rT}E^Q[payoff], justified by Lesson 32's martingale argument |
| Antithetic variates | Pairing each draw Z with −Z to reduce estimator variance at no extra sampling cost |

## Recap

Monte Carlo pricing turns the abstract discounted-expectation pricing rule into a concrete algorithm: simulate risk-neutral GBM paths, average the discounted payoff, and quantify the result's uncertainty with the 1/√N standard error — validated here against the closed-form Black-Scholes price. Antithetic variates cut that uncertainty for free. This closes Chapter 6 and the stochastic processes needed for option pricing; next, Chapter 7 opens with Lesson 35, Probability Brainteasers, sharpening the probabilistic intuition this whole course has been building.
