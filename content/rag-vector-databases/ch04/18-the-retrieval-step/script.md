# Script — The Retrieval Step

## Segment 1 (title)

Retrieval starts the instant a user asks a question. That text runs through the same embedding model used on every stored chunk, producing a query vector in the exact same space.

## Segment 2 (code: the real search request)

Here's the real shape of that request against a vector database's REST API. The vector field is the embedded query. Limit is top_k — how many closest matches to return. With_payload asks for each chunk's stored text and metadata back, not just an ID. An optional score_threshold tells the database not to bother returning anything below a minimum similarity score.

## Segment 3 (steps: the response)

The database compares the query vector against every stored vector using the collection's configured distance metric, and returns the closest matches — each one carrying a similarity score and its payload: the text and metadata stored back at ingestion. This is the handoff point. Everything from here forward — re-ranking, prompt assembly, citations — works from this list.

## Segment 4 (steps: metadata filters narrow the search)

A search can also be scoped before similarity comparisons even run — a filter alongside the vector restricts the search to points matching specific metadata, like a document ID or date range. Similarity search answers "what's semantically closest." A filter answers "closest within this subset" — useful when a question is already scoped to one document or date range.

## Segment 5 (steps: similar meaning, not a correct answer)

It's worth being precise about what retrieval guarantees: chunks whose embedded meaning is closest to the query's. It doesn't know whether those chunks actually answer the question, or whether they're outdated or contradictory. That judgment happens later — re-ranking re-orders more carefully, and the model itself still has to reason about whether what it was handed actually answers the question.

## Segment 6 (outro)

Next lesson: re-ranking — taking retrieval's results and re-ordering them with a model built specifically to judge relevance, not just similarity.
