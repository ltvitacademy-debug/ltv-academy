# Lesson 12 — Relational/Comparison Operators · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson we filtered with greater-than and equals. This time, let's
cover every comparison operator T-SQL gives you, so you have the full
toolkit for WHERE conditions.

## S2 · STEPS CARD (= / <> · > / < · >= / <=)

Six operators total. Equals and not-equals. Greater-than and less-than.
Greater-than-or-equal and less-than-or-equal. Now, T-SQL actually supports
two ways to write not-equals: angle bracket-angle bracket, or
exclamation-equals. This course sticks with angle bracket-angle bracket,
because that's the ANSI SQL standard form — it'll work no matter what
database system you end up using down the road.

## S3 · CODE CARD (WHERE ListPrice >= 500)

Numbers work exactly how you'd expect. List price greater-than-or-equal to
500 — that includes products priced at exactly 500, not just above it.

## S4 · CODE CARD (WHERE OrderDate > '2013-01-01')

Here's something worth knowing: dates compare exactly the same way numbers
do. Earlier dates are considered less than later ones. Order date greater
than January first, 2013, in quotes, returns every order placed after that
date. We'll cover date literals and functions properly in Chapter 5, but
this basic comparison logic already works.

## S5 · CODE CARD (WHERE ListPrice - StandardCost > 100)

And comparisons aren't limited to a bare column — they work against any
expression. List price minus standard cost, greater than 100. That returns
only the products where the markup — the gap between what it costs and
what it sells for — exceeds a hundred dollars.

## S6 · OUTRO CARD

Equals, not-equals, greater, less, and their or-equal-to variants — six
operators that work identically on numbers, dates, and calculations. Next
lesson: combining multiple conditions in one WHERE clause with AND, OR, and
NOT. See you there.
