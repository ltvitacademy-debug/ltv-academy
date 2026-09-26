# Experiment Tracking With MLflow

By now you can run a training job and read its printed output. But `print` is a poor memory. Two weeks from now you will not remember whether the run with a learning rate of 0.03 beat the one with 0.1, and neither will a teammate. **Experiment tracking** is the habit of recording, for every run, the settings you used, the scores you got, and the files you produced, in one place you can search. In Azure Machine Learning the tool for that is **MLflow**, an open-source tracking library that the workspace understands natively.

Azure-specific code below is illustrative (not run here) and follows the Microsoft Learn MLflow articles as of this writing. The MLflow calls themselves are real: we ran them against a local MLflow store and show the actual output.

## What you'll learn

- The four things MLflow records: parameters, metrics, artifacts and models
- How to log by hand, and what `mlflow.autolog()` does and does not tell you
- Why a job in Azure ML needs no tracking setup, and when it does
- How to view and compare runs in the studio and from code

## What MLflow records

MLflow groups work into **experiments**, and each attempt is a **run** (Azure ML calls a run a job). A run holds four kinds of things:

- **Parameters**: the settings you chose, such as `learning_rate`.
- **Metrics**: numeric results, such as `accuracy` or `auc`, optionally logged over steps.
- **Artifacts**: any file, such as a chart or a CSV.
- **Models**: a packaged model folder that can later be registered and deployed.

Microsoft's docs note that the Azure ML SDK v2 has no logging of its own. The recommended way to track experiments is MLflow.

## Log by hand

Here is the lesson 4 script with tracking added. Notice there is no `start_run` call. In an Azure ML job a run is started for you, so you can log directly:

```python
import mlflow
import mlflow.sklearn

mlflow.log_param("n_estimators", args.n_estimators)
mlflow.log_param("learning_rate", args.learning_rate)
# ... train the model, compute acc and auc ...
mlflow.log_metric("accuracy", acc)
mlflow.log_metric("auc", auc)
mlflow.sklearn.log_model(model, "model")
```

To try it without Azure, we ran this script three times against a local store, with learning rates 0.3, 0.1 and 0.03, on the illustrative 1,000-row churn table, then queried the results with `mlflow.search_runs`:

```python
runs = mlflow.search_runs(experiment_names=["churn"])
cols = ["params.learning_rate", "metrics.accuracy", "metrics.auc"]
top = runs[cols].sort_values("metrics.auc", ascending=False)
print(top.rename(columns=lambda c: c.split(".")[-1]).round(3).to_string(index=False))
```

Real output:

```
learning_rate  accuracy   auc
         0.03     0.735 0.667
          0.1     0.750 0.655
          0.3     0.675 0.601
```

The columns come back named `params.<name>` and `metrics.<name>`, which is why we shortened them. Microsoft's query guide also notes that the `order_by` argument does not currently support `metrics.*` expressions in Azure ML, so sort the resulting DataFrame with pandas as above.

## Autolog, with a warning

`mlflow.autolog()` logs parameters, metrics and the model automatically for supported libraries. On the same churn data with a scikit-learn gradient boosting model, it recorded 20 parameters (every setting, including defaults you never touched) and metrics such as:

```
training_accuracy_score: 0.854   training_roc_auc: 0.899
```

Read those names carefully: they are scores on the **training** data, not held-out test data. Compare 0.854 with the test accuracy of about 0.75 from our manual run. Autolog is a convenient start, but you still log your test-set metrics yourself, and you decide which number to trust.

## Where the runs go

Azure ML workspaces are MLflow-compatible. According to Microsoft, the tracking URI is configured automatically in Azure ML notebooks, on compute instances and inside jobs on compute clusters, so the script above just works. If you run code outside Azure ML, such as on your laptop, install `mlflow` and `azureml-mlflow` and point MLflow at the workspace:

```python
# Illustrative - not run here.
uri = ml_client.workspaces.get(ml_client.workspace_name).mlflow_tracking_uri
mlflow.set_tracking_uri(uri)
mlflow.set_experiment("churn")
```

Microsoft also warns that the default interactive browser sign-in is unsuitable for unattended jobs, which need a service principal or similar.

## See and compare runs in the studio

Open **Jobs**, choose the run, and select the **Metrics** tab. Logged metrics appear as charts and tiles that you can customize, and you can save a view and share it with teammates. The screenshot in this lesson is from Microsoft's documentation. Filters on the jobs list and the **Add filter** button help you narrow down runs by tag, experiment or compute.

From code, the same `mlflow.search_runs` call works against the workspace, and a filter such as `metrics.auc>0.8` narrows the results. Child runs, which tuning jobs create in the next lesson, can be found by the tag `mlflow.parentRunId`.

## Recap

- Track every run: parameters, metrics, artifacts, model.
- In an Azure ML job, log with MLflow directly; no setup needed.
- Autolog metrics may be training-set scores; log your test metrics deliberately.
- Compare runs in the studio's Metrics tab or with `mlflow.search_runs`.

Next up: Automated ML, where Azure tries many models for you and tracks all of them.
