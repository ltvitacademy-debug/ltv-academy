# Lesson 23 — KQL: Basic Queries With where and project · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's actually write real KQL queries — where and project.

## S2 · CODE CARD (where)

Where filters rows exactly like Foundations' filter, or T-SQL's
where clause. And and or combine conditions, and multiple where
steps in sequence behave like one combined and.

## S3 · CODE CARD (project)

Project combines select and alias into one step — name the
columns to keep, optionally rename one inline. Anything not
listed simply gets dropped.

## S4 · CODE CARD (extend)

And extend is the real equivalent of with column — it adds a new
computed column while keeping every existing one, unlike project,
which keeps only what's named.

## S5 · OUTRO CARD

Filter, then compute, then select down — the same shape as a
PySpark method chain, just written with pipes. Next lesson:
summarize and aggregations, KQL's group by, in full.
