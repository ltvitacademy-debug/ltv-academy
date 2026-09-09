# Lesson 59 — Indexed Views · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson's whole point was: a view stores the query, not the data.
There's exactly one exception to that rule, and it's worth
understanding — the indexed view.

## S2 · CODE CARD (CREATE VIEW + clustered index)

Create this view with schemabinding, aggregating product count and total
price per subcategory. Then create a unique clustered index directly on
that view. The moment that index exists, SQL Server materializes the
view — it physically stores the computed result on disk, just like a
real table. From then on, querying the view doesn't re-run that select at
all. It reads the pre-computed data straight off disk.

## S3 · STEPS CARD (READS fast / WRITES cost)

That speed isn't free, though. Every single time the underlying Product
table changes — an insert, an update, a delete — SQL Server has to update
the indexed view's stored data too, to keep everything consistent.
Faster reads, in exchange for real extra work on every write.

## S4 · CODE CARD (restrictions)

And indexed views come with genuine restrictions regular views don't
have. WITH SCHEMABINDING is required — it locks down the underlying
table's structure so SQL Server can guarantee the view stays valid. COUNT
BIG of star is required instead of plain COUNT star. And several T-SQL
features simply aren't allowed inside an indexed view's definition at
all.

## S5 · OUTRO CARD

Reach for an indexed view specifically for expensive aggregations,
queried very often, on data that doesn't change constantly — the
classic reporting dashboard profile. For most everyday views, a plain,
regular view is the simpler, right default. Next lesson: PIVOT, for
turning row values into column headers. See you there.
