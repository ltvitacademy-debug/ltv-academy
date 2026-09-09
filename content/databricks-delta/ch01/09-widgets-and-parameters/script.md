# Lesson 9 — Widgets and Parameters · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's make a notebook reusable instead of one-off — widgets and
parameters.

## S2 · CODE CARD (hardcoded problem)

Reading one specific month's file works fine, once. But running the
same logic for February means editing the string by hand — exactly
the one-off thinking Foundations Lesson 27's ETL capstone
deliberately avoided.

## S3 · CODE CARD (creating a widget)

D-butils dot widgets dot text adds an input box at the top of the
notebook, with a default value and a label. Get reads whatever's
currently in it, always as a string. Change the box, rerun the
notebook, and the same logic runs against different data — no code
edits at all.

## S4 · CODE CARD (why jobs need this)

This matters most for job clusters. A human running a notebook
interactively can just edit the code directly. But a job cluster
has no human present — Databricks jobs pass widget values as
parameters at run time instead. That's how one parameterized
notebook becomes a building block a schedule can run every day.

## S5 · OUTRO CARD

Text, dropdown, combobox, multiselect — four types, one way to read
them back. Next lesson: Databricks Runtime and versions, what's
actually running underneath a cluster.
