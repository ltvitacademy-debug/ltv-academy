# Script — The Snowflake-Managed MCP Server

## Segment 1 (title)

MCP, the Model Context Protocol, is a common plug shape for how an AI agent discovers and calls tools — any MCP-aware client can talk to any MCP-aware server without custom integration code for each pair. Snowflake's managed MCP server runs one for you, with Cortex's capabilities already exposed, no separate infrastructure to deploy.

## Segment 2 (steps: what it exposes)

It bundles five tool types: CORTEX_AGENT_RUN to invoke a configured agent as a single tool, CORTEX_ANALYST_MESSAGE for natural-language-to-SQL over a semantic view, CORTEX_SEARCH_SERVICE_QUERY for retrieval over a search service, SYSTEM_EXECUTE_SQL for direct queries with an optional read-only mode, and your own custom stored procedures or UDFs exposed as generic tools.

## Segment 3 (steps: honest about the scope)

It's worth being precise here: Snowflake supports MCP protocol revision 2025-11-25, but only the tool-discovery-and-invocation parts of that spec. Resources, prompts, roots, and notifications are not supported — if a client expects browsable resources or reusable prompt templates, this server won't provide them. A single server caps out at 50 tools, 250 kilobytes per response, and a recursion depth of 10, guarding against an agent looping on itself indefinitely.

## Segment 4 (steps: governance comes free)

Authentication runs on OAuth 2.0 — Snowflake's own, or an external provider like Okta or Microsoft Entra ID — and every tool call then runs under the caller's own Snowflake role. RBAC, masking, and row-access policies all apply automatically, so you're not maintaining a second, parallel permission system just for AI access; the one you already built governs this too.

## Segment 5 (outro)

Next lesson looks at who's actually connecting through this server in practice — Claude, Microsoft Copilot Studio, Salesforce Agentforce, UiPath, and more — and how Snowflake's cross-platform story is built entirely on this one protocol.
