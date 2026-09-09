# Lesson 31 — Choosing the Right Join · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

We're closing out Chapter 3 with seven join tools now in your toolbox.
Let's turn that into a framework you can actually use, instead of just a
list of names to memorize.

## S2 · STEPS CARD (NO→INNER / ONE SIDE→LEFT / BOTH→FULL OUTER / COMBO→CROSS)

Before writing any join, ask one question: do I need rows that have no
match on the other side? If no, INNER JOIN — you only want genuine
matches. If yes, and it's just one specific side, LEFT JOIN, which this
course always prefers over RIGHT JOIN for consistency. If yes, and it's
BOTH sides, FULL OUTER JOIN. And if what you actually want is every
possible combination, not a match at all, that's CROSS JOIN — rare, but
exactly right when that's genuinely the goal.

## S3 · CODE CARD (worked example — LEFT JOIN)

Let's walk a real request backward. Every customer, and how much they've
spent, including customers who've never placed an order, shown as zero.
The phrase "including customers who've never ordered" is the signal —
that means unmatched rows on the customer side must be KEPT, not dropped.
That's LEFT JOIN, full stop. Learning to hear that signal in a
plain-English question is the real skill here, more than memorizing
syntax.

## S4 · OUTRO CARD

You can now combine any number of tables, keep or drop unmatched rows on
purpose, join a table to itself, and even join to a function instead of a
table. Chapter 4 builds directly on all of it: once you can combine
tables, the next question is almost always "now summarize it" — grouping
and aggregate functions. See you there.
