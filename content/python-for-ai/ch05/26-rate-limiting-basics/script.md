# Lesson 26 — Rate Limiting, Basics · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

This chapter's closing lesson covers what happens when you call an API
too often. Every AI provider caps how many requests you can make in a
given window, and calling too fast gets you a specific, recognizable
error — not a silent failure.

## S2 · CODE: HTTP 429

Exceed the allowed rate, and you get back a completely normal HTTP
response, just with status code 429 — too many requests. Rate limits
exist to keep a shared service usable for everyone; a well-behaved client
backs off instead of hammering the API harder.

## S3 · CODE: Reading Retry-After

Many APIs tell you exactly how long to wait in a Retry-After header, in
seconds. Read it, fall back to a safe default if it's missing, and sleep
for that long before trying again.

## S4 · CODE: Exponential backoff

When Retry-After isn't available, double your wait time after each
failed attempt instead of retrying at a fixed interval — one second, two,
four, eight. Early retries happen fast in case the limit clears quickly;
later ones space out if the service is genuinely under sustained load.

## S5 · STEPS: A real production call

A real client combines everything from this chapter. Parameters and a
JSON body from Lesson 23. An authorization header from Lesson 25. A
timeout and raise_for_status from Lesson 24. And a backoff loop
specifically for 429s, from this lesson.

## S6 · OUTRO CARD

429, Retry-After, exponential backoff — that closes out Chapter 5 on
working with APIs in Python. Chapter 6 moves to async Python: calling
multiple AI APIs concurrently instead of one at a time.
