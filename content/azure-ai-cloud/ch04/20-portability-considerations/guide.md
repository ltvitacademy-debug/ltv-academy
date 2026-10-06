# Lesson 20 — Portability Considerations

**Chapter 4 · Multi-Cloud AI Awareness · Lesson 20 of 24**

## What you'll learn

- What actually locks an application to one cloud's AI platform
- How a single wrapper function creates a seam for swapping providers later
- Three specific things worth keeping portable from day one
- Why this is about not making a migration harder, not predicting one

## The question behind the default

Lesson 19's honest default was: use whatever cloud your org is already
on. That default implies a follow-up question someone will eventually
ask — what would it actually take to move off it? Maybe it's cost,
maybe it's a model that's only available elsewhere, maybe it's an
acquisition changing which cloud the whole company standardizes on.
This lesson is that answer.

## What locks an app to one cloud

```
from openai import AzureOpenAI
client = AzureOpenAI(azure_endpoint=..., api_key=...)
client.chat.completions.create(model="gpt-4o", ...)
```

Nothing about this call is wrong — it's the exact shape Lesson 3 and
Lesson 6 built on. The problem shows up later, when that import, that
endpoint, and that credential shape get copied into every file across
the app that needs to call a model, instead of living in one place.

## One seam, instead of scattered calls

```
def ask_model(prompt: str) -> str:
    return provider_client.complete(prompt)

# Swapping providers later means changing
# this one function, not every call site
```

The fix is a seam, not a rewrite — one small function the rest of the
app calls instead of importing the provider SDK directly everywhere.
Swapping providers later means changing what's inside that one function,
not hunting down every call site scattered across the codebase.

## What actually travels across clouds

- **Prompts** — kept in files or a prompt store, not buried inline
  inside SDK calls, so they aren't tied to one provider's call shape.
- **Config** — endpoint, key, and model name read from environment
  variables, not hardcoded, so a swap is a config change, not a
  code change.
- **Embeddings** — dimension and distance metric noted explicitly,
  since not every provider's embedding model agrees on either one, and
  a silent mismatch breaks retrieval in a way that's hard to debug.

## What this doesn't mean

This isn't a call to build an elaborate abstraction layer for a
migration that may never happen. It's narrower than that: don't make a
possible future migration harder than it has to be, with a handful of
cheap habits that cost almost nothing to follow from day one.

## Key terms

| Term | Meaning |
|---|---|
| Vendor lock-in | Being tied to one provider's specific SDK, API shape, or credential model |
| Seam | A single, deliberate point in code where provider-specific logic is isolated |
| Distance metric | The similarity calculation (cosine, dot product, Euclidean) an embedding search uses |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why
is wrapping every model call in one function a cheaper insurance policy
than trying to predict which cloud you'll actually need to switch to?
