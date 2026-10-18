# Capstone: Write a Real Architecture Decision Record

This closing lesson asks you to do the thing this entire course has been building toward: given a real, unresolved decision at Northbeam, write your own Architecture Decision Record — scoring the trade-offs honestly (Lesson 8), accounting for build-vs-buy (Lesson 7), and writing it in the structure Lesson 6 taught — before checking your answer against a model ADR.

## What you'll learn

- How to apply this course's full toolkit to one decision, start to finish, on your own
- A model answer to compare your reasoning against, not just your conclusion
- Where honest, defensible disagreement with the model answer is completely fine
- How this exact exercise — "walk me through an architecture decision" — shows up in real Staff/Principal interviews

## The scenario

Northbeam's support assistant currently answers every question it attempts, even when its retrieval found weak, low-relevance matches — which sometimes produces confidently-stated wrong answers (recall Chapter 3's discussion of communicating this exact risk to stakeholders). Leadership wants a decision: should the team add a **confidence threshold** that routes low-confidence answers to a human agent instead of showing a possibly-wrong AI answer, and if so, how should that threshold actually be determined?

Two real options are on the table:

- **Option A — Static threshold.** Pick one fixed retrieval-relevance-score cutoff, below which every answer routes to a human. Simple to implement and explain; may not generalize well across different question types, since "low confidence" means something different for a factual lookup than for an open-ended question.
- **Option B — Learned threshold.** Train a small classifier on historical data (did this answer turn out to be correct or not, given its retrieval signals) to predict confidence per-question. More accurate in principle; requires labeled historical data Northbeam may not fully have yet, and is itself a new model to build, validate, and maintain.

## Your task

Before reading further, write your own ADR for this decision. Use Lesson 6's structure: Context, Decision, Consequences, Alternatives Considered. Decide between Option A and Option B (or propose a reasonable third path, like starting with A and migrating to B later), and be explicit about which factors from this course — cost, latency, maintainability, build-vs-buy, team expertise — actually drove your answer.

<details>
<summary>A model ADR for this decision</summary>

```markdown
# ADR-027: Confidence-Threshold Routing for the Support Assistant

## Status
Accepted

## Context
The assistant currently answers every question, including ones where
retrieval found only weak matches, which produces confidently-stated
wrong answers in some cases. We need a way to route low-confidence
answers to a human agent instead. Two options: a static relevance-
score cutoff, or a learned classifier predicting confidence per-answer.
We do not currently have a labeled dataset of "was this answer
actually correct" at the volume a learned classifier would need.

## Decision
We will start with a static threshold (Option A), tuned against a
small manually-labeled sample of recent real answers, and revisit a
learned-classifier approach (Option B) once we've accumulated enough
labeled outcome data from the static-threshold period itself.

## Consequences
- Positive: ships quickly, with no new model to build, validate, or
  maintain -- directly addresses the Build vs. Buy framework's "team
  expertise" factor, since we have no existing classifier for this.
- Positive: the static-threshold period itself generates exactly the
  labeled data a future learned classifier would need, turning
  Option A into real preparation for Option B rather than a dead end.
- Negative: a single fixed cutoff won't generalize equally well
  across all question types -- we accept a less precise threshold now
  in exchange for shipping sooner and gathering real data.
- Negative: will require manual threshold re-tuning if question
  patterns shift meaningfully before we move to Option B.

## Alternatives Considered
- Learned classifier from day one (Option B): rejected for now --
  we lack the labeled data to train or validate it reliably, and
  building one is itself new engineering and maintenance surface
  area we don't yet have a proven need for.
- No threshold at all (status quo): rejected -- this is the actual
  problem being solved; the risk of confidently wrong answers reaching
  customers unreviewed is the reason this ADR exists.
```

</details>

## Where honest disagreement with the model answer is fine

If you proposed going straight to a learned classifier because Northbeam actually already has enough historical data (a detail this scenario didn't fully specify), that's a legitimate, defensible call — the point of this exercise isn't matching the model answer's conclusion exactly, it's reasoning the way the model answer reasons: naming the real trade-off, being honest about what's unknown, and writing the decision down so it can be understood and challenged later.

## Why this exact exercise shows up in real interviews

"Walk me through how you'd decide X" is one of the most common Staff/Principal interview formats precisely because it tests everything this course covered at once: can you structure an ambiguous decision, name real trade-offs honestly, and communicate the reasoning clearly — not just arrive at *an* answer, but demonstrate the thinking that makes the answer defensible to someone who wasn't in the room when you reached it.

## Key terms

| Term | Meaning |
|---|---|
| Confidence threshold | A rule routing low-confidence AI answers to a human reviewer instead of showing a possibly-wrong answer directly |

## Check yourself

The model ADR chose a static threshold over a learned classifier specifically because of a stated data limitation. If Northbeam already had years of labeled "was this answer correct" data, would the model ADR's reasoning still support the same decision — why or why not?
