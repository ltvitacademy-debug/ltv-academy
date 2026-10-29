# Lesson 14 — Model Serving Frameworks and What They Actually Solve

**Chapter 4 · Model Serving and Inference Infrastructure · Lesson 2 of 4**

## What you'll learn

- Why wrapping `model.predict()` in a Flask route works in a demo and
  falls apart in production
- The four concrete problems a real model-serving framework solves:
  model lifecycle, request batching, multi-model serving, and a
  standardized inference protocol
- What NVIDIA Triton Inference Server, TorchServe, and KServe each
  actually are, and where one layers on top of another
- Where vLLM and Ray Serve fit for LLM-specific serving

## The demo that doesn't survive production

It's genuinely easy to serve a model badly: load the weights at
import time, write a Flask route that calls `model.predict(request)`,
and return JSON. It works for a demo. It falls over fast in
production, because none of the following are handled: what happens
when ten concurrent requests hit a single-process Flask app and the
GPU sits idle between them one at a time, what happens when you need
to deploy model version 2 without dropping requests mid-rollout, and
what happens when you have twelve different models and don't want
twelve different hand-rolled servers each reimplementing the same
plumbing. A real serving framework exists to solve exactly those
problems, generically, so every model doesn't need its own bespoke
server.

## Problem 1: model lifecycle

Loading a model's weights into GPU memory is not free — it can take
seconds to minutes depending on size. A serving framework loads each
model once, keeps it warm, and manages versioning so you can push a
new version and roll traffic to it (or roll back) without redeploying
from scratch or dropping requests.

## Problem 2: request batching

As covered in Lesson 13, a GPU processes a batch of concurrent
requests almost as efficiently as one. Hand-rolling that logic
correctly — timing windows, partial batches, returning the right
slice to the right caller — is genuinely fiddly. Serving frameworks
implement **dynamic batching** as a configuration option, not
something you write yourself.

## Problem 3: multi-model serving on shared infrastructure

Running one GPU-backed pod per model is wasteful when most of your
models are small relative to the GPU's memory, or get traffic
unevenly. Frameworks like Triton and KServe can host multiple models
— even multiple versions of the same model — on one serving process
or one fleet, routing each request by model name instead of you
standing up a separate deployment per model.

## Problem 4: a standard protocol instead of bespoke glue

Without a standard, every model's server has its own request/response
shape, and every piece of infrastructure around it (load balancers,
gateways, client SDKs) needs model-specific code. KServe standardizes
this with its **V2 inference protocol** and the `InferenceService`
Kubernetes custom resource, so the rest of your platform can talk to
any model the same way.

## The real tools, and how they layer

- **NVIDIA Triton Inference Server** — a multi-framework serving
  runtime (TensorRT, PyTorch, ONNX Runtime, Python backends) with
  dynamic batching, concurrent model execution on one GPU, and
  multi-model hosting built in. Often the thing actually running
  inside the pod.
- **TorchServe** — PyTorch's own model-serving tool: package a model
  and a handler script into a `.mar` archive, and it handles batching,
  versioning, and metrics for PyTorch models specifically.
- **TensorFlow Serving** — the equivalent for TensorFlow
  SavedModels, with the same core goals: versioned, low-overhead
  serving of a specific framework's models.
- **KServe** — doesn't replace Triton or TorchServe; it sits *above*
  them on Kubernetes, built on Knative and Istio, giving you the
  `InferenceService` CRD, autoscaling including scale-to-zero, canary
  rollouts between model versions, and a standard protocol — while
  Triton or TorchServe can run underneath as the actual predictor.
- **Seldon Core** — a similar Kubernetes-native layer, with support
  for more complex inference graphs (pre/post-processing steps,
  ensembles) in front of the model itself.
- **BentoML / Ray Serve** — Python-native frameworks for packaging
  and serving models as services, popular when the team wants to stay
  in Python rather than YAML-and-containers for the serving logic.
- **vLLM** — serving built specifically for large language models,
  using PagedAttention and continuous batching to get far higher LLM
  throughput than a generic framework manages for that workload.

A minimal KServe `InferenceService` shows the standardization these
tools are after:

```yaml
apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: fraud-classifier
spec:
  predictor:
    triton:
      storageUri: "gs://models/fraud-classifier/"
      runtimeVersion: "23.10-py3"
      resources:
        limits:
          nvidia.com/gpu: 1
```

Note what's *not* in that spec: no Deployment, no Service, no
Ingress, no HPA — KServe generates all of it for you underneath,
which is the whole point of the standardization layer.

## Key terms

| Term | Meaning |
|---|---|
| NVIDIA Triton Inference Server | Multi-framework serving runtime with dynamic batching and multi-model hosting; often the process actually running predictions |
| TorchServe / TensorFlow Serving | Framework-native serving tools for PyTorch and TensorFlow models respectively |
| KServe | Kubernetes-native serving layer (built on Knative/Istio) providing the `InferenceService` CRD, standard protocol, and scale-to-zero autoscaling on top of a predictor like Triton |
| vLLM | Serving framework purpose-built for LLM throughput via continuous batching and PagedAttention |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking:
what four concrete problems does a real serving framework solve that
a hand-rolled Flask wrapper around `model.predict()` doesn't, and how
does KServe's relationship to Triton differ from Triton's relationship
to the model itself?
