# Model Registries

A tracked run with good metrics is still just an experiment. Before a model can be deployed with any confidence, something has to answer three questions for whoever is about to put it into production: which version is this, is it the one currently live, and where did it come from. That's the job of a model registry — the layer that sits on top of experiment tracking and turns "a run with good metrics" into a named, versioned, deployable model.

## What you'll learn

- What a model registry adds on top of experiment tracking
- How `mlflow.register_model()` creates registered models and model versions
- The older stage-based lifecycle (Staging/Production/Archived) and why MLflow has moved away from it
- The current recommended approach: aliases and tags
- How Weights & Biases' Model Registry links an artifact to a registered model

## From tracked run to registered model

Every run you saw in Lesson 10 is already versioned in the sense that it has a unique run ID — but run IDs aren't how a deployment system wants to ask for "the model." A registry adds a second layer of naming on top: a **registered model** is a named entity (like `fraud-detector`), and each time you register a new artifact under that name, MLflow creates a new, auto-incrementing **model version** (1, 2, 3, ...) pointing back to the run that produced it.

```python
import mlflow

with mlflow.start_run() as run:
    mlflow.sklearn.log_model(clf, artifact_path="model")
    model_uri = f"runs:/{run.info.run_id}/model"
    mlflow.register_model(model_uri, "fraud-detector")
```

`register_model` takes the artifact URI from a specific run and files it under the registered model name, creating the next integer version automatically. From this point on, "fraud-detector version 3" is a stable, citable identifier — it doesn't change even if someone deletes the original experiment.

![MLflow's Registered Models overview page, listing registered model names with their latest versions and aliases](/courses/ml-infrastructure-and-platform-engineering/ch03/11-model-registries/mlflow-registered-model-overview.png)
*The registry's overview page is the catalog every deployment job should be reading from — not a folder of pickled files on someone's laptop.*
Source: [MLflow Documentation — Model Registry Workflows](https://mlflow.org/docs/latest/ml/model-registry/workflow/)

## The lifecycle problem: stages vs. aliases

Early MLflow gave every model version a **stage**: `None`, `Staging`, `Production`, or `Archived`, moved with `MlflowClient().transition_model_version_stage()`.

```python
from mlflow import MlflowClient

client = MlflowClient()
client.transition_model_version_stage(
    name="fraud-detector", version=3, stage="Production"
)
```

This worked, but it had a structural flaw: stage is a property of the *version*, which means a model can only be in one stage at a time across the entire registry, and "Production" means something different for every team that uses it. MLflow's own documentation has deprecated this model-version-stage workflow in favor of **aliases** and **tags**, which separate "what is this version's role right now" from the version itself and let you define as many named roles as you actually need:

```python
client.set_registered_model_alias(
    name="fraud-detector", alias="champion", version=3
)
client.set_registered_model_alias(
    name="fraud-detector", alias="challenger", version=4
)
```

![MLflow's model version page showing an alias ("champion") assigned to a specific version](/courses/ml-infrastructure-and-platform-engineering/ch03/11-model-registries/mlflow-model-version-alias.png)
*An alias is just a mutable pointer — reassigning "champion" to a new version is instant and doesn't touch the version history underneath it.*
Source: [MLflow Documentation — Model Registry Workflows](https://mlflow.org/docs/latest/ml/model-registry/workflow/)

A serving job never hardcodes a version number — it resolves the alias at load time:

```python
model = mlflow.pyfunc.load_model("models:/fraud-detector@champion")
```

When a new version earns promotion, you move the alias, not the model. Nothing that depends on `@champion` has to change.

## Tags: metadata, not lifecycle

Tags are free-form key/value pairs attached to a registered model or a specific version — not a lifecycle state, just information:

```python
client.set_model_version_tag(
    name="fraud-detector", version=3, key="validated_by", value="risk-team"
)
client.set_model_version_tag(
    name="fraud-detector", version=3, key="git_commit", value="a1b2c3d"
)
```

Stages were a closed, fixed vocabulary that tried to do two jobs — describe lifecycle and carry metadata. Aliases now do the first job, and tags do the second.

## Weights & Biases: linking an artifact to a registry

W&B separates "a logged artifact" from "a registered model" the same way MLflow separates a run from a registered version. You log the model as an artifact, then explicitly link it into the registry:

```python
import wandb

run = wandb.init(project="fraud-detection")
art = run.log_artifact("model.pkl", name="rf-run42", type="model")
run.link_artifact(art, target_path="model-registry/fraud-detector")
```

The registry entry (`fraud-detector`) accumulates linked versions the same way MLflow's registered model accumulates model versions — the vendor-specific call names differ, but the shape of the problem, and the solution, is identical.

## Key terms

| Term | Meaning |
|---|---|
| Registered model | A named entity in the registry (e.g. "fraud-detector") that accumulates versions |
| Model version | An auto-incrementing integer version under a registered model, pointing back to its source run |
| Stage (deprecated pattern) | The older None/Staging/Production/Archived lifecycle property of a version |
| Alias | A mutable, named pointer (e.g. "champion") to a specific version — the current recommended lifecycle mechanism |
| Tag | A free-form key/value pair for metadata, separate from lifecycle |

## Recap

A model registry adds a second, stable layer of naming on top of a tracked run: registered models accumulate versions, and MLflow now recommends aliases (mutable pointers like "champion") plus tags (free-form metadata) over the older, deprecated stage-based lifecycle. Weights & Biases solves the same problem by linking a logged artifact into a registry entry. Next, in Lesson 12, you'll go deeper on what should travel with every version to make it genuinely reproducible — not just named.
