# Capstone: Wrap-Up & Portfolio Presentation

You've built the model and run it through honest, purged validation. The last step is writing it up the way a hiring quant researcher actually wants to read it — and that write-up is itself a skill, separate from the modeling work, that this lesson teaches directly.

## What you'll learn

- What a hiring quant researcher actually looks for in a project write-up
- Structuring a README for a quant ML project
- Why reporting a single flattering Sharpe ratio undermines your credibility
- How to tie your conclusion back to Chapter 1's "why finance is different" framing
- A recap of the full course

## What a reviewer is actually checking for

Someone reviewing this project for a hiring decision is not primarily grading whether your model made money in a backtest. They're checking whether you understand *why* backtests mislead people, and whether your process shows it. Specifically, they're looking for:

- **Did you avoid look-ahead bias?** Is every feature and label timestamped using only information that would have actually been available at that point in time (Chapters 1, 4, and 6's NLP timing caveat)?
- **Did you use proper cross-validation?** Purged and embargoed walk-forward CV, or something stronger, not a random k-fold split that ignores time order (Chapter 4).
- **Did you report a skeptical, deflated performance estimate** rather than a single flattering number? Multiple models or feature sets tried without correcting for that multiplicity is one of the most common and most damaging mistakes a reviewer will be watching for (Chapter 4's deflated Sharpe ratio).
- **Did you check feature importance and stability**, not just accept a good-looking aggregate metric at face value (Chapter 5)?
- **Can you explain what you'd do next** if the signal turned out weak — do you understand this as a process, not a one-shot bet?

A write-up that proactively addresses all five of these, even when the honest answer to "did it work" is "only weakly" or "not robustly," reads as far more credible than a write-up boasting an untrustworthy 3.0 Sharpe ratio with no validation detail.

## Structuring the README

A strong project README for this kind of work typically includes:

```markdown
# ML Return-Prediction Model — Capstone

## Problem
What you're predicting, for what universe of assets, and why.

## Data
Real or simulated; if simulated, say so plainly and explain the design choices.

## Labeling
What label you chose and why (e.g., triple-barrier, with parameters).

## Features
What you engineered and the reasoning behind each one.

## Validation plan (written before training)
CV scheme, purge/embargo windows, and metrics -- stated as a pre-commitment,
not reverse-engineered from the results.

## Results
Out-of-sample IC and/or Sharpe, reported as a distribution across folds,
not a single number. State the deflated Sharpe ratio if multiple
configurations were tested.

## Stability and interpretation
Feature importance (permutation/SHAP) and stability across time.

## Honest conclusion
Does this show genuine signal? How confident should anyone be in that,
and what would you test next?
```

## Why a flattering single number backfires

Reporting one eye-catching Sharpe ratio without validation detail is a red flag to anyone who has read this far into a course like this one — it signals either that the multiple-testing and overfitting risks from Chapter 4 weren't understood, or that they were understood and glossed over anyway. Either reading damages credibility more than a modest, carefully-validated result would. The deflated Sharpe ratio exists precisely so you can report a number that's already been adjusted for how many things you tried — use it, and say that you used it.

## Tying back to Chapter 1

This course opened with a simple claim: finance is different from the domains where most machine learning success stories come from, because signal-to-noise is low and the data-generating process keeps shifting. Everything since then — careful labeling, purged validation, honest feature interpretation, skepticism toward any single flattering metric — has been the practical response to that one claim. A capstone write-up that explicitly connects its own careful process back to that opening idea shows a reviewer you understood the course's actual thesis, not just its individual techniques.

## Key terms

| Term | Meaning |
|---|---|
| Look-ahead bias | Using information in a feature or label that wasn't actually available at that point in time |
| Deflated Sharpe ratio | A Sharpe ratio adjusted for the number of models/configurations tried, correcting for multiple-testing inflation |
| Pre-committed validation plan | A validation plan written down before training, not adjusted after seeing results |

## Recap

A strong capstone write-up shows a reviewer that you avoided look-ahead bias, used proper purged validation, reported a skeptical rather than flattering performance estimate, checked feature stability, and can articulate what you'd test next — all tied back to the course's opening claim that finance's low signal-to-noise and non-stationarity demand exactly this kind of discipline. That's the full arc of this course, from why finance is different through supervised and unsupervised models, rigorous validation, interpretation, modern topics, and now a capstone built and presented the way a real quant researcher would defend it. Course complete.
