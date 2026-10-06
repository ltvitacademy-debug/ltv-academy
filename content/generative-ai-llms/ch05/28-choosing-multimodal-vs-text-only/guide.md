# Lesson 28 — Choosing Multimodal vs. Text-Only

**Chapter 5 · Multimodal & Beyond-Text Models · Lesson 28 of 31**

## What you'll learn

- A practical decision framework for when a multimodal call is worth it, and when it's
  just added cost and latency for no real benefit
- How Lesson 2's token-cost thinking and Lesson 11's cost/latency/quality trade-off apply
  directly to images and audio, not just text
- The "convert first" pattern: when preprocessing to text beats sending raw media
- Why this closes Chapter 5: multimodal isn't a free upgrade, it's a deliberate trade-off

## The question to ask first

Not "can this model handle images/audio?" — most current frontier models can, in some
form (Chapters 25–27). The right question is: **does the task actually require the raw
modality, or can it be reduced to text before it ever reaches the model?** A multimodal
call isn't free — Lesson 26 showed a single screenshot can cost over a thousand tokens
before the model reasons about anything.

## When multimodal earns its cost

- **The visual layout itself is the information** — a chart's trend, a UI screenshot's
  button placement, a hand-drawn diagram. There's no clean text substitute without losing
  exactly the thing you need.
- **OCR/transcription would lose fidelity** — a scanned form with checkboxes and
  handwriting, or an audio clip where tone/emphasis matters as much as the words.
- **The user's actual input *is* the modality** — someone speaking to a voice assistant, or
  uploading a photo and asking "what's wrong with this?" There's no text version of that
  request to begin with.

## When text-only (or a converted intermediate) wins

- **The image is just a wrapper around text** — a photographed receipt, a scanned invoice,
  a screenshot of an error message. Run OCR or a dedicated extraction step once, then feed
  the resulting text to a cheap text-only model for every subsequent reasoning step. You
  pay the vision cost once, not on every follow-up turn.
- **Latency matters and the modality isn't essential** — a customer-support chatbot that
  could accept a typed question doesn't need a speech-to-speech pipeline bolted on by
  default, even if one is available.
- **The task is high-volume and the content is already text-native** — don't screenshot a
  web page and hand it to a vision model when the underlying HTML or a plain-text extract
  is sitting right there, cheaper and more reliable.

## Applying the cost/latency/quality lens from Lesson 11

| Dimension | Text-only | Multimodal |
|---|---|---|
| Cost | Lowest, token-only | Higher — images add hundreds–thousands of tokens each; audio pipelines chain 2-3 models (Lesson 27) |
| Latency | Fastest | Slower — larger payloads, and chained audio calls add round trips |
| Quality on visual/audio tasks | Can't do the task at all without a modality | Can do it directly, when the modality carries real information |

The same lesson applies here as everywhere else in this course: there's no universally
"better" option, only the one that fits what the task actually needs.

## A worked decision

```
Task: "Summarize what changed in this UI mockup."
  -> Layout IS the information     -> send the image. Multimodal wins.

Task: "What's the total on this receipt?"
  -> One-time extraction, then reuse -> OCR once, reason over text after.

Task: "Answer the user's typed support question."
  -> No modality in the input at all -> plain text-only call. Nothing to convert.
```

## Key terms

| Term | Meaning |
|---|---|
| Convert-first pattern | Extracting text from an image/audio source once, then reasoning over that text repeatedly |
| Modality cost | The extra tokens/latency a non-text input adds beyond a plain text call |
| Visual information | Content where the layout/appearance itself is the fact being communicated |

## Lab

1. For each of the three worked-decision tasks above, explain in one sentence why that
   choice is correct.
2. Describe a real feature you've used (or could imagine) where sending a screenshot to a
   vision model would be wasteful, and what text-only alternative would work instead.
3. Explain, using Lesson 11's framework, why a high-volume production pipeline should
   prefer the convert-first pattern over repeated multimodal calls whenever possible.

## Check yourself

Chapter 5 is complete when you can state, from memory, the one question that should drive
every multimodal-vs-text-only decision, and give one real example each of a task where
multimodal wins and one where converting to text first wins.
