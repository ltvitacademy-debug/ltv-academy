# Script — Portability Considerations

## Segment 1 (title)

Lesson 19's honest default was to use whatever cloud your org is already on — which means at some point, someone will ask what it'd actually take to move off it, whether that's a cost decision, a model availability decision, or an acquisition changing which cloud the whole company standardizes on. This lesson is that answer.

## Segment 2 (code: what locks an app to one cloud)

This call isn't wrong — it's a perfectly normal Azure OpenAI client, the exact shape Lesson 3 and Lesson 6 built on. The problem is what happens when that import, that endpoint, and that credential shape get copied into every file that needs to call a model, instead of living in one place.

## Segment 3 (code: one seam)

The fix is a seam, not a rewrite — one small function the rest of the app calls instead of the SDK directly. Swapping providers later means changing what's inside that one function, not hunting down every call site scattered across the codebase.

## Segment 4 (steps: what travels across clouds)

Three things are worth keeping portable deliberately. Prompts belong in files or a prompt store, not buried inline in SDK calls. Config — endpoint, key, model name — gets read from environment variables, not hardcoded into the function itself. And embeddings need their dimension and distance metric noted explicitly, because not every provider's embedding model agrees on either one, and a silent mismatch breaks retrieval in a way that's hard to debug.

## Segment 5 (outro)

None of this means build for a migration that may never happen — it means not making one harder than it needs to be. Next up: the capstone, putting all four chapters to work on one real project.
