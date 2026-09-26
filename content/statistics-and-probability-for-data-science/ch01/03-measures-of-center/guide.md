# Measures of Center

"What is a typical value?" is the first question anyone asks about a column of numbers. A **measure of center** (or measure of central tendency) answers it with a single number. There are three classic choices: the mean, the median, and the mode. They often agree on tidy data and disagree, sometimes dramatically, on real business data. Knowing which one to report is a core data-science skill.

## What you'll learn

- How to compute and interpret the mean, median, and mode
- Why outliers pull the mean but barely move the median
- What a trimmed mean and a weighted average are for
- How to choose a measure of center honestly

## The three measures

- **Mean**: add up all values and divide by how many there are. It is the balance point of the data, and it uses every value.
- **Median**: sort the values and take the middle one (or the average of the two middle ones if there is an even count). Half the data is below it, half above.
- **Mode**: the most frequent value. It is the only one of the three that works for nominal (category) data.

## A first example

Suppose these are nine illustrative order values in dollars, and one of them is a large enterprise order:

```python
import pandas as pd
from scipy import stats

s = pd.Series([12, 15, 15, 18, 20, 22, 25, 30, 400])
print("mean  :", round(s.mean(), 2))
print("median:", s.median())
print("mode  :", s.mode().tolist())
```

Output:

```
mean  : 61.89
median: 20.0
mode  : [15]
```

The mean says a "typical" order is about 62 dollars. But eight of the nine orders are 30 dollars or less. The single 400-dollar order dragged the mean up to a value that describes almost nobody. The median, 20 dollars, is much closer to what a typical customer actually spends.

## Why the mean is sensitive

Because the mean uses the exact size of every value, one extreme value changes it a lot. The median only cares about ordering, so an extreme value counts as just "one more value on the high side." We call the median **robust**. Watch what happens when we remove the 400:

```python
t = s.drop(8)          # drop the 400 (index label 8)
print(t.mean())        # 19.625
print(t.median())      # 19.0
```

The mean collapsed from 61.89 to 19.625, while the median only moved from 20.0 to 19.0. That contrast is a quick diagnostic: **when the mean and median are far apart, your data is skewed or has outliers**, and you should look at a chart before trusting either number. (Skewness is the topic of Lesson 5.)

## Two useful variations

A **trimmed mean** discards a fixed share of the lowest and highest values before averaging, giving a compromise between mean and median. scipy provides it:

```python
print(stats.trim_mean(s, 0.2))   # about 20.71
```

With nine values and a 0.2 trim, scipy cuts one value from each end (the 12 and the 400) and averages the rest.

A **weighted average** counts some values more than others, for example averaging satisfaction scores where each region has a different number of customers. With numpy: `np.average([80, 100], weights=[3, 1])` returns `85.0`, because the first score counts three times as much.

## Mode for categories

For nominal data such as region, the mode is the natural summary:

```python
regions = pd.Series(["East","West","East","North","West","East"])
print(regions.mode().tolist())    # ['East']
```

A data set can have several modes; `mode()` returns all of them.

## Which one should you report?

- **Roughly symmetric numeric data, no wild outliers**: the mean is efficient and easy to explain.
- **Skewed data or outliers (incomes, order values, response times)**: the median is usually more representative. Report both if you are unsure.
- **Categories**: the mode.
- **Never** report a single center without checking the distribution.

## Recap

The mean is the balance point and is sensitive to extremes; the median is the middle value and is robust; the mode is the most common value. A large gap between mean and median is a warning sign. Next, we measure how *spread out* data is, because two datasets can share a center and still be completely different.
