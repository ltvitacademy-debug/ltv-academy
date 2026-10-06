# Lesson 6 — Evaluation & Tuning

**Chapter 2 · Project 1 — Production RAG Knowledge Assistant · Lesson 6 of 23**

## What you'll learn

- Why "it felt right when I tried it" isn't an evaluation
- How to build a small, hand-written eval set from your own document
  set
- Two concrete measurements: retrieval recall@k and LLM-as-judge
  scoring for generation quality
- Which levers to pull when a measurement comes back low: chunk size,
  top-k, and re-ranking

## Why measure instead of guess

Every project in this course needs one thing Lessons 4 and 5 didn't
give you yet: proof. "I tried a few questions and the answers looked
fine" isn't an evaluation — it's a vibe. A real evaluation set lets you
say something specific, like "recall at five is 80%, and the generation
judge score averages 4.1 out of 5" — numbers you can re-run after a
change and compare directly.

## Building a small eval set

Write 15-20 question/expected-answer pairs by hand, using your own
document set as the source of truth. For each one, record the
**question**, an **expected_answer** (or a short summary of what a
correct answer must say), and the **expected_source** — the file you
know contains the answer. You already have the file paths from
Lesson 4's chunk metadata, so this is mostly a matter of picking
questions you already know the answer to and writing them down.

## Measurement 1 — retrieval recall@k

Recall@k asks a narrow, answerable question: of the chunks retrieval
returned, did the one actually containing the answer show up at all?

```python
hits = 0
for item in eval_set:
    results = client.query_points(
        collection_name="docs", query=embed(item["question"]), limit=5
    )
    sources = [p.payload["source"] for p in results.points]
    hits += item["expected_source"] in sources

recall_at_5 = hits / len(eval_set)
```

A low `recall_at_5` means the problem is upstream of generation
entirely — no prompt wording fixes a retrieval miss.

## Measurement 2 — LLM-as-judge for generation quality

Recall@k only checks retrieval. To score the *generated answer*
itself, ask Claude to grade it against your expected answer — a
second, cheaper pass than reading every answer by hand:

```python
judge_prompt = (
    f"Question: {item['question']}\nExpected: {item['expected_answer']}\n"
    f"Generated: {generated}\nScore 1-5 for correctness and grounding. Reply with only the number."
)
score = client_llm.messages.create(
    model="claude-opus-5-5", max_tokens=5,
    messages=[{"role": "user", "content": judge_prompt}],
).content[0].text
```

Run this across your whole eval set and average the scores. A judge
score is a cheap proxy for human grading, not a replacement for it —
spot-check a handful of the judge's scores by hand before trusting the
average.

## Tuning: what to change when a number is low

- **Chunk size / overlap** — if recall@k is low on questions whose
  answer spans more than one idea, a larger chunk (or more overlap)
  may keep that answer intact in a single chunk.
- **Top-k** — a higher `limit` in `query_points` gives the right chunk
  more chances to appear, at the cost of a longer, noisier context
  block.
- **Re-ranking** — retrieve more candidates than you need (say, 20),
  then narrow down to the best 5 with a second, more careful pass
  before generation, instead of trusting the first similarity score
  alone. Claude itself can act as that re-ranking pass, given the
  candidates and asked to pick the most relevant ones for the
  question.

Change one lever at a time, re-run both measurements, and keep only the
changes that actually move the numbers — tuning by feel is the same
mistake as evaluating by feel.

## Key terms

| Term | Meaning |
|---|---|
| Recall@k | The fraction of eval questions whose known-correct source appeared somewhere in the top-k retrieved chunks |
| LLM-as-judge | Using a model to score a generated answer against an expected answer, as a cheaper substitute for manual grading |
| Re-ranking | Retrieving more candidates than needed, then narrowing to the best few with a second, more careful pass |

## Lab

Build your own 15-20 question eval set from your document set. Run
both measurements and record the baseline numbers in your README.
Change exactly one tuning lever (chunk size, top-k, or add a
re-ranking pass), re-run both measurements, and record whether — and
by how much — the numbers moved.

## Check yourself

- Why isn't "the answers looked fine when I tried a few questions" a
  real evaluation?
- If recall@5 is low but the LLM-as-judge score is high on the
  questions that do retrieve correctly, where's the actual problem?
- Name two tuning levers this lesson names for a low recall@k score.
