# Lesson 17 — Designing a Client Class · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Chapter three gave you the real shapes. Now chapter four turns that
knowledge into something you actually build: a real client class, wrapping
an AI provider API the way production code really does it.

## S2 · CODE CARD (AIClient __init__)

Everything shared across every call — the API key, the base URL, a
reusable session — gets set up exactly once, in init. A requests dot
Session reuses the connection and those headers across every call, instead
of rebuilding them from scratch each time.

## S3 · CODE CARD (send_message method)

And once that setup's done, each method is a thin wrapper around one real
endpoint — here, the Messages API from lesson eleven. Callers just write
client dot send message, model, messages — no more remembering the URL,
the headers, or the JSON shape by hand.

## S4 · STEPS CARD (what belongs where)

So the rule of thumb: shared stuff — auth, base URL, retries, rate
limiting — lives on the class. One-off stuff, like what prompt you're
actually sending, stays in your calling code, not buried inside the
client.

## S5 · OUTRO CARD

That's the skeleton. Next lesson, we make it actually resilient: real
error handling and retries, built right into the class itself.
