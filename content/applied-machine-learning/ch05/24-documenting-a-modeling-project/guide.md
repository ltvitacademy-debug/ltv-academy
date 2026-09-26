# Documenting a Modeling Project

A model nobody can understand or reproduce is a liability. Six months from now a colleague, or you, will ask: what data was this trained on, how good is it, and what should I not use it for? Documentation answers those questions before anyone asks. In this lesson you will write a real **model card**, generate its numbers from code so they cannot drift, and set up the small set of files that make a project reproducible.

## What you'll learn

- The four documents a modeling project needs: README, model card, decisions log, requirements
- How to fill a model card template from your actual results
- A reproducibility checklist you can run in five minutes
- How to write limitations that are specific and honest

## 1. The four documents

- **README.md**: what the project is and how to run it (setup, commands, folder map). Written for someone who has never seen it.
- **MODEL_CARD.md**: what the trained model is, its data, its numbers, and its limits. Written for anyone deciding whether to use it. The idea comes from the "Model Cards for Model Reporting" paper by Mitchell and colleagues; you do not need every section it describes, just the honest core.
- **DECISIONS.md**: a dated log of choices and why you made them.
- **requirements.txt**: the exact library versions.

## 2. A model card template

Save this as `MODEL_CARD_TEMPLATE.md`. The `{placeholders}` get filled by code.

```markdown
# Model card: {name}

Date: {date} | Owner: <name> | Status: draft

## Purpose
Rank active customers by monthly churn risk so the retention team
can call the riskiest 20%. Not for pricing or credit decisions.

## Data
- Source: illustrative churn table, {rows} customers (synthetic)
- Target: churned (1 = left). Positive rate: {positive_rate}
- Features: {features}
- Data fingerprint: {fingerprint}

## Method
- Preprocessing: StandardScaler (numeric), OneHotEncoder (categorical)
- Model: LogisticRegression(max_iter=1000) in a scikit-learn Pipeline
- Split: {n_train} train / {n_test} test, stratified, seed {seed}

## Results (test set, used once)
| Metric | Value |
|---|---|
| ROC AUC | {auc} |
| Recall at 0.5 threshold | {recall} |
| Precision at 0.5 threshold | {precision} |
| Churn rate in riskiest 20% | {top20_rate} |

By contract type (ROC AUC): month-to-month {seg_mtm},
one-year {seg_1y}, two-year {seg_2y}

## Limitations
- Synthetic data; never validated on real customers.
- Small test set (n={n_test}); segment AUCs are noisy.
- Default 0.5 threshold misses most churners; use a top-k list.

## Environment
Python {python}, scikit-learn {sklearn}, pandas {pandas},
numpy {numpy}
```

Notice the card states a purpose *and a non-purpose*, reports a per-segment result (a model that is good on average can be poor for one group), and lists limitations a reader can check.

## 3. Fill it from code

We reuse the illustrative churn model from lesson 21. After fitting `final` and computing `proba` on the test set, collect the facts in a dictionary and render the template:

```python
import hashlib, platform
import sklearn
from sklearn.metrics import roc_auc_score, recall_score

facts = {
    "name": "churn-logreg-v1", "date": "2026-09-26",
    "rows": len(df),
    "positive_rate": round(float(y.mean()), 3),
    "fingerprint": hashlib.sha256(
        df.to_csv(index=False).encode()).hexdigest()[:12],
    "seed": SEED, "n_train": len(X_tr), "n_test": len(X_te),
    "auc": round(float(roc_auc_score(y_te, proba)), 3),
    "recall": round(float(recall_score(y_te, pred)), 3),
    "python": platform.python_version(),
    "sklearn": sklearn.__version__,
    # ... precision, top20_rate, segment AUCs, pandas, numpy
}
template = open("MODEL_CARD_TEMPLATE.md").read()
open("MODEL_CARD.md", "w").write(template.format(**facts))
```

`str.format` fills every `{placeholder}` from the dictionary and raises a `KeyError` if one is missing, which is a useful safety net. (If your template ever needs a literal brace, double it: `{{`.) The rendered card, from the run on our machine:

```
## Data
- Source: illustrative churn table, 4000 customers (synthetic)
- Target: churned (1 = left). Positive rate: 0.272
- Data fingerprint: 0a0cd3c72932

## Results (test set, used once)
| ROC AUC | 0.802 |
| Recall at 0.5 threshold | 0.447 |
| Precision at 0.5 threshold | 0.642 |
| Churn rate in riskiest 20% | 0.644 |

By contract type (ROC AUC): month-to-month 0.775,
one-year 0.762, two-year 0.79
```

We ran the whole script twice and the outputs were byte-for-byte identical, including the fingerprint. The fingerprint is a short hash of the data: if a colleague's differs from yours, you are not looking at the same data.

## 4. A decisions log

Record why, while you still remember. Each entry is short:

```markdown
## 2026-09-26: Chose logistic regression over random forest
Context: 5-fold CV AUC was 0.806 (logistic) vs 0.782 (forest).
Decision: ship logistic regression.
Why: higher CV score, faster, and coefficients are easy to explain.
Revisit if: we add nonlinear features or the AUC gap reverses.
```

## 5. Reproducibility checklist

- Set `random_state` everywhere (splits, models, CV) and write the seed in the card.
- Freeze the environment: `pip freeze > requirements.txt` (on our machine this lists `scikit-learn==1.1.2`, `pandas==1.4.3`, `numpy==1.23.1`).
- Make the code run top to bottom from a clean start, in a script or a restarted notebook.
- Save the fitted pipeline with `joblib.dump(final, "model.joblib")`; we reloaded it and got identical probabilities. Saved models are tied to the scikit-learn version, so record it.
- Keep the card next to the model file, and record where and when the data was extracted.
- Put the exact commands to reproduce the results in the README.

## 6. Write limitations honestly

Good limitations are specific and checkable: "trained on one region," "not validated for new customers," "threshold 0.5 misses most churners." Vague lines such as "results may vary" help nobody. Stating limits does not weaken your work; it is what makes a reviewer trust the rest.

## Recap

- Every project ships a README, a model card, a decisions log, and pinned requirements.
- Generate the numbers in a card from code, never by hand.
- Fix seeds, freeze versions, fingerprint the data, save the pipeline.
- Be specific about what the model cannot do. Next: the capstone, where you will document your own project this way.
