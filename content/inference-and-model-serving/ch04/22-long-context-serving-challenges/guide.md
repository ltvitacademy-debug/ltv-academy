# Long-Context Serving Challenges

Every technique in this chapter — GQA/MQA, PagedAttention, continuous batching, speculative decoding, prompt caching — exists partly because of one trend: context windows keep growing, from a few thousand tokens to hundreds of thousands, and in some models over a million. This closing lesson of Chapter 4 pulls those threads together and names what breaks, specifically, when context gets very long.

## What you'll learn

- Why the KV cache problem from Lesson 17 gets qualitatively worse, not just bigger, at long context
- Why attention compute itself becomes a serving concern at extreme lengths
- The main serving-side mitigations: chunked prefill, cache offloading, and cache quantization
- Why this chapter's techniques compound, rather than substitute for each other, at long context

## The KV cache problem, pushed to an extreme

Recall the size formula from Lesson 17: KV cache size scales linearly with sequence length, for every concurrent request. At a few thousand tokens of context, that's manageable. At a hundred thousand tokens, a single request's cache alone can consume many gigabytes — meaning a GPU that could previously serve dozens of concurrent short-context requests might only be able to serve a handful of long-context ones, no matter how good the memory layout is. This is exactly why GQA/MQA (Lesson 17) and KV cache quantization matter more, not less, as context grows: at long context, cache size — not model size — is frequently *the entire memory budget*.

## Attention compute itself becomes a bottleneck

Standard attention's compute cost grows **quadratically** with sequence length, because every token's query has to attend to every other token's key. At short-to-moderate context this is dwarfed by other costs, but at very long context the quadratic term starts to dominate prefill time specifically — a 100,000-token prompt doesn't just need 10x the cache of a 10,000-token one, it needs roughly 100x the attention compute for that portion of the forward pass. This is one of several reasons model builders have explored sparse and sliding-window attention variants at the architecture level, trading some long-range attention precision for sub-quadratic scaling — a model-side decision that shapes what a serving stack is even working with, similar to how GQA/MQA shaped the cache in Lesson 17.

## Serving-side mitigations

- **Chunked prefill (Lesson 19), essential at this scale.** A 200,000-token prompt's prefill, run as one giant uninterrupted step, would stall every other request on the GPU for a long time. Chunking it into pieces interleaved with other requests' decode steps isn't optional at long context the way it's merely helpful at shorter lengths.
- **KV cache offloading.** When a cache grows too large for GPU memory even with everything else optimized, some serving stacks offload colder, less-recently-used portions of the cache to CPU memory or fast local storage, paging them back in when needed — trading latency for the ability to serve the request at all.
- **KV cache quantization, revisited.** Storing the cache itself in INT8 or FP8 (mentioned in Lesson 17) becomes a much higher-leverage lever at long context specifically, because the cache is the dominant cost there, not the model weights.

## This chapter's techniques compound at long context

None of Chapter 4's techniques are substitutes for each other at long context — they stack. GQA/MQA reduces how fast the cache grows per token; PagedAttention keeps whatever cache exists from being wasted on fragmentation; prompt caching avoids recomputing a long, reused prefix (a system prompt plus a long reference document, say) across turns of the same conversation; chunked prefill keeps one long request from starving everyone else; and cache quantization shrinks what's left. Long context is less a single problem than a forcing function that makes every other lesson in this chapter matter simultaneously.

## Key terms

| Term | Meaning |
|---|---|
| Quadratic attention cost | Standard attention compute grows with the square of sequence length |
| Sliding-window / sparse attention | Architecture-level variants trading some long-range precision for sub-quadratic scaling |
| KV cache offloading | Moving colder cache portions to CPU/storage when GPU memory is insufficient |
| Forcing function | A constraint (long context) that makes multiple otherwise-optional techniques mandatory |

## Recap

Long context doesn't introduce a new problem so much as it amplifies the KV cache cost from Lesson 17 and adds a quadratic attention compute cost on top of it, which is why chunked prefill, cache offloading, and cache quantization all become load-bearing rather than optional. That closes Chapter 4 — you now have the full LLM-specific serving toolkit. Chapter 5 turns from optimizing one model's serving to scaling an entire inference service across GPUs and traffic patterns.
