# Lesson 10 — Constrained & Structured Output Prompting · Voiceover script

Segments map 1:1 to slides. Target: ~300 words / 2.5-3 minutes.

---

## S1 · TITLE CARD

A great paragraph is a dead end the moment something downstream needs to
read a specific field out of it — code, a database, another prompt in a
chain. This lesson is about getting the model to return exactly the shape
you need.

## S2 · CODE CARD (loose prompt)

Ask loosely for a name, email, and order number, and you get a correct
but inconsistent sentence back — different phrasing every run. Something
trying to parse that with code has to guess at a format that keeps
changing.

## S3 · CODE CARD (constrained prompt)

Now show the model the exact JSON shape you want, and say return only
that, no other text. The output comes back the same structure every
single time — because you gave it a concrete shape to copy, not just a
description of the fields.

## S4 · STEPS CARD (what a strong prompt includes)

A strong structured-output prompt has three parts. The exact schema,
ideally shown rather than just described. An instruction to return only
that format, closing off any preamble. And field names and types spelled
out explicitly, matching what your code actually expects.

## S5 · CODE CARD (beyond JSON)

This isn't only about JSON. The same discipline applies to exactly 3
bullet points under 10 words each, a single word answer of yes, no, or
unclear, a markdown table with exactly four columns. Any time downstream
logic depends on shape, specify the shape.

## S6 · OUTRO CARD

Show the shape, say return only that, name every field. Next lesson
closes out the chapter: chaining several of these structured prompts
together into a multi-step pipeline.
