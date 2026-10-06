# Lesson 31 — Capstone: Wrap-Up & Portfolio Presentation · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows the
audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD

You built a real, streaming, multi-turn chat application. This last lesson is about what
to do with that: how to talk about it, how to extend it, and a full recap of everything
that fed into it. "I built a chatbot" undersells what you actually did — let's fix that.

## S2 · STEPS CARD: how to describe it

Say it like this instead. You built a stateful, multi-turn conversational application
against a production LLM API — not a stateless script. It uses server-sent-event streaming
for incremental rendering, and you can explain the real event sequence behind it. System
behavior runs through a dedicated system parameter, separate from conversation turns. And
you made a deliberate model and cost trade-off decision — you can explain why you picked
the model you picked, not just that it was the default.

## S3 · STEPS CARD: the whole course, as one map

Chapter 1 is why messages has to carry full history every turn. Chapter 2 is how you chose
and justified a specific model. Chapter 3 is the exact request, response, and streaming
shapes the build runs on. Chapter 4 is why a system prompt, not a fine-tune, was the right
tool. Chapter 5 is your concrete next features — images, and when they're actually worth
the cost. If you can explain every one of those out loud, you've internalized the course,
not just finished it.

## S4 · STEPS CARD: extending it further

Four real next steps, in roughly increasing difficulty. Wrap the API call in error handling
for dropped connections and rate limits. Add tool calling so the assistant can run a real
function, like a calculator. Add structured JSON output so it returns machine-readable
data alongside its reply. Or add image input so a user can share a picture as part of the
conversation. Every one of those is a resume-worthy addition, built entirely from this
course.

## S5 · CODE CARD: where this sits in your path

This is course five of twelve in the AI Engineer path's Job-Ready stage. You've gone from
how LLMs work to a working, streaming application — the foundation everything after this
builds on. Next up: Prompt and Context Engineering, which takes the system prompts and
message-shaping you used casually in this capstone and turns prompt design into a
disciplined, testable practice.

## S6 · OUTRO CARD

That's Generative AI and LLMs, complete — thirty-one lessons, six chapters, and one real
working application to show for it. Next course: Prompt and Context Engineering. See you
there.
