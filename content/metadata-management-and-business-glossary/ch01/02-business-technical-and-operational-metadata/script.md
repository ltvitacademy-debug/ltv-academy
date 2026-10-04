# Lesson 2 — Business, Technical and Operational Metadata · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 1 defined metadata broadly. In practice, it splits into three
categories, because each one answers a different question, gets produced
a different way, and matters to a different audience.

## S2 · STEPS CARD (three questions)

Business metadata answers "what does this mean to the business" —
definitions, rules, ownership. Technical metadata answers "what is this,
structurally" — data type, length, constraints. Operational metadata
answers "what actually happened to it" — when it was loaded, how many
rows, how long it took.

## S3 · CODE CARD (one column, three descriptions)

Take one column: CustomerLifetimeValueUSD. Business metadata says it's
expected lifetime revenue in US dollars, owned by Finance, used in the
board deck. Technical metadata says it's a DECIMAL eighteen-two,
nullable, indexed with CustomerId. Operational metadata says it was
refreshed this morning, forty-eight thousand rows, in four minutes. None
of the three is complete alone.

## S4 · STEPS CARD (who produces each)

Here's the pattern worth noticing: technical and operational metadata are
mostly generated automatically by systems that already exist. Business
metadata is the one type that has to be deliberately written by a person
— which is exactly why Chapter 2 spends five lessons on doing that well.

## S5 · OUTRO CARD

A common real failure: someone asks "is this table good?" and gets a
technical answer when they were actually asking a business or
operational question. Knowing which type a question is really asking
routes it to the right person. Next lesson: metadata standards — why
consistent structure matters more than good intentions.
