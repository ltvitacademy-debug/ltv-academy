# Statistics & Machine Learning Interview Questions

For a research-flavored quant role, the statistics and ML round is often the most consequential one — and the capstone project gave you real, defensible answers to most of it already. This lesson works through the questions that come up most, grounded in exactly the choices SR-5 made in Lessons 7-12.

## What you'll learn

- Why time-series problems break the standard ML playbook, and how to say so clearly
- Worked answers to six questions interviewers return to again and again
- A verified demonstration of spurious correlation between two unrelated random walks
- How to connect every answer back to a concrete decision made in building SR-5

## Why time series breaks the standard ML playbook

Most ML interview prep assumes i.i.d. data: a random train/test split is valid, and a model's cross-validated score estimates how it'll do on new, unrelated data. None of that holds for financial time series. Observations are serially correlated, a random shuffle leaks future information into training, and two completely unrelated series can show strong correlation purely from trending together — not because they're related. Naming this distinction unprompted is itself a strong signal in an interview.

## Question 1: "Why not just use a random train/test split?"

Because a random split lets the model train on data from *after* the test period and evaluate on data from *before* it — information the model could never have had in real deployment. SR-5 used purged walk-forward cross-validation instead (Lesson 8): train only on data available up to a point in time, and purge the gap around each test fold so overlapping-label leakage can't sneak in. This is the single most common mistake point in a quant ML pipeline, and naming it immediately is a strong signal in an interview.

## Question 2: "How do you know your backtest result isn't a spurious correlation?"

This is worth demonstrating concretely rather than just asserting. Two completely independent random walks — pure noise, no relationship at all — show meaningful correlation far more often than intuition expects:

```python
import random

def random_walk(n):
    x, out = 0, []
    for _ in range(n):
        x += random.choice([-1, 1])
        out.append(x)
    return out

# Across 500 trials of two independent 200-step random walks:
# mean |correlation| ≈ 0.43
# share of trials with |correlation| > 0.5 ≈ 43%
```

Two series with zero real relationship showed an average absolute correlation of about 0.43, and crossed 0.5 in roughly 43% of trials, purely from each one trending for stretches by chance. That's exactly why SR-5's hypothesis was stated before extensive tuning (Lesson 2) and validated out-of-sample (Lesson 8) rather than accepted because an in-sample correlation looked strong — a high in-sample number proves far less than it feels like it proves.

## Question 3: "Why Ridge regression instead of OLS or Lasso?"

SR-5 used Ridge (Lesson 8) because the feature set (sector-level reversal signals, Lesson 7) is correlated across sectors, and Ridge's L2 penalty shrinks correlated coefficients together rather than arbitrarily picking one and zeroing the rest, which is what Lasso's L1 penalty tends to do. OLS, with no penalty at all, would overfit the noisy, collinear feature set badly. The honest trade-off to name: Ridge keeps every feature with some nonzero weight, so it doesn't give you automatic feature selection the way Lasso does — that's a deliberate choice given the correlation structure, not an oversight.

## Question 4: "Why is Sharpe ratio a better evaluation metric here than R² or accuracy?"

R² and classification accuracy measure fit to the data, not economic value, and both can look fine while a strategy loses money after costs. Sharpe ratio (and the fuller risk picture from Lesson 12 — Sortino, Calmar, VaR/CVaR) directly measures risk-adjusted return, which is what actually matters for a trading signal. The deeper point worth making: always choose an evaluation metric that reflects the real-world objective, not the easiest one to compute.

## Question 5: "What's the risk of trying many features and models against the same backtest?"

This is the multiple-testing problem from Lesson 14's skeptical-audience prep, and it's worth having a tight answer ready: every additional model or feature combination tried against the same historical data raises the odds that *something* looks good by chance alone, independent of whether it's real. Mitigations include stating the hypothesis before extensive search, re-validating on fresh out-of-sample folds, and being honest that the mitigation reduces the risk rather than eliminating it.

## Question 6: "How would you detect if the strategy's edge decayed over time?"

Track rolling out-of-sample performance in fixed windows (quarterly or annual) rather than one aggregate number across the whole sample, and compare it against the pre-specified kill criteria from Lesson 14. A strategy whose rolling Sharpe trends steadily downward across several non-overlapping windows is showing a different signal than one with a single bad quarter inside an otherwise stable series.

## Key terms

| Term | Meaning |
|---|---|
| Spurious correlation | Apparent statistical relationship between two series with no real causal or structural connection, common in trending time series |
| Serial correlation | The tendency of a time series' values to be correlated with its own past values, which breaks i.i.d. assumptions |
| L1 vs. L2 penalty | Lasso's L1 penalty can zero out coefficients (feature selection); Ridge's L2 penalty shrinks correlated coefficients together without zeroing them |

## Recap

Six questions define most statistics/ML quant rounds: why not a random split, how to rule out spurious correlation (a verified ~0.43 mean correlation between pure-noise random walks makes the point concretely), why Ridge over OLS or Lasso, why Sharpe beats R² as an evaluation metric, the multiple-testing risk of extensive tuning, and how to detect edge decay. Every answer ties back to a real decision made building SR-5. Next, Lesson 21 moves to market knowledge and trading-specific interview questions.
