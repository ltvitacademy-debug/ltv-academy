# Lesson 11 — Data Dictionary Concepts · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A data dictionary is a structured inventory of an organization's actual
physical data structures — every table, every column, every type,
every constraint. Where the glossary answers what a concept means to
the business, the dictionary answers what a specific table or column
is, structurally.

## S2 · STEPS CARD (organized the opposite way)

Lesson 6 warned against organizing a glossary around tables. The
dictionary is the opposite case on purpose — it's organized exactly
around tables and columns, because that's precisely what it's
documenting.

## S3 · STEPS CARD (why both are needed)

This is why neither replaces the other. The glossary tells you what
Active Customer means across however many tables calculate it. The
dictionary tells you, for one specific table, exactly what's actually
in it.

## S4 · CODE CARD (what a dictionary entry adds)

Both follow the same six core metadata fields from Lesson 3, but a
dictionary entry adds structural facts a glossary term has no reason
to carry: data type and length, nullability, constraints, and exactly
where the object physically lives.

## S5 · OUTRO CARD

A well-built program links the two together — Active Customer links to
IsActiveFlag and the columns that feed it, so someone can start from
either direction. Chapter 5's data catalogs are largely built around
making that two-way link easy to navigate. Next: documenting tables and
columns — writing the actual entries.
