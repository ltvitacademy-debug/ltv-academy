# Lesson 6 — Embedding Models, Overview

**Chapter 2 · Embeddings Deep Dive · Lesson 6 of 31**

## What you'll learn

- The two broad categories of embedding models: hosted API models and open-source/self-hosted models
- Real examples of each, and the practical trade-offs between them
- What a leaderboard like MTEB actually measures
- Why "best on the leaderboard" and "best for your use case" aren't the same question

## Two categories

Every embedding model you'd actually use in production falls into one of two categories.

**Hosted API models** are called over an API; you send text, you get a vector back, and the provider handles the compute. OpenAI's `text-embedding-3-small` and `text-embedding-3-large` are common defaults; Cohere's `embed-v4` and Google's `gemini-embedding` are other widely used hosted options. The appeal: no infrastructure to run, strong general-purpose quality out of the box, simple pay-per-token pricing.

**Open-source / self-hosted models** run on your own infrastructure (or a hosting service that runs them for you). Families like BGE (BAAI General Embedding), E5, GTE, and Nomic Embed are common choices, usually built on the sentence-transformers framework. The appeal: no per-token API cost at scale, full control over data residency (nothing leaves your infrastructure), and the ability to fine-tune the embedding model itself on your own domain's text.

## The practical trade-offs

Hosted models trade ongoing API cost and a dependency on a third party for convenience and typically very strong out-of-the-box quality. Self-hosted models trade upfront engineering effort (standing up inference infrastructure, managing GPU or CPU resources) for lower marginal cost at high volume and full control over your data never leaving your own systems — which matters a great deal for regulated industries or any data that can't leave a private network.

## What MTEB actually measures

The **Massive Text Embedding Benchmark (MTEB)** is a standardized suite of tasks — retrieval, classification, clustering, semantic similarity, and more — run across many languages and domains, with a public leaderboard ranking models by their average score. It's a genuinely useful starting point for narrowing a shortlist, but it is an *average across very different tasks and datasets*, most of which are not your specific documents.

## Why the leaderboard isn't the whole answer

A model that tops MTEB's retrieval average might still underperform a lower-ranked model on your specific domain — dense legal contracts, casual support chat logs, code snippets — because MTEB's retrieval datasets are a mix of Wikipedia, news, and general web text, not necessarily anything resembling your content. The leaderboard is a reasonable way to build a shortlist of 2-4 candidates; it should not be the final decision without testing those candidates against a sample of your actual documents and actual queries, which Lesson 9 covers directly.

## Key terms

| Term | Meaning |
|---|---|
| Hosted API model | An embedding model called over an API, with the provider handling compute |
| Self-hosted model | An embedding model run on your own infrastructure |
| MTEB | Massive Text Embedding Benchmark — a standardized multi-task leaderboard for comparing embedding models |
| Data residency | Where your data physically lives and whether it leaves your own systems |

## Lab

1. List one reason your own project (real or hypothetical) might prefer a hosted model, and one reason it might prefer a self-hosted one.
2. Look up (if you have internet access) which category — hosted or self-hosted — currently tops the MTEB retrieval leaderboard, and note that this changes often.
3. Write one sentence explaining why topping MTEB wouldn't automatically make a model the right choice for a narrow, specialized document set.

## Check yourself

You're ready for Lesson 7 when you can name one hosted and one open-source embedding model family, and state one real trade-off between the two categories.
