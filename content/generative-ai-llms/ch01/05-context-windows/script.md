# Lesson 5 — Context Windows · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every model has a hard ceiling on how much it can read at once — and that ceiling includes a lot
more than just the message you typed. That's the context window.

## S2 · STEPS CARD (what counts toward the window)

The system prompt counts. The entire conversation history counts. Tool results fed back in
count. Attached documents count. All of it shares one token budget, and it's the same budget
whether it's instructions, history, or your actual new message.

## S3 · CODE CARD (real context window numbers, verified)

Checked directly against each provider's own documentation as of this course's research:
Anthropic's current flagship tier — Opus, Sonnet, and Fable — sits at one million tokens, with
Haiku, the fast tier, at two hundred thousand. Grok 4.7 sits at five hundred thousand. GPT-6
Astra, OpenAI's flagship, is just over one million. These exact numbers will be outdated by the
time you're watching this — that's exactly what Lesson 12 is about.

## S4 · STEPS CARD (exceed it -> fails, not silently trimmed)

Go over the limit, and the request doesn't get quietly trimmed — it fails, with an explicit
error. Managing that is the application's job: trim old turns, summarize earlier history, or
retrieve only the most relevant chunks instead of stuffing in an entire document.

## S5 · OUTRO CARD

A bigger window raises the ceiling, but it doesn't guarantee the model weighs everything inside
it equally — information buried in the middle of a huge prompt can get less attention than
what's near the start or end. Next lesson: model sizes, and the real trade-off between a small,
fast model and a large, capable one.
