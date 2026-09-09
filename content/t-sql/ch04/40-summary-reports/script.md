# Lesson 40 — Building Summary Reports · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

We're closing out Chapter 4 by building the kind of query you'd actually
write on a real job — pulling together everything this chapter taught you
into one report.

## S2 · CODE CARD (full summary report query)

For each product color, with more than 5 products, show the count, the
average price, and the cheapest and most expensive — sorted by average
price, highest first, but only for colors averaging over 50 dollars.
Color, count star, average, min, max, from Product, where color is not
null, group by color, having count greater than 5 and average greater
than 50, order by average price descending. Every single piece from this
chapter, in one query.

## S3 · STEPS CARD (FROM/WHERE → GROUP BY → aggregates+HAVING → SELECT/ORDER BY)

Let's walk through what SQL Server actually does, step by step, not in
the order you typed it. Start with FROM. WHERE drops rows with no color,
before anything else happens. GROUP BY splits what's left into one group
per color. Then the aggregates compute — count, average, min, max — each
running once per group. HAVING drops any group with 5 or fewer products,
or averaging 50 dollars or under. Only then does SELECT produce your
final columns. And ORDER BY, last of all, sorts what survives everything
before it.

## S4 · OUTRO CARD

You can now summarize data at any level — one number for a whole table,
one per group, one per multi-column combination — filter both rows and
groups, stack queries together, and measure spread as well as center.
Chapter 5 shifts gears to data types, and the string and date functions
you'll use constantly while building reports exactly like this one. See
you there.
