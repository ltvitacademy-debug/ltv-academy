# From Idea to Hypothesis

This lesson closes out Chapter 1 by giving you a discipline, not a technique: how to turn a vague market idea into a hypothesis specific enough to actually fail. If you can't state in advance what result would prove your idea wrong, you can't really test it — you can only confirm it, which is a very different and much less useful thing.

## What you'll learn

- Why a hypothesis needs to be falsifiable before you look at any data
- The five things to pin down before running a single backtest
- Why writing the hypothesis down first is a defense against your own hindsight
- How this connects to the overfitting problem covered fully in Chapter 4
- A worked example of turning a vague idea into a specific, testable hypothesis

## Falsifiable, or it isn't science

"Momentum works" is not falsifiable — it's vague enough that almost any result can be waved in to confirm it. "A 12-month momentum signal, rebalanced monthly on the top/bottom decile of the S&P 500, produces a positive, statistically significant alpha after realistic transaction costs over 2000–2024" is falsifiable: it has a clear way to be wrong. The entire point of writing a hypothesis before touching the data is that it commits you, in writing, to what would count as a failure — so you can't quietly redefine success after you've already seen the result.

## The five things to pin down in advance

- **Universe and period** — exactly which instruments, and exactly which historical window (and whether you're reserving part of it, untouched, for later out-of-sample testing).
- **Signal definition** — the precise formula, with no free parameters you plan to tune after seeing results. If you must choose a lookback or threshold, decide the rule for choosing it before you see the backtest output.
- **Expected direction and rough magnitude** — not just "it goes up," but roughly what Sharpe ratio or return would be a meaningful confirmation versus what would be indistinguishable from noise.
- **Success metric, chosen in advance** — Sharpe ratio, hit rate, information coefficient — decide which one matters most before you compute any of them.
- **Kill criteria** — the specific result that would make you discard the idea rather than keep tweaking it.

## Writing it down as a guard against hindsight

The reason this has to happen *before* you look at the data isn't bureaucratic — it's that your own brain is an excellent after-the-fact rationalizer. Once you've seen a backtest result, it's almost impossibly easy to tell yourself a story about why a particular lookback, a particular universe cutoff, or a particular start date "obviously" made sense all along, when in fact you picked it because it produced a better number. A written hypothesis, timestamped before the test runs, is the only honest record of what you actually believed going in.

```python
# A hypothesis is worth writing down in a structure you
# can't quietly edit after seeing results — a dict you
# log to a file before any backtest code runs:

hypothesis = {
    "name": "sp500_12_1_momentum_decile",
    "universe": "S&P 500 constituents, point-in-time",
    "period_fit": "2000-01-01 to 2018-12-31",
    "period_holdout": "2019-01-01 to 2024-12-31",
    "signal": "12-1 month total return, monthly rebalance",
    "expected_direction": "top decile outperforms bottom decile",
    "success_metric": "Sharpe ratio on long-short decile spread",
    "kill_threshold": "Sharpe < 0.3 after costs on the holdout period",
}
```

## This is the seed of Chapter 4's central problem

If you skip this discipline, here's what tends to happen instead: you try a signal, it looks mediocre, you adjust a parameter, it looks better, you adjust again, and eventually you have a great-looking backtest that is actually just the result of searching until something matched the one history you have. That process is called overfitting or data snooping, and it's the subject of an entire chapter later in this course (Chapter 4: Realism in Backtests). Writing a falsifiable hypothesis first, and holding out data you genuinely don't look at until the end, is the first and cheapest line of defense against it.

## Key terms

| Term | Meaning |
|---|---|
| Falsifiable hypothesis | A claim specific enough that a particular result would prove it wrong |
| Kill criteria | The result, decided in advance, that makes you discard an idea rather than tune it |
| Holdout period | Historical data deliberately set aside and not examined until final testing |
| Data snooping / overfitting | Tuning a rule to match history you've already seen, producing a backtest that won't generalize |
| Success metric | The single, pre-chosen statistic used to judge whether a hypothesis held up |

## Recap

A testable hypothesis pins down the universe, the exact signal, the expected direction and size of the effect, the metric you'll judge it by, and the result that would make you walk away — all written down before you look at the data. That discipline is the bridge from Chapter 1's foundations into Chapter 2, which starts building real, concrete trading signals: Lesson 6 is next.
