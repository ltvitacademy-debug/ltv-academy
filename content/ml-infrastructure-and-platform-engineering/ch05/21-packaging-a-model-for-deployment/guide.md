# Packaging a Model for Deployment

A model that only runs inside the notebook that trained it isn't deployed — it's a demo. Packaging is the step that turns a training artifact (a pickle file, a set of TensorFlow weights, a PyTorch checkpoint) into something a serving system can load, run, and scale without ever touching the original training code again. Get this step wrong and every deployment problem downstream gets harder: version drift, "works on my laptop," and dependency hell all start here.

## What you'll learn

- Why the serialization format you choose constrains everything that can serve the model later
- How to containerize a model so the serving environment matches the training environment
- The shape of a KServe `InferenceService` and a Seldon Core `SeldonDeployment`
- How SageMaker's `create_model` / `create_endpoint_config` / `create_endpoint` calls fit together
- Why "packaged" means more than "serialized" — it means versioned, reproducible, and runnable by something other than you

## Choosing a serialization format

A trained model is just numbers until it's written to disk in a specific format, and the format you pick determines who can serve it later:

- **Pickle / joblib** — native to scikit-learn, trivial to write, but Python-version-sensitive and a security risk if you ever load an untrusted file. Fine for internal tooling, risky as a long-term artifact format.
- **ONNX** — a framework-neutral graph format. Export a PyTorch or TensorFlow model to ONNX and it can be served by any ONNX-compatible runtime, in C++, Java, or a browser, without the original framework installed.
- **TorchScript / SavedModel** — framework-native "serving" formats (PyTorch's `torch.jit.trace`, TensorFlow's `SavedModel` directory) that strip out Python-only dependencies while staying in the native framework's optimized runtime.

The rule of thumb: pickle for quick internal use, ONNX when you need cross-framework or cross-language portability, and the framework's own native serving format when you're staying inside that framework's ecosystem end to end.

## Containerizing the model

Once the artifact is serialized, it gets built into a container image alongside a model server (e.g., `mlserver`, TensorFlow Serving, TorchServe) so the exact runtime, library versions, and system dependencies travel with the model instead of depending on whatever happens to be installed on the target machine. A typical layout:

```dockerfile
FROM python:3.11-slim
RUN pip install mlserver mlserver-sklearn==1.6.0
COPY model.pkl /mnt/models/model.pkl
COPY model-settings.json /mnt/models/model-settings.json
CMD ["mlserver", "start", "/mnt/models"]
```

This image is what actually gets referenced by a Kubernetes-based serving platform — not the pickle file by itself.

## Packaging for KServe

KServe wraps the container step for you when you're using one of its built-in predictors: point an `InferenceService` at a model artifact in object storage and KServe builds and runs the serving container.

```yaml
apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: fraud-detector
  namespace: ml-serving
spec:
  predictor:
    model:
      modelFormat:
        name: sklearn
      storageUri: s3://ml-models/fraud-detector/3/
      resources:
        requests:
          cpu: "1"
          memory: 2Gi
        limits:
          cpu: "2"
          memory: 4Gi
```

`storageUri` points at the serialized artifact (not a container you built yourself); `modelFormat.name` tells KServe which built-in server to launch to read it.

## Packaging for Seldon Core

Seldon Core's `SeldonDeployment` custom resource does the same job with a slightly different shape, built around a prediction graph:

```yaml
apiVersion: machinelearning.seldon.io/v1
kind: SeldonDeployment
metadata:
  name: fraud-detector
spec:
  predictors:
    - name: default
      replicas: 2
      graph:
        name: classifier
        implementation: SKLEARN_SERVER
        modelUri: s3://ml-models/fraud-detector/3/
```

The `graph` field is what lets Seldon chain multiple components (a preprocessor, the model, an outlier detector) into one request path — something KServe's simpler predictor spec doesn't do natively.

## Packaging for SageMaker

SageMaker splits packaging into three explicit API calls instead of one YAML manifest:

```python
import boto3

sm = boto3.client("sagemaker")

sm.create_model(
    ModelName="fraud-detector-v3",
    ExecutionRoleArn="arn:aws:iam::123456789012:role/SageMakerExecutionRole",
    PrimaryContainer={
        "Image": "683313688378.dkr.ecr.us-east-1.amazonaws.com/sklearn-inference:1.0-1",
        "ModelDataUrl": "s3://ml-models/fraud-detector/3/model.tar.gz",
    },
)

sm.create_endpoint_config(
    EndpointConfigName="fraud-detector-config-v3",
    ProductionVariants=[{
        "VariantName": "AllTraffic",
        "ModelName": "fraud-detector-v3",
        "InstanceType": "ml.m5.large",
        "InitialInstanceCount": 2,
    }],
)

sm.create_endpoint(
    EndpointName="fraud-detector",
    EndpointConfigName="fraud-detector-config-v3",
)
```

`create_model` registers the artifact and the serving container, `create_endpoint_config` defines the hardware and traffic split, and `create_endpoint` actually stands up the running infrastructure. Splitting these apart is what makes blue-green and canary rollouts possible later — you can create a new config pointing at a new model without touching the live endpoint until you're ready.

## Key terms

| Term | Meaning |
|---|---|
| Serialization format | The on-disk representation of a trained model (pickle, ONNX, SavedModel, TorchScript) |
| Model server | A runtime (mlserver, TensorFlow Serving, TorchServe) that loads a serialized artifact and exposes it over HTTP/gRPC |
| `InferenceService` | KServe's custom resource describing a deployed model and its storage location |
| `SeldonDeployment` | Seldon Core's custom resource describing a prediction graph of one or more components |
| `ModelDataUrl` | The S3 location of a packaged model artifact referenced by a SageMaker model |

## Recap

Packaging turns a training artifact into something a serving platform can actually run: pick a serialization format that matches how portable the model needs to be, containerize it so the runtime travels with it, and describe it to your serving platform — an `InferenceService`, a `SeldonDeployment`, or a trio of SageMaker API calls. Next, in Lesson 22, you'll see how that packaged artifact moves through an automated CI/CD pipeline instead of a manual `kubectl apply`.
