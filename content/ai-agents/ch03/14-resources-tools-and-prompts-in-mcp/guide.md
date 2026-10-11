# Lesson 14 — Resources, Tools & Prompts in MCP

**Chapter 3 · Model Context Protocol (MCP) · Lesson 14 of 38**

## What you'll learn

- The three building blocks an MCP server exposes, and who controls each
- A real tool definition and how it maps directly onto Chapter 2's schema format
- Direct resources vs. resource templates
- The protocol operations (`tools/list`, `tools/call`, `resources/read`, and more) behind the scenes

## Three building blocks, three different controllers

An MCP server exposes functionality through three primitives, and the
single most useful thing to remember about them is **who decides when
each one gets used**:

| Feature | What it is | Example | Who controls it |
|---|---|---|---|
| **Tools** | Functions the model can actively call | Search flights, send a message, create a calendar event | The model |
| **Resources** | Passive, read-only data for context | File contents, a database schema, a calendar | The application |
| **Prompts** | Pre-built instruction templates | "Plan a vacation," "Summarize my meetings" | The user |

A tool can write to a database or call an external API — the model
decides, mid-conversation, that it needs to call one. A resource is
different: it's data the *application* chooses to pull in and hand to
the model as context, the same role a retrieved document plays in RAG.
A prompt is a template a *person* explicitly invokes, the way you'd pick
a saved search instead of typing a query from scratch.

## Tools: this is Chapter 2's schema, discoverable over the protocol

Here's a real tool definition, in MCP's own format:

```json
{
  "name": "searchFlights",
  "description": "Search for available flights",
  "inputSchema": {
    "type": "object",
    "properties": {
      "origin": { "type": "string", "description": "Departure city" },
      "destination": { "type": "string", "description": "Arrival city" },
      "date": { "type": "string", "format": "date", "description": "Travel date" }
    },
    "required": ["origin", "destination", "date"]
  }
}
```

Compare this to Lesson 6's `get_stock_price` schema: `name`,
`description`, and a JSON Schema `input_schema`/`inputSchema`. It's the
same shape, because it's solving the same problem — this isn't a new
tool-calling format to learn, it's the format you already know, now
exposed by a server a client can query.

MCP defines two protocol operations for tools:

| Method | Purpose | Returns |
|---|---|---|
| `tools/list` | Discover available tools | An array of tool definitions with schemas |
| `tools/call` | Execute a specific tool | The tool's execution result |

A real multi-tool example from MCP's own docs: a travel-planning agent
might call `searchFlights(origin, destination, date)` to query airlines,
`createCalendarEvent(title, startDate, endDate)` to block the dates, and
`sendEmail(to, subject, body)` to notify a team — three tools, each
doing one job, exactly like Lesson 10's multi-tool agents.

## Resources: direct and templated

Resources expose read-only data — file contents, API responses,
database schemas — each identified by a unique URI with a declared MIME
type. There are two patterns:

- **Direct resources** have a fixed URI pointing at specific data, e.g.
  `calendar://events/2024` returning that year's calendar availability.
- **Resource templates** use a parameterized URI for flexible queries,
  e.g. `travel://activities/{city}/{category}`, where
  `travel://activities/barcelona/museums` returns Barcelona's museums
  specifically. Templates declare their own title, description, and
  expected MIME type, so they're self-documenting the same way a
  well-written tool description is.

The relevant protocol operations: `resources/list` discovers direct
resources, `resources/templates/list` discovers templates, and
`resources/read` retrieves a resource's actual contents.

## Why this three-way split matters

Keeping tools (model-controlled), resources (application-controlled),
and prompts (user-controlled) as separate primitives — instead of one
generic "give the model stuff" mechanism — makes the controls from
Chapter 4's human-in-the-loop material easier to reason about later: a
host can choose to auto-approve read-only resource access while still
requiring explicit approval before any tool call that writes data,
because the protocol itself already tells you which category an action
falls into.

## Key terms

| Term | Meaning |
|---|---|
| Tool (MCP) | A model-controlled function with a JSON Schema-defined input, discoverable via `tools/list` and invoked via `tools/call` |
| Resource (MCP) | Application-controlled, read-only context data identified by a URI |
| Resource template | A parameterized URI pattern for querying a family of resources dynamically |
| Prompt (MCP) | A user-controlled, pre-built instruction template combining specific tools and resources |

## Check yourself

You're ready for Lesson 15 when you can take a feature you'd build —
say, "let the agent check inventory levels" — and correctly classify it
as a tool, a resource, or a prompt, and explain why.
