# Research Methods Lab

This lab puts Lessons 1–4 together on one concrete scenario, start to finish: a hypothesis, a controlled experiment design, real (illustrative) data, and a judgment about whether the result actually supports the hypothesis. Work through it yourself before reading the worked solution.

## What you'll learn

- How to carry a single research question through hypothesis, design, data, and conclusion without dropping any step
- How to run a basic statistical significance check on a two-condition quantum result by hand
- Where "statistically significant" and "practically meaningful" can diverge, and why both matter
- How to write up a small result honestly, including what it does and doesn't prove

## The scenario

You want to test whether a simple **readout error mitigation** technique (correcting for the known tendency of a device to misread some qubit measurement outcomes) improves the measured success probability of a GHZ-state preparation circuit on a specific real device. GHZ states have a known ideal measurement distribution, so "success" here means a measurement outcome matching the ideal distribution's majority outcomes.

## Your task: do the first three steps yourself

Before reading further, write out, for this scenario:

1. A testable, falsifiable hypothesis, using Lesson 3's template (naming the technique, circuit, device, comparison, and direction).
2. A controlled experimental design, using Lesson 4's principles (control group, treatment group, interleaving, fixed shot count).
3. What statistic you'd compute to judge whether an observed difference between the two groups is meaningful, not just noise.

<details>
<summary>A worked hypothesis, design, and analysis</summary>

**Hypothesis**: On a 3-qubit GHZ-state preparation circuit, run on [specific named IBM Quantum device], applying readout error mitigation will increase the measured probability of observing the ideal GHZ outcomes, relative to running the identical circuit with no mitigation applied.

**Design**: Run the identical GHZ circuit 1,000 shots per condition. Interleave control (no mitigation) and treatment (readout mitigation applied) runs across the queue window to average out drift. Hold circuit structure and shot count fixed; the only variable that changes is whether readout mitigation is applied.

**Illustrative results** (for this worked example):

| Condition | Shots | Ideal-outcome count | Measured probability |
|---|---|---|---|
| Control (no mitigation) | 1,000 | 620 | 0.620 |
| Treatment (readout mitigation) | 1,000 | 710 | 0.710 |

**Is an 0.09 difference meaningful, or could it just be shot noise?** A standard check for comparing two measured proportions is a two-proportion z-test. Pooled proportion: (620 + 710) / (1,000 + 1,000) = 0.665. Standard error = sqrt(0.665 × 0.335 × (1/1000 + 1/1000)) ≈ 0.0211. z = (0.710 − 0.620) / 0.0211 ≈ 4.26. A z-score this far from 0 (|z| ≈ 4.26, far beyond the common 1.96 threshold for 95% confidence) means this difference is extremely unlikely to be shot noise alone — these numbers were checked by direct calculation, not assumed.

**Conclusion, stated honestly**: On this specific circuit, this specific device, at this specific calibration window, with 1,000 shots per condition, readout error mitigation measurably increased the proportion of ideal-outcome measurements, and the difference is statistically significant. This does **not** establish that readout mitigation improves results on all circuits, all devices, or at other calibration windows — exactly the kind of bounded, honest claim Lesson 1 described as the normal shape of real quantum computing research.

</details>

## Where statistical significance and practical meaningfulness diverge

A large shot count can make even a tiny, practically irrelevant difference statistically significant — "significant" only means "unlikely to be shot noise," not "large" or "important." Conversely, a real and meaningful effect can fail to reach significance if too few shots were run. Always report both the effect size (here, the 0.09 probability difference) and the significance check (the z-score) — neither alone tells the full story, and a paper or capstone that reports only one is giving you half the picture.

## Key terms

| Term | Meaning |
|---|---|
| Readout error mitigation | A correction technique for a device's known tendency to misread certain measurement outcomes |
| Two-proportion z-test | A statistical check for whether a difference between two measured proportions is likely real or likely due to random (shot) noise |
| Effect size | The magnitude of a measured difference, independent of whether it is statistically significant |
| Statistical significance | A measure of how unlikely an observed difference is to have arisen from random noise alone, not a measure of how large or important it is |

## Check yourself

If the control group's measured probability had instead been 0.615 and the treatment group's 0.635 (a much smaller 0.02 difference), with the same 1,000 shots per condition, would you expect the z-score to cross the 1.96 significance threshold? Explain your reasoning about how effect size and shot count both feed into that z-score, without necessarily recomputing the exact value.
