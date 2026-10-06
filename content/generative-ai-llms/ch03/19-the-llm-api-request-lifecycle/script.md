# Lesson 19 — The LLM API Request Lifecycle, End to End · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

We've spent this whole chapter on individual pieces — roles, sampling, streaming, tools,
structured output. This lesson is where they all click together: the complete journey a
single request takes, from your code to the model and back, start to finish.

## S2 · STEPS CARD: the journey

Five stages, every single call. Your application builds the JSON request body. It
authenticates with real headers. Your text gets tokenized into the IDs the model actually
operates on. The model generates, one token at a time. And the response comes back —
either all at once or streamed — with usage attached, which is exactly what you're billed
for, and a request-id you'd quote if you ever needed support.

## S3 · CODE CARD: headers

Here are the real required headers on an actual request: your API key, an
anthropic-version header pinning which API version you're targeting, and a content-type
of application/json. And here's something worth knowing: validation happens before any
model work starts. A malformed body or a bad key fails fast, before it ever reaches
inference.

## S4 · STEPS CARD: stop_reason

The response always tells you why generation stopped, and you should never assume it just
"finished." End_turn means it wrapped up naturally. Max_tokens means it got cut off — the
reply is incomplete, not done. Stop_sequence means it hit a custom string you supplied.
Tool_use means it's pausing for you to run something, from Lesson 17. And refusal means it
declined to produce schema-conforming output, from Lesson 18.

## S5 · CODE CARD: error table

And here's a current, verified table of what actually goes wrong in production. 400 for a
malformed request. 401 when your API key itself is the problem. 403 for permissions. 429
when you've hit a rate limit. And two that are genuinely worth retrying automatically with
backoff: 500, an error inside Anthropic's own systems, and 529, meaning the API is
temporarily overloaded.

## S6 · OUTRO CARD

Build, authenticate, tokenize, generate, return, bill — and now you can read exactly why
any response stopped where it did. That's Chapter 3 complete, working with LLM APIs
directly. Chapter 4 turns to something different: when prompting an API like this one
genuinely isn't enough, and what fine-tuning actually costs you to go further. See you
there.
