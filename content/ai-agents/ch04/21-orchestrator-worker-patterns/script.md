# Script — Orchestrator/Worker Patterns

## Segment 1 (title)

Orchestrator/worker is one well-defined shape for paying Lesson 14's coordination cost deliberately: a central orchestrator breaks the goal into sub-tasks and delegates each one to a specialized worker, then collects and synthesizes their results. The orchestrator never does the specialized work itself.

## Segment 2 (code: the real distinction from a fixed plan)

Lesson 13's planning agent generates an ordered sequence upfront. The orchestrator's defining feature is that subtasks aren't predefined — it determines them dynamically based on the specific input, because the right breakdown genuinely can't be known in advance.

## Segment 3 (code: a worked example, dynamic breakdown)

A competitor announcement gets read, and the orchestrator decides it needs a background worker, a product-overlap worker, and a pricing worker — because pricing was actually mentioned. A different announcement with no pricing would spawn a different number of workers. That shape came from this input, not a template.

## Segment 4 (code: mapping onto subagents)

This pattern and Lesson 14's subagents aren't two separate things. The orchestrator role is what a main agent plays when it invokes subagents for pieces of a larger goal, and each subagent is a worker. Orchestrator/worker is the pattern name; subagents are the Claude Agent SDK's mechanism for it.

## Segment 5 (outro)

The orchestrator's whole job is decomposition, delegation, and assembly — never the specialized work itself. Next up: what happens when a worker's own output needs to be checked before it's trusted.
