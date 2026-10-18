# Handling Discrepancies Between Your Results & the Paper

You ran your implementation, and your numbers don't match the paper's. This is the single most common outcome of a real reproduction attempt — and how you respond to it is a bigger test of your research judgment than getting a clean match would have been.

## What you'll learn

- Why a mismatch is the expected, not exceptional, outcome of a reproduction attempt
- A systematic checklist for diagnosing where a discrepancy came from
- The difference between "my implementation has a bug" and "the paper's claim doesn't hold as stated" — and why you must rule out the first before concluding the second
- How to write up a discrepancy honestly, whatever its source turns out to be
- A worked example diagnosing a realistic discrepancy

## A mismatch is the expected outcome, not a failure of your work

Given everything Chapter 2 has covered so far — hardware drift, specification gaps, the difference between reproducibility and replicability — an exact numeric match is actually the less likely outcome of an honest attempt. Treat a discrepancy as the normal, informative result it is, not as evidence you did something wrong.

## A diagnostic checklist, in order

Work through these roughly in order of likelihood, cheapest-to-check first:

1. **Implementation bugs.** Walk your own circuit/code against your methodology document line by line. Did you build the circuit the paper actually describes, or a plausible-looking variant? This is the most common source of discrepancy and the first thing to rule out.
2. **Parameter mismatches.** Re-check every parameter against your extracted methodology (Lesson 8): shot count, optimizer settings, noise-scaling factors. A single wrong parameter can produce a dramatically different number while looking like a "real" scientific discrepancy.
3. **Specification gaps you had to fill in yourself.** Revisit the gaps you flagged in Lesson 8 — did your reasonable guess for an unspecified detail turn out to matter more than expected?
4. **Hardware/environment differences.** If running on real hardware, is your device, or its current calibration state, meaningfully different from the paper's? If running on a simulator, are you using the same noise model (if any) the paper used?
5. **Statistical noise.** Is the "discrepancy" actually within a reasonable confidence interval given your shot count, using the kind of significance check from Lesson 5's lab? A difference of 0.03 probability with wide, overlapping confidence intervals may not be a discrepancy at all.
6. **A genuine disagreement with the paper's claim.** Only after ruling out 1–5 should you entertain the possibility that the paper's claim, as stated, doesn't hold under your conditions — and even then, "doesn't hold under my specific conditions" is a narrower, more honest claim than "the paper is wrong."

## Why you must rule out your own bugs first

It's tempting, especially under time pressure, to interpret a mismatch as an exciting finding ("I found a flaw in a published paper!"). The far more common reality is a bug or a parameter mismatch in your own implementation. Treating your own code as the most likely source of error, and only escalating your claim after genuinely ruling it out, is a matter of basic research integrity — publishing or presenting "the paper's result doesn't hold" without having actually eliminated your own implementation as the cause is a real, specific failure mode to avoid, not a minor stylistic choice.

## Writing up a discrepancy honestly, whatever the source

Whatever you conclude, document it as a traceable finding, not a vague impression: state the specific discrepancy (your number vs. the paper's number, with both reported precisely), state which diagnostic steps you worked through and what you found at each, and state your best-supported conclusion about the source — explicitly flagged as "likely," "possible," or "confirmed" depending on how thoroughly you were able to check it. A discrepancy you traced to a specific, identified parameter mismatch is a far more valuable write-up than either an unexplained mismatch or an overclaimed "the paper is wrong."

## A worked example

You reproduce the GHZ/zero-noise-extrapolation example from Lesson 8 and measure a smaller error reduction than the paper reports. Working the checklist: your circuit matches your methodology document (step 1, clear). Your shot count and scaling factors match (step 2, clear). You realize you used linear extrapolation instead of the paper's specified Richardson extrapolation — a gap you hadn't actually flagged, because you missed that detail in the appendix the first time through (step 3, found it). Re-running with Richardson extrapolation closes most of the gap. **Conclusion**: the discrepancy was caused by an extraction error on your part — a methodology detail you missed on first read — not a flaw in the paper's claim. This is a completely normal, useful outcome to report honestly.

## Key terms

| Term | Meaning |
|---|---|
| Discrepancy | A measured difference between your reproduction result and the paper's reported result |
| Confidence interval | A range around a measured value reflecting its statistical uncertainty, used to judge whether an apparent difference is real |
| Research integrity | The practice of ruling out your own errors before escalating a claim that a published result doesn't hold |

## Check yourself

You measure a result that differs from a paper's reported number by an amount that, per your own significance check, falls well within the overlapping confidence intervals of both measurements. Per this lesson's checklist, is this evidence the paper's claim doesn't hold? Explain which diagnostic step this maps to and what the honest conclusion is.
