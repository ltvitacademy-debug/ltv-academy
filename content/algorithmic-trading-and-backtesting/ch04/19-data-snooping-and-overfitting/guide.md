# Data Snooping & Overfitting

This is arguably the single most important lesson in the course for separating a real quant from a hobbyist. Every bias covered so far — costs, impact, look-ahead, survivorship — can corrupt one backtest. Data snooping and overfitting corrupt your *judgment about many backtests*, and they are so easy to fall into that even careful, well-intentioned researchers do it constantly without realizing it. The central, honest fact of this lesson: most backtested "edges" don't survive out-of-sample, and this is the main reason why.

## What you'll learn

- What data snooping is, and why testing many ideas on the same dataset is dangerous even without any single mistake
- How overfitting happens: fitting a strategy's parameters so closely to historical noise that it stops generalizing
- Why in-sample Sharpe ratios systematically overstate true, future performance
- Train/test splits and walk-forward analysis as the standard defenses
- Purged and embargoed cross-validation: the fix for a subtler leakage walk-forward alone doesn't catch
- A full hands-on exercise: diagnosing and repairing a strategy with a real, deliberately planted leakage bug
- Why this is the central lesson of Chapter 4, and the honest limits it implies

## Data snooping: the danger of testing many ideas on the same data

**Data snooping** (also called data dredging) happens when you test many different hypotheses, strategies, or parameter combinations against the same historical dataset and report the best result as if it were a single, pre-specified test. The statistical problem is subtle but severe: if you test 100 random, meaningless trading rules against five years of market data, pure chance guarantees that some of them will show an impressive-looking historical Sharpe ratio — not because they capture anything real, but because five years of data contains a finite, limited amount of genuine signal and an enormous amount of noise, and with enough tries you *will* find a rule that happened to fit that noise well.

This is the same statistical phenomenon as "if you flip 100 coins 20 times each, some coin will come up heads 15+ times" — that coin isn't biased, you just tried enough coins. A strategy "discovered" by testing thousands of parameter combinations, indicator variations, or entry/exit rules against the same price history has a very real chance of being exactly that lucky coin, with zero actual predictive power going forward.

## Overfitting: when a model fits noise instead of signal

**Overfitting** is the mechanism that produces this problem at the level of a single strategy's parameters. If you let a strategy's parameters (a moving-average window, a threshold, a stop-loss level) become flexible enough and tune them against enough historical data, the optimization process will happily fit not just the real underlying pattern but also the random noise specific to that exact historical sample — the model becomes a very precise description of *what already happened*, which is a fundamentally different thing from a description of *what tends to happen*.

```python
# Dangerous pattern: sweeping many parameters and keeping the
# single best result, evaluated on the SAME data used to search.
best_sharpe = -999
best_params = None
for fast_n in range(2, 60):
    for slow_n in range(10, 250):
        if fast_n >= slow_n:
            continue
        result = vectorized_backtest(price, fast_n, slow_n)  # from Lesson 13
        if result["sharpe"] > best_sharpe:
            best_sharpe = result["sharpe"]
            best_params = (fast_n, slow_n)

# best_sharpe is now almost certainly inflated — it was selected
# BECAUSE it was the best fit to this exact historical sample,
# out of ~3,000 combinations tried, not because (fast_n, slow_n)
# is fundamentally special.
```

With roughly 3,000 parameter combinations tested against the same data, finding one that looks great is close to guaranteed, whether or not the underlying signal is real. The reported `best_sharpe` from this loop is not a trustworthy estimate of future performance — it's the maximum of thousands of noisy samples, which is a statistically different (and much more optimistic) quantity than a single honest sample.

## Why in-sample Sharpe ratios collapse out-of-sample

