# Lesson 33 — SUM and AVG · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

COUNT tells you how many. This lesson covers the two aggregate functions
that tell you how much: SUM and AVG.

## S2 · CODE CARD (SUM example)

SUM of list price, as total list price. This adds up every single value
in that column, across every matching row, into one grand total.

## S3 · CODE CARD (AVG example)

AVG computes the mean — the sum divided by the count. It's not something
you have to build yourself with division; AVG is the direct, built-in way
to get there in one step.

## S4 · CODE CARD (NULL-skipping matters for AVG)

And here's something worth internalizing: both SUM and AVG skip NULL
values entirely, the exact same behavior as count of a column from last
lesson. This matters enormously for AVG specifically. If NULL got treated
as zero instead of skipped, the average would get artificially dragged
down by rows that simply don't have data — not by genuinely low values.
Skipping NULL means AVG reflects the true average of the values that
actually exist.

## S5 · CODE CARD (AVG with WHERE)

And of course, WHERE still runs first, exactly like Lesson 11 taught you.
AVG of list price, where color equals red — that computes the average
price of red products specifically, not the whole table.

## S6 · OUTRO CARD

SUM totals, AVG averages, both skip NULL, and WHERE filters before either
one runs. Next lesson: MIN and MAX, for finding the extremes in a column.
See you there.
