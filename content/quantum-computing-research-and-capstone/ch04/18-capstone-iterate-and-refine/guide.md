# Capstone: Iterate & Refine

Following Lesson 17's diagnosis, you now have a decision to make: re-run with a fix, or stop and report what you have. This lesson is about making that decision deliberately, using the cut list you wrote back in Lesson 13, rather than drifting into either an endless series of "just one more re-run" or giving up prematurely.

## What you'll learn

- How to decide, concretely, whether an iteration is worth the remaining time budget
- The difference between a *targeted* re-run (fixing one identified confound) and an open-ended "try again and hope" re-run
- How to update your run log and analysis cleanly when you do iterate, without losing the record of the earlier attempt
- A worked iteration decision continuing the running GHZ/ZNE capstone

## Deciding whether to iterate

Go back to your Lesson 13 cut list and time budget before deciding to re-run anything. A re-run is worth doing when: it's **targeted** (you've identified a specific, fixable confound — like Lesson 17's calibration-window gap — not a vague "let's see if it looks different this time"), it fits inside your remaining time budget including its own queue time, and it would meaningfully change what you can honestly conclude (re-running something that was already clearly significant, just to get a slightly cleaner number, is usually not worth the time it costs against other remaining work like the write-up).

## Targeted re-run vs. open-ended re-run

A **targeted re-run** changes exactly one thing based on a specific diagnosis: in the running example, re-submitting both the 3- and 5-qubit jobs within the same short window, specifically to close the calibration-window gap Lesson 17 identified — everything else (circuit, shots, scaling factors) stays fixed. An **open-ended re-run** — "let's just run it again and see" — without a specific hypothesis about what changed, risks burning your remaining time budget without actually resolving the ambiguity, and makes it harder to know, even after the re-run, whether any new number is more trustworthy than the old one or just different.

## Updating your records without losing the earlier attempt

When you do iterate, keep the original run's data and log entry — don't overwrite or delete it. Add the new run as a new, clearly labeled entry (e.g., "ghz5-zne-f1.0-run2, same-window retry"), and in your eventual report, you may end up citing *both*: the original result (showing the confound's effect) and the corrected result (showing the cleaner comparison) — which is actually a more informative report than either one alone, since it demonstrates you diagnosed and controlled for a real confound rather than just getting a different number and not knowing why.

## A worked iteration decision

Continuing Lesson 17's scenario: the cut list (Lesson 13) put the 5-qubit extension on the chopping block first if time ran short, but didn't anticipate this specific confound. Checking the remaining time budget: a same-window interleaved re-run of both qubit counts needs roughly the same queue-time allowance as the original runs — a cost you can estimate directly from Lesson 15's run log, which recorded actual queue wait times for the first attempt. If that fits inside the time remaining before the write-up phase needs to start (per Lesson 13's write-up-time budgeting), this is a good candidate for a targeted re-run. If it doesn't fit, the honest fallback — reporting the original result with the calibration-window confound explicitly named, exactly as Lesson 17 described — is the right call, not a lesser one.

## Key terms

| Term | Meaning |
|---|---|
| Targeted re-run | A re-run that changes exactly one identified, fixable confound, with everything else held constant |
| Open-ended re-run | Re-running without a specific diagnosis, risking wasted time without resolving the ambiguity |

## Check yourself

Your cut list and remaining time budget show you have enough time for exactly one more round of hardware runs before you must move to write-up. You have two candidate re-runs: (1) the targeted, same-window retry from this lesson's worked example, or (2) adding a third qubit count "just to see what happens." Using this lesson's reasoning, which should you choose, and why?
