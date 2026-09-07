# Lesson 1 — What Is Python & Why Use It in Power BI? · Voiceover script

Segments map 1:1 to slides. Target: under 3 minutes total — this course's
hard cap. This voice paces at roughly 120 words/min including pauses, so
keep total narration near 300 words, not 450+.

---

## S1 · TITLE CARD

Python is a real programming language, not a Power BI feature. This lesson
covers exactly where the two meet — and where they don't.

## S2 · CODE: Python — a general-purpose language Power BI knows how to run

The whole relationship in one line: Power BI doesn't extend Python, and
Python doesn't replace Power BI. It's a second tool you reach for only when
the built-in tools hit a wall. Never hit that wall? You may never need
Python at all.

## S3 · CODE: Power Query (M) -> DAX -> Python

Three tools live inside Power BI already. Power Query connects and cleans
data before it loads. DAX calculates live, responding to clicks and
filters. Python is different — a general-purpose language nobody built
specifically for Power BI, which is both its strength and its limit here.

## S4 · STEPS: Clumsy M patterns -> Statistics & ML -> Custom visuals

Three real gaps Python fills: cleaning patterns that are clumsy in Power
Query, statistical and machine-learning libraries neither Power Query nor
DAX has any equivalent for, and custom visuals no built-in chart type
covers.

## S5 · CODE: Get Data -> Python script (data source) | Python visual (visual)

Python plugs in at exactly two points — not everywhere. As a data source,
through Get Data, Python script, producing a table. And as a visual,
redrawing a Matplotlib chart each time the report refreshes.

## S6 · CODE: DAX recalculates live -> Python runs once

One door stays shut: replacing DAX. DAX recalculates per filter, per click,
live — that's its entire point. A Python script runs once, at refresh, and
hands back a static result. Anything that must respond to a click stays
DAX's job.

## S7 · OUTRO CARD

Twenty three-minute lessons — just enough Python and Pandas to be useful
inside Power BI specifically, not a general programming course. Lesson 2
installs Python on your machine.
