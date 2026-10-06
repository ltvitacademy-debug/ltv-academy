# Lesson 11 — OpenAI-Style API Structure

**Chapter 3 · Working With AI Provider APIs · Lesson 11 of 22**

## What you'll learn

- Why almost every chat-based AI API converges on the same basic shape
- The real request/response shape of Anthropic's Messages API
- The real response shape of OpenAI's Chat Completions API, for comparison
- How to read `usage` fields to know what a call actually cost

## One request shape, nearly everywhere

Every chapter so far has been building toward this moment: AI provider APIs
are just REST APIs that happen to speak a very particular dialect of JSON.
You send a JSON body with a `model` name and a `messages` array. You get
back a JSON body with the model's reply and a token count. That's the whole
pattern — chapters 1 and 2 already taught you everything you need to read it.

## The real shape: Anthropic's Messages API

A request to `POST https://api.anthropic.com/v1/messages`:

```json
{
  "model": "claude-sonnet-5",
  "max_tokens": 1024,
  "messages": [
    {"role": "user", "content": "Hello, Claude"}
  ]
}
```

And the response:

```json
{
  "id": "msg_013Vc6zL1t7WY53F0r51Ym2u",
  "type": "message",
  "role": "assistant",
  "content": [
    {"type": "text", "text": "Hello! How can I help?"}
  ],
  "model": "claude-sonnet-5",
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "usage": {"input_tokens": 10, "output_tokens": 12}
}
```

Notice `content` is an **array** of blocks, not a plain string — Lesson 13
will show you why that matters the moment tool calls enter the picture.
`stop_reason` tells you *why* the model stopped (`end_turn`, `max_tokens`,
`tool_use`, and others). `usage` is how you — and your billing — know what
the call actually cost.

## The other common shape: OpenAI-style Chat Completions

The course title says "OpenAI-style" for a reason: a huge number of
providers (and open-source servers like vLLM and Ollama) mimic OpenAI's
Chat Completions response shape, even when they aren't OpenAI at all:

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "message": {"role": "assistant", "content": "Hi there!"},
      "finish_reason": "stop"
    }
  ],
  "usage": {"prompt_tokens": 9, "completion_tokens": 12, "total_tokens": 21}
}
```

The request side looks almost identical to Anthropic's — `model` and a
`messages` array of `{role, content}` objects. The *response* is where the
two families diverge: OpenAI-style wraps the reply in a `choices` array
(because a request can ask for more than one candidate reply), and the
assistant's text lives at `choices[0].message.content` instead of
`content[0].text`.

## Key terms

| Term | Anthropic Messages API | OpenAI-style Chat Completions |
|---|---|---|
| Reply text | `content[0].text` | `choices[0].message.content` |
| Why it stopped | `stop_reason` | `finish_reason` |
| Input cost | `usage.input_tokens` | `usage.prompt_tokens` |
| Output cost | `usage.output_tokens` | `usage.completion_tokens` |

## Lab

Without calling a real API, hand-write the JSON response you'd expect for
each of these, matching the correct family's field names:

1. An Anthropic Messages API call that stopped because it hit `max_tokens`.
2. An OpenAI-style Chat Completions call where the model's `finish_reason`
   was `"length"`.

## Check yourself

Given a raw JSON response with no other context, could you tell whether it
came from the Anthropic Messages API or an OpenAI-style Chat Completions
endpoint, just from the field names?
