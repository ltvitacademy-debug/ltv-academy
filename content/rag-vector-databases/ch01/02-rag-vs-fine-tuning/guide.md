# Lesson 2 — RAG vs. Fine-Tuning

**Chapter 1 · Why RAG Exists · Lesson 2 of 31**

## What you'll learn

- The two fundamentally different ways to give a model knowledge it doesn't have
- What fine-tuning actually changes, and what it's genuinely good at
- Why fine-tuning is a poor fit for "keep the model up to date with changing facts"
- A clear decision rule for choosing between RAG, fine-tuning, or both

## Two different fixes for the same gap

Lesson 1 ended on the core gap: a model only has its frozen weights, with no live connection to real source documents. There are two structurally different ways to close that gap.

**Fine-tuning** continues training an existing model on your own examples, which adjusts its weights. The knowledge (or behavior) gets baked directly into the model itself.

**Retrieval-augmented generation (RAG)** leaves the model's weights untouched. Instead, at query time, it retrieves relevant text from an external store and inserts it into the prompt, so the model generates its answer from real source text sitting right in front of it.

## What fine-tuning is actually good at

Fine-tuning is the right tool when the goal is changing **how** the model behaves, not **what** it knows: teaching it a consistent output format, a specific tone or voice, a narrow task-specific skill (like classifying support tickets into your exact category taxonomy), or domain-specific terminology and phrasing patterns. It bakes a behavior in so reliably that you don't need to re-explain it in every prompt.

What fine-tuning is *not* good at is keeping a model current with facts that change. Every time your knowledge base changes — a new product launches, a policy updates, a document gets revised — a fine-tuned model would need to be retrained to reflect it. That's slow, expensive, and because fine-tuning adjusts weights in ways that are hard to fully inspect, there's no way to point to "this exact sentence in this exact document" as the source of an answer. You can't cite a weight.

## Why RAG wins for changing, citable knowledge

RAG keeps the knowledge external, in a database you can update any time — add a document, and it's searchable within minutes, no retraining required. Because the model is literally handed the retrieved passage in the prompt, you can show the user exactly which document and which passage the answer came from. That traceability is often not optional: in regulated industries, in customer support, in anything where a wrong confident answer has real consequences, being able to point to the source is the whole point.

## Cost and latency, briefly

Fine-tuning has a real upfront cost (compute, data prep, evaluation) but close to zero marginal cost per query afterward. RAG has a near-zero upfront cost — stand up a vector store and start indexing — but adds real work per query: embed the question, search, assemble a prompt with extra context, which adds latency and token cost on every single call. Neither is free; they're expensive in different places.

## The decision rule

Ask two questions. First: does the knowledge change often, and does it need to be citable? If yes, that's RAG's strength. Second: do you need to change the model's behavior, format, or style rather than its facts? If yes, that's fine-tuning's strength. In practice, production systems increasingly use both — a fine-tuned model that's also good at following a RAG-style "answer only from the provided context" instruction, combining a model trained to behave the way you want with knowledge that stays current and traceable.

## Key terms

| Term | Meaning |
|---|---|
| Fine-tuning | Continuing a model's training on your own examples, which adjusts its weights |
| RAG | Leaving the model's weights alone and instead retrieving relevant text into the prompt at query time |
| Traceability | The ability to point to the exact source document/passage behind a generated answer |
| Marginal cost per query | The ongoing cost of each individual request, as opposed to one-time setup cost |

## Lab

1. List three facts about your own work (or a hypothetical business) that change at least monthly.
2. For each, decide: would you rather retrain a model every time it changes, or update a document in a searchable store? Write one sentence of reasoning per fact.
3. Now list one thing about how you'd want an assistant to *behave* (tone, format) that wouldn't change often — note that this is the kind of thing fine-tuning handles well.

## Check yourself

You're ready for Lesson 3 when you can state, in one sentence each, what fine-tuning changes and what RAG changes.
