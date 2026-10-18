# Simulator Lab: Interpreting Results

This chapter has built up three separate ways of running the exact same Bell-state circuit, each revealing a different layer of truth: the ideal exact answer, a noiseless sample of it, and a noisy sample of it. The real skill this lab builds isn't running any one of these — it's looking at a results table and correctly diagnosing which deviations are real hardware effects and which are just sampling noise you'd see even on perfect hardware.

## What you'll learn

- How to run the same circuit three different ways and line up the results for comparison
- How to tell "real" noise-driven deviation apart from ordinary statistical shot noise
- Why the noiseless statevector result is the only one of the three with zero uncertainty
- A worked interpretation of all three real result sets from this chapter
- The general diagnostic habit this builds for reading any real quantum hardware output

## The three runs, side by side

All three use the identical Bell-state circuit: `qc.h(0); qc.cx(0, 1)`, with measurement added where needed.

**(a) Noiseless statevector** — from Lesson 12, `Statevector(qc)` on the circuit with no measurement gates. Exact result: `P(00) = 0.5`, `P(11) = 0.5`, `P(01) = 0`, `P(10) = 0`. No sampling occurred at all — this is ground truth, not an estimate.

**(b) Noiseless shots** — from Lesson 11, `AerSimulator()` with no noise model, `shots=1024`. Real seeded result: `{'00': 503, '11': 521, '01': 0, '10': 0}`.

**(c) Noisy shots** — from Lesson 14, `AerSimulator(noise_model=noise_model)` with a 1% depolarizing error on the `cx` gate, `shots=4096`. Real seeded result: `{'00': 2090, '01': 11, '10': 8, '11': 1987}`.

## Interpreting (a) vs. (b): this is pure sampling noise

Compare run (a)'s exact `P(00) = P(11) = 0.5` against run (b)'s observed `503/1024 ≈ 0.4912` for `00` and `521/1024 ≈ 0.5088` for `11`. Both of run (b)'s outcome types (`00`, `11`) are outcomes that run (a) already says are possible — the only thing that changed is their exact split deviated slightly from 50/50. Critically, run (b)'s simulator had zero noise model attached. There is no hardware-error explanation available for this gap. It has to be sampling noise — the same effect quantified in Lesson 13's standard error formula — and nothing more. A 503/521 split at 1024 shots is well within the expected statistical spread; there's no diagnostic alarm to raise here at all.

## Interpreting (c): this is real noise, not just sampling noise

Now look at run (c). The `01` and `10` counts are 11 and 8 — small, but not zero. Unlike run (b)'s deviation, this one cannot be sampling noise alone, because run (a) establishes that `P(01)` and `P(10)` are *exactly* 0 under the ideal circuit — there is no number of noiseless shots, however large, that would ever be expected to produce a nonzero `01` or `10` count. Their appearance here is only explained by the depolarizing error actually injected on the `cx` gate, exactly as the exact calculation in Lesson 14 predicted (`P(01) = P(10) = 0.0025` under 1% CX depolarizing error). That's the real signature of hardware-driven error: an outcome the ideal logic of the circuit rules out entirely, showing up anyway.

Meanwhile, run (c)'s `00` and `11` counts (2090 and 1987) are both somewhat below their noiseless expectation of `0.5 × 4096 = 2048` each — consistent with the exact noisy prediction of `0.4975 × 4096 ≈ 2038` each, plus the ordinary sampling spread on top of that. So run (c) actually has two stacked sources of deviation at once: the real noise-driven shift in the `00`/`11` split, and ordinary sampling noise layered over everything — including over the `01`/`10` counts themselves, which is why they came out as 11 and 8 rather than both landing exactly on their ~10.24 expectation.

## The general diagnostic habit

The practical rule this lab is building: before concluding a surprising count in a real result reflects a real physical effect, first ask whether a noiseless simulation of the same circuit, at the same shot count, could plausibly produce that same deviation through sampling noise alone. If the outcome in question is one the ideal circuit's own logic says is already possible (like `00`/`11` here), a modest-looking deviation from the "expected" 50/50 split usually is just sampling noise, and Lesson 13's `sqrt(p(1-p)/N)` formula tells you exactly how much deviation is "modest." But if the outcome is one the ideal circuit rules out entirely (like `01`/`10` here), any nonzero count at all is a real signal worth investigating — it can't be explained away as "just shot noise," because shot noise on a truly zero-probability outcome can never produce a nonzero count no matter how many shots you run.

## Key terms

| Term | Meaning |
|---|---|
| Ground truth comparison | Using an exact statevector result as the reference point to judge whether a shot-based deviation is expected or suspicious |
| Sampling-noise deviation | A deviation in the split between already-possible outcomes, fully explained by finite shot count with no noise model involved |
| Noise-driven deviation | A deviation that includes outcomes the ideal circuit rules out entirely — cannot be explained by sampling noise alone |
| Stacked error sources | A real noisy hardware result reflects both actual gate/hardware error and ordinary sampling noise simultaneously |
| Diagnostic reading of counts | The practice of checking whether an observed count could arise from a noiseless simulation before attributing it to real hardware error |

## Check yourself

Suppose a real hardware run of this same Bell-state circuit at shots=4096 produced `{'00': 2005, '11': 2091, '01': 0, '10': 0}`. Based on everything in this lab, would you conclude this particular hardware run showed evidence of gate noise, or does it look consistent with a noiseless device? Justify your answer using the distinction between sampling noise and noise-driven deviation.
