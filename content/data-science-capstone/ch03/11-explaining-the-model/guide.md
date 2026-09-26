# Explaining the Model

A stakeholder will ask two questions the moment you show a churn score: "What is it looking at?" and "Why is this customer on the list?" A model you cannot explain is a model nobody will act on. This lesson explains the logistic regression from lesson 10 three ways: coefficients, permutation importance, and SHAP. It also tests the puzzle you met in lesson 6, that longer-tenured customers churn more, instead of just repeating it. All numbers are from code run on the synthetic Harvest Table data, so they are illustrative.

## What you'll learn

- How to read standardized logistic regression coefficients
- How to compute permutation importance on held-out data, at the level of your original features
- How to use SHAP for global and per-customer explanations
- How to test a surprising driver with a follow-up experiment instead of reporting it blindly
- What explanations can and cannot claim

## Fit the final model

```python
from common import *   # split + prep from lessons 8-10
from sklearn.linear_model import LogisticRegression
from sklearn.inspection import permutation_importance

final = Pipeline([("prep", prep),
                  ("model", LogisticRegression(C=0.1, max_iter=1000))])
final.fit(X_tr, y_tr)
```

## Way 1: coefficients

Because the numeric inputs were standardized, coefficient sizes are comparable: each one is the change in log-odds of churn for a one-standard-deviation increase.

```python
names = final[:-1].get_feature_names_out()
coef = pd.Series(final[-1].coef_[0], index=names)
print(coef.sort_values(key=abs, ascending=False).head(8).round(2))
```

```
num__order_rate                  -0.48
num__tenure_days                  0.44
cat__plan_Family                 -0.36
num__bad_share                    0.31
num__avg_amount                   0.19
cat__plan_Basic                   0.18
cat__plan_Premium                 0.17
cat__acquisition_channel_social   0.17
```

Positive means more likely to cancel. Customers who order steadily are safer; a higher share of late or refunded orders raises risk; the Family plan is safer while Basic and Premium are riskier; social-media signups are riskier. This is the same picture exploration painted in lesson 6.

## Way 2: permutation importance

Shuffle one raw column of held-out data and see how much average precision drops. The pipeline handles preprocessing, so you get importance per original column, with the one-hot categories grouped together.

```python
pi = permutation_importance(final, X_te, y_te,
                            scoring="average_precision",
                            n_repeats=30, random_state=0)
imp = pd.DataFrame({"mean": pi.importances_mean, "std": pi.importances_std},
                   index=X_te.columns).sort_values("mean", ascending=False)
print(imp.round(3))
```

```
                      mean    std
order_rate           0.093  0.014
tenure_days          0.086  0.013
bad_share            0.039  0.014
plan                 0.019  0.011
avg_amount           0.011  0.009
avg_resolution_hrs   0.006  0.007
acquisition_channel  0.005  0.007
recency              0.002  0.004
discount_share       0.002  0.003
age                  0.001  0.005
orders_90d           0.000  0.001
region               0.000  0.002
trend_30v60         -0.000  0.001
orders_30d          -0.000  0.002
tickets_90d         -0.002  0.003
```

Order rate and tenure dominate, each costing about 0.09 average precision when shuffled. Late-or-refunded share is next. Then comes a long tail of features that add nothing: region, age, and recent tickets, exactly as lesson 7 predicted, plus the 30- and 90-day order counts and the trend, which order rate already covers. A leaner version of this model would drop them. The chart shows two views side by side.

```python
import matplotlib.pyplot as plt
fig, (a1, a2) = plt.subplots(1, 2, figsize=(10, 4.2), dpi=150)
c8 = coef.reindex(coef.abs().sort_values().index)[-8:]
a1.barh(c8.index, c8.values)
a1.set_title("Logistic coefficients (per 1 SD)")
top = imp.head(8)[::-1]
a2.barh(top.index, top["mean"], xerr=top["std"])
a2.set_title("Permutation importance (drop in AP)")
plt.tight_layout(); plt.savefig("drivers.png")
```

## Test the surprise

Tenure has a positive coefficient, and shuffling it costs 0.086: the longer a customer has been around, the more likely they are to cancel. Lesson 6 saw the same pattern in the raw rates and suggested a hypothesis to test rather than assume: long-tenured customers have had more chances for a bad delivery. The model's `bad_share` feature is a percentage, which does not grow with time, but the number of late or refunded orders does. If tenure is a stand-in for that cumulative count, adding the count should make tenure fade.

This experiment uses training data and cross-validation only, so it does not touch the test set:

