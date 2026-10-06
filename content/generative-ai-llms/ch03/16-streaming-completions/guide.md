# Lesson 16 — Streaming Completions

**Chapter 3 · Working With LLM APIs · Lesson 16 of 31**

## What you'll learn

- Why streaming exists: the difference between waiting and watching
- The exact, real sequence of server-sent events Anthropic's Messages API sends when
  `stream: true`
- What each event type carries, verified against current docs
- How OpenAI's streaming chunks differ in shape
- When to reach for streaming, and when a plain blocking call is simpler

## Why stream at all

A non-streaming call makes you wait for the **entire** reply — which, for a long answer,
can be several seconds of a blank screen. Streaming sends the reply back **incrementally**,
token by token, over a persistent connection, so your UI can show words appearing as
they're generated — exactly like watching Claude or ChatGPT "type." The total time to the
last token is about the same either way; what streaming improves is *perceived* latency —
time to the *first* visible token.

## Turning it on: one field

```json
{
  "model": "claude-opus-4-5",
  "max_tokens": 256,
  "stream": true,
  "messages": [
    { "role": "user", "content": "Hello" }
  ]
}
```

With `stream: true`, the response arrives as **server-sent events (SSE)** instead of one
JSON blob — a sequence of small, named events over the same HTTP connection.

## The real event sequence

This is the actual, documented sequence for a simple text reply:

```
event: message_start
data: {"type":"message_start","message":{"id":"msg_01...","content":[],...}}

event: content_block_start
data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Hello"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"!"}}

event: content_block_stop
data: {"type":"content_block_stop","index":0}

event: message_delta
data: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":15}}

event: message_stop
data: {"type":"message_stop"}
```

## What each event means

| Event | What it carries |
|---|---|
| `message_start` | The message shell — id, role, model — with an empty `content` array |
| `content_block_start` | A new block (usually `text`) is beginning at a given `index` |
| `content_block_delta` | One incremental piece of text (`text_delta`), appended to that block |
| `content_block_stop` | That content block is finished |
| `message_delta` | Final metadata — `stop_reason` and the completed `usage` counts |
| `message_stop` | The stream is over |

A stream can also include a `ping` event with no meaningful data (a keep-alive) — safe to
ignore. If the message includes a tool call instead of text, you'll see
`content_block_start`/`delta`/`stop` cycles for each content block — text and tool use
blocks alike — before the final `message_delta`/`message_stop`.

## OpenAI's streaming shape

OpenAI's Chat Completions streaming sends smaller JSON chunks, each shaped like a partial
version of the final response, ending with a literal `[DONE]` sentinel:

```
data: {"choices":[{"delta":{"content":"Hello"}}]}

data: {"choices":[{"delta":{"content":"!"}}]}

data: {"choices":[{"delta":{},"finish_reason":"stop"}]}

data: [DONE]
```

Same underlying idea — incremental text pieces over SSE — but Anthropic names each event
and separates "a block started/is being appended to/stopped" into distinct event types,
while OpenAI just sends successive partial `choices[].delta` objects and a `[DONE]`
marker.

## Key terms

| Term | Meaning |
|---|---|
| Server-sent events (SSE) | A simple, one-way streaming protocol over a persistent HTTP connection |
| `delta` | An incremental fragment of content, not the full value |
| Perceived latency | Time until the user sees *something*, vs. total completion time |
| `[DONE]` | OpenAI's sentinel event marking the end of a stream |

## Lab

1. List, in order, the six Anthropic event types shown above for a simple text reply.
2. Explain why a `ping` event can be safely ignored by your streaming parser.
3. Identify which event carries the final `usage` token counts in Anthropic's stream.

## Check yourself

You're ready for Lesson 17 when you can list Anthropic's streaming event sequence from
memory, in order, and explain what `delta` means in both providers' streams.
