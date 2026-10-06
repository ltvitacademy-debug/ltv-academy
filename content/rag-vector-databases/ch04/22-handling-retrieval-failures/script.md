# Script — Handling Retrieval Failures

## Segment 1 (title)

Every lesson so far has assumed retrieval finds something useful. It doesn't always — and when it fails silently, the result is a confident-sounding answer built on irrelevant context, often worse than no answer at all.

## Segment 2 (steps: three ways retrieval fails)

No relevant content exists — the knowledge base genuinely doesn't cover it, but vector search still returns a list, just with low scores. The question is ambiguous — it can match dozens of equally plausible, mutually irrelevant chunks. Or the content exists but the phrasing doesn't match — even semantic search's tolerance for paraphrasing has limits.

## Segment 3 (code: catching the clearest case)

The most mechanically catchable failure uses the score threshold from the retrieval step. Below a minimum similarity score, a result isn't a weak match — it's effectively not a match. Returning nothing lets the pipeline respond honestly instead of forcing a weak chunk into the prompt and hoping the model notices.

## Segment 4 (steps: the harder failure)

A threshold alone doesn't catch everything. A moderately-scored chunk can still get retrieved and produce a fluent, confident-sounding answer that's subtly wrong — related enough to pass the threshold without actually answering the question. This is why the grounding instruction from Lesson 20 matters, and why evaluation metrics in Lesson 27 exist at all.

## Segment 5 (steps: what to do once a failure is detected)

Abstain — saying "I don't have information about that" — is always safer than fabricating. Ask a clarifying question when it looks like ambiguity. Widen the search — drop a filter, raise top_k — when the query might just be too narrow. None of these require the model to be smarter; they require the pipeline to notice it's in a failure case at all.

## Segment 6 (outro)

That closes out the core RAG pipeline. Chapter 5 moves into advanced patterns — starting with multi-query RAG, one real way to recover from retrieval missing the mark on phrasing.
