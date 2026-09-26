# Monitoring Models & Data Drift

Deploying a model is not the finish line. A model is a snapshot of the world as it looked in the training data, and the world keeps moving: customers change plans, prices rise, a sensor gets recalibrated, an upstream team renames a column. Nothing crashes. The endpoint keeps returning 200 OK. The predictions just quietly get worse. Monitoring is how you notice.

## What you'll learn

- What data drift, prediction drift and data quality mean, and how they differ from a crash
- How Azure Machine Learning model monitoring compares production data with reference data
- How to compute drift metrics yourself (PSI, Jensen-Shannon distance, KS test, chi-squared) and read them
- The shape of the illustrative SDK v2 code that schedules a monitor

## Why models go stale

Microsoft Learn puts it plainly: unlike ordinary software, an ML system's behavior is learned from data, so changes in data distribution, training-serving skew, data quality problems and shifts in consumer behavior can all make a model stale. Two ideas matter most:

- **Data drift**: the distribution of the model's *inputs* changes. Your customers now spend more per month than the ones you trained on.
- **Prediction drift**: the distribution of the model's *outputs* changes. The model suddenly flags far more customers as high risk.

Azure ML also tracks **data quality** (null rate, data type error rate, out-of-bounds rate), **feature attribution drift** (in preview at the time of writing) and **model performance** (accuracy, precision, recall or MAE/RMSE once you have ground truth; also preview). Ground truth often arrives late, so drift signals are your early warning: you can measure them the day the data arrives, long before you know who actually churned.

## How Azure ML monitoring works

The documented process is three steps for each built-in signal:

1. Compute the distribution of each feature in the **reference data** (usually training data). That is the baseline.
2. Compute the distribution of the feature's latest values in **production**.
3. Compare them with a statistical test or a distance score. If it crosses a **threshold you set**, Azure ML flags an anomaly and notifies you by email or through Azure Event Grid.

For data drift on numerical features the documentation lists metrics including Jensen-Shannon distance, Population Stability Index, Normalized Wasserstein distance and the two-sample Kolmogorov-Smirnov test, with Pearson's chi-squared test for categorical features. Set up is: turn on data collection, define a monitor with signals and thresholds, and run it on a schedule.

One catch that connects to the last lesson: for online endpoints Azure ML can collect inference data for you, but for batch endpoints (or models deployed elsewhere) you are responsible for collecting the production data yourself.

Two more design ideas. The **lookback window** says how much production data each run examines (for example `P7D`, seven days), and an **offset** shifts it. Keep reference and production windows from overlapping. And Microsoft recommends using training data as the baseline for data drift and quality, validation data for prediction drift, and monitoring the top N most important features to cut noise.

## Compute drift metrics yourself

The metrics are not magic. Here is a small local experiment I ran with numpy, pandas and scipy: a reference set of 5,000 customers, one production week that looks the same (1,000 rows), and one where spend rose from a mean of 70 to 85 and the plan mix shifted toward "pro".

```python
from scipy.stats import ks_2samp, chi2_contingency
from scipy.spatial.distance import jensenshannon

def psi(a, b, bins=10):
    edges = np.quantile(a, np.linspace(0, 1, bins + 1))
    edges[0], edges[-1] = -np.inf, np.inf
    pa = np.histogram(a, edges)[0] / len(a)
    pb = np.histogram(b, edges)[0] / len(b)
    pa, pb = np.clip(pa, 1e-4, None), np.clip(pb, 1e-4, None)
    return float(np.sum((pb - pa) * np.log(pb / pa)))
```

Then for each production sample I computed PSI, Jensen-Shannon distance (on 20 shared histogram bins) and the KS p-value for `monthly_spend`, plus a chi-squared p-value for `plan`. The output:

```
no drift PSI=0.011 JS=0.060 KS p=0.4703 chi2 p=0.8775
drifted  PSI=0.569 JS=0.336 KS p=0.0000 chi2 p=0.0000
```

The same-distribution week scores near zero and its p-values are large; the drifted week has a large PSI, a large JS distance and vanishing p-values. A common industry rule of thumb reads PSI under 0.1 as stable and above 0.25 as a significant shift, but that is a convention, not an Azure setting. In Azure ML you choose the threshold per metric. Note that my implementation is my own simple version for teaching; Azure ML's exact binning may differ, so do not expect identical numbers.

A p-value alone can mislead with huge samples, where trivial shifts become "significant". That is one reason to pair a test with a distance measure and to set thresholds using judgment about what change actually matters.

## Scheduling a monitor (illustrative, not run here)

This is adapted from the Microsoft Learn article on monitoring model performance. Class names are as documented at the time of writing; check current docs. Monitoring needs a Spark serverless compute setting.

```python
from azure.ai.ml.entities import (
    MonitorDefinition, MonitoringTarget,
    MonitorSchedule, RecurrenceTrigger,
    ServerlessSparkCompute, AlertNotification)

spark = ServerlessSparkCompute(
    instance_type="standard_e4s_v3",
    runtime_version="3.4")
target = MonitoringTarget(
    ml_task="classification",
    endpoint_deployment_id="azureml:<endpoint>:<deployment>")
definition = MonitorDefinition(
    compute=spark, monitoring_target=target,
    alert_notification=AlertNotification(
        emails=["ds-team@example.com"]))
monitor = MonitorSchedule(
    name="churn_monitor",
    trigger=RecurrenceTrigger(frequency="day", interval=1),
    create_monitor=definition)
ml_client.schedules.begin_create_or_update(monitor)
```

The documentation's basic example, like this one, passes no signals and relies on defaults (the studio wizard shows data drift, data quality and prediction drift preconfigured). For custom signals and thresholds you pass a `monitoring_signals` dictionary containing objects such as `DataDriftSignal` with `DataDriftMetricThreshold`.

## Recap

- Models degrade silently; monitoring compares production data to a reference baseline.
- Data drift is inputs changing, prediction drift is outputs changing, and data quality catches broken pipelines.
- Azure ML runs scheduled monitors with thresholds and alerts; for batch endpoints you must collect the data.
- The metrics are learnable statistics you can compute yourself, and thresholds are your judgment call.
