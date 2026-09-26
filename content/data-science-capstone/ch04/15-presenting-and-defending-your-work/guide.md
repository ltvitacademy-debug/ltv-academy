# Presenting & Defending Your Work

The deck is built. Now someone smart and slightly skeptical will sit across from you and try to find the hole. That is not hostility; it is how organizations protect their money, and a good defense is what turns a decent analysis into a decision. The best preparation is to write down the questions you dread and answer each with a number from your own work. This lesson does that for the Harvest Table churn project. Every figure below comes from code run on the synthetic data, and every dollar figure uses the illustrative assumptions from lesson 3.

## What you'll learn

- A four-part structure for answering any challenge
- The six pushbacks a churn model usually meets, and how to answer each with evidence
- How to check whether the list treats customer groups very differently
- How to size a pilot that would measure the offer's real effect
- What to do when you do not know the answer

## The four-part answer

For any challenge: **answer** in one sentence, give the **evidence** (a number), **concede** what is true in the objection, and name the **next step**. Conceding is not weakness. It shows you saw the problem before they did, which is exactly what they are testing.

## Pushback 1: "Is that number any good?"

Answer: it doubles the hit rate, and that is enough to pay. The top 10% list (369 customers) churns at 40.1% against 15.4% for the average customer, a lift of 2.6 times, and the break-even is 20.8%. Concede: six in ten customers on the list would not have left, and the interval on precision is 35% to 45%. AUC (0.755) and average precision (0.334) look modest because behavior is hard to predict; the number that matters is precision against the break-even.

## Pushback 2: "Is it overfit? Did the future leak in?"

Answer: three scores agree, and the pipeline enforces the snapshot. Compare average precision on the training rows, in cross-validation, and on the sealed test set, and compare the model with simpler ways of choosing the same 369 customers:

```python
from common import *   # X, y, X_tr, X_te, y_tr, y_te, prep
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import (
    StratifiedKFold, cross_val_predict, cross_val_score)
from sklearn.metrics import average_precision_score

final = Pipeline([("prep", prep),
                  ("model", LogisticRegression(C=0.1, max_iter=1000))])
cv = StratifiedKFold(5, shuffle=True, random_state=42)
oof = cross_val_predict(final, X, y, method="predict_proba", cv=cv)[:, 1]
yv, k = y.values, 369
GAIN = 0.30 * 240

final.fit(X_tr, y_tr)
cv_ap = cross_val_score(final, X_tr, y_tr, scoring="average_precision",
                        cv=cv).mean()
print("AP  train (in-sample) %.3f | CV %.3f | test %.3f" % (
    average_precision_score(y_tr, final.predict_proba(X_tr)[:, 1]), cv_ap,
    average_precision_score(y_te, final.predict_proba(X_te)[:, 1])))
```

```
AP  train (in-sample) 0.338 | CV 0.327 | test 0.334
```

A model that memorized its training data would score far higher in-sample than on the test set. Here the three numbers sit within about 0.01 of each other. On leakage, point to the mechanics: every feature is filtered to on or before the snapshot (371 later orders were excluded), the label comes from the following 60 days only, and the split happened before any fitting. Concede: the split is random and there is one snapshot, so a later period is untested.

## Pushback 3: "Why not a simple rule, or something fancier?"

Answer: the simple rules are worse, and fancier models were no better. Choose the same 369 customers three ways:

```python
def top_k(score):
    return yv[np.argsort(-np.asarray(score))[:k]].mean()

recency = X.recency.fillna(X.recency.median())
rate = X.order_rate.fillna(X.order_rate.median())
for name, score in [("days since last order", recency),
                    ("fewest orders per week", -rate), ("model", oof)]:
    p = top_k(score)
    print("%-24s precision %.3f  net per cycle %6.0f" % (
        name, p, k * (p * GAIN - 15)))
```

```
days since last order    precision 0.187  net per cycle   -567
fewest orders per week   precision 0.276  net per cycle   1809
model                    precision 0.401  net per cycle   5121
```

The intuitive rule loses money, and the model returns almost three times what the better rule does. As for boosting and forests, lesson 9 showed they tied logistic regression within noise (average precision 0.314 to 0.335 versus 0.325), so the simplest and most explainable model won. Concede: a version 2 with the cumulative bad-order count from lesson 11 may do better.

## Pushback 4: "Does the list treat groups fairly?"

