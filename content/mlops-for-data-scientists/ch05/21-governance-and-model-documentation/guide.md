# Governance & Model Documentation

A model that predicts well but cannot be explained, traced, or approved is a liability. Governance is the unglamorous half of MLOps: knowing which data and code produced which model, checking that it behaves acceptably for different groups of customers, writing down what it is for and what it is not for, and keeping a record of who approved what. This lesson does all four in code for the churn-style model. The data is illustrative and simulated, and every number below came from code that was run.

## What you'll learn

- What a model card contains and why it lives next to the model
- How to fingerprint training data so a model is traceable to it
- How to run a subgroup check and read it honestly, including small groups
- How to keep an append-only audit trail of approvals

## What governance means in practice

Governance answers four questions an auditor, a manager, or your future self will ask:

1. **Lineage.** Which code, data, and environment made this model?
2. **Behaviour.** How does it perform overall and for different segments?
3. **Purpose.** What is it approved for, and what is it not?
4. **Accountability.** Who approved it, and when?

If your organisation is in a regulated area such as banking, insurance, or health, external rules may add requirements on top of these. Ask your compliance team, and do not assume a lesson can tell you what applies to you.

## Setup and two helper functions

```python
import datetime, hashlib, json
import numpy as np
import pandas as pd
import sklearn
from sklearn.metrics import average_precision_score, roc_auc_score
from capstone_data import make_cancel_data
from model_utils import build_pipeline, split

df = make_cancel_data()
X_tr, X_te, y_tr, y_te = split(df)
model = build_pipeline().fit(X_tr, y_tr)
p = model.predict_proba(X_te)[:, 1]

def fingerprint(frame):
    """Short, repeatable hash of a DataFrame's contents."""
    h = pd.util.hash_pandas_object(frame, index=True).values.tobytes()
    return hashlib.sha256(h).hexdigest()[:12]

def subgroup_report(col, top_share=0.2):
    cut = np.quantile(p, 1 - top_share)      # top 20% get flagged
    rows = []
    for value, idx in X_te.groupby(col).groups.items():
        pos = X_te.index.get_indexer(idx)
        yt, pp = y_te.to_numpy()[pos], p[pos]
        rows.append({col: value, "n": len(pos),
                     "cancel_rate": yt.mean(),
                     "auc": roc_auc_score(yt, pp),
                     "flagged": (pp >= cut).mean()})
    return pd.DataFrame(rows).round(3)
```

The fingerprint changes if any value in the training data changes, so two people can confirm they trained on the same data without emailing files. (It is repeatable for the same pandas version; treat it as a label, not a security control.)

## The subgroup check

```python
print(subgroup_report("plan").to_string(index=False))
print(subgroup_report("channel").to_string(index=False))
```

```
   plan   n  cancel_rate   auc  flagged
  basic 569        0.162 0.732    0.334
   plus 430        0.070 0.666    0.088
premium 201        0.055 0.664    0.060
 channel   n  cancel_rate   auc  flagged
 organic 553        0.087 0.683    0.128
    paid 406        0.150 0.776    0.313
referral 241        0.100 0.757    0.174
```

Read it in three steps. First, the flagged share follows the real cancel rate: basic customers cancel most (16.2%) and are flagged most (33.4%), which is the model working as intended, not automatically a problem. Second, AUC varies by segment, from 0.664 to 0.776. Third, look at `n`: premium has 201 rows and only about 11 cancellations, so its AUC is very uncertain. Document small-group results with that caveat rather than declaring a verdict. Here plan and channel are business segments; if a model touches protected characteristics, or proxies for them, involve legal and ethics review before deciding what to measure.

## The model card

A model card is a short, structured record of the model. Storing it as JSON beside the model keeps it versioned and machine-readable.

```python
card = {
    "name": "cancel-risk-model", "version": "1.0.0",
    "created": datetime.date.today().isoformat(),
    "owner": "data-science team (illustrative)",
    "intended_use": "Rank active subscribers by cancellation risk "
                    "so retention can contact the top 20%.",
    "out_of_scope": "Pricing, credit, or any decision about an "
                    "individual's access to service.",
    "training_data": {"rows": len(X_tr),
                      "fingerprint": fingerprint(X_tr),
                      "cancel_rate": round(float(y_tr.mean()), 3)},
    "metrics": {"roc_auc": round(roc_auc_score(y_te, p), 3),
                "avg_precision": round(
                    average_precision_score(y_te, p), 3)},
    "limitations": ["Synthetic, illustrative data.",
                    "Assumes the input distribution seen in training."],
    "monitoring": {"psi_alert": 0.25, "auc_floor": 0.694,
                   "retrain_review": "weekly"},
    "software": {"scikit_learn": sklearn.__version__},
}
with open("model_card.json", "w") as f:
    json.dump(card, f, indent=2)
print(json.dumps({k: card[k] for k in ("metrics", "training_data")},
                 indent=2))
```

```
{
  "metrics": {
    "roc_auc": 0.744,
    "avg_precision": 0.333
  },
  "training_data": {
    "rows": 4800,
    "fingerprint": "96a70bf3a409",
    "cancel_rate": 0.111
  }
}
```

Notice that the card links back to lessons you already built: the monitoring thresholds come from lesson 19, and the metrics come from the holdout set. When the model is retrained (lesson 20), a new card with a new version and fingerprint is written.

## The audit trail

Approvals should leave a record that nobody edits after the fact. A JSON Lines file that you only ever append to is a minimal version. In a real team the same approval usually lives in a pull-request review or a protected deployment environment; the file here shows the shape of the data.

```python
event = {"event": "approved_for_staging", "model": card["name"],
         "version": card["version"], "approver": "ml-lead",
         "data_fingerprint": card["training_data"]["fingerprint"]}
with open("audit_log.jsonl", "a") as f:
    f.write(json.dumps(event) + "\n")
print(open("audit_log.jsonl").read())
```

## A picture for the review meeting

```python
import matplotlib.pyplot as plt
fig, axes = plt.subplots(1, 2, figsize=(9, 3.4))
for ax, col in zip(axes, ["plan", "channel"]):
    r = subgroup_report(col)
    x = np.arange(len(r))
    ax.bar(x - 0.2, r.cancel_rate, 0.4, color="#8E9AA6",
           label="actual cancel rate")
    ax.bar(x + 0.2, r.flagged, 0.4, color="#8E1C1C",
           label="flagged (top 20%)")
    ax.set_xticks(x)
    ax.set_xticklabels(r[col])
    ax.set_title("By " + col)
axes[0].legend()
plt.tight_layout()
plt.savefig("subgroup-check.png", dpi=130)
```

## Recap

- Governance is lineage, behaviour, purpose, and accountability.
- Fingerprint the training data and record versions so a model is traceable.
- Check performance by segment, and report group sizes with the numbers.
- Keep a model card and an append-only audit trail with every model version.
