# Cost Management for ML

Machine learning on AWS rarely gets expensive because of one big decision. It gets expensive because something small was left running: a notebook over a long weekend, an endpoint from last week's experiment, a monitoring schedule nobody remembers creating. This lesson shows where the money goes, the levers the AWS documentation recommends, and the habits that keep a personal or team account safe.

## What you'll learn

- Which SageMaker resources bill while idle
- How to match an inference option to your traffic
- Training-side savings: spot instances and Savings Plans
- A cleanup checklist and the exact delete calls

## Where the money goes

Most SageMaker charges are for instances that exist, whether or not they are busy. That covers notebook and Studio compute, training jobs, processing jobs (including recurring monitoring jobs), and above all **real-time endpoints**, which keep instances running around the clock. A training job stops billing when it ends. An endpoint does not stop until you delete it.

I measured how busy an endpoint would be for a realistic use. Running the inference handlers of our churn model locally, one request took about 15.7 ms on my laptop, with no network and no container overhead, so treat it as a rough figure only. A support screen making 500 lookups an hour would keep an instance busy about 0.22% of the time. That is a very expensive way to serve a very light workload.

## Match the inference option to the traffic

The AWS inference cost guidance lists four options:

- **Real-time inference** for low-latency, predictable traffic; you pay for the instance.
- **Serverless inference** for spiky traffic that tolerates variable latency; you pay for the duration of requests, with no idle instances.
- **Asynchronous inference** for latency-insensitive work with payloads up to 1 GB; it can scale down to zero.
- **Batch transform** for offline scoring of a large dataset; you pay for the instance only while the job runs.

The docs add that the same model and container can be used for both real-time and serverless, so you can switch as needs change. To make the difference concrete I used a **hypothetical** rate of $0.20 per instance-hour. It is a placeholder, not an AWS price; look up the current rate for your instance type and region.

```
scenario                                  hours  cost
Real-time, 1 instance, 24x7 for 30 days   720.0  $144.00
Real-time, deleted after a 2-day test      48.0  $9.60
Nightly batch, 15 min x 30 nights           7.5  $1.50
```

The point is the ratio: the same model costs almost 100 times more as an always-on endpoint than as a nightly batch job, if a nightly list is all the business needs.

## More levers from the docs

- **Autoscaling** adjusts instance count to demand. You register the endpoint variant as a scalable target, then attach a target-tracking policy such as `SageMakerVariantInvocationsPerInstance`.
- **Multi-model endpoints** let many models share one instance when each is lightly used.
- **Inference Recommender** compares instance types for your model so you do not guess.
- **SageMaker Savings Plans** trade a one- or three-year usage commitment for lower prices; the docs say up to 64%.
- **Managed spot training** can cut training cost by up to 90% per the docs, at the price of possible interruptions, so use checkpointing. The docs give a formula for your actual savings, `(1 - (BillableTimeInSeconds / TrainingTimeInSeconds)) * 100`; with 100 billable seconds against 500 training seconds it gives 80.0, which I ran to confirm the arithmetic.

Illustrative autoscaling calls follow, adapted from the docs and **not run here**. I did validate their parameter shapes offline against boto3's service model, along with the cleanup calls below.

```python
aas.register_scalable_target(
    ServiceNamespace="sagemaker",
    ResourceId="endpoint/churn-endpoint/variant/AllTraffic",
    ScalableDimension=
        "sagemaker:variant:DesiredInstanceCount",
    MinCapacity=1, MaxCapacity=4)
```

For a variant registered this way the docs say the minimum capacity must be at least 1, so the first instance keeps billing. Scaling to zero is documented only for endpoints that host inference components, and the first request after zero fails until an instance provisions, which takes several minutes. For sparse traffic, serverless or batch is usually simpler.

## The cleanup checklist

Every experiment ends with deletes, in this order:

```python
sm.delete_monitoring_schedule(MonitoringScheduleName="...")
sm.delete_endpoint(EndpointName="churn-endpoint")
sm.delete_endpoint_config(EndpointConfigName="churn-config-v1")
sm.delete_model(ModelName="churn-model-v1")
```

Also stop idle Studio apps and notebook instances; AWS documents an auto-shutdown extension for Studio. Then set guardrails: use AWS Budgets and Cost Explorer with alerts, and tag resources so cost can be attributed by project. Check the Billing console for the current setup steps.

## Recap

- Instances bill while they exist; endpoints and recurring monitors are the classic leaks.
- Choose real-time, serverless, asynchronous or batch by traffic pattern, not by habit.
- Autoscaling, multi-model endpoints, Savings Plans and spot training are documented levers; measure before trusting any percentage.
- End every project with delete calls and budget alerts.
