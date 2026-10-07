# Script — The KV Cache, in Depth

## Segment 1 (title)

Lesson four introduced the KV cache as the bridge between prefill and decode and left it there. This chapter exists because that cache is the single biggest operational headache in LLM serving — everything from here on is built to manage it.

## Segment 2 (steps)

Prefill computes a key and value tensor for every prompt token, at every layer, all at once. Each decode step computes one new key-value pair per layer and appends it. The KV cache is just all of those tensors, kept in GPU memory so attention never has to recompute anything already processed.

## Segment 3 (code)

The size comes down to a formula: two, for keys and values, times the number of layers, the number of KV heads, the head dimension, the sequence length, the batch size, and bytes per element. Every one of those terms multiplies — longer sequences, bigger batches, and higher precision all grow the cache directly.

## Segment 4 (steps)

Model weights are a fixed size once loaded. The cache is not — every active request holds its own growing cache, which is exactly why cache size, not raw GPU compute, so often caps how many concurrent requests a GPU can actually serve, especially with long context.

## Segment 5 (steps)

Two architectural choices attack this directly. Multi-query attention has every query head share a single key-value head, shrinking the cache a lot but costing some quality. Grouped-query attention splits heads into groups that each share one key-value head — recovering most of the quality while still cutting the cache substantially, which is why most current open-weight models use it.

## Segment 6 (outro)

That's the problem this whole chapter exists to solve. Next up, lesson eighteen: PagedAttention, which rethinks how the cache is laid out in memory in the first place.
