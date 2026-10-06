# Lesson 1 — What Is an API? · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

An API is a defined way for one piece of software to ask another for data
or for an action — without either side needing to know how the other one
works inside. You don't need to know how a weather service stores its
forecasts to ask it for today's temperature. You just need to know the
shape of the question it accepts, and the shape of the answer it gives
back.

## S2 · STEPS CARD (request, process, response)

Every API call has the same three moving parts. The client sends a
request — "give me the weather for Boston." The server processes it —
looks it up, computes it, fetches it. Then the server sends back a
response — "68 degrees, partly cloudy." Checking a bank balance, posting
a tweet, asking an AI model to write a paragraph — same three steps,
every time.

## S3 · CODE CARD (example request/response)

Here's that pattern as an actual example. A client asks a weather API for
Boston's forecast. The server does its work. The response comes back with
the answer. Nothing more mysterious than that is happening under the hood
of any API you'll ever call.

## S4 · STEPS CARD (why this matters for AI apps)

Here's why this lesson is lesson one of this entire course. Every AI
application you build talks to a provider's API — Anthropic's, OpenAI's,
whoever's — using this exact pattern. When your app "calls Claude" or
"calls GPT," it's sending a request to a server you don't control and
reading back a response. Reading and shaping requests and responses isn't
a warm-up before the real work — it is the real work of an AI
application.

## S5 · OUTRO CARD

Client, request, server, response — that's the whole shape. Next lesson,
we zoom into the specific style of API that dominates the web and nearly
every AI provider: REST.
