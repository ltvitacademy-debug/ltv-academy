# Lesson 13 — MCP Architecture: Hosts, Clients & Servers

**Chapter 3 · Model Context Protocol (MCP) · Lesson 13 of 38**

## What you'll learn

- MCP's three participants: Host, Client, and Server
- Why one host creates a separate client for every server it connects to
- Local (stdio) vs. remote (Streamable HTTP) servers, and when each applies
- MCP's two layers: the data layer and the transport layer

## The three participants

MCP follows a client-server architecture with three named roles:

- **MCP Host** — the AI application that coordinates everything, such as
  Claude Desktop, Claude Code, or an agent application you build
  yourself. The host is what the person actually uses.
- **MCP Client** — a component, living inside the host, that maintains a
  dedicated connection to one MCP server and fetches context from it for
  the host to use.
- **MCP Server** — a program that exposes capabilities — tools,
  resources, prompts — to whichever client connects to it.

The important detail: **a host creates one client per server it
connects to, not one client total.** If Visual Studio Code connects to
a Sentry MCP server for error tracking and a filesystem MCP server for
local file access, it instantiates two separate client objects, each
maintaining its own dedicated connection. Add a third server and you get
a third client. The host coordinates all of them, but each client-server
pair is its own independent connection.

## Where a server actually runs

"MCP server" refers to the program that serves context — not to where
it physically runs. A server can run locally or remotely:

- A **local** server runs on the same machine as the host, using the
  **stdio transport** (standard input/output streams between two local
  processes). Claude Desktop launching a filesystem server on your own
  machine is a local server. Local servers typically serve a single
  client, since they're tied to one running process.
- A **remote** server runs elsewhere — on a company's own
  infrastructure, for example — and uses the **Streamable HTTP
  transport**. The official Sentry MCP server is a real example: it
  runs on Sentry's own platform, reachable over HTTP. A remote server
  can serve many clients at once, the same way a normal web API does.

## Two layers, not one protocol

MCP is organized into two layers that are deliberately kept separate:

- **The data layer** (the inner layer) defines the actual message
  protocol — built on **JSON-RPC 2.0** — covering capability and version
  discovery, and the core primitives servers expose: tools, resources,
  prompts, and notifications.
- **The transport layer** (the outer layer) defines *how* those
  messages physically move between a client and a server: connection
  setup, message framing, and authorization. This is where stdio vs.
  Streamable HTTP lives.

Keeping these separate is what lets the exact same JSON-RPC 2.0 message
format work identically whether a server is a local process on your
laptop or a remote service halfway across the internet — the data layer
doesn't need to know or care which transport carried its messages.

## Key terms

| Term | Meaning |
|---|---|
| MCP Host | The AI application coordinating one or more MCP clients (e.g. Claude Desktop, Claude Code) |
| MCP Client | A component inside the host maintaining a dedicated 1:1 connection to one MCP server |
| MCP Server | A program that exposes tools, resources, and prompts to whichever client connects |
| stdio transport | Local, same-machine communication over standard input/output; typically one client per server |
| Streamable HTTP transport | Remote communication over HTTP, typically serving many clients at once |
| Data layer | The JSON-RPC 2.0-based message protocol — discovery and core primitives |
| Transport layer | How messages physically move between client and server — connection, framing, auth |

## Check yourself

You're ready for Lesson 14 when you can explain why a host connecting
to three different MCP servers ends up with three separate client
connections rather than one shared connection, and why that design
makes sense.
