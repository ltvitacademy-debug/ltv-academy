# Lesson 15 — Orchestrator/Worker Patterns

**Chapter 3 · Agent Architectures & Patterns · Lesson 15 of 32**

## What you'll learn

- Orchestrator/worker as a specific answer to Lesson 14's coordination problem
- The real distinction from a fixed plan: who decides the subtask breakdown, and when
- A full worked example with a dynamic (not fixed) task split
- How this maps directly onto Claude Agent SDK subagents

## A specific shape for multi-agent coordination

Lesson 14 ended on coordination as the real cost of multi-agent systems.
**Orchestrator/worker** is one well-defined shape for paying that cost
deliberately: a central agent (the **orchestrator**) breaks the overall
goal into sub-tasks and delegates each one to a specialized **worker**
agent, then collects and synthesizes their results. The orchestrator
never does the specialized work itself — its whole job is decomposition,
delegation, and assembly.

```
User goal
   |
   v
Orchestrator  -- decides the breakdown, delegates each piece
   |     |     |
   v     v     v
Worker1 Worker2 Worker3   -- each does ONE focused sub-task
   |     |     |
   v     v     v
Orchestrator  -- collects results, synthesizes final output
```

## The real distinction from a fixed plan

Lesson 13's planning agent generates an ordered sequence upfront. The
orchestrator pattern's defining feature, per Anthropic's own description
of it, is that the subtasks **aren't predefined** — the orchestrator
determines them dynamically based on the specific input, because the
right breakdown genuinely can't be known in advance. That's the signal
for reaching for this pattern over a fixed plan: not "this task has
multiple steps," but "the number and shape of the needed sub-tasks
depends on what's actually in this particular request."

## A worked example: a dynamic breakdown

Goal: "Find everything relevant to this new competitor announcement and
summarize the impact."

```
Orchestrator reads the announcement, decides it needs:
  - a worker for competitor background (since this one is new,
    unlike a known competitor the orchestrator could skip)
  - a worker for the specific product overlap with our catalog
  - a worker for pricing comparison (because pricing was mentioned
    in the announcement — otherwise this worker wouldn't be spawned)

Each worker researches its piece independently.
Orchestrator synthesizes: "Overview + overlap + pricing analysis."
```

A different announcement — one with no pricing mentioned — would get a
different number of workers. The orchestrator decided that shape from
this input, not from a template written in advance.

## Mapping onto Claude Agent SDK subagents

This pattern and Lesson 14's subagents aren't two separate things — the
orchestrator role is what a main agent plays when it invokes subagents
for focused pieces of a larger goal, and each subagent is a worker,
running with the separate context Lesson 14 covered. Orchestrator/worker
is the *pattern name* for organizing work this way; subagents are the
*mechanism* the Claude Agent SDK provides to implement it.

## Key terms

| Term | Meaning |
|---|---|
| Orchestrator | The central agent that decomposes a goal, delegates sub-tasks, and synthesizes results — never does the specialized work itself |
| Worker | A specialized agent that executes one delegated sub-task |
| Dynamic decomposition | Sub-tasks determined by the orchestrator based on the specific input, not fixed in advance |

## Check yourself

You're ready for Lesson 16 when you can describe a task where the
orchestrator would spawn a different number of workers depending on the
input — and explain why that rules out a fixed upfront plan instead.
