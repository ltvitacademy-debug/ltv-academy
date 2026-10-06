# Lesson 18 — Structured Output: JSON Mode

**Chapter 3 · Working With LLM APIs · Lesson 18 of 31**

## What you'll learn

- Why "please reply with only JSON" in a prompt isn't reliable enough for production code
- Anthropic's current structured-outputs feature: `output_config.format` with a JSON Schema
- The tool-calling-based alternative pattern, and when you'd reach for it instead
- How OpenAI shapes the same idea with `response_format` / `text.format`
- How to tell, from the response alone, whether structured output actually succeeded

## The problem this solves

Ask a model to "reply with only JSON" in plain English, and most of the time it will — but
"most of the time" isn't good enough for code that calls `JSON.parse()` on the result.
Stray prose before the JSON, a trailing comma, a missing field — any of it breaks a naive
integration. Structured output features exist to make the shape **guaranteed**, not just
likely.

## Anthropic's structured outputs: `output_config.format`

Anthropic's current approach is a dedicated `output_config` field carrying a JSON Schema.
The model's answer is **constrained during generation** to match that schema — not
checked afterward, but restricted token-by-token so it can't produce anything else:

```json
{
  "model": "claude-opus-4-5",
  "max_tokens": 1024,
  "messages": [
    { "role": "user", "content": "Extract: John Smith, john@example.com, wants a demo." }
  ],
  "output_config": {
    "format": {
      "type": "json_schema",
      "schema": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "email": { "type": "string" },
          "demo_requested": { "type": "boolean" }
        },
        "required": ["name", "email", "demo_requested"],
        "additionalProperties": false
      }
    }
  }
}
```

The reply still comes back as a normal `text` content block — but now that block's `text`
is a JSON string guaranteed to validate against your schema:

```json
{
  "content": [
    { "type": "text", "text": "{\"name\":\"John Smith\",\"email\":\"john@example.com\",\"demo_requested\":true}" }
  ],
  "stop_reason": "end_turn"
}
```

Check `stop_reason`: `"end_turn"` means it succeeded; `"refusal"` means Claude declined to
produce output matching the schema; `"max_tokens"` means it got cut off mid-way.

## The alternative pattern: force a tool call

Before dedicated structured outputs existed — and still useful today — the standard trick
was to define a "tool" whose `input_schema` **is** the shape you want, then force the
model to call it with `tool_choice`. The result lands in `content[0].input` as an
already-parsed object, instead of a JSON string you parse yourself:

```json
{
  "tools": [{
    "name": "extract_contact",
    "input_schema": {
      "type": "object",
      "properties": { "name": { "type": "string" }, "email": { "type": "string" } },
      "required": ["name", "email"]
    }
  }],
  "tool_choice": { "type": "tool", "name": "extract_contact" }
}
```

That request comes back with `stop_reason: "tool_use"` and the data directly in `input` —
no string, no parsing step at all.

## OpenAI's version

OpenAI exposes the same idea through its `text.format` field (on its newer Responses
API), set to `type: "json_schema"` with your schema and `strict: true`:

```json
{
  "text": {
    "format": { "type": "json_schema", "name": "event", "schema": { "...": "..." }, "strict": true }
  }
}
```

## Which one should you reach for?

| Approach | Response lands in | Best for |
|---|---|---|
| `output_config.format` (Anthropic) | `content[0].text`, as a JSON string | Pure data extraction/classification — the whole reply *is* the structured answer |
| Forced tool call | `content[0].input`, already parsed | Agentic workflows where this is one step, or you want a parsed object with zero string-handling |

## Key terms

| Term | Meaning |
|---|---|
| Constrained decoding | Restricting which tokens the model can generate so output always matches a grammar/schema |
| `output_config.format` | Anthropic's dedicated structured-output request field |
| `strict` | A flag (on both providers' tool/schema features) guaranteeing exact schema conformance |
| `stop_reason: "refusal"` | The model declined to produce schema-conforming output |

## Lab

1. Write a JSON Schema for extracting `{ title, priority, due_date }` from a ticket
   description, then use it in an `output_config.format` request body.
2. Rewrite that same extraction as a forced tool call instead.
3. Explain the practical difference between reading the result from `content[0].text` vs.
   `content[0].input`.

## Check yourself

You're ready for Lesson 19 when you can explain, without looking, the two different ways
to get guaranteed-shape JSON out of Anthropic's API, and where the result lands in each.
