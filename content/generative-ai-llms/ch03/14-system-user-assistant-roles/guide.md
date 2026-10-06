# Lesson 14 — System, User & Assistant Roles

**Chapter 3 · Working With LLM APIs · Lesson 14 of 31**

## What you'll learn

- Why Anthropic's Messages API treats `system` as a separate top-level field, not a role
- The two roles that actually live inside the `messages` array — `user` and `assistant`
- Why messages should alternate, and what happens if they don't
- How a multi-turn conversation is built by appending to the same array
- How OpenAI's role model differs, and why that trips people up when switching providers

## Three roles, one mental split

Every chat-based LLM API organizes a conversation around three roles: **system**
(standing instructions for the whole conversation), **user** (what the human said), and
**assistant** (what the model said). Where those roles live in the request is where
Anthropic and OpenAI genuinely diverge — and it's a real source of bugs when developers
port code between the two.

## Anthropic: system lives outside the messages array

In the Messages API, `system` is its **own top-level request field** — a string (or array
of text blocks) — not an entry inside `messages`. The `messages` array itself only ever
contains `user` and `assistant` entries:

```json
{
  "model": "claude-opus-4-5",
  "max_tokens": 1024,
  "system": "You are a terse, precise coding assistant.",
  "messages": [
    { "role": "user", "content": "What's a closure?" },
    { "role": "assistant", "content": "A function bundled with..." },
    { "role": "user", "content": "Give me a one-line example." }
  ]
}
```

`system` applies to the entire conversation, once, regardless of how many turns follow.
It's the right place for persona, tone, constraints, and formatting rules you want
honored on every single turn — not something you'd repeat inside a `user` message.

## Messages alternate, and get merged if they don't

Anthropic's documentation is explicit on this point: consecutive `user` or `assistant`
turns in the array get **combined into a single turn**. In practice, that means you build
a conversation by strictly alternating `user`, `assistant`, `user`, `assistant`... and the
array always starts with a `user` message. If your code appends two `user` messages in a
row by mistake, the API doesn't error — it just treats them as one turn, which usually
isn't what you wanted.

## Building a multi-turn conversation

A conversation is just this same array growing by two entries per round trip: you add the
model's last reply as an `assistant` message, then add the human's next message as a new
`user` entry, and send the whole array back.

```json
{
  "messages": [
    { "role": "user", "content": "What's a closure?" },
    { "role": "assistant", "content": "A function bundled with..." },
    { "role": "user", "content": "Give me a one-line example." }
  ]
}
```

There's no server-side session or conversation ID in the Messages API — the full history
is resent on every call. Your application is responsible for storing and replaying it.

## OpenAI: all three roles live inside messages

OpenAI's Chat Completions API instead puts `system` **inside** the `messages` array as
its own role, alongside `user` and `assistant`:

```json
{
  "model": "gpt-4.1",
  "messages": [
    { "role": "system", "content": "You are a terse, precise coding assistant." },
    { "role": "user", "content": "What's a closure?" },
    { "role": "assistant", "content": "A function bundled with..." },
    { "role": "user", "content": "Give me a one-line example." }
  ]
}
```

The content is identical — standing instructions, then alternating turns — but the
*shape* differs: one array with three possible role values, instead of a separate
top-level field plus a two-role array. Port code from one provider to the other without
noticing this, and your "system prompt" either silently disappears or throws a validation
error.

## Key terms

| Term | Meaning |
|---|---|
| `system` (Anthropic) | Top-level field; standing instructions for the whole conversation |
| `system` role (OpenAI) | A message entry inside `messages` with the same purpose |
| `user` | A message from the human (or your application, on the human's behalf) |
| `assistant` | A message from the model — including ones you supply yourself to seed history |
| Turn | One `user` + the `assistant` reply that follows it |

## Lab

1. Write a 5-message Anthropic-style request (`system` plus 4 alternating `user`/
   `assistant` messages) for a conversation about debugging a Python error.
2. Rewrite the same conversation in OpenAI's single-array, three-role shape.
3. Explain, in one sentence, what happens if you accidentally send two `user` messages in
   a row to the Messages API.

## Check yourself

You're ready for Lesson 15 when you can explain, without looking, where `system` lives in
each of the two APIs, and why Anthropic's `messages` array has to alternate.
