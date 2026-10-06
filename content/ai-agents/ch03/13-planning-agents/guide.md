# Lesson 13 — Planning Agents

**Chapter 3 · Agent Architectures & Patterns · Lesson 13 of 32**

## What you'll learn

- How a planning agent differs from the purely reactive loop built so far
- Upfront planning vs. the more common pattern: plan, then revise as you go
- A real planned sequence, and what happens when step 2 invalidates step 4
- When planning is worth the extra step, and when it's just overhead

## Reactive vs. planning

Every agent through Lesson 12 has been **reactive**: at each step, decide
the single next action based on the current state, nothing further
ahead. That works well when each step's right answer only depends on
what was just observed. A **planning agent** adds one explicit step
before execution starts: decompose the goal into an ordered sequence of
sub-steps *first*, then execute against that plan — revising it as new
information arrives, rather than deciding one action at a time with no
sense of the steps still ahead.

```
Reactive:  observe -> decide ONE action -> act -> observe -> decide...
Planning:  decompose goal -> [step1, step2, step3, ...]
           -> execute step1 -> (replan if needed) -> execute step2 -> ...
```

## Why plan at all, if you revise anyway

If a plan can change mid-execution, it's fair to ask what the upfront
step bought you. Two real things:

- **Coordinated sub-tasks.** Some goals need steps done in a sensible
  order for reasons the model can't see one action at a time — e.g.,
  "research three competitors, then write a comparison" needs all three
  research steps done before the comparison step can start. A reactive
  loop can stumble into this order by luck; a plan makes the dependency
  explicit upfront.
- **A visible structure to revise against.** "Replan after step 2" only
  means something if there was a plan to begin with. Without one, every
  step is implicitly a fresh decision with no record of what was
  supposed to happen next — which Lesson 17's state and memory concerns
  make considerably harder to manage well.

## A real planned sequence, and a forced revision

Goal: "Compile this quarter's top-3 regional sales figures into one
summary report."

```
Plan (generated upfront):
  1. get_region_sales(region="West")
  2. get_region_sales(region="East")
  3. get_region_sales(region="South")
  4. compose_summary(west, east, south)

Execute step 1: OK. Execute step 2: OK.
Execute step 3: get_region_sales(region="South") -> ERROR:
  "South" was renamed to "South-Central" last quarter.

Replan: step 3 becomes get_region_sales(region="South-Central"),
  steps 1, 2, and 4 are unaffected and stay as planned.
```

The plan isn't abandoned on step 3's error — only the one invalidated
step gets replaced, and the rest of the structure (what's already done,
what's still ahead) stays intact. That's the practical benefit over pure
reactivity: a wrong turn corrects locally instead of restarting the
model's sense of the whole task from scratch.

## When planning is worth it

Planning adds real overhead — Lesson 5's costs apply here too, plus the
latency of the planning step itself. It earns its keep on **goals with
several sub-tasks whose relative order matters**, especially when some
sub-tasks can run independently of each other. For a task that's really
just "decide the next single action, repeatedly," the reactive loop from
Chapter 1 is simpler and just as effective — planning is a tool for
structure, not a default upgrade.

## Key terms

| Term | Meaning |
|---|---|
| Reactive agent | Decides one next action at a time based on current state, no explicit multi-step plan |
| Planning agent | Decomposes a goal into an ordered sequence of steps upfront, then executes and revises as needed |
| Replanning | Updating part of an existing plan in response to new information, without discarding the whole structure |

## Check yourself

You're ready for Lesson 14 when you can describe a real task where
reactive, one-step-at-a-time decisions would plausibly do the sub-tasks
in a bad order — and why an upfront plan avoids that.
