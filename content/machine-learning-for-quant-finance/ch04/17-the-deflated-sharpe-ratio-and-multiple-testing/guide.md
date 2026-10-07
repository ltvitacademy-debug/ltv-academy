# The Deflated Sharpe Ratio & Multiple Testing

Here's a scenario every quant researcher eventually runs into: you test 200 variations of a strategy — different lookback windows, different features, different thresholds — and one of them posts a Sharpe ratio of 2.1. Is that skill? Even if every single one of those 200 variations had *zero* true edge, pure randomness guarantees that some of them will show an impressively high Sharpe ratio just by chance, and you only ever hear about the winner. Reporting that single best Sharpe ratio without accounting for how many you tried is a textbook case of **multiple-testing bias** (also called selection bias), and it's one of the most common ways quant research fools itself. The **Deflated Sharpe Ratio (DSR)**, developed by David Bailey and Marcos López de Prado, is the tool built to correct for it.

## What you'll learn

- Why testing many strategies and reporting the best Sharpe ratio overstates true skill
- The two things DSR adjusts for: the number/variance of trials, and the return distribution's skewness and kurtosis
- A simplified conceptual formula and Python sketch (hand-implemented, since this isn't an sklearn function)
- How to read a DSR value once you have one

## The core problem: the expected maximum keeps climbing

If you generate many random, zero-skill Sharpe ratio estimates, the *maximum* of that batch isn't centered at zero — it drifts upward as you test more strategies, purely from the mechanics of taking a max over more draws. The more variations you test, and the more those variations' Sharpe ratios vary from each other, the higher an observed Sharpe ratio needs to be before it's actually surprising. A Sharpe ratio of 1.5 might be genuinely remarkable if it's the only strategy you ever tested; the same 1.5 is unremarkable if it's the best of 500 you tried.

## What DSR corrects for

DSR builds on the **Probabilistic Sharpe Ratio (PSR)**, which asks: given an estimated Sharpe ratio from a finite, possibly non-normal sample of returns, what's the probability the *true* Sharpe ratio exceeds some benchmark? PSR already accounts for sample length and for the return distribution's skewness and kurtosis — a Sharpe ratio estimated from a small, fat-tailed, negatively skewed sample is less trustworthy than the same number from a long, well-behaved one, and PSR's confidence calculation reflects that.

DSR is PSR evaluated against a benchmark that isn't zero — it's the **expected maximum Sharpe ratio you'd see from N trials if every one of them had zero true skill**, a benchmark that rises with both the number of trials (N) and how much the trials' Sharpe ratios vary from each other. In other words: DSR answers "is this Sharpe ratio genuinely above what pure luck across this many attempts would have produced anyway?" — not just "is it above zero?"

## A simplified sketch

This isn't something you call from `sklearn` — DSR is typically hand-implemented or pulled from a specialized research library, because it combines several distinct statistical pieces. A simplified version:

```python
import numpy as np
from scipy.stats import norm, skew, kurtosis

def probabilistic_sharpe_ratio(sr_hat, sr_benchmark, returns, n_obs):
    gamma3 = skew(returns)
    gamma4 = kurtosis(returns, fisher=False)  # non-excess kurtosis
    denom = np.sqrt(1 - gamma3 * sr_hat + (gamma4 - 1) / 4 * sr_hat**2)
    z = (sr_hat - sr_benchmark) * np.sqrt(n_obs - 1) / denom
    return norm.cdf(z)

def expected_max_sharpe(sr_std_across_trials, n_trials):
    euler_mascheroni = 0.5772
    return sr_std_across_trials * (
        (1 - euler_mascheroni) * norm.ppf(1 - 1 / n_trials)
        + euler_mascheroni * norm.ppf(1 - 1 / (n_trials * np.e))
    )

def deflated_sharpe_ratio(sr_hat, returns, n_obs, n_trials, sr_std_across_trials):
    sr_benchmark = expected_max_sharpe(sr_std_across_trials, n_trials)
    return probabilistic_sharpe_ratio(sr_hat, sr_benchmark, returns, n_obs)
```

`expected_max_sharpe` estimates where the best-of-N-trials Sharpe ratio would land under pure luck, given how many trials there were and how dispersed their Sharpe ratios were; `probabilistic_sharpe_ratio` then checks the candidate strategy's Sharpe ratio against *that* inflated benchmark instead of zero, while also accounting for skewness, kurtosis, and sample size.

## Reading a DSR value

DSR is a probability between 0 and 1 — specifically, the probability the strategy's true Sharpe ratio is actually positive once the number of trials and the shape of its return distribution are accounted for. A DSR near 1 says the result would be very unlikely under the "it's all just the best of many unlucky — or lucky — draws" explanation. A DSR near 0.5 or below is a strong signal that the headline Sharpe ratio you're excited about is exactly what you'd expect from pure multiple-testing luck, not genuine skill.

## Key terms

| Term | Meaning |
|---|---|
| Multiple-testing bias / selection bias | Reporting the best result from many trials without accounting for how many were tried |
| Probabilistic Sharpe Ratio (PSR) | Probability the true Sharpe ratio exceeds a benchmark, adjusted for sample size, skewness, and kurtosis |
| Deflated Sharpe Ratio (DSR) | PSR evaluated against the expected maximum Sharpe ratio from N zero-skill trials, instead of zero |
| Expected maximum Sharpe ratio | The benchmark DSR uses; rises with the number of trials and their Sharpe ratio dispersion |

## Recap

The Deflated Sharpe Ratio takes the Probabilistic Sharpe Ratio's adjustment for sample size, skewness, and kurtosis and evaluates it against a benchmark that accounts for how many strategies you tried, turning "is this Sharpe above zero" into the much harder, much more honest question "is this Sharpe above what pure luck across all my attempts would produce." Next, Lesson 18: Detecting Backtest Overfitting, which closes the chapter by tying DSR, CPCV, and purging together into a practical checklist for spotting an overfit backtest before it costs you money.
