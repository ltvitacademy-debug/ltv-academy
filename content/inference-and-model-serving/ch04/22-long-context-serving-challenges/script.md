# Script — Long-Context Serving Challenges

## Segment 1 (title)

Every technique in this chapter exists partly because context windows keep growing, from a few thousand tokens to hundreds of thousands. This closing lesson names what breaks, specifically, when context gets very long.

## Segment 2 (steps)

Recall the size formula from lesson seventeen: KV cache scales linearly with sequence length, for every concurrent request. At a hundred thousand tokens, a single request's cache alone can consume gigabytes, meaning a GPU that served dozens of short-context requests might only serve a handful of long-context ones. At that scale, cache size, not model weight size, is frequently the entire memory budget.

## Segment 3 (steps)

Attention compute adds a second cost. Standard attention grows quadratically with sequence length, because every token's query attends every other token's key. A prompt ten times longer needs roughly a hundred times the attention compute for that portion of the pass — which is part of why some model builders use sparse or sliding-window attention instead, a model-side trade-off that shapes what the serving stack even has to work with.

## Segment 4 (steps)

On the serving side, three mitigations matter most. Chunked prefill stops one enormous prompt from stalling every other request. KV cache offloading moves colder portions of the cache to CPU memory or storage when it won't fit on the GPU. And KV cache quantization becomes a much higher-leverage lever here specifically, because the cache is the dominant cost.

## Segment 5 (steps)

None of this chapter's techniques substitute for each other at long context — they stack. GQA and PagedAttention shrink and de-fragment the cache, prompt caching avoids recomputing a long reused prefix, chunked prefill keeps one request from starving everyone else, and quantization shrinks what's left.

## Segment 6 (outro)

That closes chapter four — you now have the full LLM-specific serving toolkit. Chapter five turns from optimizing one model's serving to scaling a whole inference service across GPUs and traffic.
