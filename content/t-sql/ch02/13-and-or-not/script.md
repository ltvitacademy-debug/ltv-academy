# Lesson 13 — AND, OR, NOT · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

One condition in a WHERE clause is easy. But real filtering usually needs
more than one condition at once — and that's where AND, OR, and NOT come
in.

## S2 · CODE CARD (WHERE Color = 'Red' AND ListPrice > 100;)

AND requires every single condition to be true. Color equals red, AND list
price greater than 100 — a row only survives if it's red AND expensive.
Chain as many ANDs together as you need; every one of them has to hold.

## S3 · CODE CARD (WHERE Color = 'Red' OR Color = 'Blue';)

OR is looser. Color equals red, OR color equals blue — a row survives if
it matches EITHER condition. It doesn't need to be both.

## S4 · CODE CARD (WHERE NOT Color = 'Red';)

NOT flips whatever comes after it. NOT color equals red means where color
is not red — which does the same job here as color not-equals red, but NOT
becomes especially useful later in this course, in front of more complex
conditions like NOT EXISTS in Chapter 6.

## S5 · CODE CARD (unparenthesized OR/AND mix)

And now, the single biggest source of filtering bugs in real T-SQL code.
Mix AND and OR without parentheses, and it doesn't mean what it looks
like. AND actually evaluates before OR — so this query really means: red,
OR blue-and-expensive. Every red product sneaks in regardless of price,
because AND grabbed the blue condition first, not the whole thing.

## S6 · CODE CARD (parenthesized fix)

The fix: parentheses. Wrap the red-or-blue part together, and now the
price filter applies to both colors, exactly like you intended. Rule of
thumb — whenever AND and OR appear in the same condition, use parentheses.
Every time, no exceptions.

## S7 · OUTRO CARD

AND for both, OR for either, NOT to flip, and parentheses whenever they
mix. Next lesson: LIKE and wildcards, for filtering text by pattern
instead of an exact match. See you there.
