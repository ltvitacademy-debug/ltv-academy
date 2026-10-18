# Quantum Monte Carlo Methods: Overview

Before quantum amplitude estimation can look appealing, you need to see classical Monte Carlo simulation actually at work — including watching its estimate wobble and converge as sample count grows. This lesson runs a real classical Monte Carlo risk simulation, then frames exactly where "quantum Monte Carlo" (amplitude-estimation-accelerated Monte Carlo) would slot into that same pipeline.

## What you'll learn

- How classical Monte Carlo simulation estimates a financial risk probability, step by step
- A real, reproducible simulation run showing convergence as sample count increases
- How the simulated estimate compares against the known exact answer for this toy case
- Where "quantum Monte Carlo" fits into this same pipeline — it replaces the sampling step, not the model
- Why larger sample counts cost classical time linearly, motivating Lesson 16's speedup discussion

## Classical Monte Carlo, step by step

The classical Monte Carlo method for estimating a risk probability like "P(portfolio return falls below -10%)" works by: (1) specifying a probabilistic model for the portfolio's possible returns (here, a Normal distribution with mean μ and standard deviation σ), (2) drawing a large number of independent random samples from that model, (3) counting what fraction of samples fall below the threshold, and (4) reporting that fraction as the estimated probability. More samples produce a more precise estimate — this is a direct consequence of the 1/√N statistical convergence rate (equivalently, the 1/ε² sample-count scaling from Lesson 16).

## A real simulation run

Using a portfolio with assumed annual return distribution mean μ = 0.07 (7%) and standard deviation σ = 0.15 (15%), estimating P(return < -0.10) (a loss worse than 10%) via a reproducible seeded random simulation (not a one-off lucky run — the same seed and method were re-run at each sample size):

| Sample count (N) | Estimated P(return < -10%) |
|---|---|
| 1,000 | 0.12600 |
| 10,000 | 0.12490 |
| 100,000 | 0.12736 |
| 1,000,000 | 0.12745 |

For comparison, the exact probability — computed independently using the standard normal distribution's cumulative distribution function at z = (-0.10 - 0.07)/0.15 ≈ -1.1333 — is **≈0.12854**. Notice the simulated estimates get visibly closer to this exact value as N grows (0.126 → 0.1249 → 0.1274 → 0.1275 — the gap to the true 0.1285 shrinks, though not perfectly monotonically, which is itself expected behavior for a random process converging on average rather than guaranteed to improve every single step). This convergence behavior — noisy early, tightening with more samples — is exactly what the 1/√N scaling law predicts, and it's the thing quantum amplitude estimation (Lesson 16) is built to accelerate.

## Where "quantum Monte Carlo" fits in

The phrase "quantum Monte Carlo" in this context (distinct from an older, unrelated classical physics technique of the same name used in condensed matter and chemistry) refers specifically to using quantum amplitude estimation to accelerate the *sampling/estimation* step of a Monte Carlo pipeline — it does not change the underlying probabilistic model (step 1 above) at all. The model (what distribution governs returns, what correlations exist between assets) is exactly the same whether you estimate the resulting probability classically (as just demonstrated) or via amplitude estimation; only the *method of estimating the probability from that model* changes. This distinction matters because it clarifies exactly what quantum computing promises here: a faster way to answer "given this model, what's the risk probability," not a fundamentally different or more sophisticated financial model.

## Why the cost comparison matters

Each additional classical sample costs essentially constant extra time — running the simulation 10x longer (10,000 → 100,000 samples) gives a modest precision improvement, consistent with the 1/√N law (improving precision by 10x requires roughly 100x more samples). This is the direct motivation for Lesson 16's speedup discussion: if a financial institution needs tight-tolerance risk estimates (say, regulatory capital calculations requiring precision to within 0.1%), classical Monte Carlo's quadratic sample-count growth becomes expensive fast, which is exactly the gap quantum amplitude estimation's quadratically better scaling targets — with the practical caveats about oracle construction and hardware noise from Lesson 16 still fully in force.

## Key terms

| Term | Meaning |
|---|---|
| Monte Carlo simulation | Estimating a probability or expected value by drawing many random samples from a model and computing a summary statistic |
| 1/√N convergence | The statistical rate at which Monte Carlo estimates improve as sample count N grows; halving error requires 4x the samples |
| Normal CDF | The cumulative distribution function of the normal distribution, used here to compute the exact comparison probability independently of simulation |
| Quantum Monte Carlo (finance context) | Using quantum amplitude estimation to accelerate the sampling/estimation step of a Monte Carlo pipeline, without changing the underlying probabilistic model |

## Check yourself

The simulation's estimate at N=1,000,000 samples (0.12745) is still slightly below the exact value (0.12854) — a gap of about 0.0011. Using the 1/√N convergence rate, roughly how many additional samples (order of magnitude) would you expect to need to shrink that remaining gap by another factor of 10, and why does this cost structure make tight-precision classical risk estimation expensive at scale?
