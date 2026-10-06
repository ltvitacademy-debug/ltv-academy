# Lesson 16 — Why OOP Matters for AI SDKs · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

You now know classes, inheritance, and dataclasses. This lesson answers a
question you'll hit the moment you open any AI provider's Python SDK: why
is everything an object? It's not an accident — it's the same three
patterns you just learned, applied consistently.

## S2 · STEPS: Three patterns, one shape

Every AI SDK follows the same three-part shape. A client object holds your
credentials and config once. A response object gives you typed, structured
access to what came back. And an error hierarchy lets you catch problems
broadly or specifically. Let's connect each one to what you already know.

## S3 · CODE: The client object

This is Lesson 13's init and self, doing real work. Construct an AIClient
once with your API key and model, and every call after that reuses it —
no repeating credentials on every single function call. Call chat as many
times as you want off the same client.

## S4 · CODE: Response objects beat raw dictionaries

A raw API response is just JSON — a dictionary. SDKs wrap it in a
dataclass instead, so response dot text autocompletes in your editor and a
typo gets caught immediately, instead of a raw dictionary silently
returning None for a misspelled key.

## S5 · CODE: Exception hierarchies

This is Lesson 14's inheritance, applied to errors. RateLimitError and
AuthenticationError both inherit from AIError. Catch AIError broadly to
log any AI-related failure, or catch RateLimitError specifically when you
want to retry just that one case.

## S6 · OUTRO CARD

Client objects, response objects, error hierarchies — three AI SDK
patterns, and all three are just classes, dataclasses, and inheritance
doing exactly what you learned in the last three lessons. Next up, you
build one yourself: a small class-based client wrapper.
