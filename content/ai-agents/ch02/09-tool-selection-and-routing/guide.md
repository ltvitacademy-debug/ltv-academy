# Lesson 9 — Tool Selection & Routing

**Chapter 2 · Tool Calling & Function Design · Lesson 9 of 32**

## What you'll learn

- Why tool selection gets harder as the tool count grows, not easier
- Three concrete techniques for keeping selection accurate at scale
- `tool_search`: Anthropic's own answer for genuinely large tool libraries
- How this connects forward to Lesson 10's multi-tool agents

## More tools, more ambiguity

At every step of the loop (Lesson 2), Claude has to pick which tool (if
any) actually matches the current sub-goal, from everything in the
`tools` array. With two or three clearly distinct tools, that's easy.
With twenty — several of which sound like they could plausibly do the
same thing — it isn't. Every tool definition also costs tokens on every
single request in the loop (Lesson 3), so a large, poorly organized tool
set is both less accurate *and* more expensive per step.

This is exactly why Lesson 6's schema-design practices aren't just
hygiene — they're the first and cheapest layer of routing:

- **Consolidation** removes near-duplicate tools before they can compete
  for the same intent (`create_pr` / `review_pr` / `merge_pr` → one
  `manage_pr` tool with an `action` parameter).
- **Namespacing** (`github_list_prs`, `slack_send_message`) keeps tools
  from different domains from ever looking alike to begin with.
- **Precise descriptions** that state what a tool does *and does not* do
  resolve the remaining ambiguity between tools that are genuinely
  similar but not identical.

## When the tool count is simply too large

Sometimes consolidation and naming aren't enough — a real system can have
hundreds or thousands of tools across many integrations, far more than
any single request should carry in its `tools` array. Anthropic's own
current answer for this case is the **tool search tool**: instead of
sending every tool definition up front, Claude discovers and loads
relevant tools on demand, based on the current task, rather than being
handed the entire catalog on every request. This is routing moved into
the platform itself, for exactly the scale where manual organization
stops being enough.

## A routing decision, concretely

For a smaller tool set, routing is implicit in a well-designed schema —
Claude reads the descriptions and picks. For a system you control more
directly, you can also make routing explicit: a lightweight
classification step (even a separate, smaller model call) that narrows
"which 3 of our 40 tools are even plausible here" before the main agent
ever sees the full set. That's the same idea as tool search, implemented
by hand instead of by the platform.

```
Full catalog (40 tools)
   -> classify sub-goal -> plausible subset (3-5 tools)
   -> agent sees ONLY the plausible subset in its tools array
   -> selection is now a much easier choice
```

## Key terms

| Term | Meaning |
|---|---|
| Tool selection | The model's choice of which tool (if any) best matches the current sub-goal |
| Tool search tool | Anthropic's server-side mechanism for discovering/loading relevant tools on demand at large scale |
| Explicit routing | A separate classification step that narrows the tool set before the main agent call, done in your own code |

## Check yourself

You're ready for Lesson 10 when you can explain why consolidating three
near-duplicate tools into one with an `action` parameter is a routing fix
before it's a convenience.
