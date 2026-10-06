# Lesson 30 — Capstone: Evaluating & Tuning It

**Chapter 6 · Capstone · Lesson 30 of 31**

## What you'll learn

- Building a small, honest evaluation set for the pipeline from Lesson 29
- Running a real Ragas evaluation against it
- Reading the scores to find which pipeline stage is actually underperforming
- Making one measured tuning change, and confirming it actually helped

## A small, honest evaluation set

Following Lesson 27's guidance, the evaluation set for this capstone needs real questions, not easy ones — including at least one the pipeline should honestly decline to answer:

```python
test_set = [
    {"user_input": "What is the cancellation policy?",
     "retrieved_contexts": [...], "response": "...",
     "reference": "Cancellation requires 90 days written notice."},
    {"user_input": "What's the warranty on a toaster oven?",
     "retrieved_contexts": [...], "response": "I don't have information about that.",
     "reference": "Not covered by this knowledge base."},
    # 8-18 more, covering the knowledge base's real breadth
]
```

That second case matters as much as the first: it checks that the `score_threshold` abstention path from Lesson 22 actually fires on a genuinely out-of-scope question, not just that the pipeline answers well when it should.

## Running the evaluation

```python
from ragas import EvaluationDataset, evaluate
from ragas.metrics import Faithfulness, LLMContextRecall, LLMContextPrecision

dataset = EvaluationDataset.from_list(
    [run_pipeline_and_record(case) for case in test_set]
)
result = evaluate(dataset=dataset,
    metrics=[Faithfulness(), LLMContextRecall(), LLMContextPrecision()])
```

`run_pipeline_and_record` calls Lesson 29's `answer_question` for each test case and captures what retrieval actually returned and what the model actually answered — the evaluation has to run against the pipeline's *real* behavior, not a hand-written guess at it.

## Reading the scores

Three distinct scores point at three distinct places to look:

- **Low `context_precision`** — retrieval (Lesson 18) is pulling in irrelevant chunks alongside the good ones. Check the `score_threshold`, or whether chunk size is too large (Lesson 17).
- **Low `context_recall`** — retrieval is missing chunks that should have been found. Check `top_k`, or whether chunking is splitting a relevant passage apart from the context it needs.
- **Low `faithfulness`** — the model is adding claims the retrieved context doesn't actually support, even with good retrieval in hand. Check the grounding instruction's wording (Lesson 20) before assuming retrieval is at fault.

## One measured tuning change

Suppose the evaluation shows strong `faithfulness` but weak `context_recall` — real answers exist in the knowledge base, but retrieval isn't finding them. That score points specifically at retrieval, not generation. A reasonable first change: raise `top_k` from 5 to 8, giving retrieval more room to include the chunk it was narrowly missing. Re-running the exact same evaluation set after the change confirms whether `context_recall` actually improved — a change isn't "done" until the same metric that flagged the problem is re-measured and shows it's fixed.

## Key terms

| Term | Meaning |
|---|---|
| Evaluation set | A fixed set of real test questions, including honest "I don't know" cases, used to measure the pipeline |
| Metric-to-stage mapping | Using which specific metric is low to decide which specific pipeline stage to investigate |

## Check yourself

Suppose `context_precision` comes back low while `context_recall` is strong. Explain which pipeline stage that combination points to, and name one specific change from Chapter 4 you'd try first.
