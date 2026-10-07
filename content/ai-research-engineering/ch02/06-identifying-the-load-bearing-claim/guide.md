# Identifying the Load-Bearing Claim

Most papers make dozens of claims, but only one of them is actually load-bearing — the claim that, if it turned out to be false, would collapse the paper's entire reason for existing. Everything else is decoration: secondary ablations, qualitative examples, related-work positioning. Finding that one claim and stress-testing it is the single most useful skill for deciding whether a result is something you should build on, cite with confidence, or treat with suspicion.

## What you'll learn

- How to tell a load-bearing claim apart from supporting detail
- Why the claim is usually a causal one, not just a number
- The specific checks that stress-test a claim: ablations, baselines, and scale
- Common ways authors (often unintentionally) make a weak claim look load-bearing

## What makes a claim load-bearing

A load-bearing claim has a specific shape: it asserts that one particular thing the authors did causes the improvement they're reporting, as opposed to the improvement coming from something else — more training compute, more data, a stronger baseline implementation, or simply more hyperparameter tuning spent on the new method than the baseline received. "Our new attention variant improves accuracy" is a causal claim about the attention variant. If the real driver turned out to be that the authors trained the new model for twice as many steps, the claim isn't just weaker — it's a different claim entirely.

To find it, ask: what is the one sentence that, if the reviewers, the readers, and the authors themselves all agreed it was false, would mean this paper shouldn't have been published in anything like its current form? That sentence is almost always close to the abstract's main verb — "we show that X causes Y" — not buried in a secondary result.

## Stress-testing with ablations

The primary tool for testing a causal claim is the ablation study: remove or swap the one component the claim is about while holding everything else fixed, and see whether the effect survives. A paper that makes a strong causal claim but includes no ablation isolating that exact component is asking you to trust the claim on faith. Conversely, a paper with a clean ablation — same data, same compute, same tuning budget, only the component in question changes — gives you direct evidence for or against the load-bearing claim.

Read ablation tables with the question "does this isolate the claim, or does it isolate something adjacent to the claim?" A common pattern is an ablation that removes a component but also changes something else incidentally (a different learning rate schedule, a different batch size), which means the ablation doesn't actually isolate what the claim is about.

## Stress-testing with baselines and scale

Two other checks matter as much as ablations. First, baselines: is the comparison against a baseline that received a comparable amount of tuning effort, or against a weaker, under-tuned version of prior work? A new method beating an under-tuned baseline is a much weaker result than beating a baseline tuned as carefully as the new method was. Second, scale: does the claimed effect hold at the scale the paper actually tests, or is it extrapolated from a small-scale experiment to a claim about large-scale behavior? Many effects that appear at one model size or dataset size disappear, reverse, or simply haven't been checked at another.

## When the claim doesn't hold up

If you can't find an ablation that isolates the load-bearing claim, if the baseline comparison looks lopsided, or if the claim is being generalized well beyond the scale actually tested, that doesn't necessarily mean the paper is wrong — it means the claim is unverified by the paper's own evidence. That's valuable information on its own: it tells you exactly what you'd need to check yourself before relying on the result, which is precisely the work the next few lessons walk through when you try to reproduce it directly.

## Key terms

- **Load-bearing claim** — the one claim a paper's entire contribution depends on; if false, the paper's reason for existing collapses
- **Ablation study** — an experiment that removes or swaps one component while holding everything else fixed, to isolate its causal effect
- **Baseline tuning parity** — whether the comparison baseline received a comparable tuning effort to the proposed method
- **Scale generalization** — the gap between the scale a claim was tested at and the scale it's being claimed to hold at
