# Triton Inference Server

Lessons 7 and 8 covered vLLM and TensorRT-LLM, two tools focused specifically on LLM serving. This lesson covers Triton Inference Server, NVIDIA's open-source serving platform, which takes a broader view: it's a general-purpose model server that can host almost any kind of model — LLMs, image classifiers, recommendation models, speech models — behind one consistent networked interface, using different "backends" for different frameworks underneath.

## What you'll learn

- What Triton is and why it's framework-agnostic rather than LLM-specific
- How Triton's backend system lets it host vLLM, TensorRT-LLM, PyTorch, ONNX, and other model types side by side
- Triton's own dynamic batcher and model-ensemble features
- The basic shape of a Triton model repository and config file

## What Triton is, and why it's broader than vLLM or TensorRT-LLM

Triton Inference Server started as a way to standardize serving across many different model frameworks, well before the current wave of LLM-specific tooling. Its core idea: define one consistent protocol (HTTP/REST and gRPC, plus a C API) for sending inference requests and getting predictions back, and let a pluggable **backend** handle the actual execution for whatever framework a given model was built with. That means a single Triton deployment can serve a PyTorch image classifier, an ONNX Runtime model, and an LLM running on vLLM or TensorRT-LLM, all behind the same server and the same client protocol — genuinely useful for organizations running many different kinds of models, not just LLMs.

## Backends: how Triton stays framework-agnostic

A **backend** is the piece of Triton that knows how to actually run a particular kind of model. Triton ships backends for PyTorch (LibTorch), ONNX Runtime, TensorFlow, Python (for custom logic), and — directly relevant to this chapter — a dedicated **vLLM backend** and a dedicated **TensorRT-LLM backend**. This is the connective tissue between Lessons 7–8 and this lesson: you can take the exact vLLM server or TensorRT-LLM engine from those lessons and run it *inside* Triton instead of as a standalone process, gaining Triton's shared infrastructure (metrics, health checks, model management, multi-model hosting) on top.

## Triton's own batching and ensemble features

- **Dynamic batcher** — Triton has its own general-purpose dynamic batching system (the same concept from Lesson 3: max batch size and max queue delay as the two tunable knobs), usable by any backend, not just LLM-specific ones
- **Model ensembles** — Triton can chain multiple models together into a single logical pipeline (for example: a preprocessing model, then the main model, then a postprocessing model), so a client makes one request and Triton handles routing between the steps internally
- **Concurrent model execution** — Triton can run multiple models, or multiple instances of the same model, on one GPU simultaneously when there's spare capacity, improving overall GPU utilization across a fleet of different models

## The model repository and config, at a glance

Triton organizes models on disk as a **model repository**: a directory where each subdirectory is one model, containing versioned model files and a `config.pbtxt` configuration file. A minimal config for an LLM served via the vLLM backend looks roughly like this:

```protobuf
name: "llama-3-8b-instruct"
backend: "vllm"
max_batch_size: 0

dynamic_batching {
  max_queue_delay_microseconds: 2000
}

instance_group [
  { count: 1, kind: KIND_GPU }
]
```

Triton reads this file to know which backend to load, how to batch requests, and how many GPU instances of the model to run. Pointing Triton at a model repository and starting the server is typically a single command (`tritonserver --model-repository=/models`), after which the server exposes its HTTP/gRPC endpoints automatically.

## Key terms

| Term | Meaning |
|---|---|
| Backend | The Triton component that executes a specific model framework (vLLM, TensorRT-LLM, PyTorch, etc.) |
| Model repository | The directory structure Triton reads to discover and load models |
| `config.pbtxt` | Per-model configuration file specifying backend, batching, and instance settings |
| Model ensemble | A chained pipeline of multiple models served as one logical request |

## Recap

Triton Inference Server is the general-purpose layer that can host vLLM or TensorRT-LLM (or many other frameworks) behind one consistent protocol, adding shared batching, ensembles, and multi-model management on top. Next up, Lesson 10: putting vLLM, TensorRT-LLM, and Triton side by side to decide which fits a given deployment.
