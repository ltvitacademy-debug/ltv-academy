# Lesson 18 — The Retrieval Step

**Chapter 4 · Building a RAG Pipeline · Lesson 18 of 31**

## What you'll learn

- Exactly what happens, in order, when a user's question becomes a retrieval call
- The real REST request/response shape a vector database search uses
- What `top_k` and metadata filters actually do to that request
- Why retrieval is a search for similar meaning, not a search for a correct answer

## From question to query vector

Retrieval starts the instant a user asks a question. That question text is run through the *same* embedding model used to embed every chunk back in Chapter 2 — this has to be the same model, because Lesson 7 established that two vectors are only comparable if they were produced by the same model in the same coordinate space. The result is a single query vector, in the same space as every chunk vector already stored in the collection.

## The real request

That query vector is then sent to the vector database as a search request. Here's the real shape of that request against Qdrant's REST API — the same database whose console you saw creating a collection back in Chapter 3:

```json
POST /collections/support_docs/points/search
{
  "vector": [0.013, -0.084, 0.21, ...],
  "limit": 5,
  "with_payload": true,
  "score_threshold": 0.5
}
```

`vector` is the embedded query. `limit` is `top_k` — the number of closest matches to return (Lesson 17 covered how this is chosen). `with_payload` asks the database to return each chunk's stored text and metadata alongside its vector, not just an ID. `score_threshold` is optional — it tells the database not to bother returning anything below a minimum similarity score at all, which Lesson 22 covers using as a signal that nothing relevant was found.

## The response

The database compares the query vector against every stored vector using the collection's configured distance metric (Lesson 7), and returns the closest matches:

```json
{
  "status": "ok",
  "result": [
    { "id": 482, "score": 0.87, "payload": { "text": "...", "doc_id": "policy-14", "page": 3 } },
    { "id": 119, "score": 0.81, "payload": { "text": "...", "doc_id": "policy-14", "page": 2 } }
  ]
}
```

Each result carries the chunk's similarity `score`, and its `payload` — exactly the text and metadata Lesson 16 said to store at ingestion time. This is the handoff point: everything from here forward (re-ranking, prompt assembly, citations) works from this list.

## Metadata filters narrow the search

A search can also be scoped before it runs similarity comparisons at all — passing a `filter` alongside `vector` restricts the search to points matching specific metadata, like `doc_id` or a date range. This is the same metadata-filtering concept from Chapter 3: similarity search answers "what's semantically closest," and a filter answers "closest *within this subset*" — useful when a user's question is already scoped to one document, one product, or one date range, and the rest of the collection is simply irrelevant noise to exclude up front.

## Similar meaning, not a correct answer

It's worth being precise about what retrieval actually guarantees: it returns the chunks whose *embedded meaning* is closest to the query's embedded meaning. It does not know whether those chunks actually answer the question, whether they're outdated, or whether they contradict each other. That judgment happens later — re-ranking (Lesson 19) re-orders by relevance more carefully, and the LLM itself (Lesson 20) still has to read what retrieval handed it and reason about whether it actually answers the question.

## Key terms

| Term | Meaning |
|---|---|
| Query vector | The user's question, embedded with the same model used on every chunk |
| `top_k` / `limit` | How many closest-matching chunks a search request returns |
| `score_threshold` | A minimum similarity score below which results aren't returned at all |
| Payload | The stored text and metadata returned alongside each matched vector |

## Lab

1. Write out, step by step, everything that happens between a user typing a question and a list of scored chunks coming back.
2. In the example request above, explain what would happen if `with_payload` were left out — what would the response be missing, and why would that matter for Lesson 20?
3. Describe one real scenario where you'd add a metadata `filter` to a retrieval request, and what field you'd filter on.

## Check yourself

You're ready for Lesson 19 when you can explain why a chunk with a high similarity score isn't guaranteed to actually answer the user's question.
