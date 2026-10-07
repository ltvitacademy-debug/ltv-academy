# Reproducing a Published Result

Once you've found the claim that matters, the next step is trying to produce it yourself. This is slower and more humbling than it sounds — most researchers who attempt a serious reproduction discover gaps between the paper and reality that the paper itself never mentions. This lesson covers the actual mechanics: where to start, what "matching" the original means, and how to budget compute honestly.

## What you'll learn

- Why you should start from the authors' own code and checkpoints, not a blank file
- How to match hyperparameters precisely instead of approximately
- Why compute budget realism changes what "attempting a reproduction" even means
- The different senses of "reproduce" — exact number, noise band, or qualitative trend
- How to pin a run so your own attempt is itself reproducible

## Start from what the authors released

If the authors released code, start there — not with your own reimplementation from the paper's prose. The paper is a lossy summary of the code; the code is the ground truth for what was actually run. Clone the repository, read the README and any provided configs before touching anything, and try to reproduce the headline result using their exact scripts and, if available, their released checkpoints before changing a single line. If that doesn't work, you've learned something important immediately: either your environment differs in a way that matters, or the result itself is fragile.

Only after the official code runs and produces something close to the reported number should you move to your own reimplementation, if your goal is porting the method to a different codebase or framework. Reimplementing first and comparing to the paper's reported number second is backwards — you'll spend your debugging time unable to tell whether a gap is a bug in your code or a real discrepancy in the result.

## Match hyperparameters exactly, not approximately

"Approximately the same settings" is not a reproduction. Learning rate, batch size, number of training steps or epochs, optimizer and its specific settings (e.g., Adam's betas and epsilon, not just "we used Adam"), weight decay, learning rate schedule and warmup, random seed handling, and data preprocessing all need to match as closely as the paper and code allow. If the paper omits a setting the code reveals, use the code's value and note the discrepancy — this is exactly the kind of gap covered in the next lesson on reproducibility pitfalls.

```python
import random
import numpy as np
import torch

def set_seed(seed: int) -> None:
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    # Exact numerical reproducibility on GPU also requires:
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
```

Pinning the seed and disabling nondeterministic cuDNN kernels won't guarantee bit-identical results across different GPU models or library versions, but it removes one entire axis of variation from your own attempt — which matters when you're trying to tell whether a gap between your run and the paper is noise or a real difference.

## Compute budget realism

Many results in modern ML research assume compute budgets well beyond what an individual or small team can access — large pretraining runs, extensive hyperparameter sweeps, or many random seeds averaged together. Before starting, work out what's actually feasible: can you run the full training budget once, or only a scaled-down version (smaller model, fewer steps, a subset of the data)? A scaled-down reproduction can still be informative about the qualitative trend even when it can't match the paper's exact number, but it's a different and weaker claim, and you should be explicit with yourself and anyone you tell about which one you attempted.

## What "reproduce" actually means

There isn't one standard for what counts as a reproduction, and conflating the levels leads to false confidence in either direction:

- **Exact match within noise** — your number falls within the variance you'd expect from re-running with different seeds. The strongest standard, and only meaningful if the paper reports variance or you can estimate it yourself.
- **Match within a reasonable tolerance** — close enough that the practical conclusion doesn't change, even if the exact digits differ.
- **Qualitative trend match** — the direction and rough shape of the result holds (method A still beats method B, the effect still grows with scale) even though the absolute numbers differ, often because you used a smaller compute budget.

Decide in advance which of these you're actually attempting, given your compute and time, and report that honestly rather than letting a qualitative match get described as an exact reproduction.

## Key terms

- **Official code first** — attempting the authors' own released code and checkpoints before any reimplementation
- **Hyperparameter matching** — reproducing optimizer settings, schedules, and preprocessing exactly, not approximately
- **Deterministic seeding** — fixing random seeds and disabling nondeterministic GPU kernels to remove one axis of run-to-run variation
- **Reproduction tiers** — exact match within noise, tolerance match, and qualitative trend match, each a different and weaker claim than the one before it
