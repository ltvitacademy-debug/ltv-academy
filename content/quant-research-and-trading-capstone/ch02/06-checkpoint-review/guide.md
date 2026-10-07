# Checkpoint Review

Before any feature engineering or modeling, Phase 1 earns a formal checkpoint. Think of this lesson as the status update you'd actually give a research-desk lead: what did the data show, what do the statistics say about the hypothesis, and — the decision that actually matters — do we have a green light to keep building?

## What you'll learn

- A recap of what the cleaned data and exploratory analysis showed
- A recap of the statistical evidence for and against the SR-5 hypothesis
- The go/no-go decision to proceed into feature engineering, and why
- What this project would have done instead if the statistics had come back null

## What the data showed

Chapter 2 opened with 13 raw Stooq CSVs and closed with a clean, point-in-time panel: calendar-aligned, missing days handled conservatively, adjusted close verified, and the dynamic universe (XLRE from 2015, XLC from 2018) respected rather than backfilled. Exploration of that panel showed fat-tailed daily returns, clustered volatility with clear spikes in 2008, 2020, and 2022, a highly correlated 11-sector cross-section (0.6–0.9 pairwise), and a VIX series that tracks and leads realized volatility. None of that proves the hypothesis — it's groundwork — but it confirmed the data is clean enough and behaved enough like real markets to trust the tests built on top of it.

## What the statistics showed

Four tests were run against the hypothesis from Lesson 2, and all four point the same direction:

- A full-sample Spearman rank correlation of **≈ -0.07** between past-5d and forward-5d sector returns, with a Newey-West-adjusted t-stat of **≈ -2.4** — small, but statistically significant.
- An ADF test on the winner-minus-loser spread rejecting the unit-root null at 5% (**p ≈ 0.02**) — direct confirmation of mean reversion, not a trending series.
- A VIX-tercile split showing the effect is **regime-dependent**: significant in the high-VIX tercile (IC ≈ -0.11, t ≈ -2.9), not significant in the low-VIX tercile (IC ≈ -0.02, t ≈ -0.6).
- Honest caveats on data snooping (several related cuts of one dataset) and a small effective sample size once overlapping windows are accounted for.

## The go/no-go decision

This is a **go**. The evidence supports a real, if modest, reversal effect that strengthens exactly where the hypothesis predicted it would — in high-VIX regimes. That's a more convincing pattern than a single significant number in isolation, because it's consistent with the economic story (overreaction during fear, not during calm) rather than an unexplained statistical artifact. Phase 2 — feature engineering, modeling, and turning this into a tradable signal — is justified to begin.

This is a **go/no-go checkpoint**: a deliberate pause between phases where the team (or, here, you) explicitly decides whether to continue, not an assumption that work automatically proceeds. Every phase transition in this capstone gets one.

## What if the statistics had come back null?

It's worth being explicit about the counterfactual, because a research process that only ever reports "it worked" isn't trustworthy. If the Spearman correlation had been statistically indistinguishable from zero, or if the VIX-tercile split had shown no regime dependence, the honest **pivot decision** would have been one of:

- Narrow the hypothesis — perhaps reversal exists only at a different horizon (3-day or 10-day) or only in a subset of sectors — and retest, clearly labeling it as a secondary, more exploratory hypothesis.
- Report the null result as the finding. A rigorous "we tested this carefully and found nothing" is a legitimate, useful outcome — far more useful than quietly re-running tests until something looked significant.
- Stop the project at Phase 1 rather than build an elaborate model and backtest on top of a foundation that was never there. Building Phase 2 and 3 machinery to chase a null result wastes effort and risks exactly the kind of overfitting this course warns against elsewhere.

Because the preregistered success criteria from Lesson 3 were set before any of this analysis ran, there was never a question of quietly redefining success to fit whatever the data happened to show.

## Key terms

| Term | Meaning |
|---|---|
| Go/no-go checkpoint | A deliberate decision point between project phases where continuing is explicitly justified, not assumed |
| Pivot decision | A planned change in approach (narrower hypothesis, different horizon, or stopping) when evidence doesn't support the original plan |

## Recap

Phase 1 is done: the data is clean and explored, the statistics show a small but real, regime-dependent reversal effect, and the checkpoint decision is go. Had the evidence come back null, the plan was to narrow the hypothesis, report the null honestly, or stop — not force a result. Chapter 3 begins Phase 2: turning this statistical evidence into engineered features and a model.
