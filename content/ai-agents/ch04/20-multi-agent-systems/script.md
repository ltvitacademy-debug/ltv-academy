# Script — Multi-Agent Systems

## Segment 1 (title)

One agent holding every tool technically can do research, write, and review its own output — it just has to decide correctly among dozens of tools in one shared context. A multi-agent system splits that up: each agent gets a narrower role, its own tools, and its own context.

## Segment 2 (code: a real mechanism, subagents)

The Claude Agent SDK's concrete answer is subagents: specialized agents a main agent can invoke for focused subtasks, each maintaining separate context. A subagent doing deep research doesn't flood the main agent's context with every search result — only the distilled outcome comes back.

## Segment 3 (code: three agents, three narrow roles)

A research agent owns gathering raw material with search tools. A writer agent, no tools, owns drafting a summary from that research. A reviewer agent, no tools, owns checking the draft against sources. Each one's context stays scoped to its own job.

## Segment 4 (code: the real cost)

Splitting work across agents doesn't remove complexity — it moves it into coordination: who talks to whom, in what order, who resolves it if the reviewer rejects the draft. A multi-agent system earns its complexity when roles are genuinely separable with clean hand-offs, not whenever a task merely feels big.

## Segment 5 (outro)

Separate context is the actual mechanism making this useful — not just an implementation detail. Next up: one specific, common way to organize that coordination, orchestrator and worker.
