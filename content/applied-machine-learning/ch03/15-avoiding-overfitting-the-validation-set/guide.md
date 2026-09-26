# Avoiding Overfitting the Validation Set

You already know the first rule of honest evaluation: never tune on the test set. There is a second, subtler rule. If you tune for long enough against the same cross-validation folds, those folds stop being an honest judge too. After hundreds of choices, the best score you found is partly skill and partly luck. This lesson measures that luck with real numbers and introduces nested cross-validation, the standard way to get an estimate you can trust.

## What you'll learn

- The three jobs of training, validation and test data
- Why the best score from a large search is optimistic
- How to run nested cross-validation with `cross_val_score`
- Practical rules for keeping your estimates honest

## Every choice spends data

Think of your data as having three jobs. Training rows fit the parameters. Validation folds compare models and tune hyperparameters. The test set gives one final, honest number. Each time you look at a validation score and make a decision, you use up a little of its independence. One decision costs almost nothing. Hundreds of decisions add up.

## The optimism, measured

The data is an illustrative noisy dataset from `make_classification`: 300 rows, 20 features of which only 3 carry signal, and 20% of labels flipped at random. We split it 70/30 (210 training rows, 90 test rows) and search a decision tree over 11 depths, 6 leaf sizes and 4 `max_features` settings: 264 combinations, each cross-validated with 5 folds.

```python
gs = GridSearchCV(DecisionTreeClassifier(random_state=0),
                  grid, cv=inner)
gs.fit(X_tr, y_tr)
print(round(gs.best_score_, 3))
print(np.mean(gs.cv_results_["mean_test_score"]).round(3))
print(round(gs.score(X_te, y_te), 3))
```

The output is `0.767`, `0.614` and `0.7`. The best combination scores 0.767 in cross-validation, while the average combination scores 0.614. Each combination's score carries random error, and the one that wins is likely to be one whose error happened to be positive. The more combinations you try, the stronger that effect. Here the winner is `{'max_depth': 2, 'max_features': None, 'min_samples_leaf': 12}`.

The test accuracy of 0.700 is lower, but do not over-read it: with only 90 test rows, one score has a standard error of about five percentage points. A single number from either source is a weak basis for a claim on data this small.
## Nested cross-validation

Nested cross-validation wraps the entire tuning procedure in an outer loop:

1. Hold out one outer fold.
2. Run the full grid search, with its own inner folds, on the remaining data.
3. Score the tuned model on the held-out outer fold, which the search never saw.
4. Repeat for every outer fold and average.

In scikit-learn this needs no special class. A `GridSearchCV` object is an estimator, so you can pass it straight to `cross_val_score`:

```python
inner = StratifiedKFold(5, shuffle=True, random_state=1)
outer = StratifiedKFold(5, shuffle=True, random_state=2)

gs = GridSearchCV(DecisionTreeClassifier(random_state=0),
                  grid, cv=inner)
nested = cross_val_score(gs, X_tr, y_tr, cv=outer)
print(nested.round(3))
print(nested.mean().round(3), nested.std().round(3))
```

The five outer scores are `[0.833 0.786 0.643 0.69 0.738]`, with a mean of `0.738` and a standard deviation of `0.067`. That 0.738 estimates how the whole procedure, tune then fit, performs on unseen data. It sits below the 0.767 that `best_score_` reported. The gap here is about three points, and the wide spread across outer folds is a reminder that even this estimate is noisy. The chart below (output of the code that follows) marks both numbers on the distribution of all 264 scores.

```python
s = gs.cv_results_["mean_test_score"]
fig, ax = plt.subplots(figsize=(8, 3.8))
ax.hist(s, bins=15, color="#C4952E", edgecolor="white")
ax.axvline(gs.best_score_, color="#8E1C1C", lw=2)
ax.axvline(nested.mean(), color="#1E1A16", lw=2)
ax.set_xlabel("Mean 5-fold accuracy of each combination")
ax.set_ylabel("Combinations")
```

## Is it always this big? Repeat on ten datasets

One dataset proves little. Repeating the whole experiment on ten different datasets (seeds 0 to 9, same settings) gave an average `best_score_` of 0.713, an average nested estimate of 0.677 and an average test accuracy of 0.693. The best score was higher than the nested estimate in 7 of the 10 datasets, tied in 1, and slightly lower in 2. The average optimism was 0.036: real, but modest and not guaranteed on every dataset. It grows when data is scarce, labels are noisy and the search is large.

## The cost, and the final model

Nested cross-validation is expensive: the 264-combination search runs once per outer fold, about 6,600 tree fits here. Its purpose is estimation, not model building. Once you have the estimate, run a normal grid search on all the training data to produce the model you ship. Nested CV matters most for small or noisy datasets. With plenty of data, a simple train, validation and test split is usually enough.

## Practical rules

- Tune on training data only. The test set never chooses anything.
- Look at the test set once, after every decision is final. If you peek and then change something, it is no longer a test set.
- Use nested cross-validation when data is scarce and you must report a number.
- Prefer smaller, well-chosen searches to enormous grids.

## Recap

Every decision made on validation scores uses up some of their honesty, so the best cross-validated score from a big search is biased upward. Nested cross-validation measures the performance of the whole tune-and-fit procedure without that bias. Next, lesson 16 turns to comparing different models fairly.