The term for data the parameters were chosen on is **in-sample**; data never touched during that selection process is **out-of-sample**. A parameter combination selected for its in-sample Sharpe ratio is, by construction, selected partly for fitting that sample's specific noise. When you then test the same parameters on new, out-of-sample data — data the optimization never saw — the noise that was fit no longer helps (it was specific to the old sample), and only whatever genuine signal exists remains. Since most of an aggressively-optimized in-sample result was noise-fitting rather than real signal, the out-of-sample Sharpe typically falls substantially, sometimes to zero or negative, even for strategies that looked spectacular in-sample. This single pattern — the in-sample/out-of-sample Sharpe collapse — is the most reliable tell that a backtest found an overfit artifact rather than a real, durable edge, and it is extremely common even among professionals who know better.

## Standard defenses

- **Train/test split.** Reserve a meaningful chunk of your historical data (commonly the most recent 20-30%) that is never touched during strategy design or parameter selection. Only evaluate the finished, locked-down strategy on that held-out set once, at the end.
- **Walk-forward analysis.** Instead of one static train/test split, repeatedly re-fit parameters on a rolling window of past data and test on the immediately following period, then roll forward in time. This simulates how a real researcher would actually have to operate — periodically re-optimizing using only data available up to that point — and produces a more honest, if still imperfect, estimate of live performance.
- **Limit the search space, and penalize complexity.** Fewer parameters, simpler rules, and strong priors based on real market intuition (not blind search) are less prone to overfitting than a model with many free parameters tuned by brute-force search. If a strategy only works for very specific, narrow parameter values and degrades sharply for nearby ones, that instability itself is a warning sign of overfitting rather than a real, robust effect.
- **Track how many things you tried.** If you tested 500 variations before settling on one, your effective statistical significance is far weaker than a single pre-specified test — be honest with yourself (and anyone you report results to) about that number.

## Purged and embargoed cross-validation: the leak walk-forward alone misses

Walk-forward analysis fixes the obvious leak (testing on data from before the parameters were ever selected). There's a subtler one it doesn't automatically fix: when a **label spans multiple future bars** — a feature engineered from a 5-day forward return, say — a training observation right before a test fold can have a label window that reaches *into* the test period, leaking test-period information into training even though the fold boundary itself looks clean. **Purging** removes any training observation whose label window overlaps the test set; an **embargo** additionally excludes a buffer of observations immediately *after* the test set, since serial correlation can let information leak backward across that boundary too.

```python
def purged_train_indices(n, test_start, test_end, label_horizon, embargo):
    """
    n:             total number of time-ordered observations
    test_start,
    test_end:      the test fold's index range [test_start, test_end)
    label_horizon: how many future bars each label looks ahead
                   (e.g., 5 for a 5-day forward return label)
    embargo:       extra bars excluded immediately after the test set
    """
    train_indices = []
    for i in range(n):
        if test_start <= i < test_end:
            continue   # it's in the test fold itself

        # PURGE: a training point's label covers [i, i + label_horizon).
        # If that window overlaps the test fold, it leaks test-period
        # information into training.
        label_end = i + label_horizon
        overlaps_test = (i < test_end) and (label_end > test_start)
        if overlaps_test:
            continue

        # EMBARGO: exclude a buffer right after the test fold too
        if test_end <= i < test_end + embargo:
            continue

        train_indices.append(i)
    return train_indices

naive_train = [i for i in range(30) if not (15 <= i < 20)]
purged_train = purged_train_indices(n=30, test_start=15, test_end=20, label_horizon=5, embargo=3)

print(f"Naive train (excludes only the test fold): {len(naive_train)} points")
print(f"Purged + embargoed train:                  {len(purged_train)} points")
print(f"Points removed beyond the naive exclusion:  {len(naive_train) - len(purged_train)}")
```

```
Naive train (excludes only the test fold): 25 points
Purged + embargoed train:                  18 points
Points removed beyond the naive exclusion:  7
```

Of the 7 additionally-removed points: 4 (indices 11-14) are purged because their 5-bar label windows reach into the test fold (15-19), and 3 (indices 20-22) are embargoed as a post-test buffer. A naive walk-forward split would have silently trained on all 7 of these, each one carrying some test-period information into the training set — a smaller, subtler version of the exact look-ahead problem Lesson 18 covers, specifically caused by label windows rather than feature windows.

