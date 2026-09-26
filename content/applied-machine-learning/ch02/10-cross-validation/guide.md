# Cross-Validation

A single train/test split gives you a single score, and that score depends on which rows happened to land in which set. On the illustrative churn dataset used in this lesson, four different random splits produced accuracy of 0.830, 0.815, 0.850 and 0.825 for the same model. Which one is "the" accuracy? None of them, exactly. Cross-validation replaces one roll of the dice with several, and gives you both an average and a sense of how much that average can be trusted.

## What you'll learn

- How k-fold cross-validation works and what its output means
- How to run it with `cross_val_score` and `cross_validate`
- Why classification should use stratified folds
- How to read the spread of the scores, not just the mean
- Why every preprocessing step must live inside the pipeline

## How k-fold works

Cut the training data into k equal folds. Hold out fold 1, train on folds 2 to k, and score on fold 1. Then hold out fold 2 and repeat, until every fold has had one turn as the exam. You get k scores. The mean estimates how the model will perform on unseen data, and the standard deviation tells you how unstable that estimate is. Do this on the training portion only. Your final test set stays untouched until the very end.

## cross_val_score

The data below is a seeded, illustrative dataset from `make_classification` with about 30% positives, standing in for "customer churned". The model is a scaler plus a logistic regression in a pipeline, which you built in the pipelines lesson.

```python
from sklearn.model_selection import (
    StratifiedKFold, cross_val_score)

skf = StratifiedKFold(n_splits=5,
    shuffle=True, random_state=42)
scores = cross_val_score(pipe, X_tr, y_tr,
    cv=skf, scoring="f1")
print(scores.round(3))
print(scores.mean().round(3), scores.std().round(3))
```

The output is `[0.711 0.808 0.723 0.747 0.659]`, a mean of `0.73` and a standard deviation of `0.049`. Notice the range: the best fold is nearly 15 points higher than the worst, with an identical model. A single split could easily have shown you either extreme.

Two details are worth knowing. When you pass an integer such as `cv=5` to a classifier, scikit-learn uses stratified folds automatically. And for classification you should shuffle the data before folding, especially if the file is sorted by date or by class, or the folds will be unrepresentative.

## cross_validate: several metrics and train scores

`cross_val_score` returns one metric. `cross_validate` returns a dictionary and accepts a list of scorers.

```python
from sklearn.model_selection import cross_validate

res = cross_validate(pipe, X_tr, y_tr, cv=skf,
    scoring=["accuracy", "recall", "f1"],
    return_train_score=True)
print(res["test_f1"].mean().round(3))
```

The results here: test accuracy 0.846 (plus or minus 0.021), train accuracy 0.856, test recall 0.692 (plus or minus 0.084), test F1 0.730 (plus or minus 0.049). Comparing train and test scores is a cheap overfitting check. Here the gap is small, so this model is not memorizing the data. The result dictionary also includes `fit_time` and `score_time`.

## Plot the folds

```python
import matplotlib.pyplot as plt

plt.bar(range(1, 6), scores)
plt.axhline(scores.mean(), color="crimson")
plt.xlabel("Fold")
plt.ylabel("F1 score")
plt.show()
```

The chart (output of the code above, illustrative data) shows fold 2 near 0.81 and fold 5 near 0.66. Report the mean and the spread, for example "F1 of 0.73, plus or minus 0.05", never a single number.

## Keep everything inside the pipeline

Cross-validation is only honest if each fold's validation rows are truly unseen, including by your preprocessing. The dramatic demonstration is pure noise: 100 rows, 500 random features, random labels. No model can do better than a coin flip.

```python
rng = np.random.RandomState(0)
Xn = rng.normal(size=(100, 500))
yn = rng.randint(0, 2, 100)
lr = LogisticRegression(max_iter=1000)

Xsel = SelectKBest(f_classif, k=10).fit_transform(Xn, yn)
cross_val_score(lr, Xsel, yn, cv=5).mean()   # 0.79, leaked

p = make_pipeline(SelectKBest(f_classif, k=10), lr)
cross_val_score(p, Xn, yn, cv=5).mean()      # 0.54, honest
```

Selecting features on all the data first lets the selector see the validation labels, so the score is fantasy. Inside a pipeline, the selector is refit on each training fold and the honest answer, about 0.54, appears.

## Recap

Cross-validation gives k scores instead of one. Use stratified folds for classification, report the mean and the spread, use `cross_validate` for multiple metrics and train-versus-test comparisons, and put every data-dependent step in the pipeline. Next, lesson 11 uses these ideas to draw learning curves and diagnose whether a model needs more data, more complexity, or less.
