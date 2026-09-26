# Outliers

An outlier is a value that sits far from the rest of the data. It might be a data-entry mistake (an extra zero), an instrument failure, or a legitimate but rare event, like one enormous order from a corporate customer. Outliers matter because they can drag averages, distort charts, and dominate model training. Finding them is mechanical; deciding what they *are* takes judgment.

## What you'll learn

- How to spot a suspicious spread with `describe()`
- How to detect outliers with the IQR rule and the z-score
- Why small samples make z-scores less reliable
- How to decide between fixing, keeping, and capping
- How to cap values with `clip()` while keeping a record of what you did

## The practice data

Twelve illustrative order amounts, one of which looks odd:

```python
import pandas as pd

sales = pd.DataFrame({
    "order_id": range(1, 13),
    "amount": [42, 55, 61, 48, 59, 65, 52, 70, 58, 63, 45, 940],
})

sales["amount"].describe()
# mean    129.833333
# 50%      58.500000
# max     940.000000
```

The mean (about 130) is more than double the median (58.5). When the mean is pulled far away from the median, a few extreme values are usually responsible. The median is *robust*: one wild value barely moves it.

## Rule 1: The IQR fences

The interquartile range (IQR) is the distance between the 25th and 75th percentiles. The classic rule treats anything more than 1.5 IQRs beyond either quartile as an outlier:

```python
s = sales["amount"]
q1 = s.quantile(0.25)      # 51.0
q3 = s.quantile(0.75)      # 63.5
iqr = q3 - q1              # 12.5
low = q1 - 1.5 * iqr       # 32.25
high = q3 + 1.5 * iqr      # 82.25

mask = (s < low) | (s > high)
sales[mask]
#    order_id  amount
# 11       12     940
```

Only the 940 order lies outside the fences. The IQR rule does not assume a bell-shaped distribution, which makes it a good default.

## Rule 2: The z-score

A z-score says how many standard deviations a value is from the mean:

```python
z = (s - s.mean()) / s.std()
sales[z.abs() > 3]
```

This flags the same row, but note its z-score is only 3.17, just barely over the common cutoff of 3. The extreme value inflates the standard deviation used to judge it, so z-scores can miss outliers in small samples. The IQR rule is less affected because quartiles ignore the extremes.

## Decide: fix, keep, or cap

Detecting a value is not the same as removing it. Ask what it is:

- **An error** (a misplaced decimal, a test record): correct it if you can, otherwise treat it as missing.
- **Real but extreme**: keep it. Use robust statistics such as the median, and report results with and without it.
- **Too influential for a technique that is sensitive to extremes**: cap it, and document that you did.

Never delete a point simply because it is inconvenient. That is how analyses become misleading.

## Capping and flagging

```python
sales["is_outlier"] = mask
sales["amount_capped"] = sales["amount"].clip(lower=low, upper=high)
# 940 becomes 82.25
```

`clip` pulls values back to the fences. Keep the original `amount` column and the flag so your treatment is transparent. The choice matters: the mean of all twelve orders is 129.83, while the mean excluding the outlier is 56.18.

## Recap

- A big gap between mean and median is a hint; `describe()` shows it.
- IQR fences (1.5 x IQR beyond the quartiles) and z-scores (beyond 3) are standard detection rules.
- Decide based on what the value is: error, real, or too influential.
- Use `clip()` to cap, keep the original column, and add a flag.
