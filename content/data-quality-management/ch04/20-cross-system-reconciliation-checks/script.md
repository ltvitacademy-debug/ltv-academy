# Lesson 20 — Cross-System Reconciliation Checks · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Same consistency question from chapter three, scaled all the way up —
from one row to an entire dataset.

## S2 · STEPS — What reconciliation means

Instead of comparing one row to its copy, reconciliation compares an
aggregate — a count, a sum, a total — between two systems that are
both supposed to represent the same reality. It's the exact check a
finance team runs at month-end between a ledger and a subledger.

## S3 · CODE — Count reconciliation

The simplest, most common check: do two systems agree on how many
records exist for a given scope? A mismatch here almost always means
something concrete — a failed load, a silent filter, a batch that ran
twice.

## S4 · CODE — Sum reconciliation

Counts catch missing rows. Sums catch a different failure entirely —
the right number of rows, with the wrong values. Row counts can match
perfectly while the totals still disagree.

## S5 · SCREENSHOT — Reading a reconciliation result

The output is the same shape as every other check — two numbers, side
by side, in a plain results grid. Agreement or disagreement, at a
glance.

## S6 · CODE — Reconciling across two databases

When the second system is a genuinely separate database, a linked
server lets you query it from inside the same script — one query,
reaching across two servers.

## S7 · STEPS — A symptom, not a diagnosis

A reconciliation failure tells you the two systems disagree. It
doesn't tell you why, and it doesn't tell you which side is right.
Finding the actual cause is root cause analysis — a later chapter's
job. Reconciliation's job is just to catch the disagreement, reliably,
every time.

## S8 · OUTRO

Reconciliation catches disagreement at scale. Next up: thresholds and
tolerances — deciding exactly how much disagreement is actually a
problem.