```python
from clean import load_clean, SNAP
from sklearn.model_selection import RepeatedStratifiedKFold, cross_validate

cust, orders, tickets, canc = load_clean()
o = orders[orders.order_date <= SNAP]
bad_orders = (o.status != "delivered").groupby(o.customer_id).sum()

X2 = X.copy()
X2["bad_orders"] = bad_orders.reindex(X2.index).fillna(0)
print("corr(tenure, bad_orders) =",
      round(X2.tenure_days.corr(X2.bad_orders), 2))

prep2 = ColumnTransformer([
    ("num", Pipeline([
        ("imp", SimpleImputer(strategy="median", add_indicator=True)),
        ("sc", StandardScaler())]), num + ["bad_orders"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat)])
cv = RepeatedStratifiedKFold(n_splits=5, n_repeats=3, random_state=42)
res = {}
for name, pr, XX in [("v1", prep, X), ("v1 + bad_orders", prep2, X2)]:
    m = Pipeline([("prep", pr),
                  ("model", LogisticRegression(C=0.1, max_iter=1000))])
    res[name] = cross_validate(m, XX.loc[X_tr.index], y_tr, cv=cv,
                               scoring=["average_precision", "roc_auc"])
    print(name, res[name]["test_average_precision"].mean().round(3))
d = (res["v1 + bad_orders"]["test_average_precision"]
     - res["v1"]["test_average_precision"])
print("paired AP gain", d.mean().round(3), "better in", (d > 0).sum(), "of 15")

m2 = Pipeline([("prep", prep2),
               ("model", LogisticRegression(C=0.1, max_iter=1000))])
m2.fit(X2.loc[X_tr.index], y_tr)
coef2 = pd.Series(m2[-1].coef_[0], index=m2[:-1].get_feature_names_out())
print(coef2.sort_values(key=abs, ascending=False).head(5).round(2))
```

```
corr(tenure, bad_orders) = 0.7
v1 0.325
v1 + bad_orders 0.345
paired AP gain 0.02 better in 14 of 15
num__order_rate    -0.63
num__bad_orders     0.45
cat__plan_Family   -0.35
num__avg_amount     0.19
cat__plan_Basic     0.18
```

Tenure correlates 0.70 with the cumulative count of late or refunded orders. Adding the count lifts cross-validated average precision from 0.325 to 0.345, better in 14 of 15 folds, and in the refitted model tenure drops out of the top five coefficients: order rate (-0.63) and the new bad-order count (+0.45) lead. That supports the hypothesis: tenure was standing in for accumulated bad deliveries. It does not prove that bad deliveries cause cancellations. And it is not a free upgrade: you found this feature after looking at the data, and the test set is already spent, so a real version 2 would need fresh evidence, such as the next snapshot. Note it as a candidate and keep version 1 frozen, so the test result you reported stays valid.

## Way 3: SHAP

SHAP assigns each feature a contribution to one customer's prediction, measured in log-odds and added to a base value. For a linear model it is exact and fast. Install it with `pip install shap` (this lesson used version 0.44.1).

```python
import shap
Xt = final[:-1].transform(X_tr)
Xe = final[:-1].transform(X_te)
expl = shap.LinearExplainer(final[-1], Xt)
sv = expl.shap_values(Xe)
mean_abs = pd.Series(np.abs(sv).mean(axis=0), index=names)
print(mean_abs.sort_values(ascending=False).head(6).round(3))
```

```
num__tenure_days                            0.397
num__order_rate                             0.390
num__bad_share                              0.234
num__avg_amount                             0.167
cat__plan_Family                            0.155
num__missingindicator_avg_resolution_hrs    0.147
```

The global ranking agrees: tenure and order rate first, then late-or-refunded share, average amount, and plan. One extra clue appears: whether the customer has never filed a ticket (the missing-value flag for resolution hours) carries weight too.

For one flagged customer near the middle of the flagged group (customer 3592, predicted 0.279 against a base value of 0.134), the largest contributions are a low order rate of 0.27 boxes per week (+0.94), a short tenure of 158 days (-0.43), no late or refunded orders (-0.43), and a high average amount on a Premium plan (+0.30). That is a story you can tell a retention manager: this customer orders rarely, and everything else about them is healthy.

## What explanations can and cannot claim

- They describe what the model uses, not what causes churn. Do not write "reducing late deliveries will cut churn" from a coefficient alone; proving an intervention works takes an experiment.
- Correlated features share credit, so single importances can mislead.
- Importance is measured on one test sample; the error bars matter.
- Ask whether each top driver makes business sense, test the ones that do not, and say what remains unproven.

## Recap

Coefficients, permutation importance, and SHAP agree that order rate, tenure, and delivery problems drive the model, and that region, age, and recent tickets do not. The tenure effect is best explained by accumulated late or refunded orders, a hypothesis that the follow-up experiment supports but does not prove. Next you package the model for use.
