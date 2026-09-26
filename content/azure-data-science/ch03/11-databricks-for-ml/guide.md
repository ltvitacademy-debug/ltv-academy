# Databricks for ML

Azure Machine Learning is not the only way to do data science on Azure. **Azure Databricks**, a first-party Azure service built on Apache Spark, is where many companies already keep their data. It bundles notebooks, managed compute, MLflow, governed data and model serving into one workspace. This lesson is about the data science workflow there. You already know Spark and Delta from the Databricks courses, so we skip those basics and focus on training models.

> Databricks code shown as "Databricks" is illustrative and was not run here (no workspace). It follows the Microsoft Learn Azure Databricks "Get started: Build your first machine learning model" page and related docs as of this writing; version requirements change often, so check the current docs. The local example was run for real.

## What you'll learn

- What Databricks Runtime for Machine Learning is and how to select it
- Why access mode matters for Unity Catalog data
- The train-and-track workflow with MLflow autologging
- What Databricks AutoML does and does not do
- Where models go afterwards: Unity Catalog and Serving

## Databricks Runtime for ML

According to the docs, Databricks Runtime ML "automates the creation of a compute resource with pre-built machine learning and deep learning infrastructure", including common ML and DL libraries such as scikit-learn, XGBoost and MLflow. To use it on classic compute, select the **Machine learning** checkbox in the create compute UI. That automatically sets the access mode to **Dedicated**, assigned to your account, and Dedicated access is what lets the cluster read Unity Catalog data on an ML runtime. For deep learning, pick a GPU-enabled instance in the **Worker type** dropdown. You can add extra libraries per cluster or per notebook session.

## The workflow, run locally

The quickstart trains a wine-quality classifier with scikit-learn, tracks it with MLflow, tunes it, saves it to Unity Catalog and deploys it. Part 1 (train with tracking) works anywhere MLflow does. Here it is on our illustrative synthetic churn data, run with a local MLflow tracking folder:

```python
import mlflow
import numpy as np
import sklearn.ensemble
import sklearn.metrics
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

X, y = make_classification(n_samples=1500, n_features=12,
                           n_informative=6, random_state=7)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=1)

mlflow.set_tracking_uri("file:./mlruns")
mlflow.set_experiment("get-started-local")
mlflow.sklearn.autolog()

with mlflow.start_run(run_name="gradient_boost") as run:
    model = sklearn.ensemble.GradientBoostingClassifier(random_state=0)
    model.fit(X_train, y_train)
    probs = model.predict_proba(X_test)
    roc_auc = sklearn.metrics.roc_auc_score(y_test, probs[:, 1])
    mlflow.log_metric("test_auc", roc_auc)
    print("Test AUC of:", round(roc_auc, 3))

loaded = mlflow.pyfunc.load_model(f"runs:/{run.info.run_id}/model")
assert np.array_equal(loaded.predict(X_test), model.predict(X_test))
print("loaded model matches original")

best = mlflow.search_runs(order_by=["metrics.test_auc DESC"],
                          max_results=1).iloc[0]
print("best run:", best.run_id[:8], round(best["metrics.test_auc"], 3))
```

Output from the run:

```
Test AUC of: 0.92
loaded model matches original
best run: 51174f13 0.92
```

What happened: `autolog()` recorded the model, its parameters and training metrics automatically; `log_metric` added the test AUC that autolog does not record; `pyfunc.load_model` reloaded the model through MLflow's common prediction interface; and `search_runs` found the best run by metric. On Databricks the notebook's experiment is set up for you and the tracking server is managed, but this code is the same.

## What is different on Databricks

- **Data comes from Unity Catalog.** The quickstart reads tables with `spark.read.table(...)`, then `.toPandas()` for scikit-learn, a stand-in for feature engineering at Spark scale that we cover in lesson 13.
- **Registry in Unity Catalog.** The quickstart calls `mlflow.set_registry_uri("databricks-uc")` so registered models are named `catalog.schema.model`.
- **Scaled tuning.** The quickstart uses Optuna with an MLflow-aware Spark study to run trials in parallel, each logged as a nested run; lesson 12 returns to this.
- **Experiment sidebar.** Runs appear beside your notebook with parameters and metrics; an icon opens the full experiment page.

## AutoML on Databricks

Per the docs, you provide a dataset and problem type (classification, regression or forecasting) and AutoML cleans and prepares the data, trains and tunes models across several algorithms (based on scikit-learn, XGBoost, LightGBM, Prophet and ARIMA), and presents results. It also generates source notebooks so you can review, reproduce and edit the code, which is why it is called a glass-box approach. Notes from the docs: no extra libraries should be installed on the cluster, and in Databricks Runtime 18.0 ML or above AutoML is no longer a built-in library, so check the current documentation before planning around it.

## Recap

Pick the ML runtime, work in notebooks, let autologging and MLflow record runs, use AutoML as a readable baseline, then register the model in Unity Catalog. Next lesson: MLflow on Databricks in more depth.
