# Lesson 13 — Python for Data Engineering · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Chapter one built the storage foundation. Chapter two builds the
language foundation — Python, specifically for data engineering work,
not general programming.

## S2 · STEPS CARD (four places)

Python shows up in real data engineering work in four places. ETL
scripts — reading, cleaning, writing data. Talking to APIs that have
no other export option. Orchestration glue code — the custom logic
inside a Data Factory activity or a Databricks notebook cell. And
PySpark itself — every single DataFrame call in Chapter 4 is genuine
Python code.

## S3 · SCREENSHOT (hello.py created in VS Code)

Before we touch a single line of syntax, let's answer the question
that actually trips people up: where does this code even go? Open a
folder in VS Code, and create a file ending in dot-p-y. That's it —
that empty file is where every example in this chapter lives.

## S4 · SCREENSHOT (the Run button)

Type your code into that file, then click the Run button in the
top-right corner — or right-click anywhere in the file and choose Run
Python File in Terminal. Either one does the exact same thing: it runs
the whole file, top to bottom.

## S5 · SCREENSHOT (Terminal output)

And here's where you actually see what happened — the Terminal panel
along the bottom of VS Code. That's just running python, then your
filename, and showing you exactly what it printed. Every print
statement for the rest of this chapter shows up right here.

## S6 · CODE CARD (preview)

Here's roughly where this chapter is heading — Lesson 27's actual mini
ETL script. Don't worry about understanding all of it yet. Every
piece — the import, the read, the filter, the write — gets its own
lesson first, and you'll run every single one of them exactly the way
we just covered: a dot-p-y file, the Run button, the Terminal.

## S7 · STEPS CARD (scope)

This is deliberately not a full computer science course. Language
basics — variables, types, lists, loops, functions — plus real data
work — Pandas, files, APIs, SQL, cleaning. Fluent enough for Spark and
PySpark, not a software engineering degree.

## S8 · OUTRO CARD

Fourteen more lessons, one real skill: Python that actually does data
engineering work. Next lesson: variables and data types, the absolute
starting point. See you there.
