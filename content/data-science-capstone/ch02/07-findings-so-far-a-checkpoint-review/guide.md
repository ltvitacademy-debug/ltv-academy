# Findings So Far: A Checkpoint Review

Before you build a model, stop and write down what you know. A checkpoint review is a short document, sent to your stakeholder or read by your future self, that answers four questions: what did we do, what did we find, what are we unsure about, and what happens next. It feels like a delay. In practice it is the cheapest quality control in the project, because every mistake in the data or the framing gets more expensive with each step of modeling built on top of it.

This lesson closes Phase 1. You will re-verify the pipeline with automatic checks, put statistical weight behind the exploration findings, price a simple segment, log the data quirks, and write the memo.

## What you'll learn

- How to run assertion-style checks that protect the pipeline
- The difference between statistically significant and practically important
- How to translate a finding into the business economics from lesson 3, carefully
- How to log data quirks and decisions
- How to write an honest checkpoint memo

## Re-verify the pipeline

Checks belong in code, not in your memory. This script uses the `clean.py` and `frame.py` modules from the last two lessons and prints PASS or FAIL for each invariant.

```python
import pandas as pd
from scipy import stats
from clean import load_clean, SNAP
from frame import build_frame

cust, orders, tickets, canc = load_clean()
df = build_frame()

checks = {
    "one row per customer": df.index.is_unique,
    "3,690 active customers": len(df) == 3690,
    "568 churners": df.churn.sum() == 568,
    "no future orders used": df.recency.min() >= 0,
    "no nulls in customer fields":
        df[["plan", "acquisition_channel", "region", "age"]].isna().sum().sum() == 0,
}
for name, ok in checks.items():
    print("PASS" if ok else "FAIL", name)
```

All five lines print `PASS`. If a later change to the cleaning rules breaks the population or the label, this is where you find out.

## Significant is not the same as important

Exploration produced impressions. A hypothesis test asks whether an association could plausibly be chance. For categorical columns we use a chi-square test of independence with churn; for numeric columns, a Mann-Whitney test comparing churners with stayers, which does not assume normality.

```python
def fmt(p):
    return "<0.0001" if p < 0.0001 else f"{p:.4f}"


for col in ["plan", "acquisition_channel", "region"]:
    chi2, p, dof, _ = stats.chi2_contingency(pd.crosstab(df[col], df.churn))
    print(f"{col:20s} chi-square p = {fmt(p)}")
for col in ["order_rate", "tenure_days", "bad_share", "orders_90d",
            "recency", "age", "tickets_90d"]:
    x = df[[col, "churn"]].dropna()
    u, p = stats.mannwhitneyu(x[x.churn == 1][col], x[x.churn == 0][col])
    print(f"{col:20s} Mann-Whitney p = {fmt(p)}")
```

```
plan                 chi-square p = <0.0001
acquisition_channel  chi-square p = 0.0013
region               chi-square p = 0.7140
order_rate           Mann-Whitney p = <0.0001
tenure_days          Mann-Whitney p = <0.0001
bad_share            Mann-Whitney p = <0.0001
orders_90d           Mann-Whitney p = <0.0001
recency              Mann-Whitney p = 0.0098
age                  Mann-Whitney p = 0.2899
tickets_90d          Mann-Whitney p = 0.7707
```

This confirms the charts: plan, channel, order rate, tenure, late-or-refunded share, and recent orders are all clearly associated with churn, while region, age, and recent tickets are not. One row deserves a warning. Recency has a small p-value (0.0098), but its rank correlation with churn was only 0.043. With 3,690 customers, even a tiny effect can be statistically significant. A p-value tells you an effect is probably not zero; it does not tell you it is big enough to matter. Effect size and the business context decide that.

## Price a simple segment, carefully

Here is a useful sanity check on whether this project can pay off. Take one crude rule from the exploration: customers with more than a year of tenure and more than 10% late-or-refunded orders. Using the illustrative economics from lesson 3, what would contacting them be worth?

```python
seg = (df.tenure_days > 365) & (df.bad_share > 0.10)
n, rate = seg.sum(), df.churn[seg].mean()
gain = 0.30 * 240
print(n, round(rate, 3), round(n * (rate * gain - 15)))
print(round(15 / gain, 3))
```

The output is `874 0.273 4098` and `0.208`. The segment has 874 customers, churns at 27.3%, and the break-even precision is 20.8%, so under the illustrative assumptions contacting it would net about 4,098 in expectation.

Do not oversell this. It is in-sample, meaning we chose the rule after looking at the labels, so the true figure would likely be lower. It is 874 people, more than double the illustrative capacity of about 369. And every dollar figure rests on assumed costs. The right conclusion is modest: the signals are strong enough that a model plausibly can clear the break-even bar, which justifies continuing. It proves nothing yet.

## Log the data quirks

One more finding came out of the checks. Among the 310 customers who cancelled before the snapshot, 5,757 orders are dated after their own cancellation date.

```python
gone = canc[canc.cancel_date < SNAP].set_index("customer_id").cancel_date
o = orders[orders.customer_id.isin(gone.index)]
after = o.order_date > o.customer_id.map(gone)
print(len(gone), int(after.sum()))
```

This prints `310 5757`. Those customers are outside our population, so the quirk does not touch the model, but in a real project it would go to the owner of the source system: either cancellations are recorded late or orders keep arriving after cancellation. It also shows why the population filter in lesson 2 matters. Keep a quirks log:

| Quirk | Count | Handling |
|---|---|---|
| Duplicate customer rows | 40 | Deduplicated on customer_id |
| Region spellings | 16 to 4 | Strip and title-case |
| Impossible ages | 12 | Set missing, median-imputed |
| Dollar-sign amounts | 1,406 | Stripped and cast |
| Orders after the snapshot | 371 | Excluded from all features |
| Orders after an earlier cancellation | 5,757 | Out of scope; flag to data owner |
| Customers who never ordered | 27 | Kept; missing behavior features |

## The checkpoint memo

Write it plainly:

```
CHECKPOINT: Harvest Table churn project, end of Phase 1

Scope. Predict which of the 3,690 customers active on 2025-06-30
will cancel within the next 60 days (568 did, 15.4%).

Data. Four tables cleaned with six documented rules; Python and
SQL results reconcile. No future information is used.

Found. Churn is higher on the Premium plan (21.4%) and for social
signups (18.7%), and it rises with late or refunded orders, with
long tenure, and with low order frequency. Region, age, and recent
tickets show no meaningful signal.

Not known. Whether these signals hold up in prediction rather than
description; whether tenure is a cause or a proxy for bad
deliveries; how the model behaves on a later period.

Risks. One snapshot only. Cost assumptions are illustrative.
Small groups produce noisy rates.

Next. Engineer features, set baselines, split the data, model.
```

Notice that the memo separates what was found from what is not known. That separation is what makes a stakeholder trust the rest of your work.

## Decisions for the modeling phase

- Start from the planned feature set (recency, 30- and 90-day orders and their trend, average amount, discount share, late-or-refunded share, tickets, resolution hours, tenure, plan, channel, region, age). Consider adding order rate since signup, the strongest single signal in exploration.
- Expect region and age to add little; keep them in a first pass and let the model confirm.
- Split the data before any fitting, and keep the test set sealed until the final evaluation.
- Compare every model with the baselines defined in lesson 3, not with an absolute number.

## Recap

Phase 1 is complete. You extracted the data with SQL, cleaned it with six rules, reconciled the two routes, explored the signals, tested them, and wrote them down with their limits. Next, Phase 2 begins with feature engineering and baselines.
