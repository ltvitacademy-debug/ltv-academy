# Lesson 17 — ORDER BY: Ascending & Descending · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every query so far has come back in whatever order SQL Server felt like
giving it to us — and that order isn't actually guaranteed at all. ORDER BY
is how you take control of that.

## S2 · CODE CARD (ORDER BY ListPrice;)

Name, list price, from Production dot Product, order by list price. Run
that, and your results come back sorted smallest to largest. That's the
default direction — ascending — even though we didn't write the word
ascending anywhere.

## S3 · CODE CARD (ORDER BY ListPrice DESC;)

Add DESC, for descending, and the order flips: largest to smallest
instead. ASC and DESC are the only two directions you'll ever need.

## S4 · CODE CARD (ORDER BY Color ASC, ListPrice DESC;)

You can sort on more than one column too. Order by color ascending, then
list price descending. This sorts by color first — and within each
individual color, THEN it sorts by list price, highest first. Every column
after the first one only matters for breaking ties left by the columns
before it.

## S5 · CODE CARD (ORDER BY DiscountedPrice DESC;)

And here's a nice payoff from Lesson 11's rule about processing order:
ORDER BY is the very LAST clause SQL Server evaluates, which means it CAN
see a SELECT alias, unlike WHERE. Discounted price, order by discounted
price — that works perfectly fine, because by the time ORDER BY runs, that
alias already exists.

## S6 · OUTRO CARD

Ascending by default, DESC to flip it, multiple columns to break ties, and
aliases fully available. Next lesson: TOP and TOP PERCENT, for limiting
how many rows actually come back. See you there.
