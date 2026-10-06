# Lesson 17 — Chunk Size Trade-offs

**Chapter 4 · Building a RAG Pipeline · Lesson 17 of 31**

## What you'll learn

- Why there's no single "correct" chunk size, only trade-offs
- What goes wrong at each extreme — too small, and too large
- Practical starting ranges for common RAG use cases
- How chunk size and retrieval's `top_k` have to be tuned together, not separately

## No single right answer

Lesson 16 covered *how* to split text. This lesson covers the question splitting always raises next: how big should each chunk actually be? There's no universal answer — the right chunk size depends on the kind of question your users ask and the kind of document you're splitting — but the trade-off itself is the same in every RAG pipeline.

## Too small

A small chunk (say, one or two sentences) retrieves with high precision: if it matches a query, it's very likely to be genuinely relevant, because there's no room for it to contain much else. But it pays for that precision with context. A sentence that says "the fee is waived in this case" is useless on its own if the chunk right before it — which explained what "this case" means — didn't get retrieved too. Small chunks also mean more of them per document, which means more embedding calls and more stored vectors for the same source material.

## Too large

A large chunk (a full page or more) carries plenty of surrounding context, so a retrieved chunk is less likely to be missing the explanation it needs. But it pays for that in precision: a large chunk often contains several unrelated topics, so a single relevant sentence buried inside it can still make the whole chunk "match" a query that's really only about one narrow part of it. Stuffing several large chunks into a prompt (Lesson 20) can also start competing for the LLM's context window, and research on long-context models has repeatedly found that relevant information placed in the *middle* of a long prompt gets used less reliably than information near the start or end — a large chunk surrounded by other large chunks is exactly that situation.

## Practical starting ranges

These aren't rules, but they're a reasonable place to start before you tune on your own data (Lesson 27 covers how to actually measure this):

| Use case | Starting chunk size | Why |
|---|---|---|
| FAQ / support tickets | 150–300 tokens | Questions are narrow; answers are usually self-contained |
| Technical documentation | 300–500 tokens | Needs enough room for a full explanation or code example |
| Long-form reports / contracts | 500–800 tokens | Clauses and findings often depend on nearby context |

A chunk overlap of roughly 10–20% of the chunk size is a reasonable default across all three — it's the same mechanism from Lesson 16, just scaled to the chunk size you land on.

## Chunk size and top_k move together

Chunk size isn't tuned in isolation — it interacts directly with `top_k`, the number of chunks retrieval returns (Lesson 18). Smaller chunks usually need a *higher* `top_k`, because any single one carries less context and you need several to assemble a full answer. Larger chunks usually need a *lower* `top_k`, both because each one already carries more context and because stuffing many large chunks into one prompt gets expensive and risks that middle-of-context problem. Changing one without reconsidering the other is a common, avoidable mistake.

## Key terms

| Term | Meaning |
|---|---|
| Precision (retrieval) | How much of what's retrieved is actually relevant |
| Context (retrieval) | How much surrounding information a chunk carries with it |
| `top_k` | The number of chunks retrieval returns for a given query |
| Lost-in-the-middle | The tendency for relevant content in the middle of a long prompt to be used less reliably than content near the edges |

## Lab

1. Take a paragraph from a technical document you have on hand. Chunk it once at roughly 100 tokens and once at roughly 400 tokens. Which version would answer a narrow factual question better? Which would answer a "how does this whole process work" question better?
2. For the FAQ use case in the table, explain in one sentence why a smaller starting chunk size makes sense there specifically.
3. Pick a chunk size from the table and propose a `top_k` to pair it with, and justify the pairing.

## Check yourself

You're ready for Lesson 18 when you can explain why doubling your chunk size might mean you should lower `top_k`, not leave it unchanged.
