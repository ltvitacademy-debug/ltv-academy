# Script — Identifying the Load-Bearing Claim

## Segment 1 (title)

Most papers make dozens of claims, but only one is load-bearing — the one claim that, if false, would collapse the paper's entire reason for existing. Finding it and stress-testing it is the most useful skill for deciding whether to build on a result, cite it with confidence, or treat it with suspicion, and it's what this lesson is about.

## Segment 2 (steps)

A load-bearing claim is almost always causal: it says one specific thing the authors did caused the improvement, not just that the improvement happened to show up alongside it. It sits close to the abstract's main verb — "we show that X causes Y" — not buried in a secondary table, and if it's false, the paper shouldn't have been published in anything like its current form.

## Segment 3 (steps)

The primary tool for testing it is the ablation study: remove or swap the one component in question while holding data, compute, and tuning fixed, and see if the effect survives. Read every ablation asking whether it actually isolates the claim, or something adjacent to it — a changed learning rate schedule or batch size can quietly undo what the ablation was supposed to prove. A strong causal claim with no matching ablation at all is simply asking you to trust it on faith.

## Segment 4 (steps)

Two more checks matter just as much: whether the comparison baseline got a tuning effort comparable to the new method, and whether the claimed effect actually holds at the scale the paper tests, rather than being extrapolated from something much smaller to a sweeping claim about scale.

## Segment 5 (outro)

If none of that holds up, the claim isn't necessarily wrong — it's unverified, and that's exactly what the next lesson, reproducing a published result, is built to check directly, by actually running the thing yourself.
