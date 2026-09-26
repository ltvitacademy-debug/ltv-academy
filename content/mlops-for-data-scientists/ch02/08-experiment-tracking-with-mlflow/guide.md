# Experiment Tracking With MLflow

You have already met MLflow's four basic ideas in the Azure and AWS data science courses: runs, parameters, metrics and artifacts. This lesson is about something harder than calling `log_param`: tracking *discipline*. A run that logs only a score is nearly useless six weeks later. A run that also records which data, which code and which settings produced the score can be reproduced, compared and trusted. We build that on the `churn-project` from lesson 3, using the illustrative cancellation data (`make_cancel_data`) and the `cancel-risk` experiment that the capstone will reuse. Everything runs locally against a plain `./mlruns` folder. We used Python 3.9, scikit-learn 1.1.2, pandas 1.4.3 and `mlflow-skinny` 2.14.3, so check the current docs if your versions differ.

## What you'll learn

- What a well-tracked run records, and why tags matter as much as metrics
- How to run a small sweep and compare the runs from code
- What autologging really logs, and why you cannot trust its metrics alone
- Habits that keep an experiment store useful as it grows

## A tracked training function

Here is the heart of `churn/train.py`, trimmed to the tracking calls:

```python
mlflow.set_experiment("cancel-risk")
with mlflow.start_run(run_name="logreg-C-1.0"):
    mlflow.set_tags({"git_commit": git_commit(),
                     "data_version": "make_cancel_data-2026",
                     "stage": "experiment"})
    mlflow.log_params({"C": 1.0, "train_rows": 4800,
                       "split_seed": 42})
    # ... fit the pipeline ...
    mlflow.log_metrics({"train_roc_auc": 0.71,
                        "test_roc_auc": 0.744,
                        "test_avg_precision": 0.333})
    mlflow.log_artifact("params.yaml")
    mlflow.sklearn.log_model(model, "model")
```

(In the real function the metric values are computed, not typed.) Each kind of record has a job. **Params** are the inputs you chose. **Metrics** are the results, and we name them `train_` or `test_` so nobody has to guess which split a number came from. **Tags** are free-form labels for searching: which commit, which data, which stage of work. **Artifacts** are files, and logging `params.yaml` means the exact settings file travels with the run. Note that params are immutable: logging the same key twice with a different value raised an `MlflowException` ("Changing param values is not allowed"), which is a feature, because a recorded setting cannot silently change.

Two small details pay off. Always pass a `run_name`, or you will be staring at random names later. And record the git commit. In our scratch repo MLflow also added its own `mlflow.source.git.commit` tag automatically, but that depends on git being available where the code runs, so an explicit tag is a cheap safety net.

## Run a sweep, then compare

We ran the function for six values of `C`, the regularization strength, plus one deliberately broken run with `C=-1`. The broken run raised `ValueError: Penalty term must be positive`, and because we used a `with` block, MLflow recorded it with status `FAILED` instead of losing it. Then we queried the store:

```python
runs = mlflow.search_runs(
    experiment_names=["cancel-risk"],
    filter_string="attributes.status = 'FINISHED'")
```

`search_runs` returns a pandas DataFrame with columns named `params.C`, `metrics.test_roc_auc`, `tags.git_commit` and so on. Sorted by `C`, the results were:

```
tags.mlflow.runName  train_roc_auc  test_roc_auc  test_avg_precision
     logreg-C-0.001          0.704         0.727               0.313
      logreg-C-0.01          0.708         0.737               0.325
       logreg-C-0.1          0.710         0.742               0.334
       logreg-C-1.0          0.710         0.744               0.333
      logreg-C-10.0          0.711         0.744               0.334
     logreg-C-100.0          0.711         0.744               0.333
```

The table is a decision, not a leaderboard. Beyond `C=1` nothing improves, so we keep `C=1.0`, the simplest setting that ties for best. We then tagged that run with `client.set_tag(run_id, "stage", "candidate")`. Tags, unlike params, can be edited, so they are the right place for a status that changes.

## Autolog, and its caveat

`mlflow.sklearn.autolog()` logs a fitted estimator without any manual calls. On our pipeline it recorded 50 parameters, including every default the pipeline holds (for example `model__solver` and `prep__num__imp__strategy`), and the model. The metrics it logged, though, were all prefixed `training_`, for example `training_roc_auc` of 0.7105 and `training_accuracy_score` of 0.889. That accuracy looks great until you remember the cancel rate is 0.111: a model that predicts "nobody cancels" also scores 0.889. Autolog never saw our test set, so it logged none of our held-out numbers. Use it for the parameter capture if you like, but always log your own test metrics, and treat every `training_` number with suspicion. Autolog also printed repeated schema warnings about integer columns, a reminder that it does extra work on your behalf.

## Habits that scale

- One experiment per problem (`cancel-risk`), one run per fit, meaningful `run_name` values.
- Log the data identity and the code version on every run, as tags.
- Log a `test_` metric for anything you will use to compare, and use the same `evaluate` function everywhere.
- Never delete failed runs; they show what you already tried.
- Use `mlflow ui` to browse runs visually. It ships with the full `mlflow` package rather than the skinny one we used, so we did not run it here.

## Recap

Tracking is only valuable if a stranger can answer "what produced this number?" Log params, `train_` and `test_` metrics, tags for code and data, and the settings file as an artifact. Compare runs with `search_runs`, keep failed runs, and read autolog's `training_` metrics with care. Next, lesson 9 registers the winning run as a versioned model.
