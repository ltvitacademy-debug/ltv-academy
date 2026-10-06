# Lesson 9 — Parsing & Validating JSON · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

What arrives over the wire is JSON text — just a string of characters.
Your code can't reach into raw text for a field. It has to parse that
text into a real object first, and that's where this lesson starts.

## S2 · CODE CARD (parsing example)

Here's parsing in Python. json dot loads takes raw JSON text and returns
a real dictionary — now data bracket name actually works, because it's
no longer text, it's a usable object. The reverse, turning your own data
into JSON text to send, is json dot dumps.

## S3 · CODE CARD (parsing fails loudly)

Malformed JSON — a stray trailing comma, an unclosed brace — doesn't
fail quietly. It raises an exception the moment you try to parse it.
That's a feature: silently continuing with broken data is far worse than
failing immediately, where you can see exactly what went wrong.

## S4 · STEPS CARD (check status before parsing)

One more thing before you parse. Check the response's status code
first. A 500 or a 404's body often isn't even JSON — it might be an HTML
error page. Parse before checking status, and you get a confusing error
that hides the real problem.

## S5 · CODE CARD (validating shape)

Parsing succeeding only proves the text was valid JSON — it says
nothing about whether the right fields are there. So you check: is name
present, is role present, is role actually one of the allowed values.
That's lesson eight's schema, enforced by hand.

## S6 · OUTRO CARD

Parse, catch failures loudly, check status before parsing, validate
shape after. Next lesson: the specific mistakes that trip up even
experienced developers working with JSON.
