# Avoiding Overfitting the Validation Set

You already know the first rule of honest evaluation: never tune on the test set. There is a second, subtler rule. If you tune for long enough against the same cross-validation folds, those folds stop being an honest judge too. You have made hundreds of choices based on them, and the best score you found is partly skill and partly luck. This lesson shows the effect with real numbers and introduces nested cross-validation, the standard way to get an estimate you can trust.

## What you'll learn

- The roles of training, validation and test data
- Why the best score from a large search is optimistic
- How to run nested cross-validation in scikit-learn
- Practical rules for keeping estimates honest

## Every choice spends data

Think of your data as having three jobs. Training rows fit the parameters. Validation folds compare models and tune hyperparameters. The test set gives one final, honest number. Each time you look at a validation score and make a decision, you use up a little of its independence. One decision costs almost nothing. Hundreds of decisions add up.

## The optimism, measured

The data here is an illustrative noisy dataset from `make_classification` (400 rows, 20 features of which 3 are informative, 15% of labels flipped), split 70/30 into training and test sets. The grid tries a decision tree across 13 depths, 6 leaf sizes and 4 `max_features` settings: 312 combinations, each cross-validated with 5 folds.

```python
gs = GridSearchCV(DecisionTreeClassifier(random_state=0),
                  grid, cv=inner)
gs.fit(X_tr, y_tr)
print(round(gs.best_score_, 3))
print(np.mean(gs.cv_results_["mean_test_score"]).round(3))
print(round(gs.score(X_te, y_te), 3))
```

The output is `0.75`, `0.672` and `0.767`. The best cross-validated score is 0.75, but the average combination scores only 0.672. Choosing the maximum of 312 noisy estimates gave a flattering number. Each combination's score has random error, and the one that wins is likely to be one whose error happened to be positive. The more combinations you try, the stronger the effect.

The test score of 0.767 is not a contradiction. The test set has only 120 rows, so a single test score has a standard error of about four percentage points. It is one honest draw, not a precise measurement. That is exactly why relying on one number, from either source, is risky on small data.

## Nested cross-validation

Nested cross-validation wraps the entire tuning procedure in an outer cross-validation loop:

1. Hold out one outer fold.
2. Run the full grid search, with its own inner folds, on the remaining data.
3. Score the tuned model on the held-out outer fold, which the search never saw.
4. Repeat for every outer fold and average.

In scikit-learn, this needs no special class. A `GridSearchCV` object is an estimator, so you can pass it to `cross_val_score`:

```python
inner = StratifiedKFold(5, shuffle=True, random_state=1)
outer = StratifiedKFold(5, shuffle=True, random_state=2)

gs = GridSearchCV(DecisionTreeClassifier(random_state=0),
                  grid, cv=inner)
nested = cross_val_score(gs, X_tr, y_tr, cv=outer)
print(nested.round(3))
print(nested.mean().round(3), nested.std().round(3))
```

The five outer scores are `[0.696 0.661 0.75 0.661 0.768]`, with a mean of `0.707` and a standard deviation of `0.045`. That 0.707 is the honest estimate of how this whole procedure, tune then fit, performs on new data. It sits below the 0.75 that `best_score_` reported, which is the size of the optimism.

## The cost, and the final model

Nested cross-validation is expensive. Here it means the 312-combination search is repeated 5 times, roughly 7,800 fits. Its purpose is estimation, not model building. Once you have the estimate, run a normal grid search on all the training data to produce your final model. Nested CV is most valuable on small or noisy datasets, where the validation folds are easiest to overfit. With plenty of data, a simple train, validation and test split is often enough.

## Practical rules

- Tune on training data only. The test set never chooses anything.
- Look at the test set once, after every decision is final. If you peek and then change something, it is no longer a test set.
- Use nested cross-validation when data is scarce and you must report a number.
- Prefer smaller searches. Fewer, well-chosen hyperparameters overfit the validation folds less than huge grids.

## Recap

Every decision made on validation scores uses up some of their honesty, so the best cross-validated score from a big search is biased upward. Nested cross-validation measures the performance of the whole tune-and-fit procedure without that bias. Next, lesson 16 turns to comparing different models fairly.
