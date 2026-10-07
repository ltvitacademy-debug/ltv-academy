# Combinatorial Cross-Validation

Walk-forward validation, even with purging and embargoing, still gives you one backtest path: one specific sequence of train/test splits, producing one Sharpe ratio. That single number hides a question you should be asking — how much of it is skill, and how much is this particular slice of history happening to be kind to this particular model? Combinatorial Purged Cross-Validation (CPCV), also from Marcos López de Prado, answers that by generating *many* out-of-sample paths from the same data, so you get a distribution of Sharpe ratios instead of a single point estimate.

## What you'll learn

- Why one walk-forward path is a single, possibly lucky, draw rather than a reliable estimate
- How CPCV splits data into groups and tests every possible combination of held-out groups
- How purging and embargo from Lesson 15 apply around *every* test combination, not just one
- Why a distribution of Sharpe ratios is more informative than a single backtest number

## The problem with a single backtest path

A normal walk-forward or purged k-fold procedure still only ever produces one realized out-of-sample equity curve. Even a scrupulously leak-free backtest is still just one sample from the space of "ways this strategy could have played out," and financial time series are short relative to how much noise is in them — it's entirely possible for a mediocre strategy to look great on the one historical path you happened to test, purely by chance.

## How CPCV builds many paths from one dataset

CPCV starts by splitting the full dataset into *N* contiguous groups (say, N=6). Instead of holding out one group at a time, it holds out every possible combination of *k* groups at once (say, k=2) as the test set, training on the rest — with purging and embargoing (Lesson 15) applied around each held-out combination exactly as before, so no individual split leaks.

```python
from itertools import combinations
import numpy as np

def cpcv_splits(n_samples, n_groups=6, k_test_groups=2, embargo_frac=0.01, label_end=None):
    groups = np.array_split(np.arange(n_samples), n_groups)
    embargo = int(n_samples * embargo_frac)

    for test_group_ids in combinations(range(n_groups), k_test_groups):
        test_idx = np.concatenate([groups[g] for g in test_group_ids])
        test_start, test_stop = test_idx.min(), test_idx.max() + 1

        train_idx = np.array([
            i for i in range(n_samples)
            if i not in test_idx
            # purge: drop training rows whose label reaches into this test span
            and not (label_end[i] >= test_start and i < test_stop)
            # embargo: drop a buffer right after this test span
            and not (test_stop <= i < test_stop + embargo)
        ])
        yield test_group_ids, train_idx, test_idx
```

With N=6 and k=2, that's `C(6, 2) = 15` distinct train/test combinations from the same dataset, each one a legitimately purged and embargoed split. Each combination produces its own out-of-sample performance estimate — in López de Prado's framework, these out-of-sample segments can further be reassembled into complete backtest *paths* (a precise combinatorial count, `φ[N,k] = (k/N) × C(N,k)`, gives the number of distinct full-history paths obtainable this way — 5 paths for N=6, k=2), each one a different, equally valid way of having "run the backtest."

## A distribution, not a point estimate

Instead of one Sharpe ratio, CPCV gives you 15 (or however many combinations you ran) Sharpe ratios — or several reconstructed paths' worth. Looking at the *distribution* — its mean, its spread, how many of the paths were actually profitable — tells you something a single number cannot: whether the strategy's apparent edge is consistent across different slices of held-out data, or whether it depends heavily on which specific chunk of history ended up in the test set. A strategy with a high average Sharpe but enormous variance across combinations is a strategy that got lucky on some slices and should not be trusted the way a single backtest number would suggest.

## Key terms

| Term | Meaning |
|---|---|
| Combinatorial Purged Cross-Validation (CPCV) | Testing every combination of k held-out groups out of N, each purged and embargoed, instead of one sequential split |
| Backtest path | One reconstructed out-of-sample performance history, assembled from CPCV's combination results |
| `C(N, k)` | The number of distinct group combinations CPCV tests |
| Sharpe ratio distribution | The spread of performance estimates across all CPCV combinations/paths, not just their average |

## Recap

CPCV takes purging and embargoing and applies them across every possible combination of held-out groups, turning one lucky-or-not backtest path into a distribution of out-of-sample Sharpe ratios that reveals how consistent — or fragile — a strategy's apparent edge really is. Next, Lesson 17: The Deflated Sharpe Ratio & Multiple Testing, which tackles a related problem: what happens to that Sharpe ratio once you've tested many strategies and only reported the best one.
