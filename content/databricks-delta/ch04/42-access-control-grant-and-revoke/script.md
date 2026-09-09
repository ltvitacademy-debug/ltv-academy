# Lesson 42 — Access Control — GRANT and REVOKE · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's finally close the gap this chapter opened with — access
control, grant and revoke.

## S2 · CODE CARD (GRANT/REVOKE)

Grant a privilege, on an object, to a principal — a user, a
service principal, or a group. Select means read access, modify
covers insert, update, delete, and merge together. Revoke undoes
exactly what a matching grant gave.

## S3 · CODE CARD (USE CATALOG required)

And remember Lesson 39's use catalog and use schema? Under real
access control, those are required privileges, not just
convenience — a user needs use catalog, use schema, and select,
all three, before access actually works at all.

## S4 · CODE CARD (inheritance risk)

But watch privilege inheritance — granting select at the schema
level grants it on every current and future table inside that
schema. Convenient, but a real way to accidentally expose more
than you meant to.

## S5 · OUTRO CARD

Privilege, object, principal — and grant at the table level when
precision actually matters. Next lesson: row and column-level
security, finer-grained than a whole table.
