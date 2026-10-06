# Lesson 13 — Chat Completion Basics

**Chapter 3 · Working With LLM APIs · Lesson 13 of 31**

## What you'll learn

- What a "chat completion" call actually is: an array of messages in, one new message out
- The two required fields in a real Anthropic Messages API request: `model` and `max_tokens`
- The real request and response JSON shapes, verified against current provider docs
- How the same idea looks in OpenAI's Chat Completions API
- Why every other lesson in this chapter is really just a variation on this one request/response pair

## A chat completion, in one sentence

You send a **list of messages** — the conversation so far — to a model endpoint, and it
sends back **one new message** that continues that conversation. That's the whole mental
model. Roles, temperature, streaming, tool calling, and JSON mode (the rest of this
chapter) are all just options layered on top of this same request/response shape.

## A real request: Anthropic's Messages API

This course uses Anthropic's **Messages API** as its working example for the rest of the
chapter: `POST https://api.anthropic.com/v1/messages`.

```json
{
  "model": "claude-opus-4-5",
  "max_tokens": 1024,
  "system": "You are a helpful assistant.",
  "messages": [
    { "role": "user", "content": "Hello, Claude" }
  ]
}
```

Only two fields are required: `model` (which model answers) and `max_tokens` (the hard
cap on how long the reply is allowed to be). `system` and the sampling parameters covered
later in this chapter are optional.

## The real response

```json
{
  "id": "msg_01XFDUDYJg",
  "type": "message",
  "role": "assistant",
  "content": [
    { "type": "text", "text": "Hello! How can I help?" }
  ],
  "stop_reason": "end_turn",
  "usage": { "input_tokens": 10, "output_tokens": 15 }
}
```

Notice `content` is an **array** of blocks, not a plain string — Lesson 17 and Lesson 18
are both about putting things in that array besides plain text. `stop_reason` tells you
*why* the model stopped (`"end_turn"` here means it finished naturally — more on this in
Lesson 19). `usage` reports exactly how many tokens the call cost on each side.

## Required vs. optional fields

| Field | Required? | What it does |
|---|---|---|
| `model` | Yes | Which model generates the reply |
| `max_tokens` | Yes | Hard cap on reply length |
| `messages` | Yes | The conversation so far, as an array |
| `system` | No | Instructions that frame the whole conversation (Lesson 14) |
| `temperature`, `top_p`, `top_k` | No | Sampling controls (Lesson 15) |
| `stream` | No | Send the reply incrementally (Lesson 16) |
| `tools` | No | Let the model call functions you define (Lesson 17) |

## The same idea in OpenAI's Chat Completions API

OpenAI's long-running `POST https://api.openai.com/v1/chat/completions` endpoint shapes
the same concept a little differently — worth knowing since you'll see both styles in the
wild:

```json
{
  "model": "gpt-4.1",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello" }
  ]
}
```

```json
{
  "id": "chatcmpl-abc123",
  "choices": [
    { "message": { "role": "assistant", "content": "Hello! How can I help?" },
      "finish_reason": "stop" }
  ],
  "usage": { "prompt_tokens": 19, "completion_tokens": 10, "total_tokens": 29 }
}
```

Two real differences to remember: OpenAI puts `system` **inside** the `messages` array as
its own role (Anthropic uses a separate top-level `system` field — Lesson 14 goes deep on
this), and OpenAI wraps the reply in a `choices` array instead of returning `content`
directly. OpenAI has also since introduced a newer Responses API for new projects, but
Chat Completions remains supported and is still what most existing integrations use.

## Key terms

| Term | Meaning |
|---|---|
| Chat completion | A single request/response round trip: messages in, one new message out |
| Messages API | Anthropic's endpoint for chat completions (`/v1/messages`) |
| Chat Completions API | OpenAI's equivalent, longer-running endpoint (`/v1/chat/completions`) |
| `content` block | One item inside a message's `content` array — text, a tool call, etc. |
| `stop_reason` / `finish_reason` | Why the model stopped generating (covered fully in Lesson 19) |

## Lab

1. Write the minimal JSON body for a Messages API call that asks "What is 2+2?" with
   `max_tokens` set to 50. Identify which two fields are required.
2. Rewrite that same request in OpenAI's Chat Completions shape, including a system
   message.
3. In the sample response above, identify the field that tells you how many tokens the
   reply cost, and the field that tells you why the model stopped.

## Check yourself

You're ready for Lesson 14 when you can draw the shape of a chat completion request and
response from memory — without looking, name the two required request fields and the
three fields `content`, `stop_reason`, and `usage` mean in the response.
