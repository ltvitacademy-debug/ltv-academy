# Script — Handling Missing Data

## Segment 1 (title)

Before picking a fix for missing data, it's worth asking why it's missing, because the answer changes the right strategy.

## Segment 2 (steps)

Sometimes it's random, a sensor drops a reading for no systematic reason. Sometimes it relates to something else you can observe, like older records missing a field a newer form started requiring. And sometimes it relates to the value itself — people with very high incomes are more likely to leave an income field blank. That third case is the one people most often overlook, and it's exactly why blindly filling missing values can throw away a real signal.

## Segment 3 (code)

The simplest options are dropping rows, if very few are affected and it looks random, or dropping the whole column, if so little data remains that it isn't worth keeping. Both waste information, and dropping rows can bias your dataset if the missingness isn't actually random.

## Segment 4 (code)

More often you impute: fill with a learned statistic, typically the median. And when you suspect the missingness itself might be informative, add a flag column alongside the imputed value, so the model gets both a usable number and a signal that it was estimated.

## Segment 5 (steps)

The same rule from data cleaning applies here: fit the imputer on the training split only, and apply that already-learned value to test. Fitting on the full dataset before splitting lets test information quietly leak into training.

## Segment 6 (outro)

Next, we look at a different kind of column entirely: categorical features, and how to turn them into numbers a model can actually use.
