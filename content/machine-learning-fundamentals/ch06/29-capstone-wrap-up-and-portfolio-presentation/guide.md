# Capstone: Wrap-Up & Portfolio Presentation

You have a chosen model and a sealed test set. The final lesson does three things: it evaluates the model honestly, adds an unsupervised lens with clustering, and turns the whole project into something you can show an employer. It is also the last lesson of the course, so we finish with a look at what you can now do and where to go next.

## What you'll learn

- How to evaluate once on the test set and interpret the confusion matrix
- How to choose a decision threshold from precision and recall trade-offs
- How to segment customers with k-means and profile the segments' churn
- How to be honest about limitations
- How to package the work as a portfolio project

## Set up (from lessons 27 and 28)

This condenses the earlier setup into one block, so the lesson stands on its own. It needs `capstone_data.py` from lesson 27.

```python
import numpy as np, pandas as pd
from capstone_data import make_churn_data
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import (
    StandardScaler, OneHotEncoder)
from sklearn.linear_model import LogisticRegression

df = make_churn_data()
X = df.drop(columns="churned")
y = df.churned
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y,
    random_state=42)
num = ["tenure_months", "monthly_charges",
       "support_calls"]
cat = ["contract", "autopay"]
prep = ColumnTransformer([
    ("num", Pipeline([
        ("imp", SimpleImputer(strategy="median")),
        ("sc", StandardScaler())]), num),
    ("cat", OneHotEncoder(drop="first"), cat)])
final = Pipeline([("prep", prep),
    ("model", LogisticRegression(max_iter=1000))])
final.fit(X_tr, y_tr)
```

## One honest evaluation on the test set

The model and every choice were fixed using training data. Now we score the test set once.

```python
from sklearn.metrics import (
    roc_auc_score, accuracy_score,
    confusion_matrix, precision_score,
    recall_score)

proba = final.predict_proba(X_te)[:, 1]
pred = (proba >= 0.5).astype(int)
print(round(roc_auc_score(y_te, proba), 3))
print(round(accuracy_score(y_te, pred), 3))
print(confusion_matrix(y_te, pred))
```

The results: ROC AUC `0.807`, accuracy about `0.74`, and this confusion matrix:

```
[[229  33]
 [ 70  68]]
```

Rows are actual (stayed, churned), columns are predicted. Of 262 customers who stayed, the model correctly cleared 229 and wrongly flagged 33. Of 138 who churned, it caught 68 and missed 70. Compared with the baseline (0.5 AUC, 0.655 accuracy), the model clearly learned something real. The test AUC of 0.807 is a bit above the cross-validated 0.776; with only 400 test rows, some variation is expected. Report the test number, but do not go back and adjust the model to raise it.

## Choose a threshold from the business trade-off

At the default 0.5 cutoff, recall on churners is only about half. The threshold is a business decision: how many false alarms is the retention team willing to work through to catch more real churners?

```python
for t in [0.5, 0.4, 0.3]:
    p = (proba >= t).astype(int)
    print(t, round(precision_score(y_te, p), 3),
          round(recall_score(y_te, p), 3), p.sum())
```

```
0.5 0.673 0.493 101
0.4 0.635 0.681 148
0.3 0.557 0.812 201
```

Each row shows the threshold, precision, recall, and the number of customers flagged. Dropping the threshold to 0.4 raises recall from 0.493 to 0.681 while precision only falls from 0.673 to 0.635, but the outreach list grows from 101 to 148 customers. At 0.3, recall reaches 0.812 with a list of 201. If a retention call is cheap and a lost customer is expensive, choose a low threshold; if outreach is costly, choose a high one. Present the options and let the business pick.

## A second lens: customer segments

Supervised models answer "who will leave?" Clustering asks "what kinds of customers do we have?" We cluster the training customers on their three numeric features and then look at each segment's churn rate.

```python
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

Xn = X_tr[num].copy()
Xn["monthly_charges"] = Xn.monthly_charges.fillna(
    Xn.monthly_charges.median())
Xs = StandardScaler().fit_transform(Xn)
for k in range(2, 7):
    km = KMeans(k, n_init=10, random_state=42).fit(Xs)
    print(k, round(silhouette_score(Xs, km.labels_), 3))
```

The silhouette scores are `0.293, 0.274, 0.283, 0.271, 0.252` for k from 2 to 6. They are low and flat: there is no sharply separated set of natural groups in this data, unlike the clean blobs of earlier lessons. That is normal for real business data. We choose k = 3 for interpretability, and treat the segments as a descriptive lens, not as truth.

```python
km = KMeans(3, n_init=10, random_state=42).fit(Xs)
seg = Xn.assign(segment=km.labels_,
                churned=y_tr.values)
prof = seg.groupby("segment").agg(
    size=("churned", "size"),
    churn=("churned", "mean"),
    tenure=("tenure_months", "mean"),
    calls=("support_calls", "mean")).round(2)
print(prof)
```

```
         size  churn  tenure  calls
segment
0         697   0.35   14.06   0.59
1         323   0.14   54.57   1.46
2         580   0.46   14.10   2.71
```

Three stories emerge. Segment 1 is long-tenured, loyal customers, churning at 0.14. Segment 0 is newer customers with few support calls, churning at 0.35. Segment 2 is newer customers who call support often, churning at 0.46, the group to prioritize for proactive outreach. The segment numbers may differ if you rerun with other versions, so name segments by profile.

## Chart the two decisions

```python
import matplotlib.pyplot as plt
from sklearn.metrics import precision_recall_curve

prec, rec, thr = precision_recall_curve(y_te, proba)
fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4))
a.plot(thr, prec[:-1], color="#8E1C1C",
       label="precision")
a.plot(thr, rec[:-1], color="#2F6B8A",
       label="recall")
a.set_title("Precision and recall by threshold")
a.set_xlabel("threshold")
a.legend()
b.bar(prof.index.astype(str), prof.churn,
      color="#C4952E")
b.set_title("Churn rate by segment")
b.set_xlabel("segment")
b.set_ylabel("share who churned")
fig.tight_layout()
fig.savefig("capstone-final.png", dpi=150)
```

## Be honest about limitations

A strong portfolio project says what it cannot claim. State these plainly:

- The data is synthetic, so real-world performance is unknown. The results show the method, not a business outcome.
- The model finds associations, not causes. Autopay correlating with lower churn does not prove that enabling autopay retains customers.
- There is no time dimension: real churn models must be trained on the past and tested on the future.
- The test set has 400 rows, so the AUC has meaningful uncertainty.

## Package it as a portfolio project

Employers want to see your thinking, not just your code. Structure the repository and a short presentation this way:

```text
README.md
  1. Problem: who churns, and why it matters
  2. Data: source, size, caveats
  3. Approach: split, baseline, pipeline, models
  4. Results: CV table, final test metrics
  5. Threshold and business recommendation
  6. Segments and what to do for each
  7. Limitations and next steps
notebooks/  01_explore.ipynb  02_model.ipynb
capstone_data.py
requirements.txt
```

Present it as a story in five to seven slides: the business problem, what the data showed, how you compared models, what you recommend, and what you would do next. Lead with the decision the audience must make, not with the algorithm.

## Course complete

You can now frame a prediction problem, split and prepare data without leakage, build linear, tree-based, and instance-based models, group and compress data with clustering and PCA, evaluate with the right metrics, and communicate the result. The next course, Applied Machine Learning, takes these ideas into a production-minded scikit-learn workflow, with chapters on the workflow itself, evaluating models, tuning models, imbalanced and messy data, and applied projects.
