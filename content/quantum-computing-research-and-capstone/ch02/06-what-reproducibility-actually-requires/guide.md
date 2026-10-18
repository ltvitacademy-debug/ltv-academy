# What Reproducibility Actually Requires

"Reproduce this result" sounds like a single well-defined task. In practice it hides several distinct, sometimes conflicting goals — and knowing which one you're actually attempting changes everything about how you'd approach it.

## What you'll learn

- The difference between reproducibility, replicability, and robustness — three related but distinct goals
- Why quantum computing has a specific, extra reproducibility challenge that classical software research doesn't: the hardware itself isn't fixed
- What a paper needs to provide for a result to be reproducible at all, and how often that's actually missing
- A realistic tiering of reproduction goals, from easiest to hardest, so you can set an honest target
- Why attempting reproduction is one of the most valuable exercises in applied research, independent of whether it succeeds

## Three related but distinct goals

- **Reproducibility**: using the *original* code and *original* data (or data generation process), can you get the *same* result? This tests whether the paper's own pipeline, run again, behaves as described.
- **Replicability**: using a *new, independent* implementation of the described method, applied to the *same or equivalent* data, do you get a *consistent* result? This tests whether the method itself (not just one specific codebase) actually produces the claimed effect.
- **Robustness**: does the result hold under reasonable variations — a different random seed, a different but comparable device, a slightly different problem instance? This tests how fragile or general the claimed effect is.

These are genuinely different exercises. A result can reproduce (the original code gives the original answer) while failing to replicate (your independent implementation of the same method gives a different answer) — which would point to a bug or hidden assumption in the original code, not in the underlying idea. This course's reproduction lab (Lesson 10) targets **replicability**: you'll write your own implementation of a described method, not just re-run someone else's script.

## The extra challenge quantum computing adds

Classical software reproducibility assumes the computing environment is at least nominally reproducible — same code, same (or comparable) CPU, same library versions, same answer. Quantum hardware breaks that assumption in a way that has no classical equivalent: **the hardware itself is not a fixed instrument**. A result run on a specific superconducting device in March, when a specific coupling map and calibration held, may not reproduce exactly on the same device model six months later, because the physical device's noise characteristics genuinely changed. This means:

- A reproduction attempt on real hardware is automatically also partially a **robustness** check, whether you intend it or not — you're never running on the literal identical device-state the original authors used.
- Reproducing on a **noiseless simulator** removes this specific confound (simulators are deterministic, modulo the algorithm's own randomness), which is exactly why Lesson 7 will steer you toward simulator-reproducible papers when hardware isn't practically available to you.

## What a paper needs to provide, and how often it's missing

For a result to be reproducible at all, a paper (or its supplementary material) needs to specify, at minimum: the exact circuit or algorithm (not just a high-level description), the exact parameters used (shot count, number of repetitions, any classical optimizer settings for variational methods), the exact hardware or simulator (named specifically, with version/calibration date if hardware), and ideally the raw or processed data and analysis code. In practice, applied quantum computing papers vary enormously in how much of this they actually provide — some link a full GitHub repository with exact circuit definitions and raw data; others describe a method only in prose, leaving genuine ambiguity about parameter choices. **This gap is itself informative**: Lesson 8 will teach you how to extract a workable methodology even from a paper that under-specifies it, and how to document, honestly, which choices you had to make yourself because the paper didn't specify them.

## A realistic tiering of reproduction goals

Not every reproduction attempt needs to hit the hardest tier. In rough order of difficulty:

1. **Reproduce the qualitative pattern** (e.g., "mitigation reduces error" direction holds) without matching exact numbers.
2. **Reproduce the approximate magnitude** (e.g., within a reasonable range of the paper's reported effect size).
3. **Reproduce the exact reported numbers**, typically only achievable with the paper's original code/data and often not even then, given hardware drift.

For this course's capstone, targeting tier 1 or 2 is a completely legitimate, honest goal — and stating which tier you're targeting, up front, is itself good research practice.

## Why attempting reproduction is valuable regardless of outcome

A successful reproduction builds confidence in a result and in your own methodology skills. A **failed** reproduction is not a wasted exercise — it's often the most instructive outcome, because it forces you to identify exactly which assumption, parameter, or environmental factor explains the gap (Lesson 9 covers this directly). Some of the most useful papers in this field are themselves reproduction attempts that found a prior claim didn't hold at larger scale or on different hardware — that's a real, valuable, publishable contribution in its own right.

## Key terms

| Term | Meaning |
|---|---|
| Reproducibility | Getting the same result using the original code and data |
| Replicability | Getting a consistent result using an independent implementation of the same method |
| Robustness | Whether a result holds under reasonable variations (seed, device, problem instance) |
| Hardware drift | Real quantum devices' error characteristics changing over time, undermining exact reproduction |

## Check yourself

A student reruns a paper's exact published code and gets the exact published number. A second student independently implements the described method from scratch, using the same device, and gets a meaningfully different number. What does this combination of outcomes most likely point to, and which of reproducibility, replicability, or robustness failed?
