# Lesson 28 — Choosing Multimodal vs. Text-Only · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows the
audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD

We've covered three chapters' worth of image and audio models. This last lesson in the
chapter is the one that actually matters day to day: when do you reach for one of them,
and when is a plain text-only call still the right call? The question isn't whether a
model can handle images or audio — most can. It's whether the task actually needs the raw
modality at all.

## S2 · STEPS CARD: when multimodal earns its cost

Three real signals that multimodal is worth it. The visual layout itself is the
information — a chart's trend, a screenshot's button placement — there's no text
substitute without losing exactly what you need. OCR or transcription would lose fidelity,
like handwriting on a form or tone in an audio clip. Or the user's actual input is the
modality to begin with — someone speaking, or uploading a photo and asking what's wrong
with it.

## S3 · STEPS CARD: when text-only wins

And three signals that push the other way. The image is really just a wrapper around text
— a receipt, an invoice, a screenshot of an error — extract the text once with OCR, then
reason over it cheaply on every follow-up turn. Latency matters and the modality isn't
essential — don't bolt on a voice pipeline a typed question would answer just as well.
And the content is already text-native — don't screenshot a web page when the plain text
is sitting right there.

## S4 · STEPS CARD: the cost/latency/quality lens

This is Lesson 11's framework, applied to modality instead of just model choice.
Text-only is the cheapest and fastest option, full stop. Multimodal costs more — images add
hundreds to thousands of tokens each, and audio pipelines chain two or three separate
models together. But on a genuinely visual or audio task, text-only simply can't do the job
at all. Same lesson as always: no universally better option, only the one that fits what
the task needs.

## S5 · CODE CARD: a worked decision

Three quick tests. Summarize a UI mockup — the layout is the information, send the image.
What's the total on this receipt — extract once with OCR, then reason over text from then
on. Answer a typed support question — there's no modality in the input at all, it's a
plain text call, nothing to convert.

## S6 · OUTRO CARD

That's the whole decision, in one question: does this task actually need the raw modality,
or can it be reduced to text first? That's Chapter 5 complete — image generation, vision,
audio, and when to use any of it. Chapter 6 is the capstone: you're about to build a real
chat application end to end, using everything from this entire course.
