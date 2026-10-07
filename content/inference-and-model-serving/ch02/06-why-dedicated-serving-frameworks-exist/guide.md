# Why Dedicated Serving Frameworks Exist

Chapter 1 built the vocabulary: latency and throughput, the request lifecycle, batching, prefill/decode, and how to measure all of it. Chapter 2 puts that vocabulary to work by touring the frameworks teams actually deploy to serve LLMs in production: vLLM, TensorRT-LLM, and Triton Inference Server. Before looking at any one of them, this lesson answers a more basic question — why do these tools exist at all, instead of just loading a model and calling `model.generate()` in a loop?

## What you'll learn

- What a naive "just call the model in a Python loop" server gets wrong, concretely
- The four jobs a real serving framework takes on that a bare model script doesn't
- Why this problem got urgent specifically with LLMs, more than with earlier model types
- How this sets up the rest of the chapter, which covers vLLM, TensorRT-LLM, and Triton in turn

## What a naive server does wrong

Picture the simplest possible way to serve a model: a Python web server that, on each incoming request, calls the model's `generate()` function and returns the result. This works for a demo. It falls apart under real traffic for reasons that map directly onto Chapter 1's ideas:

- **No batching** — each request runs alone, so the GPU processes one request's tokens at a time instead of filling its parallel compute with multiple requests' work. Throughput collapses, because the GPU spends much of decode's already memory-bound time serving a single stream instead of several at once.
- **No continuous batching** — even if someone bolts on basic batching, a naive loop still waits for a whole batch to finish before accepting new requests, so a few long-running generations block everyone behind them (exactly the problem Lesson 3 described).
- **No KV cache management** — naive implementations often recompute or redundantly store key/value tensors inefficiently, wasting GPU memory that could otherwise support more concurrent requests.
- **No admission control or queuing** — with no mechanism to say "I'm full, queue this" versus "run it now," a naive server can either crash under load or silently stack up latency with no visibility into why.

## The four jobs a real framework takes on

- **Scheduling** — deciding, at every step, which requests run next and how they're grouped, including continuous batching so a finished request's GPU slot is reused immediately (Lesson 3, Lesson 19)
- **Memory management** — allocating and reclaiming GPU memory for the KV cache efficiently across many concurrent requests, instead of over-provisioning or fragmenting it (the subject of Chapter 4)
- **Execution optimization** — running the model's forward pass using optimized GPU kernels, sometimes with the model itself compiled or restructured for faster execution (TensorRT-LLM's specialty, Lesson 8)
- **A production-ready interface** — exposing an API (often OpenAI-compatible, so existing client code works unmodified), handling streaming responses, health checks, metrics, and multi-model or multi-replica routing

## Why LLMs made this urgent

Earlier model types (small classifiers, simple regressors) could often tolerate a thin, homemade serving layer, because their requests were short, uniform, and cheap. LLM generation breaks that assumption in every direction at once: requests vary wildly in length, generation is inherently sequential (decode can't be parallelized the way prefill can), memory pressure from the KV cache grows throughout a request's lifetime, and user-perceived latency (TTFT specifically) is far more sensitive to scheduling decisions than it was for older model types. The gap between "a model that works" and "a model that serves production traffic well" became large enough, specifically for LLMs, that an entire category of dedicated software emerged to close it.

## Where this chapter goes next

Lesson 7 covers **vLLM**, the framework best known for popularizing continuous batching and an efficient KV cache management technique called PagedAttention. Lesson 8 covers **TensorRT-LLM**, NVIDIA's framework focused on compiling and optimizing models for maximum raw execution speed on NVIDIA GPUs. Lesson 9 covers **Triton Inference Server**, a general-purpose serving layer (not LLM-specific) that can host vLLM or TensorRT-LLM as a backend alongside other model types. Lesson 10 compares all three directly, and Lesson 11 walks through an actual deployment.

## Key terms

| Term | Meaning |
|---|---|
| Naive serving loop | Calling a model's generate function directly per request, with no scheduling or batching |
| Scheduling | Deciding which requests run together, and when, at each step |
| OpenAI-compatible API | An HTTP interface matching OpenAI's request/response shape, so existing client code works unchanged |
| Execution optimization | Running the forward pass with optimized or compiled GPU kernels |

## Recap

A naive model-serving loop fails on batching, memory management, and interface concerns that production traffic exposes immediately — which is exactly the gap dedicated frameworks like vLLM, TensorRT-LLM, and Triton were built to close. Next up, Lesson 7: a close look at vLLM, the framework most teams reach for first.
