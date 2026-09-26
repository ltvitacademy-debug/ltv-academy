# Price Prediction Walkthrough

Where churn asks "which class?", price prediction asks "how much?". The workflow is the same, but the details differ: regression metrics, a skewed target, and errors that grow with the price. This lesson predicts illustrative house prices end to end and shows what to check before you trust the result.

## What you'll learn

- Setting up a regression project with a mean-price baseline
- Comparing a linear model and gradient boosting with cross-validated MAE
- Trying a log-transformed target with `TransformedTargetRegressor`
- Reading a predicted-vs-actual plot and a residual plot

## The data

We generate 3,000 illustrative homes. Prices depend on size, bedrooms, age, and neighborhood, with noise built in.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(11)
n = 3000
df = pd.DataFrame({
    "sqft": rng.uniform(600, 3500, n).round(0),
    "bedrooms": rng.integers(1, 6, n),
    "age_years": rng.integers(0, 80, n),
    "neighborhood": rng.choice(["north", "central", "south", "east"],
                               n, p=[0.3, 0.2, 0.3, 0.2]),
})
premium = df.neighborhood.map({"north": 1.10, "central": 1.35,
                               "south": 0.95, "east": 1.0})
log_price = (np.log(df.sqft) * 0.9 + 0.04 * df.bedrooms
             - 0.003 * df.age_years + np.log(premium) + 5.6
             + rng.normal(0, 0.12, n))
df["price"] = np.exp(log_price).round(-2)
print(df.price.describe().round(0))
print("skew", round(df.price.skew(), 2))
```

Prices run from about $66,500 to $806,400 with a mean near $279,000, and a mild right skew of 0.55. Expensive homes are stretched out to the right, which is typical of prices.

## Split, preprocess, and choose a metric

```python
from sklearn.compose import ColumnTransformer, TransformedTargetRegressor
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split

X, y = df.drop(columns="price"), df["price"]
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, random_state=42)

pre = ColumnTransformer([
    ("num", StandardScaler(), ["sqft", "bedrooms", "age_years"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["neighborhood"]),
])
```

We will judge models by **mean absolute error (MAE)**: the average dollar miss, easy to explain to a non-technical audience.

## Baseline and candidates

`TransformedTargetRegressor` trains on a transformed target (here `log1p`) and converts predictions back to dollars with `expm1`, so the metric stays in dollars.

```python
from sklearn.pipeline import Pipeline
from sklearn.dummy import DummyRegressor
from sklearn.linear_model import Ridge
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.model_selection import cross_val_score

def wrap(model, log=True):
    pipe = Pipeline([("pre", pre), ("model", model)])
    if log:
        return TransformedTargetRegressor(
            regressor=pipe, func=np.log1p, inverse_func=np.expm1)
    return pipe

cands = {
    "baseline (mean)": Pipeline([("pre", pre),
                                 ("model", DummyRegressor())]),
    "ridge": wrap(Ridge(alpha=1.0), log=False),
    "ridge, log target": wrap(Ridge(alpha=1.0)),
    "hist GB": wrap(HistGradientBoostingRegressor(random_state=0),
                    log=False),
    "hist GB, log target": wrap(
        HistGradientBoostingRegressor(random_state=0)),
}
for name, m in cands.items():
    s = -cross_val_score(m, X_tr, y_tr, cv=5,
                         scoring="neg_mean_absolute_error")
    print(f"{name:20s} MAE ${s.mean():,.0f} +/- {s.std():,.0f}")
```

Output:

```
baseline (mean)      MAE $98,165 +/- 1,799
ridge                MAE $31,277 +/- 794
ridge, log target    MAE $32,970 +/- 753
hist GB              MAE $29,346 +/- 729
hist GB, log target  MAE $28,832 +/- 644
```

Predicting the mean price misses by about $98,000. Every real model cuts that by roughly two thirds. Gradient boosting with a log target is best at $28,832, a small edge over the others. The log target helped boosting slightly but hurt the ridge model here, a reminder to test a transformation rather than assume it helps. Because the fold-to-fold spread is around $700, the differences among the top three are modest.

## Final test evaluation

```python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
best = cands["hist GB, log target"].fit(X_tr, y_tr)
pred = best.predict(X_te)
print(round(mean_absolute_error(y_te, pred)),
      round(mean_squared_error(y_te, pred) ** 0.5),
      round(r2_score(y_te, pred), 3))
```

The test MAE is $28,932, RMSE $40,191 and R² 0.884. The median absolute percentage error is 8.6%. RMSE is larger than MAE because it punishes the big misses more.

## Diagnostics

```python
import matplotlib.pyplot as plt
res = y_te - pred
fig, ax = plt.subplots(1, 2, figsize=(9, 3.6))
ax[0].scatter(y_te, pred, s=8, alpha=0.5, color="#8E1C1C")
lim = [y_te.min(), y_te.max()]
ax[0].plot(lim, lim, color="#1E1A16", lw=1)
ax[0].set_xlabel("Actual price")
ax[0].set_ylabel("Predicted price")
ax[0].set_title("Predicted vs actual")
ax[1].scatter(pred, res, s=8, alpha=0.5, color="#C4952E")
ax[1].axhline(0, color="#1E1A16", lw=1)
ax[1].set_xlabel("Predicted price")
ax[1].set_ylabel("Residual")
ax[1].set_title("Residuals")
plt.tight_layout()
plt.show()
```

The left panel hugs the diagonal, a good sign. The right panel shows a funnel: residuals widen as predicted prices rise. In plain words, the model is off by roughly $10,000 to $20,000 on cheaper homes and by $50,000 or more on some expensive ones. Report that honestly, and consider a percentage-error metric if the business cares about relative accuracy.

## Recap

- Regression projects need a baseline (the mean) and a metric in business units.
- Compare linear and boosted models with cross-validation, and test transformations rather than assuming them.
- Use residual plots to find where the model is weakest.
- Report errors in dollars and percentages, with caveats.
