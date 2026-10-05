# Lesson 22 — Governing Machine Learning Assets

**Chapter 5 · Lakehouse Governance · Lesson 22 of 25**

## What you'll learn

- Why MLflow's Model Registry in Unity Catalog uses the same three-level namespace as tables
- How to register a model into Unity Catalog, in the UI and in code
- How model version **aliases** replace the old stage-based lifecycle, and the real code to set and use one
- What privileges govern who can register, read, and serve a model — and how lineage connects a model back to its training data

## Models get the same namespace as tables

Every object this course has governed so far — catalogs, schemas, tables, views, volumes — lives under the three-level namespace `catalog.schema.object`. Registered ML models in Unity Catalog use that exact same namespace: `prod.ml_team.iris_classifier`. That's not a coincidence. It means a model inherits the same catalog and schema-level governance as any other asset in that schema — the same owners, the same `USE CATALOG`/`USE SCHEMA` requirements, the same audit trail — instead of living in a separate, ungoverned "model registry" silo the way MLflow's legacy workspace registry did.

To register models into Unity Catalog instead of the legacy workspace registry, point MLflow at it:

```python
import mlflow
mlflow.set_registry_uri("databricks-uc")

mlflow.register_model(
    model_uri=logged_model.model_uri,
    name="prod.ml_team.iris_classifier",
)
```

## Registering a model in the UI

The same action is available from Catalog Explorer: open a logged run, click **Register model**, choose **Unity Catalog** (rather than the legacy Workspace Model Registry), and search for or create the destination model by its catalog-and-schema path.

![The "Register model" dialog in Databricks, with "Unity Catalog" selected and the search box showing a match for "iris_model" at path "prod.ml_team.iris_model".](/courses/databricks-unity-catalog-governance/ch05/22-governing-machine-learning-assets/uc-register-model-dialog.png)
*Registering targets Unity Catalog explicitly — the destination is a three-level name, exactly like creating a table.*

Once registered, the model gets its own page in Catalog Explorer, with the same Overview/Details/Permissions tabs a table or catalog has — version history, owner, and a Permissions tab for grants, not a separate tool to learn.

![Catalog Explorer's "iris_classifier" model page: breadcrumb Catalog Explorer > docs > default, Overview tab active, a Versions table listing Version 3, 2, and 1 each with a green checkmark, and an "About this model" panel showing Owner on the right.](/courses/databricks-unity-catalog-governance/ch05/22-governing-machine-learning-assets/registered-model.png)
*A registered model's Catalog Explorer page — versions, owner, and permissions sit right alongside every table in the same schema.*

## Aliases replace stages

MLflow's legacy registry used fixed **stages** — Staging, Production, Archived — as a blunt way to mark a model version's status. Unity Catalog replaces stages with **aliases**: a mutable, named pointer you define yourself (commonly `Champion` for the current production version and `Challenger` for a candidate being evaluated against it).

```python
from mlflow import MlflowClient
client = MlflowClient()

client.set_registered_model_alias(
    "prod.ml_team.iris_classifier", "Champion", version=3
)
```

Downstream code then loads "whatever version is currently Champion" without hardcoding a version number:

```python
model = mlflow.pyfunc.load_model(
    "models:/prod.ml_team.iris_classifier@Champion"
)
```

Promoting a new version to production becomes one `set_registered_model_alias` call that moves the alias — no serving code changes, because it always asks for `@Champion`.

## Privileges on a registered model

A registered model is governed as a subtype of the `FUNCTION` securable object, using the same `GRANT` syntax Chapter 2 covered for tables:

| Privilege | What it allows |
|---|---|
| `USE CATALOG` / `USE SCHEMA` | Required just to see the catalog/schema the model lives in |
| `EXECUTE` | View the model and load it for inference |
| `CREATE MODEL` | Register a new model in a schema |
| `CREATE MODEL VERSION` | Add a new version to an existing registered model |

## Lineage ties a model back to its data

Unity Catalog automatically tracks lineage from a model version to the tables it was trained on, when training code logs its input dataset:

```python
dataset = mlflow.data.load_delta(table_name="prod.ml_team.iris", version="0")
mlflow.log_input(dataset, context="training")
```

That connection then shows up on the model version's own **Lineage** tab in Catalog Explorer — the same lineage graph Lesson 17 covered for tables, now extended to a model.

![A model version's Lineage tab in Catalog Explorer, filtered to "Tables", showing one upstream table "docs.default.iris" with its last activity timestamp and lineage direction "Upstream".](/courses/databricks-unity-catalog-governance/ch05/22-governing-machine-learning-assets/model-page-lineage-tab.png)
*The same lineage mechanism from Chapter 4, now showing which table trained this specific model version.*

## Key terms

| Term | Meaning |
|---|---|
| Model Registry in Unity Catalog | MLflow's model registry backed by Unity Catalog's three-level namespace and permission model |
| Alias | A mutable, named pointer to a specific model version (e.g. `Champion`), replacing the legacy stage concept |
| `EXECUTE` privilege | The grant required to load a registered model for inference |
| Model lineage | The automatic link Unity Catalog draws from a model version to the table(s) it was trained on |

## Lab

Write the two lines of Python that would set `Champion` on version 5 of a model named `analytics.forecasting.demand_model`, and the one line that would load it for inference using that alias rather than a hardcoded version number.

## Check yourself

Can you explain, without looking back, why a registered model uses the same three-level namespace as a table, what problem aliases solve that stages didn't, and which privilege is required just to run inference against a model someone else registered?
