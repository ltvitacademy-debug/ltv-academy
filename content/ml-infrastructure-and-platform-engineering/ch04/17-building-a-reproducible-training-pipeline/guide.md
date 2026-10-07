# Building a Reproducible Training Pipeline

"Reproducible" gets used loosely in ML. The real test is simple: could a
stranger, handed your pipeline's exact inputs, run it and get the same model
you got? If the honest answer is "probably not," something in the pipeline is
silently non-deterministic. This lesson walks through the five things that
actually have to be pinned down, and where each one gets captured inside a
pipeline step.

## What you'll learn

- The five concrete things "reproducible" requires: dependencies, seeds, data,
  code, and config
- Why "the latest table" and "the latest image tag" are both reproducibility
  bugs, not conveniences
- How to combine all five inside a single Airflow TaskFlow task or KFP
  component
- Why a quality gate belongs inside the pipeline, not as a manual step after it

## The five things, concretely

Reproducibility isn't one setting — it's five separate commitments, and
skipping any one of them breaks the whole chain:

1. **Pinned dependencies.** A `requirements.txt` with exact versions (or better,
   a lockfile), or — stronger still — a container image referenced by its
   immutable digest, not a mutable tag like `:latest` or even `:v3`, since tags
   can be overwritten later while a digest cannot.
2. **Fixed random seeds.** Every library that touches randomness gets seeded
   explicitly: `numpy.random.seed(42)`, `torch.manual_seed(42)`, and your
   framework's own seeding call if it has one.
3. **Versioned, immutable input data.** A dataset *snapshot* or content hash —
   never "query the current state of the table," because the current state
   changes under you.
4. **Captured code version.** The exact git commit SHA the training code ran
   at, logged alongside the run, not just "whatever was on main that week."
5. **Captured config.** All hyperparameters as one serialized object, logged in
   full — not scattered across environment variables someone might forget to
   record.

## Putting it together inside a pipeline step

Here's what that actually looks like inside a single Airflow TaskFlow task.
Note that every one of the five things above shows up explicitly:

```python
from airflow.decorators import task

@task
def train_with_reproducibility(dataset_snapshot_uri: str, config: dict):
    import numpy as np
    import torch
    import mlflow
    import subprocess

    # 2. Fixed seeds
    np.random.seed(config["seed"])
    torch.manual_seed(config["seed"])

    # 4. Captured code version
    git_sha = subprocess.check_output(
        ["git", "rev-parse", "HEAD"]).decode().strip()

    with mlflow.start_run():
        # 5. Captured config, as one object
        mlflow.log_params(config)
        mlflow.log_param("git_sha", git_sha)
        mlflow.log_param("dataset_snapshot", dataset_snapshot_uri)

        # 3. Versioned, immutable data — a pinned snapshot, not "latest"
        model = fit_model(dataset_snapshot_uri, config)
        metrics = evaluate(model)
        mlflow.log_metrics(metrics)

        # Quality gate lives inside the pipeline, not after it
        if metrics["auc"] >= config["min_auc"]:
            mlflow.register_model(
                mlflow.get_artifact_uri("model"), "fraud-model")
        else:
            raise ValueError(
                f"AUC {metrics['auc']} below gate {config['min_auc']}")

    return metrics
```

The same five commitments apply inside a KFP component — the `@dsl.component`'s
`packages_to_install` and `base_image` cover dependency pinning (point 1, since
the whole container is the pinned environment), and the rest of the logic
inside the function body is identical: seed, log config, log the code version,
train against a pinned data URI, gate on quality before registering.

```python
@dsl.component(
    base_image="python:3.11-slim@sha256:9c7f...",   # digest, not a tag
    packages_to_install=["torch==2.4.0", "mlflow==2.16.0"],
)
def train(dataset_snapshot_uri: str, config: dict, model: Output[Model]):
    import numpy as np, torch, mlflow
    np.random.seed(config["seed"])
    torch.manual_seed(config["seed"])
    with mlflow.start_run():
        mlflow.log_params(config)
        clf = fit_model(dataset_snapshot_uri, config)
        save_model(clf, model.path)
```

## Why the quality gate has to live inside the pipeline

A model that scores below your acceptance threshold should never reach the
registry — and that check has to be code inside the pipeline step, evaluated
automatically on every run, not a human glancing at a dashboard before
clicking "promote." The `raise ValueError(...)` in the task above is doing real
work: it fails the pipeline run loudly, which (as later lessons on failure
handling and alerting cover) is far easier to act on than a model that quietly
got registered anyway because nobody checked that day.

## Key terms

| Term | Meaning |
|---|---|
| Immutable digest | A container image reference by content hash (`@sha256:...`), which cannot be silently overwritten the way a tag can |
| Dataset snapshot | A fixed, versioned copy of input data, as opposed to a live query against a changing table |
| Quality gate | An automated check inside the pipeline that blocks model registration unless a metric threshold is met |
| `mlflow.log_params` | Logs a full config object (hyperparameters) against a run, so it's recoverable later |

## Recap

Reproducibility means pinning five separate things — dependencies, seeds, data,
code version, and config — and capturing all of them inside the pipeline step
itself, with a quality gate deciding automatically whether the resulting model
gets registered. Up next, Lesson 18: Pipeline Scheduling & Triggers, where we
cover how these pipelines actually get kicked off — on a schedule, or in
response to new data arriving.
