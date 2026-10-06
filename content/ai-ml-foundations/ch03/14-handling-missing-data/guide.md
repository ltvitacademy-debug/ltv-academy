# Lesson 14 — Handling Missing Data

**Chapter 3 · Working With Data for ML · Lesson 14 of 30**

## What you'll learn

- Why missing data isn't always "missing" for the same reason
- The main strategies for handling it, and when each one is appropriate
- Why sometimes the fact that a value is missing is itself useful information
- The one rule, carried over from Lesson 12, that still applies here

## Not all missingness is equal

Before picking a fix, it's worth asking *why* a value is missing, because the answer changes the right strategy:

- **Missing at random** — a sensor occasionally drops a reading for reasons unrelated to the actual value; nothing systematic is going on.
- **Missing for a related reason** — older customer records are missing a field a newer signup form started requiring; the missingness correlates with something else you can observe (like signup date).
- **Missing because of the value itself** — people with very high incomes are more likely to leave an income field blank. Here, the missingness is itself informative — it's correlated with the very thing you're trying to measure.

That third case is the one people most often overlook, and it's exactly why simply deleting or blindly filling missing values can quietly throw away a real signal.

## The main strategies

```python
# 1. Drop rows with missing values (only if very few, and not systematic)
df.dropna(subset=["monthly_spend"])

# 2. Drop the whole column (if mostly missing, little info left)
df.drop(columns=["rarely_filled_field"])

# 3. Impute: fill with a learned statistic
from sklearn.impute import SimpleImputer
imputer = SimpleImputer(strategy="median")
X_train_filled = imputer.fit_transform(X_train)
X_test_filled  = imputer.transform(X_test)      # reuse the TRAIN median

# 4. Flag it: preserve the fact that it was missing
df["income_was_missing"] = df["income"].isna().astype(int)
df["income"] = df["income"].fillna(df["income"].median())
```

Dropping rows is the simplest option but wastes data and can bias your dataset if the missingness isn't random. Dropping a whole column is reasonable only when so little data remains that the column isn't worth keeping. Imputing — filling in a reasonable substitute value, typically the median (robust to outliers) or mean — is the most common approach, and it's exactly what `SimpleImputer` does. Adding a `_was_missing` flag column alongside an imputed value is how you capture the "missing because of the value itself" case: the model gets both a usable number and a signal that the number was estimated, not observed.

## The rule you already know, applied again

Exactly like the fill-value rule from Lesson 12: `imputer.fit_transform(X_train)` *learns* the median from the training data, and `imputer.transform(X_test)` *applies* that already-learned value to the test set, without recomputing anything from test rows. Calling `fit_transform` on the full dataset before splitting — a surprisingly common mistake — lets statistics from the test set quietly influence training, which is data leakage, covered fully in Lesson 16.

## Picking a strategy

- **Only a handful of rows affected, missingness looks random?** Dropping rows is fine and simple.
- **A column is missing in most rows?** Consider dropping the column — there may not be enough signal left to justify keeping it.
- **A meaningful fraction is missing, and you suspect missingness itself carries information?** Impute a reasonable value and add a `_was_missing` flag.
- **Always:** fit any imputation strategy on the training split only.

## Recap

Missing data can be missing randomly, missing for a reason related to another feature, or missing because of the value itself — and that last case means missingness itself can be informative. Strategies range from dropping rows or columns, to imputing a reasonable value, to imputing plus flagging that a value was estimated. Whatever you choose, learn any fill statistic strictly from the training data. Next, we look at a different kind of column entirely: categorical features, and how to convert them into numbers a model can use.
