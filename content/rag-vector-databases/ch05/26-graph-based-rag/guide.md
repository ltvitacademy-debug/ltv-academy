# Lesson 26 — Graph-Based RAG

**Chapter 5 · Advanced RAG Patterns · Lesson 26 of 31**

## What you'll learn

- What a knowledge graph is, and how it represents information differently from a vector database
- The specific kind of question vector search alone struggles to answer
- A real Cypher query — the language graph databases like Neo4j actually use
- How graph-based RAG and vector search combine, rather than replace each other

## What vector search alone struggles with

Every pattern through Lesson 25 retrieves based on semantic similarity — chunks whose *meaning* is close to the query's. That works well for "what does the contract say about cancellation," because the answer lives inside a chunk of text. It works far worse for a question like "which vendors does Acme Corp share a parent company with, and which of those vendors have we had a dispute with?" — the answer isn't sitting inside any single chunk's text. It requires following *relationships* between entities, across possibly many documents, which similarity search was never built to traverse.

## What a knowledge graph represents instead

A **knowledge graph** stores information as **nodes** (entities — a company, a person, a contract) and **edges** (the relationships between them — "owns," "disputed with," "signed"), extracted from source documents up front, usually by an LLM pass over the ingested text. Instead of asking "what text is semantically close to this query," a graph lets you ask "what's connected to this entity, and what's connected to *that*" — a fundamentally different kind of question, answered by traversing relationships rather than comparing vectors.

## A real graph query

Here's a real Cypher query — the query language used by Neo4j, one of the most widely used graph databases — answering exactly the vendor-relationship question above:

```cypher
MATCH (a:Company {name: "Acme Corp"})-[:PARENT]->(p:Company)
      <-[:PARENT]-(v:Company)-[:DISPUTED_WITH]->(us:Company {name: "Us"})
RETURN v.name
```

This reads as a literal pattern match: find the company node for Acme Corp, follow its `PARENT` relationship to a parent company, follow `PARENT` relationships *back down* to sibling companies, and return the ones that also have a `DISPUTED_WITH` relationship to us. No embedding, no similarity score — just a structural traversal of explicit relationships.

## Graph-based RAG combines both

In practice, graph-based RAG rarely replaces vector search — it supplements it. A common pattern: vector search still retrieves the relevant *text* chunks for a question's factual content, while a graph traversal separately answers the *relationship* portion of the same question, and both results get assembled into the prompt together (Lesson 20). The two approaches are strong at different things: vector search is strong at "find text about this topic"; a graph is strong at "find what's connected to this entity."

## When it's worth the extra system

Building and maintaining a knowledge graph is real infrastructure on top of everything Chapters 1–4 already cover — an extraction pipeline to pull entities and relationships out of documents, and a graph database to store and query them. It earns that cost specifically when a domain's questions are genuinely relational — legal entity structures, organizational charts, supply chains, dependency graphs — and struggles to pay for itself on a knowledge base where questions are mostly "what does this document say," which plain vector search already answers well.

## Key terms

| Term | Meaning |
|---|---|
| Knowledge graph | A database of entities (nodes) and their relationships (edges), extracted from source documents |
| Cypher | The query language used by Neo4j and other graph databases to traverse nodes and relationships |
| Graph traversal | Following relationships between entities to answer a question, rather than comparing vector similarity |

## Lab

1. In your own words, describe one question your own domain might have that would require graph traversal rather than text similarity.
2. Walk through the example Cypher query line by line, in plain English.
3. Explain why graph-based RAG is usually described as supplementing vector search rather than replacing it.

## Check yourself

You're ready for Lesson 27 when you can explain, specifically, what kind of question a knowledge graph answers that a vector database alone cannot.
