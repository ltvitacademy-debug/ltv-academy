# Lesson 46 — STUFF vs. REPLACE · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Two more functions for changing part of a string, and they solve
genuinely different problems: REPLACE and STUFF.

## S2 · CODE CARD (REPLACE example)

REPLACE finds every occurrence of some text and swaps it for something
else. Phone number, replace every dash with a dot. It has no idea about
position at all — it just matches on the text itself, wherever that text
happens to show up, however many times.

## S3 · CODE CARD (STUFF example)

STUFF works completely differently. It takes a string, a starting
position, a length, and replacement text — deletes that many characters
starting at that position, and inserts the replacement there. Same
1-based positions as SUBSTRING. STUFF has zero concept of matching
content — it operates purely on position, regardless of what characters
actually sit there.

## S4 · STEPS CARD (REPLACE=WHAT / STUFF=WHERE)

Here's why that distinction actually matters. Use REPLACE when you know
WHAT to change. Use STUFF when you know WHERE to change, but the content
varies. Try to mask the middle digits of a phone number with REPLACE, and
you're stuck — you'd need to already know those digits to replace them,
and they're different on every single row. STUFF solves it instantly,
because all it needs is a position.

## S5 · OUTRO CARD

REPLACE matches by content; STUFF replaces by position, content-agnostic.
Next lesson: TRIM, LTRIM, and RTRIM, for cleaning up leading and trailing
whitespace. See you there.
