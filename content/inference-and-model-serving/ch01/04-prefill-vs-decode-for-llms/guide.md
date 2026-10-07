# Prefill vs. Decode, for LLMs

Every lesson so far has referenced "prefill" and "decode" without fully unpacking them. This lesson makes that split the main event, because it's the single most important fact about how LLM inference actually runs on a GPU — and it's the reason LLM serving needed its own specialized frameworks (Chapter 2) instead of reusing generic model-serving tools.

## What you'll learn

- What happens, computationally, during prefill versus during decode
- Why prefill is compute-bound and decode is memory-bound — and what that means for GPU utilization
- Why this split is the reason input tokens and output tokens get priced and measured differently
- How the KV cache (previewed here, covered fully in Chapter 4) connects the two phases

## Prefill: processing the whole prompt at once

When a request arrives, the model first processes the entire input prompt in a single forward pass — every prompt token is run through every layer of the model at once, in parallel. This phase is called **prefill**. Its job is to build up the internal representations (specifically, the key and value tensors used by attention) for every token the model has been given so far, so that generation can begin.

Prefill is **compute-bound**: because all prompt tokens are processed together, the GPU's matrix-multiplication units stay busy and well-utilized. A longer prompt means more compute, scaling roughly with the number of prompt tokens (for the attention step, superlinearly as context grows very long) — but the GPU is working hard the whole time, not sitting idle waiting on memory.

## Decode: producing one token at a time

Once prefill finishes, the model enters **decode**: it generates output tokens one at a time, and each new token depends on every token generated before it (this is what "autoregressive" means). Each decode step is a forward pass for a single new token — but it still has to read the key/value tensors for every prior token (prompt plus everything generated so far) out of the **KV cache** stored in GPU memory, in order to compute attention correctly.

Decode is **memory-bound**: the actual compute for one token is small, but the GPU spends much of its time moving data (the growing KV cache) rather than doing math, which under-utilizes the GPU's compute units. This is precisely why batching matters so much for decode specifically — running many requests' decode steps together lets the GPU do more useful compute per memory fetch, which is the whole premise behind continuous batching (Lesson 19).

## Why this split drives everything downstream

- **Pricing**: most LLM APIs charge differently for input (prompt) tokens than output (generated) tokens, roughly tracking the fact that prefill and decode have very different cost profiles per token
- **Throughput reporting**: serving frameworks report prefill throughput and decode throughput separately, because they're bound by different resources (compute vs. memory bandwidth) and don't scale the same way with batch size
- **Specialized frameworks**: generic model-serving tools weren't built around this prefill/decode asymmetry. vLLM, TensorRT-LLM, and other LLM-specific frameworks (Chapter 2) are built from the ground up to keep both phases efficient — in particular, to keep the GPU busy during decode despite it being memory-bound, and to manage the KV cache that connects the two phases

## The KV cache: the bridge between the two phases

The key/value tensors prefill computes don't get thrown away once decode starts — they're kept in GPU memory as the **KV cache**, and every new decode step reads the whole cache so far and then adds one more entry to it. The cache grows with every generated token, and for long conversations or long documents it can consume more GPU memory than the model's own weights. Chapter 4 is devoted entirely to managing this cache efficiently (including a technique called PagedAttention) — for now, just hold onto the idea that prefill *builds* the cache and decode *extends and reads* it, one token at a time.

## Key terms

| Term | Meaning |
|---|---|
| Prefill | Processing the entire input prompt in one parallel forward pass |
| Decode | Generating output tokens one at a time, each depending on all prior tokens |
| Compute-bound | Limited by how fast the GPU can do math (prefill's bottleneck) |
| Memory-bound | Limited by how fast data can move through memory (decode's bottleneck) |
| KV cache | Stored key/value tensors for every token processed so far, read and extended at each decode step |

## Recap

Prefill processes the whole prompt in parallel and is compute-bound; decode generates one token at a time and is memory-bound, because it has to keep reading a growing KV cache. That asymmetry is why LLM serving looks so different from serving a classic model, and it's the reason the whole next chapter exists. Next up, Lesson 5: how to actually measure inference performance across both phases, so these ideas become numbers you can act on.
