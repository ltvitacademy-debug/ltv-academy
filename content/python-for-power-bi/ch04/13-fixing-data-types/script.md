# Lesson 13 — Fixing Data Types · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words
at this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

Lesson 7 introduced dtypes as a quick check to run on any DataFrame.
This lesson is about what to actually do once that check tells you
something is genuinely wrong.

## S2 · CODE: Units Sold loaded as object, not a number

A CSV column full of numbers can still load as object, Pandas' label for
text, for reasons that have nothing to do with the numbers themselves —
a stray currency symbol, inconsistent formatting between rows, or a
source system that simply quoted every single value as a string on the
way out. Pandas ends up treating one-two-zero as three separate
characters, not the actual number one hundred twenty.

## S3 · CODE: "120" + "85" -> string concatenation, not addition

Here's the actual danger hiding in this: text that merely looks like a
number can't be summed the way you'd naturally expect it to be. String
addition concatenates the characters together instead of adding the
values mathematically, and it does this completely silently — no error
message at all, just quietly wrong output that still looks plausible
enough at a glance that you might not catch it.

## S4 · CODE: df["Units Sold"].astype(int) -> .sum() = 205

astype converts a column to the actual type it should have been all
along. Once converted properly, sum genuinely adds the numbers together
— one hundred twenty plus eighty five equals two hundred five —
instead of whatever nonsense string concatenation would quietly have
handed you instead.

## S5 · OUTRO CARD

Check dtypes first, always, on absolutely anything freshly loaded into a
DataFrame — a numeric-looking column that shows up as object is the
single most common data-type surprise you'll run into with real files.
Lesson 14 covers a specific, extremely common version of this exact same
problem: dates.
