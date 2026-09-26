# Documenting a Modeling Project

A model nobody can understand or reproduce is a liability. Six months from now, a colleague (or you) will ask: what data was this trained on, how good is it, and what should I not use it for? Documentation answers those questions before anyone asks. In this lesson you will write a lightweight "model card" and capture the facts programmatically so they cannot drift from the code.

## What you'll learn

- The sections every modeling project should document
- How to capture data, split, metrics, and environment in a JSON model card
- A reproducibility checklist you can apply to any project
- How to state limitations honestly

## Who reads it, and what they need

Different readers need different things:

- **A stakeholder** wants the purpose, the headline result in business terms, and the risks.
- **A teammate** wants the data description, the split, the metrics, and enough detail to rerun it.
- **Your future self** wants to know why choices were made, not only what they were.

A short README with the following sections covers all three:

1. **Purpose and decision:** what the model is for, and who acts on it.
2. **Data:** source, size, time period, target definition, known problems.
3. **Method:** preprocessing, model, how it was chosen and validated.
4. **Results:** the metrics that matter, on held-out data, with uncertainty.
5. **Limitations and risks:** where it fails, who might be harmed by errors, what it must not be used for.
6. **How to run it:** environment, seeds, commands.

## Capture the facts in code

Anything you can record automatically should be. The script below trains a small illustrative churn model and writes a model card as JSON, including the library versions in use.

```python
import hashlib, json, platform
import numpy as np
import pandas as pd
import sklearn
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

SEED = 42
rng = np.random.default_rng(SEED)
n = 2000
df = pd.DataFrame({
    "tenure_months": rng.integers(1, 72, n),
    "monthly_charge": rng.normal(70, 22, n).round(2),
    "contract": rng.choice(["month-to-month", "one-year",
                            "two-year"], n),
})
logit = (-0.5 - 0.05 * (df.tenure_months - 30)
         + 0.9 * (df.contract == "month-to-month"))
df["churned"] = (rng.random(n) < 1 / (1 + np.exp(-logit))).astype(int)

X, y = df.drop(columns="churned"), df["churned"]
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=SEED)
pre = ColumnTransformer([
    ("num", StandardScaler(), ["tenure_months", "monthly_charge"]),
    ("cat", OneHotEncoder(), ["contract"]),
])
model = Pipeline([("pre", pre),
                  ("model", LogisticRegression(max_iter=1000))])
model.fit(X_tr, y_tr)
auc = roc_auc_score(y_te, model.predict_proba(X_te)[:, 1])
```

Now assemble the card:

```python
card = {
    "name": "churn-logreg-v1",
    "purpose": "Rank active customers by churn risk for retention calls",
    "data": {
        "rows": len(df),
        "features": list(X.columns),
        "target": "churned",
        "positive_rate": round(float(y.mean()), 3),
        "fingerprint": hashlib.sha256(
            df.to_csv(index=False).encode()).hexdigest()[:12],
    },
    "split": {"test_size": 0.2, "stratified": True, "seed": SEED},
    "metrics": {"test_roc_auc": round(float(auc), 3)},
    "limitations": ["Synthetic illustrative data",
                    "Not validated on customers outside the training window"],
    "environment": {"python": platform.python_version(),
                    "scikit-learn": sklearn.__version__,
                    "numpy": np.__version__,
                    "pandas": pd.__version__},
}
print(json.dumps(card, indent=2))
with open("model_card.json", "w") as f:
    json.dump(card, f, indent=2)
```

Key values in the output on our machine:

```
"rows": 2000,
"positive_rate": 0.407,
"fingerprint": "113a9c717221",
"test_roc_auc": 0.744,
"python": "3.9.13",
"scikit-learn": "1.1.2",
```

Running the script twice produced identical output, which is the point: fixed seeds mean anyone can reproduce the numbers. Your library versions will differ if your environment differs, and that is exactly why they are recorded. The **fingerprint** is a short hash of the data; if a colleague's fingerprint differs, they are not looking at the same data.

## A reproducibility checklist

- Set `random_state` everywhere (splits, models, CV) and record it.
- Save the environment: `pip freeze > requirements.txt` (or a conda environment file).
- Record where the data came from and when it was extracted.
- Keep the code that builds the pipeline in a script or notebook that runs top to bottom.
- Save the fitted pipeline with `joblib` and note the scikit-learn version, since saved models are tied to it.
- Store the model card next to the model file.

## Write limitations honestly

Good limitations are specific and testable: "trained on 2 years of one region," "recall for new customers is unknown," "not for credit decisions." A vague "results may vary" helps nobody. Stating limits does not weaken your work; it is what makes reviewers trust the rest of it.

## Recap

- Document purpose, data, method, results, limitations, and how to run it.
- Generate the facts (metrics, versions, data fingerprint) in code so they stay correct.
- Fix seeds and freeze the environment for reproducibility.
- Be specific about what the model cannot do.
