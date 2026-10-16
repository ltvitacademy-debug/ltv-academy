# Capstone Retrospective Template

The three-question retrospective format used after every capstone project
in this course (Lessons 69, 74, 78). Copy this for your own project —
including one from outside this course — and fill it in honestly before
moving on to the next build.

## The three questions

**What worked?**
Name something specific, with evidence — not "it worked." Example from
Project 1: "Hybrid ingestion matched the real source constraints (nightly
POS exports really are batch; online orders really are streaming)."

**What would you change?**
Name the one decision you'd revisit first if you rebuilt this. Example from
Project 3: "Maybe the watermark trade-off — accepting more staleness for
stricter accuracy, or vice versa, once real latency numbers came in."

**What breaks first at 10x scale, and which technique would fix it?**
Naming what breaks first, specifically, is more valuable than claiming the
design scales indefinitely — no design does. Example from Project 1: "A
single Eventstream may not keep up with 10x online-order volume — Fabric's
event source scaling and Databricks's OPTIMIZE/ZORDER BY on FactSales both
become necessary, not optional, at that volume."

## Blank template

```
Project: _______________________________________________

What worked (with specific evidence)?
_______________________________________________________
_______________________________________________________

What would you change, and why?
_______________________________________________________
_______________________________________________________

What breaks first at 10x scale? Which prior technique fixes it?
_______________________________________________________
_______________________________________________________
```

## Why write this down at all

For a real-time streaming system especially, failures are harder to notice
after the fact than for a batch pipeline — a retrospective is often the
only place the near-misses get recorded. The filled-in version also becomes
raw material for a portfolio write-up or an interview answer (Lessons 79-80):
"what worked," "what you'd change," and "what breaks first" are close to
the exact three things an interviewer asks about a finished project anyway.
