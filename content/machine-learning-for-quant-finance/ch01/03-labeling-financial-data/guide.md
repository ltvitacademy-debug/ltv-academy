# Labeling Financial Data

Every supervised learning problem needs a label — the thing the model is trying to predict. In most ML courses, the label is obvious: a cat/dog tag on an image, a star rating on a review. In finance, deciding what counts as "the market went up" turns out to be a real design decision with real consequences, and getting it wrong quietly breaks everything downstream. This lesson covers the standard fixed-horizon approach, its weaknesses, and the triple-barrier method that fixes them.

## What you'll learn

- Why "will the price go up or down" is not as well-defined a question as it sounds
- The fixed-horizon labeling method and its main weakness
- The triple-barrier method: profit-take, stop-loss, and time barriers, from López de Prado's *Advances in Financial Machine Learning*
- Meta-labeling: using a second model to decide whether to act on a primary model's signal

## The labeling problem

The simplest approach, **fixed-horizon labeling**, looks a fixed number of bars ahead (say, 5 days) and labels the outcome 1 if the return over that window exceeds some threshold, -1 if it falls below the opposite threshold, and 0 otherwise. It's simple to implement, but it has a structural flaw: it ignores everything that happens *between* now and the horizon. A position might blow through a painful stop-loss on day 2 and then happen to recover by day 5 — the fixed-horizon label would call that a win, even though no real trader following a stop-loss discipline would have held on to see it.

```python
import numpy as np

def fixed_horizon_label(prices, horizon=5, threshold=0.01):
    fwd_return = prices.shift(-horizon) / prices - 1
    labels = np.where(fwd_return > threshold, 1,
              np.where(fwd_return < -threshold, -1, 0))
    return labels
# Ignores any stop-loss or profit-take that would have triggered in between
```

## The triple-barrier method

López de Prado's **triple-barrier method** labels each observation based on which of three barriers is touched first:

1. **Profit-take barrier** — an upper price level; touching it first labels the observation a win
2. **Stop-loss barrier** — a lower price level; touching it first labels the observation a loss
3. **Time barrier** — a maximum holding period; if neither price barrier is touched first, the label is based on the return at this cutoff (or labeled 0/neutral)

This mirrors how a real position is actually managed — closed early on a profit target or a stop-loss, or closed at a maximum holding time — so the label reflects an outcome a trading rule could actually have realized.

```python
def triple_barrier_label(price_path, pt=0.02, sl=0.01, max_bars=10):
    entry = price_path[0]
    for i, p in enumerate(price_path[1:max_bars + 1], start=1):
        ret = p / entry - 1
        if ret >= pt:
            return 1          # profit-take barrier touched first
        if ret <= -sl:
            return -1         # stop-loss barrier touched first
    final_ret = price_path[max_bars] / entry - 1
    return 1 if final_ret > 0 else -1   # time barrier reached
```

## Meta-labeling

A related idea is **meta-labeling**: a primary model decides the direction of a trade (long or short), and a second model is trained only to decide whether to *act* on that signal at all — effectively predicting whether the primary model's call will be correct this time. This separates "which way" from "how confident," which tends to improve precision and makes it easier to size positions, and it's a pattern you'll see reused once we reach ensembling in Lesson 9.

## Key terms

| Term | Meaning |
|---|---|
| Fixed-horizon labeling | Labels the outcome based on the return after a fixed number of bars, ignoring the path |
| Triple-barrier method | Labels based on whichever of profit-take, stop-loss, or time barrier is touched first |
| Profit-take barrier | The upper price level that, if touched first, labels the outcome a win |
| Stop-loss barrier | The lower price level that, if touched first, labels the outcome a loss |
| Meta-labeling | A second model that decides whether to act on a primary model's directional call |

## Recap

How you define the label shapes everything a model can learn — fixed-horizon labeling is simple but ignores the path, while the triple-barrier method labels outcomes the way a real trading rule would actually realize them. Meta-labeling takes this further by separating direction from confidence. Next up, Lesson 4: Sample Weights & Overlapping Outcomes, where we deal with a side effect of triple-barrier labels — they overlap in time, and that breaks a standard ML assumption.
