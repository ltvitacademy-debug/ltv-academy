# Lesson 7 — Why LLMs Hallucinate

**Chapter 1 · How LLMs Actually Work · Lesson 7 of 31**

## What you'll learn

- Why "hallucination" is a direct, predictable consequence of next-token prediction, not a bug
- The specific conditions that make hallucination more likely
- Practical techniques that reduce it, and why none of them eliminate it completely
- Why this lesson closes out Chapter 1: everything before it explains why this happens

## It's the mechanism working as designed, pointed at the wrong target

Lesson 4 established the actual job of an LLM: predict a plausible next token, given everything
so far. Nothing in that mechanism checks whether the result is *true* — only whether it's
*probable*, given the patterns learned during training. When the model has strong, well-supported
patterns to draw on (common facts, well-documented APIs, widely discussed topics), probable and
true usually line up. When they don't — an obscure fact, a specific citation, a function
signature nobody wrote much about — the model still produces confident, fluent, probable-sounding
text. It has no separate "I don't actually know this" signal built into the generation process by
default. That gap between "sounds right" and "is right" is a hallucination.

## When it gets worse

A few conditions reliably increase the chance of hallucination:

- **Specificity without grounding** — asking for a precise citation, a exact statistic, or a
  narrow technical detail that the model has to generate from a general pattern rather than a
  memorized specific fact
- **Thin training coverage** — niche topics, very recent events after the model's knowledge
  cutoff (Lesson 12 covers this), or small/obscure libraries and APIs
- **Leading or loaded prompts** — asking "what year did X happen" when X never happened pushes
  the model toward inventing a plausible year rather than noticing the premise is false
- **Long, multi-step generations** — an early small error becomes permanent context (Lesson 4's
  autoregressive point) and can compound into a larger one later in the same response

## What actually reduces it

No current technique eliminates hallucination outright, but several meaningfully reduce it:

- **Retrieval-augmented generation (RAG)** — ground answers in retrieved, real source text
  (Lesson 3) instead of relying purely on what the model memorized during training
- **Lower temperature / more conservative sampling** (Chapter 3) — favors higher-probability,
  typically safer completions over creative, speculative ones
- **Explicit permission to say "I don't know"** — prompting the model that an uncertain or
  unsupported answer is an acceptable response measurably reduces confident fabrication
- **Citations and verifiable sources** — asking a model to cite its source makes a hallucinated
  claim easier for a human to catch, even when it doesn't prevent generation
- **Human review for high-stakes output** — the only fully reliable backstop today, especially
  for legal, medical, financial, or safety-critical use

## Why this closes Chapter 1

Hallucination isn't a separate flaw bolted onto the architecture — it's the direct consequence of
everything this chapter covered: tokens, embeddings, attention, and a prediction loop that
optimizes for plausibility, not truth. Understanding that is what lets you design around it,
instead of being surprised by it.

## Key terms

| Term | Meaning |
|---|---|
| Hallucination | Confident, fluent, plausible-sounding output that is factually wrong |
| Grounding | Basing a response on real, retrieved source material instead of pure recall |
| Knowledge cutoff | The point after which a model has no training data, increasing hallucination risk for recent events |
| RAG | Retrieval-augmented generation — grounding answers in retrieved real text |

## Check yourself

Chapter 1 is complete when you can explain, without looking: why is hallucination a predictable
consequence of next-token prediction rather than a separate, unrelated bug?
