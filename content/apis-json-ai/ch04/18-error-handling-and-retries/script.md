# Lesson 18 — Error Handling & Retries · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lesson fourteen taught you which errors are worth retrying. Now we put
that knowledge where it actually belongs: inside the client class itself,
so every caller gets it for free.

## S2 · CODE CARD (custom exception classes)

First, real names for the errors callers actually care about. A
RateLimitError, an APIError with the real status code attached — instead
of forcing every caller to inspect raw HTTP status codes themselves.

## S3 · CODE CARD (send_message with retry loop)

Then the retry loop goes straight into send_message. Four-twenty-nine or
anything five-hundred-and-up gets retried with backoff, exactly like
lesson fourteen described. Anything else — a bad request, a bad key —
fails immediately, because retrying those would never help.

## S4 · CODE CARD (caller usage)

And here's the payoff. A caller just calls send_message and catches
RateLimitError by name if they want to handle it — no raw status codes,
no retry logic duplicated in twenty different files.

## S5 · OUTRO CARD

Resilience built into the client once, instead of copy-pasted everywhere.
Next lesson, we add the other half of production-grade reliability: rate
limiting, so your own code doesn't trigger those four-twenty-nines in the
first place.
