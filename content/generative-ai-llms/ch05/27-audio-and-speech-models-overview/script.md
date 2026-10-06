# Lesson 27 — Audio & Speech Models, Overview · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows the
audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD

We've covered image generation and vision. This lesson covers the third beyond-text
modality: audio. "Voice AI" sounds like one thing, but it's actually three genuinely
different jobs, and the model you need depends entirely on which one you're solving for.

## S2 · STEPS CARD: three capabilities

Speech-to-text turns audio into a transcript — that's live captioning, or a voice memo
becoming a document. Text-to-speech turns text into synthesized audio — that's a chatbot
that can actually speak its reply. And native speech-to-speech goes audio in, audio out,
with no required text transcript in between — that's what real-time voice agents run on,
and it's the hardest of the three, because it has to preserve tone and handle interruptions
a text round-trip would normally flatten.

## S3 · STEPS CARD: who builds what

Verified against current docs: OpenAI has three separate realtime models, one per job —
Realtime-Whisper for streaming transcription, Realtime-2 as a full voice agent, and
Realtime-Translate for live speech-to-speech translation. Google's Gemini Live API does
native audio directly, plus separate Flash TTS models. And ElevenLabs is a pure voice
specialist — not a chat company at all — with multiple TTS tiers trading quality for
latency.

## S4 · CODE CARD: the notable absence

Here's the one to actually remember: Anthropic is not on this list. Claude's voice mode is
a real product feature, but under the hood it's speech recognition plus a third-party
text-to-speech layer — publicly, ElevenLabs — wrapped around Claude's text model. There's
no general audio content block in the Messages API the way there's an image block. If you
need direct audio input or output through an API, that's OpenAI or Google today, not
Claude.

## S5 · STEPS CARD: what that means for architecture

Compare this to vision, where Claude, GPT, and Gemini all accept the same image block in
one unified call. Audio doesn't have that parity yet. So a Claude-based voice assistant
realistically chains three calls: a speech-to-text model transcribes the audio, Claude
reasons over the resulting text, and a separate text-to-speech model — OpenAI's, Google's,
or ElevenLabs' — speaks the reply back. Three calls, not one.

## S6 · OUTRO CARD

Three capabilities, four real providers, and one deliberate gap at Anthropic worth
remembering. That closes the landscape tour. Next lesson ties images, vision, and audio
together into one decision: when do you actually reach for a multimodal model, and when
does text alone still win?
