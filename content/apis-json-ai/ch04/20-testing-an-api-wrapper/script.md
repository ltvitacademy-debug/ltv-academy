# Lesson 20 — Testing an API Wrapper · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

You've built a real client: config, methods, retries, rate limit
awareness. Last lesson in this chapter: proving, with real tests, that it
actually behaves the way you think it does.

## S2 · CODE CARD (mocking session.post)

Real API calls cost money, take real network time, and worst of all,
aren't deterministic — you can't make the live API hand you a 429 on
command. So you mock session dot post instead: a stand-in that returns
exactly the fake response you ask for. No key, no network, runs in
milliseconds.

## S3 · CODE CARD (testing the retry loop)

And here's the real payoff. Side_effect makes the mock return a 429 first,
then a success — proving lesson eighteen's retry loop genuinely retries
and genuinely recovers. Patch time dot sleep too, so the test doesn't
actually sit there waiting real seconds.

## S4 · STEPS CARD (healthy test suite shape)

So a healthy suite for a client like this is mostly fast mocked unit
tests covering your actual logic — retries, error types, header parsing —
plus a small, deliberate handful of real integration tests that cost money
and don't run on every single commit.

## S5 · OUTRO CARD

Config, methods, retries, rate limiting, and now tests that prove it all
works — that's a genuinely production-shaped API wrapper. Chapter five
puts everything from this entire course together in one capstone project.
