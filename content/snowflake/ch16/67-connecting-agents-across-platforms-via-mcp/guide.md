# Lesson 67 — Connecting Agents Across Platforms via MCP

**Chapter 16 · Cortex AI & Agents on Snowflake · Lesson 67 of 76**

## What you'll learn

- Why Snowflake's cross-platform agent story is built on MCP, not a separate "agent-to-agent" protocol
- Which real, named platforms connect to Snowflake's Cortex tools via MCP today
- The shape of that connection, using Microsoft Copilot Studio as a concrete example
- Why "any MCP client can reach Snowflake" is a direct consequence of Lesson 66's architecture

## One protocol, not two

It's tempting to assume large platforms each need their own bespoke
integration with Snowflake, or that there's a separate
"agent-to-agent" (A2A) protocol layered on top of MCP for
platform-to-platform hops. **That's not the architecture Snowflake has
built.** Snowflake's own materials are consistent on this point:
cross-platform agent interoperability runs through **MCP, full stop** —
the same managed MCP server from Lesson 66, reused as the single
connection point for every external platform. There's no separate A2A
layer to learn here; MCP already covers "a remote client discovers and
calls my tools," which is exactly what platform-to-platform connection
requires.

## Real, named integrations

This isn't a hypothetical — specific platforms have shipped MCP
connections to Snowflake:

| Platform | What it does through MCP |
|---|---|
| **Claude / Claude Code / Anthropic platforms** | Register the Snowflake-managed MCP server as a custom connector, reaching Cortex Analyst/Search/Agents as tools |
| **Microsoft Copilot Studio / Microsoft 365 Copilot / Teams** | Wires a Copilot Studio agent to call a Cortex Agent through the MCP endpoint |
| **Salesforce Agentforce** | Native MCP client support (pilot mid-2025, beta by January 2026) lets Agentforce agents connect to any MCP-compliant server, Snowflake included, with no custom code |
| **UiPath** | Orchestrator discovers and invokes Snowflake's MCP tools to power agentic RPA workflows |
| **CrewAI, Cursor** | Connect as MCP clients for multi-agent development and IDE-integrated workflows |

The common thread: none of these needed a Snowflake-specific SDK or a
hand-built API bridge. Each platform already speaks MCP as a client; they
point at Snowflake's managed MCP server endpoint, authenticate via OAuth,
and discover whatever tools that server exposes.

## A concrete example: Copilot Studio

Walking through one integration makes the pattern concrete. To connect
Microsoft Copilot Studio to Snowflake:

1. In Snowflake, create the underlying Cortex services — a Cortex Search
   service, a Cortex Analyst semantic view, and a Cortex Agent that wraps
   them (Lessons 62-64).
2. Expose that agent through the Snowflake-managed MCP server
   (Lesson 66).
3. In Copilot Studio, add an MCP connector pointing at the Snowflake
   endpoint, authenticating via OAuth.
4. Copilot Studio's agent can now call `CORTEX_AGENT_RUN` as one of its
   own tools — a Microsoft-platform agent invoking a Snowflake-hosted
   agent, through a protocol neither company had to custom-build for the
   other.

The same four-step shape — create the Cortex service, expose via MCP,
connect the external platform as an MCP client, authenticate — repeats for
Agentforce, UiPath, or any other MCP-aware platform. Learn the shape once.

## Why this matters for your career

If you're asked to connect "our AI agent platform" to a Snowflake
warehouse, the honest, current answer is almost always "point it at the
Snowflake-managed MCP server" rather than building a custom integration.
Knowing MCP is the mechanism — not a vendor-specific API, not a
proprietary "agent bus" — means the same skill transfers across whichever
specific external platform a client happens to be using.

## Key terms

| Term | Meaning |
|---|---|
| MCP interoperability | Snowflake's cross-platform agent story, built entirely on MCP rather than a separate agent-to-agent protocol |
| MCP connector | The piece of configuration an external platform (Copilot Studio, Agentforce, etc.) uses to register the Snowflake MCP server as a tool source |
| Agentforce | Salesforce's agent platform, with native MCP client support (beta as of January 2026) |

## Lab

1. Pick one platform from the table above and write the four-step
   connection shape (create service → expose via MCP → add connector →
   authenticate) specifically for it, in your own words.
2. Explain, in one or two sentences, why Snowflake didn't need to build a
   separate integration for each of Claude, Copilot Studio, Agentforce,
   and UiPath.

## Check yourself

You're ready for Lesson 68 when you can name at least three real
platforms that connect to Snowflake via MCP, and can explain why "MCP, not
a separate A2A protocol" is the accurate way to describe Snowflake's
cross-platform agent interoperability.
