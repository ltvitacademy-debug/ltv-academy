# Lesson 15 — Drift Detection

**Chapter 3 · Monitoring AI in Production · Lesson 15 of 25**

## What you'll learn

- What "drift" means for an AI system, and why a model that never changes can still start performing worse
- The difference between data drift and concept drift
- How a real drift report actually measures and shows a shift, column by column
- Why a drift test pass/fail gate is what turns "huh, that chart looks different" into an actionable alert

## Why a static model can still go stale

Chapter 2 built eval datasets and ran them against a model before shipping. But the world the model operates in keeps moving after that: customer language shifts, a new product line appears, a competitor's name starts showing up in support tickets that never used to mention it. The model's weights haven't changed — but the data flowing into it has, and that's often enough for accuracy to quietly decline without a single error being thrown. This lesson is about catching that shift before it shows up as "the AI got worse" in a complaint.

## Data drift vs. concept drift

Two different things get called "drift," and they call for different responses:

- **Data drift** — the distribution of the *input* changes. The kinds of questions users ask, the shape of the documents being summarized, the demographics in a dataset. The model itself is still doing what it always did; the input just doesn't look like what it was built or evaluated on anymore.
- **Concept drift** — the relationship between input and correct output changes. What used to count as "a policy violation" or "a 5-star-worthy response" shifts over time, so even an unchanged input can deserve a different answer than it used to.

## What a real drift report shows

A drift report compares a **reference** distribution (what the data looked like when the system was built or last validated) against a **current** window, column by column, using a statistical test chosen for that column's type:

![A real Data Drift Summary report — each row is one column, comparing its reference and current distributions side by side, with a stat test (PSI or Kolmogorov–Smirnov) and a drift score, flagged Detected or Not Detected.](/courses/ai-security-eval-monitoring/ch03/15-drift-detection/preset-data-drift.png)

Opening a flagged column shows exactly how the shape changed — not just that it did:

![A drilled-down view of one drifting column, showing the reference distribution next to the current one as an overlaid bar chart — the actual shape of the shift, not just a score.](/courses/ai-security-eval-monitoring/ch03/15-drift-detection/preset-data-drift-2.png)

## From a report to a gate

A report you have to remember to look at gets ignored. The same checks can run as a pass/fail test suite with a threshold, so drift becomes something a pipeline can act on automatically — block a deploy, open a ticket, trigger retraining — instead of something a human has to notice:

![A Test Suite view of the same drift checks — 16 tests, 13 passing, 3 failed, each failure naming the exact column and drift score against the 0.1 threshold it crossed.](/courses/ai-security-eval-monitoring/ch03/15-drift-detection/test-preset-data-drift.png)

## What this looks like for an LLM app specifically

The same idea applies even without a classic tabular dataset: the distribution of user prompts (topics, length, language), the distribution of retrieved documents in a RAG system, and the distribution of the model's own output (tone, length, refusal rate) can all be tracked the same way — reference window vs. current window, with a drift score per dimension.

## Key terms

| Term | Meaning |
|---|---|
| Data drift | The distribution of inputs has shifted, even though the model hasn't changed |
| Concept drift | What counts as a correct or acceptable output has shifted over time |
| Reference vs. current window | The baseline distribution a new window of data is compared against to compute drift |

## Lab

Pick a column or field in any dataset you have access to (or a public one). Imagine splitting it into "last month" and "this month." What statistical test would you reach for — would you expect a numeric column and a categorical column to need different tests? Write two sentences explaining why.

## Check yourself

Can you explain, without looking, the difference between data drift and concept drift — and give one example of each that isn't from this lesson?
