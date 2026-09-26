# SHAP

Permutation importance tells you which features matter overall. It cannot tell you why *this* customer was flagged, or in which direction a feature pushed the prediction. SHAP (SHapley Additive exPlanations) can. It splits any single prediction into one contribution per feature, and those contributions add up exactly to the model's output. Averaged across many rows, they also give a global picture.

## What you'll learn

- The idea behind SHAP: a base value plus one contribution per feature
- How to install SHAP and explain a gradient-boosted churn model with `TreeExplainer`
- How to read a global summary and a single-customer waterfall
- Cautions to keep in mind before presenting SHAP results

## The idea in one paragraph

SHAP borrows Shapley values from cooperative game theory: imagine the features are players cooperating to produce a prediction, and ask how to fairly divide the "credit" for moving the prediction away from the average. The result for one row is a *base value* (the model's average output) plus a signed contribution for each feature. Positive pushes the prediction up, negative pushes it down, and base plus contributions equals the model's actual output for that row. That additivity is what makes SHAP explanations easy to check and to communicate.

## Install and run

```
pip install shap
```

The outputs in this lesson were produced with shap 0.49.1 and scikit-learn 1.6.1. Other versions may return slightly different shapes or values, so check the current SHAP documentation if something differs.

We use the churn data from lesson 22 and explain a default gradient-boosting classifier.

```python
import numpy as np
import pandas as pd
import shap
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier

df = make_churn()
features = ["tenure_months", "monthly_charge", "support_tickets",
            "monthly_contract", "late_payments"]
X_train, X_test, y_train, y_test = train_test_split(
    df[features], df["churned"], test_size=0.25,
    random_state=0, stratify=df["churned"])
gb = GradientBoostingClassifier(random_state=0).fit(X_train, y_train)

explainer = shap.TreeExplainer(gb)
sv = explainer.shap_values(X_test)
base = float(np.ravel(explainer.expected_value)[0])
print("shape:", sv.shape)
print("base value (log-odds):", round(base, 3))
```

`TreeExplainer` is a fast, exact algorithm for tree ensembles. For a binary gradient-boosting classifier from scikit-learn, the contributions are in **log-odds** units, not probability. We saw `shape: (500, 5)` (500 test rows, 5 features) and a base value of `-1.072`. (`np.ravel` guards against the base value being returned as an array in some versions.)

## Global view: mean absolute SHAP

```python
global_imp = pd.Series(np.abs(sv).mean(axis=0), index=features)
print(global_imp.sort_values(ascending=False).round(3))
```

```
tenure_months       0.578
monthly_contract    0.462
monthly_charge      0.438
support_tickets     0.382
late_payments       0.329
```

The average size of each feature's push, regardless of direction. Tenure and contract type move predictions the most. Note that this ranking describes what *this fitted model* does. It differs a little from the permutation ranking in lesson 23, because that model was a random forest with an added noise column and used a different score.

The beeswarm summary plot goes further, showing every customer as a dot:

```python
import matplotlib.pyplot as plt

shap.summary_plot(sv, X_test, show=False)
plt.tight_layout()
plt.savefig("shap-summary.png", dpi=150)
```

Colour shows the feature value and position shows the push. Red (high tenure) sits on the left, so long-tenured customers are pushed toward *not* churning. Red `monthly_contract` (a month-to-month contract) sits on the right, pushing toward churn. This is direction that importance bars alone cannot show.

## Local view: one customer

```python
i = 0
contrib = pd.Series(sv[i], index=features).sort_values(key=abs, ascending=False)
print(contrib.round(3))
print("base + contributions =", round(base + sv[i].sum(), 3))
print("model log-odds       =", round(float(gb.decision_function(X_test.iloc[[i]])[0]), 3))
print("predicted churn prob =", round(float(gb.predict_proba(X_test.iloc[[i]])[0, 1]), 3))
```

```
monthly_contract   -0.560
monthly_charge      0.372
late_payments       0.281
support_tickets    -0.251
tenure_months       0.151

base + contributions = -1.08
model log-odds       = -1.08
predicted churn prob = 0.254
```

Customer 0 has 27 months of tenure, pays 76.77 a month, has 1 support ticket, 2 late payments, and is not on a monthly contract. The non-monthly contract pulls churn risk down the most (-0.56); the higher-than-average charge and two late payments push it up. Starting from the base value of -1.072 and adding the five contributions lands on -1.08 log-odds, exactly the model's output, which is a churn probability of about 25%. The waterfall plot draws this same table:

```python
explanation = explainer(X_test)
shap.plots.waterfall(explanation[i], show=False)
plt.tight_layout()
plt.savefig("shap-waterfall.png", dpi=150)
```

## Cautions

- **Log-odds, not probability.** Tell your audience the units, or convert the final result to a probability as we did.
- **Explains the model, not the world.** A large SHAP value means the model leaned on the feature, not that changing it would change the outcome.
- **Correlated features.** Credit can be split between them in ways that surprise you, so interpret them together.
- **Other explainers exist.** SHAP also provides model-agnostic explainers, which are slower; check the current documentation for which fits your model.

## Recap

SHAP breaks each prediction into a base value plus one signed contribution per feature, and the parts sum to the output. Averaging absolute values gives a global ranking, the beeswarm plot shows direction, and a waterfall explains one customer. Next: turning these results into a story your stakeholders can act on.
