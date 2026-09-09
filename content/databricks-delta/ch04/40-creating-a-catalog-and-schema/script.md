# Lesson 40 — Creating a Catalog and Schema · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's actually build the hierarchy from last lesson — creating a
catalog and schema.

## S2 · CODE CARD (creating a catalog)

Create catalog, with a managed location, sets where Unity Catalog
stores data for any managed table created inside it, if the table
doesn't specify its own location — a real ADLS Gen2 path, straight
from Foundations' storage material.

## S3 · CODE CARD (creating schemas)

And creating bronze, silver, and gold as real schemas is the
actual setup step behind everything Chapter 3 already built. These
genuinely are schemas within the nyc taxi catalog, matching this
course's own naming convention exactly.

## S4 · CODE CARD (SHOW commands)

Show catalogs, show schemas, show tables — genuinely useful in a
real workspace with many catalogs already created by other people,
before assuming a name is even available.

## S5 · OUTRO CARD

And now every bronze dot trips reference from Chapter 3 has a real
home. Next lesson: managed tables versus external tables, what
managed location was really about.
