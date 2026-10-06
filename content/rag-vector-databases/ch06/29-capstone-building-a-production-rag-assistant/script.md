# Script — Capstone: Building a Production RAG Knowledge Assistant

## Segment 1 (title)

This lesson wires together everything from ingestion through citations into one real pipeline. Every call in it is something already built in an earlier lesson — embed, search with a score threshold, rerank, assemble a grounded prompt, call the model.

## Segment 2 (code: the pipeline, assembled)

Here's the full function. Embed the question. Search with a score threshold — if nothing clears it, return the honest fallback immediately, no model call at all. Otherwise, re-rank the top candidates down to the ones that actually matter, assemble a grounded prompt, and call the model.

## Segment 3 (code: prompt assembly with citations)

This is Lesson 20's structure exactly — instruction in system, numbered chunks and the question together in messages — with the citation instruction folded directly into that same system prompt.

## Segment 4 (steps: the full round trip)

A question comes in, gets embedded, and searched against 20 candidates. If every score is too low, the function returns honestly right there — no re-ranking, no model call, no risk of a confident wrong answer. Otherwise, re-ranking narrows to five, the prompt gets assembled, and the model answers with bracketed citations traceable back to real chunks.

## Segment 5 (steps: what's not here yet)

On purpose, nothing here yet: a measured evaluation score, or any tuning based on one. This proves the pipeline works end to end. Next lesson takes this exact pipeline and measures it for real.

## Segment 6 (outro)

Next lesson: evaluating and tuning this build — chunk size, top_k, and the re-ranking cutoff, adjusted based on what the numbers actually show.
