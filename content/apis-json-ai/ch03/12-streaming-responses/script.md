# Lesson 12 — Streaming Responses · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Watch Claude or ChatGPT answer a question and the words appear one at a
time, like someone typing. That's not an animation trick — it's a real,
different API mode called streaming, and today we open it up.

## S2 · CODE CARD (stream: true request)

Streaming starts with the exact same request body you already know — model,
max tokens, messages — plus one new field: stream, set to true. That one
flag changes everything about how the response comes back.

## S3 · CODE CARD (message_start + content_block_start)

Instead of one big JSON blob at the end, the server keeps the connection
open and pushes small event-and-data pairs over Server-Sent Events. First
event: message_start, with an empty content array. Then content_block_start,
announcing a new text block is about to begin.

## S4 · CODE CARD (content_block_delta chunks + content_block_stop)

Then come the deltas — a real example straight from Anthropic's own docs:
the text chunk "ello frien." Dozens of these little text_delta events
stream in, one after another, until a content_block_stop event closes that
block out.

## S5 · CODE CARD (message_delta + message_stop)

Once every content block is done, a message_delta event carries the
top-level stuff — most importantly, the final stop_reason and the
cumulative token usage. Then one last event, message_stop, and the stream
is over.

## S6 · STEPS CARD (event lifecycle summary)

So the full lifecycle, every single time: message_start opens it, one or
more content blocks stream their deltas and close, message_delta reports
the final stop_reason, and message_stop ends it. Every official SDK gives
you a helper that does this accumulation for you — but now you know what's
actually happening underneath.

## S7 · OUTRO CARD

Streaming is how a real chat interface feels alive instead of frozen.
Next lesson, we look at a different shape of AI capability entirely:
teaching the model to call functions and tools on your behalf.
