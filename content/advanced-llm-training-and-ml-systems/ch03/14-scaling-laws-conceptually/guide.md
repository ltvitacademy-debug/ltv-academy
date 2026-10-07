# Scaling Laws, Conceptually

Chapter 2 was about getting clean, well-mixed tokens ready to train on. This lesson switches to the question that decides how you spend your compute budget once you actually start pretraining: as you make a model bigger, train it on more data, or throw more compute at it, how much better does it actually get — and can you predict that in advance? The surprising empirical answer is yes, within limits, and the relationships that let you predict it are called scaling laws.

## What you'll learn

- What a scaling law is, and why loss follows a power law rather than a straight line
- The three axes researchers scale independently: model parameters (N), dataset size (D), and compute (C)
- How the Kaplan et al. (2020) scaling-law results are read and used in practice
- Why scaling laws let you extrapolate from small, cheap runs to decisions about expensive, large ones
- The limits of scaling laws — what they predict well, and what they don't

## What a scaling law actually is

A scaling law is an empirical relationship: if you plot test loss against model size (or data size, or compute) on log-log axes, the points fall close to a straight line. A straight line on log-log axes means the underlying relationship is a power law — loss decreases as a power of the scaled quantity, with no obvious bend or plateau over several orders of magnitude. That lack of a plateau is the headline result: within the ranges studied, bigger keeps helping, predictably, instead of running into a wall.

The canonical form researchers fit looks like this, for loss `L` as a function of parameter count `N` (holding data and compute effectively unconstrained):

```text
L(N) ≈ (N_c / N) ^ alpha_N
```

`N_c` and `alpha_N` are constants fit from many training runs at different sizes. The same style of fit applies to dataset size `D` and compute `C`, each with its own exponent. The exponents are small (typically well under 1), which is why progress is real but shows diminishing returns — a 10x increase in parameters buys a noticeably smaller loss improvement than the 10x before it, even though it never fully stops helping.

## The three axes: N, D, C

Kaplan et al.'s 2020 paper, "Scaling Laws for Neural Language Models," is the foundational study here. It trained a large family of transformer language models varying three things independently:

- **N — non-embedding parameter count.** The size of the model itself.
- **D — dataset size.** How many tokens the model is trained on.
- **C — compute.** Roughly, `C ≈ 6 * N * D` FLOPs for a single forward-and-backward pass over `D` tokens with an `N`-parameter model — the factor of 6 comes from 2 FLOPs per parameter per token for the forward pass and 4 for the backward pass.

The key early finding was that loss as a function of any one of these, with the others held "sufficiently large," follows a clean power law over many orders of magnitude of scale. That gave the field confidence that making models and datasets bigger wasn't a game of diminishing, unpredictable returns — it was a game with a predictable exchange rate.

## Why this matters practically

The practical payoff is extrapolation. You cannot afford to train twenty different full-scale candidate models just to see which pretraining configuration wins — a frontier run can cost millions of dollars in compute. Instead, teams train a ladder of much smaller models (a few million to a few hundred million parameters) at various sizes and data budgets, fit the scaling-law curve to those cheap runs, and extrapolate the fitted curve out to the size they actually intend to train. This is exactly how teams decide, before spending the big budget, roughly what loss (and therefore roughly what downstream capability) a planned large run should land at.

This lesson deliberately stays at the conceptual, single-axis level — "loss predictably falls as N, D, or C grow." The far more actionable version of this question, "given a fixed compute budget, what's the best split between N and D?", is the compute-optimal frontier, and it's the entire subject of the next lesson on the Chinchilla trade-off.

## The limits of scaling laws

Scaling laws predict pretraining loss, not downstream task performance directly, and not every capability improves smoothly — some abilities appear suddenly once a model crosses a size threshold (often called emergent behavior), which a smooth loss curve doesn't obviously forecast. The laws are also fit within a studied range; extrapolating far outside the range that was actually measured carries real risk, and architecture, tokenizer, or data-distribution changes can shift the constants. Scaling laws are a powerful planning tool, not a guarantee.

## Key terms

- **Scaling law** — an empirical power-law relationship between loss and a scaled quantity (parameters, data, or compute)
- **Power law** — a relationship of the form `y = a * x^b`; appears as a straight line on log-log axes
- **N, D, C** — the three scaling axes: parameter count, dataset size (tokens), and compute (FLOPs)
- **Compute-optimal frontier** — the best split of a fixed compute budget between N and D (covered next lesson)
- **Emergent behavior** — a capability that appears abruptly at some scale rather than improving smoothly
