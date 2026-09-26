# Comparing Models Fairly

By now you can tune a model honestly. The next question is which model to tune in the first place, and whether a winner is really a winner. Scoreboards are easy to build and easy to misread: two models that differ by 0.003 in the fourth decimal are not meaningfully different, and a comparison in which each model got a different set of folds is not a comparison at all. This lesson gives you a checklist for fair comparisons and a habit for deciding when a difference is real.

## What you'll learn

- The rules that make a model comparison fair
- How to build a comparison table with one shared set of folds
- How to compare models fold by fold (a paired comparison)
- How to recognize a tie, and what to do about it
- How to finish: refit the winner and touch the test set once

## The rules of a fair fight

1. **Same data, same folds.** Every model sees exactly the same training rows and the same fold assignments.
2. **Same metric.** Choose it from the business problem before you look at any results.
3. **A baseline in the table.** It shows what "no skill" looks like.
4. **Preprocessing inside each pipeline.** Scaling that helps k-nearest neighbors or logistic regression must be refit on every training fold.
5. **Comparable tuning effort.** A tuned forest against a default logistic regression compares the effort, not the algorithms.
6. **Test set last.** It is for the finalist only.

## One table, shared folds

The data is illustrative: 1,000 rows, 20 features, about 31% positives, standing in for "customer churned". After holding out 25%, 750 rows remain for training. We compare five candidates using ROC AUC, with a single `StratifiedKFold` object shared by all of them.

```python
models = {
    "baseline": DummyClassifier(strategy="prior"),
    "logreg": make_pipeline(StandardScaler(),
                LogisticRegression(max_iter=1000)),
    "knn": make_pipeline(StandardScaler(),
                KNeighborsClassifier(15)),
    "forest": RandomForestClassifier(
                n_estimators=200, random_state=0),
    "boost": HistGradientBoostingClassifier(random_state=0)}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
scores = {}
for name, m in models.items():
    r = cross_validate(m, X_tr, y_tr, cv=cv, scoring="roc_auc")
    scores[name] = r["test_score"]
```

Because `cv` is one object with a fixed `random_state`, every model is scored on identical splits. The means and standard deviations across folds:

| model | mean AUC | std |
|---|---|---|
| baseline | 0.500 | 0.000 |
| logreg | 0.781 | 0.062 |
| knn | 0.832 | 0.037 |
| forest | 0.893 | 0.045 |
| boost | 0.890 | 0.041 |

The baseline scores exactly 0.5, the definition of a coin flip. Everything else beats it, and the two tree ensembles lead. But is the forest really better than boosting?

## Compare fold by fold

Fold scores move together: some folds are just harder. The chart below (output of the code that follows) shows all four models dipping on fold 5.

```python
for k in ["logreg", "knn", "forest", "boost"]:
    plt.plot(range(1, 6), scores[k], marker="o", label=k)
plt.xlabel("Fold (same 5 folds for every model)")
plt.ylabel("ROC AUC")
plt.legend()
```

That shared difficulty is why paired comparison works: subtract the scores fold by fold, and the difficulty cancels out.

```python
d = scores["forest"] - scores["knn"]
print(d.round(3), d.mean().round(4), d.std().round(4), (d > 0).sum())
d = scores["forest"] - scores["boost"]
print(d.round(3), d.mean().round(4), d.std().round(4), (d > 0).sum())
```

Forest minus k-nearest neighbors is `[0.095 0.065 0.063 0.052 0.032]`: positive on all 5 folds, averaging 0.0616 (standard deviation 0.0203). That is a clear win. Forest minus boosting is `[-0.008 0.005 0.021 0.009 -0.008]`: it wins on 3 folds and loses on 2, averaging 0.0038 (standard deviation 0.011). The difference is smaller than its own fold-to-fold wobble. A rule of thumb: **if a model does not beat another on nearly every fold, and by more than the wobble, call it a tie.**

## Get more evidence with repeated folds

To firm up a close call, repeat the whole cross-validation with different shuffles using `RepeatedStratifiedKFold`. Here, 5 folds repeated 3 times gives 15 paired scores per model:

```python
rcv = RepeatedStratifiedKFold(n_splits=5, n_repeats=3,
                              random_state=0)
rf = cross_val_score(models["forest"], X_tr, y_tr,
                     cv=rcv, scoring="roc_auc")
hg = cross_val_score(models["boost"], X_tr, y_tr,
                     cv=rcv, scoring="roc_auc")
d = rf - hg
```

The means are 0.8957 (forest) and 0.8968 (boosting), a difference of -0.001, with the forest ahead in 7 of 15 pairs. The lead disappeared: these two are tied on this data. Be careful with formal significance tests here. The 15 scores are not independent (the folds overlap in the rows they train on), so a naive t-test overstates confidence. Treat the counts and the size of the difference as your evidence.

## What happens when folds are not shared

To see why sharing folds matters, score the forest and boosting again, but give each model its own fold shuffle, over 10 different pairs of seeds:

```python
for seed in range(10):
    a = cross_val_score(models["forest"], X_tr, y_tr, scoring="roc_auc",
        cv=StratifiedKFold(5, shuffle=True, random_state=seed)).mean()
    b = cross_val_score(models["boost"], X_tr, y_tr, scoring="roc_auc",
        cv=StratifiedKFold(5, shuffle=True, random_state=seed + 100)).mean()
```

The differences a minus b ranged from about -0.018 to +0.022, and the forest came out behind in 6 of 10 runs. The lucky or unlucky fold assignment alone swung the verdict by more than the real difference between these models. With shared folds the noise from splitting cancels; without them, it does not.

## Breaking a tie, and finishing

When two models tie on the metric, decide on the other things you care about: fit and prediction time, memory, interpretability, ease of deployment. Here the two fit in about 0.8 and 1.2 seconds per fold, which is hardly decisive, so a team might prefer the one it finds easier to maintain. Then refit the finalist on all the training data and score the test set once:

```python
final = models["forest"].fit(X_tr, y_tr)
print(roc_auc_score(y_te, final.predict_proba(X_te)[:, 1]))
```

The forest scores 0.852 AUC on the 250 test rows, below its 0.893 cross-validation mean. That is well within the noise on a test set this small, but it is the number you report. Fit times will vary on your machine.

## Recap

Compare models with the same data, the same folds and the same metric, and always include a baseline. Compare fold by fold, and call a difference real only if it is consistent and larger than the wobble. Break ties on cost and simplicity, and touch the test set once. Next, lesson 17 introduces class imbalance, which changes how metrics and folds behave.
