# Capstone: Analyze Results Against the Hypothesis

Data is in. Now comes the step that actually answers your research question: does it support, contradict, or only partially support the specific hypothesis you wrote in Lesson 12 — not a vague impression of "it worked" or "it didn't."

## What you'll learn

- How to map collected data directly back onto the specific claims in your original hypothesis
- A worked analysis of the running GHZ/ZNE capstone's 3-vs-5-qubit comparison, with real computed numbers
- Why "partially supported" is a legitimate, common, honest conclusion — not a failure to get a clean answer
- How to separate the analysis step from the write-up step, and why that separation matters

## Map your data back onto the specific hypothesis claims

Re-read your Lesson 12 hypothesis and break it into its separate, checkable claims. The running example's hypothesis had two: (1) mitigation increases measured fidelity at 3 qubits, (2) mitigation increases measured fidelity at 5 qubits too, but by a smaller amount than at 3 qubits. These are two separate claims, and your data might support one, both, or neither — resist the pull to collapse them into one summary verdict before checking each individually.

## A worked analysis

**Collected data (illustrative, for this worked example):**

| Condition | Baseline error | Mitigated error | Measured reduction |
|---|---|---|---|
| 3-qubit GHZ | 0.240 | 0.085 | 0.155 |
| 5-qubit GHZ | 0.330 | 0.210 | 0.120 |

**Claim 1 — does mitigation increase fidelity at 3 qubits?** Error dropped from 0.240 to 0.085, a reduction of 0.155. Combined with a significance check in the style of Lesson 5's lab (comparing the two proportions' shot-based confidence intervals), if this reduction is well outside the noise floor, **claim 1 is supported**.

**Claim 2 — does mitigation increase fidelity at 5 qubits, by a smaller amount than at 3 qubits?** Error dropped from 0.330 to 0.210, a reduction of 0.120. This confirms the direction (mitigation still helps at 5 qubits) and confirms the *relative* claim: 0.120 is smaller than 0.155, a reduction about 22.6% smaller at 5 qubits (verified by direct calculation: (0.120 − 0.155) / 0.155 ≈ −22.6%). **Claim 2 is also supported** — both that mitigation still helps, and that the size of the help shrinks as qubit count grows, matching the hypothesis's stated mechanism (more gates, more accumulated noise for the same mitigation technique to correct).

**Overall conclusion, stated at the resolution the data actually supports**: both specific claims in the hypothesis are supported by this data, at this device, at this calibration window, with the baseline error rates observed (not as a universal claim about zero-noise extrapolation's scaling behavior across all devices or circuit types).

## Why "partially supported" is a legitimate, common outcome

If claim 1 had held but claim 2 hadn't — say the 5-qubit reduction had come out larger than the 3-qubit one, or statistically indistinguishable from it — the honest conclusion would be "mitigation helps at both qubit counts tested, but the data does not support the specific claim that the improvement shrinks with qubit count, which may indicate the proposed mechanism needs revision or more qubit counts to resolve clearly." That's a complete, useful, reportable finding — not a failed capstone. Lesson 17 covers exactly this kind of outcome in depth.

## Separate analysis from write-up

Do the analysis — the actual numbers, the actual claim-by-claim check — before drafting any prose explanation for a reader. Mixing these steps tends to produce write-ups that oversell a result because the narrative was drafted before the numbers were fully checked. Lesson 20 will walk through turning a finished analysis into a written report; this lesson's job is finishing the analysis itself, cleanly, first.

## Key terms

| Term | Meaning |
|---|---|
| Claim-by-claim analysis | Checking each distinct assertion in a hypothesis separately, rather than forming one overall impression |
| Partially supported | An honest conclusion where some but not all of a hypothesis's claims hold against the data |

## Check yourself

Suppose the 5-qubit measured reduction had instead come out to 0.160 (slightly larger than the 3-qubit reduction of 0.155). Using this lesson's claim-by-claim framework, which specific claim from the hypothesis would this contradict, and what would the honest overall conclusion be?
