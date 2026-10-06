# Lesson 4 — Agent Frameworks, Overview

**Chapter 1 · What an AI Agent Actually Is · Lesson 4 of 32**

## What you'll learn

- Why a framework exists at all, given that Lesson 3 already covered the raw mechanism
- Four real, current frameworks and how each one actually positions itself
- An important industry shift this course won't pretend didn't happen
- How to pick, without this course locking you into one

## What a framework actually adds

Lesson 3 covered the whole raw mechanism: a schema, a `tool_use` block, a
`tool_result` block. You could write the loop from Lesson 2 yourself in a
few dozen lines. A framework exists to save you from rewriting the same
handful of hard parts on every project: the loop itself, state and
conversation history, retries and error recovery (Lesson 8), multi-agent
coordination (Chapter 3), and integrations with external tools and data
sources. None of them replace the mechanism — they wrap it.

## Four real frameworks, as they actually position themselves today

**Claude Agent SDK** (Anthropic) — the same agent loop, built-in tools,
and context management that power Claude Code itself, available as a
library: `npm install @anthropic-ai/claude-agent-sdk` or
`pip install claude-agent-sdk`. It runs the tool-execution loop for you
and adds subagents (Lesson 14), hooks, permissions, and native MCP
support. It's Anthropic's own answer to "I want Claude Code's agent loop
in my own application," not a general multi-vendor abstraction layer.

**LangGraph** (LangChain) — an open-source, graph-based agent runtime:
you define nodes (steps) and edges (transitions and routing logic)
explicitly, and the framework manages state across them. It leans toward
low-level control rather than hiding the orchestration from you, which is
why it's commonly reached for on complex, production, stateful workflows
where you want to see and control exactly how state moves between steps.

**CrewAI** — a role-based multi-agent framework: you define a "crew" of
agents, each with a role, a goal, and a set of tools, plus the tasks they
collaborate on. It optimizes for how fast you can stand up a working
multi-agent system (Chapter 3), at the cost of less granular control over
exactly how agents hand off work compared to LangGraph's explicit graph.

**AutoGen → AG2 / Microsoft Agent Framework** — AutoGen pioneered the
"agents as conversational participants" pattern (agents talk to each
other in a shared group chat to solve a task), but Microsoft placed the
original AutoGen project into maintenance mode in October 2025. Two
things carry that idea forward now: **AG2**, an actively developed,
community-run open-source fork by AutoGen's original creators, and
**Microsoft Agent Framework**, Microsoft's own official successor that
merges AutoGen's and Semantic Kernel's ideas, which reached a stable 1.0
release in 2026. If you see "AutoGen" referenced in older material,
mentally substitute one of these two as the actively maintained option.

## Why this course doesn't pick one for you

This course teaches the concepts underneath all of them — the loop, tool
schemas, routing, planning, multi-agent coordination, reflection — using
the raw Claude API directly, the way Lesson 3 did. That choice is
deliberate: the concepts transfer to whichever framework (or no
framework) a real job uses, but framework-specific API calls don't
transfer the other direction. Chapter 3's architecture patterns (ReAct,
planning, orchestrator/worker) are exactly what LangGraph's graphs,
CrewAI's crews, and the Claude Agent SDK's subagents are each, in their
own way, built to express.

## Key terms

| Term | Meaning |
|---|---|
| Agent SDK/framework | A library that wraps the raw loop + tool-use mechanism with conveniences: state, retries, coordination |
| Graph-based orchestration | LangGraph's model: explicit nodes and edges you define, with the framework managing state between them |
| Role-based multi-agent | CrewAI's model: agents defined by role and goal, collaborating on shared tasks |
| Maintenance mode | A project still receiving critical fixes but no new features — AutoGen's status since October 2025 |

## Check yourself

You're ready for Lesson 5 when you can name one real tradeoff between
reaching for a framework versus writing the loop yourself with the raw
API, as this course does.
