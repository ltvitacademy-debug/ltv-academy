# Reproduction Lab

This lab walks through a full, realistic reproduction attempt end to end — screening, extraction, running, and diagnosing a discrepancy — using Chapter 2's full toolkit on one worked scenario. Work through the task yourself before checking the worked solution.

## What you'll learn

- How to carry a reproduction attempt through every stage covered in this chapter without skipping one
- How to compute and interpret a relative difference between your result and a paper's reported result
- How to decide, with a specific worked number, whether a discrepancy needs further diagnosis or is within reasonable bounds
- How to write a short, honest reproduction report — the actual deliverable format you'll use again in your capstone

## The scenario

You've selected (per Lesson 7's checklist) a recent, modest paper benchmarking a specific error-mitigation technique on a 3-qubit circuit, with the circuit and parameters specified in the text. The paper reports: **mitigation reduces measured error by 0.18** (from a baseline error rate to a mitigated error rate) on their named device.

## Your task

Before reading the worked solution, write out:

1. The methodology extraction you'd need to do before running anything (per Lesson 8) — name at least three specific details you'd need to pin down.
2. Given a hypothetical result of your own — baseline error 0.24, mitigated error 0.085 — compute your own measured error reduction, and the relative difference between your number and the paper's reported 0.18.
3. Using Lesson 9's diagnostic checklist, decide what you'd check first before concluding anything about whether your attempt succeeded.

<details>
<summary>A worked reproduction report</summary>

**Methodology extraction.** Before running anything, you'd need: the exact circuit (qubit count, gate sequence), the exact mitigation technique and any sub-choices it requires (e.g., which extrapolation method, if zero-noise extrapolation), the shot count per condition, and the hardware or simulator used (named specifically) — exactly the categories Lesson 8 walked through.

**Computing your result.** Your measured error reduction = baseline error − mitigated error = 0.24 − 0.085 = **0.155**. Relative difference from the paper's reported 0.18: (0.155 − 0.18) / 0.18 ≈ **−13.9%** — your measured reduction is about 14% smaller than the paper's reported figure (this was checked by direct calculation, not estimated).

**Is a 14% relative gap a real discrepancy, or within reasonable bounds?** This depends entirely on information the paper would need to provide (or that you'd need to compute from your own repeated runs): the measurement's uncertainty. If the paper reports its 0.18 reduction with a stated uncertainty of, say, ±0.05, then your 0.155 falls comfortably within that range — not a meaningful discrepancy. If the paper reports essentially no uncertainty estimate (a red flag you learned to spot back in Lesson 2), you have no principled way to judge whether 14% is "close" — which is itself worth stating plainly in your report rather than guessing.

**Diagnostic priority, per Lesson 9's checklist.** Before concluding anything: re-check your own circuit and mitigation implementation against your methodology document (step 1); re-confirm every parameter, especially the mitigation sub-technique, matches what the paper specified (step 2); revisit any detail you had to guess at during extraction (step 3); and only then consider hardware differences or an actual disagreement with the paper's claim.

**A short, honest write-up.** "We attempted to replicate [paper]'s reported 0.18 error reduction from [technique] on a 3-qubit circuit. Our independent implementation measured a 0.155 reduction (baseline 0.24, mitigated 0.085), a 13.9% relative difference. The paper does not report a measurement uncertainty, so we cannot determine whether this gap exceeds expected statistical variation. Before drawing further conclusions, we would re-verify our mitigation sub-technique choice against the paper's appendix and re-run with a larger shot count to narrow our own confidence interval."

</details>

## What makes this write-up good, not just complete

Notice what the worked report does *not* do: it doesn't claim success ("we reproduced the result") or failure ("the paper is wrong") — it states the measured numbers precisely, names the specific missing information that prevents a confident conclusion, and states a concrete next step. That combination — precise numbers, honest uncertainty, a next step — is the actual deliverable format for both your capstone (Chapters 3–5) and any real reproduction attempt in this field.

## Key terms

| Term | Meaning |
|---|---|
| Relative difference | The size of a discrepancy expressed as a percentage of the reference value, here the paper's reported number |
| Measurement uncertainty | A stated range reflecting how much a reported value could vary due to statistical noise; its absence limits what conclusions can be drawn |

## Check yourself

If the paper in this scenario had instead reported its 0.18 error reduction with a stated uncertainty of ±0.02, would your measured 0.155 reduction fall inside or outside that range, and what would that change about the honest conclusion in your write-up?
