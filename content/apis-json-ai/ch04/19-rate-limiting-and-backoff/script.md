# Lesson 19 — Rate Limiting & Backoff · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson reacted to a 429 after it happened. But Anthropic's real API
tells you your standing on every single response, before you ever get
limited — if you know which headers to read.

## S2 · CODE CARD (real rate limit headers)

These are the real header names. Remaining tells you your headroom; reset
tells you exactly when it refills; retry-after shows up on a 429 itself
and tells you precisely how many seconds to wait — no more guessing one,
two, four seconds.

## S3 · CODE CARD (retry-after + proactive throttle)

So two real upgrades. First: when retry-after is there, use the real
number instead of your own backoff guess. Second — and this is the
proactive part — watch requests-remaining on every successful call, and
ease off before it hits zero, instead of waiting to get rate-limited at
all.

## S4 · STEPS CARD (token bucket concept)

And here's why that headroom number behaves the way it does: Anthropic's
API uses a token bucket under the hood. Capacity drains per request and
refills continuously, rather than resetting all at once on a timer — which
is exactly why watching remaining, not just reacting to 429, actually
works.

## S5 · OUTRO CARD

Retry what's worth retrying, and throttle yourself before you're forced
to. That's a genuinely production-grade client. Last lesson in this
chapter: actually testing it.