## Hands-on: repair a strategy with a real planted leakage bug

Here's a moving-average-style strategy, backtested on a pure random-walk price series — meaning, by construction, there is **no real predictable edge in this data at all**. Any strategy that shows a strong positive Sharpe ratio on it is necessarily finding an artifact, not a real signal:

```python
import numpy as np

rng = np.random.default_rng(419)
n = 2000
returns = rng.normal(0, 0.01, n)          # pure noise, zero real signal
prices = 100 * np.cumprod(1 + returns)
daily_returns = np.diff(prices) / prices[:-1]

# --- The strategy as originally written ---
def leaky_strategy(daily_returns):
    signal = daily_returns                 # <-- the bug is right here
    positions = np.where(signal > 0, 1, -1)
    strat_returns = positions * daily_returns
    return strat_returns

def sharpe(returns):
    return (returns.mean() / returns.std()) * np.sqrt(252)

leaky_returns = leaky_strategy(daily_returns)
print(f"Leaky strategy Sharpe: {sharpe(leaky_returns):.3f}")
```

```
Leaky strategy Sharpe: 20.485
```

**Stop and diagnose this yourself before reading on.** A Sharpe ratio of 20 is not a good result to celebrate — per this lesson's own standard, it's close to the single most reliable signal that something is wrong. Real, durable strategies essentially never sustain a Sharpe anywhere near this; a number this extreme should trigger immediate suspicion, not excitement.

<details>
<summary>Diagnosis and fix</summary>

The bug: `signal = daily_returns` uses **today's own realized return** to decide **today's position** — `positions[i]` is computed from `daily_returns[i]`, the exact same value the strategy's return for that day (`positions[i] * daily_returns[i]`) depends on. This is the same-bar leakage: the strategy effectively already knows which direction the market moved today before placing today's trade. It's not predicting anything — it's looking at the answer first.

```python
def fixed_strategy(daily_returns):
    signal = np.roll(daily_returns, 1)      # yesterday's return, not today's
    signal[0] = 0                             # no prior data for the first bar
    positions = np.where(signal > 0, 1, -1)
    strat_returns = positions * daily_returns
    return strat_returns[1:]                   # drop the first (undefined-signal) bar

fixed_returns = fixed_strategy(daily_returns)
print(f"Fixed strategy Sharpe: {sharpe(fixed_returns):.3f}")
```

```
Fixed strategy Sharpe: 0.409
```

Once the signal only uses yesterday's return — information genuinely available before the trade — the Sharpe collapses from 20.485 to 0.409, which is exactly what should happen on a pure random walk with no real signal: a small, noise-level number consistent with no real edge, not a spectacular one.

</details>

## Key terms

| Term | Meaning |
|---|---|
| Data snooping | Testing many hypotheses against the same dataset and reporting the best result as if it were a single test |
| Overfitting | Tuning a model's parameters so closely to a specific historical sample that it fits that sample's noise, not a general pattern |
| In-sample / out-of-sample | Data used (in-sample) vs. never used (out-of-sample) during strategy design and parameter selection |
| Walk-forward analysis | Repeatedly re-fitting on a rolling past window and testing on the following period, rolling forward through time |
| Purging | Removing training observations whose label window overlaps the test fold, in time-series cross-validation |
| Embargo | An additional buffer of excluded observations immediately after a test fold, guarding against backward leakage from serial correlation |

## Recap

Testing many ideas or parameter combinations against the same historical data makes it close to certain you'll find something that looks good by chance alone — and the in-sample Sharpe ratio from that search is a biased, optimistic number, not an honest estimate of future performance. Train/test splits and walk-forward analysis are the standard, disciplined defenses. Next, Lesson 20 closes this chapter with realistic fill assumptions — the remaining execution details that determine whether a strategy's backtested trades could actually have happened the way the simulation claims.
