# Script — TensorRT-LLM, Overview

## Segment 1 (title)

Lesson seven covered vLLM, which optimizes scheduling and memory. This lesson covers TensorRT-LLM, NVIDIA's library that takes a complementary approach: compiling the model itself into the fastest possible executable form for a specific GPU.

## Segment 2 (steps)

Most models run inference through a general-purpose framework like PyTorch, which is flexible but leaves performance on the table, executing each operation as a fairly separate step with overhead in between. TensorRT-LLM instead compiles a trained model into an optimized, GPU-specific engine ahead of time, using NVIDIA's TensorRT compiler as its foundation. You trade flexibility — you need to rebuild the engine if hardware or certain settings change — for execution that typically runs meaningfully faster than the same model run naively.

## Segment 3 (steps)

The compiler applies kernel fusion, combining multiple small GPU operations into fewer, larger ones. It has strong quantization support, running models at reduced precision like FP8 or INT8. It implements in-flight batching, its own name for a continuous-batching-style technique. And it uses a paged approach to KV cache memory, arriving independently at an idea similar to vLLM's PagedAttention.

## Segment 4 (code)

The workflow has two main steps: convert the checkpoint into TensorRT-LLM's format, then run trtllm-build to compile it into an engine, baking in decisions about batch size, precision, and GPU-specific kernels. That engine is typically served through Triton's dedicated TensorRT-LLM backend.

## Segment 5 (outro)

TensorRT-LLM answers how to make one specific model run as fast as possible on one specific GPU; Triton answers how to expose that as a reliable networked service. Up next, lesson nine: Triton Inference Server.
