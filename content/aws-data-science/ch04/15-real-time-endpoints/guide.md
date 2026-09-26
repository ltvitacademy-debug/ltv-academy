# Real-Time Endpoints

A trained model sitting in S3 as `model.tar.gz` helps nobody. To make it useful, an application needs to send it a customer's features and get a churn probability back in milliseconds. In SageMaker that is a **real-time endpoint**: a managed HTTPS service, backed by one or more instances that stay running, that loads your model and answers `InvokeEndpoint` requests. This lesson covers how one is put together, the handler code you write, and the habits that keep the bill honest.

> Cloud code in this lesson is illustrative and was not run here (no AWS account). It uses boto3, the stable layer under the SageMaker Python SDK, and follows the AWS developer guide and API reference as of this writing. The inference handlers were run locally.

## What you'll learn

- The three SageMaker objects behind an endpoint: model, endpoint configuration, endpoint
- The four handler functions of an inference script, tested locally
- How a client calls the endpoint
- Auto scaling, variants, and why you must delete idle endpoints
- Where real-time fits among the other inference options

## Where real-time fits

The developer guide lists several inference options. **Real-time inference** is for interactive workloads with low-latency needs. **Serverless inference** removes infrastructure management and suits workloads with idle periods that can tolerate cold starts. **Asynchronous inference** queues requests, for large payloads (up to 1 GB) and long processing times (up to an hour). **Batch transform** scores whole datasets offline. The next lesson covers batch and serverless. The guide also notes you can deploy with the `ModelBuilder` class in the Python SDK for more control, or with boto3 and infrastructure-as-code tools to manage resources at scale.

## Three objects and one call

Underneath every SDK there are three resources:

1. **Model**: names the container image (inference code) and the location of the model artifact in S3, plus an execution role.
2. **Endpoint configuration**: lists one or more *production variants*, each naming a model, an instance type and an initial instance count.
3. **Endpoint**: a named, running deployment of a configuration.

In the SDK version 2 scikit-learn docs, the convenience call is `sklearn_model.deploy(initial_instance_count=1, instance_type="ml.m5.large")`, which creates all three. In version 3 the migration guide shows `ModelBuilder(...).deploy(instance_type=..., initial_instance_count=1)`. With boto3 you make the calls yourself:

```python
sm = boto3.client("sagemaker")

sm.create_model(
    ModelName="churn-model",
    ExecutionRoleArn=role_arn,
    PrimaryContainer={"Image": image_uri, "ModelDataUrl": model_s3_uri},
)
sm.create_endpoint_config(
    EndpointConfigName="churn-config",
    ProductionVariants=[{
        "VariantName": "AllTraffic",
        "ModelName": "churn-model",
        "InstanceType": "ml.m5.large",
        "InitialInstanceCount": 1,
        "InitialVariantWeight": 1.0,
    }],
)
sm.create_endpoint(EndpointName="churn-endpoint",
                   EndpointConfigName="churn-config")
sm.get_waiter("endpoint_in_service").wait(EndpointName="churn-endpoint")
```

The `PrimaryContainer` also needs environment variables that point the scikit-learn container at your inference script; the exact names are in the container documentation, so check them for your framework version.

## The inference script

The scikit-learn container serves your model through four functions, as the SDK documentation describes. The model server runs `input_fn`, then `predict_fn`, then `output_fn` for each request, after calling `model_fn` once at start-up. Here is a complete script for our illustrative churn model, run locally against a model file from lesson 9:

```python
def model_fn(model_dir):
    return joblib.load(os.path.join(model_dir, "model.joblib"))

def input_fn(request_body, request_content_type):
    if isinstance(request_body, bytes):
        request_body = request_body.decode("utf-8")
    if request_content_type == "application/json":
        rows = json.loads(request_body)["instances"]
    elif request_content_type == "text/csv":
        rows = [[float(v) for v in line.split(",")]
                for line in request_body.strip().splitlines()]
    else:
        raise ValueError(f"Unsupported content type: {request_content_type}")
    return pd.DataFrame(rows, columns=FEATURES)

def predict_fn(input_object, model):
    return model.predict_proba(input_object)[:, 1]

def output_fn(prediction, content_type):
    if content_type == "application/json":
        return json.dumps({"churn_probability":
                           [round(float(p), 4) for p in prediction]})
    if content_type == "text/csv":
        return "\n".join(str(round(float(p), 4)) for p in prediction)
    raise ValueError(f"Unsupported accept type: {content_type}")
```

A tiny harness that chains the four functions the way the model server does gave these results for two illustrative customers:

```
{"churn_probability": [0.4114, 0.3291]}
0.4114
0.3291
0.3722
error: Unsupported content type: application/xml
```

The first line is a JSON request and JSON response. The next three lines are a three-row CSV request answered in CSV. The last is what a bad content type produces. Notice that `input_fn` rebuilds a DataFrame with the training column names, because a model fitted on a DataFrame should be given the same columns at prediction time. Testing handlers locally like this is the cheapest debugging you will do.

## Calling the endpoint

Applications use the runtime client, not the `sagemaker` client:

```python
rt = boto3.client("sagemaker-runtime")
resp = rt.invoke_endpoint(
    EndpointName="churn-endpoint",
    ContentType="application/json",
    Accept="application/json",
    Body=json.dumps({"instances": [[6, 55.16, 2]]}),
)
print(json.loads(resp["Body"].read()))
```

`invoke_endpoint` takes the endpoint name, a body in the format named by `ContentType`, and optionally `Accept`, `TargetVariant` for choosing a variant, and other routing options. The caller's IAM identity needs permission to invoke the endpoint.

## Running it well

- **Auto scaling.** Register the variant with Application Auto Scaling and attach a target tracking policy. The developer guide's example keeps `SageMakerVariantInvocationsPerInstance` near a target value (its sample uses 70). The scalable dimension is the variant's desired instance count. Scale-out reacts to traffic; set a sensible minimum and maximum.
- **Variants.** An endpoint configuration can hold several variants with weights, which is how you split traffic between a current model and a candidate.
- **Monitoring.** Endpoints publish invocation, latency and error metrics to CloudWatch. Lesson 18 covers monitoring model quality.
- **Delete what you are not using.** A real-time endpoint bills for its instances for as long as it exists, whether or not anyone calls it. When you finish experimenting, delete it:

```python
sm.delete_endpoint(EndpointName="churn-endpoint")
sm.delete_endpoint_config(EndpointConfigName="churn-config")
sm.delete_model(ModelName="churn-model")
```

Forgotten endpoints are one of the most common surprise charges on ML accounts. Put endpoint deletion in your notebook's last cell, and check the console for running endpoints regularly.

## Recap

An endpoint is a model, an endpoint configuration and a running deployment. Write `model_fn`, `input_fn`, `predict_fn` and `output_fn`, and test them locally. Clients call `invoke_endpoint` on the runtime client. Use auto scaling and variants as you grow, and delete idle endpoints. Next: batch transform and serverless inference, the options for when always-on is the wrong choice.
