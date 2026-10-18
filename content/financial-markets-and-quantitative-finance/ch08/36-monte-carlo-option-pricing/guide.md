# Monte Carlo Option Pricing

Lesson 14 derived Black-Scholes in closed form; Lesson 17 mentioned Monte Carlo as the right tool once a payoff gets too complex for a closed-form solution, without actually building one. This lesson builds a real Monte Carlo pricer — first validating it against Black-Scholes on a plain European option (proving it's correct), then extending it to a path-dependent payoff Black-Scholes can't price at all.

## What you'll learn

- How to simulate risk-neutral stock price paths under geometric Brownian motion
- How to price a European call via Monte Carlo, and validate it against the closed-form Black-Scholes price
- How to extend the same simulation to an Asian option — a genuinely path-dependent payoff
- Why the Asian option is reliably cheaper than the European option on identical underlying parameters, and why that's not a coincidence

## Simulating risk-neutral price paths

Lesson 31-33 of the Mathematics for Quantitative Finance course covers the stochastic calculus behind this; here's the practical result. Under the risk-neutral measure, a stock price following geometric Brownian motion evolves as:

```python
import numpy as np

rng = np.random.default_rng(36)

S0 = 100.0      # current stock price
K = 100.0        # strike price
r = 0.03          # risk-free rate
sigma = 0.25       # volatility
T = 1.0             # time to expiry, years

n_paths = 100_000

# Simulate the terminal price directly (no need for intermediate steps
# for a European option, since only S_T matters)
Z = rng.standard_normal(n_paths)
S_T = S0 * np.exp((r - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * Z)
```

The `(r - 0.5*sigma**2)*T` drift term and `sigma*sqrt(T)*Z` diffusion term are exactly the closed-form solution to the geometric Brownian motion SDE from Lesson 33 of the math course — this isn't a separate model, it's the same one, just sampled rather than integrated analytically.

## Pricing and validating against Black-Scholes

```python
payoff = np.maximum(S_T - K, 0)
mc_price = np.exp(-r * T) * payoff.mean()
print(f"Monte Carlo call price: {mc_price:.4f}")
```

```
Monte Carlo call price: 11.4214
```

Lesson 14's closed-form Black-Scholes price for these exact parameters is **11.3485**. The Monte Carlo estimate (11.4214) is close but not identical — a difference of about 0.07, which is normal Monte Carlo sampling error at 100,000 paths, not a bug. This validation step matters: before trusting a Monte Carlo pricer on a payoff where you *can't* check against a closed form, confirm it reproduces the closed form on one where you can. A pricer that's off by a large margin here has a real bug, not just sampling noise.

## Extending to a path-dependent payoff: the Asian option

A **European option** only cares about the price at expiry. An **Asian option** pays based on the *average* price over the option's life — a genuinely different payoff that has no simple closed-form solution the way vanilla Black-Scholes does, and exactly the kind of payoff Monte Carlo exists for. Pricing it requires simulating the full path, not just the terminal price:

```python
n_steps = 50
dt = T / n_steps
n_paths = 50_000

S = np.full(n_paths, S0)
path_sum = np.zeros(n_paths)

for _ in range(n_steps):
    Z = rng.standard_normal(n_paths)
    S = S * np.exp((r - 0.5 * sigma**2) * dt + sigma * np.sqrt(dt) * Z)
    path_sum += S

average_price = path_sum / n_steps
euro_payoff = np.maximum(S - K, 0)              # S here is now S_T, the final step
asian_payoff = np.maximum(average_price - K, 0)

euro_price = np.exp(-r * T) * euro_payoff.mean()
asian_price = np.exp(-r * T) * asian_payoff.mean()

print(f"European call (via full path): {euro_price:.4f}")
print(f"Asian (arithmetic average) call: {asian_price:.4f}")
print(f"Asian is cheaper by: {euro_price - asian_price:.4f} ({(euro_price-asian_price)/euro_price:.1%})")
```

```
European call (via full path): 11.1733
Asian (arithmetic average) call: 6.4244
Asian is cheaper by: 4.7489 (42.5%)
```

(The European price here differs slightly from the direct-terminal-price version above — same model, different random draws and a discretized path instead of an exact terminal sample, both legitimate sources of small Monte Carlo variation.)

## Why the Asian option is reliably cheaper, not just cheaper this one time

This isn't a fluke of this particular simulation — it's a structural property worth being able to explain, since it's a frequent interview follow-up. **Averaging reduces variance.** The average of many correlated-but-not-identical price points over the option's life has lower variance than the single terminal price alone — and since a call option's value comes entirely from the upside tail of its underlying's distribution, anything that shrinks that distribution's variance (without changing its mean) shrinks the option's value. The Asian option's payoff is based on a smoothed, lower-variance quantity; the European option's payoff is based on the raw, full-variance terminal price. Same underlying, same volatility parameter, structurally different (and cheaper) option.

## Key terms

| Term | Meaning |
|---|---|
| Risk-neutral simulation | Simulating price paths under the risk-neutral drift, so simple discounting gives a fair price |
| Path-dependent payoff | An option payoff (like Asian) that depends on the full price path, not just the terminal price |
| Monte Carlo validation | Confirming a simulation reproduces a known closed-form answer before trusting it on a payoff with no closed form |

## Check yourself

Why is averaging reduces variance the real structural reason an Asian call is cheaper than an otherwise-identical European call, rather than just an empirical coincidence of this one simulation?
