# Lesson 46 — Variables & Best Practices · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

Fifteen lessons into this chapter now. Let's genuinely close it out with
the habits that keep your actual formulas fast, readable, and
trustworthy for years to come.

## S2 · CODE: The repeated-expression problem

Here's the real problem worth solving: the exact same expression, sales
for the same period last year, ends up appearing twice inside one
formula. Power BI genuinely calculates it twice as well, doing the
identical work all over again for absolutely no benefit whatsoever.

## S3 · CODE: VAR SalesPriorYear = ... RETURN ...

VAR names that expression once, giving it a clear, readable label.
RETURN then uses that same named value as many times as you actually
need it. Same exact result comes out the other end, but roughly half the
query time gets spent getting there — and SalesPriorYear now reads like
genuinely plain English instead of a repeated wall of nested CALCULATE
calls.

## S4 · CODE: DIVIDE(numerator, denominator)

One more habit genuinely worth building: use DIVIDE instead of the
plain slash character for division. Ordinary division throws a hard
error the instant a denominator happens to hit zero. DIVIDE simply
returns blank instead in that exact situation — quietly correct, rather
than loudly and visibly broken in front of whoever's viewing the report.

## S5 · OUTRO CARD

Syntax, calculated columns, measures, row and filter context, CALCULATE,
iterators, filter modifiers, and now variables — that's genuinely the
entire foundation this course needed to lay. Next up: Chapter Six, Dates
and Time Intelligence, where every single one of these pieces finally
gets put to real, practical work.
