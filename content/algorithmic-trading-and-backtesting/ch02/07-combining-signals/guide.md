# Combining Signals

Real strategies rarely rely on one signal. A momentum signal, a value signal, and a quality signal each capture something different, and a good combination can be more robust than any one of them alone — but combining badly is one of the easiest ways to quietly destroy a good signal with a bad one.

## What you'll learn

- Why combining uncorrelated signals can raise the information ratio of the blend
- Equal weighting vs. information-coefficient weighting
- How to measure a signal's quality with the Information Coefficient (IC)
- Why correlated signals should not simply be added together at equal weight
- The overfitting risk of optimizing combination weights, previewed honestly

## Why combining can help

If two signals are both genuinely predictive but their errors are not perfectly correlated, averaging them cancels out some of each one's idiosyncratic noise while keeping the shared, real signal — the same logic behind portfolio diversification applied to signals instead of assets. The benefit shrinks the more correlated the signals already are; combining two versions of basically the same momentum signal adds little.

## Measuring signal quality: the Information Coefficient

The **Information Coefficient (IC)** is the correlation between a signal, measured at time t, and the forward return it's trying to predict:

```python
import pandas as pd

# signal: cross-sectional signal values at time t (e.g., ranks)
# fwd_return: realized return from t to t+1 (or t+k)
ic = signal.corrwith(fwd_return, axis=1).mean()
# .corrwith computed per date, then averaged across dates
```

An IC of 0.05 sounds small, but in cross-sectional equity signals, ICs in the 0.02–0.08 range are common for genuinely useful signals when applied across a large universe and many periods — this is a game of small, repeatable edges, not big single predictions. A near-zero or unstable (sign-flipping across periods) IC is a sign the signal isn't adding real information.

## Equal weighting vs. IC weighting

The simplest combination is equal weighting each normalized signal:

```python
# signals: dict of {name: normalized, lagged signal DataFrame}
combined_equal = sum(signals.values()) / len(signals)
```

A more deliberate approach weights each signal by its own measured quality (its IC), so a stronger signal contributes more:

```python
ic_by_signal = {name: measure_ic(sig, fwd_return) for name, sig in signals.items()}
total_ic = sum(abs(v) for v in ic_by_signal.values())
weights = {name: ic_by_signal[name] / total_ic for name in signals}

combined_weighted = sum(w * signals[name] for name, w in weights.items())
```

Equal weighting is simpler and harder to overfit; IC weighting can do better when you have real conviction about which signal is stronger, but every weight you estimate from history is itself a parameter that can be fit to noise — more on this below.

## Don't just add correlated signals

If two signals are 0.9 correlated with each other, adding them at equal weight doesn't give you "two votes" of real information — it mostly doubles down on one underlying driver and gives it double the influence it should have in the blend. Before combining, check the pairwise correlation matrix of your candidate signals; if two are highly correlated, treat them as one signal (perhaps averaged together first) rather than two independent votes.

## The honest caveat: optimizing weights is itself overfitting risk

Estimating an IC-based weight, or any more elaborate optimized weight, from the same historical sample you'll use to judge the result is exactly the kind of parameter-fitting that Chapter 1's hypothesis discipline (Lesson 5) warned about, and that Chapter 4 covers in full under data snooping. A combination of signals that looks great because its weights were tuned on the full history is not meaningfully different from fitting any other parameter to the backtest — treat combination weights with the same suspicion you'd apply to a cherry-picked lookback period, and validate them out-of-sample before trusting them.

## Key terms

| Term | Meaning |
|---|---|
| Information Coefficient (IC) | Correlation between a signal and the forward return it's trying to predict |
| Equal weighting | Combining normalized signals with equal weight, simple and harder to overfit |
| IC weighting | Weighting each signal by its measured predictive quality |
| Signal correlation | How similar two signals' information content is; high correlation means little diversification benefit |
| Overfitting risk (combination) | Tuning combination weights on the same data used to evaluate performance |

## Recap

Combining genuinely different, lowly-correlated signals can improve robustness, but the combination weights themselves are parameters that need the same out-of-sample scrutiny as any signal. Next, Lesson 8 takes the combined signal and turns it into actual portfolio weights.
