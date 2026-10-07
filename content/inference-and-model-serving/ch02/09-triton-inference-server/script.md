# Script — Triton Inference Server

## Segment 1 (title)

Lessons seven and eight covered vLLM and TensorRT-LLM, two tools focused specifically on LLM serving. This lesson covers Triton Inference Server, NVIDIA's general-purpose serving platform, which can host almost any kind of model behind one consistent networked interface.

## Segment 2 (steps)

Triton's core idea is one consistent protocol — HTTP, gRPC, and a C API — for sending requests and getting predictions back, with a pluggable backend handling the actual execution for whatever framework a model was built with. A single Triton deployment can serve an image classifier, an ONNX model, and an LLM, all behind the same server.

## Segment 3 (steps)

A backend is the piece that knows how to run a particular kind of model. Triton ships backends for PyTorch, ONNX Runtime, TensorFlow, a Python backend for custom logic, and — directly relevant here — a dedicated vLLM backend and a dedicated TensorRT-LLM backend. You can take the exact vLLM server or TensorRT-LLM engine from the last two lessons and run it inside Triton instead of as a standalone process, gaining shared metrics, health checks, model management, and multi-model hosting on top.

## Segment 4 (code)

Triton organizes models in a model repository, with a config file per model. A minimal config for an LLM on the vLLM backend names the backend, sets dynamic batching's queue delay, and specifies how many GPU instances to run.

## Segment 5 (outro)

Triton is the general-purpose layer that can host vLLM or TensorRT-LLM behind one consistent protocol, with shared batching, ensembles, and multi-model management on top. Up next, lesson ten: putting all three frameworks side by side to decide which fits a given deployment.
