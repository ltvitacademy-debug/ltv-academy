# Lesson 17 — Function/Tool Calling

**Chapter 3 · Working With LLM APIs · Lesson 17 of 31**

## What you'll learn

- What "tool calling" actually means: the model never runs code, it only asks you to
- How to define a tool with `name`, `description`, and `input_schema`
- The real `tool_use` content block shape, and the `tool_result` round trip that follows it
- `tool_choice`, and why you'd force a specific tool
- How the same round trip is shaped in OpenAI's API

## The core idea: the model never executes anything

Tool calling (also called function calling) lets a model request that *your application*
run a function it doesn't have access to — a weather lookup, a database query, a
calculator. The model itself never executes code. It replies with a structured request
naming the tool and the arguments; your code runs it; you send the result back; the model
uses that result to keep going.

## Step 1 — define the tool

A tool is just a name, a description (which the model uses to decide *when* to call it),
and a JSON Schema describing its arguments:

```json
{
  "name": "get_weather",
  "description": "Get the current weather for a given location.",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": { "type": "string", "description": "City and state" }
    },
    "required": ["location"]
  }
}
```

You send an array of these in the `tools` field of your request, alongside the user's
message.

## Step 2 — the model asks for a tool call

If the model decides the request needs that tool, the response comes back with
`stop_reason: "tool_use"` and a `tool_use` content block:

```json
{
  "type": "tool_use",
  "id": "toolu_01A09q90qw90lq917835lq9",
  "name": "get_weather",
  "input": { "location": "San Francisco, CA" }
}
```

`input` is already a parsed object matching your schema — not a string you have to parse
yourself.

## Step 3 — you run it, and send the result back

Your code runs the actual lookup, then sends a new `user` message whose content is a
`tool_result` block referencing that exact `tool_use_id`:

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
      "content": "15 degrees Celsius, partly cloudy"
    }
  ]
}
```

The model's own `tool_use` reply is replayed back as an `assistant` message first, so the
full exchange — your question, the tool call, and the tool result — is all in the
conversation history before the model's final answer.

## Controlling when tools get used: `tool_choice`

`tool_choice` controls how free the model is to decide:

| Value | Behavior |
|---|---|
| `{"type": "auto"}` | Model decides whether to call a tool (the default) |
| `{"type": "any"}` | Model must call *some* tool |
| `{"type": "tool", "name": "..."}` | Model must call this specific tool |
| `{"type": "none"}` | Model must not call any tool |

`disable_parallel_tool_use: true` restricts the model to at most one tool call per turn,
instead of potentially several at once.

## The same round trip in OpenAI's API

OpenAI nests the schema one level deeper, under `function`, and returns `tool_calls` on
the response message instead of a `tool_use` content block:

```json
{
  "tools": [
    { "type": "function", "function": {
      "name": "get_weather",
      "parameters": { "type": "object", "properties": { "location": { "type": "string" } } }
    } }
  ]
}
```

Conceptually identical to Anthropic's flow: define the tool, get back a structured call,
run it yourself, send the result back as a new message.

## Key terms

| Term | Meaning |
|---|---|
| `input_schema` | JSON Schema describing a tool's expected arguments |
| `tool_use` block | The model's structured request to call a tool, with parsed `input` |
| `tool_result` block | Your application's answer, tied to a `tool_use_id` |
| Client tool | A tool your application executes (vs. a server tool Anthropic runs itself) |
| `tool_choice` | Controls whether/which tool the model is required to call |

## Lab

1. Define a tool called `convert_currency` with `from`, `to`, and `amount` parameters in
   its `input_schema`.
2. Write the `tool_result` message you'd send back after running that tool, assuming a
   `tool_use_id` of `toolu_abc123`.
3. Explain what `{"type": "tool", "name": "convert_currency"}` as `tool_choice` forces the
   model to do.

## Check yourself

You're ready for Lesson 18 when you can draw the full round trip from memory: tool
definition in the request, `tool_use` block in the response, `tool_result` block in the
next request.
