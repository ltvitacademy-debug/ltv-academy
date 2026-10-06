# Lesson 30 — Capstone: Building a Simple Chat Application · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows the
audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Time to actually build it. Nothing in this lesson is a new API concept — we're assembling
three things you already know from Chapter 3: a messages list, a system prompt, and
streaming. The only new part is the loop that ties them together across turns.

## S2 · CODE CARD: the loop skeleton

Here's piece one, the skeleton. messages starts as an empty list and only ever grows — it
IS the conversation. The loop reads user input, checks for a quit command, and appends the
user's turn to messages. Everything that happens next, the actual model call, slots in
right where the comment says.

## S3 · CODE CARD: the real streaming call

And here's piece two — the real pattern, verified against Anthropic's current SDK docs.
client.messages.stream is a context manager; looping over stream.text_stream hands you
each fragment of text as it arrives, no raw server-sent events to parse yourself. Two
things to notice: system is its own separate parameter, not a message in the list. And
once the stream finishes, you have to manually append the completed reply back onto
messages — the SDK doesn't do that step for you.

## S4 · CODE CARD: the complete application

Put both pieces together and that's the whole application — under twenty-five lines. A
messages list that grows. A loop that reads input and streams a reply. A system prompt set
once, outside the loop. Every single line traces back to a lesson you've already finished.

## S5 · STEPS CARD: where to go from here

Once this runs, every extension reuses a chapter you already have. Wrap the call in a
try-except for a dropped connection. Add a tools parameter for function calling. Ask for
structured JSON instead of free text. Or accept an image content block so the chat can
take a picture as part of the turn. None of it changes the loop's shape — it just extends
the parameters you've already built.

## S6 · OUTRO CARD

A working, streaming, multi-turn chat application, built from pieces you learned across
this entire course. Final lesson wraps the capstone up — what you built, how to extend it
further, and how to talk about it when you show it off.
