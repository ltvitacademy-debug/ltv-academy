# Prompt Caching

PagedAttention (Lesson 18) made it *possible* to share KV cache blocks between requests with identical prefixes. Prompt caching is what actually *uses* that possibility on purpose — and it's one of the highest-leverage optimizations available for any workload with repeated prompt structure: system prompts, few-shot examples, long reused documents, or multi-turn conversations.

## What you'll learn

- Why recomputing a shared prefix's KV cache on every request is wasted work
- How server-side automatic prefix caching works, and how it differs from API-level prompt caching
- What has to stay true about a prefix for the cache to actually be reused
- The security and isolation question prompt caching raises in multi-tenant deployments

## The waste prompt caching eliminates

A long system prompt, a set of few-shot examples, or the first several turns of a growing conversation often appear, token-for-token, at the start of many different requests. Without any special handling, prefill recomputes the KV cache for that entire shared prefix every single time — full compute cost, every request, for content that hasn't changed at all. Prompt caching stores the KV cache for a prefix once and reuses it for every subsequent request that starts with the same tokens, turning what would be prefill work into a cache lookup.

## Two places this happens: server-side and API-level

- **Server-side automatic prefix caching** — the serving framework itself (vLLM enables this by default) hashes incoming prompt prefixes and checks its existing PagedAttention blocks for a match. If the first N tokens of a new request match a prefix already cached from an earlier request, those blocks are reused directly — no configuration needed beyond what Lesson 18 already set up, and no API contract changes.
- **API-level prompt caching** — hosted LLM APIs (such as Anthropic's) expose this as an explicit feature: a request marks a `cache_control` breakpoint after a reusable block of content, so the provider's infrastructure can cache and reuse that prefix's processed state on a later call, at meaningfully lower cost and latency for the cached portion. The mechanism underneath is the same idea as server-side prefix caching — it's simply made explicit and billable at the API layer, rather than inferred automatically inside your own serving stack.

## What has to stay true for a cache hit

The cached prefix has to match **exactly**, token for token — not approximately. Changing even one earlier word in a system prompt, or inserting a timestamp near the top of a prompt, invalidates the cache for everything after that point, because every token's key/value depends on every token before it through attention. This is why production prompt design for caching puts **stable, shared content first** (system instructions, fixed few-shot examples) and **variable content last** (the user's actual message, any per-request data) — maximizing how much of the prefix stays identical across requests.

## The isolation question multi-tenant systems have to answer

If cached blocks are shared across *different users'* requests whenever their prefixes happen to match, that's a genuine security consideration in a multi-tenant serving system: cache reuse must never leak one tenant's prompt content into another tenant's response, and most production systems scope prefix-cache sharing to a single tenant or isolate it at a boundary where cross-tenant matches simply can't occur, trading away some theoretical cache-hit opportunity for a hard isolation guarantee.

## Key terms

| Term | Meaning |
|---|---|
| Prefix caching | Reusing a previously computed KV cache for a prompt's shared prefix instead of recomputing it |
| Automatic prefix caching | Server-side caching the framework performs by default, with no API changes |
| Cache breakpoint | An explicit marker (e.g. Anthropic's `cache_control`) in an API-level caching request |
| Cache invalidation | Any change to earlier tokens breaks the match for everything after it |

## Recap

Prompt caching turns PagedAttention's block-sharing capability into an active optimization: stable, shared prefixes get computed once and reused, whether automatically inside a serving framework or explicitly through an API's cache breakpoints, with exact token-for-token matching as the hard requirement and tenant isolation as the hard constraint. Next up, Lesson 22: long-context serving challenges, where the KV cache problem from this whole chapter gets pushed to its most extreme scale.
