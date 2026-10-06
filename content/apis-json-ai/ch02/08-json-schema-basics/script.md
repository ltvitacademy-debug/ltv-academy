# Lesson 8 — JSON Schema, Basics · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

JSON Schema describes what a piece of JSON is allowed to look like —
which fields must exist, what type each one is, what values are valid.
And a schema is itself written in JSON.

## S2 · CODE CARD (example schema)

Here's a real schema. Type object. Properties: name as a string, age as
a number, role restricted to admin or member. Required: name and role —
age is left out of that list, so it's optional.

## S3 · STEPS CARD (four keywords)

Four keywords cover most schemas you'll ever read. Type says what kind
of value this has to be. Properties lists the allowed keys for an
object. Required says which of those keys must actually be present. And
enum locks a value to a fixed list of choices.

## S4 · CODE CARD (valid vs invalid instances)

Checking an instance is just matching it against those rules. Name Ada,
role admin — valid. Name Ada, role owner — invalid, owner isn't in the
enum. Age 36, role member, no name — invalid, name is required and it's
missing.

## S5 · OUTRO CARD

Type, properties, required, enum — that's the vocabulary. Next lesson,
we put it to work actually parsing and validating JSON in code, not just
reading it by eye.
