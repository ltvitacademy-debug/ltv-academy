# Lesson 41 — Managed Tables vs. External Tables · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Every table is one of two real kinds — managed tables versus
external tables.

## S2 · CODE CARD (managed)

A managed table has its storage location fully controlled by
Unity Catalog — you never specify it. In exchange, Unity Catalog
can guarantee things about its whole lifecycle, including
automatically cleaning up its data when the table gets dropped.

## S3 · CODE CARD (external)

An external table points at a location you specify yourself —
often data that already exists, or that other tools outside
Databricks also need to read directly. Unity Catalog manages the
metadata, but not the files' actual lifecycle.

## S4 · CODE CARD (DROP TABLE)

And here's the real, important difference: dropping a managed
table deletes the data too. Dropping an external table only
removes the registration — the actual files sit there completely
untouched. Confusing the two is a real, common way to either
destroy data or leave orphaned files behind forever.

## S5 · OUTRO CARD

This course's own bronze, silver, and gold tables are a genuinely
good fit for managed — no outside tool needs direct file access.
Next lesson: grant and revoke, actually governing who can see any
of it.
