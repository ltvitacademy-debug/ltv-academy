# Lesson 28 — One-to-Many, One-to-One & Many-to-Many · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Every relationship you create has a setting called cardinality. Here's
what it actually describes, and when to touch it.

## S2 · IMAGE: star-schema-example-2.svg (star schema with 1/* labels)

Cardinality answers one question: can a value repeat on each side? Look
at a star schema, and you'll see the same pattern on every spoke — a 1 on
the dimension side, where each value appears once, and an asterisk on the
fact side, where it can repeat many times.

## S3 · IMAGE: candmrel_advancedoptions2.png (cardinality dropdown, many-to-one)

Power BI gives you four cardinality options, but many-to-one is the one
you'll use constantly — it's exactly the shape a fact table pointing at a
dimension table takes. Power BI usually sets this correctly on its own.

## S4 · IMAGE: candmrel_create_compproj_appproj2.png (auto-set one-to-one example)

Sometimes two tables happen to line up so a value never repeats on either
side — Power BI notices, and defaults to one-to-one instead. Be careful
here: if you know a future refresh will add duplicates, override it to
many-to-one yourself before that happens.

## S5 · OUTRO CARD (SVG: next lesson, LTV seal)

Cardinality sets how values match up. Next: filter direction — how far a
filter is allowed to travel once that match exists.
