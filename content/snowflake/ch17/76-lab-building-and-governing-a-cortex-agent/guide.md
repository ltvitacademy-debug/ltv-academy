# Lesson 76 — Lab: Building and Governing a Cortex Search + Analyst Agent

**Chapter 17 · AI Governance, Evaluation & Security · Lesson 76 of 76 · Final Lesson**

## What you'll learn

- How to assemble a Cortex Agent from the two tools Chapter 16 taught you:
  Cortex Search and Cortex Analyst
- How to apply this chapter's full governance stack to that one agent,
  layer by layer
- A checklist for "is this agent actually production-ready" that you can
  reuse on every agent you build after this course

## The agent you're building

A support/ops agent over two kinds of data: unstructured documents
(troubleshooting guides, past incident write-ups — searched with
**Cortex Search**, Chapter 16 Lesson 63) and structured tables (ticket
volumes, SLA breaches, shipment or order data — queried in natural
language via **Cortex Analyst**, Chapter 16 Lesson 62), combined into one
**Cortex Agent** (Chapter 16 Lesson 64) that picks the right tool per
question, the same orchestration pattern you evaluated in Lesson 69's
real supply-chain example.

## Step 1 — Check the data is actually ready

Before building anything, run the AI Readiness Score check from Lesson 71
against the tables you're about to expose. Low semantic-view coverage on
your ticket/order tables is a signal to build a proper Semantic View
first — with real primary keys, relationships, and metric definitions —
rather than pointing Cortex Analyst at raw, undocumented tables and
hoping the natural-language layer compensates for missing structure.

## Step 2 — Build the two tools

1. A Cortex Search service over your document set (support guides,
   incident reports).
2. A Semantic View over your structured tables, feeding Cortex Analyst —
   this is also the Horizon Context (Lesson 71) artifact that keeps your
   agent's definition of "SLA breach" or "open ticket" consistent with
   whatever a BI tool would show for the same term.

## Step 3 — Combine them into a Cortex Agent, with governance switched on from day one

Rather than bolting governance on after the agent works, wire it in at
the same time you configure the tools:

- **Agent Identity (Lesson 73)** — confirm this agent is recognized as a
  Snowflake-native Cortex Agent; no extra OAuth setup needed, but check
  `QUERY_HISTORY.agent_type` once it's running to confirm it shows
  `CORTEX_AGENT`.
- **Row access + masking, agent-aware (Lesson 75)** — if the ticket table
  has a customer PII column, mask it specifically when
  `IS_AGENT_ACTIVATED` is true, even for a role that would otherwise see
  it unmasked.
- **AI Guardrails (Lesson 72)** — since Cortex Search is feeding this
  agent real documents (some possibly user-submitted, like ticket
  descriptions), enable advanced prompt injection protection via
  `ALTER ACCOUNT SET AI_SETTINGS` before this agent goes anywhere near
  production.
- **Approval gate (Lesson 74)** — if this agent can trigger any
  state-modifying action (closing a ticket, updating an order status),
  either configure `permission_policy: always_ask` if it's using the code
  execution tool, or build the equivalent application-layer gate for
  whichever tool actually performs the write.

## Step 4 — Evaluate it before calling it done

Write five to ten ground-truth question/answer pairs covering both tools
— some that should trigger Cortex Search, some Cortex Analyst, a couple
that need both — and run them through Cortex Agent Evaluation (Lesson
69). Check `tool_selection_accuracy` specifically: a low score there
means the agent is reaching for the wrong tool before it even gets to
answering, which no amount of prompt tuning on the final answer will fix.

## Step 5 — The production-readiness checklist

| Check | From |
|---|---|
| AI Readiness Score checked on source tables | Lesson 71 |
| Semantic View built, not raw tables exposed | Lesson 71 / Ch16 L62 |
| Agent recognized in `QUERY_HISTORY.agent_type` | Lesson 73 |
| Masking/row access policies react to `IS_AGENT_ACTIVATED` | Lesson 75 |
| AI Guardrails enabled against prompt injection | Lesson 72 |
| Approval gate on any state-modifying action | Lesson 74 |
| Evaluation run with all four system metrics reviewed | Lesson 69 |
| Governance reviewed against Horizon's five pillars | Lesson 70 |

That's the honest difference between a demo and a production agent: not
a smarter prompt, but every one of these eight boxes checked before real
users or real data show up.

## Key terms

| Term | Meaning |
|---|---|
| Production-ready agent | One with governance (identity, access, guardrails, approval) and evaluation in place, not just a working demo |
| Tool selection accuracy | The single evaluation metric most likely to expose a wrongly-architected agent, not just a wrongly-worded one |
| Governance from day one | Wiring Agent Identity, masking/RAP, guardrails, and approval gates in alongside the tools, not after |

## Lab

1. Using a dataset you've worked with earlier in this course (any
   chapter), sketch the two tools your agent would need: what would
   Cortex Search index, and what would the Semantic View behind Cortex
   Analyst define?
2. Write the masking policy and row access policy you'd attach, each
   keyed off `IS_AGENT_ACTIVATED`, for whatever column/table in your
   sketch is most sensitive.
3. Walk through the production-readiness checklist above for your
   sketch, honestly marking which boxes you could check today and which
   would need more work.

## Check yourself — and a final one for the course

You've finished all 76 lessons. You're ready to call this chapter (and
the course) done when you can build a Cortex Agent combining Search and
Analyst, and — without looking anything up — name which governance
control from this chapter stops which specific failure: Guardrails
against a malicious document, Agent Identity against an untraceable
action, masking/RAP against an agent over-reaching its role's nominal
privileges, and an approval gate against a consequential action nobody
actually signed off on. That's not trivia — it's the checklist you'll
reach for on every real Cortex Agent you build from here on.

**Course complete.** From Lesson 1's first virtual warehouse to this
agent — storage, compute, loading, transformation, modeling,
semi-structured data, streams and tasks, security, performance, cost,
Power BI, the modern data stack, Cortex AI, and now AI governance. You
have a full, current, production-minded picture of Snowflake — not just
the syntax, but the judgment calls around it.
