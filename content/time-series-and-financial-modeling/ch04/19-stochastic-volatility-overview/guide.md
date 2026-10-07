# Stochastic Volatility Overview

Every model in Lessons 17-18 — ARCH, GARCH, EGARCH, GJR-GARCH — makes conditional variance a **deterministic function** of past observed data: given yesterday's shock and variance, today's variance is pinned down exactly. Stochastic volatility (SV) models take a different philosophical stance: volatility itself is a **latent random process**, driven by its own separate source of randomness. This lesson gives a conceptual overview and contrasts the two approaches.

## What you'll learn

- How stochastic volatility models differ structurally from the whole GARCH family
- The canonical discrete-time SV model specification
- Why SV models are harder to estimate than GARCH, and what that implies in practice
- A brief mention of Heston-style continuous-time SV models from options pricing

## GARCH vs. stochastic volatility: the key structural difference

In GARCH(1,1), sigma_t^2 is a known, exact function of `eps_(t-1)` and `sigma_(t-1)^2` — no new randomness enters the variance equation itself. In a stochastic volatility model, by contrast, (log) volatility follows its *own* stochastic process with its *own* shock, separate from the shock driving returns:

r_t = sigma_t * z_t,        z_t ~ N(0,1)
log(sigma_t^2) = mu + phi*(log(sigma_(t-1)^2) - mu) + eta_t,   eta_t ~ N(0, sigma_eta^2)

Here `z_t` drives the return, and a *separate* innovation `eta_t` drives log-volatility. Because volatility itself is never directly observed, even conditional on the entire observed history of returns, there is genuine residual uncertainty about its exact current value — it's a **latent variable**, not a value you can compute exactly from the data the way GARCH's sigma_t^2 is.

## Why estimation is harder

GARCH's variance equation is fully determined by observed past data, so standard maximum likelihood estimation (used by the `arch` package under the hood) is straightforward. SV models have an unobserved stochastic process sitting between the data and the likelihood, so the likelihood itself requires integrating over all possible paths of that latent volatility — a much harder computational problem. In practice, SV models are estimated with:

- **Particle filters** (sequential Monte Carlo methods that track a distribution over the latent volatility state as new data arrives)
- **Markov Chain Monte Carlo (MCMC)** methods (Bayesian approaches that sample from the joint posterior of parameters and the latent volatility path)

Neither is a one-line `model.fit()` call the way GARCH is — this additional estimation burden is the main practical reason GARCH family models remain far more common in day-to-day risk and trading desk use, even though SV models are often considered theoretically more flexible.

## A brief mention: continuous-time SV and option pricing

Stochastic volatility isn't just a discrete-time idea — the most famous application is **continuous-time** SV models used in derivatives pricing, most notably the **Heston model**, which specifies both the asset price and its variance as following coupled stochastic differential equations (the variance process is a mean-reverting square-root process). The Heston model is popular in options pricing specifically because, unlike the Black-Scholes model's constant-volatility assumption, it can reproduce the volatility "smile" observed in real options markets. Heston-style estimation and option pricing is its own specialized subfield; this lesson's goal is only to make sure you recognize the term and how it connects to the discrete-time SV idea above.

## Key terms

| Term | Meaning |
|---|---|
| Latent variable | A variable (here, true volatility) that is never directly observed, only inferred |
| Stochastic volatility (SV) | Volatility modeled as its own random process with its own shock, not a deterministic function of past data |
| Particle filter | Sequential Monte Carlo method for estimating a distribution over a latent state |
| MCMC | Markov Chain Monte Carlo; Bayesian sampling approach for parameter/latent-path estimation |
| Heston model | A continuous-time stochastic volatility model widely used in options pricing |

## Recap

GARCH makes volatility a deterministic function of past data; stochastic volatility models treat volatility as its own latent random process, which is often more flexible but much harder to estimate, typically requiring particle filters or MCMC rather than direct maximum likelihood. Next, Lesson 20 closes the chapter by putting GARCH-style forecasts to practical use in risk management.
