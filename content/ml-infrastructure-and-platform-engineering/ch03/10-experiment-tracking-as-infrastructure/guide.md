# Experiment Tracking as Infrastructure

Every ML team starts the same way: a notebook, a training run, a number that looks good. The trouble starts on the second run, when nobody can remember which hyperparameters produced the first one. This lesson reframes experiment tracking from "something you should write down" into infrastructure — a shared service the rest of the platform depends on, the same way it depends on a database or a message queue.

## What you'll learn

- Why spreadsheets, filenames, and notebook output cells stop working as a tracking system
- What an experiment tracker actually has to record: params, metrics, artifacts, code, and environment
- The MLflow Tracking Server's two stores — backend store and artifact store — and why they're separate
- The core MLflow Python API: `start_run`, `log_param`, `log_metric`, `log_artifact`, `autolog`
- Where Weights & Biases fits as an alternative with the same job

## Why ad hoc tracking breaks down

Picture a model file named `model_v2_final_FINAL.pkl`. It tells you nothing: not which hyperparameters trained it, not which data it saw, not which metric beat which. Now multiply that by a team of five people running dozens of experiments a week. The filename approach doesn't fail because people are careless — it fails because the information that actually matters (parameters, metrics, code version, data version) has no structured place to live. A spreadsheet someone updates by hand degrades the same way: it's accurate the day it's created and wrong a month later.

An experiment tracker exists to make this information structured, queryable, and automatic — logged by the training code itself, not transcribed afterward by a human.

## What a tracker actually records

Every real tracking system is built around the same four kinds of data, attached to one logical thing: a **run**.

- **Parameters** — the inputs you chose: learning rate, batch size, number of trees, which dataset split. Logged once per run, they don't change during training.
- **Metrics** — the outputs you measure: loss, accuracy, AUC. Logged as a time series, usually once per epoch or step, so you can see a curve, not just a final number.
- **Artifacts** — files produced by the run: the trained model itself, a confusion matrix plot, a requirements file.
- **Source and environment** — which code (ideally a git commit hash) and which library versions produced this run, so it can be rebuilt later.

A run that's missing any one of these four is only partially useful. A model artifact with no logged parameters can't be reproduced. A metric with no artifact can't be deployed. Tracking infrastructure exists to make logging all four the default, not an afterthought.

## MLflow Tracking: a backend store and an artifact store

MLflow's Tracking component is the most widely deployed open-source implementation of this idea, and it's built on a deliberate split between two stores:

- **Backend store** — holds the structured metadata: run IDs, parameters, metrics, tags. This is a database (SQLite for local work, Postgres/MySQL for a shared team server) because that metadata needs to be queried ("show me every run with accuracy > 0.9").
- **Artifact store** — holds the actual files: model binaries, plots, datasets. This is typically object storage (S3, Azure Blob, GCS, or a local filesystem) because artifacts can be large and don't need to be queried by content.

A single `mlflow server` process fronts both stores with one API and one UI, but the split matters operationally: you can scale or back up a multi-terabyte artifact store completely independently of the metadata database, and a metadata query never has to read through gigabytes of model weights to answer "what was the best run's learning rate."

## The core Python API

```python
import mlflow

mlflow.set_tracking_uri("http://mlflow.internal:5000")
mlflow.set_experiment("fraud-detection")

with mlflow.start_run(run_name="rf-baseline"):
    mlflow.log_param("n_estimators", 200)
    mlflow.log_param("max_depth", 8)

    for epoch in range(10):
        mlflow.log_metric("val_auc", run_epoch(epoch), step=epoch)

    mlflow.log_artifact("confusion_matrix.png")
    mlflow.sklearn.log_model(clf, artifact_path="model")
```

`start_run()` opens a run and closes it automatically at the end of the `with` block, tagging it with a start/end time and a status. `log_metric` accepts a `step` argument specifically so a metric like `val_auc` becomes a curve you can plot across epochs, not a single overwritten value.

For common frameworks, MLflow can skip most of this entirely:

```python
mlflow.sklearn.autolog()
# or mlflow.pytorch.autolog(), mlflow.xgboost.autolog(), etc.

with mlflow.start_run():
    clf.fit(X_train, y_train)   # params, metrics, and the model are logged for you
```

Autologging hooks the framework's own training call and captures the parameters and metrics that framework already knows about. It's not magic — it's only as complete as the framework integration — but it removes the most common reason tracking gets skipped: it being extra work.

## Weights & Biases: the same job, a different implementation

Weights & Biases (W&B) is a hosted (or self-hosted) alternative that solves the identical problem with a slightly different API shape:

```python
import wandb

wandb.init(project="fraud-detection", config={"n_estimators": 200, "max_depth": 8})

for epoch in range(10):
    wandb.log({"val_auc": run_epoch(epoch)}, step=epoch)

wandb.log_artifact("model.pkl", name="rf-baseline", type="model")
```

`wandb.init` plays the role of `start_run` plus `log_param` in one call (the `config` dict is your parameters), `wandb.log` plays the role of `log_metric`, and `wandb.log_artifact` plays the role of `log_artifact`. The concepts transfer directly between tools because the underlying problem — params, metrics, artifacts, source, environment, all attached to one run — is the same regardless of vendor.

## Tracking as infrastructure, not a habit

The reframe this lesson is built around: once a team depends on being able to answer "what produced this model" months later, the tracking server stops being optional tooling and becomes infrastructure with the same expectations as any other service — it needs backups, access control, and uptime, and it needs every training job (not just the ones someone remembers to instrument) writing to it by default. That's the foundation the rest of this chapter builds on: a model registry (Lesson 11) only has something trustworthy to register because a tracked run stands behind it.

## Key terms

| Term | Meaning |
|---|---|
| Run | One logical execution of a training job, the unit everything else attaches to |
| Parameter | A logged input that doesn't change during the run (learning rate, batch size) |
| Metric | A logged, time-stepped output measurement (loss, accuracy) |
| Artifact | A file produced by a run (model weights, plots, requirements files) |
| Backend store | The database holding structured run metadata (params, metrics, tags) |
| Artifact store | The object storage holding run output files |
| Autologging | Automatic parameter/metric capture hooked into a framework's own training call |

## Recap

Ad hoc tracking fails because the information that matters — parameters, metrics, artifacts, source, environment — has no structured home. MLflow's Tracking Server gives it one, split into a queryable backend store and a bulk artifact store, with a Python API (`start_run`, `log_param`, `log_metric`, `log_artifact`, `autolog`) that can be called by hand or triggered automatically. Weights & Biases solves the same problem with an equivalent API. Next, in Lesson 11, you'll see what gets built on top of a tracked run: a model registry that turns "a run with good metrics" into "a named, versioned model ready to deploy."
