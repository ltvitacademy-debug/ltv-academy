# Lesson 41 — CHAR vs. VARCHAR · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Welcome to Chapter 5. We're shifting gears from queries to the data
itself, starting with how T-SQL actually stores text. Two options look
almost identical on the surface: CHAR and VARCHAR. They behave very
differently.

## S2 · CODE CARD (CHAR padding example)

CHAR of 5 always stores exactly 5 characters, no matter what. Give it a
two-letter code like OK, and it doesn't just store O-K — it pads the rest
with spaces until it hits exactly 5 characters. CHAR allocates that full
length on disk every single time, whether you actually used it or not.

## S3 · CODE CARD (VARCHAR example)

VARCHAR works completely differently. VARCHAR 50 stores only as many
characters as you actually give it, up to that maximum of 50. A
three-letter name in a VARCHAR 50 column uses roughly three characters of
storage — not fifty. VARCHAR only pays for what it actually holds.

## S4 · STEPS CARD (CHAR fixed / VARCHAR everything else)

So which one do you reach for? Use CHAR only for values that are
genuinely fixed length in the real world — country codes, state
abbreviations, fixed status codes. Use VARCHAR for everything else —
names, addresses, descriptions, basically all real-world text. And that
second category covers the overwhelming majority of columns you'll ever
design.

## S5 · OUTRO CARD

CHAR pads to a fixed length; VARCHAR stores only what it needs. Get this
choice wrong with CHAR on variable data, and you waste space — and can
even introduce subtle bugs from those trailing spaces. Next lesson:
NVARCHAR, for storing text in more than just English characters. See you
there.
