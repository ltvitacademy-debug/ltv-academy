# Lesson 24 — Handling Responses & Errors · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

A network call can fail in more ways than it can succeed — the server
might be down, the connection might drop, or the request might be slow
enough to hit your timeout. This lesson covers reading status codes and
catching the specific failures requests raises.

## S2 · STEPS: Status code ranges

Three ranges to know. 2xx means success. 4xx means your request was the
problem — bad input, missing auth, not found. 5xx means the problem is on
the server's side, often worth retrying. 429, specifically, means
rate-limited — Lesson 26 covers that one.

## S3 · CODE: raise_for_status — fail fast

Checking status codes by hand gets repetitive fast. raise_for_status does
it for you: on a 4xx or 5xx it raises an HTTPError immediately; on a 2xx
it does nothing, and your code continues straight to reading the
response.

## S4 · CODE: The exceptions requests can raise

Timeout, ConnectionError, HTTPError — each one a specific, catchable
failure mode. Catch the ones you can respond to differently, and fall
back to the broader RequestException for anything else.

## S5 · STEPS: Order matters

This is Lesson 14's inheritance rule again. RequestException is the base
class every other requests exception inherits from, so it has to come
last in your except chain — catch specific exceptions first, broad ones
after, or the broad one swallows everything before the specific ones ever
run.

## S6 · OUTRO CARD

Status ranges, raise_for_status, and a properly ordered except chain —
that's robust error handling for a real API call. Next lesson:
authentication — sending API keys correctly, and what a bad key actually
looks like when it fails.
