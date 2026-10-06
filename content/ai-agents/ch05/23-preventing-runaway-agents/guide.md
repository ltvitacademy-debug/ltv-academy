# Lesson 23 — Preventing Runaway Agents

**Chapter 5 · Agent Safety & Guardrails · Lesson 23 of 32**

## What you'll learn

- What a "runaway" agent actually looks like in practice
- Anthropic's own recommendation for stopping conditions, and why they're not optional
- Three concrete limits to put on every agent loop
- Where these limits sit relative to the approval checkpoints from Chapter 4

## A runaway agent isn't malicious — it's just stuck

"Runaway" doesn't mean an agent turning hostile. In practice it means an
agent loop that keeps running without making progress: retrying a failing
tool call with the same bad arguments, bouncing between two tools that
each undo the other's work, or re-planning the same sub-task over and over
because each attempt produces a result it judges insufficient. Left alone,
that loop keeps consuming tokens, keeps calling tools (some of which have
real side effects), and never terminates on its own — because nothing in
the model's own behavior guarantees it will recognize it's stuck.

Anthropic's own guidance on building agents is explicit that this needs an
external backstop, not just good prompting: include "stopping conditions
(such as a maximum number of iterations) to maintain control." The loop's
own judgment is not the control mechanism — a hard limit enforced by your
code is.

## Three limits, not one

A single "max steps" counter helps, but a runaway loop can blow past a
step budget in different ways, so three separate limits cover more of the
failure space together:

```
MAX_ITERATIONS = 15      # hard cap on tool-call round trips
MAX_WALL_CLOCK = 300      # seconds, regardless of iteration count
MAX_REPEAT_CALLS = 2      # same tool + same input, back to back
```

- **Max iterations** catches a loop that's doing *different* things each
  time but never converging — still moving, never finishing.
- **Max wall-clock time** catches a loop that's technically within its step
  budget but each step is slow (a hanging API call, a huge result to
  process) — bounding by time, not just count.
- **Max repeat calls** catches the narrower, very common case of an agent
  retrying the identical failing call expecting a different result — this
  one should trigger fastest, often after just two identical attempts.

## What happens when a limit trips

Hitting a limit should never be silent. The loop should stop, but the
*system* should report clearly: what the agent was trying to do, how far
it got, and why it stopped (which limit, what the last few steps looked
like). That's the difference between a limit that protects the system and
one that just produces a confusing, half-finished result with no
explanation — the stopped state has to be at least as legible as a normal
completion.

## This complements approval, it doesn't replace it

Chapter 4's approval checkpoints stop a *specific* consequential action
before it runs. These limits stop the *loop itself* from running forever,
independent of whether any individual action was risky. An agent could be
calling only safe, pre-approved, read-only tools and still need a hard
iteration cap, because the risk here isn't one bad action — it's unbounded
cost and unbounded time with no human in sight. Both controls run at once,
addressing different failure modes.

## Key terms

| Term | Meaning |
|---|---|
| Runaway agent | A loop that keeps running without converging on a result, consuming resources with no natural stopping point |
| Stopping condition | A hard, code-enforced limit (iterations, time, repeats) that ends a loop regardless of the model's own judgment |
| Max repeat calls | A limit on identical tool calls (same tool, same input) made back-to-back |
| Wall-clock limit | A time-based cap independent of how many steps have run |

## Check yourself

An agent calls `search_knowledge_base` nine times in a row with nine
different queries, never calling any other tool, and still hasn't answered
the user after four minutes. Which of the three limits should catch this,
and why might the other two not?
