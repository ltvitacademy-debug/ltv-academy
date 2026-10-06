# Lesson 13 — Function/Tool Calling Schemas

**Chapter 3 · Working With AI Provider APIs · Lesson 13 of 22**

## What you'll learn

- What "tool calling" (also called function calling) actually means
- The real JSON schema shape for defining a tool
- The `tool_use` content block Claude returns when it wants to call one
- How to send the result back in a `tool_result` block

## Why content is an array of blocks

Lesson 11 told you to remember that `content` is an array, not a plain
string. This is why. A model can't literally run your code — it can only
ask, in structured JSON, for *you* to run something and tell it what
happened. That request shows up as one more kind of content block,
alongside plain text.

## Defining a tool

You describe a tool with a `name`, a `description` (this is what the model
actually reads to decide when to use it — write it like documentation, not
a label), and an `input_schema` using real JSON Schema syntax:

```json
{
  "name": "get_weather",
  "description": "Get the current weather for a given location.",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {"type": "string",
        "description": "City and state, e.g. San Francisco, CA"}
    },
    "required": ["location"]
  }
}
```

That `input_schema` is exactly the JSON Schema you learned in Chapter 2 —
`type`, `properties`, `required` — just reused to describe what arguments
a tool accepts.

## Claude's reply: a tool_use block

Send that tool definition along with a user message like "What's the
weather in San Francisco?", and Claude's response carries
`"stop_reason": "tool_use"` and a content block of type `tool_use`:

```json
{
  "type": "tool_use",
  "id": "toolu_01A09q90qw90lq917835lq9",
  "name": "get_weather",
  "input": {"location": "San Francisco, CA"}
}
```

Claude never actually calls the function — your application code reads
`name` and `input`, runs the real lookup, and decides what to do with the
answer.

## Sending the result back: tool_result

You run the real weather lookup yourself, then send the result back as a
new message, referencing the original call by its `id` via `tool_use_id`:

```json
{
  "role": "user",
  "content": [
    {"type": "tool_result",
     "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
     "content": "15 degrees Celsius, partly cloudy"}
  ]
}
```

Claude reads that result and writes a final natural-language answer. This
whole exchange — tool definition, `tool_use`, your code runs, `tool_result`,
final answer — is the complete round trip every tool-calling integration
follows, no matter how many tools are involved.

## Key terms

| Term | Meaning |
|---|---|
| `input_schema` | JSON Schema describing a tool's accepted arguments |
| `tool_use` block | Claude's structured request to call a specific tool |
| `tool_use_id` | Links a `tool_result` back to the `tool_use` that triggered it |
| `tool_result` | Your application's answer, sent back as a new message |

## Lab

Design an `input_schema` (by hand, as JSON) for a tool named
`get_stock_price` that accepts a required `ticker` string and an optional
`currency` string.

## Check yourself

Walk through the full round trip from memory: what four things happen, in
order, from the moment you define a tool to the moment Claude gives its
final natural-language answer?
