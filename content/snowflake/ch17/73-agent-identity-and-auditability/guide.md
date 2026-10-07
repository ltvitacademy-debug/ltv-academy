# Lesson 73 — Agent Identity and Auditability

**Chapter 17 · AI Governance, Evaluation & Security · Lesson 73 of 76**

## What you'll learn

- Why "which role ran this query" isn't enough once an agent is involved
- The difference between a delegated agent and an autonomous agent
- Where agent activity actually shows up — `QUERY_HISTORY` and
  `ACCESS_HISTORY`
- How `IS_AGENT_ACTIVATED` lets a policy behave differently when an agent
  is asking

## The gap RBAC alone can't close

Chapter 9 taught you roles and GRANT: who's allowed to do what. That
answers "is this role allowed to read this table" — but it doesn't
answer "was it actually a person who ran this, or an agent acting on
their behalf, and was that appropriate for the task it was doing." A
Cortex Agent typically runs *under* a human's role, which means a plain
query log shows you the role, not whether an agent or a person was
actually driving. **Agent Identity** closes that gap: it lets Snowflake
recognize when an AI agent is active in a session, so you can govern
agent-driven access separately from ordinary human or service access —
and, critically, answer *who authorized the access, which agent carried
it out, and whether the access was appropriate for the task.*

## Two kinds of agents, two setups

Agent Identity covers two different patterns:

- **Delegated agents** act *on a user's behalf* — a Cortex Agent running
  under the session of the person who invoked it. Configuration:
  OAuth integrations with `IS_AGENTIC = TRUE` set on a custom or external
  OAuth security integration. Snowflake-native agents like Cortex Agents
  need no extra setup here — Snowflake already knows they're agents.
- **Autonomous agents** operate under their *own* identity, not a
  human's — a scheduled process with no human in the loop at
  invocation time. Configuration: a `SERVICE_AGENT` user type, using
  workload identity federation, key-pair authentication, or programmatic
  access tokens.

## Where it actually shows up

Agent activity is tagged in the same audit tables you'd already check for
any query, with one new column each:

```sql
-- QUERY_HISTORY: which agent type issued this query
SELECT query_id, query_text, agent_type, user_name, role_name
FROM snowflake.account_usage.query_history
WHERE agent_type IS NOT NULL
ORDER BY start_time DESC;
```

`agent_type` shows `CORTEX_AGENT`, `CORTEX_LITE_AGENT`, or
`EXTERNAL_AGENT`. `ACCESS_HISTORY` gets a parallel `agents_info` column
— ordered agent details for object access, from the nearest agent to the
top-level agent, so a multi-step chain (agent calls agent calls tool)
stays traceable end to end, not collapsed into one anonymous "role did
something" line.

Together, that's enough to reconstruct a full authorization chain: a
user invoked an agent, specific queries followed, specific objects were
accessed — exactly the chain-of-custody detail that financial services,
healthcare, and public-sector compliance frameworks actually ask for.

## Letting policies react to "an agent is asking"

Agent Identity isn't just a log column — it's queryable *inside* a
policy, through `IS_AGENT_ACTIVATED`, which you'll use directly in
Lesson 75 to make a masking or row access policy behave differently when
an agent (rather than a human) is the one asking:

```sql
SELECT SYS_CONTEXT('SNOWFLAKE$CURRENT', 'IS_AGENT_ACTIVATED')::BOOLEAN;
```

That single boolean is what lets you say, inside a policy you already
know how to write from Chapter 9: mask more aggressively, or hide rows
entirely, specifically when an agent is in the execution path — even for
a role that would otherwise see everything.

## Key terms

| Term | Meaning |
|---|---|
| Agent Identity | Lets Snowflake recognize an active AI agent in a session, governed separately from human/service access |
| Delegated agent | Acts on a user's behalf (e.g. a Cortex Agent) — configured via `IS_AGENTIC = TRUE` on an OAuth integration |
| Autonomous agent | Operates under its own identity — configured as a `SERVICE_AGENT` user |
| `agent_type` | `QUERY_HISTORY` column identifying `CORTEX_AGENT`, `CORTEX_LITE_AGENT`, or `EXTERNAL_AGENT` |
| `agents_info` | `ACCESS_HISTORY` column with ordered agent details, nearest agent to top-level agent |
| `IS_AGENT_ACTIVATED` | Context function a masking/row access policy can check to react to agent-driven queries |

## Lab

1. Write the `SELECT` against `QUERY_HISTORY` above, and predict what
   you'd expect to see in `agent_type` for a query a Cortex Agent ran
   versus one a human ran from a plain worksheet.
2. For a scheduled, unattended pipeline step that calls Cortex with no
   human present, decide: delegated or autonomous agent? Justify it in
   one sentence.
3. Write the one-line `SELECT` that checks `IS_AGENT_ACTIVATED` directly.

## Check yourself

You're ready for Lesson 74 when you can explain the difference between a
delegated and an autonomous agent, and name the two audit tables (and
their agent-specific columns) where that distinction actually shows up.
