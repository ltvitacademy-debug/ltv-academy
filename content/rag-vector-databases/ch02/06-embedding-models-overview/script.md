# Script — Embedding Models, Overview

## Segment 1 (title)

Every embedding model you'd actually use falls into one of two categories: hosted API models, and open-source or self-hosted models. Both are legitimate choices, with real trade-offs between them.

## Segment 2 (steps: the two categories)

Hosted models — OpenAI's text-embedding-3 family, Cohere's embed-v4, Google's gemini-embedding — mean no infrastructure to run and strong quality out of the box. Open-source families like BGE, E5, and GTE run on your own infrastructure: no per-token cost at scale, full control over data residency, and the ability to fine-tune the model on your own domain.

## Segment 3 (steps: the trade-offs)

Hosted trades ongoing API cost and a third-party dependency for convenience. Self-hosted trades upfront engineering effort for lower marginal cost at volume and data that never leaves your systems — which matters a lot for regulated industries.

## Segment 4 (code: MTEB)

MTEB, the Massive Text Embedding Benchmark, runs a standardized suite of tasks across many languages and domains with a public leaderboard. It's a genuinely useful way to build a shortlist — but it's an average across datasets that probably aren't your documents.

## Segment 5 (outro)

A model that tops the leaderboard can still underperform on your specific domain. Treat it as a shortlist tool, not the final answer — testing against your own documents, which lesson nine covers directly, is what actually decides it.
