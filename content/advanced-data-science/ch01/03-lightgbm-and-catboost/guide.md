# LightGBM & CatBoost

XGBoost is not the only serious boosting library. Two others, **LightGBM** (from Microsoft) and **CatBoost** (from Yandex), are used just as widely, and each has a design choice that makes it shine in certain situations. All three implement the same core idea from Lesson 1, so what you already know transfers directly. This lesson shows what is different and how to run each one on the same churn data.

## What you'll learn

- How LightGBM grows trees leaf-wise and why `num_leaves` is its key setting
- How CatBoost handles categorical columns natively
- How to train both with early stopping, using the same three-way split as Lesson 2
- A practical way to choose among XGBoost, LightGBM and CatBoost

## The data

We reuse the illustrative churn table and the `make_churn` function from Lesson 2 (6,000 customers, roughly 30% churn, some missing `support_calls`), with the same 3,600 / 900 / 1,500 train / validation / test split. The only change: we keep the `plan` column (basic, plus, premium) as a real category instead of converting it to numbers, because both new libraries can use it directly.

## LightGBM: leaf-wise growth

Most boosting libraries historically grew trees **level-wise**: every node at a depth splits before going deeper. LightGBM grows **leaf-wise**: it always splits the single leaf that would reduce the loss the most, so trees become lopsided but reach a lower loss with the same number of leaves. It also bins feature values into histograms for speed, which is why it is popular on large datasets.

Because trees are lopsided, `max_depth` is a weaker control than in XGBoost. The main complexity knob is **`num_leaves`**. Keep it small for small data, since a leaf-wise tree with many leaves overfits quickly.

```python
import lightgbm as lgb

df = make_churn()
df["plan"] = df["plan"].astype("category")
# ... same splits as Lesson 2: X_fit, X_val, X_te, and so on

lg = lgb.LGBMClassifier(
    n_estimators=500, learning_rate=0.05, num_leaves=8,
    subsample=0.8, subsample_freq=1, colsample_bytree=0.8,
    random_state=0, verbose=-1)
lg.fit(X_fit, y_fit, eval_set=[(X_val, y_val)],
       eval_metric="auc",
       callbacks=[lgb.early_stopping(30, verbose=False)])
```

Notice two differences from XGBoost. Early stopping is passed as a callback, `lgb.early_stopping(30)`. And a pandas `category` column is used natively, with no encoding step. Note `subsample_freq=1`: in LightGBM, row subsampling only takes effect when that frequency is set.

On our split it stopped at round 115 (`lg.best_iteration_`) with a test AUC of 0.830.

## CatBoost: categorical features and ordered boosting

CatBoost's headline feature is its handling of **categorical columns**. Instead of one-hot or label encoding, it converts categories into numbers using target statistics computed in a way that avoids leaking the row's own label (it uses an "ordered" scheme). That matters most when categories have many levels, such as a product ID or a city, where one-hot encoding explodes the column count. CatBoost also builds **symmetric** trees, which are fast to predict with and act as a mild regularizer, and its defaults are known for working well without much tuning.

```python
from catboost import CatBoostClassifier

X_cb = X.copy()
X_cb["plan"] = X_cb["plan"].astype(str)   # plain strings
# ... same row splits, applied to X_cb

cb = CatBoostClassifier(
    iterations=500, learning_rate=0.05, depth=4,
    eval_metric="AUC", early_stopping_rounds=30,
    random_seed=0, verbose=0)
cb.fit(X_fit_cb, y_fit, cat_features=["plan"],
       eval_set=(X_val_cb, y_val))
```

You tell CatBoost which columns are categorical with `cat_features`. It stopped at round 123 (`cb.get_best_iteration()`) with a test AUC of 0.831. Vocabulary differs slightly, too: `iterations`, `depth`, and `random_seed` instead of `n_estimators`, `max_depth`, and `random_state`.

## How do they compare?

```
Test AUC, one split (seed 0)
XGBoost    0.828
LightGBM   0.830
CatBoost   0.831
```

The three are practically tied. To check that we were not just seeing luck, we repeated the experiment on five different train/test splits. The averages came out at 0.836, 0.835 and 0.835, with a standard deviation of about 0.006 across splits for each. The differences between libraries are far smaller than the split-to-split noise, so on this small, mostly numeric table you should not pick a library based on accuracy.

Speed is a separate matter and depends on your machine and data. On our machine, on this small table, LightGBM finished in well under a second and CatBoost took a few seconds; the gap generally widens with more rows, so time your own data.

## Choosing among them

- **XGBoost**: the mature, widely supported default, with a huge community.
- **LightGBM**: try it first on large datasets where training speed matters. Watch `num_leaves`.
- **CatBoost**: try it first when you have many categorical columns, or when you want strong results with minimal tuning.

In practice, many teams train two or three on the same split and keep the best on validation data. Always confirm the API details in each library's current documentation, since parameter names and defaults change between versions.

## Recap

The three libraries share the same boosting core. LightGBM grows leaf-wise and is fast, CatBoost treats categorical columns natively, and XGBoost is the reliable all-rounder. On our data, accuracy was a tie, so choose by data shape, speed, and convenience. Next, we look at how to tune these models systematically.
