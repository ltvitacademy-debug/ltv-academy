# Math & Statistics With NumPy

You can now build, select, and combine arrays. This lesson puts them to work: summarizing data with totals, averages, and spreads. NumPy gives you these as built-in operations that run on a whole array at once, and they are the same statistics you will meet again in the pandas and statistics chapters. The key new idea is the **axis**, which tells NumPy which direction to summarize.

## What you'll learn

- Summarize an array with `sum`, `mean`, `min`, `max`, and their positions
- Use the `axis` argument to summarize rows or columns
- Compute median, standard deviation, variance, and percentiles
- Explain why the mean and median can disagree, and what `ddof` does
- Measure the relationship between two variables with a correlation
- Handle `nan` values and standardize data with z-scores

## Whole-array summaries

We will use a small illustrative table: weekly sales in dollars for three stores (rows) across four weeks (columns). The numbers are made up for teaching.

```python
import numpy as np

sales = np.array([[120,  90, 150, 110],
                  [ 80, 130, 100,  95],
                  [200, 170, 160, 190]])

print(sales.sum())    # 1595
print(sales.mean())   # 132.91666666666666
print(sales.min(), sales.max())   # 80 200
```

Each of these can be called as a method (`sales.sum()`) or as a function (`np.sum(sales)`). They are equivalent.

## The axis argument

Without `axis`, NumPy collapses the whole array into one number. With `axis`, it collapses just one dimension. The easiest way to remember it: **the axis you name is the one that disappears.**

```python
print(sales.sum(axis=0))    # [400 390 410 395]   total per week
print(sales.sum(axis=1))    # [470 405 720]       total per store
print(sales.mean(axis=0))   # [133.33333333 130. 136.66666667 131.66666667]
```

`axis=0` runs down the rows, so you get one result per column (per week). `axis=1` runs across the columns, so you get one result per row (per store). If you know SQL, `axis=0` is like `GROUP BY column` totals and `axis=1` is a row-wise total.

To find where the biggest value sits, use `argmax`. Without an axis it returns a position in the flattened array; with an axis it returns one position per row or column:

```python
print(sales.argmax())          # 8
print(sales.argmax(axis=1))    # [2 1 0]
print(np.unravel_index(sales.argmax(), sales.shape))   # (2, 0)
```

Position 8 in the flattened array is row 2, column 0: store three in week one, with 200.

## Center and spread

Averages describe the center of the data; standard deviation describes how spread out it is. Consider order values where one big order sneaks in:

```python
x = np.array([12, 15, 11, 18, 14, 90])
print(np.mean(x))     # 26.666666666666668
print(np.median(x))   # 14.5
print(np.std(x))      # 28.41165644981338
```

The mean is pulled up by the outlier 90, while the median, the middle value, barely notices. When data has outliers, compare both.

`np.std` and `np.var` divide by `n` by default, which describes the data you have. When your data is a **sample** from a larger population, statisticians divide by `n - 1` instead. Pass `ddof=1` (delta degrees of freedom) to do that:

```python
print(np.std(x, ddof=1))   # 31.123410267299864
```

Note that pandas' `.std()` uses `ddof=1` by default, while NumPy uses `ddof=0`. This difference trips up many beginners when results do not match.

## Percentiles

A percentile tells you the value below which a given share of the data falls:

```python
print(np.percentile(x, [25, 50, 75]))   # [12.5  14.5  17.25]
print(np.quantile(x, 0.9))              # 54.0
```

`percentile` takes numbers from 0 to 100; `quantile` takes fractions from 0 to 1. The 50th percentile is the median.

## Correlation

To measure how two variables move together, use `np.corrcoef`. It returns a matrix; the off-diagonal entry is the correlation between the two inputs, from -1 to 1:

```python
height = np.array([1.5, 2.0, 2.5, 3.0])   # illustrative
weight = np.array([50, 65, 70, 90])
print(np.corrcoef(height, weight)[0, 1])   # 0.9768308314557044
```

A value near 1 means the two rise together. Correlation does not prove one causes the other, a point later statistics lessons return to.

## Missing values and z-scores

As Lesson 7 showed, `nan` poisons ordinary summaries. The `nan`-aware versions skip it:

```python
y = np.array([1.0, np.nan, 3.0])
print(np.mean(y), np.nanmean(y))   # nan 2.0
```

A common preparation step for machine learning is standardizing: subtract the mean and divide by the standard deviation, using broadcasting from the last lesson. The result is called a **z-score**, the number of standard deviations from the mean:

```python
z = (x - x.mean()) / x.std()
print(np.round(z, 2))   # [-0.52 -0.41 -0.55 -0.31 -0.45  2.23]
```

The outlier 90 stands out at 2.23 standard deviations above the mean. Other handy math functions include `np.sqrt`, `np.exp`, `np.log`, `np.round`, `np.cumsum`, and `np.clip`.

## Recap

- `sum`, `mean`, `min`, `max`, and `argmax` summarize arrays; the `axis` you name is the one that disappears.
- Compare mean and median to spot outliers; use `ddof=1` for a sample standard deviation.
- `percentile`, `quantile`, and `corrcoef` describe position and relationships.
- Use `nanmean` and friends for missing values, and z-scores to standardize.
- Next lesson: random numbers and simulation.
