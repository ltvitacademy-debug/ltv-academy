# Model Monitor & Drift

A deployed model does not fail with an error message. It keeps returning numbers, just worse ones, because the world it was trained on has moved. Monitoring is how you notice. This lesson covers the two kinds of drift, the monitoring workflow SageMaker Model Monitor is built around, an important availability note about that service, and a drift check you can run on your own machine.

## What you'll learn

- The difference between data drift and model-quality (concept) drift
- The Model Monitor workflow: data capture, baseline, schedule, violations
- Why AWS now points new projects toward other tools
- How to run a baseline-versus-current drift check on captured requests

## Two kinds of drift

**Data drift** means the inputs changed: a price change shifts average order values, or a promotion brings a different kind of customer. **Concept drift** (model-quality drift) means the relationship between inputs and outcome changed: customers now leave for different reasons, so the same inputs no longer predict churn. Data drift you can detect immediately from requests alone. Concept drift you can only confirm with ground-truth labels, which for churn arrive weeks later.

## The Model Monitor workflow

SageMaker Model Monitor structures monitoring in four steps, following the AWS documentation:

1. **Data capture.** The endpoint configuration saves request and response payloads to S3 as JSON Lines. The `DataCaptureConfig` block of `create_endpoint_config` takes `EnableCapture`, `InitialSamplingPercentage`, `DestinationS3Uri` and `CaptureOptions` for `Input` and `Output`.
2. **Baseline.** A processing job analyzes your training data and writes `statistics.json` and `constraints.json`.
3. **Schedule.** A recurring monitoring job compares captured data with the baseline.
4. **Violations.** Each run writes `constraint_violations.json`. The documented check types are `data_type_check`, `completeness_check`, `baseline_drift_check`, `missing_column_check`, `extra_column_check` and `categorical_values_check`; the job can also emit CloudWatch metrics for alarms.

Illustrative, adapted from the docs and **not run here**:

```python
from sagemaker.model_monitor import DefaultModelMonitor
from sagemaker.model_monitor.dataset_format import DatasetFormat

monitor = DefaultModelMonitor(
    role=role, instance_count=1,
    instance_type="ml.m5.xlarge")
monitor.suggest_baseline(
    baseline_dataset=train_csv_s3_uri,
    dataset_format=DatasetFormat.csv(header=True),
    output_s3_uri=baseline_s3_uri)
```

I did validate the endpoint-config request with the capture block offline using boto3's service model; it printed `DataCaptureConfig request shape valid (offline)`. That checks shape only.

## An availability note you must know

At the time of writing, the AWS documentation states that **Model Monitor is no longer open to new customers**: existing customers can keep using it, but AWS does not plan new features. The docs point to a replacement built from open-source SageMaker monitoring samples using Evidently AI with SageMaker MLflow, Amazon QuickSight dashboards, and Amazon CloudWatch. Check the current documentation before you build on either path. The concepts above (capture, baseline, compare, alert) carry over unchanged, which is why they are worth learning, and why the check below is written in plain Python.

## A drift check you can run

I generated a scikit-learn churn model, simulated endpoint traffic through the `input_fn`, `predict_fn` and `output_fn` handlers of an inference script, and wrote each request in the documented capture format (`captureData`, `endpointInput`, `endpointOutput`, `eventMetadata`). A small script parsed the files, compared each numeric feature with the training data using the Population Stability Index (PSI) and the Kolmogorov-Smirnov statistic, and flagged any feature with PSI above 0.25, a common rule of thumb and my choice here, not an AWS default. This is a stand-in for Model Monitor's ideas, not its implementation.

```
week1  mean risk 0.386  violations 0  AUC 0.770
week2  mean risk 0.632  violations 2  AUC 0.805
         avg_order_value  PSI=1.619 KS=0.539
         support_tickets  PSI=0.405 KS=0.264
week3  mean risk 0.392  violations 0  AUC 0.544
training mean risk 0.381
```

Read the three weeks carefully. Week 1 is normal. In week 2 the inputs shifted sharply and the check fired, yet AUC did not fall in this simulation, so drift was a reason to look, not proof of damage. In week 3 the inputs looked normal and **no violation fired**, but the relationship changed and AUC collapsed to 0.544, barely better than guessing. Input monitoring alone would have missed it. You need both signals: input drift now, and quality metrics as soon as labels arrive.

## Recap

- Data drift shows up in requests; concept drift needs labels.
- Model Monitor's flow is capture, baseline, schedule, violations, and it is closed to new customers per current AWS docs; the open-source Evidently, QuickSight and CloudWatch route is the documented replacement.
- PSI and KS are simple, explainable drift measures; thresholds are choices you must tune.
- A quiet input check does not mean a healthy model. Track quality with delayed labels too.
