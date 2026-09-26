# Automated ML

You have now trained jobs and tracked them. A natural question follows: which algorithm should you try, and with which settings? On a new problem you might test logistic regression, then random forests, then boosting, tuning each by hand. **Automated ML** (AutoML) in Azure Machine Learning does that loop for you. You supply data, a target and a metric; the service tries many combinations of feature preparation, algorithm and hyperparameters, and hands back a ranked list. It is a fast, honest baseline, and sometimes it is the model you ship.

Azure code below is illustrative (not run here) and follows the Microsoft Learn "Set up AutoML with Python (v2)" and studio articles as of this writing. The local example was run for real.

## What you'll learn

- What AutoML automates, and what stays your decision
- How to describe a classification job with the SDK v2
- How to choose a primary metric and set limits
- How to read the leaderboard and the model explanation

## The idea in miniature

Microsoft's diagram (screenshot in this lesson) shows the flow: your data, target metric and constraints go in; many iterations of features plus algorithm plus parameters run; a leaderboard ranks them. Here is a hand-built miniature on the illustrative 1,000-row churn table. It scores five candidates with three-fold cross-validated AUC:

```python
candidates = {
    "logistic_regression": make_pipeline(StandardScaler(), LogisticRegression()),
    "knn": make_pipeline(StandardScaler(), KNeighborsClassifier()),
    "decision_tree": DecisionTreeClassifier(max_depth=4, random_state=0),
    "random_forest": RandomForestClassifier(n_estimators=100, random_state=0),
    "gradient_boosting": GradientBoostingClassifier(random_state=0),
}
for name, model in candidates.items():
    scores = cross_val_score(model, X, y, cv=3, scoring="roc_auc")
```

Real output, sorted best first:

```
1  logistic_regression  auc=0.719
2  gradient_boosting    auc=0.661
3  decision_tree        auc=0.660
4  random_forest        auc=0.655
5  knn                  auc=0.616
```

Notice that the simplest model won. That is a real lesson: the fanciest algorithm is not automatically the best one for your data, and a systematic comparison finds out cheaply. The miniature is only a sketch. The service goes further: it applies automatic featurization (scaling, missing-value handling, encoding), varies hyperparameters, can build ensembles, and stops unpromising trials early.

## Give AutoML its data

In SDK v2, training data goes in as an **MLTable**, a small definition file that describes how to load tabular data. Microsoft's example builds one from a CSV like this:

```python
import mltable

paths = [{'file': './train_data/churn.csv'}]
train_table = mltable.from_delimited_files(paths)
train_table.save('./train_data')
```

The data must be tabular and must include the target column. If you supply no validation data or fold count, the docs say AutoML validates by cross-validation when the training data has 20,000 rows or fewer (three folds from 1,000 rows up, ten folds below that), and by a 10 percent split above that.

## Describe the job

This follows the structure of Microsoft's classification example:

```python
# Illustrative - not run here.
from azure.ai.ml import automl, Input
from azure.ai.ml.constants import AssetTypes

train_input = Input(type=AssetTypes.MLTABLE, path="./train_data")

job = automl.classification(
    compute="cpu-cluster",
    experiment_name="churn-automl",
    training_data=train_input,
    target_column_name="churned",
    primary_metric="AUC_weighted",
    n_cross_validations=3,
    enable_model_explainability=True,
)
job.set_limits(timeout_minutes=60, trial_timeout_minutes=10,
               max_trials=20, enable_early_termination=True)

returned_job = ml_client.jobs.create_or_update(job)
```

Per the SDK guide, AutoML jobs run on Azure ML remote compute, meaning a cluster or a compute instance, not on your laptop. (Microsoft's studio guide also shows a serverless compute option, so check the current docs for your situation.) Other task types include regression and forecasting, plus image and text tasks with their own functions. Use `blocked_training_algorithms` via `set_training` to exclude algorithms you do not want.

## Choose the metric and limits

The **primary metric** is what AutoML optimizes, so it is your most important choice. Microsoft's guidance: threshold-based metrics such as `accuracy` can behave poorly on small datasets or with class imbalance, and `AUC_weighted` can be a better choice there. Our churn table has about 27 percent churners, an imbalance worth respecting. **Limits** cap the bill: `max_trials`, `timeout_minutes`, `trial_timeout_minutes` and early termination.

## In the studio, without code

The studio has a no-code wizard (screenshot). You pick the task type and data, choose the target column, set limits, and choose a validation type and optional test data. Then review the results on the job's **Models + child jobs** tab, where models are ordered by the metric score. "Explain best model" adds a model explanation, and the best model can be deployed to a real-time endpoint, which we cover in chapter 4.

## AutoML is a baseline, not a verdict

Runs vary. The docs say the algorithms have inherent randomness, so repeated runs can give slightly different scores and models. And AutoML cannot repair a flawed problem: leakage, bad labels or a metric that ignores your business need will still produce a confident-looking leaderboard. Use it to set the bar, then decide.

## Recap

- AutoML tries many feature, algorithm and hyperparameter combinations and ranks them.
- SDK v2: MLTable data, `automl.classification(...)`, `set_limits`, submit as a job.
- Choose the primary metric deliberately; consider `AUC_weighted` for imbalance.
- Read the leaderboard, explain the winner, and validate before trusting it.

Next up: hyperparameter tuning at scale, when you want to control the search yourself.
