# The KV Cache, in Depth

Lesson 4 introduced the KV cache as "the bridge between prefill and decode" and left it there. This chapter exists because that cache is the single biggest operational headache in LLM serving — it's what every technique from here on (PagedAttention, continuous batching, prompt caching) is built to manage. This lesson gives you the actual numbers and the architectural tricks that make the cache tractable at all.

## What you'll learn

- Exactly what gets stored in the KV cache, and the formula for how big it gets
- Why the cache, not the model's weights, is often the binding memory constraint
- How grouped-query attention (GQA) and multi-query attention (MQA) shrink the cache at the architecture level
- Why this chapter's remaining lessons all exist because of this one problem

## What's actually in the cache

During attention, every token produces a **key** vector and a **value** vector at every layer. Prefill computes these for the whole prompt at once; each decode step computes one new key/value pair per layer and appends it. The **KV cache** is simply all of those key and value tensors, kept in GPU memory so that attention at decode time doesn't have to recompute keys and values for every prior token from scratch — it only has to run the new token through, then read everything already cached.

## The size formula, and why it gets out of hand

The KV cache's size, in bytes, is roughly:

```
2 × num_layers × num_kv_heads × head_dim × seq_len × batch_size × bytes_per_element
```

The leading 2 is for storing both keys and values. Every term in that formula grows the cache: more layers, longer sequences, bigger batches, and higher precision (bytes per element) all multiply directly against each other. For a mid-size open-weight model with a few dozen layers, this can mean the KV cache for a handful of long-context requests rivals or exceeds the size of the model's own weights in GPU memory — which is precisely why the number of concurrent long-context requests a GPU can serve is so often capped by cache size, not by compute. This is also why reducing a model's numeric precision (Lesson 12) helps the KV cache too, not just the weights — many serving stacks quantize the cache itself to INT8 or FP8 independently of the model's weight precision.

## Shrinking the cache at the architecture level: GQA and MQA

Standard **multi-head attention (MHA)** gives every attention head its own key and value projection — more heads, proportionally more cache. Two architectural variants cut this directly:

- **Multi-query attention (MQA)** — all query heads share a single key/value head. This shrinks the KV cache by roughly the number of heads, at some cost to model quality, since much less distinct information is kept per head.
- **Grouped-query attention (GQA)** — a middle ground: query heads are split into groups, and each group shares one key/value head. GQA recovers most of MHA's quality while still cutting the cache substantially (commonly by a factor in the range of 4-8x depending on the group count), which is why most current open-weight LLMs use GQA rather than full MHA or full MQA.

Crucially, this is a choice made when the model is *trained*, not something a serving framework can retrofit — but it directly determines how large a cache the serving framework you choose (Chapter 2) has to manage.

## Key terms

| Term | Meaning |
|---|---|
| KV cache | Stored key/value tensors for every token processed so far, per layer |
| Multi-head attention (MHA) | Standard attention where every head has its own key/value projection |
| Multi-query attention (MQA) | All query heads share one key/value head, minimizing cache size |
| Grouped-query attention (GQA) | Query heads grouped, each group sharing one key/value head |
| KV cache quantization | Storing cached keys/values at lower precision (e.g. INT8/FP8) to shrink memory |

## Recap

The KV cache grows with every term in a simple formula — layers, heads, sequence length, batch size, precision — and in practice it's often the real ceiling on how many requests a GPU can serve concurrently, not raw compute. GQA and MQA attack this at the model's architecture level; everything else in this chapter attacks it at the serving level. Next up, Lesson 18: PagedAttention, which rethinks how the cache is laid out in memory in the first place.
