# Lesson 9 — Choosing an Embedding Model

**Chapter 2 · Embeddings Deep Dive · Lesson 9 of 31**

## What you'll learn

- A practical, ordered process for choosing an embedding model for a real project
- A worked comparison table across real model options and what each column actually means
- Why "evaluate on your own data" isn't optional, and how to do it cheaply
- How this decision connects forward into Chapter 3's vector database choice

## The process, in order

1. **Shortlist with MTEB and category.** Use the leaderboard (Lesson 6) to build a shortlist of 2-4 candidates, spanning both hosted and self-hosted if data residency isn't already a hard constraint.
2. **Filter by hard constraints first.** Does your data have to stay on your own infrastructure? That rules out hosted APIs immediately, no matter how well they score. Need multilingual support? Filter for models trained on your languages. These constraints eliminate options before quality even enters the conversation.
3. **Check context limits and dimensionality options.** Every embedding model has a maximum input length (commonly 512 tokens for older models, up to 8,000+ for newer ones) — if your chunks are longer than that limit, the model will silently truncate, losing content. Also check whether the model supports Matryoshka-style truncation (Lesson 8), which gives you flexibility later.
4. **Evaluate on your own data.** This is the step people skip, and it's the one that actually matters. Take a representative sample of your real documents and a set of real (or realistic) queries with known correct answers, embed everything with each shortlisted model, and measure retrieval quality directly — not a generic benchmark's score, but how often the right chunk actually comes back near the top for your queries.

## A worked comparison table

```
Model                    Dims   Context   Hosting     Notes
text-embedding-3-small   1536   8191 tok  Hosted API  Cheap, strong default
text-embedding-3-large   3072   8191 tok  Hosted API  Higher quality, pricier
Cohere embed-v4          1536   128k tok  Hosted API  Very long context
BGE-large-en-v1.5         1024    512 tok  Self-hosted Strong open-source option
```

Reading this table: dimensionality and context length aren't "better/worse" on their own — they're inputs into the storage-cost math from Lesson 8 and whether your chunks even fit. A model with a huge context window matters only if you're embedding long passages instead of small chunks; for typical 200-500 token chunks, most options' context limits aren't the binding constraint at all.

## Why "evaluate on your own data" isn't optional

Lesson 6 already flagged that MTEB is an average across general-purpose datasets. A model trained heavily on web text and Wikipedia-style prose can genuinely underperform a lower-ranked model on, say, dense legal contracts or terse internal Slack threads — vocabulary, sentence structure, and typical phrasing all differ enough to matter. A cheap, fast evaluation: take 20-30 real questions your users would actually ask, know (or decide) which chunk should answer each one, run retrieval with each shortlisted model, and count how often the right chunk lands in the top-5. That's a small amount of work that directly answers the question MTEB can't.

## Connecting forward to Chapter 3

The embedding model you choose fixes two things the vector database has to handle: the vector's dimensionality (storage sizing) and the similarity metric it was trained with (which the vector database's index must be configured to match). Chapter 3 picks up exactly here — once you know your vectors' shape, the next decision is where they actually live and how they get searched at scale.

## Key terms

| Term | Meaning |
|---|---|
| Hard constraint | A requirement (like data residency) that eliminates options before quality is even compared |
| Context limit | The maximum input length an embedding model accepts before truncating |
| Retrieval evaluation | Measuring how often the correct chunk is actually retrieved for real queries, not a generic score |
| Top-5 hit rate | The fraction of test queries where the correct chunk appears in the top 5 retrieved results |

## Lab

1. Write down one hard constraint your own project (real or hypothetical) would have — data residency, language, budget, or something else.
2. Using that constraint, narrow the worked comparison table above to the options that would actually survive it.
3. Draft 5 realistic questions a user might ask your knowledge base, and for each, name which document should answer it — this is the start of a real evaluation set.

## Check yourself

You're ready for Chapter 3 when you can explain why evaluating a shortlist on your own documents matters more than trusting a leaderboard ranking alone.
