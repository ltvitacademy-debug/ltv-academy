# Script — Caching Strategies for AI Apps

## Segment 1 (title)

A call to your own database costs fractions of a cent and single-digit milliseconds. A call to an LLM provider costs real, metered money, and can take seconds. That gap is why caching matters more for AI apps than for a typical API.

## Segment 2 (code: the dollar case)

A cache hit isn't just faster here — it's a call you simply don't pay for. That's a dollar case specific to AI workloads, where every uncached request has a real, metered cost attached to it.

## Segment 3 (steps: three layers)

Exact-match caching returns a stored response for an identical prompt — simple, but narrow, since real users rarely phrase the same question the same way twice. Semantic caching compares embeddings instead, so two differently-worded questions can still hit the same cached answer. And a retrieval cache, for RAG-style apps, caches the retrieved context separately from the final generated answer.

## Segment 4 (code: safe vs. dangerous)

Static knowledge and documentation lookups are safe to cache aggressively. Live data, personalized responses, and anything where a stale answer is worse than a slow one need a real invalidation plan — because a stale semantic-cache hit reads as fluent and on-topic, and is simply wrong.

## Segment 5 (outro)

Caching cuts both cost and latency, but only with deliberate rules about what's actually safe to reuse. Next up: what to do with the requests a cache can't absorb — queueing and async processing.
