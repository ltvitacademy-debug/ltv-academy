# Lesson 20 — Prompt Assembly With Retrieved Context

**Chapter 4 · Building a RAG Pipeline · Lesson 20 of 31**

## What you'll learn

- How retrieved chunks actually get turned into the text a model reads
- A real Messages API call assembling a system prompt, context, and a question
- Why instructions belong in the system prompt and retrieved text belongs in the user turn
- The instruction that keeps a RAG system from answering outside its retrieved context

## From chunks to prompt text

Everything up through Lesson 19 — ingestion, embedding, retrieval, re-ranking — exists to produce one thing: a short, ordered list of chunks that are actually relevant to the user's question. Prompt assembly is the step that turns that list into the literal text a model reads. It sounds simple, and mechanically it is — string concatenation, basically — but getting the structure right is what makes the difference between a model that answers from the retrieved context and one that quietly ignores it.

## A real assembled request

Here's a real call to the Messages API, built from the kind of chunks Lesson 19 would have handed back:

```json
{
  "model": "claude-opus-5-5",
  "max_tokens": 1024,
  "system": "Answer only using the Context below. If the\nanswer isn't in the Context, say you don't know.",
  "messages": [
    { "role": "user", "content": "Context:\n[1] Policy requires 90 days written notice...\n[2] Early termination fees do not apply to...\n\nQuestion: What is the cancellation policy?" }
  ]
}
```

Notice where each piece lives. The **behavioral instruction** — "answer only using the Context" — lives in `system`, separate from the data. The **retrieved chunks and the user's question** live together in the `messages` array, as a single user turn. That separation matters: `system` sets a standing rule that applies to the whole conversation, while `messages` carries the specific, per-request content the rule gets applied to.

## Why the instruction matters more than it looks

Without an explicit instruction to stay grounded in the Context, a capable model will often answer a question correctly from its own training knowledge even when the retrieved chunks don't actually cover it — which defeats the entire purpose of building a RAG pipeline in the first place. The instruction in the example above does two things at once: it tells the model *where* its answer should come from, and it gives the model explicit permission to say "I don't know" instead of guessing. Lesson 22 covers what happens when retrieval genuinely comes up empty; this is the instruction that makes that honest answer possible at all.

## Numbering chunks for later use

Each chunk in the example is prefixed with a number — `[1]`, `[2]` — before its text. That's not cosmetic: Lesson 21 depends on the model being able to refer back to "[1]" in its answer, and that reference only works if the chunk was given a stable label when it was assembled into the prompt. Prompt assembly is where that labeling has to happen — it's too late to add it after the model has already responded.

## Key terms

| Term | Meaning |
|---|---|
| Prompt assembly | Turning the final, re-ranked list of chunks into the literal text a model reads |
| `system` | A standing instruction for the whole request, kept separate from the data it applies to |
| Grounding instruction | The explicit rule telling the model to answer only from the provided context |

## Lab

1. Rewrite the example `system` instruction so it also tells the model to keep its answer under three sentences.
2. Explain, in your own words, why putting "answer only using the Context" in `system` is better than burying the same instruction at the end of the `messages` content.
3. Take two short chunks of your own and assemble them into a `messages` content string, numbering each one the way the example does.

## Check yourself

You're ready for Lesson 21 when you can explain why each chunk needs a stable, numbered label *before* it's sent to the model, not after.
