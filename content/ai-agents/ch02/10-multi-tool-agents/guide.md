# Lesson 10 — Multi-Tool Agents

**Chapter 2 · Tool Calling & Function Design · Lesson 10 of 32**

## What you'll learn

- Parallel tool use: Claude calling several tools in one turn, for real
- The formatting rules that make a multi-call response work
- Choosing concurrent vs. sequential execution — your decision, not the API's
- What to do about a call you decide not to run

## One turn, several tool_use blocks

By default, Claude may call more than one tool in a single response. The
`content` array just has more than one `tool_use` block, each with its
own `id`:

```json
{"stop_reason": "tool_use", "content": [
  {"type": "tool_use", "id": "toolu_01",
   "name": "get_weather", "input": {"location": "Austin, TX"}},
  {"type": "tool_use", "id": "toolu_02",
   "name": "get_traffic", "input": {"location": "Austin, TX"}}
]}
```

Two independent sub-goals ("what's the weather" and "what's traffic
like") don't depend on each other's results, so Claude requests both at
once instead of looping twice (Lesson 2) to get the same information.

## The formatting rules, exactly

Per Anthropic's current documentation: return **one `tool_result` for
each `tool_use` block**, all together in the next user message, matched
by `tool_use_id` — and every `tool_result` block must come before any
text content in that message.

```json
{"role": "user", "content": [
  {"type": "tool_result", "tool_use_id": "toolu_01",
   "content": "91F, clear"},
  {"type": "tool_result", "tool_use_id": "toolu_02",
   "content": "Moderate traffic, 12 min delay"}
]}
```

Miss one, and you'll get an error about a `tool_use` id missing its
matching result — the same formatting error Lesson 7 covered, now with
more blocks to keep straight.

## Concurrent or sequential — your call, not the API's

The API doesn't prescribe how you actually run multiple calls. Independent,
read-only operations (like the weather and traffic example) are usually
safe to run concurrently for lower latency. Tools with side effects,
shared state, or a real ordering dependency are often safer run
sequentially, one at a time, even though Claude requested them together.
That decision belongs entirely to your application code — the model just
expresses *what* it wants, not *how* your infrastructure should execute
it.

## If you skip a call

If you run calls sequentially and an earlier one fails, or you otherwise
decide not to run a later call in the batch, you still owe it a
`tool_result` — with `is_error: true` and a short explanation, per
Anthropic's own documented pattern:

```json
{"type": "tool_result", "tool_use_id": "toolu_02",
 "is_error": true,
 "content": "Not executed: the preceding write_file call failed."}
```

Every `tool_use` id from that turn needs a matching result, run or not —
there's no "just omit it" option.

## Key terms

| Term | Meaning |
|---|---|
| Parallel tool use | Claude requesting more than one tool call in a single assistant turn |
| Execution strategy | Your application's choice of concurrent vs. sequential execution — not dictated by the API |
| Unmatched tool_use id | A formatting error from sending a tool_result for some, but not all, tool_use blocks in a turn |

## Check yourself

You're ready for Lesson 11 when you can explain why a skipped tool call
still needs a `tool_result`, even one that was never actually run.
