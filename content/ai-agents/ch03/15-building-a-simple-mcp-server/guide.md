# Lesson 15 — Building a Simple MCP Server

**Chapter 3 · Model Context Protocol (MCP) · Lesson 15 of 38**

## What you'll learn

- The real Python MCP SDK pattern for defining a server and its tools
- Why type hints and docstrings generate the tool schema for you
- The single most common bug that breaks a stdio server, and how to avoid it
- How to think about scope when building your first server

## The pattern, from MCP's own quickstart

MCP's official quickstart builds a small weather server exposing two
tools, `get_alerts` and `get_forecast`. The setup is deliberately
minimal — install the SDK (`uv add "mcp[cli]"`), then:

```python
from mcp.server import MCPServer

mcp = MCPServer("weather")

@mcp.tool()
async def get_forecast(latitude: float, longitude: float) -> str:
    """Get weather forecast for a location.

    Args:
        latitude: Latitude of the location
        longitude: Longitude of the location
    """
    # ...fetch and format the forecast...
    return forecast_text
```

Look at what's doing the work here: the `@mcp.tool()` decorator
registers the function as a tool, and the SDK reads the **type hints**
(`latitude: float`, return type `str`) and the **docstring** to
automatically generate the tool's `inputSchema` and `description` —
the exact JSON Schema shape from Lesson 14, built for you from code you
were already going to write. You still own the quality of that
docstring the same way Lesson 6 taught: a vague one-liner produces a
vague tool description, because the SDK is only as good as what you
give it.

## The logging gotcha that breaks stdio servers

This is a real, specific failure mode worth knowing before you hit it:
**a stdio server must never write to stdout.** The stdio transport
(Lesson 13) uses standard input/output as the actual message channel —
if your code calls Python's `print()`, that text lands on stdout and
corrupts the JSON-RPC messages the client is trying to parse, breaking
the server. The fix is simple: use the standard `logging` module
instead, which writes to stderr by default, and never `print()` inside
a stdio server:

```python
import logging
logger = logging.getLogger(__name__)

logger.info("Processing request")  # writes to stderr — safe
# print("Processing request")      # writes to stdout — breaks a stdio server
```

This doesn't apply to HTTP-based servers, where stdout logging is
harmless — it's specifically a stdio-transport problem, because stdio
uses the exact same channel for both your logs and the protocol's
messages.

## Scoping your first server

Before writing code, decide exactly what your server exposes — the
same discipline Lesson 6's self-review checklist asked for, applied one
level up:

1. What's the smallest set of tools that's actually useful on its own?
   The weather quickstart ships with exactly two tools, not an entire
   weather-data platform.
2. Does each tool do one clear thing, with a name and docstring
   specific enough that a client calling `tools/list` could pick the
   right one without guessing?
3. Are you exposing a *tool* (an action, model-controlled) or would
   this data be better exposed as a *resource* (read-only,
   application-controlled) per Lesson 14's distinction?

## Key terms

| Term | Meaning |
|---|---|
| `@mcp.tool()` | The Python MCP SDK decorator that registers a function as a callable MCP tool |
| Type-hint-driven schema | The SDK generating a tool's JSON Schema automatically from Python type hints and the docstring |
| stdout corruption | The failure mode where `print()` output interleaves with and breaks stdio's JSON-RPC message stream |

## Check yourself

You're ready for Lesson 16 when you can explain, from memory, exactly
why `print()` is dangerous inside a stdio-based MCP server but
perfectly safe inside an HTTP-based one.