Answer: it follows risk, and where it does not track a group's risk it is noisy, not systematic. Check who lands on the list and whether the list is right equally often:

```python
flag = np.zeros(len(oof), bool); flag[np.argsort(-oof)[:k]] = True
seg = X.copy(); seg["flag"] = flag; seg["churn"] = yv
seg["age_band"] = pd.cut(seg.age, [0, 30, 45, 100],
                         labels=["<=30", "31-45", "46+"])
for col in ["plan", "region", "age_band"]:
    g = seg.groupby(col, observed=True).agg(
        n=("flag", "size"), flagged=("flag", "mean"), base=("churn", "mean"))
    g["precision_on_list"] = seg[seg.flag].groupby(
        col, observed=True).churn.mean()
    print(g.round(3).to_string())
```

```
            n  flagged   base  precision_on_list
plan                                            
Basic    1803    0.088  0.154              0.377
Family   1133    0.038  0.115              0.465
Premium   754    0.221  0.214              0.407
          n  flagged   base  precision_on_list
region                                        
East    965    0.098  0.156              0.432
North   922    0.117  0.157              0.380
South   921    0.105  0.160              0.412
West    882    0.078  0.142              0.377
             n  flagged   base  precision_on_list
age_band                                         
<=30       894    0.087  0.140              0.359
31-45     1934    0.098  0.164              0.437
46+        862    0.117  0.146              0.366
```

The clear difference is by plan: Premium customers make up 20% of the base but 22% of them are flagged, against 4% of Family customers, because their real churn rates (21.4% versus 11.5%) differ. Precision on the list is similar across plans, regions, and age bands, within what small groups produce (the Family plan has only 43 flagged customers). Region and age carried no signal in lesson 11, so their flag rates differ only by chance. A concrete step: drop age and region from version 2, which makes the model simpler and removes an attribute you would rather not use. Concede: this check covers only the groups in the data, and a real project would review with legal and compliance.

## Pushback 5: "How do you know the offer works?"

This is the strongest objection, so agree with it. Answer: we do not; the model ranks risk, and the 30% save rate is an assumption. Below a 15.6% save rate the program loses money. The next step is a randomized pilot, and you should size it first:

```python
def n_per_arm(p_ctrl, save):
    p_trt = p_ctrl * (1 - save)
    return int(np.ceil((1.96 + 0.84) ** 2 * (p_ctrl * (1 - p_ctrl)
                       + p_trt * (1 - p_trt)) / (p_ctrl - p_trt) ** 2))

for s in (0.30, 0.15):
    print("true save rate %.2f: about %d customers per arm" % (
        s, n_per_arm(0.40, s)))
```

```
true save rate 0.30: about 241 customers per arm
true save rate 0.15: about 1012 customers per arm
```

This is the standard two-proportion approximation, for 80% power and a 5% significance level, with a control group churning at 40% as the top decile does. One cycle's list of 369 splits into about 185 per arm, too few even for a 30% effect. Practical choices: pilot across the top two deciles (738 customers, 369 per arm), which also clear break-even, or run two cycles. A 15% effect would need over 2,000 customers, which tells you the pilot cannot rule out a small effect cheaply, and that is worth saying.

## Pushback 6: "Will it still work next quarter?"

Answer: we do not know yet, which is why the monitoring plan exists. Point to the four layers, the PSI thresholds validated on a control, and the performance watch at 0.32 and alert at 0.25. Concede that one snapshot cannot tell you, and offer to backtest on the next snapshot as soon as its labels arrive.

## When you do not know

Say "I do not know; here is how I would find out." Then say how, and when. Bluffing is the one mistake that cannot be undone in the room. Write the question down and follow up in writing within a day.

## Wrap-up

You have taken a messy business dataset through the whole path: a business problem, SQL, Python cleaning, exploration, a leakage-safe model, honest evaluation, a packaged service with a monitoring plan, and a deck you can defend. That is the shape of the work you will do in a job, and it is a portfolio piece. The next chapter turns it into a resume, a GitHub portfolio, and interview preparation.

## Recap

Answer, evidence, concede, next step. Prepare six pushbacks with your own numbers: 40% precision against a 20.8% break-even; train, CV, and test scores within 0.01; rules that lose money; a group check by plan, region, and age; a pilot sized at 241 or more per arm; and a monitoring plan for next quarter.
