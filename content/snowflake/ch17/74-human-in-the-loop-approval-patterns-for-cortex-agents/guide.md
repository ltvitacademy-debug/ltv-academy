# Lesson 74 — Human-in-the-Loop: Approval Patterns for Cortex Agents

**Chapter 17 · AI Governance, Evaluation & Security · Lesson 74 of 76**

## What you'll learn

- An honest answer to "does Snowflake have a human-in-the-loop feature":
  yes, for one specific tool — and a pattern, not a single feature, for
  everything else
- The real `permission_policy` mechanism (`always_ask` / `always_allow`)
  for the code execution tool
- Exactly what happens, step by step, when an agent hits an approval gate
- How to build the same kind of gate for a tool type that doesn't ship
  one out of the box, using what Lessons 70 and 73 already gave you

## A note on how this lesson was researched

Worth saying directly, since it's easy to assume otherwise: Snowflake
does not document one single feature literally named "human-in-the-loop"
that covers every Cortex Agent tool type. What it *does* document is a
real, specific `permission_policy` mechanism for the **code execution
tool** (Lesson 16's agent tool-calling, applied to `code_execution` and
`code_toolset_all`), and a broader governance pattern — Agent Identity
plus Horizon policies plus your own approval step — for gating other
kinds of consequential actions. This lesson teaches both, honestly
labeled as what they are.

## The real mechanism: `permission_policy`

When a Cortex Agent's tool configuration includes a code execution tool,
you control approval with a `permission_policy` field nested under
`tool_resources`:

```json
{
  "tools": [
    { "tool_spec": { "type": "code_execution", "name": "code_execution" } }
  ],
  "tool_resources": {
    "code_execution": {
      "permission_policy": { "type": "always_ask" }
    }
  }
}
```

Two values:

| Value | Behavior |
|---|---|
| `always_ask` (default) | Always prompt for approval before executing a state-modifying tool call |
| `always_allow` | Skip the approval check entirely — the agent executes without asking |

## What actually happens under `always_ask`

This isn't just a config flag that silently logs the action — it changes
the agent's execution flow. Under `always_ask`, when the agent reaches a
state-modifying call, it emits a `tool_use` event and **stops**, waiting.
The calling application resumes execution by sending back a
`permission_decision` content block referencing that tool call's ID, with
the approval choice. Nothing executes in between — the agent is genuinely
paused, not just flagged for after-the-fact review.

`always_allow` skips all of that, which Snowflake's own documentation is
blunt about: use it only in trusted, automated workflows where
human-in-the-loop approval isn't needed — a scheduled task calling
`AGENT_RUN` from SQL, for instance, where there's no interactive session
to pause for approval in the first place.

## Building the same pattern for other tool types

Cortex Analyst and Cortex Search tool calls don't ship a documented
`permission_policy` the way code execution does. If you're building an
application on Cortex Agents and need an approval gate before, say, an
agent-triggered write to a downstream system, you assemble it from pieces
you already have:

1. **Agent Identity (Lesson 73)** tells you, from `agent_type` in
   `QUERY_HISTORY` and `IS_AGENT_ACTIVATED` in a policy, that an agent —
   not a person — is the one about to act.
2. **Horizon governance policies (Lesson 70)** — row access or masking
   keyed off `IS_AGENT_ACTIVATED` — can block or narrow what an agent's
   query is even allowed to touch, as a hard backstop independent of
   whether your approval step works correctly.
3. **Your own application layer** adds the actual gate: before calling
   the tool/action that does the consequential thing, your code checks
   for an approval record (a human clicked "approve" somewhere), the same
   way `always_ask` pauses and waits for a `permission_decision` — you're
   just implementing that same stop-and-wait shape yourself, for a tool
   type Snowflake hasn't pre-built it for.

That's the honest shape of it: one specific, named, documented mechanism
for code execution, and a composable pattern — not a magic feature name
— for everything else.

## Key terms

| Term | Meaning |
|---|---|
| `permission_policy` | Field under `tool_resources` controlling approval for the code execution tool |
| `always_ask` | Default policy — pauses on state-modifying calls until a human approves |
| `always_allow` | Skips approval entirely — only for trusted, unattended automation |
| `tool_use` event | What the agent emits when it stops, waiting for an approval decision |
| `permission_decision` | What the calling application sends back to resume a paused agent |
| Application-layer approval gate | The pattern you build yourself for tool types without a built-in `permission_policy` |

## Lab

1. Write the `tool_resources` JSON snippet that forces `always_ask` on a
   code execution tool, then rewrite it for `always_allow` and explain in
   one sentence when the second one is actually appropriate.
2. Sketch, as a numbered list, the sequence of events from "agent reaches
   a state-modifying call" to "agent resumes execution" under
   `always_ask`.
3. For a hypothetical Cortex Agent that can trigger a Snowflake Task
   (Chapter 8) to kick off a downstream system, design an application-layer
   approval gate using Agent Identity + a row access policy as the
   backstop. Name the three pieces explicitly.

## Check yourself

You're ready for Lesson 75 when you can state, accurately, which part of
Cortex Agents has a documented `permission_policy` and which parts need
you to build the equivalent pattern yourself — and explain why conflating
the two would be a mistake to make in a real production design.
