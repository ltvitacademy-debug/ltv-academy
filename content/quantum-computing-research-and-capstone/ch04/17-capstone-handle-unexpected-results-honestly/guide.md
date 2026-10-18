# Capstone: Handle Unexpected Results Honestly

Sometimes the data doesn't cooperate. This lesson works through exactly that: the running GHZ/ZNE capstone produces a result that contradicts part of its own hypothesis, and you have to decide what to do about it.

## What you'll learn

- Why an unexpected result is data, not a problem to make disappear
- How to apply Lesson 9's discrepancy-diagnosis checklist to your own capstone's unexpected finding, not just someone else's paper
- The difference between an honest "the hypothesis was wrong" conclusion and quietly reframing the hypothesis after the fact to match whatever you found
- A worked diagnosis of an unexpected result in the running capstone example

## The scenario: an unexpected result

Continuing the running example: your hypothesis predicted the 5-qubit mitigation improvement would be *smaller* than the 3-qubit one. Instead, your actual measured data comes back showing the 5-qubit reduction (0.160) is slightly *larger* than the 3-qubit reduction (0.155) — the opposite of what you predicted.

## Your task

Before reading the worked diagnosis, write out: which specific claim in the Lesson 12 hypothesis does this contradict, and using Lesson 9's diagnostic checklist (adapted from reproduction attempts to your own capstone), what would you check first?

<details>
<summary>A worked diagnosis of the unexpected result</summary>

**Which claim is contradicted.** The hypothesis's direction-of-effect claim (mitigation helps at both qubit counts) still holds — both reductions are positive. The *relative-magnitude* claim (the 5-qubit improvement is smaller than the 3-qubit one) is directly contradicted: 0.160 > 0.155, not smaller.

**Applying Lesson 9's checklist to your own capstone, in order:**

1. **Implementation bugs.** Re-check the 5-qubit circuit construction and noise-scaling code against the simulator-validated version from Lesson 14. Suppose this checks out clean — no bug found.
2. **Parameter mismatches.** Confirm both qubit counts used identical shot counts and noise-scaling factors. Suppose this also checks out.
3. **Specification/design gaps.** Check whether the two conditions actually ran under comparable device states — per Lesson 15's run log, were the 3- and 5-qubit jobs genuinely interleaved, or did a queue delay put them hours apart on different calibration windows? Suppose the run log shows the 5-qubit jobs ran six hours later than the 3-qubit jobs, after a scheduled recalibration.
4. **Conclusion reached**: the most likely explanation isn't that the proposed mechanism (more gates, more accumulated noise shrinking mitigation's benefit) is wrong — it's that the two conditions weren't run under comparable device states, which Lesson 4 and Lesson 15 both flagged as the exact confound interleaving exists to prevent. This is a **design/execution limitation**, not necessarily a falsified hypothesis.

**What to actually do about it.** Two honest options, both legitimate: (a) if time allows (checked against your Lesson 13 cut list), re-run both conditions genuinely interleaved within one calibration window to get a cleaner test of the original claim; (b) if time doesn't allow a clean re-run, report the result exactly as it is — direction-of-effect claim supported, relative-magnitude claim not supported under these specific run conditions — and name the calibration-window gap explicitly as the likely confound in your report's limitations section (Lesson 20), rather than either hiding the contradiction or claiming it disproves the proposed mechanism.

</details>

## What NOT to do: quietly reframing the hypothesis after the fact

A specific, tempting, and dishonest move is to rewrite your "hypothesis" after seeing the data to match whatever you found — quietly deciding, after the fact, that you'd "really" predicted mitigation would help more at higher qubit counts. This is a well-known failure mode in research broadly (sometimes called HARKing — Hypothesizing After the Results are Known). The fix is structural, not just willpower: your Lesson 12 proposal is a dated, written record of what you predicted *before* seeing this data — refer back to it directly in your report, and report the actual outcome against it, including when that outcome doesn't match.

## Key terms

| Term | Meaning |
|---|---|
| HARKing | Hypothesizing After the Results are Known — the dishonest practice of rewriting a hypothesis after seeing data to match the outcome |
| Design/execution limitation | A confound introduced by how an experiment was actually run (e.g., a broken control), as opposed to a flaw in the underlying hypothesis |

## Check yourself

In the worked diagnosis, the calibration-window gap was identified as the likely confound. If a re-run under a genuinely interleaved, same-calibration-window design still showed the 5-qubit reduction larger than the 3-qubit one, what would the honest conclusion become, and how would that differ from the conclusion reached in the worked example above?
