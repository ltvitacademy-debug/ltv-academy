# Script — Multi-Query RAG

## Segment 1 (title)

Last lesson named a specific failure: the content exists, but the phrasing doesn't match the query. A single query embedding is one specific point in vector space — if the real answer's vocabulary sits far enough from that point, retrieval can miss it even though the answer is genuinely there.

## Segment 2 (steps: the failure this targets)

Multi-query RAG asks an LLM to generate several different phrasings of the same question — different enough in wording to land in different regions of vector space, aiming at the same intent.

## Segment 3 (code: a real reformulation call)

Here's a real call generating three reformulations. Given "how do I get my money back," a model might return "what is the refund eligibility policy," "how do I request a reimbursement," and "under what conditions can I cancel for a refund" — three queries sharing intent but reaching different, overlapping neighborhoods of the vector space.

## Segment 4 (steps: retrieve each, then merge)

Each reformulation gets embedded and retrieved separately, repeating the retrieval step once per reformulation. The results get combined and typically deduplicated by chunk ID, since the same genuinely relevant chunk often gets retrieved by more than one reformulation — then the merged set moves on to re-ranking.

## Segment 5 (steps: cost and when it's worth it)

This multiplies retrieval's cost directly — three reformulations means three embedding calls and three searches, plus the LLM call to generate them. It's not something to run on every query by default. It earns its cost on queries where retrieval's confidence is already in doubt, or on collections where users phrase things very differently from the source vocabulary.

## Segment 6 (outro)

Next lesson: HyDE — a different way to attack the same underlying problem, by embedding a hypothetical answer instead of the question itself.
