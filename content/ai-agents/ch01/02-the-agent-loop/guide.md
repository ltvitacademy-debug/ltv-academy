# Lesson 2 — The Agent Loop: Plan, Act, Observe

**Chapter 1 · What an AI Agent Actually Is · Lesson 2 of 32**

## What you'll learn

- The three repeating steps every agent loop is built from
- What actually tells an agent to stop
- A real trace of a loop running, step by step
- Why the loop — not any single clever prompt — is the mechanism that makes agents work

## Three steps, repeated

Lesson 1 drew the loop at a high level. This lesson opens it up. Every
agent loop, however it's implemented, comes down to three repeating steps:

1. **Plan** — given the goal and everything learned so far, the model
   decides what to do next: call a specific tool with specific arguments,
   or decide it's done and respond.
2. **Act** — the chosen action actually runs. For a tool call, your
   application code executes it (Lesson 3 covers the API shape of this).
3. **Observe** — the result (or error) comes back into the model's
   context as a `tool_result`, and the model reads it before planning
   again.

Then it repeats, from step 1, using everything observed so far — not just
the original request.

```
      +-------------------------------------------+
      |                                             |
      v                                             |
   PLAN  -- decide next action -->  ACT  -- run it --> OBSERVE
   (model reasons,                 (tool runs,          (result goes
    picks a tool or                 your code              back into
    decides "done")                 executes)              context)
                                                             |
                                                             v
                                              loop again, OR stop and reply
```

## What actually stops the loop

Three things end a loop, and a production agent needs to handle all
three, not just hope for the first one:

- **The model decides it's done.** It has enough information to answer
  and stops requesting tools — in the Claude API, this shows up as
  `stop_reason: "end_turn"` instead of `stop_reason: "tool_use"`.
- **Your code enforces a limit.** A maximum step count, a token/cost
  budget, or a wall-clock timeout — Chapter 5 of this course ("Agent
  Safety & Guardrails") is built around exactly this, because a model
  that never decides it's done will otherwise run forever.
- **A human intervenes.** Chapter 4 ("Human-in-the-Loop & Approval")
  covers pausing the loop at a checkpoint before a consequential action,
  rather than letting it run unattended to completion.

## A real trace

Here's what three iterations actually look like for an agent answering
"What's the weather in the city with the most open support tickets right
now?" — a question no single tool answers on its own.

```
Iteration 1
  PLAN:    needs the city first -> call get_top_ticket_city()
  ACT:     get_top_ticket_city() runs
  OBSERVE: tool_result -> {"city": "Austin, TX", "open_tickets": 41}

Iteration 2
  PLAN:    now has the city -> call get_weather(location="Austin, TX")
  ACT:     get_weather() runs
  OBSERVE: tool_result -> {"temp_f": 97, "conditions": "sunny"}

Iteration 3
  PLAN:    has everything needed -> no more tool calls, write final reply
  ACT:     (none — this is the model's final answer)
  STOP:    stop_reason: "end_turn"
```

Each iteration's plan depends on what the previous iteration observed —
the model couldn't have called `get_weather` with the right city on
iteration 1, because it didn't know the city yet. That dependency is the
entire reason the loop has to be a loop, and not one planning step
followed by several parallel actions.

## Key terms

| Term | Meaning |
|---|---|
| Agent loop | The repeating plan → act → observe cycle an agent runs until it stops |
| `stop_reason` | The field in a model's response that tells your code why it stopped (e.g., `end_turn` vs. `tool_use`) |
| Iteration / step | One full pass through plan → act → observe |
| Termination condition | Whatever ends the loop: model decision, hard limit, or human interrupt |

## Check yourself

You're ready for Lesson 3 when you can explain why the three-iteration
weather example above couldn't be done with a single "plan everything up
front" step instead of a loop.
