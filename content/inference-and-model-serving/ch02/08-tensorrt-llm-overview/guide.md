# TensorRT-LLM, Overview

Lesson 7 covered vLLM, a framework that optimizes scheduling and memory. This lesson covers TensorRT-LLM, NVIDIA's open-source library that takes a different-but-complementary approach: instead of focusing mainly on scheduling, it focuses on compiling the model itself into the fastest possible executable form for a specific NVIDIA GPU. Understanding both approaches is what lets you reason about which framework — or which combination — fits a given deployment.

## What you'll learn

- What "compiling" a model for inference actually means, and why it can make execution faster than running the same model in a general-purpose framework like PyTorch
- The key optimization techniques TensorRT-LLM applies: kernel fusion, quantization support, and in-flight batching
- How TensorRT-LLM relates to Triton Inference Server (previewed here, covered fully in Lesson 9)
- The basic shape of a TensorRT-LLM build-and-serve workflow

## Compiling a model for inference

Most models are trained and initially run using a general-purpose deep learning framework like PyTorch, which is flexible but leaves real performance on the table at inference time: it executes each operation (each matrix multiply, each activation function) as a fairly separate step, with overhead between them. TensorRT-LLM takes a trained model and **compiles** it into an optimized "engine" — a GPU-specific, ahead-of-time-optimized executable — using NVIDIA's TensorRT deep learning inference compiler as its foundation. Compiling trades flexibility (you need to rebuild the engine if you change hardware or certain model settings) for speed: the compiled engine typically runs meaningfully faster than the same model executed naively, because the compiler has already made decisions a general-purpose framework makes freshly on every run.

## Key optimizations TensorRT-LLM applies

- **Kernel fusion** — combining multiple small GPU operations into fewer, larger ones, reducing the overhead of launching many separate GPU kernels back to back
- **Quantization support** — TensorRT-LLM has strong built-in support for running models at reduced numerical precision (FP8, INT8, and other formats; Chapter 3 covers quantization in depth), which shrinks both memory footprint and compute time with a carefully managed accuracy trade-off
- **In-flight batching** — TensorRT-LLM's own name for a continuous-batching-style technique, letting new requests join a running batch without waiting for the whole batch to finish, conceptually similar to what Lesson 3 described for vLLM
- **Paged KV cache** — TensorRT-LLM also implements a paged approach to KV cache memory, independently arriving at a similar idea to vLLM's PagedAttention, for the same underlying reason: efficient memory use under many concurrent, variable-length requests

## How TensorRT-LLM relates to Triton

TensorRT-LLM by itself is a library for building and running optimized inference engines — it isn't, on its own, a full networked server with an HTTP API, request queuing across replicas, or multi-model hosting. In practice, most production deployments pair TensorRT-LLM with **Triton Inference Server** (Lesson 9), using Triton's dedicated TensorRT-LLM backend to expose the compiled engine as a networked, production-ready service. Think of the split this way: TensorRT-LLM answers "how do I make this specific model run as fast as possible on this specific GPU," while Triton answers "how do I expose any model, including this one, as a reliable networked service."

## The build-and-serve workflow, at a glance

A TensorRT-LLM workflow typically looks like this:

```bash
# 1. Convert the model checkpoint into TensorRT-LLM's format
python3 convert_checkpoint.py \
  --model_dir ./llama-3.1-8b \
  --output_dir ./checkpoint_fp16 \
  --dtype float16

# 2. Build the optimized engine for the target GPU
trtllm-build \
  --checkpoint_dir ./checkpoint_fp16 \
  --output_dir ./engine_fp16 \
  --gemm_plugin float16 \
  --max_batch_size 64

# 3. Serve the engine (commonly via Triton's TensorRT-LLM backend)
```

Step 2 is where the real compilation happens — the build step bakes in decisions about batch size, precision, and GPU-specific kernel choices, which is why the resulting engine is tied to the hardware and settings it was built for.

## Key terms

| Term | Meaning |
|---|---|
| Compiled engine | A GPU-specific, ahead-of-time-optimized executable produced from a trained model |
| Kernel fusion | Combining multiple GPU operations into fewer, larger ones |
| In-flight batching | TensorRT-LLM's term for continuous-batching-style request admission |
| `trtllm-build` | The command that compiles a converted checkpoint into a runnable engine |

## Recap

TensorRT-LLM optimizes the model's execution itself through compilation, kernel fusion, quantization, and in-flight batching, and is typically paired with Triton Inference Server for the production-facing networking layer. Next up, Lesson 9: Triton Inference Server, the piece that completes this picture.
