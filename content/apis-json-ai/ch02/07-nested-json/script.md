# Lesson 7 — Nested JSON · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lesson six showed flat JSON — one object, no nesting. Real API responses
almost never look that simple. They nest objects inside objects, and
arrays of objects, several levels deep.

## S2 · CODE CARD (nested example)

Here's a realistic shape. User is an object containing another object,
address. Orders is an array where each item is itself an object.
Nesting combines objects-in-objects and objects-in-arrays freely, as
deep as the data needs to go.

## S3 · CODE CARD (paths)

To reach a value, you chain keys and indexes together, outside-in. User
dot address dot city gets you London. Orders bracket zero dot id gets
you 1001. Each dot steps into an object by key; each bracket steps into
an array by position.

## S4 · STEPS CARD (why this matters for AI APIs)

Here's why this lesson exists. Chapter three shows the real shape of an
AI provider's response, and it nests several levels: a content array,
where each item is an object, where one field is the actual reply text.
Content bracket zero dot text — that's exactly this pattern, with real
field names attached.

## S5 · OUTRO CARD

Chain keys and indexes, outside-in, one level at a time. Next lesson, we
formalize what a "correct" shape even means, with JSON Schema.
