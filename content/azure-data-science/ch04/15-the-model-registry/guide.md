# The Model Registry

Training gives you a pile of experiment runs. Deployment needs something more disciplined: a named, versioned model that a teammate, a pipeline or an endpoint can point to without asking "which run was the good one?" That is the job of the **model registry**. This lesson opens the Deployment & Monitoring chapter, and everything after it (real-time endpoints, batch endpoints, monitoring) starts from a registered model.

> No Azure account is available in this course, so Azure ML calls are illustrative and were not run against a workspace. They follow the current Microsoft Learn article "Register and work with models" as of this writing, and I confirmed the class and method names by importing `azure-ai-ml` 1.35.0 locally and constructing a `Model` object (no cloud call). Code marked "run locally" used a local MLflow registry and synthetic, illustrative churn data.

## What you'll learn

- What a registered model is and how names and versions work
- The places a model can be registered from, and the two ways to register from a job
- How to manage the lifecycle: list, get, update tags, archive
- How lineage, tags and registries support promotion across environments

## What a registered model is

Per Microsoft Learn, a registered model is a **logical container for one or more files** that make up your model. You identify it by **name and version**, and registering again under an existing name makes the registry increment the version number. You can attach metadata tags at registration and use them to search. The registry also captures metadata such as which experiment trained the model, and the docs say you cannot delete a registered model that is used in an active deployment.

A model asset has a **type**: `custom_model` (any file or folder), `mlflow_model` (a folder with the `MLmodel` file, the model, conda dependencies and `requirements.txt`), or `triton_model`. MLflow format matters because, per the docs, you do not need to supply a scoring script or environment when you deploy an MLflow model; Azure ML generates them. The next lesson builds on that.

## Register locally, see versions and lineage (run locally)

The same ideas work in a local MLflow registry, which is how I could run them here. I trained a logistic regression and a gradient boosting pipeline, logged each with a signature, and registered both under one name:

```python
with mlflow.start_run(run_name=label) as run:
    pipe = Pipeline([("prep", pre), ("clf", clf)]).fit(Xtr, ytr)
    mlflow.log_metric("auc", auc)
    mlflow.sklearn.log_model(pipe, "model",
        signature=infer_signature(Xte, pipe.predict(Xte)))
    mv = mlflow.register_model(
        f"runs:/{run.info.run_id}/model", "churn-model")
```

The registry printed `registered churn-model version 1`, then `version 2`. Each version points back to the run that produced it, so you can read the lineage:

```
v1 logreg auc 0.7934
v2 gbm auc 0.787
```

The folder inside a version contained `MLmodel`, `conda.yaml`, `model.pkl`, `python_env.yaml` and `requirements.txt`. Loading `models:/churn-model/1` and predicting on three rows returned `[1, 0, 0]`. Notice the pattern: you deploy a **name and a version**, never a loose file.

## Register in Azure ML (illustrative)

The documented path formats for `path` include a local file, a datastore (`azureml://datastores/<name>/paths/<path>`), an MLflow run (`runs:/<run-id>/<path>`), a job output (`azureml://jobs/<job>/outputs/<output>/paths/<path>`), and an existing model asset (`azureml:<name>:<version>`). The docs say the `runs:` form is natural for MLflow users and also records lineage between the model and its run; the `azureml://jobs` form gives lineage to a job when you did not register inside the training script.

```python
from azure.ai.ml.entities import Model
from azure.ai.ml.constants import AssetTypes

model = Model(
    path=f"runs:/{run_id}/model",
    name="churn-model",
    type=AssetTypes.MLFLOW_MODEL,
    description="Logistic regression baseline",
    tags={"stage": "Staging", "auc": "0.7934"})
ml_client.models.create_or_update(model)
```

The `Model` constructor part ran locally; `create_or_update` needs a workspace. You can also register in the studio: **Models**, then **Register**, then from local files, a job output, or a datastore, choosing MLflow, Triton or unspecified type. The screenshot in the video is the real Learn image of that flow.

## Manage the lifecycle

```python
m = ml_client.models.get(name="churn-model", version="1")
m.tags = {"stage": "Prod"}
ml_client.models.create_or_update(m)      # update tags
ml_client.models.archive(name="churn-model", version="1")
```

The docs are specific: for a model, only `description` and `tags` can be updated; everything else is immutable, so a change of files means a new version. **Archiving** hides a model from default list queries, but you can still reference and use it. Locally I set tags `stage=Prod` on version 1 and `stage=Staging` on version 2 the same way, and read them back.

Azure ML's registry is not Unity Catalog, so do not expect aliases like `@Champion` from the Databricks lesson. Tags such as `stage` are the documented convention. The `Model` class in the SDK also accepts a `stage` argument (I saw it in `azure-ai-ml` 1.35.0), but the how-to article does not cover it, so check the current docs before relying on it.

## Registries across workspaces

A workspace registry is enough for one team. Companies often keep separate development, test and production workspaces, sometimes in different subscriptions or regions. Azure ML **registries** decouple assets (models, environments, components, data assets) from workspaces so all workspaces in an organization can use them: develop a model in dev, publish it to a registry, and deploy from there to endpoints in other workspaces. The SDK exposes `ml_client.models.share(...)` for promoting a model; check the current docs for its exact arguments before using it.

## Recap

- A registered model is a named, versioned container; each registration under the same name increments the version.
- Prefer MLflow format and register from a run or job so lineage is kept.
- Only description and tags are mutable; archive hides but does not break references.
- Endpoints deploy a name and version, and registries carry models across workspaces.
- Next: put a registered version behind a real-time endpoint.
