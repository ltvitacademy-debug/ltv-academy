# Capstone Kickoff: Build and Validate an ML Return-Prediction Model

Everything in this course has been building toward one project: build a machine learning model that predicts financial returns, and validate it the way a careful quant researcher actually would — not the way a naive tutorial would. This lesson is the project brief. Read it fully before writing any code. The single most important idea in this course is that your validation plan has to be decided before you train a single model, not bolted on afterward once you've already seen which approach "worked."

## What you'll learn

- The capstone's scope and deliverables
- How to frame the prediction problem and choose/simulate a dataset
- Why the label choice comes from Chapter 1, not from convenience
- Why the validation plan must be locked in before any model training
- The concrete project brief and rubric you'll be graded against conceptually

## Problem framing

The capstone asks you to build an end-to-end pipeline that takes financial features for a set of assets and predicts a future return-related outcome, then validates that model honestly enough to say, with real confidence, whether it has found anything. This isn't about achieving an impressive-looking Sharpe ratio — it's about producing a defensible, honestly-validated answer to "does this model have genuine out-of-sample signal, and how much?"

## Step 1 — Acquire or simulate a dataset

You need a panel of assets with price history and a set of candidate features (e.g., momentum, volatility, valuation-style ratios, or any features from Chapters 2–3's toolkit). If you don't have a live data source available, simulate one deliberately:

```python
import numpy as np
import pandas as pd

np.random.seed(7)
n_assets, n_days = 50, 1500
dates = pd.bdate_range("2019-01-01", periods=n_days)

# Simulate a weak, noisy, regime-shifting signal on purpose --
# this is the realistic target: mostly noise, a little real structure.
returns = {}
for asset in range(n_assets):
    momentum = np.random.randn(n_days).cumsum() * 0.01
    regime = np.sin(np.arange(n_days) / 250) * 0.3  # slow regime drift
    noise = np.random.randn(n_days) * 0.02
    returns[f"asset_{asset}"] = momentum.clip(-1, 1) * regime * 0.05 + noise

price_panel = pd.DataFrame(returns, index=dates)
```

A simulated dataset is a legitimate choice for this project as long as you're honest that it's simulated — the point of the capstone is demonstrating the validation discipline, not sourcing proprietary data.

## Step 2 — Choose a label, deliberately

Go back to Chapter 1's labeling lesson. Don't default to "next-day return" just because it's the simplest column to compute. Consider the **triple-barrier method**: define an upper barrier (take-profit), a lower barrier (stop-loss), and a time barrier, and label each observation by which barrier it hits first. Whatever you choose, write down *why* — the label should reflect a realistic trading decision, not just whatever was easiest to compute.

## Step 3 — Choose a model family

Pick from Chapter 2's toolkit: regularized linear models for a transparent baseline, tree-based/gradient-boosted models for the main event, or an ensemble combining both. Pick one you can also explain with the tools from Chapter 5 (permutation importance, SHAP) — you'll need that in Lesson 27.

## Step 4 — Lock in the validation plan BEFORE training anything

This is the step most tutorials skip, and the one this entire course has been building toward. Before you fit a single model:

1. Decide your cross-validation scheme: **purged and embargoed walk-forward CV** (Chapter 4) is the minimum bar; combinatorial purged CV (CPCV) is stronger if you have the compute budget.
2. Decide your purge and embargo windows based on your label's time horizon — if your triple-barrier label can take up to 10 days to resolve, your purge window needs to account for that overlap.
3. Decide your evaluation metric up front: out-of-sample Information Coefficient (Chapter 5) and a risk-adjusted return metric, not just raw accuracy.
4. Decide how you'll report uncertainty: a single Sharpe ratio number is not acceptable — plan to report a distribution across folds and consider the deflated Sharpe ratio (Chapter 4) if you try more than one model/feature configuration.

Writing all four of these down *before* you see any results is the entire point — it's what separates honest research from fitting a validation scheme to whatever result you already liked.

## Project brief and rubric

A complete capstone submission demonstrates:

- [ ] A clearly stated prediction problem and dataset (real or deliberately simulated)
- [ ] A labeling choice with a written justification tying back to Chapter 1
- [ ] A validation plan written down *before* training, including CV scheme, purge/embargo windows, and metrics
- [ ] A trained model from Chapter 2's toolkit, evaluated using that pre-specified plan
- [ ] Feature importance and stability analysis from Chapter 5
- [ ] An honest conclusion: does this model show genuine signal, and how confident should anyone be in that conclusion?

## Key terms

| Term | Meaning |
|---|---|
| Validation plan | The CV scheme, purge/embargo windows, and metrics decided before any model is trained |
| Triple-barrier method | Labeling by which of an upper, lower, or time barrier an outcome hits first |
| Purge/embargo window | The gap removed around test periods to prevent leakage from overlapping outcomes |

## Recap

The capstone is one project: build an ML return-prediction model and validate it honestly, with the validation plan locked in before any training happens, drawing on every prior chapter — labeling from Chapter 1, model choice from Chapter 2, validation from Chapter 4, and interpretation from Chapter 5. Next up, Lesson 27: build it — a worked example walking through this exact pipeline end to end.
