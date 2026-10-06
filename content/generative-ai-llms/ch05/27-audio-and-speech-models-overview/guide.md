# Lesson 27 — Audio & Speech Models, Overview

**Chapter 5 · Multimodal & Beyond-Text Models · Lesson 27 of 31**

## What you'll learn

- The three distinct audio capabilities that get lumped together as "voice AI" — speech-to-
  text, text-to-speech, and native speech-to-speech — and why the distinction matters when
  you're picking a provider
- Today's major audio/speech models, verified against each provider's current docs/
  announcements
- Why Anthropic is a notable **absence** from this lesson's provider list, and what that
  means in practice
- Where a specialist provider (ElevenLabs) fits next to the big chat providers

## Three capabilities, one umbrella term

"Voice AI" blurs together three genuinely different jobs:

- **Speech-to-text (STT)** — audio in, a text transcript out. This is what powers live
  captioning or turning a voice memo into a document.
- **Text-to-speech (TTS)** — text in, synthesized audio out. This is what gives a chatbot an
  actual voice to speak replies with.
- **Native speech-to-speech** — audio in, audio out, **without** a text transcript as a
  required intermediate step. This is what real-time voice agents use, and it's the newest
  and most technically demanding of the three, because it has to preserve tone, pacing, and
  interruption-handling that a text round-trip would normally flatten.

A product can offer all three, just one, or combine specialist models from different
providers for each job — know which capability you actually need before picking a model.

## The current field, verified directly against each provider

- **OpenAI** — three distinct realtime audio models, each doing one of the jobs above:
  **GPT-Realtime-Whisper** (streaming speech-to-text), **GPT-Realtime-2** (a full voice
  conversational agent), and **GPT-Realtime-Translate** (live speech-to-speech translation
  across dozens of languages). Separately, OpenAI's non-realtime TTS endpoint is built on a
  GPT-4o-mini-based text-to-speech model with a set of built-in voices.
- **Google** — the **Gemini Live API** provides native audio: a single low-latency model
  that processes raw audio directly rather than routing through a text transcript, with
  dozens of HD voices across two dozen-plus languages, and reported emotional-tone
  awareness. Separately, Gemini also ships dedicated **Flash TTS** models for standalone
  text-to-speech, including prompt-driven custom voice creation.
- **ElevenLabs** — a **specialist provider**, not a general chat company, focused entirely
  on voice: multiple current TTS model tiers trading off quality against latency, voice
  cloning, and dozens of supported languages. Notably, ElevenLabs' technology powers the
  text-to-speech layer inside other companies' voice products — including, per public
  reporting, Anthropic's own Claude voice mode.
- **Anthropic** — conspicuously **not** on this list as an audio-model provider. Claude's
  own product-level "voice mode" exists, but it's a product feature built by combining
  speech recognition with a third-party TTS layer (ElevenLabs) around Claude's text model —
  Anthropic does not expose a general-purpose audio content type in the Messages API the
  way it exposes `image` blocks (Lesson 26). If your application needs audio input or
  output via direct API, OpenAI or Google are the providers built for that today; Claude is
  not.

## Why this matters architecturally

Compare this to vision: Claude, GPT, and Gemini **all** accept an `image` content block
inside the same Messages/chat-completions shape you already know. Audio doesn't have that
same three-way parity yet. If you're building a voice assistant on top of Claude for its
reasoning quality, the realistic architecture is: STT model transcribes speech to text →
Claude reasons over the text → a separate TTS model (OpenAI's, Google's, or ElevenLabs')
speaks the reply back. That's three API calls to two or three different providers chained
together — not one unified multimodal request the way an image-understanding call is.

## Key terms

| Term | Meaning |
|---|---|
| Speech-to-text (STT) | Audio in, text transcript out |
| Text-to-speech (TTS) | Text in, synthesized audio out |
| Native speech-to-speech | Audio in, audio out, without a required text intermediate step |
| Voice agent | A product built around native (or chained) speech-to-speech interaction |

## Lab

1. Classify each of the following as STT, TTS, or native speech-to-speech: live meeting
   captions; a chatbot that reads its replies aloud; a real-time phone-support voice agent.
2. Explain why Claude is absent from this lesson's audio-model list, and what that implies
   for an application that wants both Claude's reasoning and a spoken voice.
3. Name the three distinct realtime audio models OpenAI currently offers and what each one
   does.

## Check yourself

You're ready for Lesson 28 when you can explain the difference between speech-to-text,
text-to-speech, and native speech-to-speech in one sentence each, and explain why a
Claude-based voice assistant needs at least one additional, non-Anthropic model in its
architecture.
