# Continuous Batching

Lesson 3 contrasted static and dynamic batching at a general level. This lesson gives you the specific technique that makes dynamic batching actually work well for LLMs — continuous batching — and shows how it depends on the block-based memory flexibility PagedAttention (Lesson 18) provides.

## What you'll learn

- Why request-level batching wastes GPU time on LLM workloads specifically
- How continuous (iteration-level) batching fixes that
- Why continuous batching depends on PagedAttention's flexible memory allocation
- What chunked prefill adds on top of continuous batching

## The problem with request-level batching

Classic dynamic batching groups a batch of requests together and runs them as a unit until *all* of them finish, before admitting any new request into that batch. For LLMs, this is a poor fit: requests in a batch finish at wildly different times, because each one generates a different number of output tokens. The moment the shortest request in a batch finishes, its GPU slot sits **idle** — the batch can't shrink or grow mid-flight, so that capacity is wasted until every other request in the batch also finishes and a whole new batch can be formed.

## Continuous batching: scheduling at the token-step level, not the request level

**Continuous batching** (sometimes called iteration-level scheduling) breaks the "whole batch moves together" assumption entirely. After *every single decode step*, the scheduler checks which requests have finished and immediately admits new requests to fill those now-empty slots — the batch's composition can change every iteration, not just between batches. A request's lifetime inside the running batch has nothing to do with any other request's lifetime; it joins when there's room, and it leaves the moment it's done, freeing that slot immediately for the next request in the queue.

This only works because of the memory model from Lesson 18: PagedAttention's block-based allocation lets a new request's KV cache be allocated on demand, block by block, without needing a large contiguous span reserved up front. Without that flexibility, swapping requests in and out of a batch every single step would require constant, expensive memory reshuffling — continuous batching and PagedAttention were developed together for exactly this reason, and virtually every modern LLM serving framework (vLLM, TensorRT-LLM, and others from Chapter 2) implements both.

## Chunked prefill: smoothing the mix of prefill and decode

One remaining wrinkle: a new request's prefill step (processing its whole prompt) is compute-heavy and can take meaningfully longer than a typical decode step, which can momentarily stall the decode steps of requests already running. **Chunked prefill** addresses this by splitting a long prompt's prefill into smaller chunks, each sized to fit alongside ongoing decode steps in the same iteration — rather than forcing one giant prefill to run in exclusive isolation. This keeps latency more consistent for in-flight requests even when new, long-prompt requests are arriving continuously, and it's a standard tunable in production vLLM deployments.

## Key terms

| Term | Meaning |
|---|---|
| Request-level batching | A batch runs as a fixed unit until every request in it finishes |
| Continuous batching | Scheduling decisions made every decode step; requests join/leave independently |
| Iteration-level scheduling | Another name for continuous batching, emphasizing the per-step granularity |
| Chunked prefill | Splitting a long prefill into smaller pieces interleaved with ongoing decode steps |

## Recap

Continuous batching replaces one all-or-nothing batch lifecycle with per-step scheduling, so a finished request's slot is reused immediately instead of sitting idle — and it's only practical because PagedAttention's block-based memory model from Lesson 18 lets requests join and leave without expensive reshuffling. Chunked prefill smooths the remaining friction between new arrivals and in-flight decode steps. Next up, Lesson 20: speculative decoding, which speeds up decode itself rather than just scheduling around it.
