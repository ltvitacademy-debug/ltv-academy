# Lesson 58 — Views: Creating and Using · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson ended with a preview: a genuinely saved, reusable version of
everything a CTE almost is. That's a VIEW — a select statement saved in
the database under a name.

## S2 · CODE CARD (CREATE VIEW example)

Create view, v-w underscore ExpensiveProducts, as, then the select
statement. That v-w prefix is a common, optional convention that flags
this as a view at a glance — this course uses it consistently. Unlike a
CTE, this doesn't disappear at the end of one statement. It's saved,
permanently, available to any query, any session, anyone with
permission.

## S3 · CODE CARD (querying the view)

And querying it is exactly like querying a table. Select star from v-w
ExpensiveProducts, where color equals red, order by list price
descending. WHERE, ORDER BY, JOIN — every tool you already know just
works, because as far as the rest of your query is concerned, this
really is a table.

## S4 · STEPS CARD (EVERY QUERY / ALWAYS CURRENT)

Here's the crucial thing to understand: a view stores no data of its
own. It stores the select statement itself. Every single time you query
it, SQL Server runs that saved select fresh, against whatever the live,
current data actually is right now. No refresh step, no stale copies — a
view is automatically up to date, always.

## S5 · CODE CARD (ALTER VIEW / DROP VIEW)

And you can change or remove a view after the fact. ALTER VIEW redefines
its saved query. DROP VIEW removes it permanently. Views exist to package
a complex, well-tested query once, under a friendly name, so everyone
downstream can reuse it without re-deriving the same logic over and over.

## S6 · OUTRO CARD

A view is a saved select, queried like a table, always current, never
storing its own data. Next lesson: indexed views, the one case where a
view actually does store something. See you there.
