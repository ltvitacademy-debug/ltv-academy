# Lesson 45 — SUBSTRING and CHARINDEX · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Sometimes you don't want the whole string — just a piece of it. This
lesson pairs two functions that, together, let you extract exactly the
piece you need: SUBSTRING and CHARINDEX.

## S2 · CODE CARD (SUBSTRING example)

SUBSTRING takes three arguments: the string, a starting position, and how
many characters to grab. And here's a detail worth remembering —
positions in T-SQL start at 1, not 0. Product number, substring starting
at position 1, for 2 characters, pulls the first two characters of that
product number.

## S3 · CODE CARD (CHARINDEX example)

CHARINDEX finds a position instead of extracting one. Charindex of the
letter A, inside first name, returns the 1-based position where A first
shows up. And if it's not found at all, CHARINDEX returns 0 — not NULL.
That's a genuinely different signal than the NULL you learned back in
Chapter 2. 0 means "searched and didn't find it"; NULL means "unknown."
Don't mix those up.

## S4 · CODE CARD (combined example)

Here's where it gets genuinely useful: combine the two. Charindex finds
where the at-sign sits in an email address. Subtract 1, and you get the
length of everything before it. Feed that into SUBSTRING, and you extract
exactly the username portion — no matter how long that username actually
is, row by row.

## S5 · OUTRO CARD

SUBSTRING extracts a fixed piece; CHARINDEX finds a position; combined,
they extract a piece of dynamic length. Next lesson: STUFF versus
REPLACE, two different ways to change part of a string. See you there.
