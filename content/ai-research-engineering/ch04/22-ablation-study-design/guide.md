# Ablation Study Design

An ablation study answers one question at a time: does this specific component actually matter? It's the experiment design most directly responsible for separating "the thing we added helped" from "the thing we added happened to coincide with other changes that helped." Designing one well means isolating exactly one variable while holding everything else — including the parts that are tempting to also tweak — fixed.

## What you'll learn

- The core principle: change one thing, hold everything else fixed
- How to pick a baseline that makes the comparison meaningful
- Common ablation study mistakes that invalidate the comparison
- How to report ablation results so the claim is actually falsifiable

## One variable at a time

The entire value of an ablation comes from isolating a single cause. If a paper claims "our proposed gating mechanism improves performance," the ablation removes only the gating mechanism and keeps every other choice — learning rate, data, seed, training steps, everything else in the config — identical to the full model:

```python
# configs/ablation_no_gating.yaml
defaults:
  - base_config

model:
  use_gating: false   # the ONE change from the full model's config

# Everything else -- lr, batch_size, seed, steps -- inherited unchanged from base_config
```

If two or more things change between the baseline and the ablated variant, the result no longer isolates the gating mechanism's effect — it measures the combined effect of whatever changed, which is a different and much weaker claim.

## Choosing a meaningful baseline

The baseline for an ablation isn't automatically "the paper's full model" — it should be whichever comparison actually tests the claim in question. For "does component X matter," the baseline is the full model with X removed, compared against the full model with X present, both trained under identical conditions. For "is our full pipeline better than the standard approach," the baseline is the established prior method, not an ablated version of your own model. Conflating these two kinds of comparisons — using a weak prior-method baseline to make internal-component claims, or vice versa — is one of the most common ways ablation results get over-read.

## Common mistakes

- **Changing more than one thing per ablation.** Each row of an ablation table should correspond to exactly one change from the full model, not a bundle of changes.
- **Different training budgets across variants.** If the ablated model trains for fewer steps because it converges "faster," that's confounding wall-clock convenience with a real performance difference — match steps or compute, not wall-clock time, unless the claim is specifically about training speed.
- **No repeated seeds.** A difference of 0.3 points on one seed could be noise. Real ablation claims run each variant across multiple seeds and report a mean with variance, same as any other result (Lesson 14's testing discipline applies here too).
- **Removing a component that has no reasonable standalone configuration.** Some components are so load-bearing that "removing" them produces a degenerate, untrainable model rather than a meaningful comparison — in that case, a controlled variant (e.g. a weaker substitute) is more honest than an ablation that can't actually run.

## Reporting results so the claim is falsifiable

An ablation table should make it easy for a reader to check whether the claimed effect is real: report the metric, the number of seeds, and the variance, not just a single run's point estimate:

```
| Variant              | Val Loss (mean ± std, 3 seeds) |
|----------------------|---------------------------------|
| Full model           | 2.14 ± 0.03                     |
| - gating mechanism    | 2.31 ± 0.04                     |
| - weight sharing      | 2.19 ± 0.05                     |
```

This table lets a reader see that removing gating moved the metric by more than the combined variance of both variants — a claim the point estimates alone couldn't support.

## Key terms

- **Ablation** — an experiment that removes or disables exactly one component while holding everything else fixed, to isolate its effect
- **Baseline** — the comparison point an ablation measures against, chosen to match the specific claim being tested
- **Confounding** — when more than one variable changes between compared conditions, invalidating attribution of the effect to any single cause
- **Degenerate ablation** — removing a component so load-bearing that the resulting model can't train meaningfully, requiring a substitute variant instead
