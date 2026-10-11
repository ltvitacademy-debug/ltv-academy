# Lesson 12 — What MCP Is & Why It Exists

**Chapter 3 · Model Context Protocol (MCP) · Lesson 12 of 38**

## What you'll learn

- The integration problem MCP exists to solve
- The official USB-C analogy, and why it's the right one
- Who built MCP and how broadly it's now supported
- Why Chapter 2's tool-calling skills don't disappear — they get standardized

## The problem: everyone was building the same glue code, over and over

Chapters 1 and 2 taught you how to define a tool and wire it into an
agent's loop. That skill doesn't go away in this chapter. But think
about what happens at scale: every AI application that wants to read a
user's GitHub issues, post to Slack, or query a company database has to
write its own custom integration code for each of those services. If
there are M different AI applications and N different services each one
might want to connect to, that's M × N separate integrations — and
every one of them is bespoke, hand-maintained glue code solving a
problem someone else already solved for a different app.

**The Model Context Protocol (MCP)** is an open-source standard, created
by Anthropic and now maintained as an open protocol, that fixes this.
Instead of M × N custom integrations, a service builds **one MCP
server**, and any MCP-compatible application — Claude, ChatGPT, an IDE
like VS Code or Cursor, or an agent you build yourself — can connect to
it the same way.

## The USB-C analogy

MCP's own documentation puts it simply: **MCP is like a USB-C port for
AI applications.** Before USB-C, every device needed its own
proprietary cable and adapter. USB-C didn't change what devices could
do — it standardized *how they connect*. MCP does the same thing for AI
applications and the tools, data sources, and workflows they need
access to.

## What this actually unlocks

Per MCP's own documentation, a few concrete examples of what this
standard enables:

- An agent can access a user's Google Calendar and Notion, acting as a
  more personalized assistant.
- An AI coding tool can generate a web app from a Figma design.
- An enterprise chatbot can connect to multiple internal databases,
  letting users analyze data through chat.

None of these are new *capabilities* — tool-calling agents could
already do things like this before MCP existed, using exactly the
custom-tool approach from Chapter 2. What's new is that the
*integration* — the server that exposes "here's how to talk to Google
Calendar" — gets built once and works with every MCP-compatible host,
instead of once per application.

## Broad, real adoption

This isn't a proposal — it's a protocol already supported across a wide
range of real clients and servers: AI assistants like Claude and
ChatGPT, and development tools like Visual Studio Code and Cursor, all
support MCP today. That ecosystem effect is the actual payoff of
standardization: build an MCP server once, and it works everywhere MCP
is supported, not just in the one application you built it for.

## What doesn't change

MCP does not replace what you learned in Chapter 2. A tool exposed by
an MCP server still has a `name`, a `description`, and an
`input_schema` — the exact shape Lesson 6 taught you to write well.
What MCP adds is a standardized way for a host application to
*discover* which tools a server offers and *call* them, instead of you
hardcoding that list into your own prompt or application code every
time.

## Key terms

| Term | Meaning |
|---|---|
| Model Context Protocol (MCP) | An open-source standard for connecting AI applications to external data sources, tools, and workflows |
| The M × N problem | The integration burden before a shared standard exists: M applications each needing custom code for N services |
| MCP-compatible | Any application or tool that implements MCP's client or server side, letting it interoperate with the rest of the MCP ecosystem |

## Check yourself

You're ready for Lesson 13 when you can explain, in your own words, why
a company that builds one MCP server for its product gets integration
with Claude, ChatGPT, and VS Code essentially for free — without writing
three separate integrations.
