# Capstone: Finalize the Experiment

This lesson closes out Chapter 4: the point where you stop running jobs and lock down exactly what data and analysis will go into the report and presentation in Chapter 5. Finalizing is its own deliberate step, not just "running out of time."

## What you'll learn

- A concrete finalization checklist to run through before declaring the experimental phase done
- Why you should freeze and archive your final dataset explicitly, separate from any working/exploratory data
- How to write a short "experiment summary" that bridges Chapter 4's work into Chapter 5's report
- A worked finalization for the running GHZ/ZNE capstone

## A finalization checklist

Before moving to Chapter 5, confirm:

- Every run that will appear in your final analysis is in your run log (Lesson 15), with complete metadata — no runs you're planning to cite "from memory."
- Your claim-by-claim analysis (Lesson 16) is complete and, if you iterated (Lesson 18), reflects the final, intended comparison — not an earlier draft analysis you forgot to update.
- Any confound or limitation you identified along the way (Lesson 17's calibration-window gap, or anything else) is written down now, in your own notes, while it's fresh — you will need this exact language for Lesson 20's limitations section, and it's far easier to capture now than to reconstruct from memory during write-up.
- You've decided, explicitly, which data is "final" (goes in the report) versus "exploratory" (informed your thinking but isn't being reported as a result) — and you're not quietly treating exploratory, cherry-picked-looking data as if it were a planned result.

## Freeze and archive your final dataset

Once you've decided the experimental phase is done, copy the exact data files, run log entries, and analysis code/output that will support your report into a clearly labeled final archive — separate from your working directory, which likely still has earlier, superseded, or exploratory runs mixed in. This matters for a concrete reason: when you're writing the report in Lesson 20 and need to double check an exact number, you want certainty that you're looking at the final, decided-upon result, not accidentally re-deriving a number from an earlier, since-superseded run.

## Writing a bridge: the experiment summary

Before starting Lesson 20's full report, write yourself a short (half-page) experiment summary: what you set out to test (the Lesson 12 hypothesis), what you actually ran (final run count, devices, dates), what you found (the Lesson 16 claim-by-claim result, including Lesson 17's confound if relevant), and what's still uncertain. This isn't the final report — it's a working document that makes Lesson 20 much faster to write, because the key facts are already extracted and organized rather than needing to be re-derived from your raw run log and analysis notes under report-writing time pressure.

## A worked finalization

For the running capstone: final dataset = the original 3-qubit run, the original (confounded) 5-qubit run, and the same-window retry of both (assuming the Lesson 18 decision was to iterate and time allowed it). Experiment summary: "Tested whether ZNE improves GHZ fidelity at 3 and 5 qubits, and whether the improvement shrinks with qubit count. Original runs showed the 5-qubit improvement unexpectedly larger than the 3-qubit one; diagnosis traced this to a 6-hour calibration gap between the two conditions. A same-window retry showed the 5-qubit improvement smaller than the 3-qubit one (0.120 vs. 0.155), consistent with the original hypothesis. Both the confounded and corrected comparisons are retained in the final dataset, since the discrepancy between them is itself part of the finding." This is exactly the raw material Lesson 20 will turn into a formal methods/results/limitations/conclusions report.

## Key terms

| Term | Meaning |
|---|---|
| Final dataset | The explicitly frozen, archived set of runs and analysis that will support the final report |
| Experiment summary | A short working document bridging the completed experimental phase into the formal write-up |

## Check yourself

Why does the lesson recommend writing the confound/limitation notes down immediately at finalization time, rather than waiting until you sit down to write Lesson 20's full report? What specifically would be lost by waiting?
