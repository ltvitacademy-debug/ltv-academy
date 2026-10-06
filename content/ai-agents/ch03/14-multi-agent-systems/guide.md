# Lesson 14 — Multi-Agent Systems

**Chapter 3 · Agent Architectures & Patterns · Lesson 14 of 32**

## What you'll learn

- Why one agent with every tool isn't the same as several focused agents
- A real mechanism for this in the Claude Agent SDK: subagents
- A concrete three-agent example and what each one actually owns
- The real cost multi-agent systems add — coordination

## One large agent vs. several focused ones

A single agent holding every tool from Lesson 10 technically *can* do
research, write code, and review its own output — it just has to decide
correctly among dozens of tools and keep every role's context in the same
window at once. A **multi-agent system** splits that up: each agent gets
a narrower role, its own focused tool set, and its own context, rather
than one generalist juggling all of it. Lesson 9's routing problem gets
easier for the same reason consolidation helped it before — fewer,
better-scoped choices per decision point.

This isn't free reorganization — it trades tool-selection ambiguity
(Lesson 9) for a new problem: coordinating separate agents that each only
see part of the picture. Whether that trade is worth it is this lesson's
real question.

## A real mechanism: Claude Agent SDK subagents

Lesson 4 introduced the Claude Agent SDK as Anthropic's own library
version of Claude Code's loop. **Subagents** are its concrete answer to
multi-agent systems: specialized agents a main agent can invoke for
focused subtasks, each maintaining **separate context** from the main
agent. That separation is the actual point — a subagent doing deep
research doesn't flood the main agent's context with every intermediate
search result, only the distilled outcome comes back. Subagents can be
defined programmatically, as markdown files in a project's agent
directory, or the SDK's built-in general-purpose subagent can be invoked
with no setup at all.

## Three agents, three narrow roles

A concrete split for "research a topic and produce a reviewed summary":

```
Research agent   -- tools: web_search, fetch_page
                     owns: gathering raw source material
Writer agent     -- tools: none (pure generation)
                     owns: drafting a summary from research's output
Reviewer agent   -- tools: none (pure evaluation)
                     owns: checking the draft against the sources,
                           flagging unsupported claims
```

Each agent's context stays scoped to its own job — the writer never sees
the research agent's raw search results, only its distilled findings, the
same high-signal principle Lesson 11 applied to a single tool's output,
now applied to what one agent hands another.

## The cost multi-agent systems actually add

Splitting work across agents doesn't remove complexity — it moves it
into **coordination**: who talks to whom, in what order, and who
resolves disagreement if the reviewer rejects the writer's draft. Lesson
15 (orchestrator/worker) and Lesson 16 (reflection) are both answers to
pieces of that coordination problem. A multi-agent system earns its
complexity when roles are genuinely separable with clean hand-offs — not
whenever a task merely feels big.

## Key terms

| Term | Meaning |
|---|---|
| Multi-agent system | Several agents, each with a narrower role and tool set, collaborating on one overall goal |
| Subagent | The Claude Agent SDK's mechanism for invoking a specialized agent with its own separate context |
| Coordination cost | The complexity of managing hand-offs, ordering, and disagreement between separate agents |

## Check yourself

You're ready for Lesson 15 when you can explain why a subagent's
*separate* context is the actual mechanism making multi-agent systems
useful, not just an implementation detail.
