# Lesson 18 — Experiment Tracking and Model Registries

**Chapter 5 · MLOps Pipelines for Model Lifecycle Management · Lesson 2 of 4**

## What you'll learn

- Why training the same model twice can silently produce two different
  results, and why that's a problem worth solving systematically
- What an **experiment tracking** system actually logs for every training
  run, and why that makes results reproducible and comparable
- What a **model registry** is, and how it differs from just saving a
  `.pt` or `.pkl` file to a folder
- How staging and production promotion status in a registry turns "which
  model is actually live" into an answerable question

## The reproducibility problem

Train the same architecture twice, even on the same data, and you can get
two different models — a different random seed, a tweaked learning rate
someone forgot to write down, a dependency version bump. Without a system
that captures exactly what produced a given model, "reproduce this result"
becomes a guessing game. Worse, once you have ten or fifty training runs
behind you, "which one of these was actually the best, and why?" becomes
unanswerable without digging through someone's personal notes or, more
realistically, nothing at all.

**Experiment tracking** solves this by logging, automatically, for every
single training run: the hyperparameters that went in (learning rate,
batch size, epochs, architecture choices), the metrics that came out
(training loss curve, validation accuracy, F1, whatever the problem
calls for), the code version (commit hash) that produced the run, and the
resulting model artifact itself. MLflow is the standard, open-source,
widely adopted tool in this category — it runs a tracking server that every
training script logs to with a few lines of code, and a UI where you can
sort and compare runs side by side.

```python
import mlflow

with mlflow.start_run():
    mlflow.log_param("learning_rate", 0.001)
    mlflow.log_param("batch_size", 64)
    mlflow.log_metric("val_accuracy", 0.942)
    mlflow.log_artifact("model.pt")
```

That's the whole pattern: wrap a training run in a tracked context, log
every parameter and metric as it happens, and the run becomes permanently
queryable — "show me every run where learning rate was under 0.001 and
validation accuracy beat 94%" is now a real query instead of a memory.

## From tracked run to registered model

Logging every run solves reproducibility, but it doesn't by itself answer
"which model is live in production right now, and which ones are
candidates waiting to be promoted?" That's the job of a **model registry**
— a separate, versioned catalog that sits on top of experiment tracking.
Where a tracking server logs every attempt, a registry holds only the
models worth keeping, each one versioned (`fraud-model` version 1, 2, 3...)
with a **stage**: typically `None` → `Staging` → `Production` → `Archived`.

This matters because "the model file is on a server somewhere" is not the
same claim as "this specific version is the one serving real traffic."
A registry makes that claim explicit and auditable: promoting a model from
Staging to Production is a deliberate, logged action — not a file copy
nobody remembers doing — and rolling back a bad promotion means pointing
the Production alias back at the previous version, not hunting for a backup.

```python
from mlflow import MlflowClient

client = MlflowClient()
client.transition_model_version_stage(
    name="fraud-model", version=3, stage="Production"
)
```

## Why this pair of practices is non-negotiable in MLOps

Experiment tracking and model registries are the foundation everything
else in this chapter builds on. CI/CD for models (lesson 19) needs the
registry to know which version is currently in production so it has
something to compare a new candidate against. Monitoring (lesson 20) needs
to know which registered version is actually deployed so an alert points at
the right model. Skip this pair of practices, and every later stage of the
pipeline has nothing solid to anchor to.

## Key terms

| Term | Meaning |
|---|---|
| Experiment tracking | Automatically logging a training run's hyperparameters, metrics, code version, and resulting artifact so results are reproducible and comparable (MLflow is the standard open-source tool) |
| Model registry | A versioned catalog of trained models with promotion status (e.g. Staging, Production, Archived), separate from the raw log of every training attempt |
| Stage/promotion | The deliberate, auditable act of moving a specific model version from one status to another, such as Staging to Production |
| Artifact | The saved output of a training run — model weights plus any supporting files — logged alongside the metrics that produced it |

## Check yourself

You're ready for Lesson 19 when you can explain the difference between
experiment tracking and a model registry, and describe what information a
tracked run needs to log for a result to be genuinely reproducible later.
