# Lesson 10 — Choosing a Model for a Task

**Chapter 2 · The LLM Landscape · Lesson 10 of 31**

## What you'll learn

- The four criteria Anthropic's own documentation says to weigh before picking a model
- The two legitimate starting strategies from Lesson 6, applied as an actual decision process
- A worked example mapping three real tasks to three different tiers
- Why "just use the best model" is the wrong default, and what to do instead

## Start with the actual criteria, not a gut feeling

Anthropic's own "choosing a model" documentation lays out four factors to weigh before picking
anything, and they generalize well beyond just Claude:

1. **Capabilities** — what does this task specifically require? Long-context reasoning? Tool use?
   Vision? Not every task needs the same capabilities.
2. **Speed** — how fast does this need to respond? A real-time chat UI and an overnight batch job
   have completely different latency tolerances.
3. **Cost** — what's the actual budget, including at production volume, not just for a demo?
4. **Effort / tuning** — some models expose a parameter that trades intelligence for latency and
   cost within the *same* model, before you even consider switching models entirely. Tuning that
   knob is often a better first lever than jumping to a different tier.

## Pick a starting strategy, then test

Lesson 6 introduced two strategies; this lesson is about actually running one:

- **Efficiency-first**: implement with the cheapest/fastest model, test thoroughly against real
  examples, and upgrade only where testing reveals an actual capability gap. Best when you're
  prototyping, cost-sensitive, or handling high-volume straightforward requests.
- **Capability-first**: implement with the strongest available model for a genuinely complex
  task, then look for room to step down in tier once you understand what the task actually
  requires. Best for complex reasoning, advanced coding, or anything where accuracy outweighs
  cost.

Neither strategy is "always pick the biggest model." Both insist on testing against your actual
use case before committing — a benchmark score or a provider's marketing copy isn't a substitute
for trying it on your real data.

## A worked example

Three tasks, three different honest answers:

- **A customer-support chatbot answering FAQ-style questions** — high volume, low complexity per
  request, tight latency expectations. Start efficiency-first, with the fastest/cheapest tier.
- **Drafting a first-pass product requirements document from a messy meeting transcript** —
  moderate complexity, not real-time, accuracy matters more than speed. A balanced, mid-tier model
  is usually the right starting point.
- **A multi-step coding agent refactoring a large, unfamiliar codebase across dozens of files** —
  long-horizon reasoning, high accuracy requirements, tool use. Start capability-first, with the
  flagship tier, and only look to downgrade once the workflow is proven.

## Decide whether to change models, with evidence

Once a model is live, deciding whether to upgrade or switch isn't a vibe check — it follows the
same evaluation discipline every time: build a benchmark/test set specific to your actual use
case, run your real prompts and data against candidate models, compare accuracy and quality and
edge-case handling, then weigh that against the cost difference. A good evaluation set is the
single most important part of this process — more important than any provider's published
benchmark.

## Key terms

| Term | Meaning |
|---|---|
| Capabilities | What specific features a task genuinely needs (context length, tool use, vision) |
| Effort parameter | A setting that trades intelligence for latency/cost within one model |
| Evaluation set | Real examples from your actual use case, used to compare models honestly |

## Check yourself

Before Lesson 11, you're ready to move on when you can explain, without looking: why does tuning
a model's effort parameter often come before switching to a different model tier entirely?
