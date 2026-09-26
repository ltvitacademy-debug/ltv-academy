# Encoding Categorical Variables

Most machine-learning algorithms do arithmetic, so they need numbers. But real tables are full of text categories: city, plan type, payment method, product category. **Encoding** converts those categories into numbers, and how you do it matters. The wrong encoding quietly tells the model something false, such as "Chicago is twice Boston". This lesson covers the main encodings and when to use each.

## What you'll learn

- The difference between nominal and ordinal categories
- One-hot encoding, and how to handle categories the model has never seen
- Ordinal encoding, and when it is appropriate
- The mistake of numbering unordered categories, shown with numbers
- What to do with columns that have many distinct values

## Nominal versus ordinal

- **Nominal** categories have no natural order: city, colour, payment method.
- **Ordinal** categories have a meaningful order: plan level (basic < standard < premium), education level, survey ratings.

The choice of encoding follows from this split.

## Our illustrative data

300 made-up customers with a city, a plan and a monthly spend. Spend depends on city (Boston customers spend most), which we will exploit.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(11)
n = 300
city = rng.choice(["Atlanta", "Boston", "Chicago"], n)
plan = rng.choice(["basic", "standard", "premium"], n)
base = {"Atlanta": 60, "Boston": 100, "Chicago": 70}
df = pd.DataFrame({"city": city, "plan": plan})
df["monthly_spend"] = df["city"].map(base) + rng.normal(0, 8, n)
print(df.head(4))
```

```
      city      plan  monthly_spend
0  Atlanta     basic      56.147022
1  Atlanta     basic      62.228530
2  Chicago     basic      64.673032
3   Boston  standard     102.208151
```

## One-hot encoding for nominal columns

One-hot encoding replaces a column with one 0/1 column per category. A row has a 1 in the column of its own category and 0 elsewhere. No order is implied.

```python
from sklearn.preprocessing import OneHotEncoder

ohe = OneHotEncoder(sparse=False, handle_unknown="ignore")
city_oh = ohe.fit_transform(df[["city"]])
print(list(ohe.get_feature_names_out(["city"])))
print(city_oh[:3])
print("unseen city ->", ohe.transform(pd.DataFrame({"city": ["Denver"]})))
```

```
['city_Atlanta', 'city_Boston', 'city_Chicago']
[[1. 0. 0.]
 [1. 0. 0.]
 [0. 0. 1.]]
unseen city -> [[0. 0. 0.]]
```

Two details worth noting. First, `handle_unknown="ignore"` matters in real life: new data will eventually contain a city that was not in the training set, and without this option `transform` raises an error. With it, the unseen city becomes all zeros. Second, this is a *learned* transformation, since the encoder remembers the categories it saw in `fit`. From lesson 8, that means **fit on the training set only**, then `transform` validation and test. (This example uses scikit-learn 1.1, where the argument is named `sparse`. In newer releases it was renamed `sparse_output`, so check the documentation for your version.)

For pandas-only work, `pd.get_dummies(df["city"])` does the same job, but it does not remember categories, which makes it risky for train and test consistency. Prefer the scikit-learn encoder for modelling.

## Ordinal encoding for ordered columns

When the order is real, map categories to integers *in that order*. You must state the order explicitly, otherwise the encoder defaults to alphabetical, which would give premium < basic.

```python
from sklearn.preprocessing import OrdinalEncoder

ordn = OrdinalEncoder(categories=[["basic", "standard", "premium"]])
df["plan_level"] = ordn.fit_transform(df[["plan"]])
print(df[["plan", "plan_level"]].drop_duplicates().sort_values("plan_level").values.tolist())
```

```
[['basic', 0.0], ['standard', 1.0], ['premium', 2.0]]
```

## The classic mistake

What happens if you number a *nominal* column? Below we fit two linear regressions predicting spend from city, one with city numbered Atlanta = 0, Boston = 1, Chicago = 2 and one with one-hot columns.

```python
from sklearn.linear_model import LinearRegression

y = df["monthly_spend"]
codes = OrdinalEncoder().fit_transform(df[["city"]])          # Atlanta=0, Boston=1, Chicago=2
m_ord = LinearRegression().fit(codes, y)
m_oh = LinearRegression().fit(city_oh, y)
print("R^2 with city numbered 0,1,2:", round(m_ord.score(codes, y), 3))
print("R^2 with one-hot city       :", round(m_oh.score(city_oh, y), 3))
```

```
R^2 with city numbered 0,1,2: 0.04
R^2 with one-hot city       : 0.815
```

R-squared is the share of variation in spend the model explains (scored on the training rows here, purely to compare encodings). With the fake ordering the model can only draw a straight line through 0, 1, 2, so it explains 4%. Boston, in the middle, cannot be higher than both neighbours. One-hot lets each city have its own level, explaining 81.5%. The chart shows the average spend each model predicts for each city, and is the output of this code (styling omitted):

```python
import matplotlib.pyplot as plt
cities = ["Atlanta", "Boston", "Chicago"]
actual = df.groupby("city")["monthly_spend"].mean().reindex(cities)
pred_ord = [m_ord.predict([[i]])[0] for i in range(3)]
pred_oh = [m_oh.predict(ohe.transform(pd.DataFrame({"city": [c]})))[0] for c in cities]
xs = np.arange(3)
plt.bar(xs - .26, actual.values, .26, label="actual")
plt.bar(xs, pred_ord, .26, label="coded 0, 1, 2")
plt.bar(xs + .26, pred_oh, .26, label="one-hot")
plt.xticks(xs, cities); plt.legend(); plt.show()
```

Tree-based models are less sensitive to this mistake because they split on thresholds, but a linear or distance-based model will be badly misled. One-hot is the safe default for nominal data.

## Many categories

A column with thousands of distinct values (zip code, product ID) would create thousands of one-hot columns. Common options: group rare categories into "other", use **frequency encoding** (replace each category with how often it occurs), or use **target encoding** (replace it with the average target for that category). Target encoding is powerful but is a classic leakage trap unless computed only inside the training data. Some newer scikit-learn versions include a `TargetEncoder`; check the docs for yours.

## Recap

Use one-hot for nominal categories and explicit-order ordinal encoding for ordered ones. Never number unordered categories for a linear or distance-based model. Set `handle_unknown="ignore"`, fit encoders on training data only, and plan for high-cardinality columns. Next up, lesson 10: scaling and normalization.
