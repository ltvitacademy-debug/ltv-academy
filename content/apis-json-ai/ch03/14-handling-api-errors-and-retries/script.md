# Lesson 14 — Handling API Errors & Retries · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every integration eventually gets an error back. The question isn't
whether that happens — it's whether your code knows the difference between
an error worth retrying and one that will fail the exact same way forever.

## S2 · CODE CARD (real error response shape)

Here's the real shape. A top-level type of "error," a nested error object
with its own type and message, and a request ID — that's what you'd hand
to support if something needed investigating.

## S3 · STEPS CARD (status code reference)

The real status codes break into two groups. Four hundred and four-oh-one
mean something's wrong with your request itself — bad body, bad key. Four
twenty-nine means you hit a rate limit. Five hundred and five-two-nine mean
something went wrong on Anthropic's end, not yours.

## S4 · CODE CARD (exponential backoff retry loop)

And that split is exactly how you decide what to retry. Retrying a four-oh-
one will never work — same bad key, same failure, forever. But a rate
limit or a server error is transient, so the official SDKs retry those
automatically, waiting a little longer each time: one second, two seconds,
four seconds. That's exponential backoff.

## S5 · OUTRO CARD

Know which errors to retry, back off instead of hammering the server, and
read the request ID when you need help — that's production-grade error
handling. Next lesson: pagination, for when an API has more results than
it can send you at once.
