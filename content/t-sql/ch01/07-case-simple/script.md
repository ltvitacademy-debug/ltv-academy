# Lesson 7 — CASE Expressions (Simple) · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

What if you want a query to return different values depending on a
condition, without writing a whole separate program? That's what CASE is
for — branching logic, right inside a SELECT statement.

## S2 · CODE CARD (CASE Color WHEN 'Red' THEN 'Warm' ... END AS ColorGroup)

The simple form of CASE compares one value against a list of exact
matches. Case color, when red then warm, when blue then cool, else other,
end. SQL Server checks color against each WHEN in order, top to bottom,
and the first match wins — its THEN value is what gets returned.

## S3 · STEPS CARD (WHEN / THEN / ELSE / END)

Four pieces to know. WHEN introduces a possible match. THEN is the value
returned if that match hits. ELSE is your fallback for anything that
doesn't match any WHEN. And END closes the whole expression. Leave ELSE
out, and an unmatched row just becomes NULL — which is almost never what
you want, so this course always includes one.

## S4 · CODE CARD (CASE Size WHEN 'S' THEN 'Small' ... END AS SizeCategory)

Here's the key mental model: CASE is an expression, not a statement. It
produces one value per row, exactly like the calculated columns from
Lesson 5 — which means it needs an alias, and it can go almost anywhere a
value is allowed. It's not the same as IF-ELSE, which we'll cover in
Chapter 7 — that controls which block of code runs. CASE just evaluates to
a value.

## S5 · OUTRO CARD

WHEN, THEN, ELSE, END — that's the simple CASE. Next lesson, we go one
step further with the searched form, for when you need real conditions
instead of just exact matches. See you there.
