# Lesson 8 — Error Handling in Tools

**Chapter 2 · Tool Calling & Function Design · Lesson 8 of 32**

## What you'll learn

- The real `is_error` field: how to signal a tool failure back to Claude
- Why a vague error message is almost as bad as no error handling at all
- What happens when Claude's own tool call is invalid (missing a parameter)
- `strict: true` — eliminating invalid calls at the schema level

## A failed tool call is still a tool_result

Lesson 7 covered the normal round trip. A failure doesn't break that
shape — it's still a `tool_result` block, just with one more field, per
Anthropic's current documentation:

```json
{
  "role": "user",
  "content": [{
    "type": "tool_result",
    "tool_use_id": "toolu_01A...",
    "content": "ConnectionError: weather service unavailable (HTTP 500)",
    "is_error": true
  }]
}
```

Claude reads `is_error: true` and incorporates the failure into its
response — for example, telling the user it couldn't retrieve the
weather and suggesting they try again later. The loop from Lesson 2
doesn't stop on an error; it continues with the model now reasoning
about a failure instead of a success.

## Write instructive error messages

Anthropic's own guidance here is concrete: **don't write `"failed"`.**
Include what went wrong and what Claude should try next. Compare:

```
Bad:   "failed"
Good:  "Rate limit exceeded. Retry after 60 seconds."

Bad:   "error"
Good:  "Error: Missing required 'location' parameter"
```

The good versions give Claude the context to recover or adapt — wait and
retry, ask the user for a missing value, fall back to a different tool —
without guessing. The bad versions leave it no better informed than
before the call.

## When Claude's own call is invalid

Sometimes the problem isn't the tool — it's the call itself, like a
missing required parameter. You can send that back the same way, as a
`tool_result` with `is_error: true` and a message naming what's missing.
Per Anthropic's documentation, **Claude will typically retry 2–3 times
with corrections before giving up and apologizing to the user** — the
model treats a clear invalid-call error as something it can self-correct
from, not a dead end.

During development, a pattern of invalid calls on one tool is usually a
signal the tool's *description* needs work (Lesson 6), not that more
error-handling code is needed to paper over it.

## Eliminating invalid calls entirely

For tools where you can't tolerate even a few retries, `strict: true` on
the tool definition guarantees the input always matches the schema
exactly — no missing parameters, no type mismatches, enforced before
Claude's call ever reaches your code. It doesn't help with errors from
the tool's own execution (a real API being down), only with malformed
calls — those two failure categories need different defenses.

## Key terms

| Term | Meaning |
|---|---|
| `is_error` | Optional boolean on a `tool_result` block marking it as a failure |
| Tool execution error | The tool ran but failed (network error, bad data) — distinct from an invalid call |
| Invalid tool call | Claude's request itself was malformed (missing a required parameter) |
| `strict: true` | Tool definition setting that guarantees schema-valid input, eliminating invalid calls |

## Check yourself

You're ready for Lesson 9 when you can write an `is_error` tool_result
message for a rate-limit failure that actually tells Claude what to do
next, not just that something went wrong.
