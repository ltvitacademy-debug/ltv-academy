# Lesson 7 — Tool Calling in Practice

**Chapter 2 · Tool Calling & Function Design · Lesson 7 of 32**

## What you'll learn

- What Claude's response actually contains when it calls a tool, beyond just the `tool_use` block
- `tool_choice`: the four real settings that control whether and which tool gets called
- Why Claude often narrates before calling a tool, and why your code shouldn't depend on that text
- A full, real two-turn exchange, annotated

## A response is rarely just a tool_use block

Lesson 3 showed a clean `tool_use` block in isolation. In practice,
Claude's `content` array often has a `text` block *and* a `tool_use`
block together — Claude narrating what it's about to do, then doing it.
For "What's the weather in San Francisco right now, and what time is it
there?", a real response looks like:

```json
{"role": "assistant", "content": [
  {"type": "text",
   "text": "I'll check the current weather and time in San Francisco."},
  {"type": "tool_use", "id": "toolu_01A...", "name": "get_weather",
   "input": {"location": "San Francisco, CA"}}
]}
```

That narration is genuinely useful for a human watching the agent work —
but your code should treat it like any other generated text and never
parse it for control flow. The thing that actually tells your code what
happened is the structured `tool_use` block and the top-level
`stop_reason`, not the wording Claude chose.

## `tool_choice`: controlling whether a tool gets called

Four real settings, verified against the current API:

```
tool_choice: {"type": "auto"}         Claude decides whether to call
                                       any tool, or none — the default
tool_choice: {"type": "any"}          Claude must call SOME tool,
                                       but not forced to one in particular
tool_choice: {"type": "tool",
              "name": "get_weather"}  Claude must call THIS tool
tool_choice: {"type": "none"}         Claude may not call any tool
```

`"any"` and `"tool"` force a tool call by pre-filling the assistant
turn — which means Claude won't emit narration text first, even if asked
to. If you want both a forced call *and* natural-language commentary, use
`"auto"` and ask explicitly in the prompt instead ("Use the get_weather
tool in your response").

## A full exchange, annotated

```
Turn 1 (you send):
  messages: [{"role": "user", "content": "Weather in Austin?"}]
  tools: [get_weather]

Claude replies, stop_reason "tool_use":
  content: [{"type": "tool_use", "id": "toolu_1", "name": "get_weather",
             "input": {"location": "Austin, TX"}}]

Turn 2 (you send — full history, PLUS the new tool_result):
  messages: [
    {"role": "user", "content": "Weather in Austin?"},
    {"role": "assistant", "content": [<the tool_use block above>]},
    {"role": "user", "content": [
      {"type": "tool_result", "tool_use_id": "toolu_1",
       "content": "91F, clear"}]}
  ]

Claude replies, stop_reason "end_turn":
  content: [{"type": "text",
             "text": "It's 91°F and clear in Austin right now."}]
```

Notice the assistant's own prior `tool_use` content goes back in as an
`assistant` message on turn 2 — the model needs its own earlier action in
context to make sense of the result that follows it.

## Key terms

| Term | Meaning |
|---|---|
| `content` array | The list of blocks (text, tool_use, etc.) making up one message — can mix types |
| `tool_choice` | The request parameter controlling whether/which tool Claude must call: `auto`, `any`, `tool`, `none` |
| Forced tool use | `any` or `tool` — pre-fills the turn, suppressing narration text |

## Check yourself

You're ready for Lesson 8 when you can explain why forcing a specific
tool with `tool_choice: {"type": "tool", ...}` means you won't see
Claude's narration text on that turn.
