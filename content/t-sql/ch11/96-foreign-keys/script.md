# Lesson 96 — Foreign Keys · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every JOIN you've written since Chapter 3 relies on a relationship between
tables actually being valid. The foreign key is what guarantees that
relationship holds — every time, not just when your query happens to be
correct.

## S2 · CODE CARD (inline)

A foreign key says: every value in this column must already exist as a
primary key value in that other table. Define one inline, right when you
create the table — REFERENCES, then the table and column it points to.

## S3 · CODE CARD (ALTER TABLE)

Or add one after the fact, with ALTER TABLE ADD CONSTRAINT FOREIGN KEY. A
real AdventureWorks example: every product's subcategory ID has to
correspond to an actual row in Production dot ProductSubcategory. No
exceptions.

## S4 · CODE CARD (violation)

Try to break that, and SQL Server stops you cold. Insert an employee into
a department ID that doesn't exist, and you get Error 547 — a constraint
violation. That failure IS the point. The foreign key physically prevents
orphaned data from ever getting in, no application code required.

## S5 · CODE CARD (ON DELETE CASCADE)

By default, deleting a referenced row fails too, if anything still points
to it. ON DELETE CASCADE changes that — delete the department, and every
employee in it goes with it, automatically. Powerful, but use it
carefully — a cascading delete down a deep relationship chain can remove
far more than you expect.

## S6 · OUTRO CARD

Primary keys identify a row. Foreign keys connect rows across tables,
safely. Next lesson: UNIQUE constraints — guaranteeing uniqueness on a
column without making it the primary key. See you there.
