# Fairness & Bias in Models

Explainability answers "why did the model say that?" Fairness asks a harder question: "who bears the mistakes?" Any model that decides about people, such as who gets a loan, an interview, a discount or extra scrutiny, can be accurate on average and still treat groups very differently. This lesson shows how to measure that with a few lines of pandas, and, just as important, why there is no single button that makes a model "fair."

## What you'll learn

- Where bias in a model actually comes from
- How to compute selection rate, true positive rate and false positive rate by group
- Why removing the sensitive column does not remove the problem
- Why common fairness definitions conflict, and what to do about it

## Where bias comes from

Bias is rarely a bug in the algorithm. It usually enters earlier: **historical data** that reflects past unequal treatment, **labels** that are themselves a biased measurement (for example "arrested" standing in for "committed a crime"), **proxy features** such as postal code that correlate with a protected attribute, and **sample gaps** where a group is under-represented so the model learns it less well. Finally, it can enter through **how the model is used**: the same score applied in a different setting than it was built for.

## An illustrative example

We use a synthetic loan dataset. Everything is seeded and made up: the point is the method, not a claim about any real population. Group B has, on average, lower income and a shorter credit history in this data, which stands in for historical disadvantage.

```python
import numpy as np
import pandas as pd

def make_loans(n=4000, seed=11):
    rng = np.random.default_rng(seed)
    group = rng.choice(["A", "B"], size=n, p=[0.6, 0.4])
    income = rng.normal(np.where(group == "A", 62, 52), 14).clip(15)
    history = rng.normal(np.where(group == "A", 9, 6), 3).clip(0)
    debt = rng.normal(0.35, 0.10, n).clip(0.05, 0.9)
    z = -2.2 + 0.045 * income + 0.12 * history - 4.0 * debt
    repaid = (rng.random(n) < 1 / (1 + np.exp(-z))).astype(int)
    return pd.DataFrame({"group": group, "income": income.round(1),
                         "history_yrs": history.round(1),
                         "debt_ratio": debt.round(2), "repaid": repaid})

df = make_loans()
```

The repayment rate is 0.56 for group A and 0.39 for group B. We train a logistic regression on income, history and debt ratio only. The group column is *not* a feature, a practice sometimes called "fairness through unawareness."

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

feats = ["income", "history_yrs", "debt_ratio"]      # no group column
tr, te = train_test_split(df, test_size=0.4, random_state=0,
                          stratify=df["group"])
model = LogisticRegression(max_iter=1000).fit(tr[feats], tr["repaid"])
te = te.assign(score=model.predict_proba(te[feats])[:, 1])
te["approve"] = (te["score"] >= 0.5).astype(int)
```

## Measure by group

The key habit: never report only one overall number. Slice the metrics by group.

```python
def group_report(d, col="approve"):
    rows = {}
    for g, s in d.groupby("group"):
        y, p = s["repaid"], s[col]
        rows[g] = {"selection": p.mean(),
                   "TPR": p[y == 1].mean(),
                   "FPR": p[y == 0].mean(),
                   "precision": y[p == 1].mean()}
    return pd.DataFrame(rows).T

r = group_report(te)
print(r.round(3))
```

```
   selection    TPR    FPR  precision
A      0.643  0.784  0.472      0.668
B      0.267  0.425  0.155      0.659
```

*Selection rate* is the share approved. *TPR* is the share of people who would have repaid who were approved; *FPR* is the share of people who would not have repaid who were approved. The model approves 64% of group A but only 27% of group B: a selection gap of 0.376 and an impact ratio of 0.415 (B divided by A). Some regulators and practitioners use a "four-fifths" rule of thumb (a ratio below 0.8 draws scrutiny) but treat it as a screening heuristic, and confirm the legal standard with your compliance team. Even though group was never a feature, the gap appeared, because income and credit history act as proxies for it.

Notice too that precision is nearly equal (0.668 and 0.659): among approved people, repayment rates match. So by one definition the model is "calibrated" across groups, and by another (equal TPR) it is not.

A quick chart makes the gap easy to show a non-technical reviewer:

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
ax = r[["selection", "TPR", "FPR"]].T.plot.bar(
    figsize=(7, 4.2), color=["#C4952E", "#8E1C1C"])
ax.set_ylabel("rate")
ax.set_title("Same model, different outcomes by group (illustrative)")
plt.xticks(rotation=0)
plt.tight_layout()
plt.savefig("fairness-groups.png", dpi=150)
```

## Definitions conflict

We can try to fix it with a different cutoff per group. First, choose B's threshold so both groups have the same selection rate; second, choose it so both have the same TPR:

```python
def approve_with(d, thr):
    return (d["score"] >= d["group"].map(thr)).astype(int)

thr_B = np.quantile(te.loc[te.group == "B", "score"], 1 - r.selection["A"])
te["eq_sel"] = approve_with(te, {"A": 0.5, "B": thr_B})
```

```
Equal selection (B cutoff 0.318)   TPR A 0.784 / B 0.822   FPR A 0.472 / B 0.515   precision A 0.668 / B 0.530
Equal TPR       (B cutoff 0.341)   TPR A 0.784 / B 0.784   FPR A 0.472 / B 0.452   precision A 0.668 / B 0.550
```

Equalizing selection rates leaves the TPR, FPR and precision unequal. Equalizing TPR leaves selection rates (0.643 vs 0.589) and precision unequal. Fixing one metric moves the others, because the groups have different underlying repayment rates. Published results in the fairness literature show that, except in special cases, you cannot equalize all of these at once. So fairness is not a number to optimize blindly. It is a decision about which error matters most, made openly with the people affected.

Fairness libraries such as `fairlearn` package these metrics and mitigation methods; we did not run them here, so check the current documentation before relying on any API.

## A practical checklist

1. Ask what decision the model feeds, who is affected, and what a wrong answer costs each group.
2. Report metrics by group, with sample sizes; small groups have noisy estimates.
3. Look for proxies and for labels that measure the wrong thing.
4. Pick fairness criteria with legal, domain and affected-community input, and document the trade-off you chose.
5. Monitor after launch, and provide a way to appeal decisions.

## Recap

Accuracy on average hides who gets the errors. Slice selection rate, TPR, FPR and precision by group, expect proxies to carry sensitive information even when the column is dropped, and remember that the definitions conflict, so the choice is a judgment to make transparently. Next: the capstone, where we forecast and explain a business outcome.
