# Script — Agentic RAG

## Segment 1 (title)

Every pattern so far follows the same shape: retrieve, then generate — one retrieval pass, automatically, before the model sees the question. Agentic RAG changes that: retrieval becomes a tool the model can choose to call, zero, one, or several times.

## Segment 2 (code: defining retrieval as a tool)

Here's a real tool definition passed to the Messages API alongside the user's question — a search_knowledge_base tool taking a query string. The model doesn't retrieve automatically. It decides, based on the question, whether calling this tool is actually necessary at all.

## Segment 3 (code: the model asks to search)

When the model decides it needs to retrieve, the response comes back with a tool_use block instead of a plain answer — naming the tool and the query it wants to run. The application runs the real retrieval pipeline against that query, sends the results back as a tool_result, and the model continues from there.

## Segment 4 (steps: why multiple retrievals can happen)

A single-pass pipeline retrieves once, no matter what it finds. Agentic RAG can retrieve, read what came back, decide it doesn't actually answer a multi-part question, and issue a second, more targeted search before answering. The strategy adapts mid-conversation instead of committing to one search upfront.

## Segment 5 (steps: what this costs)

It trades predictability for adaptability. A single-pass pipeline makes exactly one call with known cost and timing; an agentic loop might make one or several, and the number isn't known in advance. It earns that cost on genuinely multi-step questions, but it's unnecessary overhead for the large share of questions a single well-tuned pass already answers correctly.

## Segment 6 (outro)

Next lesson: graph-based RAG — retrieval built on entities and their relationships, not just vector similarity.
