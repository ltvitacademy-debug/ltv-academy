# Lesson 45 — Unity Catalog Volumes · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's keep the promise Lesson 8 made — Unity Catalog volumes.

## S2 · CODE CARD (the promise kept)

DBFS root had no Unity Catalog governance at all. A volume is
that missing piece — governed file storage, living inside a
schema, subject to the exact same grant and revoke as any table.

## S3 · CODE CARD (creating a volume)

Create volume gives you a real path, slash Volumes, catalog,
schema, volume, file — a genuine fourth level, under the catalog
dot schema namespace. This is where Autoloader's incoming files
belong now, instead of DBFS root.

## S4 · CODE CARD (managed vs external)

And it's the exact same managed versus external distinction from
Lesson 41, just applied to file storage instead of tables — a
managed volume's location is chosen by Unity Catalog, an external
one points wherever you specify.

## S5 · OUTRO CARD

Reading from it doesn't change at all — spark dot read and
d-butils dot f-s work exactly the same. What changes is
governance. Next lesson: Delta Sharing, sharing data outside this
metastore entirely.
