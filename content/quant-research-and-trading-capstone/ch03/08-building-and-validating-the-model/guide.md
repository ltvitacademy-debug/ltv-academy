# Building & Validating the Model

Lesson 7 built the features. This lesson picks a model and proves, rather than assumes, that it's the right one — using validation discipline that would hold up to a skeptical reader, and an honest comparison that doesn't just pick the fanciest option available.

## What you'll learn

- The three candidate models: a naive rank-reversal baseline, a Ridge production model, and a Random Forest benchmark
- Why Ridge was chosen as the production model
- Purged walk-forward expanding-window cross-validation, and why overlapping labels require purging
- The Information Coefficient (IC) and IC t-stat, and the exact Ridge-vs-Random-Forest results

## Three candidates

- **Naive rank-reversal baseline** — not machine learning at all. Rank each sector by its trailing 5-day return and bet on reversal, full stop. This is the bar every model has to clear to justify its own complexity.
- **Ridge regression (production model)** — L2-regularized linear regression with `alpha=5.0`. Chosen for interpretability and resistance to overfitting, given that the cross-section has only 11 names to learn from at any one time.
- **Random Forest (benchmark)** — included specifically to test whether nonlinearity and interaction effects earn their extra complexity, or whether they just overfit.

## Purged walk-forward validation

Ordinary k-fold cross-validation assumes samples are independent. Ours aren't: because the target is a forward 5-day return, labels for nearby dates overlap in time, and a naive train/test split would let information leak across the boundary.

The fix is **purged walk-forward expanding-window cross-validation** (de Prado style):

- Initial training window: 2007–2011
- The window then expands forward one evaluation period at a time, always training only on the past
- A **5-day embargo** purges any label that overlaps the train/test boundary, so no leaked information crosses it
- This produces roughly 180 weekly out-of-sample (OOS) evaluation periods across 2012–2025

## Measuring skill: the Information Coefficient

```python
from sklearn.linear_model import Ridge
from scipy.stats import spearmanr

model = Ridge(alpha=5.0)
model.fit(X_train, y_train_fwd5d_rank)
ic = spearmanr(model.predict(X_test), y_test_fwd5d_rank).correlation
```

The **Information Coefficient (IC)** is the Spearman rank correlation between a model's predicted forward-5-day rank and the rank that actually occurred. Computing it for every one of the ~180 OOS periods and averaging, with a t-statistic on that average, is how a quant decides whether a model's edge is real or just noise.

## The result: Ridge wins, honestly

- **Ridge** OOS mean IC ≈ **0.045**, IC t-stat ≈ **2.1** — statistically significant
- **Random Forest** OOS mean IC ≈ **0.018**, t-stat ≈ **0.9** — *not* significant

This is a deliberate, honest finding. With only 11 cross-sectional names, Random Forest has enough flexibility to fit noise in-sample that doesn't generalize out-of-sample — it overfits. Ridge's regularization and linear structure are a better match for how little cross-sectional data there actually is. Ridge is chosen not because it's simpler to explain, but because the walk-forward evidence says it's the model that actually works.

## Key terms

| Term | Meaning |
|---|---|
| Information Coefficient (IC) | Spearman correlation between predicted and realized rank; a model's measured skill |
| Purged walk-forward validation | Expanding-window CV with an embargo that purges overlapping labels near each boundary |
| Regularization | A penalty (like Ridge's L2 term) that discourages overfitting by shrinking model coefficients |

## Recap

Three candidate models were validated the same honest way — purged walk-forward CV with a 5-day embargo, scored by Information Coefficient. Ridge's OOS mean IC of 0.045 (t≈2.1) beats Random Forest's 0.018 (t≈0.9, not significant), because Random Forest overfits an 11-name cross-section. Ridge is the production model. Next, Lesson 9 turns its predicted scores into an actual trading signal.
