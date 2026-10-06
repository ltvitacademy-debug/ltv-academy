# Lesson 25 — Image Generation Models, Overview

**Chapter 5 · Multimodal & Beyond-Text Models · Lesson 25 of 31**

## What you'll learn

- The difference between a model that *understands* images and one that *creates* them —
  they are not the same model, and often not even the same provider
- Today's major image-generation models, verified directly against each provider's current
  docs/announcements rather than recalled from memory
- The two dominant underlying approaches — diffusion vs. autoregressive — at a conceptual
  level, no math required
- Why Claude specifically does **not** generate images, and what that means for how you'd
  architect an application that needs both chat and pictures

## Understanding images vs. generating them

Chapter 1–4 covered chat completions: text in, text out. Image *generation* is a different
capability entirely — a prompt (text, sometimes plus a reference image) goes in, and a new
image comes out. Don't assume every multimodal provider does both directions. The clearest
example: **Anthropic's Claude models can look at an image and describe it, but cannot
produce one.** Per Anthropic's own documentation, Claude is "an image understanding model
only... it cannot generate, produce, edit, manipulate, or create images." Lesson 26 covers
the understanding side in depth; this lesson is about the generation side specifically.

## The current field, verified directly against each provider

As with Lesson 8's model-provider landscape, this list is a snapshot verified against
primary sources as of October 2026 — expect it to move.

- **OpenAI** — **GPT Image 2.5**, available as two variants: **Sunburst** (tuned for
  precise, iterative editing) and **Flare** (tuned for fast, high-quality one-shot
  generation). Reachable through either the dedicated Image API or as an image-generation
  tool inside the Responses API. GPT Image 2.5 replaced the DALL-E line, which OpenAI has
  retired.
- **Google** — image generation now lives inside the **Gemini** family itself rather than
  a separate product: **Nano Banana** and **Nano Banana Pro** are Gemini's native
  image-generation capability, reached through the same Gemini API used for text. The
  standalone Imagen generation endpoints have been wound down in favor of this.
- **xAI** — **Grok Imagine**, built on xAI's own **Aurora** engine — notable because Aurora
  is an autoregressive (next-pixel-patch-prediction-style) architecture, not a diffusion
  model, which is the less common approach in this field.
- **Specialist, image-only players** — **Midjourney** and **Black Forest Labs' FLUX**
  models are worth knowing by name: neither is a general chat provider, both are built and
  marketed purely around image quality, and both show up constantly in the wild alongside
  the chat-provider models above.

## Two approaches, conceptually

Most image generators you'll encounter, including GPT Image 2.5 and Nano Banana, are
**diffusion models**: generation starts from random noise and repeatedly refines it, step
by step, into a coherent image guided by the prompt — like a sculptor removing material
until a shape emerges. xAI's Aurora-based models take a different path: an
**autoregressive** approach that predicts the image piece by piece, left-to-right/top-to-
bottom in patches, much closer in spirit to how a text model predicts the next token
(Lesson 4). Both approaches are producing competitive results in 2026; which one is
"better" depends on the use case, not on the architecture alone.

## Reaching an image model via API, at a glance

```
POST /v1/images/generations  (OpenAI-style)
{
  "model": "gpt-image-2.5-flare",
  "prompt": "a lighthouse at dawn, watercolor style",
  "size": "1024x1024"
}
→ response contains generated image data (URL or base64), not text
```

The request/response *shape* is deliberately similar to the chat completions you already
know from Chapter 3 — a JSON body in, JSON back — but the payload itself is image data
instead of a text message. That similarity is intentional: once you've learned one
provider's request pattern, a new modality is a smaller leap than it looks.

## Key terms

| Term | Meaning |
|---|---|
| Image generation | Producing a new image from a text (and sometimes image) prompt |
| Diffusion model | Generates an image by iteratively denoising random noise into a coherent result |
| Autoregressive image model | Predicts an image piece by piece, similar in spirit to next-token text prediction |
| Image understanding (vision) | Reading and reasoning about an existing image — not the same capability (Lesson 26) |

## Lab

1. Name one provider that offers image *generation* and explain, in one sentence, why
   Claude is not on that list.
2. Compare GPT Image 2.5's two variants (Sunburst and Flare) and state which one you'd pick
   for an iterative photo-editing tool vs. a one-shot "generate a hero image" feature.
3. In your own words, contrast a diffusion approach with an autoregressive approach to
   image generation.

## Check yourself

You're ready for Lesson 26 when you can name at least three current image-generation
models from different providers, and explain why "this model does vision" and "this model
does image generation" are two different claims that don't imply each other.
