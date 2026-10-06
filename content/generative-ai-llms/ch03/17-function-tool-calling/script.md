# Lesson 17 — Function/Tool Calling · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Here's the single most important thing to understand about tool calling before we look at
any JSON: the model never executes anything. It can't query your database, can't check
the weather, can't run code. What it can do is ask your application to do those things on
its behalf, in a precise, structured way.

## S2 · STEPS CARD: the round trip

Four steps, every time. You define a tool — a name, a description the model uses to
decide when it's relevant, and a JSON Schema for its arguments. The model, when it decides
the request needs that tool, replies with a tool_use block instead of plain text. Your
code actually runs the function. And you send the result back as a new message, tied to
that exact tool call.

## S3 · CODE CARD: defining a tool

Here's a real tool definition — get_weather, taking one required argument, location. The
description matters more than it looks: it's literally what the model reads to decide
whether this request needs this tool at all. Get it too vague, and the model either never
calls it or calls it when it shouldn't.

## S4 · CODE CARD: the tool_use block

And here's what comes back when the model decides to use it. stop_reason is tool_use, and
the content array holds this block — a name, an id you'll need in a moment, and input,
which is already a parsed object matching your schema. No string parsing required on your
end.

## S5 · CODE CARD: sending the result back

You run the actual lookup, then send a new user message — yes, user, not a special role —
whose content is a tool_result block. tool_use_id ties it back to the exact call the model
made. The model's own tool_use reply gets replayed into history too, so the full exchange
is there before the model gives its final answer.

## S6 · OUTRO CARD

Define, request, execute, return — that's the whole loop, and it's the foundation of every
agent you'll ever build. Next lesson is a close cousin: forcing the model's actual reply,
not just a tool's arguments, into a strict JSON shape. See you there.
