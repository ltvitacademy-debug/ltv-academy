# Script — Retrieval-Augmented Generation (RAG), Explained

## Segment 1 (title)

An LLM's knowledge comes from training data with a cutoff date — it has never seen your specific Fabric workspace or last week's schema change. Ask it which table has customer churn data, and it either admits it doesn't know, or guesses a plausible table name that doesn't exist.

## Segment 2 (steps: the four-stage pipeline)

Grounding means giving the model actual, current, relevant content at question time. RAG does that in four stages: embed content into vectors that capture meaning, index those vectors for fast similarity search, retrieve the closest ones to a question, and generate an answer using only that retrieved content.

## Segment 3 (code: without vs with RAG)

Without RAG, a question goes straight to the model's memory and comes back as an answer that might be hallucinated. With RAG, the question first retrieves real content, and the model generates an answer grounded in what was actually retrieved — not in what it happened to memorize.

## Segment 4 (steps: why each stage exists)

Embedding makes text comparable by meaning, not just keyword matching. Indexing makes retrieval fast across thousands of chunks. Retrieval is the grounding step itself. Generation is where the model's language ability turns retrieved facts into a coherent answer, not where the facts come from.

## Segment 5 (outro)

This lesson stays conceptual on purpose — no embedding model chosen yet, no index built. Next up: chunking real catalog metadata and actually building a vector index over it.
