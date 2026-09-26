# Why Explainability Matters

A model that predicts well is not automatically a model you can use. Before a retention team spends budget on your churn scores, someone will ask *why* those customers are flagged. Before you ship, you will want to know the model learned something real rather than a shortcut. Explainability is the set of tools and habits that answer those questions. This chapter builds them; this lesson makes the case for why they matter.

## What you'll learn

- Four concrete reasons explainability matters in real data science work
- The difference between global and local explanations, and intrinsic and post-hoc methods
- How an explanation can expose a data leak that a metric hides
- The dataset we reuse for the whole chapter

## Four reasons it matters

1. **Trust and adoption.** Stakeholders act on predictions they understand. "Customers with many support tickets on monthly contracts are flagged" gets a campaign approved; "the model says so" does not.
2. **Debugging.** A model can score well for the wrong reasons. Explanations are the fastest way to spot leakage, broken features, and shortcuts.
3. **Decisions about people.** When a model influences lending, hiring, insurance, or similar outcomes, some regulations and internal policies require reasons for individual decisions and scrutiny for bias. Requirements vary by country and industry, so check with legal and compliance rather than assuming.
4. **Improvement.** Knowing which features drive predictions tells you where to spend engineering time, and which data you could stop collecting.

## Two axes of explanation

**Global vs. local.** A *global* explanation describes the model overall ("tenure is the strongest driver of churn"). A *local* explanation describes one prediction ("this customer is flagged mainly because of three recent support tickets").

**Intrinsic vs. post-hoc.** An *intrinsic* (interpretable) model can be read directly: linear and logistic regression coefficients, or a small decision tree. A *post-hoc* method explains a model after it is trained, usually a black box such as a boosted ensemble. Permutation importance and SHAP, the next two lessons, are post-hoc.

## Our running dataset: subscription churn

The dataset is 2,000 illustrative customers generated with a fixed seed, so every number below is reproducible. Churn depends on tenure, monthly charge, support tickets, contract type, and late payments, plus randomness.

```python
import numpy as np
import pandas as pd

def make_churn(n=2000, seed=7):
    rng = np.random.default_rng(seed)
    df = pd.DataFrame({
        "tenure_months": rng.integers(1, 61, n),
        "monthly_charge": rng.normal(70, 20, n).clip(15).round(2),
        "support_tickets": rng.poisson(1.5, n),
        "monthly_contract": rng.integers(0, 2, n),
        "late_payments": rng.poisson(0.6, n),
    })
    logit = (-1.4 - 0.04 * df.tenure_months
             + 0.02 * (df.monthly_charge - 70)
             + 0.45 * df.support_tickets
             + 1.2 * df.monthly_contract
             + 0.5 * df.late_payments)
    p = 1 / (1 + np.exp(-logit))
    df["churned"] = (rng.random(n) < p).astype(int)
    return df
```

## An interpretable model, read directly

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import roc_auc_score

df = make_churn()
features = ["tenure_months", "monthly_charge", "support_tickets",
            "monthly_contract", "late_payments"]
X_train, X_test, y_train, y_test = train_test_split(
    df[features], df["churned"], test_size=0.25,
    random_state=0, stratify=df["churned"])

scaler = StandardScaler().fit(X_train)
logit = LogisticRegression().fit(scaler.transform(X_train), y_train)
print(pd.Series(logit.coef_[0], index=features).round(2))
```

Output:

```
tenure_months      -0.67
monthly_charge      0.41
support_tickets     0.54
monthly_contract    0.50
late_payments       0.41
```

Because the features are standardized, the coefficients are comparable: longer tenure lowers churn risk, everything else raises it, and tenure and support tickets matter most. On the held-out test set this model scored an AUC of 0.741, while a default gradient-boosting model scored 0.706. A black box is not automatically better; on data like this, a readable model can win.

## An explanation that catches a leak

Now suppose someone adds a column, `cancel_call_30d`, recording whether the customer phoned to cancel. It looks like a great predictor, but that call happens *because* they are leaving, and you would not have it at prediction time. We simulate it and refit gradient boosting:

```python
rng = np.random.default_rng(1)
df["cancel_call_30d"] = np.where(df.churned == 1,
                                 rng.random(len(df)) < 0.85,
                                 rng.random(len(df)) < 0.03).astype(int)
```

Output from the refit model:

```
gb + leak AUC 0.952

cancel_call_30d     0.88
monthly_charge      0.05
tenure_months       0.03
monthly_contract    0.02
support_tickets     0.02
late_payments       0.00
```

An AUC jump from 0.71 to 0.95 looks like a triumph. The importances tell the truth: one feature carries 88% of the model's weight, and it is a consequence of churn, not a cause. Without the explanation you might have shipped a model that is useless in production.

## Recap

Explainability builds trust, catches bugs, supports responsible decisions about people, and guides improvement. Know whether you need a global or local explanation, and whether an intrinsic model would do the job. Treat suspiciously good metrics as a prompt to look inside. Next: feature importance and permutation importance.
