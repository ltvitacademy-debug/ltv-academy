# Azure ML SDK v2 Quick Reference

A compiled, copy-paste reference of the `azure-ai-ml` (SDK v2) patterns taught across
this course, pulled from the chapter lessons and organized by task instead of by
lesson order. Code marked **(illustrative)** needs a live Azure subscription and was
not executed in this course; it follows the Microsoft Learn documentation as of this
writing, so check current docs before you rely on exact class or parameter names.
Code marked **(local)** is plain Python/MLflow/scikit-learn that runs on your laptop.

Every snippet below uses the same running example as the rest of the course: a
churn-risk model for the illustrative subscription business "Northwind Streams."

## Connect to a workspace

```python
# (illustrative)
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential

cred = DefaultAzureCredential()
ml_client = MLClient.from_config(cred)   # reads config.json
print(ml_client.workspace_name)
```

## Create compute

```python
# (illustrative)
from azure.ai.ml.entities import ComputeInstance, AmlCompute

ci = ComputeInstance(
    name="alex-dev-ci",
    size="STANDARD_DS3_v2",
    idle_time_before_shutdown_minutes=30,
)
ml_client.begin_create_or_update(ci).result()

cluster = AmlCompute(
    name="cpu-cluster",
    size="STANDARD_DS3_v2",
    min_instances=0,
    max_instances=2,
    idle_time_before_scale_down=120,
)
ml_client.begin_create_or_update(cluster).result()
```

Cost control checklist: `idle_time_before_shutdown_minutes` on a compute instance,
`min_instances=0` on a cluster, and delete online endpoints when you're done — none
of these are optional in a real budget.

## Register a data asset

```python
# (illustrative)
from azure.ai.ml.entities import Data
from azure.ai.ml.constants import AssetTypes

churn = Data(
    name="churn-data",
    version="1",
    type=AssetTypes.URI_FILE,
    description="Customer churn snapshot",
    path="./churn.csv",
)
ml_client.data.create_or_update(churn)
```

Reference it in a job input as `azureml:churn-data:1`. Versions are immutable — a
fixed file gets a new version, never an overwrite.

## Log a training run with MLflow

```python
# (local — runs the same way inside an Azure ML job, no start_run needed there)
import mlflow, mlflow.sklearn
from mlflow.models import infer_signature

with mlflow.start_run(run_name="logreg-C0.1"):
    pipe.fit(Xtr, ytr)
    p = pipe.predict_proba(Xte)[:, 1]
    mlflow.log_params({"C": 0.1})
    mlflow.log_metric("auc", roc_auc_score(yte, p))
    mlflow.log_metric("recall_at_0.5", recall_score(yte, p > 0.5))
    mlflow.sklearn.log_model(pipe, "model",
        signature=infer_signature(Xte, p),
        input_example=Xte.head(2))
```

Compare runs with `mlflow.search_runs(experiment_names=[...])`, then sort the
returned DataFrame in pandas — Azure ML's `order_by` does not currently support
`metrics.*` expressions.

## Register the winning model

```python
# (illustrative for the Azure path; the constructor itself is real)
from azure.ai.ml.entities import Model
from azure.ai.ml.constants import AssetTypes

model = Model(
    path=f"runs:/{run_id}/model",
    name="churn-model",
    type=AssetTypes.MLFLOW_MODEL,
    tags={"stage": "Staging", "auc": "0.7935"},
)
ml_client.models.create_or_update(model)
```

Only `description` and `tags` are mutable after registration; a changed file means a
new version. MLflow-format (`mlflow_model`) models skip the scoring script and
environment for no-code deployment — but no-code deployment returns `predict()`
labels, not probabilities. Use a custom scoring script when the consumer needs a
risk score.

## Deploy a real-time (online) endpoint

```python
# (illustrative)
from azure.ai.ml.entities import (
    ManagedOnlineEndpoint, ManagedOnlineDeployment, CodeConfiguration)

endpoint = ManagedOnlineEndpoint(name="churn-endpoint", auth_mode="key")
ml_client.online_endpoints.begin_create_or_update(endpoint).result()

blue = ManagedOnlineDeployment(
    name="blue", endpoint_name="churn-endpoint",
    model="azureml:churn-model:1", environment=env,
    code_configuration=CodeConfiguration(code="src", scoring_script="score.py"),
    instance_type="Standard_DS3_v2", instance_count=1)
ml_client.online_deployments.begin_create_or_update(blue).result()

endpoint.traffic = {"blue": 100}
ml_client.online_endpoints.begin_create_or_update(endpoint).result()
```

Safe rollout to a new model version: add a `green` deployment at zero traffic, mirror
up to 50% of live traffic to it (`endpoint.mirror_traffic = {"green": 10}`), then
shift live traffic gradually, then delete `blue`.

**Always test the scoring script locally first** with the
`azureml-inference-server-http` package before touching the cloud — it runs your
`init()`/`run()` exactly as the endpoint will, without Docker.

## Deploy a batch endpoint

```python
# (illustrative)
from azure.ai.ml.entities import (
    BatchEndpoint, ModelBatchDeployment, ModelBatchDeploymentSettings, CodeConfiguration)
from azure.ai.ml.constants import BatchDeploymentOutputAction, AssetTypes
from azure.ai.ml import Input

endpoint = BatchEndpoint(name="churn-batch")
ml_client.batch_endpoints.begin_create_or_update(endpoint).result()

deployment = ModelBatchDeployment(
    name="churn-batch-v1", endpoint_name="churn-batch",
    model=model, environment=env, compute="batch-cluster",
    code_configuration=CodeConfiguration(code="src/", scoring_script="score.py"),
    settings=ModelBatchDeploymentSettings(
        mini_batch_size=10, instance_count=2,
        output_action=BatchDeploymentOutputAction.APPEND_ROW,
        output_file_name="predictions.csv"))
ml_client.batch_deployments.begin_create_or_update(deployment).result()

job = ml_client.batch_endpoints.invoke(
    endpoint_name="churn-batch",
    input=Input(path="azureml://datastores/...", type=AssetTypes.URI_FOLDER))
```

Batch compute scales to zero between runs — you pay only while a job is scoring.

## Schedule a monitor

```python
# (illustrative — needs a Spark serverless compute setting)
from azure.ai.ml.entities import (
    MonitorDefinition, MonitoringTarget, MonitorSchedule,
    RecurrenceTrigger, ServerlessSparkCompute, AlertNotification)

spark = ServerlessSparkCompute(instance_type="standard_e4s_v3", runtime_version="3.4")
target = MonitoringTarget(ml_task="classification",
    endpoint_deployment_id="azureml:churn-endpoint:blue")
definition = MonitorDefinition(compute=spark, monitoring_target=target,
    alert_notification=AlertNotification(emails=["ds-team@example.com"]))
monitor = MonitorSchedule(name="churn_monitor",
    trigger=RecurrenceTrigger(frequency="day", interval=1),
    create_monitor=definition)
ml_client.schedules.begin_create_or_update(monitor)
```

For batch endpoints, Azure ML does **not** auto-collect production inference data —
you are responsible for storing the scored output yourself before you can monitor it.

## Clean-up checklist (do this every time)

- `ml_client.online_endpoints.begin_delete(name=...)` — a managed online endpoint
  keeps compute allocated, and billing, while it exists.
- Set compute cluster `min_instances=0`.
- Delete monitor schedules you no longer need; each run launches a scheduled job.
- Check cost analysis in the portal a day later to confirm spend actually stopped.
