# Lesson 19 — Caching Strategies for AI Apps

**Chapter 4 · Scaling & Reliability · Lesson 19 of 25**

## What you'll learn

- Why caching matters more for AI apps than for most web APIs, in pure
  dollar terms
- Three distinct things an AI app can cache, at three different layers
- Why exact-match caching misses most of the opportunity, and what semantic
  caching does instead
- The one thing that's dangerous to cache without a care: anything
  dependent on data that changes

## The dollar case for caching, specifically

A typical API call to your own database costs fractions of a cent and
single-digit milliseconds. A call to an LLM provider costs real,
metered money per request, and can take seconds. That gap is why
caching is less of a "nice to have" for AI apps than it is for a typical
CRUD API — a cache hit isn't just faster, it's a call you simply don't
pay for.

## Three layers worth caching

```
1. Exact-match response cache
   Same prompt, same params -> return the stored response
   Simplest, catches literal repeats (FAQ-style bots, retries)

2. Semantic cache
   Store PAST prompts as embeddings. New prompt arrives ->
   embed it, compare against stored prompts.
   Similar enough (e.g. cosine similarity > 0.95) -> reuse
   the cached response instead of calling the model again

3. Retrieval cache (for RAG-style apps)
   Cache the retrieved CONTEXT/documents for a query,
   separately from the final generated answer
```

Exact-match catches only identical repeats — useful, but narrow, because
real users rarely phrase the same question the same way twice. Semantic
caching catches "What's your refund policy?" and "How do refunds work?"
as the same cacheable question, which is where most of the real savings
actually live for a user-facing AI app.

## What's safe to cache, and what isn't

```
Safe to cache aggressively:
  - static knowledge ("what is a container?")
  - documentation lookups
  - anything where the answer doesn't change day to day

Dangerous to cache without a real invalidation plan:
  - anything grounded in live data (account balance, stock price,
    today's inventory)
  - personalized responses (cached for user A, served to user B)
  - anything where a stale answer is worse than a slow one
```

A semantic cache in particular can quietly serve a stale answer that
*reads* as fine — it's fluent, on-topic, and wrong, because the
underlying data moved on since the response was cached. That's a harder
bug to catch than an obvious error, which is exactly why cache
invalidation rules need to be deliberate, not an afterthought.

## Key terms

| Term | Meaning |
|---|---|
| Exact-match cache | Returns a stored response only for an identical prompt + params |
| Semantic cache | Matches prompts by embedding similarity, not literal text |
| Retrieval cache | Caches the retrieved context for a RAG query, separate from the answer |
| Stale cache hit | A fluent, confident, cached answer that's wrong because the real data changed |

## Check yourself

You're ready for Lesson 20 when you can explain: why is a semantic cache
hit that happens to be stale a worse failure mode than a cache miss that
just calls the model again?
