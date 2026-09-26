# Batch Endpoints

Last lesson you put a model behind a real-time endpoint: one request in, one prediction out, in milliseconds. That is the right shape for a checkout page or a fraud check, but a lot of real data science work does not look like that. The marketing team wants a churn score for every customer, refreshed every night. Nobody is waiting on a single answer; they want two million answers by morning. That job belongs on a **batch endpoint**.

## What you'll learn

- When a batch endpoint is the right choice and when it is not
- How a batch endpoint, its deployments and its compute cluster fit together
- What a scoring script with `init()` and `run()` looks like, and how to test it locally
- The shape of the illustrative SDK v2 code that creates and invokes a batch deployment

## Batch versus real-time

A real-time (online) endpoint keeps compute running all day and answers each request immediately. A batch endpoint does the opposite. Per the Microsoft Learn documentation, batch endpoints receive *pointers to data* and run jobs asynchronously, processing the data in parallel on a compute cluster and writing outputs to a data store. Use batch when the model is expensive, the input is large or spread over many files, and nobody needs a low-latency answer.

Cost is a big reason to prefer it. Invoking a batch endpoint starts a job; Azure Machine Learning provisions compute when the job starts and releases it when the job finishes. With a cluster set to a minimum of zero nodes you pay for compute only while scoring. The documentation also states that batch endpoints and deployments are not themselves charged.

## Endpoint, deployment, compute

The endpoint is the stable name your consumers call. Behind it sit one or more **deployments**, each with a model, a compute cluster, and usually a scoring script and an environment. One deployment is the default, and you can switch the default without changing how anyone invokes the endpoint. That makes a model upgrade a quiet change: add a new deployment, test it, promote it.

Two kinds of deployment exist: a **model deployment** (what this lesson covers) and a **pipeline component deployment**, which operationalizes a whole multi-step pipeline from the pipelines lesson. For MLflow-format models the documentation says the scoring script and environment are optional, because Azure ML generates them.

## The scoring script

For a non-MLflow model you write `score.py` with two functions. `init()` runs once per worker process, so load the model there. `run(mini_batch)` is called repeatedly; for file inputs, `mini_batch` is a list of file paths, and you return a DataFrame or array with one result per input.

Here is a tabular version. It is plain pandas and scikit-learn, so you can test it on your laptop before it ever touches Azure:

```python
import os, joblib
import pandas as pd

model = None

def init():
    global model
    model = joblib.load(
        os.path.join(os.environ["MODEL_DIR"], "churn.joblib"))

def run(mini_batch):
    frames = []
    for path in mini_batch:
        df = pd.read_csv(path)
        df["churn_risk"] = model.predict_proba(
            df[["tenure_months", "monthly_spend",
                "support_tickets"]])[:, 1].round(3)
        df["source_file"] = os.path.basename(path)
        frames.append(df[["customer_id", "source_file",
                          "churn_risk"]])
    return pd.concat(frames)
```

I trained a small logistic regression on synthetic churn data, wrote five little CSV files, and called the script the way the batch driver would: `init()` once, then `run()` on mini-batches of two files. The driver output was:

```
run() called with 2 files
run() called with 2 files
run() called with 1 files
(20, 3)
 customer_id source_file  churn_risk
       10000  part-0.csv       0.136
       10001  part-0.csv       0.200
       10002  part-0.csv       0.336
       10003  part-0.csv       0.611
```

Five files with a mini-batch size of two gives three `run()` calls, and the results merge into one table. That merge is what `output_action="append_row"` does in the cloud.

## Creating and invoking it (illustrative, not run here)

No Azure account is available in this course, so the following is adapted from the current Microsoft Learn article on batch model deployments. Class and parameter names are as documented there at the time of writing; check the current docs before relying on them.

```python
from azure.ai.ml.entities import (
    BatchEndpoint, ModelBatchDeployment,
    ModelBatchDeploymentSettings, CodeConfiguration)
from azure.ai.ml.constants import (
    BatchDeploymentOutputAction, AssetTypes)
from azure.ai.ml import Input

endpoint = BatchEndpoint(name="churn-batch")
ml_client.batch_endpoints.begin_create_or_update(
    endpoint).result()

deployment = ModelBatchDeployment(
    name="churn-batch-v1",
    endpoint_name="churn-batch",
    model=model,
    environment=env,
    compute="batch-cluster",
    code_configuration=CodeConfiguration(
        code="src/", scoring_script="score.py"),
    settings=ModelBatchDeploymentSettings(
        mini_batch_size=10,
        instance_count=2,
        output_action=BatchDeploymentOutputAction.APPEND_ROW,
        output_file_name="predictions.csv"),
)
ml_client.batch_deployments.begin_create_or_update(
    deployment).result()

job = ml_client.batch_endpoints.invoke(
    endpoint_name="churn-batch",
    input=Input(path="azureml://datastores/...",
                type=AssetTypes.URI_FOLDER))
```

`invoke` returns a job you can watch in the studio. You can also override settings such as mini-batch size or instance count for a single run without editing the deployment.

## Recap

- Choose batch when scoring is large, slow, or scheduled and no one waits for one answer.
- The endpoint is a stable name; deployments behind it hold the model and compute, and you can change the default.
- A scoring script loads the model in `init()` and scores file lists in `run()`, and you can test it locally.
- Compute spins up per job and back down afterward, so you pay only while scoring.
