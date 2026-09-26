# Types of Data & Measurement Scales

Before you compute a single statistic, you have to know what *kind* of variable you are looking at. Averaging a column of customer ID numbers will happily return a number, but that number means nothing. This lesson gives you the vocabulary to decide which statistics and charts make sense for which columns, and shows how pandas can help you (and sometimes mislead you).

## What you'll learn

- The difference between categorical and numerical data
- Discrete versus continuous numbers
- The four measurement scales: nominal, ordinal, interval, ratio
- Which summaries are meaningful at each level
- How to tell pandas about ordered categories

## Two big families

**Categorical** (qualitative) variables put each row into a group: region, product category, churned yes/no. **Numerical** (quantitative) variables are measured or counted quantities where arithmetic is meaningful: number of orders, order value, temperature.

Numerical data splits again:

- **Discrete**: countable, usually whole numbers, with gaps between possible values. Orders placed, support tickets, children in a household.
- **Continuous**: can take any value in a range, limited only by measurement precision. Order value in dollars, weight, time on a page.

A quick test: can a value sit between two neighbors in a meaningful way? 2.5 orders makes no sense (discrete); a 35.25 dollar order does (continuous).

## The four measurement scales

Psychologist Stanley Smith Stevens proposed a widely taught ladder of four scales. Each step up keeps everything the previous step allowed and adds one more property.

1. **Nominal**: labels with no order. Region (East, West, North), payment method. You can count and take the mode, but not compute a mean.
2. **Ordinal**: labels with a meaningful order but unequal or unknown gaps. Satisfaction (low, medium, high). You can rank and take a median; the distance between "low" and "medium" is not necessarily the distance between "medium" and "high."
3. **Interval**: numbers with equal gaps but no true zero. Temperature in Celsius: 20 to 25 is the same change as 25 to 30, but 20 degrees is not "twice as hot" as 10 degrees, because zero is an arbitrary choice.
4. **Ratio**: equal gaps *and* a true zero. Order value, weight, count of orders. Zero means none, so ratios like "twice as much" are meaningful.

Statisticians debate how strictly to apply this ladder (for example, survey scales such as 1-to-5 ratings are often treated as numbers in practice). Treat it as a guide to what is *defensible*, not an absolute law.

## Seeing it in pandas

Here is a tiny illustrative customer table:

```python
import pandas as pd
df = pd.DataFrame({
  "customer_id": [101, 102, 103, 104, 105],
  "region": ["East","West","East","North","West"],
  "satisfaction": ["low","high","medium","high","medium"],
  "orders": [3, 7, 2, 9, 4],
  "avg_order_value": [42.5, 88.0, 35.25, 120.4, 60.0]})
print(df.dtypes)
```

Running it prints:

```
customer_id          int64
region              object
satisfaction        object
orders               int64
avg_order_value    float64
```

pandas only knows storage types, not meaning. `customer_id` is stored as `int64`, so `df["customer_id"].mean()` cheerfully returns `103.0`, a meaningless number because IDs are really nominal labels. Meanwhile `satisfaction` is stored as `object` (plain text), so pandas has no idea that low < medium < high.

For a nominal column, counts are the honest summary:

```python
print(df["region"].value_counts())
# East 2, West 2, North 1
```

For an ordinal column, tell pandas about the order:

```python
cats = ["low", "medium", "high"]
df["satisfaction"] = pd.Categorical(
    df["satisfaction"], categories=cats, ordered=True)
print(df["satisfaction"].max())   # high
```

Once the column is an ordered categorical, `max()`, `min()` and sorting respect the ranking, and you avoid accidentally sorting alphabetically ("high" < "low" < "medium").

## Why it matters

The scale determines which statistics are legitimate and which charts to draw. Bar charts of counts suit nominal data; histograms suit continuous data. Machine-learning steps later in the path, such as encoding categories, depend on the same distinction.

## Recap

Classify every variable: categorical or numerical, discrete or continuous, and nominal, ordinal, interval, or ratio. Do not trust storage types alone. An ID stored as a number is still a label, and text can hide a natural order. Next, we compute our first real statistics: measures of center.
