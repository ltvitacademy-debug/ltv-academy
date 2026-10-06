# Lesson 7 — Why LLMs Hallucinate · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every LLM will, at some point, state something false with total confidence. That's not a glitch —
it's a direct, predictable consequence of the exact mechanism this chapter has been building up
to.

## S2 · CODE CARD (toy hallucination example, illustrative)

Remember Lesson 4: the model's job is to predict a plausible next token, not a true one. Ask for
an obscure citation it never actually memorized, and it doesn't return "I don't know" by default —
it generates something fluent and confident-sounding, built from the pattern of what citations
usually look like. This example is illustrative, not a real transcript, but the failure mode is
exactly this common.

## S3 · STEPS CARD (when it gets worse)

Four conditions make it worse. Specificity without grounding — a precise stat or citation the
model has to generate rather than recall. Thin training coverage — niche topics, or anything
after the knowledge cutoff. Leading or loaded prompts — asking when something happened when it
never happened at all. And long generations, where an early small error compounds, because
autoregressive generation makes every token permanent context for what follows.

## S4 · STEPS CARD (what actually reduces it)

Nothing eliminates it, but several things measurably reduce it. Retrieval-augmented generation
grounds answers in real retrieved text instead of pure memory. Lower temperature favors safer,
higher-probability completions. Explicitly telling the model "I don't know" is an acceptable
answer reduces confident fabrication. And for anything high-stakes — legal, medical, financial —
human review is still the only fully reliable backstop.

## S5 · OUTRO CARD

Tokens, embeddings, attention, prediction, and now hallucination — that's the full mechanism
Chapter 1 set out to explain. Chapter 2 moves outward: the actual landscape of providers and
models you'll choose between in practice.
