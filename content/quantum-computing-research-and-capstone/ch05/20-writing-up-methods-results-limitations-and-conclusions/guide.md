# Writing Up Methods, Results, Limitations & Conclusions

Everything from Chapters 1–4 funnels into this one deliverable: a written report following the same structure you learned to read critically back in Lesson 2, now written from the other side.

## What you'll learn

- The methods/results/limitations/conclusions structure, and what belongs in each section
- Why the limitations section is not an apology, but a core, expected part of a credible report
- How to turn Lesson 19's experiment summary into each section, concretely
- A worked excerpt of the running GHZ/ZNE capstone's report
- Common write-up mistakes that undercut an otherwise solid piece of work

## The four-section structure

- **Methods**: exactly what you built and ran — circuit, technique, parameters, hardware/simulator, named specifically (the level of detail Lesson 2 taught you to look for when reading someone else's paper, now supplied for your own).
- **Results**: the actual data and your claim-by-claim analysis (Lesson 16) — numbers, not adjectives. "The reduction was 0.155" belongs here; "mitigation worked really well" does not.
- **Limitations**: what your result does and doesn't show, including any confound (Lesson 17's calibration-window gap), any specification choice you made yourself (Lesson 8's gap-flagging habit), and any scope you deliberately didn't cover (Lesson 13's cut list items you dropped).
- **Conclusions**: your honest, bounded takeaway — tied explicitly back to your original hypothesis's specific claims, stated at the resolution your data actually supports, not a broader claim it doesn't.

## The limitations section is not an apology

A thin or missing limitations section was one of the overstatement red flags you learned to spot in Lesson 2 when reading other people's papers — don't reproduce that flaw in your own report. A strong limitations section is a sign of a credible researcher, not a weak result: it tells the reader exactly how far to trust the conclusion, which is more useful to them than a confident-sounding report that hides its own gaps. Readers (and, later, interviewers — Chapter 6 covers this) consistently read a clear-eyed limitations section as evidence of good judgment, not a weakness to minimize.

## Turning the experiment summary into each section

Lesson 19's experiment summary already contains most of what you need — writing the formal report is mostly a matter of expanding and organizing it, not generating new content from scratch:

- Methods ← the summary's "what you actually ran" (circuit specifics, parameters, devices, dates — pulled directly from your Lesson 15 run log).
- Results ← the summary's "what you found," expanded with the full Lesson 16 claim-by-claim table.
- Limitations ← the summary's "what's still uncertain," plus anything flagged during Lesson 17's diagnosis or Lesson 13's cut list.
- Conclusions ← a tightened restatement of the hypothesis's claims against what was actually found, explicitly scoped (device, calibration window, qubit counts tested).

## A worked excerpt

<details>
<summary>Worked Results and Limitations sections</summary>

**Results.** We measured a GHZ-fidelity error reduction of 0.155 at 3 qubits (baseline 0.240, mitigated 0.085) and 0.120 at 5 qubits (baseline 0.330, mitigated 0.210), using zero-noise extrapolation via unitary folding with Richardson extrapolation, on [device], [date]. The 5-qubit reduction is approximately 22.6% smaller than the 3-qubit reduction, supporting both claims of our original hypothesis: that mitigation improves fidelity at both qubit counts, and that the size of the improvement shrinks as qubit count increases.

**Limitations.** An initial pair of runs (3- and 5-qubit, not interleaved within the same calibration window) showed the opposite relative pattern — a larger improvement at 5 qubits than 3 qubits — which we traced to a roughly six-hour gap between the two conditions, spanning a device recalibration. The results reported above come from a same-window retry specifically designed to close this gap; we report both the original and corrected comparisons in our full dataset, since the discrepancy between them is itself informative about how sensitive this kind of measurement is to calibration drift. This result is specific to one device, one calibration window, and two qubit counts (3 and 5) — we did not test intermediate or higher qubit counts, and cannot claim the observed scaling pattern generalizes beyond this range.

</details>

## Common write-up mistakes

- Reporting adjectives instead of numbers ("significantly better" without the actual z-score or effect size).
- Burying the limitations section at the very end in one throwaway sentence, rather than giving it the same care as the results.
- Letting the conclusion claim more than the data supports — generalizing from "this device, this calibration window" to "zero-noise extrapolation scales this way" as a universal statement.

## Key terms

| Term | Meaning |
|---|---|
| Methods section | The precise, specific description of what was built and run |
| Limitations section | An honest account of what a result does and doesn't show, including confounds and unscoped areas |

## Check yourself

Rewrite this weak conclusion sentence to match this lesson's standard: "Our experiment showed that error mitigation is a great technique for improving quantum results." Use the actual numbers and scoped claims from the worked excerpt above.
