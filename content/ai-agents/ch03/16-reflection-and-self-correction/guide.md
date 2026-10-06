# Lesson 16 — Reflection & Self-Correction

**Chapter 3 · Agent Architectures & Patterns · Lesson 16 of 32**

## What you'll learn

- What a reflection step actually adds to an agent's process
- The evaluator-optimizer pattern: Anthropic's own name for this workflow
- A real before/after trace showing reflection catching a real mistake
- Where reflection fits relative to everything else in this chapter

## Critiquing your own output before it ships

Every pattern so far in this chapter — ReAct, planning, multi-agent,
orchestrator/worker — is about getting from a goal to a first answer.
**Reflection** adds one more step after that: have the agent (or a
second, separate pass) critique its own intermediate output or plan and
revise it, catching mistakes the earlier stages missed, before the
result goes anywhere further.

Anthropic's own published engineering guidance names this concretely as
the **evaluator-optimizer** workflow: one LLM call generates a response,
while a second LLM call evaluates it and provides feedback, looping
between the two until the evaluator is satisfied. It's deliberately
structured as two roles, even if the same model plays both — generation
and evaluation are different jobs, and conflating them in a single pass
is exactly what lets mistakes slip through unchecked.

```
Generate -> draft output
   |
   v
Evaluate -> does this actually satisfy the goal? what's wrong?
   |
   +-- satisfied -> done, output the draft
   |
   +-- not satisfied -> feedback -> Generate again (revised) -> ...
```

## A real mistake, caught

Goal: "Summarize this contract's termination clause in plain language."

```
Generate (draft): "Either party can cancel anytime with no penalty."

Evaluate: Re-reading the source clause — it actually says 30 days'
  written notice is required, and cancellation before the 1-year mark
  incurs an early-termination fee. The draft dropped both conditions.
  NOT SATISFIED. Feedback: "Draft omits the notice period and the
  early-termination fee. Revise to include both."

Generate (revised): "Either party can cancel with 30 days' written
  notice; canceling before the 1-year mark incurs an early-termination
  fee."
```

The first draft wasn't a tool-use error or a routing mistake — it was a
plausible-sounding, confidently wrong summary that a single
generate-and-stop pass would have shipped as-is. The evaluator step is
what caught it, by checking the output against the actual source rather
than trusting the generation step's own confidence.

## Where reflection fits

Reflection isn't a replacement for ReAct, planning, or orchestrator/worker
— it's an additional layer that can wrap around any of them. A
planning agent can reflect on its plan before executing; an orchestrator
can reflect on a worker's result before synthesizing it into the final
output. Like every pattern in this chapter, it adds real cost (another
model call, more latency) and earns that cost specifically on outputs
where a wrong-but-confident answer is worse than the extra round trip —
summaries of source material, generated code, anything a human will act
on without independently re-checking it themselves.

## Key terms

| Term | Meaning |
|---|---|
| Reflection | An agent (or a second pass) critiquing its own output or plan and revising before finalizing |
| Evaluator-optimizer | Anthropic's name for the two-role generate/evaluate/revise loop |
| Plausible-but-wrong output | A confident, well-formed answer that is nonetheless factually incorrect — reflection's primary target |

## Check yourself

You're ready for Lesson 17 when you can explain why the evaluator role in
the contract example needed to re-check the draft against the *source*
clause, not just re-read the draft on its own.
