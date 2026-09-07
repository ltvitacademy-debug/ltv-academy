# Lesson 1 — What Is Python & Why Use It in Power BI? · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total — this course's videos
run up to 3 minutes, and this opening lesson should use the full length.

---

## S1 · TITLE CARD

Python is a real programming language, not a Power BI feature, not a
Microsoft product. This lesson is about exactly where the two actually
meet — and just as importantly, where they don't.

## S2 · CODE: Python — a general-purpose language Power BI knows how to run

Here's the entire relationship in one sentence: Power BI doesn't extend
Python, and Python doesn't replace Power BI. It's a second, more powerful
tool you reach for from inside the first one, only when the built-in tools
hit a wall. If you never hit that wall, you may never need a single line of
Python — and that's a perfectly fine outcome for a working Power BI
developer.

## S3 · CODE: Power Query (M) -> DAX -> Python

Three tools already live inside Power BI, and if you've built anything at
all, you've already used two of them without necessarily calling them by
name. Power Query — the engine behind every Transform Data step — connects
to sources and reshapes data before it ever loads. DAX — the language
behind every measure — calculates live, responding to filters and clicks as
a user explores a report. Python is different in kind: a general-purpose
language nobody built specifically for Power BI, which is exactly its
strength and its limitation here.

## S4 · STEPS: Clumsy M patterns -> Statistics & ML -> Custom visuals

Three real gaps this course spends actual lessons filling. Some
data-cleaning patterns are genuinely simpler as a few lines of Pandas than
a dozen Power Query steps — Lessons 9 through 14 cover this directly.
Statistical and machine-learning libraries have no equivalent inside
Power Query or DAX at all — that ecosystem simply doesn't exist natively.
And some visual designs no built-in chart type in the gallery covers,
which Lesson 19 addresses with a real Matplotlib chart inside a report.

## S5 · CODE: Get Data -> Python script (data source) | Python visual (visual)

Here's what matters more than it sounds like: Python doesn't become a
fourth, general-purpose tool sitting alongside Power Query and DAX
everywhere in Power BI. It plugs in at exactly two points. As a data
source, through Get Data, Python script — it runs once and produces a
table your model can use, which Lesson 18 walks through. And as a visual —
the Python visual redraws a chart each time the report refreshes it, which
Lesson 19 builds from scratch.

## S6 · CODE: DAX recalculates live -> Python runs once

And one door Python can never open, no exceptions: replacing DAX. DAX
measures recalculate per visual, per filter context, live, as someone
clicks around a report — that responsiveness is the entire point of DAX.
A Python script runs once, at import or refresh time, and hands back a
static result. If a calculation needs to respond to what a user clicks,
that's DAX's job, and Lesson 20 makes this exact distinction the whole
point of the course's closing lesson.

## S7 · OUTRO CARD

Twenty three-minute lessons — just enough Python and Pandas to be genuinely
useful inside Power BI specifically, not a general programming bootcamp.
Lesson 2 gets Python actually installed on your own machine.
