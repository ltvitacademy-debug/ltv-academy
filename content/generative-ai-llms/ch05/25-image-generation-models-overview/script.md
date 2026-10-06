# Lesson 25 — Image Generation Models, Overview · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows the
audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Welcome to Chapter 5 — multimodal and beyond-text models. We've spent four chapters
entirely on text in, text out. Now we go past that. This lesson is about models that
generate images, and the first thing to get straight is that understanding an image and
generating one are two completely different capabilities.

## S2 · STEPS CARD: who makes image-gen models

Verified directly against each provider's current docs: OpenAI's GPT Image 2.5, in two
variants — Sunburst for precise editing, Flare for fast one-shot generation. Google's Nano
Banana and Nano Banana Pro, built right into Gemini. xAI's Grok Imagine, running on its own
Aurora engine. And two image-only specialists worth knowing by name: Midjourney and Black
Forest Labs' FLUX. Notice who's missing from that list.

## S3 · CODE CARD: understanding vs. generating

Here's the one fact to hold onto: Claude can look at an image and describe it in detail,
but per Anthropic's own documentation, it cannot generate, produce, edit, or create one.
Vision and generation are genuinely different capabilities, often from different providers
entirely — so if you're architecting an app that needs both a chatbot and AI-generated
pictures, that's very likely two different API calls to two different models.

## S4 · STEPS CARD: two approaches

Almost everything in this lesson, including GPT Image 2.5 and Nano Banana, is a diffusion
model — it starts from random noise and refines it step by step into a coherent image, like
a sculptor removing material until a shape appears. xAI's Aurora engine does something
different: it predicts the image piece by piece, much closer in spirit to how a text model
predicts the next token. Different paths, both producing competitive results right now.

## S5 · CODE CARD: the request shape

And here's the reassuring part: calling an image model looks a lot like the chat
completions you already know. A JSON body goes in with a model name and a prompt; what
comes back is image data instead of a text message. Same request/response shape you
learned in Chapter 3 — just a different payload on the way out.

## S6 · OUTRO CARD

Image generation, in one lesson: who's building it, the two technical approaches behind it,
and the crucial fact that vision and generation don't imply each other. Next lesson flips
to the understanding side — vision-language models, and exactly what Claude, GPT, and
Gemini can and can't do when you hand them a picture.
