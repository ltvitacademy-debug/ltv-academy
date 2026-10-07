# Lesson 64 — Cortex Agents: Multi-Step Agentic Orchestration

**Chapter 16 · Cortex AI & Agents on Snowflake · Lesson 64 of 76**

## What you'll learn

- What makes Cortex Agents different from calling AI_COMPLETE, Cortex Analyst, or Cortex Search directly
- The plan → tool use → reflection loop an agent runs for a single request
- The toolbox an agent can reach for: Cortex Analyst, Cortex Search, code execution, custom tools, and more
- How to call the `agent:run` API and read what comes back

## From single calls to a reasoning loop

Lessons 61-63 covered three separate capabilities: generate text
(`AI_COMPLETE`), answer questions over structured data (Cortex Analyst), and
retrieve relevant unstructured text (Cortex Search). A real business
question often needs *more than one of these*, in an order you can't know
in advance. "Did support ticket volume spike after last month's price
change, and what are customers actually complaining about?" needs a
structured query (ticket counts over time) **and** a search over ticket
text **and** a step that combines both into a coherent answer.

**Cortex Agents** is Snowflake's managed orchestration layer for exactly
that: instead of you hand-coding "call Analyst, then call Search, then call
COMPLETE to combine them," you configure an agent with a toolbox and a set
of instructions, and the agent decides which tools to call, in which order,
based on the actual question it receives.

## The reasoning loop: plan, use tools, reflect

Each agent run cycles through three phases, repeating as needed within a
single request:

1. **Planning** — the agent reads the request and decides how to approach
   it, breaking a complex question into smaller subtasks if needed.
2. **Tool use** — it invokes the tools that subtask calls for: Cortex
   Analyst for a structured number, Cortex Search for relevant passages, a
   custom stored procedure for business logic that doesn't fit cleanly in
   SQL.
3. **Reflection** — it evaluates what came back and decides whether it has
   enough to answer, or whether another tool call is needed.

This loop is what "agentic" means in practice here: not a single prompt-in,
answer-out call, but a request that can trigger several tool calls, with
the agent deciding the sequence dynamically rather than following a script
you wrote in advance.

## The toolbox

An agent can be configured with several categories of tools:

| Tool | What it adds |
|---|---|
| Cortex Analyst | Structured-data questions, grounded in a semantic view (Lesson 62) |
| Cortex Search | Retrieval over unstructured text (Lesson 63) |
| Code execution | Runs Python in an isolated sandbox — useful for ad hoc calculations on retrieved data |
| Custom tools | Stored procedures or UDFs for business logic or backend-system calls |
| Data-to-chart | Turns a result set into a visualization as part of the response |
| MCP connectors | Remote tools from other MCP-compatible services (Lessons 66-67) |
| Web search | Real-time public internet lookups, when the answer isn't in your warehouse |

## Calling an agent

Agents run through the `agent:run` REST endpoint. You pass the agent's
configuration (or a reference to a saved agent) plus the user's message;
the response streams back events showing the plan, each tool invocation,
and the final answer — so you can show a user "searching tickets... now
checking order volume..." instead of a silent wait.

```sql
-- A minimal illustration of the shape of an agent config
{
  "tools": [
    { "type": "cortex_analyst_text_to_sql", "name": "order_data" },
    { "type": "cortex_search", "name": "support_ticket_search" }
  ],
  "instructions": "Answer questions about order volume and support tickets. Always cite which tool produced each fact."
}
```

## Key terms

| Term | Meaning |
|---|---|
| Cortex Agents | Snowflake's managed orchestration layer for multi-step, tool-using AI workflows |
| Plan → tool use → reflection | The reasoning loop an agent runs, repeating as needed within one request |
| Tool | A capability an agent can invoke — Cortex Analyst, Cortex Search, custom code, etc. |
| agent:run | The REST API endpoint used to invoke a configured agent |

## Lab

1. Take the "ticket volume spike after a price change" question from this
   lesson and sketch, step by step, which tool you'd expect an agent to
   call first, second, and third, and why that order makes sense.
2. List one business question from your own work or studies that would
   need at least two different tools (structured + unstructured, or
   structured + custom logic) to answer well.

## Check yourself

You're ready for Lesson 65 when you can describe the plan → tool use →
reflection loop in your own words, and can name at least three different
tool types an agent can be configured with.
