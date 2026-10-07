# The KV Cache, Conceptually

The last lesson named the KV cache as the reason decode is memory-bandwidth-bound rather than compute-bound. This lesson opens that up: what's actually being cached, why it grows the way it does, and why its size — not raw compute — is usually the thing that limits how many requests a serving system can handle at once.

## What you'll learn

- What "key" and "value" tensors are, in terms you already have from attention
- Why decode needs to cache them instead of recomputing attention from scratch
- How KV cache size scales with sequence length, layers, heads, and batch size
- Why GQA and MQA exist specifically to shrink this number
- How KV cache memory competes directly with batch size for the same GPU memory

## Why caching exists at all

In self-attention, every token's output depends on query, key, and value projections of every token that came before it. During training, the whole sequence is available at once, so this is one large, parallel, compute-bound matrix operation. During decode, tokens appear one at a time: to generate token *t+1*, the model needs the key and value vectors for tokens *1* through *t* again. Recomputing all of those key/value projections from scratch at every single step would mean the cost of generating token *t* grows with *t* squared across the whole sequence — wasteful, and avoidable, because the key and value vectors for already-generated tokens never change. The KV cache simply stores them the first time they're computed and reuses them on every subsequent step, turning an O(t²) recomputation into an O(t) cache lookup plus one new token's worth of work.

## How big the cache gets

The size of the KV cache for one sequence is driven by a small set of numbers, and it's worth being able to reason about the order of magnitude:

```python
# Per-sequence KV cache size (bytes), at a given point in decoding
# 2x for K and V, both stored
cache_bytes = 2 * num_layers * num_kv_heads * head_dim * seq_len * bytes_per_element

# Example: a 32-layer model, 8 KV heads (GQA), head_dim 128, bf16 (2 bytes),
# at a 8k-token sequence:
# 2 * 32 * 8 * 128 * 8192 * 2 bytes  ≈  1.1 GB -- for ONE sequence
```

That number scales linearly with sequence length and with batch size (every concurrent request needs its own cache), which is exactly why long-context, high-concurrency serving is a memory problem first and a compute problem second.

## Why GQA and MQA exist

Plain multi-head attention (MHA) keeps a separate key/value projection per attention head — `num_kv_heads` equals the number of query heads. **Grouped-query attention (GQA)** shares one key/value head across a group of query heads, and **multi-query attention (MQA)** takes this to the extreme of a single shared KV head for all query heads. Both cut `num_kv_heads` in the formula above directly, shrinking the cache by the same factor — often 4-8x for GQA — with a modest, usually acceptable quality cost. This is why most current open-weight models (Llama 3, Mistral, Qwen2, and others) use GQA rather than full MHA: it's primarily an inference-cost decision, made at pretraining time.

## The memory tradeoff that actually limits serving

GPU memory at serving time has to hold the model weights and the KV caches for every in-flight sequence simultaneously. Weights are fixed; KV cache memory is not — it grows with every concurrent request and every token generated. This is why serving systems like vLLM exist around techniques like **PagedAttention**, which manages KV cache memory in non-contiguous blocks (conceptually similar to OS virtual memory paging) so memory isn't wasted on over-allocated, under-used sequence slots. The practical consequence for a training team: a model's effective max batch size at serving time is often set by KV cache memory, not by the GPU's raw compute throughput.

## Key terms

- **KV cache** — stored key and value tensors from previous decode steps, reused instead of recomputed
- **Grouped-query attention (GQA)** — multiple query heads share one key/value head, shrinking the cache
- **Multi-query attention (MQA)** — all query heads share a single key/value head, the most aggressive cache reduction
- **PagedAttention** — vLLM's technique for managing KV cache memory in non-contiguous blocks to avoid waste
