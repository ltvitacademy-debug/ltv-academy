# Lesson 21 — Capstone: A Reusable AI API Client · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Twenty lessons of real request shapes, streaming, tool calls, retries,
rate limits, and tests. This capstone isn't a new topic — it's all of them,
assembled into one real piece of software for your portfolio.

## S2 · STEPS CARD (requirements checklist)

Five real requirements. Correct request and response handling from lesson
eleven. Resilient error handling from lessons fourteen and eighteen.
Rate-limit awareness from lesson nineteen. A real mocked test proving your
retry path works, from lesson twenty. And clean class design from lesson
seventeen, holding it all together.

## S3 · CODE CARD (assembled class skeleton)

Here's the shape. init holds shared config, exactly like lesson
seventeen. send_message wraps the real Messages API with retries and
rate-limit headers. list_models wraps a real paginated endpoint. Every
method here is a lesson you've already built — you're just proving you can
combine them.

## S4 · STEPS CARD (what done looks like)

So what does done actually look like? It runs against a real key. Its test
suite handles a simulated rate limit gracefully, without ever touching the
real API. And another developer could pick it up and use it, just from the
method names, without reading your source line by line.

## S5 · OUTRO CARD

Streaming and tool calling are strong additions if you want to push
further, but they're not required to call this done. Final lesson: wrapping
up, and where this whole AI Engineer path goes from here.
