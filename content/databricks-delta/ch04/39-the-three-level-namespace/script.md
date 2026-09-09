# Lesson 39 — The Three-Level Namespace · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's make the real name of every table in this course explicit —
the three-level namespace.

## S2 · CODE CARD (real full name)

Every table so far — bronze dot trips, silver dot trips, gold dot
daily revenue — has actually been missing its first part. The
real full name is catalog, schema, table. Schema dot table was
valid, it was just implicitly using whatever catalog was already
current.

## S3 · CODE CARD (USE CATALOG/SCHEMA)

Use catalog and use schema set a session's current default, so a
shorter name resolves unambiguously — exactly the shorthand this
course's earlier lessons were relying on, made explicit here.

## S4 · CODE CARD (catalog as identity)

And this is exactly why dev dot bronze dot trips and prod dot
bronze dot trips can safely coexist — the catalog is part of the
table's identity, so they're genuinely different tables. Develop
against dev, run the same code against prod, just by switching
which catalog is current.

## S5 · OUTRO CARD

Catalog, schema, table — the real, complete name. Next lesson:
creating a catalog and schema, setting up the real hierarchy.
