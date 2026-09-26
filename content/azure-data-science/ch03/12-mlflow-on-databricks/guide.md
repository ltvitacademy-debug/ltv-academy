# MLflow on Databricks

You have used MLflow to log parameters and metrics. On Azure Databricks there is nothing to install or host: a Databricks-hosted MLflow tracking server stores your runs, and a hosted model registry lives inside Unity Catalog. The Python you write is the same MLflow API you would run on a laptop, which is why we can run most of this lesson locally.

> Databricks-specific behavior (hosted server, Unity Catalog names and privileges, Spark-distributed tuning) is illustrative and was not run here (no workspace). It follows the Microsoft Learn Azure Databricks docs as of this writing; MLflow 3 changed some APIs, so check current docs. Code marked "run locally" was executed with a local MLflow store and synthetic, illustrative data.

## What you'll learn

- The vocabulary: experiments, runs, models, the hosted tracking server
- Logging tuning trials as nested runs and finding the best one
- Registering a model with a three-level Unity Catalog name
- Using aliases to promote versions

## Tracking on Databricks

Per the docs, a **run** is a single execution of model code where you log parameters and results, an **experiment** is a collection of related runs, and a **model** is a collection of artifacts representing a trained model. MLflow tracking is controlled by two settings: the **tracking URI** (which server; it defaults to your Databricks workspace) and the **experiment**. If you set no experiment, runs from a notebook go to that notebook's experiment; to log to a shared one, call `mlflow.set_experiment("/Shared/my-experiment")`.

## Tuning trials as nested runs (run locally)

The Databricks quickstart tunes a gradient-boosting classifier with Optuna. Each trial starts a nested MLflow run, and a Spark-aware study (`MlflowSparkStudy`, per the quickstart) distributes trials across workers. The local version below uses a plain Optuna study, so trials run one after another, but the logging is identical:

```python
import mlflow, optuna
from sklearn.datasets import make_classification
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import train_test_split

X, y = make_classification(n_samples=1500, n_features=12,
                           n_informative=6, random_state=7)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2,
                                          random_state=1)
mlflow.set_tracking_uri("file:./mlruns")
mlflow.set_experiment("optuna-local")

def objective(trial):
    params = {
        "n_estimators": trial.suggest_int("n_estimators", 20, 200),
        "learning_rate": trial.suggest_float("learning_rate",
                                             0.05, 1.0, log=True),
        "max_depth": trial.suggest_int("max_depth", 2, 5),
    }
    with mlflow.start_run(nested=True):
        model = GradientBoostingClassifier(random_state=0, **params)
        model.fit(X_tr, y_tr)
        auc = roc_auc_score(y_te, model.predict_proba(X_te)[:, 1])
        mlflow.log_params(params)
        mlflow.log_metric("test_auc", auc)
    return -auc      # Optuna minimizes by default

with mlflow.start_run(run_name="gb_optuna"):
    study = optuna.create_study(
        sampler=optuna.samplers.TPESampler(seed=0))
    study.optimize(objective, n_trials=12)

best = mlflow.search_runs(order_by=["metrics.test_auc DESC"],
                          max_results=1).iloc[0]
print("trials logged:", len(study.trials))
print("best AUC:", round(best["metrics.test_auc"], 3))
```

Output:

```
trials logged: 12
best AUC: 0.971
```

Two lessons here. First, `search_runs` returns a pandas DataFrame, so "find the best run" is just a sort. Second, the Databricks quickstart, like this demo, scores trials on the test set to keep the example short. That leaks test information into model selection; in real work tune against a separate validation set (or cross-validation) and touch the test set once.

## Registering a model in Unity Catalog

Models in Unity Catalog is a hosted version of the MLflow Model Registry with centralized access control, auditing and lineage. Model names are three-level: `<catalog>.<schema>.<model>`. To create a registered model you need `USE CATALOG`, `USE SCHEMA` and `CREATE MODEL` privileges on the enclosing objects. New versions must carry a **signature**; passing an `input_example` lets MLflow infer one. The docs show this MLflow 3 call:

```python
mlflow.sklearn.log_model(
    sk_model=clf,
    name="model",
    input_example=X.iloc[[0]],
    registered_model_name="prod.ml_team.churn_model",
)
```

I ran that call locally against a SQLite-backed local registry (the three-level string is just a name there), twice with different `max_depth`, producing versions 1 and 2. If your Databricks workspace does not default to Unity Catalog, older docs configure the client with `mlflow.set_registry_uri("databricks-uc")`; in MLflow 3 that is the default registry URI.

## Aliases instead of stages

Unity Catalog does not support the older registry stages. Instead you use the three-level name to express the environment (for example `prod`) and **aliases** to mark deployment status. Local run:

```python
from mlflow import MlflowClient
client = MlflowClient()
client.set_registered_model_alias(NAME, "Champion", 1)
client.set_registered_model_alias(NAME, "Champion", 2)   # re-point
mv = client.get_model_version_by_alias(NAME, "Champion")
print("Champion ->", mv.version)
model = mlflow.pyfunc.load_model(f"models:/{NAME}@Champion")
```

Output: `Champion -> 2`. A batch job that loads `models:/<name>@Champion` picks up the new version on its next run, so promotion decouples from the job code.

## Recap

Use the hosted tracking server, log trials as nested runs, query them with `search_runs`, register with a three-level name and a signature, and promote with aliases. Registry ideas return in Chapter 4 for Azure ML.
