# Lesson 5 — When Agents Are Overkill

**Chapter 1 · What an AI Agent Actually Is · Lesson 5 of 32**

## What you'll learn

- The real costs an agent loop adds that a single prompt doesn't
- A simple test for whether a task actually needs one
- Three concrete "looks like it needs an agent, but doesn't" examples
- Why Anthropic's own guidance is to find the simplest solution first

## The costs nobody puts on the slide

Chapter 1 has spent four lessons building up what agents can do. This
lesson is the deliberate counterweight, because every one of those
capabilities has a real cost:

- **Latency** — every extra loop iteration (Lesson 2) is a full model
  round trip. A three-step agent is at minimum three times slower than
  one well-crafted prompt.
- **Cost** — more iterations means more input and output tokens billed,
  and each tool definition in the `tools` array (Lesson 3) adds tokens to
  every single request in the loop, not just the first.
- **New failure modes** — a single prompt either answers well or badly.
  An agent can also call the wrong tool, loop without making progress, or
  misread a tool's result and act confidently on a wrong conclusion.
  Lesson 2's termination conditions exist specifically to bound this.
- **More to build and test** — tool schemas, error handling (Lesson 8),
  routing logic (Lesson 9) — all real engineering surface a single prompt
  doesn't have.

Anthropic's own published engineering guidance on this is direct: find
the simplest solution possible, and only increase complexity when a
simpler approach genuinely falls short. For many real applications, one
well-optimized LLM call with good retrieval and in-context examples is
already enough — no loop required.

## A simple test

Ask one question: **does answering this well require information or an
action the model doesn't already have, discovered through more than one
step, where later steps depend on earlier results?**

- If the answer is no — the model can do it in one pass from what's
  already in context — an agent adds cost and latency for nothing.
- If the answer is yes, but it's always exactly the same sequence of
  steps in the same order — that's a **workflow** (Lesson 1's term): code
  that calls the model and tools in a fixed path. You get the tool access
  without paying for the model to re-decide the obvious next step every
  time.
- Only if the actual sequence of steps has to vary based on what's
  discovered along the way does it need a real agent loop.

## Three cases that look like agents but aren't

1. **"Summarize this document and extract the key dates."** One pass,
   one prompt, no tool needed — the whole task is already in context.
2. **"Fetch this week's sales report, then always email it to the
   same three people."** The sequence never varies — this is a fixed
   workflow (fetch, then send), not a model deciding what to do next.
3. **"Classify this support ticket into one of five categories."** A
   single, well-defined transformation a direct prompt already solves
   reliably — exactly the overkill case from this course's own quiz bank
   in Lesson 1.

Each of these could technically be wired through an agent loop. None of
them benefit from it — they'd just get slower and more expensive for the
same answer.

## Key terms

| Term | Meaning |
|---|---|
| Workflow | Your code calling the model/tools in a fixed, predetermined sequence — no step-by-step model decision-making |
| Latency cost | The real round-trip time an extra loop iteration adds, compounding with each step |
| Simplest-solution-first | Anthropic's own guidance: increase complexity (workflow, then agent) only when a simpler approach actually falls short |

## Check yourself

You're ready for Chapter 2 when you can correctly sort a new task
description into "single prompt," "fixed workflow," or "needs a real
agent loop" — and explain why.
