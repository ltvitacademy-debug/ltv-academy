# Lesson 27 — Evaluating RAG Quality

**Chapter 5 · Advanced RAG Patterns · Lesson 27 of 31**

## What you'll learn

- Why "it looks right" isn't good enough once a pipeline ships
- The four separate things a RAG pipeline can fail at, and the metric for each
- A real evaluation run using Ragas, a widely used open-source RAG evaluation library
- Why evaluation has to run on retrieval and generation separately, not just the final answer

## "Looks right" doesn't scale

Every decision through this chapter — chunk size, re-ranking, multi-query, HyDE, a knowledge graph — was framed as a trade-off to tune, not a fact to accept. Tuning requires measuring, and eyeballing a handful of answers doesn't scale past a demo. A real evaluation needs a test set of real questions with known-good answers, and metrics that isolate *which part* of the pipeline is actually underperforming.

## Four things that can independently go wrong

A RAG pipeline fails in one of four distinguishable ways, and a good evaluation measures each separately rather than just judging the final answer as "good" or "bad":

- **Context precision** — of the chunks retrieved, how many were actually relevant? Low precision means retrieval is pulling in noise.
- **Context recall** — of the chunks that *should* have been retrieved, how many actually were? Low recall means retrieval is missing real answers.
- **Faithfulness** — does the generated answer actually stick to what the retrieved context says, or does it add unsupported claims? Low faithfulness is hallucination even with good context in hand.
- **Answer relevancy** — does the generated answer actually address the question that was asked, even if it's faithful to the context? A faithful answer can still wander off-topic.

A pipeline with great retrieval and a model that hallucinates on top of it needs a different fix than a pipeline with a faithful model working from bad retrieval — and only separating these metrics tells you which one you actually have.

## A real evaluation run

Here's a real evaluation using **Ragas**, a widely used open-source library built specifically for RAG evaluation:

```python
from ragas import EvaluationDataset, evaluate
from ragas.metrics import Faithfulness, LLMContextRecall

dataset = EvaluationDataset.from_list([{
    "user_input": "What is the cancellation policy?",
    "retrieved_contexts": ["Policy requires 90 days notice..."],
    "response": "You need to give 90 days written notice.",
    "reference": "Cancellation requires 90 days written notice.",
}])

result = evaluate(dataset=dataset, metrics=[Faithfulness(), LLMContextRecall()])
```

Each test case needs four things: `user_input` (the question), `retrieved_contexts` (what the pipeline actually retrieved for it), `response` (what the pipeline actually answered), and `reference` (a known-good answer to compare against). `evaluate()` returns a score per metric — in this case `faithfulness` and `context_recall` — run across the whole test set.

## Building a real test set

A trustworthy test set isn't a handful of easy questions — it needs real questions a user would actually ask, including ones where the honest answer is "I don't know" (Lesson 22), so the evaluation also measures whether the pipeline abstains correctly rather than only measuring whether it answers well when it should. A test set built only from questions the pipeline already handles well will always report good scores, whether or not that's true in production.

## Key terms

| Term | Meaning |
|---|---|
| Context precision | The fraction of retrieved chunks that were actually relevant |
| Context recall | The fraction of truly relevant chunks that were actually retrieved |
| Faithfulness | Whether a generated answer sticks to what the retrieved context actually supports |
| Answer relevancy | Whether a generated answer actually addresses the question asked |

## Lab

1. For each of the four metrics in this lesson, write one sentence describing what a *low* score on it would mean for a real user.
2. Build a tiny three-question test set (by hand) for a topic you know, including at least one question the pipeline should honestly refuse to answer.
3. Explain why a pipeline could score well on faithfulness while still scoring poorly on context recall — what would that combination actually mean?

## Check yourself

You're ready for Lesson 28 when you can explain why faithfulness and context recall measure two genuinely different failure modes, not the same thing twice.
