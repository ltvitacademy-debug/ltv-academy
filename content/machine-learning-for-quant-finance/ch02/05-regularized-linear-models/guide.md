# Regularized Linear Models

Chapter 1 explained why financial data is noisy, prone to overfitting, hard to label well, and non-IID once labeled. Chapter 2 starts building the actual models, and it starts with linear models on purpose: they're the easiest to reason about, the fastest to fit, and — with the right regularization — often a very reasonable baseline in a low-signal environment where a complex model has more room to overfit than to find real structure.

## What you'll learn

- Why plain ordinary least squares regression struggles with noisy, collinear financial features
- Ridge regression (L2 penalty): what it does and when to prefer it
- Lasso regression (L1 penalty): automatic feature selection, and its pitfalls with correlated features
- Elastic Net: blending L1 and L2, plus why feature standardization is not optional here

## Why plain linear regression struggles in finance

Financial feature sets are often noisy and **collinear** — many engineered factors (momentum over 5 days, 10 days, 20 days; multiple moving averages) measure overlapping information. Ordinary least squares with collinear, noisy features tends to produce large, unstable coefficients that swing wildly with small changes in the training data — exactly the kind of instability you don't want when the underlying signal is already faint. Regularization fixes this by penalizing large coefficients, trading a little bias for a lot less variance.

## Ridge regression (L2)

**Ridge** adds a penalty proportional to the sum of squared coefficients. It shrinks all coefficients toward zero but rarely sets any to exactly zero — a good default when you believe most of your features carry at least a little real signal and you mainly want to tame collinearity-driven instability.

```python
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# Standardization matters: Ridge/Lasso penalize coefficient magnitude,
# so features must be on comparable scales first
ridge_model = make_pipeline(
    StandardScaler(),
    Ridge(alpha=1.0)
)
ridge_model.fit(X_train, y_train)
```

## Lasso regression (L1)

**Lasso** adds a penalty proportional to the sum of absolute coefficients, which can push some coefficients to exactly zero — effectively performing feature selection. That's attractive when you suspect only a handful of your engineered factors carry real signal. The catch: with strongly correlated features, Lasso tends to arbitrarily pick one of a correlated group and zero out the rest, which can make the selected features unstable across retrainings.

```python
from sklearn.linear_model import Lasso

lasso_model = make_pipeline(
    StandardScaler(),
    Lasso(alpha=0.01, max_iter=10000)
)
lasso_model.fit(X_train, y_train)
n_selected = (lasso_model.named_steps["lasso"].coef_ != 0).sum()
print(f"Features kept: {n_selected} / {X_train.shape[1]}")
```

## Elastic Net: the practical middle ground

**Elastic Net** blends the L1 and L2 penalties using a mixing parameter (`l1_ratio`), getting some of Lasso's feature selection while keeping more of Ridge's stability under collinearity — often the most practical choice for real financial factor sets.

```python
from sklearn.linear_model import ElasticNet

elastic_model = make_pipeline(
    StandardScaler(),
    ElasticNet(alpha=0.01, l1_ratio=0.5, max_iter=10000)
)
elastic_model.fit(X_train, y_train)
```

In every case, `alpha` controls overall regularization strength and should be tuned with cross-validation — ideally the walk-forward style covered in Chapter 4, not an ordinary random K-fold, for the same leakage reasons covered in Lesson 4.

## Key terms

| Term | Meaning |
|---|---|
| Collinearity | Features that carry overlapping, redundant information |
| Ridge (L2) | Penalizes squared coefficient size; shrinks but rarely zeroes coefficients |
| Lasso (L1) | Penalizes absolute coefficient size; can zero out coefficients (feature selection) |
| Elastic Net | A weighted blend of L1 and L2 penalties |
| Standardization | Scaling features to comparable ranges before regularized regression |

## Recap

Regularized linear models give this course a stable, interpretable baseline before moving to more complex models: Ridge for general stability under collinearity, Lasso when you want automatic feature selection, and Elastic Net as the common practical compromise. Next up, Lesson 6: Tree-Based Models, where we start capturing the non-linear interactions linear models can't see.
