# Lesson 25 — Authentication Headers & API Keys · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every AI API requires you to prove who you are before it answers. This
lesson covers the standard way that happens — a bearer token in an HTTP
header — and just as importantly, how to keep that key out of your source
code entirely.

## S2 · CODE: The Bearer token pattern

Most AI APIs authenticate through a header, not the URL, not the body.
Authorization colon Bearer, then the key itself. The server checks this
header on every single request — there's no separate login step the way a
website has.

## S3 · CODE: Never hardcode it

A hardcoded key in your source code is one of the most common real-world
ways keys leak — especially once it's committed to git, where it stays in
the history forever, even after you delete the line. Rotating the key is
the only real fix at that point.

## S4 · CODE: Environment variables and dotenv

Store the key outside your code in an environment variable instead, and
read it with os dot environ. For local development, python-dotenv loads a
dot-env file's values into the environment for you — and that dot-env
file goes straight into gitignore, never committed.

## S5 · CODE: What a bad key looks like

A missing or invalid key doesn't crash your program — it comes back as a
completely normal HTTP response, just with a 401 status. Check for it
explicitly, same as any other status code from Lesson 24.

## S6 · OUTRO CARD

Bearer header, environment variables, dotenv for local dev, gitignore for
the real secrets — that's how credentials are handled safely in real
code. Next lesson: rate limiting — what happens when you call an API too
often, even with a perfectly valid key.
