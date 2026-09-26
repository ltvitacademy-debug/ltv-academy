# Data Science in Microsoft Fabric

You have now used two Microsoft platforms for machine learning: Azure Machine Learning and Azure Databricks. Microsoft Fabric is the third, and it comes from a different direction. Fabric is Microsoft's all-in-one analytics platform, where the data already lives in a lakehouse in OneLake, Power BI reports read from it, and data engineers build the pipelines that feed it. The Fabric data science experience puts notebooks, experiments and models in that same workspace, so a data scientist works on governed data without copying it anywhere. The good news for you: the modeling API is the MLflow you already know.

> No Fabric capacity is available in this course, so the Fabric-specific code below (lakehouse paths, `spark`, `MLFlowTransformer`) is illustrative and was not run here. It is adapted from Microsoft Learn as of this writing; Fabric changes often, so check the current docs. Code marked "run locally" was executed with local MLflow and synthetic, illustrative churn data.

## What you'll learn

- Where data science fits in Fabric: lakehouse, notebook, experiment, ML model
- How to read lakehouse data into a notebook with pandas or Spark
- How experiments and runs work, and how to save a run as an ML model
- How PREDICT scores a registered model in batch, and why a signature is required

## The workflow in one picture

Microsoft Learn describes Fabric data science with the same loop you have practiced all course: problem formulation, data discovery and preprocessing, experimentation and modeling, enrich and operationalize, then insight. What changes is where each step happens. Data comes from a **lakehouse** attached to your notebook. Training runs in the notebook using open-source libraries; the Fabric Spark runtime includes scikit-learn, XGBoost, PyTorch and TensorFlow, plus Spark MLlib and SynapseML for distributed work. Experiments and models are Fabric items in the workspace. Predictions get written back to the lakehouse, where Power BI can read them.

## Reading lakehouse data

Per the docs, the default lakehouse of a notebook is mounted at `/lakehouse/default/`, which lets pandas read files directly; Spark uses relative paths or full ABFS paths. Illustrative, not run here:

```python
import pandas as pd

# pandas: files in the default lakehouse's Files area
df = pd.read_csv("/lakehouse/default/Files/customers.csv")

# Spark: a Delta table (Tables area)
sdf = spark.read.format("delta").load("Tables/customers")
```

In a Fabric notebook `spark` already exists; you do not create it. The mount point works only in notebooks; Spark job definitions use ABFS paths. For your own data, the notebook's **Load data** menu generates a correct cell for you.

## Experiments and runs

A Fabric **experiment** is the unit of organization for related runs, and a **run** is one execution of model code. Both are created with the MLflow API you already know: `mlflow.set_experiment("name")` creates the experiment if it does not exist. Fabric also offers built-in tracking, and the docs show `mlflow.autolog()` for automatic logging. Here is the local version of the tracking and registration steps, using the same calls (run locally):

```python
mlflow.set_experiment("churn-fabric-demo")
for C in [0.1, 1.0]:
    with mlflow.start_run(run_name=f"logreg-C{C}"):
        ...  # fit the pipeline
        mlflow.log_param("C", C)
        mlflow.log_metric("auc", roc_auc_score(yte, p))
        mlflow.set_tag("dataset", "synthetic churn")
        mlflow.sklearn.log_model(
            pipe, "churn-model",
            signature=infer_signature(Xte, pipe.predict(Xte)),
            registered_model_name="churn-model")
```

```
tags.mlflow.runName params.C  metrics.auc
        logreg-C0.1      0.1       0.7935
        logreg-C1.0      1.0       0.7934
```

The screenshot in the video shows a real run page from the Microsoft Learn Fabric docs: run properties, metrics, parameters, and the logged model folder (`MLmodel`, `conda.yaml`, `model.pkl`). Its **Save as ML model** button turns a good run into a model item. Runs are also comparable in a list view with charts, or in code with `mlflow.search_runs()`.

## The ML model item and PREDICT

Registering with `registered_model_name` (or `mlflow.register_model`) creates an **ML model** item, with each registration adding a **version**. My local registry showed two versions after two runs. Fabric's batch scoring function, **PREDICT**, has requirements worth memorizing: the model must be in MLflow format **with its signature populated**, and it supports specific flavors including sklearn, XGBoost, LightGBM, Spark and others; it does not support multi-tensor inputs or outputs. A signature lists the input columns and types, so I checked mine locally:

```
signature inputs: ['tenure_months', 'monthly_spend', 'support_tickets', 'contract']
```

Notice that my logged output is class labels, because I built the signature from `predict()`; it must describe what the model actually returns. In Fabric, the docs show scoring a Spark DataFrame with `MLFlowTransformer`. Illustrative, adapted from the docs:

```python
from synapse.ml.predict import MLFlowTransformer

model = MLFlowTransformer(
    inputCols=df.columns,
    outputCol="predictions",
    modelName="churn-model",
    modelVersion=2)
scored = model.transform(df)
scored.write.format("delta").mode("overwrite").save(OUTPUT_TABLE)
```

You can also call PREDICT through Spark SQL or a PySpark UDF, or skip the code with **Apply this version** on the model's page, which opens a wizard that maps table columns to the signature and generates a notebook. The docs say notebook scheduling or pipeline activities can run batch scoring regularly, and Power BI's Direct Lake mode can read the prediction table without a refresh.

I cannot run Spark here, so the local stand-in loads the same registered model with `mlflow.pyfunc.load_model("models:/churn-model/2")` and scores four rows; it returned labels 1, 0, 0, 0. That is the idea of PREDICT: a registered MLflow model applied to a table of rows.

## Recap

- Fabric data science works on OneLake data with notebooks; the modeling API is MLflow, so your skills transfer.
- Experiments hold runs, and a good run becomes an ML model item with versions.
- PREDICT scores registered MLflow models in batch and needs a populated signature.
- Fabric also documents real-time scoring; check the current docs for its status and setup.
- Next you move to Azure ML and learn the model registry properly, including how versions and deployments connect.
