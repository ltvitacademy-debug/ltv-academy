# Quantum Amplitude Estimation for Risk Analysis

Risk analysis in finance — estimating the probability of a large loss, or a Value-at-Risk threshold — is fundamentally a probability-estimation problem, and classical Monte Carlo simulation (Lesson 17) is the default tool. Quantum amplitude estimation (QAE) targets exactly this probability-estimation step with a provable speedup in query count. This lesson explains the speedup precisely, and just as precisely bounds what it does and doesn't promise.

## What you'll learn

- What amplitude estimation estimates, and how it connects to a risk probability like "P(loss exceeds threshold)"
- The precision-scaling comparison between classical Monte Carlo and quantum amplitude estimation, computed directly
- Why the speedup is described as "quadratic," with exact numbers showing what that means in practice
- What "oracle query" means here, and why it is not the same thing as "one second of runtime"
- The honest gap between this theoretical speedup and anything demonstrated on real finance problems today

## What amplitude estimation estimates

Amplitude estimation is a quantum algorithm for estimating an unknown probability (or more generally, an amplitude) a, given access to a quantum operation ("oracle") that prepares a state encoding a as a measurable probability. In a risk-analysis context, a might represent "the probability that a simulated portfolio loss exceeds some threshold" — exactly the quantity classical Monte Carlo (Lesson 17) also estimates, just by averaging over many random samples instead. The quantum algorithm doesn't sample randomly; it uses quantum interference (via a subroutine related to Grover's algorithm) to concentrate the final measurement distribution around the true value of a, in a way that gets more precise much faster than naive repeated sampling.

## The precision-scaling comparison, computed exactly

Define the target precision ε (epsilon) as how close your estimate needs to be to the true probability. The classical Monte Carlo approach needs roughly **1/ε²** samples to achieve precision ε (this is the standard statistical fact behind the "law of large numbers" — halving your error bar requires quadrupling your sample count). Quantum amplitude estimation needs roughly **1/ε** oracle queries for the same precision — a direct, computed comparison across three precision targets:

| Target precision ε | Classical samples needed (~1/ε²) | Quantum oracle queries needed (~1/ε) | Speedup factor |
|---|---|---|---|
| 0.1 | 100 | 10 | 10× |
| 0.01 | 10,000 | 100 | 100× |
| 0.001 | 1,000,000 | 1,000 | 1,000× |

These numbers were computed directly from the two scaling laws (1/ε² vs. 1/ε), not estimated — and the pattern is clear: as you demand tighter precision, the gap between classical sample count and quantum query count widens, because one scales quadratically worse than the other. This is exactly why the speedup is called **quadratic**: quantum query count scales like the square root of classical sample count (1/ε vs. (1/ε)² — or equivalently, classical needs N samples where quantum needs roughly √N queries).

## What "oracle query" actually means

This is the part most easily overstated. An "oracle query" in amplitude estimation is one call to a quantum circuit that encodes your probability model — in a risk-analysis setting, that circuit would need to encode the entire simulated financial model (the distribution of possible portfolio outcomes) as a quantum state preparation routine. Building that oracle circuit at all, for a model complex enough to be practically useful, is itself a nontrivial circuit-design problem, and each oracle query still requires running a real quantum circuit with real gates subject to real hardware noise and error rates — exactly the limitations discussed throughout Chapters 2 and 3. A "1,000x fewer queries" headline number does not mean "1,000x less wall-clock time" once you account for how much more expensive a single quantum oracle query currently is, in practice, compared to a single classical random sample (which, on classical hardware, might take nanoseconds).

## The honest gap

Quantum amplitude estimation's quadratic speedup is a real, mathematically proven result — not a vague marketing claim. What has **not** been demonstrated is this speedup translating into a faster wall-clock risk calculation on a real financial model, on real quantum hardware, compared to a well-optimized classical Monte Carlo implementation. The theoretical query-count advantage requires a fault-tolerant (heavily error-corrected) quantum computer at a scale well beyond what exists today to actually realize its practical benefit — current noisy hardware's per-query error rates and the overhead of building a useful financial oracle circuit both eat into, and can eliminate, the theoretical advantage at today's hardware scale. This exact distinction — a proven theoretical speedup versus a demonstrated practical one — is the organizing question for Chapter 5's entire benchmarking discussion, and quantum finance is one of the clearest places to see why that distinction matters.

## Key terms

| Term | Meaning |
|---|---|
| Amplitude estimation | A quantum algorithm estimating an unknown probability/amplitude using quantum interference rather than random sampling |
| Oracle query | One call to the quantum circuit encoding the probability model being estimated; not equivalent to one classical sample in cost |
| Quadratic speedup | The scaling relationship where quantum query count (~1/ε) is roughly the square root of classical sample count (~1/ε²) |
| Fault-tolerant quantum computer | A heavily error-corrected quantum computer, well beyond current hardware scale, required to realize amplitude estimation's full theoretical advantage |
| Value-at-Risk (VaR) | A risk metric describing the probability of a portfolio loss exceeding a given threshold; a natural target for amplitude estimation |

## Check yourself

A risk team wants to estimate P(portfolio loss exceeds 10%) to within ε = 0.001 precision. Using the table in this lesson, state the classical sample count and quantum query count needed, and then explain — in your own words — why reporting only "quantum needs 1,000x fewer queries" without further qualification would be a misleading summary of this technology's current practical readiness.
