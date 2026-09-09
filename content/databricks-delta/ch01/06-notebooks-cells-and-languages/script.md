# Lesson 6 — Notebooks, Cells, and Languages · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now let's actually write something — notebooks, cells, and
languages.

## S2 · CODE CARD (multi-language)

A notebook has one default language, but a magic command overrides
it for just that cell. Here, cell one's Python DataFrame gets
registered as a temp view, and it's immediately queryable from a
SQL cell right below it — Foundations Lesson 59's point about the
DataFrame API and SQL being interchangeable, made completely
literal.

## S3 · CODE CARD (magic commands)

The magic commands worth knowing now: percent python, percent sql,
percent md for formatted text instead of code, and percent f-s for
filesystem commands — that's Lesson 8's job. Percent md cells are
how a real notebook stays readable.

## S4 · CODE CARD (execution order)

And here's a real trap: cells run in whatever order you actually
run them, not the order they appear on the page. A notebook that
looks correct top to bottom can still be broken if it was run out
of order during development. Run All is how you confirm it
genuinely works as written.

## S5 · OUTRO CARD

Independent cells, mixed languages, and always confirm with Run
All. Next lesson: attaching a notebook to a cluster, connecting the
two things you've now built.
