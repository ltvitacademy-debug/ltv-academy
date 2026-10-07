# Lesson 66 — The Snowflake-Managed MCP Server

**Chapter 16 · Cortex AI & Agents on Snowflake · Lesson 66 of 76**

## What you'll learn

- What MCP (Model Context Protocol) is, in one sentence
- What Snowflake's managed MCP server exposes, and what it deliberately leaves out
- How authentication and governance carry over automatically from Snowflake's own RBAC
- The concrete limits you'd hit building against it (tool count, response size, recursion depth)

## MCP in one sentence

The **Model Context Protocol (MCP)** is an open standard for how an AI
agent discovers and calls tools exposed by a server — think of it as a
common plug shape, so any MCP-aware client (an AI assistant, an IDE, an
agent platform) can talk to any MCP-aware server without custom
integration code for each pair. Snowflake's contribution is a **managed
MCP server**: rather than you standing up your own MCP server and wiring
it to Snowflake yourself, Snowflake runs one for you, with Cortex's
capabilities already exposed as tools.

## What it exposes

The Snowflake-managed MCP server bundles a specific set of tools:

| Tool | What it calls |
|---|---|
| `CORTEX_AGENT_RUN` | Invokes a configured Cortex Agent (Lesson 64) as a single tool |
| `CORTEX_ANALYST_MESSAGE` | Natural-language-to-SQL over a semantic view (Lesson 62) |
| `CORTEX_SEARCH_SERVICE_QUERY` | Retrieval over a Cortex Search service (Lesson 63) |
| `SYSTEM_EXECUTE_SQL` | Direct SQL execution, with an optional read-only mode |
| Custom (`GENERIC`) tools | Your own stored procedures or UDFs, exposed as MCP tools |

A single server can expose up to **50 tools**. Protocol-wise, Snowflake
supports **MCP protocol revision 2025-11-25** — but it's honest to be
specific about what it does *not* implement from the broader MCP spec:
**resources, prompts, roots, and notifications** are not supported. If an
MCP client expects a server to offer browsable resources or reusable
prompt templates, Snowflake's managed server won't provide those — it's
scoped specifically to tool discovery and invocation, not the full MCP
surface.

## Governance comes along for free

This is the real selling point over hand-rolling your own MCP server:
authentication runs on **OAuth 2.0** — Snowflake OAuth by default, or
External OAuth (Okta, Microsoft Entra ID, etc.) if your organization
already uses one of those. Once authenticated, every tool call runs under
the caller's own Snowflake role. That means **RBAC, masking policies, and
row-access policies from earlier chapters all apply automatically** — an
external agent connecting through MCP can't see more than that role could
already see through a plain SQL session. You don't configure a second,
parallel permission system for AI access; the one you already built
governs this too.

## Concrete limits to design around

A few hard limits matter once you're actually building against this:

- **Response size**: capped at 250 KB per tool call — a tool returning a
  huge result set needs to paginate or summarize, not dump everything.
- **Recursion depth**: a maximum of 10 invocations — guards against an
  agent looping on itself indefinitely.
- **Hostnames**: must use hyphens, not underscores, in any custom
  endpoint naming.
- **Regional availability**: not available in all government regions.

## Who connects to it

Because MCP is a standard, any MCP-aware client can connect: Claude and
Claude Desktop register the server as a custom connector with OAuth,
Cursor configures it via an `mcp.json` file, and other agent platforms
(covered in depth in Lesson 67) connect the same way. From the agent's
point of view, Snowflake's Cortex tools look exactly like any other MCP
tool it already knows how to call.

## Key terms

| Term | Meaning |
|---|---|
| MCP (Model Context Protocol) | An open standard for how AI agents discover and invoke tools exposed by a server |
| Snowflake-managed MCP server | Snowflake's hosted MCP server, exposing Cortex Agents/Analyst/Search/SQL execution as tools with no separate infrastructure to deploy |
| OAuth 2.0 | The authentication mechanism gating access — Snowflake OAuth or External OAuth |
| Protocol revision 2025-11-25 | The specific MCP spec version Snowflake's server implements |

## Lab

1. List the five tool types the Snowflake-managed MCP server exposes, and
   for each one, name which earlier Cortex feature (from Lessons 62-64) it
   wraps.
2. Explain, in your own words, why "RBAC applies automatically" is a
   stronger security guarantee than "we added an access-control layer to
   our AI integration" — what's the practical difference?

## Check yourself

You're ready for Lesson 67 when you can name at least three tools the
managed MCP server exposes, state the protocol revision it supports, and
explain why an external agent connecting through it can't exceed the
caller's own Snowflake role's permissions.
