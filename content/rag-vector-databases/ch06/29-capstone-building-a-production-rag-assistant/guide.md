# Lesson 29 — Capstone: Building a Production RAG Knowledge Assistant

**Chapter 6 · Capstone · Lesson 29 of 31**

## What you'll learn

- Wiring ingestion, retrieval, re-ranking, and prompt assembly into one real pipeline
- The full round trip: a question in, a grounded and cited answer out
- Where the score_threshold abstention path from Lesson 22 plugs in
- Where this lesson's build stops, and what Lesson 30 adds on top

## The pipeline, assembled from Chapters 2–4

This lesson wires together everything from ingestion through citations into one function. Each stage is a direct, unmodified application of a specific earlier lesson:

```python
def answer_question(question, collection):
    q_vector = embed(question)                       # Ch 2
    hits = search(q_vector, collection,               # L18
                  limit=20, score_threshold=0.5)
    if not hits:
        return "I don't have information about that." # L22
    top = rerank(question, hits, top_n=5)              # L19
    prompt = assemble_prompt(question, top)             # L20, L21
    return call_model(prompt)
```

Every call in this function is something you've already built in an earlier lesson. `embed` is Chapter 2's embedding model call. `search` is Lesson 18's real vector database request, including the `score_threshold` that Lesson 22 uses as the abstention trigger. `rerank` is Lesson 19's re-ranking call, narrowing 20 candidates to the 5 that actually matter. `assemble_prompt` builds the numbered, grounded context from Lesson 20, structured so `call_model`'s answer can cite back to it (Lesson 21).

## Prompt assembly with citations, together

```python
def assemble_prompt(question, chunks):
    context = "\n".join(
        f"[{i+1}] {c['payload']['text']}" for i, c in enumerate(chunks)
    )
    system = ("Answer only using the Context below. Cite sources "
              "like [1]. If the answer isn't in the Context, say so.")
    return {"system": system,
            "messages": [{"role": "user",
                           "content": f"Context:\n{context}\n\nQuestion: {question}"}]}
```

This is Lesson 20's structure exactly — instruction in `system`, numbered chunks and the question together in `messages` — with the citation instruction from Lesson 21 folded directly into the same system prompt, rather than handled as a separate step.

## The full round trip

1. A user asks: "What's the policy on early cancellation?"
2. `embed` turns that into a query vector; `search` returns the 20 closest chunks, each with a score and payload.
3. If every score is below `0.5`, the function returns the honest fallback from Lesson 22 immediately — no re-ranking, no model call, no risk of a confident wrong answer.
4. Otherwise, `rerank` narrows those 20 down to the 5 actually relevant to this specific question.
5. `assemble_prompt` builds the grounded, numbered context and the citation instruction.
6. `call_model` returns an answer like: "Early cancellation requires 90 days written notice [1], and no fee applies if notice is given in writing [2]." — each bracket traceable back to a real chunk's `doc_id` and page.

## What this lesson's build does *not* yet include

On purpose, nothing here yet: a measured evaluation score, or any tuning based on one. This lesson proves the pipeline itself works end to end — ingestion through a cited, grounded answer, with a real abstention path. Lesson 30 takes this exact pipeline and measures it, then tunes chunk size, `top_k`, and the re-ranking cutoff based on what the numbers actually show, rather than a guess.

## Key terms

| Term | Meaning |
|---|---|
| Round trip | The full sequence from a user's question through retrieval, re-ranking, and a grounded, cited answer |
| Pipeline function | The single function that chains every stage together into one callable unit |

## Check yourself

Trace through the round trip above, but assume every one of the 20 retrieved chunks scores below `0.5`. Write out exactly what the function returns, and which lesson's logic makes that the correct behavior instead of forcing a guess.
