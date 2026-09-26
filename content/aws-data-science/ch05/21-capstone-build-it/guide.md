# Capstone: Build It

The plan from the kickoff has five moves: train, choose, package and test, register and deploy, monitor. Everything that can run on a laptop was run, and the output shown is what I saw. Everything that needs an AWS account is labeled illustrative and adapted from the AWS documentation; I could not run it, so verify names against the current docs for the SDK version you install.

## What you'll learn

- How SageMaker script-mode training maps to a plain `train.py`
- How to package `model.tar.gz` and test the inference handlers before deploying
- The illustrative registry and endpoint calls for this project
- A monitoring policy that separates "investigate" from "retrain"

## 1. Train in script mode

SageMaker's scikit-learn support runs your script inside a container. Per the SDK docs, hyperparameters arrive as command-line arguments, input channels arrive as the `SM_CHANNEL_<NAME>` environment variables, and the model must be written to the directory in `SM_MODEL_DIR`. My `train.py` reads those, fits the pipeline, prints its metrics in a regex-friendly format, and saves with `joblib`. I ran it locally by setting the same variables myself:

```
validation:auc=0.7992;
validation:recall=0.5777;
model saved
```

In a real job the print lines become metrics: the estimator accepts `metric_definitions`, a list of name and regex pairs, so the training job can scrape `validation:auc` from the logs. Illustrative, SDK v2 style (the current SDK docs describe `ModelTrainer` for newer versions, so check which you have):

```python
from sagemaker.sklearn.estimator import SKLearn

est = SKLearn(entry_point="train.py",
              framework_version="1.2-1",
              instance_type="ml.m5.large",
              role=role,
              hyperparameters={"C": 1.0})
est.fit({"train": train_s3, "validation": val_s3})
```

## 2. Choose the model

I compared three candidates on validation AUC: logistic regression with C=0.1 scored 0.7991, with C=1.0 scored 0.7992, and gradient boosting scored 0.7844. Regularization barely matters and the more complex model is no better on this data. That is a useful result: I ship the simple model, which is easier to explain and monitor. In your own capstone, use the tuning and experiment tools from earlier lessons and log every run.

## 3. Package and test the handlers

The artifact is `model.tar.gz`: `model.joblib` at the top and `inference.py` under `code/`. I built it and listed the contents to confirm: `['model.joblib', 'code/inference.py']`. The `code/` layout is my assumption for a self-contained artifact; the SageMaker SDK can also package your entry point for you, so confirm the mechanism in the current docs.

The container calls four functions: `model_fn`, `input_fn`, `predict_fn`, `output_fn`. The container's default `input_fn` deserializes CSV, JSON or NPY into a NumPy array, which is not enough for a pipeline that expects named columns and a text `plan` column, so I wrote my own. I extracted the tarball into a temporary directory and drove the handlers with real requests:

```
csv in  -> json out: {"churn_risk": [0.1676, 0.1391]}
json in -> csv out : 0.9591
bad type -> Unsupported content type: application/xml
```

Rejecting unknown content types with a clear error is deliberate. It tells the caller what went wrong instead of returning nonsense.

## 4. Register and deploy (illustrative, not run here)

Register the artifact as a version in the `churn-model` group with `PendingManualApproval` (the calls from the registry lesson), approve it once the AUC gate passes, then deploy with data capture switched on so the monitor has something to read. Adapted from the docs; SDK versions differ:

```python
from sagemaker.sklearn.model import SKLearnModel
from sagemaker.model_monitor import DataCaptureConfig

model = SKLearnModel(model_data=model_s3_uri, role=role,
                     entry_point="inference.py",
                     framework_version="1.2-1")
model.deploy(initial_instance_count=1,
             instance_type="ml.m5.large",
             data_capture_config=DataCaptureConfig(
                 enable_capture=True,
                 sampling_percentage=100,
                 destination_s3_uri=capture_s3_uri))
```

For the nightly list, run batch transform on the same model instead of keeping a second endpoint alive.

## 5. Monitor with a policy

Recall from the drift lesson that AWS's documentation says Model Monitor is closed to new customers, so the capstone uses the ideas rather than the service: captured inputs compared with the training baseline, plus quality once labels arrive. I wrote a decision rule: quality below our 0.75 gate means retrain; input drift with acceptable quality means investigate; otherwise fine. Applied to three simulated weeks of 800 requests:

```
week1: flags=0 auc=0.770 -> OK
week2: flags=2 auc=0.805 -> INVESTIGATE: input drift, quality ok
week3: flags=0 auc=0.544 -> RETRAIN: quality below gate
```

Week 1's AUC is a little under the 0.798 test figure, which is plausible sampling noise on 800 rows; I did not test that further. To alert on the drift number, publish it as a CloudWatch custom metric with `put_metric_data` and alarm on it. I validated that request's shape offline; it printed `put_metric_data shape valid (offline)`.

## Recap

- Script mode is a contract: arguments in, `SM_CHANNEL_*` for data, `SM_MODEL_DIR` for the artifact.
- Test `model_fn`, `input_fn`, `predict_fn` and `output_fn` locally with real requests, including a bad one.
- Register, approve, deploy with capture enabled, and remember cleanup.
- A monitoring policy needs two signals: input drift now, quality when labels arrive.
