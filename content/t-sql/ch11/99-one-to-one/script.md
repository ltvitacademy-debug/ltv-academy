# Lesson 99 — Table Relationships: One-to-One · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

Starting with the rarest of the three relationship shapes: one-to-one.
Each row in one table matches at most one row in another, and vice versa.

## S2 · CODE CARD (real example)

AdventureWorks2012 has a real, genuine example. Every row in Human
Resources dot Employee IS a person — but not every person is an employee,
since customers and vendors are people too in this schema. Employee and
Person are joined on Business Entity ID.

## S3 · CODE CARD (PK = FK trick)

Here's the trick that enforces it strictly: Employee's Business Entity ID
is BOTH its own primary key, AND a foreign key pointing back to Person.
Because a primary key can never repeat, at most one Employee row can ever
exist for any given person. That's what turns an ordinary foreign key
relationship into a strict one-to-one.

## S4 · CODE CARD (when to split)

So when do you actually split one real-world thing into two tables like
this? When one side is optional — not every person is an employee. When
one side holds a big pile of rarely-used columns you don't want loaded
with every query. Or when you're modeling a general thing with specific
kinds of it hanging off it.

## S5 · OUTRO CARD

If two things always pair up exactly, one-to-one, most of the time you'd
just combine them into a single table — that's exactly why this shape is
the rarest of the three. Next lesson: one-to-many, the relationship shape
you'll actually use constantly. See you there.
