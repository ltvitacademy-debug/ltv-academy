# Experiments & Model Tracking

After a tuning job, or a week of trying ideas, you have dozens of models and one nagging question: which settings, on which data, produced the number in the slide deck? Without a record you cannot answer, cannot reproduce it, and end up training the same thing twice. **Experiment tracking** fixes that by logging, for every run, what went in (parameters, data version, code) and what came out (metrics, files).

> Cloud code in this lesson is illustrative and was not run here (no AWS account). It follows the AWS developer guide as of this writing. The tracking code was run locally with the open-source MLflow client (version 2.14.3 on this machine); a SageMaker tracking server supports newer versions, so match your client to your server as the docs describe.

## What you'll learn

- What is worth recording for every run
- How to track runs with MLflow, in a runnable local example
- How SageMaker hosts MLflow for you: tracking server, artifact store, ARN
- How SageMaker's older Experiments feature fits in
- The cost and IAM points to plan for

## What to record

A run is one attempt at training. Keep four kinds of information:

- **Parameters:** hyperparameters, feature list, random seed.
- **Metrics:** validation accuracy, loss, and so on, optionally per step.
- **Artifacts:** the model file, plots, the preprocessing code.
- **Tags:** the data version, who ran it, why.

Notice that this is what a tuning job already produces per training job; tracking gives it a home you can query.

## The idea, run locally first

MLflow is open source and you may already know it. This script trains six random-forest variants on the illustrative churn table and logs each as a run. The tracking location is read from an environment variable, defaulting to a local folder, so the same script can later point at SageMaker:

```python
import os, random, joblib, mlflow

mlflow.set_tracking_uri(os.environ.get("MLFLOW_TRACKING_ARN", "file:./mlruns"))
mlflow.set_experiment("churn-rf")

random.seed(3)
for i in range(6):
    params = {"n_estimators": random.choice([50, 100, 200]),
              "max_depth": random.choice([2, 3, 5, 8])}
    with mlflow.start_run(run_name=f"rf-{i}"):
        mlflow.log_params(params)
        mlflow.set_tag("data_version", "churn-v1")
        model = RandomForestClassifier(random_state=0, **params).fit(X_tr, y_tr)
        acc = accuracy_score(y_va, model.predict(X_va))
        mlflow.log_metric("val_accuracy", acc)
        joblib.dump(model, "model.joblib")
        mlflow.log_artifact("model.joblib")

runs = mlflow.search_runs(order_by=["metrics.val_accuracy DESC"])
```

Sorted results, as run:

```
run   n_estimators  max_depth  val_accuracy
rf-5           200          3         0.666
rf-0            50          3         0.658
rf-4           100          5         0.634
rf-3           200          2         0.630
rf-2           200          2         0.630
rf-1           100          8         0.618
```

Two things are visible only because we tracked. Runs rf-2 and rf-3 drew the same settings and produced the identical score, so one was wasted compute. And accuracy fell as depth rose, which points where to search next.

## Managed MLflow on SageMaker

Running your own MLflow server means patching, scaling and securing it. SageMaker offers it as a managed service. In the AWS documentation:

- An MLflow **tracking server** has compute, a metadata store, and an artifact store. The compute and metadata store are hosted in a SageMaker service account; the **artifact store is an S3 bucket in your own account**, in the same Region as the server.
- You create the server in Studio or with the AWS CLI. Illustrative CLI, from the developer guide's pattern:

```
aws sagemaker create-mlflow-tracking-server \
  --tracking-server-name churn-tracking \
  --artifact-store-uri s3://my-mlflow-bucket \
  --role-arn $role_arn \
  --region us-east-1
```

The guide says creation can take up to 25 minutes, and the command returns a `TrackingServerArn`.

- You connect with the ARN. Install `sagemaker-mlflow`, the AWS plugin that signs requests with AWS Signature Version 4, and pin an MLflow client version that matches the server (the guide gives 2.13, 2.16 and 3.0 pairings):

```python
import mlflow
mlflow.set_tracking_uri("YOUR-TRACKING-SERVER-ARN")
mlflow.set_experiment("churn-rf")
with mlflow.start_run():
    mlflow.log_params(params)
    mlflow.log_metric("val_accuracy", acc)
```

Everything from the local example works unchanged; only the URI differs. The same code can run inside a SageMaker training job if its execution role is allowed to call the MLflow APIs (they appear as IAM actions under the `sagemaker-mlflow` prefix) and the plugin is installed through `requirements.txt`. The `CreateTrainingJob` API also has an `MlflowConfig` field for the experiment name, run name and tracking resource ARN.

The developer guide also mentions that the tracking server can automatically register logged models with the SageMaker Model Registry, which is lesson 17.

## What about SageMaker Experiments?

SageMaker has an older feature, Experiments, with its own Python `Run` API. Today's developer guide says experiment tracking with the SageMaker Experiments Python SDK is available only in Studio Classic, and recommends the new Studio experience with MLflow. The SDK version 3 migration guide likewise lists experiments among the areas that moved. If you inherit code using it, you can still read the history; new work should use MLflow.

## Costs and housekeeping

A tracking server has a size (Small, Medium or Large; the guide suggests Small for teams up to 25). It is infrastructure that sits there, so stop it when idle with `stop-mlflow-tracking-server` and delete it when done. Delete the S3 artifacts too, and do not delete the IAM role before the server, or you lose access.

## Recap

Track parameters, metrics, artifacts and tags for every run. Use MLflow locally to learn the API, then point `set_tracking_uri` at a SageMaker tracking server ARN. Artifacts land in your S3 bucket, permissions go through IAM, and an idle server should be stopped.
