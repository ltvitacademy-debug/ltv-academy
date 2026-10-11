# Lesson 17 — MCP vs. Custom Tool Integrations

**Chapter 3 · Model Context Protocol (MCP) · Lesson 17 of 38**

## What you'll learn

- A concrete decision framework: when to reach for MCP vs. a Chapter 2 custom tool
- Why "someone may have already built this server" changes the calculus
- How this choice connects to what Chapter 4 covers next

## Two real options for the same underlying skill

By now you've built tools the Chapter 2 way — defined directly in your
own application, wired straight into your agent's loop — and you've
seen what an MCP server adds: the same tool definitions, discoverable
and shareable across any MCP-compatible host. Neither approach is
strictly better. The real skill is knowing which one fits a given
situation.

## When a custom, Chapter-2-style tool is the right call

- **The tool is specific to one application and will stay that way.**
  If nothing else will ever need this integration, the overhead of
  standing up a separate server — even a simple one — buys you nothing.
- **You need the tightest possible control over latency or behavior.**
  A tool defined directly in your agent's own process has one less hop
  than a call going out to a separate server process.
- **You're prototyping.** Chapter 2's approach gets a working tool
  running in minutes; building and configuring a server is worth doing
  once the tool has proven useful enough to share.

## When MCP is the right call

- **More than one AI application might want this integration.** If your
  company's internal API is something multiple teams' agents, or
  multiple different tools (Claude Code, a custom agent, an IDE), would
  all benefit from calling, building it once as an MCP server avoids
  the M × N problem from Lesson 12 entirely.
- **A server for this already exists.** Before building anything,
  check — MCP's ecosystem already includes real reference servers like
  the Filesystem Server from Lesson 16, and officially maintained
  servers from companies like Sentry. Connecting to an existing,
  maintained server is almost always less work and less risk than
  reimplementing the same integration yourself.
- **You want to support users bringing their own client.** An MCP
  server works with any MCP-compatible host a user chooses — Claude
  Desktop, Claude Code, an IDE — without you writing separate
  integration code for each one.

## The questions worth asking before you build either one

1. Will this integration ever be useful outside this one application?
2. Does a maintained MCP server for this already exist?
3. Am I building a quick prototype, or a piece of infrastructure other
   people and tools will depend on?

A "no" to the first two and "prototype" to the third points straight
back to Chapter 2. A "yes" to either of the first two points toward
building — or better, finding and connecting to — an MCP server.

## Where this leaves you

You now have both tools in hand: the direct, Chapter-2 tool-calling
skill for when an integration is genuinely one-off, and MCP for when an
integration is worth standardizing and sharing. Chapter 4 moves on to
agent *architecture* — ReAct, planning, multi-agent systems — which
applies identically regardless of whether the tools your agent calls
came from your own code or from a connected MCP server.

## Key terms

| Term | Meaning |
|---|---|
| Reference server | An officially published, maintained MCP server (e.g. the Filesystem Server) available to connect to instead of rebuilding |
| Build vs. connect | The decision between standing up your own MCP server and connecting to one that already exists |

## Check yourself

You're ready for Lesson 18 when you can take three real tool ideas —
one that's genuinely one-off, one that multiple teams would want, and
one a reference server probably already covers — and correctly decide
the right approach for each.
