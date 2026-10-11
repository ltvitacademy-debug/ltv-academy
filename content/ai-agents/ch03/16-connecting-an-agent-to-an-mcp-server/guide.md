# Lesson 16 — Connecting an Agent to an MCP Server

**Chapter 3 · Model Context Protocol (MCP) · Lesson 16 of 38**

## What you'll learn

- How a real host, Claude Desktop, is configured to launch and connect to a local server
- What the discovery handshake does once a connection is live
- How this plugs into the agent loop you learned in Chapter 1
- What changes when you connect to more than one server at once

## Configuring a real host to use a server

Connecting a host to a local MCP server is configuration, not code you
write yourself as the agent builder. Claude Desktop, for example, reads
a JSON config file telling it which servers to launch automatically:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

That file lists each server's name and how to launch it (which command
to run, for a local stdio server). When Claude Desktop starts, it reads
this file, launches each configured server as a local process, and
creates one MCP client per server — exactly the one-client-per-server
rule from Lesson 13. A real example is the official Filesystem Server:
once configured, Claude Desktop gains tools for reading file contents,
creating files and directories, and searching the filesystem — with
every single action still requiring your explicit approval before it
runs, the same human-in-the-loop principle Chapter 5 covers in depth.

## What happens after the connection opens

Once a client connects to a server, it doesn't already know what that
server offers — it asks. This is the discovery step from Lesson 13's
data layer: the client calls `tools/list` (and `resources/list`,
`resources/templates/list` if relevant) to get back the server's full
set of tool definitions, each with its name, description, and schema.
From the host's perspective, those tools now simply exist — ready to be
offered to the model exactly like a hand-written Chapter 2 tool would
be, just sourced from the server instead of your own code.

## Where this fits in the agent loop

Lesson 2 taught the agent loop as Plan → Act → Observe. MCP changes
*where the tools available to the Act step come from* — it doesn't
change the loop itself. Before this chapter, "Act" meant calling a tool
your own application code defined and registered. With an MCP
connection live, "Act" can mean calling a tool that was never written
as part of your agent's codebase at all — it was discovered at
connection time from a server someone else built and maintains.

## Multiple servers, multiple clients, one combined tool set

A host isn't limited to one server. Connect to a filesystem server and
a project-management server at the same time, and the host now holds
two separate client connections (Lesson 13), each with its own
discovered tool list — but from the model's point of view, at the Act
step, it's just one combined set of available tools to choose from,
the same tool-selection problem Lesson 9 already covers. The protocol
handles keeping each connection and its tools straight; your agent
logic doesn't need a special case for "this tool came from server A
versus server B."

## Key terms

| Term | Meaning |
|---|---|
| Server configuration | Host-level setup (e.g. `claude_desktop_config.json`) declaring which MCP servers to launch and connect to |
| Discovery handshake | The client calling `tools/list`/`resources/list` right after connecting to learn what a server offers |
| Combined tool set | The model-facing view where tools from multiple connected servers appear as one pool to select from |

## Check yourself

You're ready for Lesson 17 when you can explain what actually changes
in your agent's Act step once it's connected to an MCP server, versus
what stays exactly the same as the Chapter 2 approach.
