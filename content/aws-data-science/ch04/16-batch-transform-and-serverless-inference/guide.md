# Batch Transform & Serverless Inference

A real-time endpoint is the right answer when something needs a prediction right now and traffic is steady. Many workloads are not like that. A monthly churn score for every customer is a big job that runs once. A prototype used a few times a day does not justify instances running around the clock. SageMaker has options for both: **batch transform** for scoring whole datasets, and **serverless inference** for endpoints that scale to zero. This lesson explains how each works and how to choose.

> Cloud code in this lesson is illustrative and was not run here (no AWS account). It uses boto3 and follows the AWS developer guide and API reference as of this writing. The batch-scoring logic was simulated locally with the same inference script as last lesson.

## What you'll learn

- How the four inference options differ, and a rule for picking one
- How batch transform reads, splits, scores and writes data
- How to join predictions back to the input records
- How a serverless endpoint is configured, and what its limits are
- Which option suits which workload

## The four options

From the developer guide:

- **Real-time endpoint:** persistent instances, low latency, interactive use.
- **Serverless inference:** no instances to choose or manage; compute launches on demand and scales down to zero when idle. Ideal for workloads with idle periods that can tolerate cold starts.
- **Asynchronous inference:** queues requests, for payloads up to 1 GB and processing up to an hour.
- **Batch transform:** runs a job over a dataset in S3, writes results to S3, and shuts down. Use it to get inferences from large datasets, when you do not need a persistent endpoint, or to associate input records with their predictions.

A simple rule: if no person or application is waiting for the answer, prefer batch. If someone is waiting but requests are sporadic, consider serverless. If someone is waiting all day, use a real-time endpoint.

## How batch transform works

A transform job uses a model you already created. When the job starts, SageMaker starts the compute instances, distributes the workload, and stops them when the job ends. Some details from the guide worth knowing:

- Input S3 objects are partitioned by key and mapped to instances. One large file on several instances means only one instance works; split large data into several files to parallelize.
- With `SplitType` set to `Line`, each file is split into mini-batches of records. `BatchStrategy` is `SingleRecord` (one record per request) or `MultiRecord` (as many as fit in `MaxPayloadInMB`). The payload size defaults to 6 MB and cannot exceed 100 MB.
- For each input file, the job writes an output file with the same name plus `.out`, with predictions in the same order as the input records.
- CSV input with embedded newline characters is not supported.

## The behavior, simulated locally

The following script mimics what a transform job does with a CSV of customers, using last lesson's `inference.py` handlers. It splits the input into mini-batches of 200 lines, calls the handlers with `text/csv`, and writes an output file named after the input plus `.out`. This simulates the semantics only; it is not the service.

```python
lines = open("s3_in/customers.csv").read().strip().splitlines()
BATCH = 200                                    # records per mini-batch
out_lines, calls = [], 0
for i in range(0, len(lines), BATCH):
    body = "\n".join(lines[i:i + BATCH]).encode()
    resp = h.output_fn(h.predict_fn(h.input_fn(body, "text/csv"), model), "text/csv")
    out_lines.extend(resp.splitlines())
    calls += 1
open("s3_out/customers.csv.out", "w").write("\n".join(out_lines))
```

Output on the 500 illustrative customers from the validation split:

```
input records: 500 | mini-batch calls: 3 | output records: 500
first joined record: 32,96.45,3,0.5079
last joined record:  17,98.2,1,0.5031
```

Three mini-batch calls (200, 200 and 100 records), 500 predictions in the same order as the input. The joined records show what `JoinSource` gives you for CSV: the input columns followed by the prediction, so the output is self-explanatory without a separate merge.

## Creating a transform job (illustrative, not run here)

```python
sm = boto3.client("sagemaker")
sm.create_transform_job(
    TransformJobName="churn-batch-2026-09",
    ModelName="churn-model",
    BatchStrategy="MultiRecord",
    MaxPayloadInMB=6,
    TransformInput={
        "DataSource": {"S3DataSource": {
            "S3DataType": "S3Prefix",
            "S3Uri": "s3://my-bucket/batch/in/"}},
        "ContentType": "text/csv",
        "SplitType": "Line",
    },
    TransformOutput={
        "S3OutputPath": "s3://my-bucket/batch/out/",
        "Accept": "text/csv",
        "AssembleWith": "Line",
    },
    TransformResources={"InstanceType": "ml.m5.large", "InstanceCount": 1},
    DataProcessing={"JoinSource": "Input"},
)
```

`DataProcessing` also takes an `InputFilter` and `OutputFilter`, JSONPath expressions to drop columns before the model sees them (an ID column, say) and to trim what is written. The guide notes this works for JSON and CSV input and often removes the need for separate pre- and post-processing. A common pattern is to trigger a transform job from a pipeline step, then load the `.out` files into a table, for example through Athena.

## Serverless inference

A serverless endpoint is created much like a real-time one, but the endpoint configuration carries a `ServerlessConfig` instead of an instance type and count. The API reference gives the fields:

- `MemorySizeInMB`: 1024, 2048, 3072, 4096, 5120 or 6144.
- `MaxConcurrency`: 1 to 200 concurrent invocations.
- `ProvisionedConcurrency` (optional): keeps that many workers warm, up to `MaxConcurrency`.

```python
sm.create_endpoint_config(
    EndpointConfigName="churn-serverless-config",
    ProductionVariants=[{
        "VariantName": "AllTraffic",
        "ModelName": "churn-model",
        "ServerlessConfig": {"MemorySizeInMB": 2048, "MaxConcurrency": 5},
    }],
)
sm.create_endpoint(EndpointName="churn-serverless",
                   EndpointConfigName="churn-serverless-config")
```

Callers use the same `invoke_endpoint` as before. The limits in the developer guide matter: the maximum request and response payload is 4 MB; the model must download and the server must answer `/ping` within 3 minutes; and a request must finish within 1 minute. The first request after idle time pays a cold start, visible in the `OverheadLatency` metric. If cold starts hurt, provisioned concurrency keeps some capacity ready, at additional cost. Serverless is pay-per-use and scales to zero, so it is cost effective for infrequent or unpredictable traffic; check the pricing page for the current rates.

## Choosing

| Workload | Good fit |
|---|---|
| Monthly scoring of every customer | Batch transform |
| Steady, latency-sensitive app | Real-time endpoint |
| Occasional demo or internal tool | Serverless |
| Large payloads or long processing | Asynchronous |

Whatever you pick, remember cleanup: delete endpoints you no longer use. Transform jobs end by themselves, which is one of their charms.

## Recap

Batch transform runs a job over S3 data, keeps input order, names outputs `.out`, and can join predictions to inputs. Serverless endpoints swap instances for a memory size and a concurrency limit, scale to zero, and accept cold starts and a 4 MB payload cap. Next lesson: keeping track of which model versions exist and which are approved, with the Model Registry.
