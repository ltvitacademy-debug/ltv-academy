# Script — When RAG Is the Wrong Answer

## Segment 1 (title)

RAG is real engineering work — a chunking strategy, an embedding model, a vector database, a retrieval step to tune. It's worth it when a problem genuinely needs grounding in a large, changing body of knowledge. It's wasted effort when it doesn't.

## Segment 2 (steps: three cases where it's overkill)

If the knowledge fits directly in the prompt, just paste it in — modern context windows are huge. If the task is really about style or tone rather than facts, that's a fine-tuning or system-prompt problem, not a retrieval problem. And if the knowledge base is small and barely changes, a hand-maintained system prompt has fewer moving parts than a vector database.

## Segment 3 (code: the computation case)

If the question is really "calculate this" or "look up a live structured value" — today's exchange rate, a row in a database — that's a tool call or a direct query, not similarity search. Vector search finds text that's semantically similar; it doesn't compute or look up exact values.

## Segment 4 (steps: the checklist)

Before building a RAG pipeline, ask four questions. Does the knowledge exceed what fits in a prompt? Does it change often enough that hand-updating isn't practical? Is this really about facts, not style? Does the answer need to be found in text rather than computed? Mostly yes, RAG earns its complexity. Mostly no, there's a simpler architecture waiting.

## Segment 5 (outro)

That closes out why RAG exists and when it doesn't apply. Chapter 2 goes deep on the first real building block: embeddings — what they actually are, and how to reason about them.
