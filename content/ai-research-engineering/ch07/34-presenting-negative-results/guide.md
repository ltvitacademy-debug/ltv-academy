# Presenting Negative Results

A negative result — an approach that was tried carefully and didn't beat the baseline — is genuinely useful information, but it's also the easiest kind of finding to present badly. Presented poorly, it reads as "I failed" or as an uninterpretable shrug. Presented well, it reads as a real contribution: a specific, carefully-run experiment that rules something out, saving everyone downstream from retrying it. This lesson covers what separates those two outcomes.

## What you'll learn

- Why a negative result needs the same rigor as a positive one, not less
- The difference between "this doesn't work" and "I couldn't get this to work" — and why the distinction matters
- How to rule out the mundane explanations before reporting a negative result as a finding
- Framing a negative result as information gained, not time lost

## A negative result needs the same rigor as a positive one

It's tempting to be sloppier with a negative result's methodology, on the reasoning that "it didn't work, so the details don't matter as much." This is backwards — a negative result is only informative if it rules out a specific, well-specified hypothesis, and that requires exactly the same discipline as a positive result: enough seeds to distinguish a real null effect from noise, a baseline that's actually comparable, and a learning rate and training budget that were given a fair chance (see the previous chapter's lesson on debugging a run that won't improve — many "negative results" turn out, on inspection, to be an undertuned learning rate).

```
Negative result: Replacing the standard attention softmax with a learned
temperature parameter per head did not improve validation loss
(baseline: 2.341 ± 0.018, treatment: 2.337 ± 0.021, 4 seeds, LR swept
0.5x-2x baseline for both). Difference is within noise.
```

## "This doesn't work" vs. "I couldn't get this to work"

These are different claims and conflating them is a common mistake. "This doesn't work" is a claim about the idea itself, earned only after ruling out implementation bugs, insufficient tuning, and insufficient scale. "I couldn't get this to work" is a narrower, honest claim about the specific attempt — worth reporting, but it should be labeled as what it is, with the specific things that weren't ruled out named explicitly:

> We were unable to get sparse mixture-of-experts routing to outperform the dense baseline at this scale within our compute budget (2 GPU-days). We did not have budget to sweep the number of experts beyond {4, 8}, and it's possible a wider sweep or a larger model scale changes this. We did rule out a learning-rate or seed-variance explanation (see Appendix B).

## Rule out the mundane explanations first

Before reporting any negative result, it's worth deliberately checking the boring explanations that would make the "negative result" actually be a bug report in disguise: was the baseline actually run with the same data and budget? Was the new approach's learning rate swept independently, since a method that needs a different LR than the baseline will look broken if evaluated at the baseline's LR? Did the sanity checks from the debugging chapter — overfit a tiny batch, check gradients reach every parameter — actually pass for the new code path? A negative result that turns out to trace back to one of these is a bug fix, not a finding, and reporting it as a finding wastes a reader's time.

## Frame it as information gained, not time lost

The most effective negative-result write-ups are explicit about what question got answered, even though the answer wasn't the hoped-for one: "this rules out explanation A for why the baseline underperforms, which narrows the remaining hypotheses to B and C" is a genuinely useful contribution to a team's shared understanding, distinct in tone from "I spent two weeks on this and it didn't pan out." The underlying experiment is identical; the framing is what determines whether a reader extracts value from it or skips past it.

## Key terms

- **Negative result** — a carefully-run experiment whose outcome doesn't support the hypothesis being tested, reported with the same rigor as a positive finding
- **"Doesn't work" vs. "couldn't get it to work"** — the distinction between a claim about an idea itself (earned after ruling out confounds) and a narrower, honest claim about a specific attempt
- **Mundane explanation** — a boring, checkable cause (undertuned LR, insufficient seeds, a bug) that would make an apparent negative result actually a implementation problem rather than a real finding
- **Information framing** — presenting a negative result in terms of which hypothesis it rules out, rather than as a report of wasted effort
