# Lesson 25 — Agentic RAG

**Chapter 5 · Advanced RAG Patterns · Lesson 25 of 31**

## What you'll learn

- What changes when retrieval becomes a tool the model calls, instead of a fixed step before it
- The real tool-calling shapes involved: the tool definition, the model's request to use it, and the result handed back
- Why agentic RAG can retrieve more than once per question
- What agentic RAG costs, and where it earns that cost

## Retrieval as a fixed step, versus retrieval as a choice

Every pattern through Lesson 24 follows the same shape: retrieve, then generate — one retrieval pass happens automatically, before the model ever sees the question. **Agentic RAG** changes that shape: retrieval becomes a **tool** the model can choose to call, zero, one, or several times, deciding for itself whether it has enough information yet or needs to search again — possibly with a different, refined query based on what the first search came back with.

## Defining retrieval as a tool

```json
{
  "name": "search_knowledge_base",
  "description": "Search the knowledge base for chunks relevant to a query.",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "The search query" }
    },
    "required": ["query"]
  }
}
```

This `tool` definition is passed to the Messages API alongside the user's question. The model doesn't retrieve automatically — it decides, based on the question, whether calling `search_knowledge_base` is actually necessary at all.

## The model asks to search

When the model decides it needs to retrieve, the response comes back with `stop_reason: "tool_use"` and a `tool_use` content block instead of a plain text answer:

```json
{
  "type": "tool_use",
  "id": "toolu_01A2b3C4d5",
  "name": "search_knowledge_base",
  "input": { "query": "cancellation policy early termination fee" }
}
```

The application code runs the real retrieval pipeline (Lesson 18) against `input.query`, then sends the results back as a `tool_result` block in the next message, and the model continues from there — it might answer immediately, or decide the first search wasn't enough and call `search_knowledge_base` again with a refined query.

## Why multiple retrievals can happen

A single-pass pipeline retrieves once, no matter what it finds. Agentic RAG can retrieve, read what came back, and decide the results don't actually answer a multi-part question — then issue a second, more targeted search before answering. That's the real advantage: the retrieval strategy adapts mid-conversation to what's actually been found so far, instead of committing to one search upfront and living with whatever it returns.

## What this costs

Agentic RAG trades predictability and latency for adaptability. A single-pass pipeline makes exactly one retrieval call with known cost and timing; an agentic loop might make one call or several, and the number isn't known in advance. It earns that cost on genuinely multi-step questions — "compare the cancellation policy for annual versus monthly plans" might legitimately need two separate searches — but it's unnecessary overhead for the large share of questions a single well-tuned retrieval pass already answers correctly.

## Key terms

| Term | Meaning |
|---|---|
| Agentic RAG | A pattern where retrieval is exposed as a tool the model decides whether and when to call |
| `tool_use` | A response content block where the model requests a specific tool call with specific input |
| `tool_result` | The content block carrying a tool's output back to the model in the next turn |

## Lab

1. Write the `input_schema` for a second tool, `get_document_by_id`, that retrieves one specific document by its ID rather than searching.
2. Describe a real two-part question where a model would plausibly need to call `search_knowledge_base` twice before answering.
3. Explain, in your own words, why agentic RAG's cost is harder to predict in advance than a single-pass pipeline's.

## Check yourself

You're ready for Lesson 26 when you can explain the difference between a fixed retrieval step and retrieval exposed as a tool the model chooses to use.
