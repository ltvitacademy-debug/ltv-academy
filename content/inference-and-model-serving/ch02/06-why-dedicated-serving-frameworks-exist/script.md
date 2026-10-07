# Script — Why Dedicated Serving Frameworks Exist

## Segment 1 (title)

Chapter one built the vocabulary — latency, throughput, batching, prefill and decode. Chapter two tours the frameworks teams actually deploy: vLLM, TensorRT-LLM, and Triton Inference Server. First, a more basic question: why do these tools exist at all, instead of just calling a model's generate function in a loop?

## Segment 2 (steps)

A naive server that calls generate per request works for a demo and falls apart under real traffic. There's no batching, so the GPU processes one request at a time. There's no continuous batching, so long-running generations block everyone behind them. There's no KV cache management, wasting GPU memory. And there's no admission control, so the server either crashes under load or silently stacks up latency with no visibility into why.

## Segment 3 (steps)

A real framework takes on four jobs. Scheduling decides which requests run together at every step, including continuous batching. Memory management allocates and reclaims KV cache space efficiently across many concurrent requests. Execution optimization runs the forward pass with optimized or compiled GPU kernels. And a production interface exposes an often OpenAI-compatible API with streaming, health checks, and metrics.

## Segment 4 (steps)

This chapter covers three of them. vLLM popularized continuous batching and an efficient memory technique called PagedAttention. TensorRT-LLM is NVIDIA's framework focused on compiling models for maximum raw execution speed. And Triton Inference Server is a general-purpose serving layer that can host either one as a backend.

## Segment 5 (outro)

The gap between a model that works and a model that serves production traffic well is exactly what these frameworks close. Up next, lesson seven: a close look at vLLM, the framework most teams reach for first.
