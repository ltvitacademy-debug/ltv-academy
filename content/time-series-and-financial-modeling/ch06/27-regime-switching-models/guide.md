# Regime-Switching Models

Lesson 26's Kalman filter assumed a state that drifts smoothly and continuously. Markets often behave differently — they seem to sit in one distinct mode (calm, trending) for a while, then abruptly flip into another (turbulent, crashing), rather than gliding gradually between the two. This lesson covers regime-switching models, built specifically to capture that kind of discrete, jumpy structure.

## What you'll learn

- Why markets are often better described as alternating between distinct regimes than drifting smoothly
- The Markov-switching framework and the transition probability matrix
- Hamilton's Markov-switching model, conceptually
- How to fit a 2-regime Markov-switching model with `statsmodels`
- How to recover regime probabilities and compare them against known ground truth

## Markets as alternating regimes

A "regime" is a period during which a return series' statistical properties — its mean, its volatility, sometimes its autocorrelation — are roughly stable, followed by a switch to a different, also roughly stable, set of properties. The classic example is calm/bull markets (modest positive drift, low volatility) alternating with turbulent/bear markets (flat-to-negative drift, high volatility). A single GARCH model can capture volatility that rises and falls continuously, but it can't represent an abrupt, discrete jump between two qualitatively different states the way a regime-switching model can.

## The Markov-switching framework

**Hamilton's Markov-switching model** (1989) assumes an unobserved discrete state `S_t` (the regime) that follows a Markov chain — meaning the probability of being in a given regime next period depends only on the *current* regime, not on how long you've already been in it or anything further in the past:

```
P(S_t = j | S_(t-1) = i) = p_ij      (the transition probability matrix)
```

For a 2-regime model, this is a 2x2 matrix of transition probabilities (`p_00`, `p_01`, `p_10`, `p_11`, with each row summing to 1). Conditional on the current regime, returns are drawn from a regime-specific distribution:

```
r_t | S_t = k   ~   N(mu_k, sigma_k^2)
```

Each regime gets its own mean and its own variance (and, in richer versions, its own autocorrelation structure). The model doesn't observe `S_t` directly — it's inferred, exactly like the Kalman filter's latent state in Lesson 26, except here the latent state is discrete (which regime) rather than continuous, and the model is fit by maximum likelihood rather than by a Kalman recursion.

## Worked example: fitting a 2-regime Markov-switching model

```python
import numpy as np
import pandas as pd
from statsmodels.tsa.regime_switching.markov_regression import MarkovRegression

rng = np.random.default_rng(50)
n = 600

# simulate a true 2-regime Markov chain: 0 = calm, 1 = turbulent
p_stay_calm, p_stay_turbulent = 0.97, 0.95
true_regime = np.zeros(n, dtype=int)
for t in range(1, n):
    if true_regime[t - 1] == 0:
        true_regime[t] = 0 if rng.random() < p_stay_calm else 1
    else:
        true_regime[t] = 1 if rng.random() < p_stay_turbulent else 0

mu = np.array([0.0006, -0.0010])
sigma = np.array([0.006, 0.022])
returns = mu[true_regime] + sigma[true_regime] * rng.normal(0, 1, n)

model = MarkovRegression(pd.Series(returns), k_regimes=2, trend="c", switching_variance=True)
res = model.fit()

smoothed_probs = res.smoothed_marginal_probabilities
fitted_sigma2 = [res.params[f"sigma2[{i}]"] for i in range(2)]
turbulent_idx = int(np.argmax(fitted_sigma2))
predicted_regime = (smoothed_probs[turbulent_idx] > 0.5).astype(int)
accuracy = (predicted_regime.values == true_regime).mean()
```

The model recovered both regimes closely:

```
Regime 0 (calm):      const = 0.0006  (true 0.0006)   sigma^2 = 3.64e-05 -> sigma = 0.0060 (true 0.0060)
Regime 1 (turbulent): const = -0.0022 (true -0.0010)   sigma^2 = 4.38e-04 -> sigma = 0.0209 (true 0.0220)
p[0->0] = 0.988  (true 0.970)        p[1->1] = 0.952  (true 0.950)

Classification accuracy vs. true simulated regime: 97.7%
Fraction of time in turbulent regime -- true: 0.208, fitted: 0.208
```

The fitted volatilities in each regime landed very close to their true values, and the transition probabilities were recovered almost exactly. The fitted mean in the turbulent regime (-0.0022) overshot the true value (-0.0010) and wasn't statistically distinguishable from zero on its own (the turbulent regime has far fewer observations and much higher variance, making its mean harder to pin down precisely) — but despite that, the model still classified 97.7% of all 600 periods into the correct regime, because the volatility difference between the two regimes was large and easy to detect even when the mean difference was noisy. Note that `statsmodels` doesn't guarantee which fitted index corresponds to "calm" versus "turbulent," so real code should identify them after fitting — here, by checking which regime has the larger fitted variance.

## Key terms

| Term | Meaning |
|---|---|
| Regime | A period with roughly stable statistical properties (mean, volatility) distinct from other periods |
| Markov chain | A process where the next state's probability depends only on the current state |
| Transition probability matrix | `p_ij`, the probability of moving from regime `i` to regime `j` next period |
| Hamilton's Markov-switching model | Regime-dependent means/variances with Markov-governed regime transitions |
| Smoothed probability | The model's estimated probability of being in each regime at each point in time |

## Recap

Regime-switching models capture the discrete, jumpy structure of markets alternating between distinct states, using a Markov chain to govern transitions and regime-specific distributions for returns — and in the worked example, large volatility differences between regimes let the model classify periods correctly 97.7% of the time even when the mean difference was harder to pin down. Next, Lesson 28 closes this chapter by looking at how multiple assets depend on each other beyond simple linear correlation, using copulas.
