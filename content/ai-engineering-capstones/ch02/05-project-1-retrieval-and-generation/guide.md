# Lesson 5 — Retrieval & Generation

**Chapter 2 · Project 1 — Production RAG Knowledge Assistant · Lesson 5 of 23**

## What you'll learn

- How to query Qdrant for the chunks closest to a question, using the
  current `query_points` method
- How to assemble a numbered, citable context block from retrieved
  chunks
- Real, current syntax for calling Claude through the Anthropic
  Messages API
- Why instructing the model to say "not in context" matters as much as
  the retrieval step itself

## The pipeline, end to end

Lesson 4 left you with chunks embedded and stored in Qdrant. This
lesson wires the rest of the chain together: a question comes in, gets
embedded with the same model used at ingestion time, the closest
chunks come back from Qdrant, and those chunks get handed to Claude as
the *only* material it's allowed to answer from. The output is a
grounded answer with citations — never a free-floating guess.

## Step 1 — Retrieval

Qdrant's current client uses `query_points` (its older `search` method
is deprecated and being removed). Embed the question with the same
model used in Lesson 4, then query:

```python
query_vector = embed(question)  # same embedding model as ingestion

results = client.query_points(
    collection_name="docs",
    query=query_vector,
    limit=5,
    with_payload=True,
)
chunks = [p.payload for p in results.points]
```

`results.points` is a plain list, each one carrying `score` and the
`payload` you stored at ingestion time — the `text`, `source`, and
`chunk_id` from Lesson 4.

## Step 2 — Assembling a citable context block

Number the retrieved chunks and keep their source attached, so the
model has something concrete to cite and you have something concrete
to check later:

```python
context = "\n\n".join(
    f"[{i+1}] (source: {c['source']})\n{c['text']}"
    for i, c in enumerate(chunks)
)
system_prompt = (
    "Answer using only the numbered context below. "
    "Cite sources like [1]. Say so if the answer isn't in the context."
)
```

That last sentence in the system prompt is doing real work: it gives
the model explicit permission to say "I don't know" instead of filling
a gap with a plausible-sounding guess — the same hallucination risk
this path's RAG & Vector Databases course covered from the start.

## Step 3 — Generation with Claude

The official `anthropic` Python SDK's `Messages` API takes a `model`,
a `max_tokens` cap, a `system` prompt, and a `messages` list:

```python
from anthropic import Anthropic

client_llm = Anthropic()
response = client_llm.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    system=system_prompt,
    messages=[{"role": "user", "content": f"{context}\n\nQuestion: {question}"}],
)
answer = response.content[0].text
```

`Anthropic()` with no arguments reads your API key from the
`ANTHROPIC_API_KEY` environment variable — never hardcode a key
directly into the source file. `response.content` is a list of content
blocks; for a plain text answer, `response.content[0].text` is the
string you want.

## Why grounding and citations matter

A citation isn't decoration — it's a debugging tool. When an answer is
wrong, a citation tells you immediately whether the problem was
*retrieval* (the wrong chunks came back) or *generation* (the right
chunks came back, but the model still got it wrong). Without
citations, every wrong answer looks the same from the outside, and
Lesson 6's evaluation has nothing to point at.

## Key terms

| Term | Meaning |
|---|---|
| Top-k retrieval | Pulling back the k chunks whose embeddings are closest to the question's embedding |
| Grounded generation | An answer built only from retrieved context, with citations back to where each claim came from |
| System prompt | The instruction that shapes how a model should behave for an entire request, separate from the user's own message |

## Lab

Wire the three steps above into a single `answer_question(question)`
function. Run it against three real questions about your own document
set, and for each one, check that the cited source actually contains
the claim the model made. Note any case where a citation doesn't back
up what it's attached to — you'll want that for Lesson 6.

## Check yourself

- Why does this lesson use `query_points` instead of Qdrant's older
  `search` method?
- What does the system prompt's "say so if the answer isn't in the
  context" instruction protect against?
- If an answer is factually wrong, how does its citation help you tell
  whether retrieval or generation caused the error?
