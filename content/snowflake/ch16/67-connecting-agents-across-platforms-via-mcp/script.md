# Script — Connecting Agents Across Platforms via MCP

## Segment 1 (title)

It's tempting to assume a big platform needs its own bespoke integration with Snowflake, or that there's a separate agent-to-agent protocol layered on top of MCP for platform-to-platform hops. That's not the architecture Snowflake built — cross-platform interoperability runs through MCP, full stop.

## Segment 2 (steps: who's already connected)

Real platforms have shipped this: Claude and other Anthropic platforms register the managed MCP server as a custom connector, Microsoft Copilot Studio and Microsoft 365 Copilot call a Cortex Agent through the MCP endpoint, Salesforce Agentforce added native MCP client support that launched in pilot in mid-2025 and reached beta by January 2026, and UiPath, CrewAI, and Cursor all connect as MCP clients too.

## Segment 3 (steps: the shape, every time)

The pattern repeats: build the underlying Cortex service — a search service, a semantic view, or an agent — expose it through the managed MCP server, have the external platform add an MCP connector pointing at that endpoint, and authenticate via OAuth. Learn that four-step shape once and it applies to Copilot Studio, Agentforce, or UiPath alike, with the caller's own Snowflake role governing what each one can actually see.

## Segment 4 (steps: be accurate about the mechanism)

None of these platforms needed a Snowflake-specific SDK or a custom-built bridge — they already speak MCP as clients. That's the honest, accurate way to describe Snowflake's interoperability story: it's MCP, not a separate proprietary agent bus, and not some other "A2A" protocol you might read about elsewhere. If a client ever asks "do you support Agent2Agent," the accurate answer is that MCP already covers the use case A2A targets — a remote client discovering and calling tools — so there's no second protocol to adopt alongside it.

## Segment 5 (outro)

Next lesson turns from connecting models to training them: fine-tuning foundation models on your own data, entirely inside Snowflake's security perimeter.
