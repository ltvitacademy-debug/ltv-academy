# Script — Choosing an Embedding Model

## Segment 1 (title)

Choosing an embedding model for a real project follows a clear order: shortlist with the leaderboard, filter by hard constraints, check context limits, and then — the step people skip — evaluate on your own data.

## Segment 2 (steps: the process)

Start with MTEB to build a shortlist of two to four candidates. Filter immediately by hard constraints — data residency rules out hosted APIs no matter how well they score, language needs filter for multilingual support. Then check context limits and whether the model supports Matryoshka-style truncation for flexibility later.

## Segment 3 (code: the comparison table)

A real shortlist might look like text-embedding-3-small at 1536 dimensions, text-embedding-3-large at 3072, Cohere's embed-v4 with a huge context window, and BGE-large as a strong open-source option. None of these numbers are better or worse in isolation — they're inputs into the storage math from the last lesson and whether your chunks actually fit.

## Segment 4 (steps: evaluate on your own data)

This is the step that actually matters. Take twenty to thirty real questions your users would ask, know which chunk should answer each one, run retrieval with each shortlisted model, and count how often the right chunk lands in the top five. That directly answers the question a generic leaderboard can't.

## Segment 5 (outro)

The model you choose fixes two things the vector database has to handle: dimensionality for storage sizing, and the similarity metric the index must be configured to match. Chapter 3 picks up exactly here — vector databases, where these vectors actually live and get searched at scale.
