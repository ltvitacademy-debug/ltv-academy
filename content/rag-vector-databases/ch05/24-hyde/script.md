# Script — Hypothetical Document Embeddings (HyDE)

## Segment 1 (title)

HyDE asks an LLM to write a fake answer to the user's question — not checked for accuracy — and embeds that fake answer instead of the question itself, as the retrieval query. It sounds like it shouldn't work.

## Segment 2 (steps: why it works anyway)

A short question and a detailed answer often sit in noticeably different regions of embedding space, simply because questions and answers are written differently. A real answer chunk in the database was written in answer style. HyDE's hypothetical document is also written in answer style — so its embedding lands closer to the real answer than the original terse question ever would. The match is won on style and structure, not on whether the generated facts are correct.

## Segment 3 (code: a real HyDE call)

Here's a real call generating that hypothetical document. The model writes a short, plausible-sounding paragraph without hedging. That paragraph is never shown to the user and never trusted for its facts — it exists purely to be embedded and used as the retrieval query in place of the original question.

## Segment 4 (steps: where it fits, and where it doesn't)

HyDE targets the same terse-query problem multi-query RAG does, from the opposite direction — one hypothetical answer instead of several reformulated questions. It helps less on queries that are already detailed and answer-shaped, and carries a real risk on domains where a plausible but fabricated answer could drift toward the wrong topic entirely.

## Segment 5 (outro)

Next lesson: agentic RAG — what happens when the model itself decides when, and whether, to retrieve at all.
