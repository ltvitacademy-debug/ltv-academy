# Lesson 28 — Joining Three or More Tables · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

Every join so far has connected exactly two tables. But real questions
rarely stop at two — you usually need the order, the product, AND the
person who bought it, all in one result. Good news: there's no limit to
how many tables one query can join.

## S2 · CODE CARD (four-table chained JOIN)

This connects four tables at once: order headers, order details,
products, and the person who placed the order. Read it top to bottom.
Here's the part worth noticing: that second join connects to s-o-d, which
was just introduced by the FIRST join — not back to s-o-h directly. By the
time you reach the third join, s-o-h, s-o-d, and p are all already
available to reference. Each join just needs SOME column that's already
in play, not necessarily the very first table.

## S3 · CODE CARD (mixing LEFT JOIN and INNER JOIN)

And nothing stops you from mixing join types in the same query. LEFT JOIN
to keep every product, even ones that never sold — then INNER JOIN to
require that each product actually has a valid subcategory. Different
relationships in the same query can genuinely need different rules.

## S4 · OUTRO CARD

Chain as many JOINs as the question needs, each one connecting to
whatever's already available, and mix join types freely when different
relationships call for different rules. Next lesson: CROSS APPLY, for
joining to something that isn't quite a regular table. See you there.
