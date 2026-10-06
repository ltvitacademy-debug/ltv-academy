# Lesson 2 — Zero-Shot vs. Few-Shot Prompting · Voiceover script

Segments map 1:1 to slides. Target: ~300 words / 2.5-3 minutes.

---

## S1 · TITLE CARD

Last lesson we covered the four ingredients of a good prompt. Now a
related question: do you just describe the task, or do you show the model
examples of what you want? That's the zero-shot versus few-shot decision.

## S2 · CODE CARD (zero-shot example)

Zero-shot means instructions only, no examples. Classify this support
ticket as Billing, Technical, or Account — that's it. It works fine for
tasks the model already handles reliably, and it's the cheapest prompt to
write and to run.

## S3 · CODE CARD (few-shot example)

Few-shot adds a handful of worked examples before the real request. Here,
two labeled tickets come first, then the real one. The examples don't just
state the categories — they show the exact output format, one word, no
punctuation, and resolve judgment calls a plain description can't.

## S4 · STEPS CARD (when to use few-shot)

Reach for few-shot in three situations. When the output needs an unusual
format that's hard to describe in words. When the task involves judgment
calls better shown than explained. And when zero-shot results are
inconsistent — right sometimes, wrong other times, on the same kind of
input.

## S5 · CODE CARD (diminishing returns)

How many examples do you need? Two to five is usually enough. Past that,
returns drop off fast — more examples mostly just add tokens and cost, and
a poorly chosen example can mislead the model more than having no example
at all.

## S6 · OUTRO CARD

Zero-shot for the straightforward cases, few-shot when format or judgment
matters. Next up: system prompts — the instructions that sit above every
single user message and shape the model's behavior for an entire
conversation.
