# Lesson 12 — Streaming Responses

**Chapter 3 · Working With AI Provider APIs · Lesson 12 of 22**

## What you'll learn

- Why AI APIs offer a streaming mode at all
- Server-Sent Events (SSE): the real transport streaming uses
- The real event sequence Anthropic's Messages API sends, in order
- How a client accumulates streamed deltas into the final message

## Why stream at all

A normal (non-streaming) API call waits for the model to finish generating
the *entire* reply before sending anything back. For a short answer that's
fine. For a long one, the user stares at a blank screen for several
seconds. Streaming sends the reply as it's generated, piece by piece, so
a chat UI can show words appearing in real time — exactly like watching
Claude or ChatGPT "type."

## The transport: Server-Sent Events

Streaming responses use **SSE** (Server-Sent Events) — plain HTTP, kept
open, with the server pushing small `event:` / `data:` pairs down the same
connection instead of one big JSON blob at the end. You request it by
adding `"stream": true` to the same request body you already know:

```json
{
  "model": "claude-sonnet-5",
  "max_tokens": 256,
  "messages": [{"role": "user", "content": "Hello"}],
  "stream": true
}
```

## The real event sequence

Anthropic's Messages API sends events in a fixed order. First, a
`message_start` event with an empty `content` array, then a
`content_block_start`:

```
event: message_start
data: {"type":"message_start",
 "message":{"id":"msg_01abc","role":"assistant","content":[]}}

event: content_block_start
data: {"type":"content_block_start","index":0,
 "content_block":{"type":"text","text":""}}
```

Then a series of `content_block_delta` events — each one a small chunk of
text — until a `content_block_stop` closes that block. This is a real,
documented example chunk:

```
event: content_block_delta
data: {"type":"content_block_delta","index":0,
 "delta":{"type":"text_delta","text":"ello frien"}}

... (many more text_delta events follow) ...

event: content_block_stop
data: {"type":"content_block_stop","index":0}
```

Finally, a `message_delta` event carries top-level changes — most
importantly the final `stop_reason` and the cumulative `usage` — followed
by a closing `message_stop`:

```
event: message_delta
data: {"type":"message_delta",
 "delta":{"stop_reason":"end_turn"},
 "usage":{"output_tokens":15}}

event: message_stop
data: {"type":"message_stop"}
```

The API can also send `ping` events at any point to keep the connection
alive — your client should just ignore event types it doesn't recognize.

## Accumulating the final message

A client doesn't usually act on each raw event. It accumulates the
`text_delta` chunks into one string per content block, and once
`content_block_stop` arrives, it has that block's final content. Every
official Anthropic SDK provides a helper for exactly this (for example,
Python's `stream.get_final_message()`) so you rarely hand-roll this loop
in production — but you need to recognize the event shapes underneath it.

## Key terms

| Term | Meaning |
|---|---|
| SSE | Server-Sent Events — the HTTP-based streaming transport |
| `message_start` | First event; empty content, carries the message `id` |
| `content_block_delta` | A small incremental chunk of a content block |
| `stop_reason` | Arrives on `message_delta`, once generation is complete |

## Lab

Sketch (in pseudocode or real Python) a loop that reads SSE events and
concatenates `text_delta.text` values into one running string, printing
the final string only after a `message_stop` event arrives.

## Check yourself

In order, name the four event types that bracket every Messages API stream:
the one that opens it, the one that starts a content block, the one that
carries the final `stop_reason`, and the one that closes the stream.
