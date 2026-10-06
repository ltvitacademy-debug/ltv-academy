# Script — Graph-Based RAG

## Segment 1 (title)

Every pattern so far retrieves based on semantic similarity. That works well when the answer lives inside a chunk of text. It works far worse for a question like "which vendors share a parent company with Acme, and which have we disputed with" — that answer requires following relationships across documents, not comparing meaning.

## Segment 2 (steps: what a knowledge graph represents)

A knowledge graph stores information as nodes — entities like a company or a contract — and edges, the relationships between them, usually extracted from source documents by an LLM pass. Instead of asking what text is semantically close, a graph lets you ask what's connected to this entity, and what's connected to that.

## Segment 3 (code: a real graph query)

Here's a real Cypher query — the language Neo4j uses — answering exactly that vendor question. Find Acme's parent company, follow that relationship back down to sibling companies, and return the ones that also have a disputed-with relationship to us. No embedding, no similarity score — a structural traversal of explicit relationships.

## Segment 4 (steps: combines, doesn't replace)

In practice, graph-based RAG rarely replaces vector search — it supplements it. Vector search retrieves the relevant text for a question's factual content; a graph traversal separately answers the relationship portion, and both get assembled into the prompt together. Vector search is strong at finding text about a topic; a graph is strong at finding what's connected to an entity.

## Segment 5 (steps: when it's worth it)

Building and maintaining a knowledge graph is real infrastructure on top of everything already covered — an extraction pipeline plus a graph database. It earns that cost on genuinely relational domains — legal entity structures, org charts, supply chains — and struggles to pay for itself where questions are mostly "what does this document say."

## Segment 6 (outro)

Next lesson: evaluating RAG quality — how to actually measure whether any of these patterns are making the pipeline better, instead of just assuming they are.
