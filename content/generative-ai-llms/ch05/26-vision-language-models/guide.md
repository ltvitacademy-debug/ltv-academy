# Lesson 26 — Vision-Language Models

**Chapter 5 · Multimodal & Beyond-Text Models · Lesson 26 of 31**

## What you'll learn

- What a vision-language model actually is: one model, trained to reason over images and
  text together — not a text model bolted to a separate image classifier
- The real content-block shape for sending Claude an image, verified against current docs
- The real request/response limits that matter in production: images per request, size
  caps, and how resolution drives token cost
- How the same idea looks across Claude, GPT, and Gemini
- Where vision models reliably fail — so you don't ship something that silently hallucinates

## One model, two input types

A vision-language model (VLM) isn't a text model with an image-recognition plugin bolted
on. It's a single model trained so that images and text share the same underlying
representation space — the model reasons about a chart, a screenshot, or a photo using the
same mechanism it uses to reason about a paragraph. That's why Claude, GPT, and Gemini can
all answer "what's the trend in this chart?" or "what does this error message mean?" about
an image, not just describe what's in it.

## A real request: Claude's image content block

Just like Lesson 17 put a `tool_use` block inside `content`, vision puts an `image` block
there — verified directly against Anthropic's current docs:

```json
{
  "model": "claude-opus-4-5",
  "max_tokens": 1024,
  "messages": [{
    "role": "user",
    "content": [
      { "type": "image",
        "source": { "type": "base64", "media_type": "image/png", "data": "..." } },
      { "type": "text", "text": "Describe this image." }
    ]
  }]
}
```

The `source` object supports three input modes: `base64` (the image bytes embedded
directly), `url` (a link to a hosted image), or `file_id` (upload once via the Files API,
reference many times — cheaper for images reused across a multi-turn conversation). Claude
recommends putting the image block **before** the text block when possible, the same
"long context first" pattern from Lesson 5.

## Real limits that affect how you build

- **Images per request**: up to 100–600 depending on the model's context window, but only
  20 on claude.ai itself.
- **Supported formats**: JPEG, PNG, GIF, and WebP — animated images are read as their first
  frame only.
- **Resolution drives cost, not just quality**: Claude breaks an image into 28×28-pixel
  patches, and each patch costs one "visual token." A 1920×1080 screenshot costs roughly
  1,500–2,700 visual tokens depending on the model's resolution tier — real money at scale,
  the same way Lesson 2's token-cost thinking applies to text.
- **Claude cannot generate images** (Lesson 25) and, per its own documentation, **cannot
  reliably identify specific people** or **detect whether an image is AI-generated** — know
  the boundaries before you build a feature that assumes otherwise.

## The same idea across providers

All three major chat providers support images inside the same `messages`/content-array
shape you already know from Chapter 3 — OpenAI accepts an `image_url` content type inside
its `messages` array, and Gemini is natively multimodal by design (text, image, audio, and
video share one input format from the start, rather than images being added as a bolt-on
content type). The exact field names differ by provider; the underlying pattern — images
live as blocks inside the same message structure as text — does not.

## Where vision models fail

Per Anthropic's own documented limitations (and generally true across providers): accuracy
drops on low-quality, rotated, or very small (under ~200px) images; object **counting** is
approximate, not exact, especially with many small objects; spatial/coordinate output is
approximate, not pixel-perfect; and no current vision model should be trusted to detect
whether an image itself was AI-generated. Treat a VLM's image output the same way Lesson 7
taught you to treat any LLM output — verify before you rely on it, especially for anything
high-stakes.

## Key terms

| Term | Meaning |
|---|---|
| Vision-language model (VLM) | A single model trained to reason jointly over images and text |
| `image` content block | The block type that carries image data inside a Messages API request |
| Visual token | Claude's resolution-based unit of image cost — one per 28×28-pixel patch |
| Files API | Upload an image once, reference it by `file_id` across multiple turns |

## Lab

1. Write the minimal `content` array for a Claude request that sends one image (base64)
   and asks "what's unusual about this picture?"
2. Explain why uploading a frequently reused image via the Files API is cheaper than
   re-sending it as base64 on every turn of a long conversation.
3. List two tasks you should *not* trust a current vision-language model to do reliably,
   per its own documented limitations.

## Check yourself

You're ready for Lesson 27 when you can describe, from memory, the three ways an image can
be supplied to Claude's API, and name two documented limitations of vision-language models
in general.
