# Lesson 18 — Structured Output: JSON Mode · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Ask a model to "reply with only JSON" in plain English, and most of the time it will. But
most of the time isn't good enough for code that calls JSON.parse on the result. Stray
text before the JSON, a missing field — any of it breaks a naive integration. This lesson
covers how to make the shape of the output actually guaranteed.

## S2 · STEPS CARD: the problem

Plain prompting for JSON usually works, but "usually" is the problem. Anthropic's
structured outputs feature constrains generation itself — restricting which tokens the
model can even produce, so it's physically unable to output something that doesn't match
your schema. And there's a second path, forcing a tool call, where the result lands
already parsed instead of as a string.

## S3 · CODE CARD: output_config.format

Here's the real shape: an output_config field carrying a json_schema format and your
actual JSON Schema. This isn't validated after the fact — the model's token generation is
constrained the entire time it's writing, so it literally cannot produce a token sequence
that would break your schema.

## S4 · CODE CARD: the response

The reply still comes back as an ordinary text content block — but now that text field
holds a JSON string guaranteed to validate against your schema. Check stop_reason to
confirm it worked: end_turn means success. A value of refusal would mean the model
declined to produce schema-conforming output at all.

## S5 · CODE CARD: forced tool call

The older, still-useful alternative: define a tool whose input_schema is the exact shape
you want, and force the model to call it with tool_choice. Now the result doesn't even
come back as a string — it lands directly in content zero input, already parsed into an
object. No decoding step at all.

## S6 · OUTRO CARD

Two paths to guaranteed JSON: a dedicated structured-output field, or a forced tool call.
Pick based on whether the whole reply is your structured answer, or it's one step inside
something bigger. Next lesson pulls every piece of this chapter together — the full
journey a single request takes, start to finish. See you there.
