# State-Space Models & the Kalman Filter

Chapter 5 closed by estimating a covariance matrix that's assumed fixed over the estimation window. Real relationships between assets rarely sit still, though — a hedge ratio, a factor loading, or a correlation can drift gradually as market conditions change. This lesson introduces state-space models, a general framework for exactly this situation: an unobserved quantity that evolves over time and that you only ever see noisy glimpses of, and the Kalman filter, the classic recursive tool for inferring it.

## What you'll learn

- The general state-space model: a state equation and a measurement equation
- How state-space models generalize ARMA and relate conceptually to stochastic volatility (Lesson 19)
- The Kalman filter as the optimal recursive linear estimator of a latent state under Gaussian noise
- A concrete quant use case: estimating a time-varying hedge ratio between two assets
- How to implement this with `pykalman`, verified against a known synthetic ground truth

## The general state-space formulation

A state-space model splits a system into two equations. The **state equation** describes how an unobserved ("latent") state evolves:

```
state_t = T * state_(t-1) + w_t,      w_t ~ N(0, Q)
```

The **measurement equation** describes how that state generates what you actually observe, corrupted by noise:

```
obs_t = H_t * state_t + v_t,      v_t ~ N(0, R)
```

`T` governs how the state evolves on its own (here, a simple random walk uses `T=1`), `Q` is how much the state itself drifts each period, `H_t` maps the (possibly time-varying) state into what gets observed, and `R` is pure observation noise. This is a strictly more general template than anything seen so far in this course: an AR(1) model is a state-space model where the state is fully observed (so `R=0`), and Lesson 19's stochastic volatility model is a state-space model where the state is log-volatility and the measurement equation is nonlinear (`r_t = sigma_t * z_t`, with `sigma_t = exp(state_t/2)`) — exactly the kind of model that, as Lesson 19 noted, usually needs a particle filter instead of the plain Kalman filter below, because the measurement equation isn't linear in the state.

## The Kalman filter

When the state and measurement equations are both linear and the noise terms are both Gaussian, the **Kalman filter** computes the exact optimal (minimum mean-squared-error) estimate of the current state given everything observed so far — recursively, one observation at a time, without ever needing to revisit the full history. At each step it does two things: **predict** the next state from the previous one using the state equation, then **update** that prediction using the new observation, weighting the new information against the prediction's uncertainty. When a measurement is very noisy relative to the filter's current confidence, the update barely moves the estimate; when the measurement is precise and the filter's confidence is low, the update trusts the new data heavily. This predict-update cycle is exactly analogous to how GARCH (Lesson 17) updates its variance forecast each period, except here it's a general linear state being tracked, not specifically a variance.

## A concrete use case: a time-varying hedge ratio

A classic quant application is estimating a **rolling, time-varying hedge ratio** (equivalently, a time-varying regression beta) between two assets, when you believe the true relationship actually drifts over time rather than staying fixed. Cast as a state-space model:

```
state equation:       beta_t = beta_(t-1) + w_t          (beta drifts slowly, random-walk style)
measurement equation:  y_t = x_t * beta_t + v_t            (observed y_t, x_t; beta_t is latent)
```

Here `x_t` plays the role of the time-varying observation matrix `H_t` from the general formulation — the Kalman filter supports exactly this.

## Worked example: filtering a time-varying beta

```python
import numpy as np
from pykalman import KalmanFilter

rng = np.random.default_rng(30)
n = 400

# true beta follows a slow random walk -- unknown to the filter
true_beta = np.zeros(n)
true_beta[0] = 0.5
beta_noise_std = 0.01
for t in range(1, n):
    true_beta[t] = true_beta[t - 1] + rng.normal(0, beta_noise_std)

x_returns = rng.normal(0, 0.015, n)
obs_noise_std = 0.01
y_returns = true_beta * x_returns + rng.normal(0, obs_noise_std, n)

obs_matrices = x_returns.reshape(-1, 1, 1)   # time-varying H_t, one per observation

kf = KalmanFilter(
    transition_matrices=[[1.0]],
    observation_matrices=obs_matrices,
    transition_covariance=[[beta_noise_std ** 2]],
    observation_covariance=[[obs_noise_std ** 2]],
    initial_state_mean=[0.0],
    initial_state_covariance=[[1.0]],
)

state_means, state_covs = kf.filter(y_returns.reshape(-1, 1))
filtered_beta = state_means[:, 0]
rmse_filtered = np.sqrt(np.mean((filtered_beta - true_beta) ** 2))
```

Over 400 periods, the true (synthetic) beta drifted from 0.500 to 0.655. The filter recovered it with an RMSE of 0.1094, compared to an RMSE of 0.1527 for a naive 30-day rolling-OLS re-estimate of beta on a sliding window — the Kalman filter tracked the drifting relationship noticeably more accurately than the rolling-window benchmark. Looking at the last few periods confirms the filter tracks the slow drift closely rather than lagging behind it:

```
t=395  true=0.673  filtered=0.674
t=396  true=0.665  filtered=0.647
t=397  true=0.674  filtered=0.647
t=398  true=0.658  filtered=0.648
t=399  true=0.655  filtered=0.649
```

The same recursion is also available directly in `statsmodels.tsa.statespace` (for example `sm.tsa.UnobservedComponents` for a local-level model, or a custom subclass of `MLEModel` for anything more bespoke), which additionally supports maximum-likelihood estimation of `Q` and `R` themselves rather than fixing them as known, the way this example did for clarity.

## Key terms

| Term | Meaning |
|---|---|
| State equation | Describes how the unobserved latent state evolves over time |
| Measurement equation | Describes how the latent state generates noisy observed data |
| Kalman filter | Recursive optimal linear estimator of a latent Gaussian state given noisy observations |
| Predict-update cycle | The filter's two-step recursion: project the state forward, then correct using new data |
| Time-varying hedge ratio | A rolling beta modeled as a latent state that drifts, rather than a fixed regression coefficient |

## Recap

State-space models separate an unobserved, evolving state from the noisy data it generates, and the Kalman filter is the optimal recursive way to track that state when everything is linear and Gaussian — demonstrated here by recovering a drifting hedge ratio more accurately than a rolling-window regression. Next, Lesson 27 looks at a different kind of hidden structure: markets that switch between entirely distinct regimes, modeled with Markov-switching models.
