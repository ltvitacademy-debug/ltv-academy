# Lesson 8 — DBFS — Databricks File System · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now let's talk about where files actually live on a cluster — DBFS.

## S2 · CODE CARD (filesystem view)

DBFS lets you address cloud storage — including Foundations' ADLS
Gen2 — using ordinary-looking paths, instead of each cloud
provider's own storage API. It's not a separate disk, just a
convenience layer. The actual bytes still live in whatever cloud
storage account is backing it.

## S3 · CODE CARD (browsing files)

Percent f-s is the magic-command shortcut for browsing and moving
files. D-butils dot f-s is the exact same thing, callable directly
from Python — useful anywhere a magic command wouldn't fit, like
inside a function.

## S4 · CODE CARD (root vs mount)

And there's a real difference between DBFS root — workspace-local,
Databricks-managed, easy for quick testing — and a mounted path,
which points at a real, separate ADLS Gen2 container, potentially
shared with tools outside Databricks entirely.

## S5 · OUTRO CARD

And one more thing worth knowing now: Databricks steers production
work away from DBFS root, toward Unity Catalog volumes instead — no
governance attaches to DBFS root at all. Chapter 4 covers that
properly. Next lesson: widgets and parameters, making a notebook
reusable.
