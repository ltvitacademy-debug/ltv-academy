# Lesson 3 — Tool Use Fundamentals

**Chapter 1 · What an AI Agent Actually Is · Lesson 3 of 32**

## What you'll learn

- What a "tool" actually is to the model: a name, a description, and a JSON schema — nothing more
- The real shape of a tool definition in the Claude Messages API
- The full round trip: `tool_use` out, `tool_result` back in
- Why tool use is also called "function calling," and what the model does and doesn't do

## A tool is just a schema

The model never executes a tool. It can't reach your database, call your
API, or run your code. What it can do is read a tool's **name**,
**description**, and **`input_schema`** (a JSON Schema describing the
expected arguments), and decide to request that tool be called with
specific argument values. Your application code is what actually runs it
and hands the real result back. This is the entire mechanism — no magic
execution, just a structured request-and-response the model and your code
pass back and forth.

Here is a real tool definition, the exact field names the Claude API
expects, verified against Anthropic's current documentation:

```json
{
  "name": "get_weather",
  "description": "Get the current weather for a given location.",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "City and state, e.g. San Francisco, CA"
      }
    },
    "required": ["location"]
  }
}
```

`name` is how the model refers to the tool and how your code knows which
one to run. `description` is the single biggest lever you have over
whether the model calls the tool correctly (Lesson 6 goes deep on writing
good ones). `input_schema` is standard JSON Schema — `type`, `properties`,
and `required` work exactly as they do anywhere else JSON Schema is used.

## The round trip

Tool use is a two-request conversation, not one call:

```
Request 1 (you send: user message + tools array)
  -> Claude replies with a tool_use block:
     {"type": "tool_use", "id": "toolu_01A...", "name": "get_weather",
      "input": {"location": "San Francisco, CA"}}

Your code runs the real get_weather("San Francisco, CA") lookup.

Request 2 (you send: full history + a tool_result block)
  -> {"type": "tool_result", "tool_use_id": "toolu_01A...",
      "content": "15 degrees Celsius, partly cloudy"}
  -> Claude replies with the final text answer, using that result.
```

The `tool_use_id` on the result has to match the `id` Claude generated on
the `tool_use` block — that's how the model knows which call this result
answers, which matters once an agent is making several calls per turn
(Lesson 10). `stop_reason` tells your code which case you're in:
`"tool_use"` means Claude wants a tool run before it can continue;
`"end_turn"` means it's finished.

## "Tool use" and "function calling" are the same idea

Different vendors use different names for this mechanism — Anthropic and
OpenAI both call it tool use or function calling. The shape is consistent
across the industry: a name, a description, a schema for arguments, and a
structured way to return a result. Learning the mechanism once, as it's
specified here, transfers directly to any framework or provider built on
top of it (Lesson 4).

## Key terms

| Term | Meaning |
|---|---|
| `input_schema` | The JSON Schema describing a tool's expected arguments — `type`, `properties`, `required` |
| `tool_use` block | The model's structured request to call a specific tool with specific arguments |
| `tool_result` block | Your application's response, carrying the real output back to the model |
| `tool_use_id` | The identifier linking a `tool_result` to the `tool_use` block it answers |

## Check yourself

You're ready for Lesson 4 when you can draw, from memory, the two-request
round trip above — including which side (model vs. your code) produces
each piece.
