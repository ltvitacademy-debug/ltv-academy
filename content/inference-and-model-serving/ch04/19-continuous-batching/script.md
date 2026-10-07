# Script — Continuous Batching

## Segment 1 (title)

Lesson three contrasted static and dynamic batching in general. This lesson gives you the specific technique that makes dynamic batching actually work for LLMs: continuous batching.

## Segment 2 (steps)

Classic dynamic batching runs a batch as a unit until every request in it finishes. But LLM requests finish at wildly different times, since each generates a different number of tokens. The moment the shortest one finishes, its GPU slot sits idle — the batch can't shrink or grow mid-flight, so that capacity is wasted until the whole batch ends.

## Segment 3 (steps)

Continuous batching breaks that assumption entirely. After every single decode step, the scheduler checks which requests just finished and immediately admits new ones into those now-empty slots. The batch's composition can change every iteration — no request's lifetime depends on any other's.

## Segment 4 (steps)

This only works because of PagedAttention's block-based memory model from lesson eighteen. A new request's cache can be allocated block by block on demand, without a large contiguous span reserved up front. Without that flexibility, swapping requests in and out every single step would require constant, expensive memory reshuffling.

## Segment 5 (code)

One remaining wrinkle: a new request's prefill is compute-heavy and can stall decode steps already running. Chunked prefill splits a long prompt's prefill into smaller pieces that interleave with ongoing decode steps, instead of running in exclusive isolation — a standard flag in production vLLM deployments.

## Segment 6 (outro)

Continuous batching and chunked prefill solve the scheduling problem. Next up, lesson twenty: speculative decoding, which speeds up decode itself.
